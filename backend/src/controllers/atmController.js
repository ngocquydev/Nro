const { getqrCode, saveWebHook, getHistory } = require('../services/atmService');
const crypto = require('crypto');

const getQrCode = async (req, res) => {
  try {
    const { amount, desc } = req.query;
    const params = new URLSearchParams({
      bank: process.env.BANK,
      acc: process.env.ACC,
      amount: amount,
      des: desc,
      template: process.env.TEMPLATE,
      showinfo: process.env.SHOWINFO,
      holder: process.env.HOLDER,
    });
    const data = await getqrCode(params);
    return res.status(200).json({ status: 'OK', data: data });
  } catch (error) {
    console.error('Lỗi controller:', error);
    return res.status(500).json({ status: 'ERROR', message: 'Không thể lấy mã QR' });
  }
};

const handleWebHook = async (req, res) => {
  try {
    const body = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body);

    const signature = req.headers['x-sepay-signature'] ?? '';
    const timestamp = Number(req.headers['x-sepay-timestamp'] ?? 0);
    const secret = process.env.SEPAY_WEBHOOK_SECRET;
    if (Math.abs(Date.now() / 1000 - timestamp) > 300) {
      return res.status(401).json({ success: false, message: 'Request expired' });
    }
    const expected =
      'sha256=' + crypto.createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');

    // 4. So sánh bảo mật
    const sig = Buffer.from(signature);
    const exp = Buffer.from(expected);

    if (sig.length !== exp.length || !crypto.timingSafeEqual(sig, exp)) {
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }
    const payload = JSON.parse(body);
    const userId = payload.content.replace('NAP', '').trim();

    const newATM = await saveWebHook(payload, userId);
    if (!newATM) {
      return res.status(500).json({ success: false, message: 'Failed to process webhook' });
    }
    return res.status(200).json({
      success: true,
      message: 'Webhook processed',
    });
  } catch (error) {
    console.error('Lỗi controller:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
const getHistoryController = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(200).json({ success: true, message: 'Invalid user ID' });
    const list = await getHistory(userId);
    if (!list)
      return res.status(200).json({ success: true, message: 'No history found for this user' });
    return res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error('Lỗi controller:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
module.exports = { getQrCode, handleWebHook, getHistoryController };
