const fs = require('fs')
const crawler = require('crawler-request')
const moment = require('moment')

const writeDir = './out/dump/'

const copyCat = async (dog) => {
  await crawler('https://www.chp.gov.hk/files/pdf/flights_trains_en.pdf')
    .then(
      r => {
        const t = r.text
          .replace(/[\r\n]+/gm, '')
          .replace(/→/g, ' → ')
          .replace(/[c,C]lass/gm, '')
          .replace(/[B,b]usiness/gm, '')
          .replace(/[F,f]irst/gm, '')
          .replace(/Unknown/g, ':')
          .replace(/[C,c]abin [C,c]rew/g, '999')
          .replace(/\Band/, '')
          .replace(/and\s\s/, '')
          .replace(/, then/g, '')
          .replace(/,/g, '')
        const $ = moment().format('HHMM-DD-MM-YYYY')
        console.log(`Working on ${$}`)
        fs.writeFile(`${writeDir}${$}-raw.txt`, r.text, (err) => {
          if (err) throw err
          console.log('The raw file has been crawled and saved!')
        })
        fs.writeFile(`${writeDir}${$}.txt`, t, (err) => {
          if (err) throw err
          console.log('The file has been fixed and save!')
        })
        fs.writeFile(`${writeDir}latest.txt`, t, (err) => {
          if (err) throw err
          console.log('Local latest dump is updated! - `./out/dump/lastest.txt`')
        })
      }
    ).then(
      console.log('=====')

    )
  dog()
}

module.exports = copyCat
