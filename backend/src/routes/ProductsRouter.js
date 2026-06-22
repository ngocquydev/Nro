const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateCategory = require('../middleware/validate-category');
const { verifyRole, checkPermission } = require('../middleware/authMiddleware');
router.get(
  '/getAll',
  verifyRole('user'),
  checkPermission('read'),
  productController.getAllProducts
);
// router.get('/delete/:id', checkPermission('delete'), productController.deleteProduct);
router.post(
  '/create',
  verifyRole('admin'),
  checkPermission('add'),
  productController.createProducts
);
router.get('/getById/:id', verifyRole('user'), checkPermission('read'), productController.getById);
// router.put('/update/:id', checkPermission('put'), validateCategory, productController.updateProduct);
module.exports = router;
