const buyAccountService = require('../services/BuyAccountService');

const buyAccountController = async (req, res) => {
  try {
    const { userId, productId, paymentMethod } = req.body;
    const result = await buyAccountService.buyAccountService(userId, productId, paymentMethod);

    if (result.success === false) {
      return res.status(400).json({
        success: false,
        message: result.message,
        paymentMethod: paymentMethod,
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi mua tài khoản',
      error: error.message,
    });
  }
};
const getHistoryController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Chưa có userId',
      });
    }

    const list = await buyAccountService.getHistoryService(userId);
    if (list && list.success === false) {
      return res.status(400).json(list);
    }
    return res.status(200).json({
      success: true,
      message: 'Lấy lịch sử thành công',
      data: list,
    });
  } catch (error) {
    console.error('Lỗi controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};
module.exports = { buyAccountController, getHistoryController };
