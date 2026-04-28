import api from './api.js';

/**
 * Get personalized spending insights for the user
 */
export const getUserInsights = async () => {
  const res = await api.get('/insights/user');
  return res.data;
};
