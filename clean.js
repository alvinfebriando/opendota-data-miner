const filter = require('./filter');
const merge = require('./merge');
const convert = require('./convert');
const split = require('./split');

const start = async () => {
  console.log('filtering...');
  await filter();
  console.log('merging...');
  await merge();
  console.log('converting...');
  await convert();
  console.log('splitting...');
  await split();
};

start().then(() => {
  console.log('Finished');
});
