'use strict';

const Promise = require('bluebird');
const mocha = require('mocha');
const chai = require('chai');
const assert = chai.assert;
const xlsService = require('../src/services/xlsService/xlsService');
const gService = require('../src/services/googleMaps/maps.service');
const pdfService = require('../src/services/pdfService/pdf.service');


describe('Functional test for the script', function () {

  it('it should generate a test document with directions', function () {
    this.timeout(10000);

    return xlsService.getData(null)
      .then(data => Promise.each(data, (item, i, length) => new Promise((resolve, reject) => {

        return gService.getDirections(item)
          .then(result => {
            return gService.formatDirectionsResponse(result)
          })
          .then(result => gService.fetchStaticImage(result))
          .then(result => pdfService.generateDocument(result))
          .then(result => {
            console.log('document generated', result);
            return resolve(result);
          })
          .catch(err => {
            console.log('document generation failed', err);
            return reject(err);
          });
      })));
  });

});
