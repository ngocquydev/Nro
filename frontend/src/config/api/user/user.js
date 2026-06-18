import api from '../axios';

const loginUser = async (uid) => {
  try {
    const response = await api.post(`/user/login`, { uid });
    return response.data;
  } catch (error) {
    console.error('Lỗi login người dùng:', error);
    throw error;
  }
};

const registerUser = async (data) => {
  const res = await api.post('/user/register', data);
  return res.data;
};
const getUser = async (uid) => {
  const res = await api.post(`/user/getUser`, { uid });
  return res.data;
};
export { loginUser, registerUser, getUser };
