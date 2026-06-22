import { createContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { getAllCategory } from '@/_config/api/category/category';
import { getAllProducts } from '@/_config/api/product/product';
import { useLocation, useSearchParams } from 'react-router-dom';
export const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [loading, setLoading] = useState([]);
  const [data, setData] = useState([]);
  const [dataPage, setDataPage] = useState({});
  const [searchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    getAllCategory()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const server = parseInt(searchParams.get('server')) || 0;
    const planed = searchParams.get('planed') || '';
    const priceRange = searchParams.get('priceRange') || '';
    const slug = location.pathname.split('/')[1];
    const keywords = ['member', 'nap-atm', 'login', 'register'];
    const isSlug = keywords.some((keyword) => slug.includes(keyword));
    if (isSlug) return;
    setLoading(true);
    getAllProducts(page, 8, slug, planed, server, priceRange)
      .then((res) => {
        setDataPage(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi khi tải dữ liệu:', err);
        setLoading(false);
      });
  }, [searchParams, location]);
  const value = { loading, data, dataPage, setDataPage };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
