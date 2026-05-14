const express = require("express");
const router = express.Router();
const { checkMethod } = require("../middleware/checkMethod");
const multer = require("multer");
const upload = multer();
const NapTheController = require("../controllers/NapTheController");
router.post(
  "/create",
  (req, res, next) => {
    upload.none()(req, res, (err) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi giải mã Form-Data" });
      }
      next();
    });
  },
  NapTheController.napTheController,
);
module.exports = router;
