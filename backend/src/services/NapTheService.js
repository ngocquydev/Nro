const tsrApi = require("../config/axios");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config();
const sendCardToTSR = async (cardData) => {
  const { telco, code, serial, amount, request_id } = cardData;
  const params = new URLSearchParams();
  params.append("telco", telco);
  params.append("code", code);
  params.append("serial", serial);
  params.append("amount", amount);
  params.append("request_id", request_id);
  params.append("partner_id", process.env.TSR_PARTNER_ID);
  params.append("command", "charging");
  console.log(process.env.TSR_PARTNER_KEY);
  console.log(code);
  console.log(serial);
  // Tạo chữ ký MD5
  const sign = CryptoJS.MD5(
    process.env.TSR_PARTNER_KEY + code + serial,
  ).toString();
  console.log(sign);
  params.append("sign", sign);

  try {
    const response = await tsrApi.post("/chargingws/v2", params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    // LOG LỖI RA TERMINAL ĐỂ DEBUG (Rất quan trọng)
    console.error("--- CHI TIẾT LỖI TỪ TSR ---");
    if (error.response) {
      // Server TSR trả về lỗi (400, 401, 404, 500...)
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
      throw new Error(
        error.response.data.message ||
          `TSR trả về lỗi: ${error.response.status}`,
      );
    } else if (error.request) {
      // Không kết nối được đến server TSR (Sai URL hoặc chặn IP)
      console.error(
        "Không nhận được phản hồi từ TSR. Kiểm tra lại URL hoặc kết nối mạng.",
      );
      throw new Error("Không thể kết nối đến server Thẻ Siêu Rẻ");
    } else {
      console.error("Lỗi cấu hình:", error.message);
      throw new Error(error.message);
    }
  }
};

module.exports = { sendCardToTSR };
