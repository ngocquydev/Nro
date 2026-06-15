const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
  try {
    const { id, planed, server, accountType, card, atm, img, category, slug } = req.body;

    if (
      id === undefined ||
      id === null ||
      !planed ||
      !server ||
      !accountType ||
      !card ||
      !atm ||
      !img ||
      !category ||
      !slug
    ) {
      return res.status(400).json({
        status: 'ERR',
        message: 'Cần nhập đầy đủ: id, planed, server, accountType, card, atm, img, category, slug',
      });
    }

    const response = await ProductService.createProduct(req.body);

    if (response.status === 'OK') {
      return res.status(201).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (e) {
    return res.status(500).json({
      status: 'ERR',
      message: e.message || 'Lỗi hệ thống',
    });
  }
};
const getProductsBySlug = async (req, res) => {
  try {
    const { slug, page, limit, sortByPrice, searchById, sortByPlaned, sortByServer } = req.query;
    if (!slug) {
      return res.status(400).json({
        status: 'ERR',
        message: 'Thiếu tham số slug trên URL',
      });
    }
    const response = await ProductService.getProductsBySlug(
      slug,
      page,
      limit,
      sortByPrice,
      searchById,
      sortByPlaned,
      sortByServer
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: 'ERR',
      message: e.message || 'Lỗi hệ thống',
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = ProductService.deleteProductById(id);
    if (!result) {
      return res.status(404).json({
        status: 'ERROR',
        message: 'Không tìm thấy sản phẩm với ID này để xóa!',
      });
    }
    return res.status(200).json({
      status: 'OK',
      message: 'Xóa sản phẩm thành công!',
      data: {
        id: result._id,
        name: result.name,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'SERVER_ERROR',
      message: err.message,
    });
  }
};
const createDetail = async (req, res) => {
  try {
    const { desc, images, productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Id đã tồn tại',
      });
    }

    if (!desc || !images || !Array.isArray(images)) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Mô tả và danh sách hình ảnh không hợp lệ!',
      });
    }

    const newDetail = await ProductService.createDetails(productId, {
      desc,
      images,
    });

    return res.status(201).json({
      status: 'OK',
      data: newDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'SERVER_ERROR',
      message: error.message,
    });
  }
};
const getDetails = async (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({ message: 'Thiếu tham số productId trên Query String!' });
    }

    const detail = await ProductService.getDetailByProductId(productId);

    if (!detail) {
      return res.status(404).json({ message: 'Không tìm thấy chi tiết.' });
    }

    return res.status(200).json({
      success: true,
      data: detail,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createProduct,
  getProductsBySlug,
  createDetail,
  getDetails,
};
