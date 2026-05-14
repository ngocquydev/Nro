const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes/index");
const connectDB = require("./config/db");
const tsrApi = require("./config/axios");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");
try {
  const serviceAccount = require("../serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin initialized successfully!");
} catch (error) {
  console.error("Firebase Admin init error:", error.message);
}

// 4. Kết nối DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 3001;

// 5. Khởi tạo routes
routes(app);

app.get("/test", (req, res) => {
  res.send("Server đang chạy bình thường!");
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
