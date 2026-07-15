import { getAll } from '@config/api/blogs/blogs';
import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const BlogsContext = createContext(null);

export const BlogsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastId, setLastId] = useState(null);

  const location = useLocation();
  const handleLoadMore = () => {
    if (!data.nextId || data.nextId === data.lastIdOfCategory) return;
    setLastId(data.nextId);
  };
  const handleReset = () => {
    setLastId(null);
  };
  useEffect(() => {
    setLoading(true);
    const path =
      location.pathname === '/blogs'
        ? location.pathname.split('/')[1]
        : location.pathname.split('/')[2];
    getAll(path, lastId, 6)
      .then((res) => {
        setData((prev) => {
          if (!lastId) return res.data;
          return {
            ...res.data,
            items: [...prev.items, ...res.data.items],
          };
        });
      })
      .catch((err) => console.error('lỗi', err))
      .finally(() => {
        setLoading(false);
      });
  }, [lastId]);

  const value = {
    data,
    loading,
    handleLoadMore,
    handleReset,
  };

  return <BlogsContext.Provider value={value}>{children}</BlogsContext.Provider>;
};
