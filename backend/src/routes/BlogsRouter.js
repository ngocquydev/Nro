const express = require('express');
const router = express.Router();
const { getAll, create, getDetails } = require('../controllers/BlogsController');
const validateBlogs = require('../validation/validate-blogs');
router.get('/getAll', getAll);
router.post('/create', validateBlogs, create);
router.get('/getId/:id', getDetails);
module.exports = router;
