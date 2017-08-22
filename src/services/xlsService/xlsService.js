'use strict';

const Promise = require('bluebird');
const config = require('../../config');
const xls = Promise.promisify(require("xlsx-to-json"));


const XLSService = {

  /**
   * @param {string} dataSrc - source xls file name
   * @return {array}
   */
  getData: (dataSrc) => new Promise((resolve, reject) => {

    if (!dataSrc) return resolve([
      {
        postcode: 'BT1 2NQ',
        seq_num: '1'
      }
    ]);

    const src = config.xlsPath + '/' + dataSrc;

    return xls({
      input: src,
      output: null
    }).then(data => {
      return resolve(data);
    }).catch(err => {
      return reject(err)
    });

  }).then(result => {
    return Promise.map(result, item => {

      return {
        zipCode: item.postcode,
        id: item.seq_num
      };

    });
  }).then(data => {
    return data;
  })

};

module.exports = XLSService;