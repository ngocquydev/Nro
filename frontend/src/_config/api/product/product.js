import api from '../axios';
const getAllCategory = async () => {
  return api.get('/category/getAll');
};
const getAllProducts = async (
  page = 1,
  limit = 8,
  slug = '',
  planed = '',
  server = 0,
  priceRange = ''
) => {
  const params = {
    page,
    limit,
    slug: slug,
    server: server,
    planed: planed,
    priceRange: priceRange,
  };
  const res = await api.get('/product/getAll', { params });
  return res.data;
};
const getProductsById = async (id) => {
  const res = await api.get(`/product/${id}`);
  return res.data;
};
export { getAllCategory, getAllProducts, getProductsById };
