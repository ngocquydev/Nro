const { body, validationResult } = require('express-validator');

const validateProducts = [
  body('planed')
    .trim()
    .notEmpty()
    .withMessage('Trường "planed" không được để trống')
    .custom((value) => {
      const allowed = ['Xayda', 'TraiDat', 'Namec'];
      if (!allowed.includes(value)) {
        throw new Error('Trường "planed" phải là "Xayda", "TraiDat" hoặc "Namec"');
      }
      return true;
    }),

  body('server')
    .trim()
    .notEmpty()
    .withMessage('Trường "server" không được để trống')
    .isNumeric()
    .withMessage('Trường "server" phải là số'),

  body('register').trim().notEmpty().withMessage('Trường "register" không được để trống'),
  body('img').trim().notEmpty().withMessage('Trường "img" không được để trống'),
  body('desc').trim().notEmpty().withMessage('Mô tả không được để trống'),
  body('ATM').trim().notEmpty().withMessage('Thông tin ATM không được để trống'),
  body('Card').trim().notEmpty().withMessage('Thông tin Card không được để trống'),

  body('categoryId')
    .trim()
    .notEmpty()
    .withMessage('Danh mục không được để trống')
    .isMongoId()
    .withMessage('Danh mục (categoryId) không hợp lệ'),

  body('slug').trim().notEmpty().withMessage('Slug không được để trống'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = validateProducts;
