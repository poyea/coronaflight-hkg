const fs = require('fs');

const readInFile = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });

module.exports = readInFile;
