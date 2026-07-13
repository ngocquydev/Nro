import api from '../axios';

const buyAccount = async (id, productId, method) => {
  try {
    const body = {
      userId: id,
      productId: Number(productId),
      paymentMethod: method,
    };
    const response = await api.post(`/buy/buyAccount`, body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const getHistoryBuy = async (userId) => {
  try {
    const res = await api.get(`/buy/getAll/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { buyAccount, getHistoryBuy };
