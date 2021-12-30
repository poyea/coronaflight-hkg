const crawler = require('crawler-request');
const moment = require('moment');
const transform = require('./transform').transform;
const writeToFile = require('../utils/writef');

const writeDir = './out/dump/';

const copyCat = (dog) => {
  crawler('https://www.chp.gov.hk/files/pdf/flights_trains_en.pdf')
    .then((r) => {
      const t = transform(r.text);
      const $ = moment().format('HHmm-DD-MM-YYYY');
      console.log(`Working on ${$}`);
      writeToFile(
        `${writeDir}${$}-raw.txt`,
        r.text,
        'The raw file has been crawled and saved!'
      );
      writeToFile(
        `${writeDir}${$}.txt`,
        t,
        'The file has been fixed and save!'
      );
      writeToFile(
        `${writeDir}latest.txt`,
        t,
        'Local latest dump is updated! - `./out/dump/lastest.txt`'
      );
      console.log('=====');
      dog();
    });
};

module.exports = copyCat;
