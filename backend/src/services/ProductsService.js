const Product = require('../models/ProductsModel');
const Category = require('../models/CategoryModel');
const getAllProductsService = async (
  page = 1,
  limit = 10,
  slug = '',
  priceRange = '',
  server = 0,
  planed = ''
) => {
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.max(1, parseInt(limit) || 10);
  const skip = (pageNum - 1) * limitNum;

  let query = { isDeleted: false };
  if (slug) query.slug = slug;
  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);

    if (!isNaN(min) && !isNaN(max)) {
      query.$and = [
        {
          $expr: {
            $and: [{ $gte: [{ $toDouble: '$ATM' }, min] }, { $lte: [{ $toDouble: '$ATM' }, max] }],
          },
        },
        {
          $expr: {
            $and: [
              { $gte: [{ $toDouble: '$Card' }, min] },
              { $lte: [{ $toDouble: '$Card' }, max] },
            ],
          },
        },
      ];
    }
  }
  if (server && server != 0) {
    query.server = +server;
  }
  if (planed && planed != '') {
    query.planed = planed;
  }
  const sort = { createdAt: -1 };

  const [products, totalItems] = await Promise.all([
    Product.find(query).sort(sort).skip(skip).limit(limitNum).lean(),
    Product.countDocuments(query),
  ]);

  return {
    products,
    pagination: {
      totalItems,
      totalPage: Math.ceil(totalItems / limitNum),
      currentPage: pageNum,
      limit: limitNum,
      slug,
      sortPrice: priceRange,
      server,
      planed,
    },
  };
};
const getById = async (id) => {
  const product = await Product.findById(id);
  if (!product) return null;
  return {
    _id: product._id,
    ATM: product.ATM,
    Card: product.Card,
    planed: product.planed,
    server: product.server,
    register: product.register,
    desc: product.desc,
    img: product.img,
    slug: product.slug,
  };
};
const createProducts = async (body) => {
  try {
    const checkCategory = await Category.findById(body.categoryId);

    if (!checkCategory) {
      return {
        success: false,
        message: 'Danh mục không tồn tại',
      };
    }
    const product = new Product(body);
    await product.save();
    await Category.updateOne({ _id: body.categoryId }, { $inc: { quantitySold: 1 } });

    return { success: true, message: 'Tạo sản phẩm thành công' };
  } catch (error) {
    throw error;
  }
};
module.exports = { getAllProductsService, createProducts, getById };
