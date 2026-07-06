const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL;
    console.log('MONGO_URL:', mongoURL); // Log cấu hình để debug

    if (!mongoURL) {
      throw new Error('MONGO_URL is not defined in the environment variables');
    }

    // ÉP cấu hình Driver nhận diện Replica Set ngay khi thiết lập kết nối ban đầu
    const connectionOptions = {
      replicaSet: 'rs0', // Tên cụm Replica Set trong Docker của bạn
      directConnection: true, // Ép kết nối thẳng qua IP/Cổng tránh lỗi định tuyến Docker
      serverSelectionTimeoutMS: 5000, // Thử kết nối trong 5s, nếu tạch sẽ báo lỗi ngay lập tức
    };

    // Truyền thêm connectionOptions vào hàm connect
    await mongoose.connect(mongoURL, connectionOptions);

    console.log('👉 Kết nối Mongoose thành công (Replica Set đã được khóa)!');
  } catch (err) {
    console.error('❌ Lỗi Mongoose:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
