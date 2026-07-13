const BlogsModel = require('../models/BlogsModel');

const create = async (category, title, desc, bgUrl, descBg) => {
  try {
    const newBlog = await BlogsModel.create({
      category,
      title,
      desc,
      bgUrl,
      descBg,
    });
    return {
      success: true,
      message: 'Tạo bài viết thành công',
      data: newBlog,
    };
  } catch (error) {
    throw error;
  }
};
const getAll = async (category, lastId, limit = 6) => {
  try {
    const baseQuery = category ? { category: category } : {};

    const [totalCount, lastBlog] = await Promise.all([
      BlogsModel.countDocuments(baseQuery),
      BlogsModel.findOne(baseQuery).sort({ _id: 1 }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const lastIdOfCategory = lastBlog ? lastBlog._id : null;

    const fetchQuery = { ...baseQuery };
    if (lastId) {
      fetchQuery._id = { $lt: lastId };
    }

    const blogs = await BlogsModel.find(fetchQuery).sort({ _id: -1 }).limit(Number(limit));

    const items = blogs.map((item) => ({
      uid: item.uid,
      category: item.category,
      title: item.title,
      desc: item.desc,
      descBg: item.descBg,
      view: item.view,
      bgUrl: item.bgUrl,
      createdAt: item.createdAt,
      _id: item._id,
    }));

    return {
      items,
      nextId: blogs.length > 0 ? blogs[blogs.length - 1]._id : null,
      lastIdOfCategory,
    };
  } catch (error) {
    throw error;
  }
};
const getById = async (id) => {
  try {
    if (!id) throw new Error('ID không hợp lệ');

    const blog = await BlogsModel.findOne({ _id: id });
    return blog;
  } catch (error) {
    console.error('Lỗi khi lấy blog theo ID:', error);
    throw error;
  }
};
module.exports = { create, getAll, getById };
