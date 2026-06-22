const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');

// Load env
dotenv.config({ path: '../.env' });

const routes = require('./routes/index');
const connectDB = require('./config/db');

// Khởi tạo Firebase Admin
try {
  const serviceAccount = require('../serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin initialized successfully!');
} catch (error) {
  console.error('Firebase Admin init error:', error.message);
}

async function startServer() {
  try {
    // 1. Kết nối DB trước
    await connectDB();

    const app = express();

    // 2. Cấu hình CORS - Quan trọng để React không bị chặn
    app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true, // Bật nếu bạn dùng cookies/session/JWT
      })
    );

    app.set('trust proxy', 1);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.raw({ type: '*/*' }));
    routes(app);

    app.use((req, res, next) => {
      res.status(404).json({
        success: false,
        message: 'Endpoint không tồn tại. Hãy kiểm tra lại tiền tố /api',
      });
    });

    // 5. Khởi động server
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log('Server is running on port:', port);
    });
  } catch (err) {
    console.error('Không thể khởi động server:', err);
    process.exit(1);
  }
}

startServer();
