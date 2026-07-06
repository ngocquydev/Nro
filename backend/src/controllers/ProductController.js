const productService = require('../services/ProductsService');

const getAllProducts = async (req, res) => {
  try {
    const { page, limit, slug, priceRange, server, planed } = req.query;
    const result = await productService.getAllProductsService(
      page,
      limit,
      slug,
      priceRange,
      server,
      planed
    );

    return res.status(200).json({
      success: true,
      data: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách sản phẩm',
      error: error.message,
    });
  }
};
const getById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.id);
    const { _id, planed, server, register, img, desc, ATM, Card, slug } = product;
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Sản phẩm không tồn tại',
      });
    }
    return res.status(200).json({
      success: true,
      data: { _id, planed, server, register, img, desc, ATM, Card, slug },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy thông tin sản phẩm',
      error: error.message,
    });
  }
};
const createProducts = async (req, res) => {
  try {
    const product = await productService.createProducts(req.body);
    if (!product.success) {
      return res.status(400).json(product);
    }
    return res.status(201).json({ success: true, message: 'Tạo sản phẩm thành công' });
  } catch (error) {
    console.log('CHI TIẾT LỖI MONGODB:', error);

    return res.status(500).json({
      success: false,
      message: 'Không thể tạo sản phẩm',
      details: error.message,
    });
  }
};
module.exports = { getAllProducts, createProducts, getById };
