const axios = require("axios");
const tsrApi = axios.create({
  baseURL: process.env.URL_THE_SIEU_RE,
  timeout: 15000,
  maxBodyLength: Infinity,
});

module.exports = tsrApi;
