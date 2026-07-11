const AccountModel = require('../models/AccountModel');
const ProductModel = require('../models/ProductsModel');
const { encrypt, decrypt } = require('../util/cryptoAccount');
const create = async (username, password, productId) => {
  try {
    const existingAccount = await AccountModel.findOne({ productId });
    if (existingAccount) {
      return {
        success: false,
        message: 'ProductId already exists',
      };
    }
    const product = await ProductModel.findById(productId);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    const encryptedPassword = encrypt(password);
    const newAccount = await AccountModel.create({
      username: username,
      password: encryptedPassword,
      productId: product._id,
    });

    return {
      data: {
        username: newAccount.username,
        password: encryptedPassword,
        productId,
      },
    };
  } catch (error) {
    console.error('Create account error:', error);
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
