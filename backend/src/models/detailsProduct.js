const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    desc: { type: String, require: true },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    product: {
      type: Number,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ProductDetail", productSchema);
