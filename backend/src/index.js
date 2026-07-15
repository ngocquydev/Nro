const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
const { getTransactionDetails } = require('./services/atmService');
const AtmModel = require('./models/AtmModel');
const User = require('./models/UserModel');
const cron = require('node-cron');
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
    await connectDB();

    const app = express();
    app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      })
    );

    app.set('trust proxy', 1);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.raw({ type: '*/*' }));
    setInterval(async () => {
      let isSyncing = false;
      if (isSyncing) return;
      isSyncing = true;

      try {
        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

        await AtmModel.updateMany(
          { status: 99, createdAt: { $lt: fiveMinutesAgo } },
          { $set: { status: 3 } }
        );

        // 2. Tìm đơn đang xử lý
        const activeOrders = await AtmModel.find({
          status: 99,
          createdAt: { $gte: fiveMinutesAgo },
        });

        // 3. Xử lý song song bằng Promise.all (Nhanh hơn nhiều so với vòng lặp)
        await Promise.all(
          activeOrders.map(async (order) => {
            const valueAsNumber = Number(order.amount.toString());
            const cleanAmount = Math.round(valueAsNumber * 100) / 100;
            try {
              const transaction = await getTransactionDetails(order.id);
              if (transaction) {
                // Cập nhật trạng thái đơn
                order.status = 1;
                await order.save();

                await User.updateOne({ _id: order.userId }, { $inc: { atm: cleanAmount } });
              }
            } catch (innerErr) {
              console.error(`Lỗi xử lý nạp thẻ ${order._id}:`, innerErr);
            }
          })
        );
      } catch (err) {
        console.error('Lỗi quét đơn:', err);
      } finally {
        isSyncing = false;
        clearInterval();
      }
    }, 5000);

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
