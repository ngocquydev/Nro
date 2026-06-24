const mongoose = require('mongoose');
const rechargesSchema = new mongoose.Schema(
  {
    trans_id: { type: Number },
    request_id: { type: String, required: true },
    telco: { type: String, required: true },
    code: { type: String, required: true },
    serial: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    desc: { type: String },
    type: { type: String },
    amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recharge', rechargesSchema);
