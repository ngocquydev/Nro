import axios from "axios";
import { auth } from "../firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
const getFirebaseToken = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe();
      if (user) {
        try {
          const token = await user.getIdToken(true);
          resolve(token);
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
    });
  });
};

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getFirebaseToken();

      if (token) {
        config.headers.token = `Bearer ${token}`;
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Lỗi lấy Token Firebase:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
