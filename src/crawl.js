const fs = require('fs');
const crawler = require('crawler-request');
const moment = require('moment');

const writeDir = './out/dump/';

const copyCat = async (dog) => {
  await crawler('https://www.chp.gov.hk/files/pdf/flights_trains_en.pdf')
    .then(
      r => {
        const t = r.text
          .replace(/[\r\n]+/gm, '')
          .replace(/→/g, ' → ')
          .replace(/[Cc]lass/gm, '')
          .replace(/[Ee]conomy/gm, '')
          .replace(/[Bb]usiness/gm, '')
          .replace(/[Ff]irst/gm, '')
          .replace(/[Uu]nknown/g, ':')
          .replace(/[Cc]abin[\s\r\n]+[Cc]rew/g, '__CREW')
          .replace(/(P[\s\r\n]+ilo[\s\r\n]+t)/, 'Pilot')
          .replace(/[Pp]ilot/g, '__PILOT')
          .replace(/\bTok\syo\b/g, 'Tokyo')
          .replace(/(M[\s\r\n]+a[\s\r\n]+nila)/g, 'Manila')
          .replace(/(K[\s\r\n]+uala)/g, 'Kuala')
          .replace(/\Band/, '')
          .replace(/and\s\s/, '')
          .replace(/, then/g, '')
          .replace(/(\(infant[\s\r\n]+bassinet\))/g, '')
          .replace(/,/g, '')
          .replace(/(Row)[\s\r\n]+(\d+)/g, '$1$2');
        const $ = moment().format('HHmm-DD-MM-YYYY');
        console.log(`Working on ${$}`);
        fs.writeFile(`${writeDir}${$}-raw.txt`, r.text, (err) => {
          if (err) throw err;
          console.log('The raw file has been crawled and saved!');
        });
        fs.writeFile(`${writeDir}${$}.txt`, t, (err) => {
          if (err) throw err;
          console.log('The file has been fixed and save!');
        });
        fs.writeFile(`${writeDir}latest.txt`, t, (err) => {
          if (err) throw err;
          console.log('Local latest dump is updated! - `./out/dump/lastest.txt`');
        });
      }
    ).then(
      console.log('=====')
    );
  dog();
};

module.exports = copyCat;
