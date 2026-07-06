const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
