const crypto = require('crypto');
const FormData = require('form-data');
const rechargesModel = require('../models/RechargesModel');
const tsrClient = require('../config/axios');
const userModel = require('../models/UserModel');
const generateRequestId = () => {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${timestamp}${randomNum}`;
};
const RechargeService = async (partnerKey, partnerId, body) => {
  const { code, serial, telco, amount, userId } = body;

  const sign = crypto
    .createHash('md5')
    .update(partnerKey + code + serial)
    .digest('hex');

  const request_id = generateRequestId();

  const form = new FormData();
  form.append('partner_id', partnerId);
  form.append('telco', telco);
  form.append('code', code);
  form.append('serial', serial);
  form.append('amount', amount);
  form.append('request_id', request_id);
  form.append('command', 'charging');
  form.append('sign', sign);

  try {
    const res = await tsrClient.post('/chargingws/v2', form, {
      headers: form.getHeaders(),
    });
    if (res.status == 102) throw Error('Lỗi');
    const data = res.data;
    const newRecharge = new rechargesModel({
      trans_id: data.trans_id || null,
      telco,
      code,
      serial,
      amount,
      userId,
      request_id,
      status: Number(data.status),
      message: data.message || 'Không có phản hồi',
    });
    await newRecharge.save();
    return data;
  } catch (err) {
    console.error('Lỗi gọi API:', err.message);
    throw new Error('Kết nối tới nhà cung cấp thất bại');
  }
};
const checkRechargeService = async (partnerKey, partnerId, body) => {
  const { userId } = body;

  // 1. Chỉ tìm giao dịch đang chờ (status 99)
  const rechar = await rechargesModel.findOne({ userId, isDeleted: false, status: '99' });
  if (!rechar) return { success: false, message: 'Không có giao dịch nào đang chờ' };

  // 2. TẠM KHÓA: Đổi status sang 100 (Đang xử lý) để các request 5s tiếp theo bỏ qua
  await rechargesModel.findByIdAndUpdate(rechar._id, { status: '100' });

  try {
    const res = await tsrClient.post('/chargingws/v2', form, {
      headers: form.getHeaders(),
    });
    const data = res.data;

    if (data.status == 1) {
      // 3. Cộng tiền
      await userModel.findByIdAndUpdate(userId, { $inc: { card: Number(data.amount) } });
      // 4. Đánh dấu xong
      await rechargesModel.findByIdAndUpdate(rechar._id, { status: '1' });
      return { success: true, message: 'Nạp tiền thành công', data };
    } else {
      // 5. Nếu lỗi, trả về 99 để FE tiếp tục check hoặc 3 để dừng
      const newStatus = data.status == 3 ? '3' : '99';
      await rechargesModel.findByIdAndUpdate(rechar._id, { status: newStatus });
      return { success: false, message: 'Đang xử lý...', data };
    }
  } catch (err) {
    // 6. Nếu lỗi mạng, trả lại 99 để FE check tiếp ở lần 5s sau
    await rechargesModel.findByIdAndUpdate(rechar._id, { status: '99' });
    throw new Error('Đang kiểm tra...');
  }
};
module.exports = { RechargeService, checkRechargeService };
