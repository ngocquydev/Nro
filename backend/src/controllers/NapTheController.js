const NapTheService = require("../services/NapTheService");

const napTheController = async (req, res) => {
  try {
    const { telco, code, serial, amount, request_id } = req.body;

    const result = await NapTheService.sendCardToTSR({
      telco,
      code,
      serial,
      amount,
      request_id,
    });

    // Giả sử TSR trả về status: 1 là thành công/đang chờ xử lý
    return res.status(200).json({
      status: "OK",
      message: "Gửi thẻ thành công",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};

module.exports = { napTheController };
