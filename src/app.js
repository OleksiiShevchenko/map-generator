'use strict';

const Promise = require('bluebird');
const logger = require('../src/services/loggerService/logger.service');
const xlsService = require('../src/services/xlsService/xlsService');
const gService = require('../src/services/googleMaps/maps.service');
const pdfService = require('../src/services/pdfService/pdf.service');


/**
 * @return {bluebird}
 */
module.exports = function () {

  //TODO: set up bunyan
  logger.info('start');
  logger.error('error');

  return xlsService.getData()
    .then(data => Promise.each(data, (item, i, length) => new Promise((resolve, reject) => {
      return gService.getDirections(item)
        .then(result => gService.fetchStaticImage(result))
        .then(result => pdfService.generateDocument(result))
        .then(result => {
          logger.info(`iteration ${i + 1} of ${length}`);
          return resolve(result);
        })
        .catch(err => {

          return reject(err)
        });
    })));
};