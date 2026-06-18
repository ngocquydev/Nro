const express = require('express');
const router = express.Router();
const { checkIsUser } = require('../middleware/authMiddleware');
const { checkMethod } = require('../middleware/checkMethod');
const UserController = require('../controllers/UserController');
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/getUser', UserController.getUser);
module.exports = router;
