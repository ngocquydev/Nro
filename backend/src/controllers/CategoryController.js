const categoryService = require('../services/categoryService');

const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategory();
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi lấy dữ liệu',
      error: error.message,
    });
  }
};
const createCategory = async (req, res) => {
  try {
    const { name, desc, slug, bgUrl, title } = req.body;
    if (!name || !desc || !slug || !bgUrl || !title) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ thông tin',
      });
    }
    const category = await categoryService.createCategory({ name, desc, slug, bgUrl, title });
    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi tạo danh mục',
      error: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, slug, bgUrl, title } = req.body;
    if (!name || !desc || !slug || !bgUrl || !title) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ thông tin',
      });
    }
    const category = await categoryService.updateCategory(id, { name, desc, slug, bgUrl, title });
    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi cập nhật danh mục',
      error: error.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.deleteCategory(id);
    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi xóa danh mục',
      error: error.message,
    });
  }
};
module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
