const mongoose = require('mongoose');

const buyAccountService = async (userId, productId, paymentMethod) => {
  console.log('============= KHỞI CHẠY GIẢ LẬP CHUYỂN TIỀN CHUẨN =============');

  let mockUserBalance = 500000;
  let mockProductPrice = 120000;
  let mockSellerBalance = 0;

  const session = await mongoose.startSession();
  console.log('👉 Bước 1: Khởi tạo MongoDB Session OK.');

  try {
    session.startTransaction();
    console.log('👉 Bước 2: Đã kích hoạt Transaction OK.');

    // CHỈ SỬA BƯỚC 3 TẠI ĐÂY:
    // Thay vì Ping, ta thực hiện một lệnh tìm kiếm vô hại trên một bảng tạm bằng Driver thuần
    // Lệnh này được hỗ trợ 100% trong transaction
    await mongoose.connection.db.collection('temp_test_transaction').findOne({}, { session });
    console.log('👉 Bước 3: Gửi lệnh Transaction hợp lệ lên MongoDB OK.');

    // 4. Logic biến JS
    if (mockUserBalance < mockProductPrice) {
      throw new Error('Tài khoản không đủ số dư!');
    }
    mockUserBalance -= mockProductPrice;
    mockSellerBalance += mockProductPrice;
    console.log('👉 Bước 4: Tính toán biến JS OK.');

    // 5. Xác nhận lưu
    await session.commitTransaction();
    console.log('👉 Bước 5: Commit Transaction THÀNH CÔNG RỰC RỠ!');

    console.log(`🏦 [Kết quả] Người mua: ${mockUserBalance}đ | Người bán: ${mockSellerBalance}đ`);
    return {
      success: true,
      data: { buyer: mockUserBalance, seller: mockSellerBalance },
    };
  } catch (error) {
    console.log('❌ Giao dịch thất bại!');
    await session.abortTransaction();
    console.error('Nội dung lỗi:', error.message);
    return { success: false, error: error.message };
  } finally {
    await session.endSession();
    console.log('============= KẾT THÚC GIẢ LẬP =============');
  }
};

module.exports = { buyAccountService };
