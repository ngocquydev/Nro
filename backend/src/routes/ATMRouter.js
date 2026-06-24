const express = require('express');
const router = express.Router();
const { getQrCode, handleWebHook, getHistoryController } = require('../controllers/atmController');
router.get('/getQrCode', getQrCode);
router.post('/webhook', handleWebHook);
router.get('/listHistoryATM', getHistoryController);
module.exports = router;
