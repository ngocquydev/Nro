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
export { getQrCode };
