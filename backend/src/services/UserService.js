const User = require('../models/UserModel');
const createUser = async (userData) => {
  try {
    const checkUser = await User.findOne({ username: userData.username });
    if (checkUser) {
      return { status: 'ERR', message: 'Username already exists' };
    }

    const createdUser = await User.create({
      uid: userData.uid,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      role: userData.role || 'user',
    });

    return { status: 'OK', message: 'SUCCESS', data: createdUser };
  } catch (error) {
    console.error('Lỗi thực tế tại Mongoose:', error);
    throw error;
  }
};
const loginUser = async (uid) => {
  try {
    const checkUser = await User.findOne({ uid: uid });
    if (checkUser) {
      return { status: 'OK', message: 'SUCCESS' };
    }
    return { status: 'ERR', message: 'User not found' };
  } catch (error) {
    throw error;
  }
};
const getUserByUID = async (uid) => {
  try {
    const checkUser = await User.findOne({ uid: uid });

    if (checkUser) {
      return {
        status: 'OK',
        message: 'SUCCESS',
        data: checkUser,
      };
    }
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createUser,
  loginUser,
  getUserByUID,
};
