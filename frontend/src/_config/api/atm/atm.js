import api from '../axios';

const getQrCode = async (amount, desc) => {
  const res = await api.get('/atm/getQrCode', {
    params: {
      amount,
      desc,
    },
  });
  return res.data;
};
const getHistoryATM = async (userId) => {
  const res = await api.get('/atm/listHistoryATM', {
    params: { userId },
  });
  return res.data;
};
export { getQrCode, getHistoryATM };
