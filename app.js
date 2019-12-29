const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const fs = require('fs').promises;

const http = rateLimit(axios.default.create(), {
  maxRequests: 60,
  perMilliseconds: 60 * 1000
});
