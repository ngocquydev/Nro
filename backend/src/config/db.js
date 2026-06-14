const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Kết nối Mongoose thành công!');
    } catch (err) {
        console.error('Lỗi Mongoose:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;