const fs = require('fs').promises;

const merge = async () => {
  let uniqueId = new Set();
  let files = await fs.readdir('./filtered');
  let merged = [];

  const filesContentPromises = files.map(async file => {
    let matches = await fs.readFile(`./filtered/${file}`, 'utf-8');
    try {
      matches = JSON.parse(matches);
      matches.map(match => {
        if (!uniqueId.has(match.match_id)) {
          uniqueId.add(match.match_id);
          merged.push(match);
        }
      });
    } catch (err) {
      console.error(err);
    }
  });

  await Promise.all(filesContentPromises);
  await fs.writeFile('./matches.json', JSON.stringify(merged, null, 2));
  merged = await fs.readFile('./matches.json', 'utf-8');
  console.log(`Total data: ${JSON.parse(merged).length}`);
};

module.exports = merge;
