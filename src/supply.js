const fs = require('fs')
const moment = require('moment')

const writeDir = './out/json/'
const readDir = './out/dump/'

const copyDog = async () => {
  fs.readFile(`${readDir}latest.txt`, 'utf8', (err, data) => {
    if (err) throw err
    const flightCodeRegex = /Flight\s(\b([A-Z]\d|[A-Z]{2,3}|\d[A-Z])\d{2,4}\b)/g
    const retFlight = data.match(flightCodeRegex).map(ele => ele.slice(7)).toString()
    const retFlightarr = retFlight.split(',')
    let _ = 0
    const dataArr = data.replace(/\s+/g, ' ').split(' ')
    const n = dataArr.length
    const gPath = []
    for (let i = 0; i < n; ++i) {
      if (dataArr[i] === retFlightarr[_]) {
        const p = []
        const s = []
        let d = ''
        while (!(dataArr[i + 1][0] <= ':' && dataArr[i + 1][0] >= '0')) {
          p.push(dataArr[++i])
        }
        while (!moment(dataArr[i + 1], 'D/M/YYYY', true).isValid()) {
          if (dataArr[i + 1] === ':') {
            s.push('Unknown') // Unknown
            ++i
          } else if (dataArr[i + 1] === '999') {
            s.push('CC') // Cabin Crew
            ++i
          } else if (dataArr[i + 1] === 'and') {
            ++i
          } else { s.push(dataArr[++i]) }
        }
        d = dataArr[++i]
        const o = {
          flight: retFlightarr[_],
          path: p,
          seats: s,
          date: d
        }
        gPath.push(o)
        ++_
      }
    }
    // console.log(gPath)
    console.log(`Number of entries: ${retFlightarr.length}`)
    const $ = moment().format('HHMM-DD-MM-YYYY')
    const writingData = JSON.stringify({ ...gPath }, null, 2)
    fs.writeFile(`${writeDir}${$}.json`, writingData, (err) => {
      if (err) throw err
      console.log(`The file has been saved! - ${$}`)
    })
    fs.writeFile(`${writeDir}latest.json`, writingData, (err) => {
      if (err) throw err
      console.log(`The file has been saved! - ${$} - lastest`)
    })
  })
}

module.exports = copyDog
