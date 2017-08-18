'use strict';

const Promise = require('bluebird');
const logger = require('../src/services/loggerService/logger.service');
const xlsService = require('../src/services/xlsService/xlsService');
const gService = require('../src/services/googleMaps/maps.service');
const pdfService = require('../src/services/pdfService/pdf.service');
const pm2 = require('pm2');


module.exports = {

  /**
   * @param {string} dataSrc - source file
   * @return {bluebird}
   */
  init: (dataSrc) => {

    return xlsService.getData(dataSrc)
      .then(data => Promise.each(data, (item, i, length) => new Promise((resolve, reject) => {

        return gService.getDirections(item)
          .then(result => gService.fetchStaticImage(result))
          .then(result => pdfService.generateDocument(result))
          .then(result => {
            logger.info(`iteration ${i + 1} of ${length}`);
            return resolve(result);
          })
          .catch(err => {
            return reject(err);
          });

      })).then(() => {
        logger.info('completed');
        process.exit(0);
      }))
      .catch(err => {
        logger.error('Error: ' + err.message);
        process.exit(0);
      });
  }

};
