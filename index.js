'use strict';


const app = require('./src/app.js');
const dataSource = process.env.DATA_SRC;

app.init(dataSource);