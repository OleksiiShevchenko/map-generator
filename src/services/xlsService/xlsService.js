'use strict';

const Promise = require('bluebird');
const config = require('../../config');
const xls = Promise.promisify(require("xlsx-to-json"));


const testDataset = [
  {
    id: 1,
    from: '10005 NY',
    to: '10007 NY'
  },
  {
    id: 2,
    from: 'One World Trade Center',
    to: '110 Wall Street'
  },
  {
    id: 3,
    from: '635 New York Ave',
    to: 'Hoboken Terminal'
  }

];

const testDataset2 = [
  {
    id: 4,
    from: 'Tarasa Shevchenka blvd. 33 Kiev',
    to: 'Malozemelna 11 Kiev'
  },
  {
    id: 5,
    from: '10 Downing Street london',
    to: '221B Baker Street london'
  },
  {
    id: 6,
    from: '46 Harley Street london',
    to: '18 George Street london'
  }

];

const testDataset3 = [
  {
    id: 1,
    from: '10005 NY',
    to: '10007 NY'
  }
];


const XLSService = {

  /**
   * @param {string} dataSrc - source xls file
   * @return {bluebird}
   */
  getData: (dataSrc) => new Promise((resolve, reject) => {

    const src = config.xlsPath + '/' + dataSrc;

    return xls({
      input: src,
      output: null
    }).then(result => {
      return Promise.map(result, item =>{
        return {
          zipCode: item.postcode,
          address1: item.address1,
          address2: item.address2,
          address3: item.address3,
          address4: item.address4,
          id: item.seq_num
        };
      });
    }).then(data => resolve(data))
      .catch(err => reject(err));



    //if (dataSrc == 'filename1.xls') return resolve(testDataset);
    //else if (dataSrc == 'filename2.xls') return resolve(testDataset2);
    //else return resolve(testDataset3);
  })

};

module.exports = XLSService;