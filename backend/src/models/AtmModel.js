const mongoose = require('mongoose');
const ATMSchema = new mongoose.Schema(
  {
    id: { type: Number },
    transferAmount: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    transactionDate: {
      type: Date,
      required: true,
    },
    gateway: { type: String },
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
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ATM', ATMSchema);
