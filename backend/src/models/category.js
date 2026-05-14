const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    titleCategory: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    desc: { type: String },
    slug: { type: String, lowercase: true, trim: true },
    img: { type: String },
    quantitySold: { type: mongoose.Schema.Types.Decimal128, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);
