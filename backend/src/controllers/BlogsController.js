const Blogs = require("../services/BlogService");
const createBlogs = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title) {
      return res.status(400).json({
        status: "ERROR",
        message: "Vui lòng nhập đầy đủ tiêu đề!",
      });
    }
    const result = await Blogs.createBlogs(data);

    if (result.status === "ERR") {
      return res.status(400).json(result);
    }

    return res.status(201).json({
      status: "OK",
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Lỗi hệ thống",
      error: error.message,
    });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const result = await Blogs.getAllBlogs(page, limit);

    // 3. Trả về kết quả cho Frontend
    return res.status(200).json({
      status: "OK",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Lỗi Server khi lấy danh sách blog",
      error: error.message,
    });
  }
};
module.exports = {
  createBlogs,
  getAllBlogs,
};
