const Category = require('../models/CategoryModel');

const getAllCategory = async () => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) return [];
    const filterCategory = categories.filter((cat) => cat.title);
    if (!filterCategory.length) {
      throw new Error('Không có danh mục nào');
    }
    return { data: categories, listTitle: filterCategory.map((cat) => cat.title) };
  } catch (error) {
    throw error;
  }
};
const createCategory = async (categoryData) => {
  try {
    const { name, desc, slug, bgUrl, title } = categoryData;
    const checkName = await Category.findOne({ name });
    const checkSlug = await Category.findOne({ slug });
    const checkBgUrl = await Category.findOne({ bgUrl });
    const checkTitle = await Category.findOne({ title });
    if (checkName) {
      throw new Error('Name đã tồn tại');
    }
    if (checkSlug) {
      throw new Error('Slug đã tồn tại');
    }
    if (checkBgUrl) {
      throw new Error('Background URL đã tồn tại');
    }
    if (checkTitle) {
      throw new Error('Title đã tồn tại');
    }

    const category = new Category({ name, desc, slug, bgUrl, title });
    await category.save();
    return category;
  } catch (error) {
    throw error;
  }
};
const updateCategory = async (id, categoryData) => {
  try {
    const { name, desc, slug, bgUrl, title } = categoryData;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, desc, slug, bgUrl, title },
      { new: true }
    );
    if (!category) {
      throw new Error('Danh mục không tồn tại');
    }
    return category;
  } catch (error) {
    throw error;
  }
};
const deleteCategory = async (id) => {
  try {
    // Tìm và cập nhật trạng thái isDeleted thành true
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true } // Trả về bản ghi sau khi đã cập nhật
    );

    if (!updatedCategory) {
      throw new Error('Danh mục không tồn tại');
    }

    return updatedCategory;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
