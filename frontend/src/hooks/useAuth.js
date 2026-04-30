import { useState, useCallback, useMemo } from 'react';

const AUTH_KEY = 'splitsmart_user';
const TOKEN_KEY = 'token';

/**
 * useAuth – Centralised authentication state hook.
 * Reads from localStorage so it survives page refreshes.
 */
export function useAuth() {
  const [authData, setAuthData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
    } catch {
      return null;
    }
  });

  const user  = useMemo(() => authData?.user  || null, [authData]);
  const token = useMemo(() => authData?.token || localStorage.getItem(TOKEN_KEY) || null, [authData]);
  const isAuthenticated = useMemo(() => !!token, [token]);

  const login = useCallback((data) => {
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(data));
      if (data?.token) localStorage.setItem(TOKEN_KEY, data.token);
    } catch {/* storage unavailable */}
    setAuthData(data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('splitsmart_theme');
    localStorage.removeItem('splitsmart_currency');
    sessionStorage.clear();
    setAuthData(null);
    window.location.href = '/login';
  }, []);

  return { user, token, isAuthenticated, login, logout };
}

export default useAuth;
