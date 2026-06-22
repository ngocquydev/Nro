const getqrCode = (params) => {
  const qrUrl = `https://qr.sepay.vn/img?${params}`;
  return qrUrl;
};
const renderWebHook = (data) => {
  return data;
};
module.exports = { getqrCode, renderWebHook };
