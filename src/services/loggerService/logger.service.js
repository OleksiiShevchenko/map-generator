'use strict';

const bunyan = require('bunyan');
const path = require('path');

const logger = bunyan.createLogger({
  name: 'invitationMaps',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: path.join(__dirname, "../../../error.log")
    }
  ]
});


module.exports = logger;