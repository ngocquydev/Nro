const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    planed: { type: String, required: true },
    server: { type: Number, required: true },
    accountType: { type: String, required: true },
    card: { type: mongoose.Types.Decimal128, default: 0 },
    atm: { type: mongoose.Types.Decimal128, default: 0 },
    img: { type: String },
    slug: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId, // Lưu ID của category
      ref: "Category", // Tên Model mà bạn muốn trỏ tới
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
