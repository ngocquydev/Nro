const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model('Counter', counterSchema);
const productSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    planed: { type: String, required: true },
    server: { type: Number, required: true },
    register: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    img: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Cần có ít nhất một ảnh',
      },
    },
    desc: { type: String, required: true },
    ATM: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: (v) => (v ? v.toString() : '0'),
      default: mongoose.Types.Decimal128.fromString('0'),
    },

    slug: {
      type: String,
      ref: 'Category',
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

productSchema.pre('save', async function () {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'product' },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    this._id = counter.seq;
  }
});

module.exports = mongoose.model('Product', productSchema);
