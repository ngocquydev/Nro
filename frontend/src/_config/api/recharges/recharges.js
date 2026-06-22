import api from '../axios';

const recharges = async (body) => {
  const res = await api.post('/recharge/rechargeCard', body);
  return res.data;
};
const checkRecharges = async (body) => {
  const res = await api.post('/recharge/checkRecharge', body);
  return res.data;
};
const getHistory = async (query) => {
  const { userId, page = 1, limit = 10 } = query;
  const res = await api.get('/recharge/listHistory', { params: { userId, page, limit } });
  return res.data;
};
export { recharges, checkRecharges, getHistory };
