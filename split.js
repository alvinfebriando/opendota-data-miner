const fs = require('fs').promises;

const split = async () => {
  let matchesData = await fs.readFile('./converted.json', 'utf-8');
  matchesData = JSON.parse(matchesData);
  let players = [];
  let matches = [];

  for (const matchData of matchesData) {
    let data = { ...matchData };
    for (const player of data.players) {
      players.push(player);
    }
    delete data.players;
    matches.push(data);
  }

  await fs.writeFile('./matches.json', JSON.stringify(matches, null, 2));
  await fs.writeFile('./players.json', JSON.stringify(players, null, 2));
};

module.exports = split;
