const { model } = require("mongoose");
const Blogs = require("../models/Blog");
const createBlogs = async (newData) => {
  try {
    if (!newData?.title) {
      return {
        status: "ERR",
        message: "Tiêu đề bài viết là bắt buộc!",
      };
    }
    const isExist = await Blogs.exists({ title: newData.title });
    if (isExist) {
      return {
        status: "ERR",
        message: "Tiêu đề này đã tồn tại!",
      };
    }
    const newBlog = await Blogs.create(newData);

    return {
      status: "OK",
      data: newBlog,
    };
  } catch (error) {
    console.error("Lỗi tại Blog Service:", error);
    return {
      status: "ERR",
      message: "Lỗi hệ thống khi lưu bài viết",
      error: error.message,
    };
  }
};
const getAllBlogs = async (page = 1, limit = 8) => {
  try {
    const skip = (page - 1) * limit;
    const query = {};
    const [totalBlogs, blogs] = await Promise.all([
      Blogs.countDocuments(query),
      Blogs.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip).lean(),
    ]);

    return {
      data: blogs,
      pagination: {
        totalBlogs,
        totalPage: Math.ceil(totalBlogs / limit),
        currentPage: page,
        limit,
      },
    };
  } catch (error) {
    console.error("Lỗi lấy danh sách blog:", error);
    return { blogs: [], totalPage: 0 };
  }
};
module.exports = {
  createBlogs,
  getAllBlogs,
};
