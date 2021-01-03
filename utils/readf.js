const fs = require('fs');

function readInFile (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

module.exports = readInFile;
