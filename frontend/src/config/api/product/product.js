import api from "../axios";
const getAllByProduct = async (
  slug,
  page = 1,
  limit = 8,
  sortByPrice,
  searchById,
  sortByPlaned,
  sortByServer,
) => {
  if (!slug) {
    throw new Error("Slug is required!");
  }
  const res = await api.get("/product/getBySlug", {
    params: {
      slug,
      page,
      limit,
      sortByPrice: sortByPrice === "all" ? "" : sortByPrice,
      searchById: searchById === "0" ? "" : searchById,
      sortByPlaned: sortByPlaned === "all" ? "" : sortByPlaned,
      sortByServer: sortByServer === "all" ? "" : sortByServer,
    },
  });

  return res.data;
};
const getProductById = async (id) => {
  try {
    if (!id) {
      throw new Error("Thiếu id");
    }
    const res = await api.get(`/product/getDetails?productId=${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi", error);
  }
};
export { getAllByProduct, getProductById };
