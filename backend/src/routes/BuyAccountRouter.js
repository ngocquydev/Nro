const express = require('express');
const router = express.Router();
const { buyAccountController } = require('../controllers/buyAccountController');
router.post('/buyAccount', buyAccountController);
module.exports = router;
