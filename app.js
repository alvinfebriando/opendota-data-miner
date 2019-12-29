const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const fs = require('fs').promises;

const http = rateLimit(axios.default.create(), {
  maxRequests: 60,
  perMilliseconds: 60 * 1000
});

const getPublicMatches = async () => {
  let response = await http.get('https://api.opendota.com/api/publicMatches');
  return response;
};

const getMatchData = async match_id => {
  let response = await http.get(
    `https://api.opendota.com/api/matches/${match_id}`
  );
  return response;
};
