const { body, validationResult } = require('express-validator');

const validateRecharge = [
  body('telco').notEmpty().withMessage('Thiếu telco'),

  body('code').notEmpty().withMessage('Thiếu mã thẻ').isNumeric().withMessage('Mã thẻ phải là số'),

  body('serial').notEmpty().withMessage('Thiếu serial'),

  body('amount')
    .notEmpty()
    .withMessage('Thiếu mệnh giá')
    .isNumeric()
    .withMessage('Mệnh giá phải là số'),

  body('userId').notEmpty().withMessage('Thiếu ID người dùng'),
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

module.exports = validateRecharge;
