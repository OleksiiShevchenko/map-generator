'use strict';

const Promise = require('bluebird');
const logger = require('../src/services/loggerService/logger.service');
const xlsService = require('../src/services/xlsService/xlsService');
const gService = require('../src/services/googleMaps/maps.service');
const pdfService = require('../src/services/pdfService/pdf.service');
const emailService = require('../src/services/emailNotificationService/email.service');


module.exports = {

  /**
   * @param {string} dataSrc - source file
   * @return {bluebird}
   */
  init: (dataSrc) => {

    return xlsService.getData(dataSrc)
      .then(data => Promise.each(data, (item, i, length) => new Promise((resolve, reject) => {

        return gService.getDirections(item)
          .then(result => {
            return gService.formatDirectionsResponse(result)
          })
          .then(result => gService.fetchStaticImage(result))
          .then(result => pdfService.generateDocument(result))
          .then(result => {
            logger.info(`iteration ${i + 1} of ${length}`);
            return resolve(result);
          })
          .catch(err => {
            err.item = item;
            return reject(err);
          });

      })))
      .then(() => {

        const inputData = process.env.DATA_SRC || '';
        const message = `Processing the file ${inputData} has been completed. No errors occurred.`;

        return emailService.sendNotification(message)
          .then(() => {
            logger.info(message);
            process.exit(0);
          });

      })
      .catch(err => {
        const inputData = process.env.DATA_SRC || '';
        const processedItem = JSON.stringify(err.item);
        const message = `Processing the file ${inputData} was interrupted due to error: ${(typeof err.message == 'undefined') ? JSON.stringify(err) : JSON.stringify(err.message)}`;

        return emailService.sendNotification(message)
          .then(() => {
            logger.error(`Error occurred processing ${processedItem}`);
            logger.error('Error: ' + (typeof err.message == 'undefined') ? err : err.message);
            process.exit(0);
          });
      });

  }

};
