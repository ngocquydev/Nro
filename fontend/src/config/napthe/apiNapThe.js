import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_THE_SIEU_RE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
