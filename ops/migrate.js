const readInFile = require('../utils/readFile');
const writeToFile = require('../utils/writeFile');

readInFile('./out/json/history_deprecated.json').then((res) => {
  const item = Object.values(res);
  item.forEach(h => {
    if (h.path !== undefined) {
      const all = [];
      let s = [];
      for (let i = 0; i < h.path.length; ++i) {
        if (h.path[i] !== '→') {
          s.push(h.path[i]);
        } else {
          all.push(s.join(' '));
          s = [];
        }
      }
      all.push(s.join(' '));
      h.path = all.join(' → ');
    }
  });
  var itemToWrite = item;
  const writingItem = JSON.stringify(
    { ...itemToWrite },
    null,
    2
  );
  writeToFile(
    './out/json/history.json',
    writingItem,
    'Migration checked! Written to ./out/json/history.json!'
  );
})
  .catch((error) => {
    console.log('Unexpected error: ' + error);
  });
