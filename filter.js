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
        region: match.region,
        players: match.players.map(player => {
          return {
            match_id: player.match_id,
            account_id: player.account_id,
            deaths: player.deaths,
            denies: player.denies,
            gold: player.gold,
            gold_per_min: player.gold_per_min,
            gold_spent: player.gold_spent,
            hero_damage: player.hero_damage,
            hero_healing: player.hero_healing,
            hero_id: player.hero_id,
            item_0: player.item_0,
            item_1: player.item_1,
            item_2: player.item_2,
            item_3: player.item_3,
            item_4: player.item_4,
            item_5: player.item_5,
            kills: player.kills,
            last_hits: player.last_hits,
            level: player.level,
            obs_placed: player.obs_placed,
            sen_placed: player.sen_placed,
            tower_damage: player.tower_damage,
            xp_per_min: player.xp_per_min,
            isRadiant: player.isRadiant,
            win: player.win,
            lose: player.lose,
            total_gold: player.total_gold,
            total_xp: player.total_xp,
            kills_per_min: player.kills_per_min,
            kda: player.kda,
            abandons: player.abandons,
            rank_tier: player.rank_tier
          };
        })
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
