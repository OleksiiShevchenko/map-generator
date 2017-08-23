'use strict';

const bunyan = require('bunyan');
const config = require('../../config');
const PrettyStream = require('bunyan-pretty-colors');
const prettyStdOut = new PrettyStream();

prettyStdOut.pipe(process.stdout);


const logger = bunyan.createLogger({
  name: 'map-generator',
  streams: [
    {
      level: 'info',
      stream: prettyStdOut
    },
    {
      level: 'error',
      path: config.logsPath
    }
  ]
});


module.exports = logger;