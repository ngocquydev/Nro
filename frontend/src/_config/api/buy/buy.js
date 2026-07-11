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
const getHistory = async (userId) => {};
export { buyAccount, getHistory };
