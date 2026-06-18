const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { recharge, checkRecharge } = require('../controllers/RechargeController');
router.post('/rechargeCard', upload.none(), recharge);
router.post('/checkRecharge', upload.none(), checkRecharge);
module.exports = router;
