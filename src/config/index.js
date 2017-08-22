'use strict';

const path = require('path');
const root = path.normalize(__dirname + '/../..');

module.exports = {

  googleMapsAPI: {
    key: process.env.KEY || 'AIzaSyCgmYT7nWxLoPzwfsvsMuMRZ9i4cqCH9IA',
    destination: 'St Quentin Gate, Telford TF3 4JH',
    mode: 'driving',
    language: 'en',
    units: 'imperial',
    alternatives: true
  },

  nodemailer: {
    name: 'Map Generator Script',
    sender: 'map.generator.app@gmail.com',
    secret: 'gujuh6CUThekub5A',

    opts: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // smtps
      auth: {
        type: 'login',
        user: 'map.generator.app@gmail.com',
        pass: 'MapGenerator1'
      }
    }
  },

  notificationRecipients: 'oleksiimedia@gmail.com',

  pdfPath: path.normalize(root + '/outputData'),

  xlsPath: path.normalize(root + '/inputData'),

  logsPath: path.normalize(root + '/error.log')

};