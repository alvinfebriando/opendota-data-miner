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

const start = async () => {
  let matchIdArr = [];
  let matchDataArr = [];

  try {
    let result = await getPublicMatches();

    for (const iterator of result.data) {
      matchIdArr.push(iterator.match_id);
    }

    console.log('Got 100 match IDs');

    for (let [i, v] of matchIdArr.entries()) {
      try {
        let r = await getMatchData(v);
        console.log(`Got match ${++i} data | id: ${r.data.match_id}`);
        matchDataArr.push(r.data);
      } catch (err) {
        if (err.response) {
          if (err.response.data.error) {
            console.log(err.response.data.error);
          } else {
            console.log('Something went wrong');
          }
        }
      }
    }

    await fs.writeFile(
      `./output/${formatTime()}.json`,
      JSON.stringify(matchDataArr)
    );
    console.log(
      '----------------------------------------------------------------------------'
    );
    console.log(`Save match data to ${__dirname}/output/${formatTime()}.json`);
    console.log(
      '----------------------------------------------------------------------------'
    );
  } catch (err) {
    if (err.response) {
      if (err.response.data.error) {
        console.log(err.response.data.error);
      } else {
        console.log('Something went wrong');
      }
    }
  }
};

start();

setInterval(start, 1000 * 60 * 15);
