import api from '../axios';
const getAll = async (category = '', lastId, limit = 6) => {
  try {
    const res = await api.get('/blogs/getAll', {
      params: {
        category,
        lastId,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    console.error('lỗi', error);
  }
};
const getBlogsId = async (id) => {
  try {
    const res = await api.get(`/blogs/getId/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export { getAll, getBlogsId };
