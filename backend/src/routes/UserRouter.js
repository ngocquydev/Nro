const express = require('express');
const router = express.Router();
const { checkIsUser } = require('../middleware/authMiddleware');
const UserController = require('../controllers/UserController');
const { verifyRole } = require('../middleware/authMiddleware');
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/getUser', verifyRole('user'), UserController.getUser);
module.exports = router;
