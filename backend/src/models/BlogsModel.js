const mongoose = require('mongoose');
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model('CounterBlogs', counterSchema);
const Blogschema = new mongoose.Schema(
  {
    _id: { type: Number },
    uid: { type: String, default: null },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: null,
    },
    descBg: {
      type: String,
      default: null,
    },
    view: {
      type: Number,
      default: 0,
    },
    bgUrl: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    _id: false,
    timestamps: true,
  }
);
Blogschema.pre('save', async function () {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'blogs' },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    this._id = counter.seq;
  }
});
module.exports = mongoose.model('Blogs', Blogschema);
