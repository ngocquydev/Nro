import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllBlogs } from "@config/api/blogs/blogs";
export const BlogsContext = createContext(null);

export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
  });
  useEffect(() => {
    setLoading(true);
    getAllBlogs(query.page)
      .then((res) => {
        setBlogs(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [query.page]);
  const value = {
    blogs,
    setQuery,
    query,
    loading,
  };

  return (
    <BlogsContext.Provider value={value}>{children}</BlogsContext.Provider>
  );
};
