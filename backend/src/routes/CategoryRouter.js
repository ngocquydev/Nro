const express = require("express");
const router = express.Router();
const { checkMethod } = require("../middleware/checkMethod");
const CategoryController = require("../controllers/CategoryController");
const apiLimiter = require("../middleware/rateLimiter");
router
  .route("/create")
  .all(checkMethod(["POST"]))
  .post(apiLimiter, CategoryController.createCategory);
router
  .route("/getAll")
  .all(checkMethod(["GET"]))
  .get(apiLimiter, CategoryController.getAllCategory);
router
  .route("/getBySlug/:slug")
  .all(checkMethod(["GET"]))
  .get(CategoryController.getCategoryBySlug);
router
  .route("/delete/:id")
  .all(checkMethod(["DELETE"]))
  .delete(CategoryController.deleteCategory);
module.exports = router;
