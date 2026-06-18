const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    card: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
    },
    atm: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);
