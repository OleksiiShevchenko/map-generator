'use strict';

const path = require('path');
const root = path.normalize(__dirname + '/../..');

module.exports = {

  googleMapsAPI: {
    key: 'AIzaSyCgmYT7nWxLoPzwfsvsMuMRZ9i4cqCH9IA'
  },

  pdfPath: path.normalize(root + '/outputData'),

  xlsPath: path.normalize(root + '/inputData'),

  logsPath: path.normalize(root + '/error.log')

};