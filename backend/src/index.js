const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
const routes = require("./routes/index");
const {connectDB} = require("./config/db");
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
app.set("trust proxy", 1);
// Middleware
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Private-Network", "true");
  next();
});
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
