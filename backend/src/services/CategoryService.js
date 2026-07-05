const Category = require('../models/CategoryModel');

const getAllCategory = async () => {
  try {
    const result = await Category.aggregate([
      { $match: { isDeleted: { $ne: true } } },

      {
        $group: {
          _id: '$title',
          Category: { $push: '$$ROOT' },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          title: '$_id',
          _id: 0,
          Category: {
            $map: {
              input: '$Category',
              as: 'item',
              in: {
                name: '$$item.name',
                slug: '$$item.slug',
                bgUrl: '$$item.bgUrl',
                quantitySold: '$$item.quantitySold',
                desc: '$$item.desc',
              },
            },
          },
        },
      },
    ]);
    if (!result) return [];

    return result;
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
    if (checkName) {
      return { SUCCESS: false, message: 'Tên danh mục đã tồn tại' };
    }
    if (checkSlug) {
      return { SUCCESS: false, message: 'Slug đã tồn tại' };
    }
    if (checkBgUrl) {
      return { SUCCESS: false, message: 'BgUrl đã tồn tại' };
    }

    const category = new Category({ name, desc, slug, bgUrl, title });
    await category.save();
    return { SUCCESS: true, data: category };
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
