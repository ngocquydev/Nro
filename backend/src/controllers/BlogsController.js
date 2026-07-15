const BlogsService = require('../services/BlogsService');
const getAll = async (req, res) => {
  try {
    const { category, lastId, limit } = req.query;
    const blogs = await BlogsService.getAll(category, lastId, limit);
    return res.status(200).json({
      success: true,
      message: 'Lấy danh sách bài viết thành công',
      data: blogs,
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách blog:', error);
    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra trong quá trình lấy dữ liệu',
      error: error.message,
    });
  }
};
const create = async (req, res) => {
  try {
    const { category, title, desc, bgUrl, descBg } = req.body;

    // Gọi Service
    const result = await BlogsService.create(category, title, desc, bgUrl, descBg);
    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error('lỗi tạo blogs', error);
    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra trong quá trình tạo dữ liệu',
      error: error.message,
    });
  }
};
const getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    const data = await BlogsService.getById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết',
      });
    }

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error('Lỗi Details Blogs:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server',
    });
  }
};
module.exports = {
  getAll,
  create,
  getDetails,
};
