const axios = require('axios');
const https = require('https');
const tsrClient = axios.create({
  baseURL: process.env.URL_THE_SIEU_RE,
  timeout: 15000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

module.exports = tsrClient;
