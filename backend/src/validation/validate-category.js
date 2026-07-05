const { body, validationResult } = require('express-validator');

// 1. Định nghĩa các quy tắc kiểm tra (Rules)
const validateCategory = [
  body('name').notEmpty().withMessage('Tên danh mục không được để trống'),
  body('title').notEmpty().withMessage('Tiêu đề danh mục không được để trống'),
  body('desc').notEmpty().withMessage('Mô tả không được để trống'),
  body('slug').notEmpty().withMessage('Slug không được để trống'),
  body('bgUrl').notEmpty().withMessage('URL ảnh không được để trống'),

  // 2. Middleware xử lý kết quả kiểm tra
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: errors.array(), // Trả về chi tiết lỗi của từng trường
      });
    }
    next();
  },
];

module.exports = validateCategory;
