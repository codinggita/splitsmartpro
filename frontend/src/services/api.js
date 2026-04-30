import axios from 'axios';

const MAX_RETRIES = 2;
const RETRY_DELAY = 800; // ms

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// ── Request: attach JWT ────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {/* storage unavailable */}
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response: normalise errors + retry on 5xx ─────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config || {};

    // Auto-logout on 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('splitsmart_user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Retry on network error or 5xx (server-side failures)
    const isServerError  = error.response?.status >= 500;
    const isNetworkError = !error.response && error.code !== 'ECONNABORTED';
    const retryCount     = config._retryCount || 0;

    if ((isServerError || isNetworkError) && retryCount < MAX_RETRIES) {
      config._retryCount = retryCount + 1;
      await new Promise((r) => setTimeout(r, RETRY_DELAY * config._retryCount));
      return api(config);
    }

    // Normalise the error message
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;

