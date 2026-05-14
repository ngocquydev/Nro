import api from "../axios";
const getAllCategory = async () => {
  const res = await api.get("/category/getAll");
  return res.data.data;
};
export { getAllCategory };
