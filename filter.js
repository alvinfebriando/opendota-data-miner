const fs = require('fs').promises;

const getMatches = async () => {
  let matches = await fs.readFile('./matches.json', 'utf-8');
  return JSON.parse(matches);
};

const filter = async () => {
  let matches = await getMatches();
  let filteredMatches = [];

  for (const match of matches) {
    filteredMatches.push({
      match_id: match.match_id,
      duration: match.duration,
      radiant_win: match.radiant_win,
      game_mode: match.game_mode,
      lobby_type: match.lobby_type,
      radiant_score: match.radiant_score,
      dire_score: match.dire_score,
      start_time: match.start_time,
      replay_url: match.replay_url,
      version: match.version,
      patch: match.patch_id,
      region: match.region
    });
  }

  await fs.writeFile(
    './filtered_matches.json',
    JSON.stringify(filteredMatches)
  );

  console.log(`Filtered ${filteredMatches.length} matches`);
};

module.exports = filter;
