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

const formatTime = () => {
  let time = new Date();
  let timeString = time.toLocaleString();
  timeString = timeString.split(',').join('');
  let date = timeString
    .split(' ')[0]
    .split('/')
    .join('-');
  d = date.split('-')[1];
  m = date.split('-')[0];
  y = date.split('-')[2];
  if (d.length == 1) {
    d = '0' + d;
  }
  date = `${m}-${d}-${y}`;
  let hour = timeString.split(' ')[1];
  let period = timeString.split(' ')[2];

  timeString = `${date} ${hour} ${period}`;
  return timeString;
};
