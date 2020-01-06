const fs = require('fs').promises;

const split = async () => {
  let matchesData = await fs.readFile('./matches.json', 'utf-8');
  matchesData = JSON.parse(matchesData);
  let players = [];

  for (const matchData of matchesData) {
    players.push(matchData.player);
    delete matchesData.player;
  }

  await fs.writeFile('./matches.json', JSON.stringify(matchesData, null, 2));
  await fs.writeFile('./players.json', JSON.stringify(players, null, 2));
};

module.export = split;
