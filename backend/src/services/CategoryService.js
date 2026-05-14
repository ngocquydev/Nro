const { model } = require("mongoose");
const Category = require("../models/category");
const createCategory = async (newCategoryData) => {
  const { titleCategory, name, img, desc, slug } = newCategoryData;
  try {
    // 1. Kiểm tra trong DB chính (MongoDB)
    const checkCategory = await Category.findOne({ name: name });
    if (checkCategory !== null) {
      return { status: "ERR", message: "The name is already exists" };
    }

    // 2. Tạo mới trong MongoDB
    const createdCategory = await Category.create({
      titleCategory,
      img,
      desc,
      slug,
      name,
    });

    if (createdCategory) {
      return {
        status: "OK",
        message: "SUCCESS",
        data: createdCategory,
      };
    }
  } catch (error) {
    return { status: "ERR", message: error.message };
  }
};
const updateCategory = async (id, updateData) => {
  try {
    const category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!category) {
      return {
        status: "ERR",
        message: "Category not found",
      };
    }
    return {
      status: "OK",
      message: "Category updated successfully",
      data: category,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const getCategoryBySlug = async (slug) => {
  try {
    const category = await Category.findOne({ slug: slug });
    if (!category) {
      return {
        status: "ERR",
        message: "Category not found",
      };
    }
    return {
      status: "OK",
      message: "SUCCESS",
      data: category,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const deleteCategory = async (id) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return {
        status: "ERR",
        message: "Category not found",
      };
    }
    return {
      status: "OK",
      message: "Category deleted successfully",
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const getAllCategory = async () => {
  try {
    const categories = await Category.find();

    if (categories && categories.length > 0) {
      return {
        status: "OK",
        message: "SUCCESS",
        data: categories,
      };
    }
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
