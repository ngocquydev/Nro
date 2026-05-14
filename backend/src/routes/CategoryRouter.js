const express = require("express");
const router = express.Router();
const { checkMethod } = require("../middleware/checkMethod");
const CategoryController = require("../controllers/CategoryController");
router
  .route("/create")
  .all(checkMethod(["POST"]))
  .post(CategoryController.createCategory);
router
  .route("/getAll")
  .all(checkMethod(["GET"]))
  .get(CategoryController.getAllCategory);
router
  .route("/getBySlug/:slug")
  .all(checkMethod(["GET"]))
  .get(CategoryController.getCategoryBySlug);
router
  .route("/delete/:id")
  .all(checkMethod(["DELETE"]))
  .delete(CategoryController.deleteCategory);
module.exports = router;
