const express = require("express");
const router = express.Router();
const { checkIsUser } = require("../middleware/authMiddleware");
const { checkMethod } = require("../middleware/checkMethod");
const UserController = require("../controllers/UserController");
router.post("/register", UserController.createUser);
router.post("/login", checkIsUser, UserController.loginUser);
module.exports = router;
