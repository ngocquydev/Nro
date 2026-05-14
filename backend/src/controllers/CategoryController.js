const CategoryService = require("../services/CategoryService");

const createCategory = async (req, res) => {
  try {
    const { titleCategory, name, img, desc, slug } = req.body;

    if (!titleCategory || !name || !img || !desc || !slug) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required (titleCategory, name, img, desc, slug)",
      });
    }

    const response = await CategoryService.createCategory(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || e,
    });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const response = await CategoryService.getAllCategory();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || e,
    });
  }
};
const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(200).json({
        status: "ERR",
        message: "Slug is required",
      });
    }
    const response = await CategoryService.getCategoryBySlug(slug);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || e,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "Id is required",
      });
    }
    const response = await CategoryService.deleteCategory(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || e,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryBySlug,
  deleteCategory,
};
