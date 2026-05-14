const express = require("express");
const router = express.Router();
const { checkMethod } = require("../middleware/checkMethod");
const BlogsController = require("../controllers/BlogsController");
router
  .route("/create")
  .all(checkMethod(["POST"]))
  .post(BlogsController.createBlogs);
router
  .route("/getAllBlogs")
  .all(checkMethod(["GET"]))
  .get(BlogsController.getAllBlogs);
module.exports = router;
