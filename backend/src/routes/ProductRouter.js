const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { checkMethod } = require("../middleware/checkMethod");
router
  .route("/create")
  .all(checkMethod(["POST"]))
  .post(ProductController.createProduct);
router
  .route("/createDetail")
  .all(checkMethod(["POST"]))
  .post(ProductController.createDetail);
router
  .route("/getBySlug")
  .all(checkMethod(["GET"]))
  .get(ProductController.getProductsBySlug);
router
  .route("/getDetails")
  .all(checkMethod(["GET"]))
  .get(ProductController.getDetails);
module.exports = router;
