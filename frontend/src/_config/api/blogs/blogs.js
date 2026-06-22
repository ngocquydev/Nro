import api from "../axios";
const getAllBlogs = async (page = 1, limit = 5) => {
  try {
    const res = await api.get("/blogs/getAllBlogs", {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    console.error("lỗi", error);
  }
};
export { getAllBlogs };
