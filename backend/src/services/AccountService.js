const AccountModel = require('../models/AccountModel');
const { encrypt, decrypt } = require('../util/cryptoAccount');
const create = async (username, password, productId) => {
  try {
    const encryptedPassword = encrypt(password);
    const checkProductId = await AccountModel.findOne({ productId });
    if (checkProductId) {
      return {
        success: false,
        message: 'ProductId already exists',
      };
    }
    const newAccount = new AccountModel({
      username,
      password: encryptedPassword,
      productId,
    });
    const savedAccount = await newAccount.save();
    return savedAccount;
  } catch (error) {
    throw error;
  }
};
const getDetailAccount = async (productId) => {
  try {
    const account = await AccountModel.findOne({ productId });
    const decryptedPassword = decrypt(account.password);
    account.password = decryptedPassword;
    return {
      username: account.username,
      password: account.password,
    };
  } catch (error) {
    throw error;
  }
};
module.exports = { create, getDetailAccount };
