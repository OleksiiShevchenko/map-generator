'use strict';

const Promise = require('bluebird');

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


const XLSService = {

  /**
   * @return {bluebird}
   */
  getData: () => new Promise((resolve, reject) => {
    return resolve(testDataset);
  })

};

module.exports = XLSService;