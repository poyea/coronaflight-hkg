const fs = require('fs');
const moment = require('moment');
const history = require('./history');
const writeToFile = require('../utils/writef');

const writeDir = './out/json/';
const readDir = './out/dump/';

const flightCodeRegex = /(\b([A-Z]\d|[A-Z]{2,3}|\d[A-Z])\d{2,4}\b)/g;
const dateRegex = /^\d{1,2}[./]\d{1,2}[./]\d{4}$/;
const seatsRegex = /\b([A-Z]\d{1,3}|\d{1,3}[A-Z]|Row.*|Row)\b/;
const crewRegex = /\b__CREW\b/;
const pilotRegex = /\b__PILOT\b/;
const pendingRegex = /\b__PENDING\b/;
const infantRegex = /\b__INFANT\b/;
const unknownRegex = /\b__UNKNOWN\b/;
const naRegex = /\b__NA\b/;
const cityRegex = /\b[a-zA-z\s,]+\b/;

const outputWorker = () => {
  fs.readFile(`${readDir}latest.txt`, 'utf8', (err, data) => {
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
          !(
            dataArr[i + 1][0] <= ':' ||
                        dataArr[i + 1].match(seatsRegex) ||
                        dataArr[i + 1].match(crewRegex) ||
                        dataArr[i + 1].match(pilotRegex) ||
                        dataArr[i + 1].match(pendingRegex) ||
                        dataArr[i + 1].match(infantRegex) ||
                        dataArr[i + 1].match(unknownRegex) ||
                        dataArr[i + 1].match(naRegex)
          )
        ) {
          place.push(dataArr[++i]);
        }
        while (dataArr[i] !== '*' && !dataArr[i + 1].match(dateRegex)) {
          if (dataArr[i + 1].match(unknownRegex)) {
            seatsID.push('Unknown'); // Unknown
            ++i;
            break;
          } if (dataArr[i + 1].match(naRegex)) {
            seatsID.push('NA'); // NA
            ++i;
            break;
          } else if (dataArr[i + 1].match(crewRegex)) {
            seatsID.push('CC'); // Cabin Crew
            ++i;
          } else if (dataArr[i + 1].match(pilotRegex)) {
            seatsID.push('Pilot'); // Pilot
            ++i;
          } else if (dataArr[i + 1].match(pendingRegex)) {
            seatsID.push('Pending'); // Pending
            ++i;
          } else if (dataArr[i + 1].match(infantRegex)) {
            seatsID.push('Infant'); // Infant
            ++i;
          } else if (dataArr[i + 1] === 'and') {
            ++i;
          } else {
            seatsID.push(dataArr[++i]);
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
    // console.log(arrayToWrite)
    console.log(`Number of entries: ${retFlightarr.length}`);
    const $ = moment().format('HHmm-DD-MM-YYYY');
    const writingData = JSON.stringify({ ...arrayToWrite }, null, 2);
    writeToFile(
      `${writeDir}${$}.json`,
      writingData,
      `The file has been saved! - ${$}`
    );
    writeToFile(
      `${writeDir}latest.json`,
      writingData,
      `The file has been saved! - ${$} - lastest`
    );
    /* ===== ===== History Management ===== ===== */
    history(writeDir);
  });
};

module.exports = outputWorker;
