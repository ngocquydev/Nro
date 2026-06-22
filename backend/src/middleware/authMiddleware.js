const admin = require('firebase-admin');
const User = require('../models/UserModel');
// 1. Kiểm tra quyền Admin
const ROLES = {
  ADMIN: {
    name: 'admin',
    permissions: ['read', 'write', 'delete', 'put', 'add'],
  },
  USER: {
    name: 'user',
    permissions: ['read', 'write'],
  },
  GUEST: {
    name: 'guest',
    permissions: ['read'],
  },
};
const checkPermission = (action) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Lấy từ DB hoặc Token
    const roleConfig = ROLES[userRole.toUpperCase()];

    if (roleConfig && roleConfig.permissions.includes(action)) {
      next(); // Có quyền
    } else {
      res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này' });
    }
  };
};
const getAuthenticatedUser = async (token) => {
  if (!token) throw new Error('Token không tồn tại');
  const decodedToken = await admin.auth().verifyIdToken(token);
  const user = await User.findOne({ uid: decodedToken.uid });
  return user;
};
const verifyRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc thiếu' });
      }

      const token = authHeader.split(' ')[1];
      const currentUser = await getAuthenticatedUser(token);

      if (!currentUser) {
        return res.status(401).json({ message: 'User không tồn tại' });
      }

      // Kiểm tra quyền
      if (currentUser.role === requiredRole || currentUser.role === 'admin') {
        req.user = currentUser;
        next();
      } else {
        return res.status(403).json({
          message: `Quyền ${requiredRole} là bắt buộc`,
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
};

module.exports = {
  verifyRole,
  checkPermission,
};
