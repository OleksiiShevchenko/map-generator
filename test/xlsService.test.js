'use strict';


const mocha = require('mocha');
const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;
const assert = chai.assert;

const testDataSample = 'testData.xlsx';

const xls = require('../src/services/xlsService/xlsService');

describe('XLSX Service Test Suite', function () {

  it('should return array of objects from xlsx file contents', function () {
    return xls.getData(testDataSample)
      .then(data => {

        assert.exists(data, 'data is neither `null` nor `undefined`');
        assert.typeOf(data, 'array', 'data is array');
        assert.lengthOf(data, 3, 'data array has a length of 3');
        assert.containsAllKeys(data, {
          "0": {id: 'id', zipCode: 'zipCode'},
          "1": {id: 'id', zipCode: 'zipCode'},
          "2": {id: 'id', zipCode: 'zipCode'}
        }, 'object structure is right');

      });
  });

});
