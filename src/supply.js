const fs = require('fs');
const moment = require('moment');
const history = require('./history');
const writeToFile = require('../utils/writeFile');
const TagTransformer = require('./transform').TagTransformer;

const WRITE_DIR = './out/json/';
const READ_DIR = './out/dump/';

const flightCodeRegex = /(\b([A-Z]\d|[A-Z]{2,3}|\d[A-Z])\d{2,4}\b)/g;
const dateRegex = /^\d{1,2}[./]\d{1,2}[./]\d{4}$/;
const seatsRegex = /\b([A-Z]\d{1,3}|\d{1,3}[A-Z]?|Row.*|Row)\b/;
const cityRegex = /\b[a-zA-z\s,]+\b/;

const outputWorker = () => {
  fs.readFile(`${READ_DIR}latest.txt`, 'utf8', (err, data) => {
    if (err) throw err;
    const retFlightarr = data.match(flightCodeRegex);
    let flightArrayIndex = 0;
    const dataArr = data.replace(/\s+/g, ' ').split(' ');
    const n = dataArr.length;
    const arrayToWrite = [];
    for (let i = 0; i < n; ++i) {
      if (dataArr[i] === retFlightarr[flightArrayIndex] && dataArr[i + 1].match(cityRegex)) {
        const place = [];
        const seatsID = [];
        while (
          !(dataArr[i + 1].match(seatsRegex) || TagTransformer.isCustomTag(dataArr[i + 1]))
        ) {
          place.push(dataArr[i + 1]);
          ++i;
        }
        for (;dataArr[i] !== '*' && !dataArr[i + 1].match(dateRegex); ++i) {
          if (TagTransformer.isUnknownOrNA(dataArr[i + 1])) {
            seatsID.push(TagTransformer.customTagToDesc(dataArr[i + 1])); // Unknown || NA
            break;
          } else if (TagTransformer.isCustomTag(dataArr[i + 1])) {
            seatsID.push(TagTransformer.customTagToDesc(dataArr[i + 1])); // Cabin Crew || Pilot || Pending || Infant
          } else if (dataArr[i + 1] !== 'and') {
            seatsID.push(dataArr[i + 1]);
          }
        }
        let formattedDate = dataArr[++i].split('/');
        formattedDate[0] = String('0' + formattedDate[0]).slice(-2);
        formattedDate[1] = String('0' + formattedDate[1]).slice(-2);
        formattedDate = formattedDate.join('/');
        const objectToAdd = {
          flight: retFlightarr[flightArrayIndex],
          departure: place,
          seats: seatsID,
          date: formattedDate
        };
        arrayToWrite.push(objectToAdd);
        ++flightArrayIndex;
      } else if (dataArr[i].match(/[*]*(\s+)*Passengers/)) {
        break;
      }
    }

    console.log(`Number of entries: ${retFlightarr.length}`);
    const $ = moment().format('HHmm-DD-MM-YYYY');
    const writingData = JSON.stringify({ ...arrayToWrite }, null, 2);
    writeToFile(
      `${WRITE_DIR}${$}.json`,
      writingData,
      `The file has been saved! - ${$}`
    );
    writeToFile(
      `${WRITE_DIR}latest.json`,
      writingData,
      `The file has been saved! - ${$} - lastest`
    );
    /* ===== ===== History Management ===== ===== */
    history(WRITE_DIR);
  });
};

module.exports = outputWorker;
