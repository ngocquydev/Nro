const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL;
    console.log('MONGO_URL:', mongoURL); 

    if (!mongoURL) {
      throw new Error('MONGO_URL is not defined in the environment variables');
    }

    const connectionOptions = {
      replicaSet: 'rs0', 
      directConnection: true, 
      serverSelectionTimeoutMS: 5000,
    };

    await mongoose.connect(mongoURL, connectionOptions);

    console.log('Kết nối Mongoose thành công');
  } catch (err) {
    console.error('Lỗi Mongoose:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
