const rateLimit = require("express-rate-limit");

// Cấu hình bộ giới hạn
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Khoảng thời gian: 15 phút
  max: 100, // Mỗi IP chỉ được phép 100 request trong 15 phút trên
  message: {
    status: 429,
    message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.",
  },
  standardHeaders: true, // Trả về thông tin giới hạn trong header `RateLimit-*`
  legacyHeaders: false, // Tắt các header cũ `X-RateLimit-*`
});

module.exports = apiLimiter;
