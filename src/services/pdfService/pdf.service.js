'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const RenderHBS = require('../../utils/renderHbs')(__dirname + '/templates');
const config = require('../../config');

const PDFService = {

  /**
   * @param {Object} data
   * @param {buffer} data.img
   * @param {string} data.imgSrc
   * @param {Object} data.meta
   * @return {bluebird}
   */
  generateDocument: (data) => new Promise((resolve, reject) => {
    const options = {
      format: "A4",
      orientation: "portrait"
    };

    const html = RenderHBS.render('map.hbs', data);

    return pdf
      .create(html, options)
      .toFile(`${config.pdfPath}/${data.meta.id}.pdf`, (err, res) => {
        if (err) return reject(err);
        resolve({pdf: path.basename(res.filename)});
      });
  })


};


module.exports = PDFService;