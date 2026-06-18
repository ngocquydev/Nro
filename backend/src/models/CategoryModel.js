const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  bgUrl: { type: String, required: false },
  desc: { type: String, required: true },
  quantitySold: { type: Number, default: 0, min: [0, 'Số lượng không thể âm'] },
  slug: { type: String, unique: true, required: true, index: true },
  isDeleted: { type: Boolean, default: false },
});
module.exports = mongoose.model('Category', categorySchema);
