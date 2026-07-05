const buyAccountService = require('../services/BuyAccountService');

const buyAccountController = async (req, res) => {
  try {
    const { productId, paymentMethod } = req.body;
    const result = await buyAccountService.buyAccountService(productId, paymentMethod);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi mua tài khoản',
      error: error.message,
    });
  }
};
module.exports = { buyAccountController };
