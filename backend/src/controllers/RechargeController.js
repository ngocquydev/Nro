const {
  RechargeService,
  checkRechargeService,
  getHistory,
} = require('../services/RechargesService');
const recharge = async (req, res) => {
  try {
    const partner_key = process.env.PARTNER_KEY;
    const PartnerID = process.env.PartnerID;
    const { telco, code, serial, amount, userId } = req.body;

    if (!code || !serial || !telco || !amount || !userId) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
    }

    const data = await RechargeService(partner_key, PartnerID, {
      telco,
      code,
      serial,
      amount,
      userId,
    });
    return res.status(200).json({
      success: true,
      message: data.message || 'Yêu cầu đã được gửi đi',
      data: data,
    });
  } catch (error) {
    console.error('Controller Recharge Error:', error);
  }
};
const checkRecharge = async (req, res) => {
  try {
    const partner_key = process.env.PARTNER_KEY;
    const PartnerID = process.env.PartnerID;
    const { userId } = req.body;
    const response = await checkRechargeService(partner_key, PartnerID, {
      userId,
    });

    res.status(200).json({ success: true, message: 'Kiểm tra nạp thẻ thành công', data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const listHistory = async (req, res) => {
  try {
    const { userId, page, limit } = req.query;
    const history = await getHistory(userId, parseInt(page) || 1, parseInt(limit) || 10);
    res.status(200).json({ success: true, message: 'success', data: history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { recharge, checkRecharge, listHistory };
