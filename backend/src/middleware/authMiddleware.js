const admin = require('firebase-admin');
const User = require('../models/UserModel');

const getAuthenticatedUser = async (token) => {
  if (!token) return null;
  const decodedToken = await admin.auth().verifyIdToken(token);
  const user = await User.findOne({ uid: decodedToken.uid });

  if (user) {
    return user;
  }

  return null;
};

// 1. Kiểm tra quyền Admin
const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.token?.split(' ')[1];
    const currentUser = await getAuthenticatedUser(token);

    if (currentUser?.role === 'admin') {
      req.user = currentUser;
      next();
    } else {
      return res.status(403).json({
        message: 'Quyền Admin là bắt buộc',
        status: 'ERROR',
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: 'Token không hợp lệ hoặc hết hạn',
      status: 'ERROR',
    });
  }
};

const authUserMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.token?.split(' ')[1];
    const userIdInParams = req.params.id;

    const currentUser = await getAuthenticatedUser(token);

    if (currentUser?.role === 'admin' || currentUser?._id.toString() === userIdInParams) {
      req.user = currentUser;
      next();
    } else {
      return res.status(403).json({
        message: 'Bạn không có quyền thực hiện hành động này',
        status: 'ERROR',
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: 'Xác thực thất bại',
      status: 'ERROR',
    });
  }
};

const checkIsUser = async (req, res, next) => {
  try {
    const token = req.headers.token?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ status: 'ERROR', message: 'Token missing' });
    }

    const currentUser = await getAuthenticatedUser(token);

    if (currentUser) {
      return res.status(200).json({
        status: 'OK',
        message: 'Xác thực thành công',
        data: currentUser,
      });
    }

    return res.status(403).json({
      status: 'ERROR',
      message: 'Vui lòng đăng nhập lại',
    });
  } catch (err) {
    return res.status(401).json({
      status: 'ERROR',
      message: 'Token không hợp lệ hoặc đã hết hạn',
    });
  }
};
module.exports = {
  authMiddleWare,
  authUserMiddleWare,
  checkIsUser,
};
