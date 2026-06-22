import axios from 'axios';
import { auth } from '../firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_BE_URL_NgRok,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

// Hàm lấy token, giữ nguyên logic của bạn nhưng gọn hơn
const getFirebaseToken = () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe();
      if (user) {
        try {
          const token = await user.getIdToken(true);
          resolve(token);
        } catch (error) {
          console.error('Lỗi lấy token:', error);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
};

// Sử dụng duy nhất 1 interceptor để quản lý cả UID và Token
api.interceptors.request.use(
  async (config) => {
    // 1. Lấy UID (kiểm tra an toàn)
    const uid = auth.currentUser?.uid;
    if (uid) {
      config.headers['x-user-uid'] = uid;
    }

    // 2. Lấy Token và gán vào header
    const token = await getFirebaseToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Nếu backend của bạn cần trường 'token' riêng thì giữ lại,
      // nhưng thường chỉ cần Authorization là đủ.
      config.headers.token = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
