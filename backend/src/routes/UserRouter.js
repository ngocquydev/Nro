const express = require("express");
const router = express.Router();
const { checkIsUser } = require("../middleware/authMiddleware");
const { checkMethod } = require("../middleware/checkMethod");
const UserController = require("../controllers/UserController");
const {dbRoleMiddleware} = require("../middleware/authMiddleware");
router.post("/register", UserController.createUser);
router.post("/login",dbRoleMiddleware,checkIsUser, UserController.loginUser);
module.exports = router;
