const mongoose = require('mongoose');

const HistoryBuySchema = new mongoose.Schema(
  {
    // 1. Ai mua? (Liên kết với bảng User)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Bắt buộc phải có thông tin người mua'],
    },

    // 2. Mua tài khoản nào? (Lưu ID sản phẩm gốc nếu cần đổi trả/bảo hành)
    productId: {
      type: Number,
      ref: 'Product', // Hoặc 'Account' tùy tên model của bạn
      required: true,
    },

    // 3. Thông tin chi tiết của nick TẠI THỜI ĐIỂM MUA
    // (Phải lưu trực tiếp vào đây, phòng trường hợp sản phẩm gốc bị xóa hoặc sửa)
    productInfo: {
      accountData: {
        username: { type: String, required: true },
        password: { type: String, required: true },
      },
    },

    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      min: [0, 'Giá tiền không thể âm'],
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    // 5. Trạng thái giao dịch
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'success',
    },

    // 6. Đánh dấu xóa mềm (Soft delete)
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Tự động tạo trường createdAt (ngày mua) và updatedAt
    timestamps: true,
  }
);

// Tạo index để truy vấn lịch sử theo User nhanh hơn
HistoryBuySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('HistoryBuy', HistoryBuySchema);
