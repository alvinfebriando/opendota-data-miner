const fs = require('fs').promises;

const getMatches = async file => {
  let matches = await fs.readFile(`./output/${file}`, 'utf-8');
  return JSON.parse(matches);
};

const filter = async () => {
  let files = await fs.readdir('./output');
  const fileContentPromises = files.map(async file => {
    let matches = await getMatches(file);
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
      `./filtered/${file}`,
      JSON.stringify(filteredMatches, null, 2)
    );
    console.log(`${file} filtered`);
  });

  await Promise.all(fileContentPromises);
};

module.exports = filter;
