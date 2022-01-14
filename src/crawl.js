const moment = require('moment');
const transform = require('./transform').transform;
const writeToFile = require('../utils/writeFile');
const axios = require('axios');
const pdf = require('pdf-parse');

const WRITE_DIR = './out/dump/';
const CHP_URL = 'https://www.chp.gov.hk/files/pdf/flights_trains_en.pdf';

const dumper = (supplier) => {
  if (supplier === undefined) {
    throw Error('A supplier is not defined.');
  }
  const instance = axios.create();
  const fetchCHPData = () =>
    instance
      .request({
        url: CHP_URL,
        method: 'get',
        baseURL: '',
        transformResponse: [
          (data, _) => {
            const ret = {
              url: CHP_URL,
              type: 'pdf',
              html: undefined,
              text: undefined,
              status: undefined,
              error: undefined
            };
            return pdf(data)
              .then((r) => {
                if (r) {
                  ret.text = r.text;
                }
                return ret;
              })
              .catch((err) => {
                ret.status = -1;
                ret.error = err.toString();
                return ret;
              });
          }
        ],
        headers: {
          'user-agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
        },
        timeout: 50000,
        withCredentials: false,
        responseType: 'arraybuffer',
        maxContentLength: 50000000,
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
        maxRedirects: 5
      })
      .then((r) => r.data);
  fetchCHPData().then((r) => {
    const t = transform(r.text);
    const $ = moment().format('HHmm-DD-MM-YYYY');
    console.log(`Working on ${$}`);
    writeToFile(
      `${WRITE_DIR}${$}-raw.txt`,
      r.text,
      'The raw file has been crawled and saved!'
    );
    writeToFile(
      `${WRITE_DIR}${$}.txt`,
      t,
      'The file has been fixed and save!'
    );
    writeToFile(
      `${WRITE_DIR}latest.txt`,
      t,
      'Local latest dump is updated! - `./out/dump/lastest.txt`'
    );
    console.log('=====');
    supplier();
  });
};

module.exports = dumper;
