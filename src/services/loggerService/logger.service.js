'use strict';

const bunyan = require('bunyan');
const config = require('../../config');


const logger = bunyan.createLogger({
  name: 'map-generator',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: config.logsPath
    }
  ]
});


module.exports = logger;