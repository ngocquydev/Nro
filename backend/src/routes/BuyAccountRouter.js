const express = require('express');
const router = express.Router();
const {
  buyAccountController,
  getHistoryController,
} = require('../controllers/buyAccountController');
const { verifyRole } = require('../middleware/authMiddleware');
router.post('/buyAccount', verifyRole('user'), buyAccountController);
router.get('/getAll/:userId', verifyRole('user'), getHistoryController);
module.exports = router;
