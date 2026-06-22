const express = require('express');
const router = express.Router();
const { getQrCode, handleWebHook } = require('../controllers/atmController');
router.get('/getQrCode', getQrCode);
router.post('/webhook', handleWebHook);
module.exports = router;
