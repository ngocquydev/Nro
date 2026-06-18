const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const validateCategory = require('../middleware/validate-category');
router.get('/getAll', categoryController.getAllCategory);
router.get('/delete/:id', categoryController.deleteCategory);
router.post('/create', validateCategory, categoryController.createCategory);
router.put('/update/:id', validateCategory, categoryController.updateCategory);
module.exports = router;
