const fs = require('fs');

const writeToFile = (location, content, logging, logFn = console.log) => {
  fs.writeFile(location, content, (err) => {
    if (err) throw err;
    logFn(logging);
  });
};

module.exports = writeToFile;
