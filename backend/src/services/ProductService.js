const Product = require("../models/ProductsModel");
const Category = require("../models/category");
const ProductDetail = require("../models/detailsProduct");
const mongoose = require("mongoose");

const createProduct = async (newProducts) => {
  const { id, planed, server, accountType, card, atm, img, category, slug } =
    newProducts;

  try {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return {
        status: "ERR",
        message:
          "Định dạng ID danh mục (category) không hợp lệ (phải là 24 ký tự hex)",
      };
    }

    const checkCategoryById = await Category.findById(category);
    if (!checkCategoryById) {
      return {
        status: "ERR",
        message: "ID danh mục không tồn tại trong bảng Category",
      };
    }

    const checkCategoryBySlug = await Category.findOne({ slug: slug });
    if (!checkCategoryBySlug) {
      return {
        status: "ERR",
        message: `Danh mục với slug "${slug}" không tồn tại trong bảng Category`,
      };
    }

    const existingProduct = await Product.findById(id);
    if (existingProduct) {
      return {
        status: "ERR",
        message: `Sản phẩm có ID ${id} đã tồn tại, vui lòng chọn ID khác`,
      };
    }

    // 6. Tiến hành tạo sản phẩm mới
    const newProduct = await Product.create({
      _id: id, // Gán id tự nhập vào khóa chính _id
      planed,
      server,
      accountType,
      card,
      atm,
      img,
      category,
      slug,
    });

    return {
      status: "OK",
      message: "Tạo sản phẩm thành công",
      data: newProduct,
    };
  } catch (error) {
    console.error("Lỗi tại createProduct:", error);
    if (error.code === 11000) {
      return {
        status: "ERR",
        message:
          "Lỗi trùng lặp dữ liệu: ID hoặc thuộc tính duy nhất đã tồn tại",
      };
    }
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const getProductsBySlug = async (
  slug,
  page = 1,
  limit = 10,
  sortByPrice = "",
  searchById = "",
  sortByPlaned = "",
  sortByServer = "",
) => {
  try {
    const skip = (page - 1) * limit;

    let query = { slug: slug };

    if (searchById) {
      query._id = Number(searchById);
    }

    if (sortByPlaned) {
      query.planed = sortByPlaned;
    }
    if (sortByServer) {
      query.server = sortByServer;
    }
    if (sortByPrice) {
      const prices = sortByPrice.split("-");
      const minPrice = parseInt(prices[0]);
      const maxPrice = parseInt(prices[1]);
      query.atm = { $gte: minPrice, $lte: maxPrice };
    }

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      slug: slug,
      status: "OK",
      message: "SUCCESS",
      data: products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: Number(page),
        limit: Number(limit),
      },
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const deleteProductById = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    throw new Error("Lỗi khi xóa sản phẩm từ Database: " + error.message);
  }
};
const createDetails = async (productId, detailData) => {
  try {
    const { desc, images } = detailData;
    const checkId = Product.findById(productId);
    const productExists = await Product.findById(productId);
    if (!productExists) {
      throw new Error("Sản phẩm chính không tồn tại, không thể thêm chi tiết!");
    }
    const detailExists = await ProductDetail.findOne({ product: productId });
    if (detailExists) {
      throw new Error(
        "Sản phẩm này đã có thông tin chi tiết rồi. Bạn hãy dùng hàm Update!",
      );
    }
    const newDetail = await ProductDetail.create({
      desc,
      images,
      product: productId,
    });

    return newDetail;
  } catch (error) {
    throw new Error("Lỗi khi tạo chi tiết sản phẩm: " + error.message);
  }
};
const getDetailByProductId = async (productId) => {
  try {
    const data = await ProductDetail.findOne({ product: productId }).populate(
      "product",
    );

    if (!data) {
      return {
        success: false,
        message: "Không tìm thấy chi tiết cho sản phẩm này",
      };
    }

    return data;
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết sản phẩm: " + error.message);
  }
};
module.exports = {
  createProduct,
  getProductsBySlug,
  deleteProductById,
  createDetails,
  getDetailByProductId,
};
