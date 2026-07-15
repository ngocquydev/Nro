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
const getHistoryBuy = async (userId, page, limit = 6) => {
  try {
    const res = await api.get(`/buy/getAll`, {
      params: {
        userId: userId,
        page: page,
        limit: limit,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { buyAccount, getHistoryBuy };
