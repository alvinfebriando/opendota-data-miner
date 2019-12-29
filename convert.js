const fs = require('fs').promises;

const getGameMode = async () => {
  let data = await fs.readFile('./constants/game_modes.json', 'utf-8');
  return JSON.parse(data);
};

const getHeroNames = async () => {
  let data = await fs.readFile('./constants/hero_names.json', 'utf-8');
  return JSON.parse(data);
};

const getItems = async () => {
  let data = await fs.readFile('./constants/items.json', 'utf-8');
  return JSON.parse(data);
};

const getLobbyTypes = async () => {
  let data = await fs.readFile('./constants/lobby_types.json', 'utf-8');
  return JSON.parse(data);
};

const getPatch = async () => {
  let data = await fs.readFile('./constants/patch.json', 'utf-8');
  return JSON.parse(data);
};

const getRegion = async () => {
  let data = await fs.readFile('./constants/region.json', 'utf-8');
  return JSON.parse(data);
};

const getMatches = async () => {
  let data = await fs.readFile('./filtered_matches.json', 'utf-8');
  return JSON.parse(data);
};

const convert = async () => {
  let matches = await getMatches();
  let gameMode = await getGameMode();
  let lobbyType = await getLobbyTypes();
  let region = await getRegion();
  let converted = [];

  for (const match of matches) {
    converted = {
      ...match,
      game_mode: gameMode[match.game_mode].name.split('game_mode_')[1],
      lobby_type: lobbyType[match.lobby_type].name.split('lobby_type_')[1],
      start_time_string: new Date(match.start_time * 1000).toLocaleString(),
      region: region[match.region]
    };
  }

  await fs.writeFile('./converted.json', JSON.stringify(converted));
  console.log('Converted filtered match data');
};

convert();
