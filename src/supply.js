const fs = require('fs')
const moment = require('moment')
const readInFile = require('../utils/readf')
const checkArr = require('../utils/checkarr')

const writeDir = './out/json/'
const readDir = './out/dump/'

const copyDog = () => {
  fs.readFile(`${readDir}latest.txt`, 'utf8', (err, data) => {
    if (err) throw err
    const flightCodeRegex = /(\b([A-Z]\d|[A-Z]{2,3}|\d[A-Z])\d{2,4}\b)/g
    const dateRegex = /^\d{1,2}[./]\d{1,2}[./]\d{4}$/
    const seatsRegex = /\b([A-Z]\d{1,3}|\d{1,3}[A-Z]|Row.*|Row)\b/
    const retFlightarr = data.match(flightCodeRegex)
    let _ = 0
    const dataArr = data.replace(/\s+/g, ' ').split(' ')
    const n = dataArr.length
    const gPath = []
    for (let i = 0; i < n; ++i) {
      if (dataArr[i] === retFlightarr[_]) {
        const p = []
        const s = []
        while (!(dataArr[i + 1][0] <= ':' || dataArr[i + 1].match(seatsRegex))) {
          p.push(dataArr[++i])
        }
        while (!dataArr[i + 1].match(dateRegex)) {
          if (dataArr[i + 1] === ':') {
            s.push('Unknown') // Unknown
            ++i
            break
          } else if (dataArr[i + 1].match(/[(]?999[)]?/)) {
            s.push('CC') // Cabin Crew
            ++i
          } else if (dataArr[i + 1].match(/[(]?888[)]?/)) {
            s.push('Pilot') // Pilot
            ++i
          } else if (dataArr[i + 1] === 'and') {
            ++i
          } else { s.push(dataArr[++i]) }
        }
        let d = dataArr[++i].split('/')
        d[0] = String('0' + d[0]).slice(-2)
        d[1] = String('0' + d[1]).slice(-2)
        d = d.join('/')
        const o = {
          flight: retFlightarr[_],
          departure: p,
          seats: s,
          date: d
        }
        gPath.push(o)
        ++_
      }
    }
    // console.log(gPath)
    console.log(`Number of entries: ${retFlightarr.length}`)
    const $ = moment().format('HHmm-DD-MM-YYYY')
    const writingData = JSON.stringify({ ...gPath }, null, 2)
    fs.writeFile(`${writeDir}${$}.json`, writingData, (err) => {
      if (err) throw err
      console.log(`The file has been saved! - ${$}`)
    })
    fs.writeFile(`${writeDir}latest.json`, writingData, (err) => {
      if (err) throw err
      console.log(`The file has been saved! - ${$} - lastest`)
    })
    /* ===== ===== ===== ===== */
    const lis = [readInFile(`${writeDir}history.json`), readInFile(`${writeDir}latest.json`)]
    Promise.all(lis).then(result => {
      const history = Object.values(result[0])
      const latest = Object.values(result[1])
      var ___ = history
      latest.forEach(e => {
        if (history === null || history === undefined) {
          ___.push(e)
          return
        }
        const dum = history.find(his => (his.flight === e.flight &&
              his.date === e.date &&
              checkArr(his.seats, e.seats)
        ))
        if (dum === undefined) ___.push(e)
      })
      const writingHistory = JSON.stringify({ ...___ }, null, 2)
      fs.writeFile(`${writeDir}history.json`, writingHistory, (ehisw) => {
        if (ehisw) throw ehisw
        console.log(`Update checked! Written to ${writeDir}new-history.json!`)
      })
    }).catch(error => {
      console.log('Unexpected error: ' + error)
    })
  })
}

module.exports = copyDog
