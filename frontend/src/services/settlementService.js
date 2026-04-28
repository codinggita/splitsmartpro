import api from './api.js';

/**
 * Record a payment between users
 * @param {Object} data { fromUser, toUser, groupId, amount }
 */
export const createSettlement = async (data) => {
  const res = await api.post('/settlements', data);
  return res.data;
};

/**
 * Get all settlements for a group
 * @param {string} groupId
 */
export const getSettlements = async (groupId) => {
  const res = await api.get(`/settlements/${groupId}`);
  return res.data;
};
