const fs = require('fs').promises;

const getItems = (items, item_id) => {
  for (const item in items) {
    if (items[item].id === item_id) {
      return items[item].dname;
    }
  }
};

const getHeroNames = (heroes, hero_id) => {
  for (const hero in heroes) {
    if (heroes[hero].id === hero_id) {
      return heroes[hero].localized_name;
    }
  }
};

const convert = async () => {
  let matches = await fs.readFile('./matches.json', 'utf-8');
  let gameMode = await fs.readFile('./constants/game_modes.json', 'utf-8');
  let lobbyType = await fs.readFile('./constants/lobby_types.json', 'utf-8');
  let region = await fs.readFile('./constants/region.json', 'utf-8');
  let heroes = await fs.readFile('./constants/hero_names.json', 'utf-8');
  let items = await fs.readFile('./constants/items.json', 'utf-8');

  matches = JSON.parse(matches);
  heroes = JSON.parse(heroes);
  items = JSON.parse(items);
  gameMode = JSON.parse(gameMode);
  lobbyType = JSON.parse(lobbyType);
  region = JSON.parse(region);

  let converted = [];

  for (const match of matches) {
    let players = [];
    for (const player of match.players) {
      let playerData = {};
      playerData = { ...player };
      playerData.hero_id = getHeroNames(heroes, player.hero_id);
      playerData.item_0 = getItems(items, player.item_0);
      playerData.item_1 = getItems(items, player.item_1);
      playerData.item_2 = getItems(items, player.item_2);
      playerData.item_3 = getItems(items, player.item_3);
      playerData.item_4 = getItems(items, player.item_4);
      playerData.item_5 = getItems(items, player.item_5);
      players.push(playerData);
    }
    converted.push({
      ...match,
      game_mode: gameMode[match.game_mode].name.split('game_mode_')[1],
      lobby_type: lobbyType[match.lobby_type].name.split('lobby_type_')[1],
      start_time_string: new Date(match.start_time * 1000).toLocaleString(),
      region: region[match.region],
      players: [...players]
    });
  }
  await fs.writeFile('./converted.json', JSON.stringify(converted, null, 2));
  console.log('Converted filtered match data');
};

module.exports = convert;
