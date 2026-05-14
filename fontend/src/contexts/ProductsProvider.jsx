import { getAllCategory } from "@config/api/category/category";
import { createContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { getAllByProduct, getProductById } from "@config/api/product/product";
import { useLocation, useSearchParams } from "react-router-dom";
export const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [getProduct, setGetProduct] = useState([]);
  const [details, setDetails] = useState({});
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [query, setQuery] = useState({
    slug: location.pathname.replace(/^\//, ""),
    page: 1,
    limit: 8,
    sortByPrice: "",
    searchById: null,
    sortByPlaned: "",
    sortByServer: "",
  });
  const dataByPrice = [
    {
      id: 1,
      value: "all",
      content: "Lọc theo giá (Tất cả)",
    },
    {
      id: 2,
      value: "0-50000",
      content: "Từ 50k trở xuống",
    },
    {
      id: 3,
      value: "50000-100000",
      content: "Từ 50k đến 100k",
    },
    {
      id: 4,
      value: "100000-300000",
      content: "Từ 100k đến 300k",
    },
    {
      id: 5,
      value: "300000-500000",
      content: "Từ 300k đến 500k",
    },
    {
      id: 6,
      value: "500000-700000",
      content: "Từ 500k đến 700k",
    },
    {
      id: 7,
      value: "700000-1000000",
      content: "Từ 700k đến 1 Triệu",
    },
    {
      id: 8,
      value: "1000000-2000000",
      content: "Từ 1 Triệu đến 2 Triệu",
    },
    {
      id: 9,
      value: "2000000-5000000",
      content: "Từ 2 Triệu đến 5 Triệu",
    },
    {
      id: 10,
      value: "5000000-10000000",
      content: "Từ 5 Triệu đến 10 Triệu",
    },
    {
      id: 11,
      value: "10000000-100000000",
      content: "Từ 10 Triệu trở lên",
    },
  ];
  const dataByServer = [
    {
      value: "0",
      content: "Lọc theo server",
    },
    {
      value: "1",
      content: "1 sao",
    },
    {
      value: "2",
      content: "2 sao",
    },
    {
      value: "3",
      content: "3 sao",
    },
    {
      value: "4",
      content: "4 sao",
    },
    {
      value: "5",
      content: "5 sao",
    },
    {
      value: "6",
      content: "6 sao",
    },
    {
      value: "7",
      content: "7 sao",
    },
    {
      value: "8",
      content: "8 sao",
    },
    {
      value: "9",
      content: "9 sao",
    },
    {
      value: "10",
      content: "10 sao",
    },
    {
      value: "11",
      content: "11 sao",
    },
  ];
  const dataByPlaned = [
    {
      value: "all",
      content: "Lọc theo hành tinh",
    },
    {
      value: "Traidat",
      content: "Trái đất",
    },
    {
      value: "Namec",
      content: "Namec",
    },
    {
      value: "3",
      content: "Xayda",
    },
  ];
  useEffect(() => {
    setIsLoading(true);
    getAllCategory()
      .then((res) => {
        setProducts(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Lỗi lấy category:", err);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    const cleanSlug = location.pathname.replace(/^\//, "");

    setQuery({
      slug: cleanSlug,
      page: 1,
      limit: 8,
      sortByPrice: "",
      searchById: "",
      sortByPlaned: "",
      sortByServer: "",
    });
  }, [location.pathname]);

  useEffect(() => {
    if (!query.slug) return;
    setIsLoading(true);
    getAllByProduct(
      query.slug,
      query.page,
      query.limit,
      query.sortByPrice,
      query.searchById,
      query.sortByPlaned,
      query.sortByServer,
    )
      .then((res) => {
        setGetProduct(res);
      })
      .catch((err) => {
        console.log("Lỗi lấy sản phẩm:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location.pathname, query]);
  const productIdRaw = searchParams.get("productId");

  useEffect(() => {
    if (!productIdRaw) return;

    setIsLoading(true);
    getProductById(productIdRaw)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.error("Lỗi fetch chi tiết sản phẩm:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productIdRaw]);
  const value = {
    products,
    getProduct,
    dataByPrice,
    dataByServer,
    dataByPlaned,
    setGetProduct,
    query,
    setQuery,
    isLoading,
    details,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
