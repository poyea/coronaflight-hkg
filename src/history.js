const readInFile = require('../utils/readf');
const checkArr = require('../utils/checkarr');
const writeToFile = require('../utils/writef');

/* ===== ===== History Management ===== ===== */
const history = (dir) => {
  const fileList = [
    readInFile(`${dir}history.json`),
    readInFile(`${dir}latest.json`)
  ];
  Promise.all(fileList)
    .then((result) => {
      const history = Object.values(result[0]);
      const latest = Object.values(result[1]);
      var historyToWrite = history;
      latest.forEach((e) => {
        if (history === null || history === undefined) {
          historyToWrite.push(e);
          return;
        }
        const dum = history.find(
          (his) =>
            his.flight === e.flight &&
                        his.date === e.date &&
                        checkArr(his.seats, e.seats)
        );
        if (dum === undefined) historyToWrite.push(e);
      });
      const writingHistory = JSON.stringify(
        { ...historyToWrite },
        null,
        2
      );
      writeToFile(
        `${dir}history.json`,
        writingHistory,
        `Update checked! Written to ${dir}history.json!`
      );
    })
    .catch((error) => {
      console.log('Unexpected error: ' + error);
    });
};

module.exports = history;
