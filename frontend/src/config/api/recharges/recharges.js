import api from '../axios';

const recharges = async (body) => {
  const res = await api.post('/recharge/rechargeCard', body);
  return res.data;
};
const checkRecharges = async (body) => {
  const res = await api.post('/recharge/checkRecharge', body);
  return res.data;
};
export { recharges, checkRecharges };
