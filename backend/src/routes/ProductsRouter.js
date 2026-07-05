const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProducts = require('../validation/validate-products');
const { verifyRole, checkPermission } = require('../middleware/authMiddleware');
router.get(
  '/getAll',
  // verifyRole('user'),
  // checkPermission('read'),
  productController.getAllProducts
);
// router.get('/delete/:id', checkPermission('delete'), productController.deleteProduct);
router.post(
  '/create',
  // verifyRole('admin'),
  // checkPermission('add'),
  validateProducts,
  productController.createProducts
);
router.get('/:id', productController.getById);
// router.put('/update/:id', checkPermission('put'), validateProducts, productController.updateProduct);
module.exports = router;
