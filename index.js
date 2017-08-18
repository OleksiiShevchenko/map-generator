'use strict';


const app = require('./src/app.js');
const dataSource = process.env.DATA_SRC || 'mailmark_test_data.xlsx';

app.init(dataSource);