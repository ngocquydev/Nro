const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const validateCategory = require('../middleware/validate-category');
const { verifyRole, checkPermission } = require('../middleware/authMiddleware');
router.get(
  '/getAll',

  categoryController.getAllCategory
);
router.get(
  '/delete/:id',
  verifyRole('admin'),
  checkPermission('delete'),
  categoryController.deleteCategory
);
router.post(
  '/create',
  verifyRole('admin'),
  checkPermission('add'),
  validateCategory,
  categoryController.createCategory
);
router.put(
  '/update/:id',
  verifyRole('admin'),
  checkPermission('update'),
  validateCategory,
  categoryController.updateCategory
);
module.exports = router;
