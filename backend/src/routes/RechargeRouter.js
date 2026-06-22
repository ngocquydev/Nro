const express = require('express');
const router = express.Router();
const multer = require('multer');
const validateRecharge = require('../middleware/validate-recharges');
const { verifyRole, checkPermission } = require('../middleware/authMiddleware');
const upload = multer();
const { recharge, checkRecharge, listHistory } = require('../controllers/RechargeController');
router.post(
  '/rechargeCard',
  upload.none(),
  validateRecharge,
  verifyRole('user'),
  checkPermission('add'),
  recharge
);
router.post(
  '/checkRecharge',
  upload.none(),
  verifyRole('user'),
  checkPermission('read'),
  checkRecharge
);
router.get('/listHistory', upload.none(), verifyRole('user'), checkPermission('read'), listHistory);
module.exports = router;
