const AtmModel = require('../models/AtmModel');
const axios = require('axios');
const getqrCode = (params) => {
  const qrUrl = `https://qr.sepay.vn/img?${params}`;
  return qrUrl;
};
const saveWebHook = async (data, userId) => {
  try {
    const { gateway, transactionDate, description, content, transferAmount, id } = data;
    const newAtm = new AtmModel({
      gateway: gateway,
      transactionDate: transactionDate,
      description: description,
      content: content,
      transferAmount: transferAmount,
      id: id,
      amount: transferAmount,
      userId: userId,
      status: 99,
    });
    await newAtm.save();
    return newAtm;
  } catch (error) {
    throw new Error(error);
  }
};
const getTransactionDetails = async (transactionId) => {
  const API_TOKEN = process.env.SEPAY_API_KEY;
  try {
    const res = await axios.get(
      `https://my.sepay.vn/userapi/transactions/details/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Lỗi khi gọi API SePay:', error.response ? error.response.status : error.message);
  }
};
const getHistory = async (userId) => {
  try {
    // Ép kiểu userId về ObjectId và chỉ chọn các trường cần thiết
    const list = await AtmModel.find({
      userId,
    })
      .select({
        _id: 0,
        id: 1,
        amount: 1,
        status: 1,
        transactionDate: 1,
        gateway: 1,
        status: 1,
      })
      .sort({ transactionDate: -1 });

    return list;
  } catch (error) {
    console.error('Lỗi khi lấy history từ DB:', error);
    throw new Error('Không thể truy vấn lịch sử giao dịch');
  }
};
module.exports = { getqrCode, saveWebHook, getTransactionDetails, getHistory };
