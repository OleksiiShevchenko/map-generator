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
   * @param {string} data.imgSrc
   * @param {Object} data.props
   * @return {bluebird}
   */
  generateDocument: (data) => new Promise((resolve, reject) => {
    if (!data) return resolve(null);

    const options = {
      format: "A4",
      orientation: "portrait",
      timeout: 90000
    };

    const templateParams = {
      startAddress: data.props.startAddress,
      endAddress: data.props.endAddress,
      duration: data.props.routes[0].duration,
      distance: data.props.routes[0].distance,
      routes: data.props.routes.slice(0, 2),
      imgSrc: data.imgSrc
    };

    const html = RenderHBS.render('map.hbs', templateParams);

    return pdf
      .create(html, options)
      .toFile(`${config.pdfPath}/${data.props.id}.pdf`, (err, res) => {
        if (err) console.log(err, 'Error returned by PDF generator service');
        if (err) return reject(err);
        resolve({pdf: path.basename(res.filename)});
      });
  })


};


module.exports = PDFService;