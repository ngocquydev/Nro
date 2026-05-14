const UserService = require("../services/UserService");
const createUser = async (req, res) => {
  try {
    const { uid, username, email, phone, role } = req.body;
    if (!uid || !username || !email || !phone) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required (uid, username, email, phone)",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || e,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required (uid)",
      });
    }
    const response = await UserService.loginUser(uid);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};
