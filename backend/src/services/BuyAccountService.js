const mongoose = require('mongoose');
const HistoryBuyModel = require('../models/HistoryBuyModel');
const UserModel = require('../models/UserModel');
const ProductsModel = require('../models/ProductsModel');
const AccountModel = require('../models/AccountModel');
const Catergory = require('../models/CategoryModel');
const { decrypt } = require('../util/cryptoAccount');
const CategoryModel = require('../models/CategoryModel');
const buyAccountService = async (userId, productId, paymentMethod) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await UserModel.findById(userId).session(session);
    const product = await ProductsModel.findOne({
      _id: productId,
      isDeleted: false,
    }).session(session);
    const account = await AccountModel.findOne({ productId }).session(session);
    if (!account) {
      return {
        success: false,
        message: 'Tài khoản chưa được cập nhật',
      };
    }
    if (!product || !user)
      return {
        success: false,
        message: 'Tài khoản đã được mua',
      };
    if (paymentMethod !== 'ATM' && paymentMethod !== 'Card')
      return {
        success: false,
        message: 'Phương thức không hợp lệ',
      };

    // Xác định số tiền cần trừ
    const isATM = paymentMethod === 'ATM';
    const priceToPay = isATM ? Number(product.ATM) : Number(product.Card);
    const currentBalance = isATM ? Number(user.atm) : Number(user.card);

    if (currentBalance < priceToPay) {
      return {
        success: false,
        message: `Không đủ tiền, còn thiếu ${(priceToPay - currentBalance).toLocaleString('en-US')}`,
      };
    }

    // Trừ tiền: Dùng $inc với số âm
    const updateField = isATM ? { atm: -priceToPay } : { card: -priceToPay };
    const updateRes = await UserModel.updateOne(
      { _id: userId },
      { $inc: updateField },
      { session }
    );

    if (updateRes.modifiedCount === 0)
      return {
        success: false,
        message: 'Cập nhật ví thất bại',
      };

    // Cập nhật sản phẩm
    await ProductsModel.findByIdAndUpdate(productId, { isDeleted: true }, { session });
    await CategoryModel.findOneAndUpdate(
      { slug: product.slug },
      { $inc: { quantitySold: -1 } },
      { session: session }
    );
    // Lưu lịch sử
    await HistoryBuyModel.create(
      [
        {
          userId,
          productId,
          productInfo: { accountData: { username: account.username, password: account.password } },
          price: priceToPay,
          paymentMethod,
          status: 'success',
        },
      ],
      { session }
    );

    await session.commitTransaction();
    return { Username: account.username, Password: decrypt(account.password) };
  } catch (error) {
    await session.abortTransaction();
    return { success: false, message: error.message };
  } finally {
    session.endSession();
  }
};
const getHistoryService = async (userId) => {
  try {
    const list = await HistoryBuyModel.find({ userId: userId }).sort({ createdAt: -1 });
    if (!list)
      return {
        message: 'Not found',
      };
    return list;
  } catch (error) {
    throw error;
  }
};

module.exports = { buyAccountService, getHistoryService };
