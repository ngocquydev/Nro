const express = require('express');
const router = express.Router();
const { createAccount, getAccountDetail } = require('../controllers/AccountController');
router.post('/create', createAccount);
router.get('/detail/:id', getAccountDetail);
module.exports = router;
