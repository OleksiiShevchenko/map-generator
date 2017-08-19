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
        Zipcode: '02113',
      }
    ]);

    const src = config.xlsPath + '/' + dataSrc;

    return resolve(xls({
      input: src,
      output: null
    }));

  }).then(result => {
    return Promise.map(result, item => {

      //original data structure
      /*return {
        zipCode: item.postcode,
        address1: item.address1,
        address2: item.address2,
        address3: item.address3,
        address4: item.address4,
        id: item.seq_num
      };*/

      //test data structure
      return {
        zipCode: item.Zipcode,
        id: item.Zipcode
      };

    });
  }).then(data => data)
    .catch(err => err)

};

module.exports = XLSService;