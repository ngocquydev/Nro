const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    strict: false,
  },
);
module.exports = mongoose.model("blogs", BlogSchema);
