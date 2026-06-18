const UserService = require('../services/UserService');
const createUser = async (req, res) => {
  try {
    const { uid, username, email, phone, role } = req.body;
    if (!uid || !username || !email || !phone) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required (uid, username, email, phone)',
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: 'ERR',
      message: e.message || e,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required (uid)',
      });
    }
    const response = await UserService.loginUser(uid);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: 'ERR',
      message: e.message || e,
    });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await UserService.getUserByUID(req.body.uid);
    return res.status(200).json({
      status: 'OK',
      message: 'Success',
      data: user,
    });
  } catch (error) {
    console.error('lỗi:', error);
    return res.status(500).json({
      status: 'ERR',
      message: error.message || error,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  getUser,
};
