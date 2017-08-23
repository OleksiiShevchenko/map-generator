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

    const options = {
      format: "A4",
      orientation: "portrait",
      timeout: 90000
    };

    const templateParams = {
      startAddress: data.props.startAddress || '',
      endAddress: data.props.endAddress,
      duration: data.props.routes ? data.props.routes[0].duration : null,
      distance: data.props.routes ? data.props.routes[0].distance : null,
      routes: data.props.routes ? data.props.routes.slice(0, 2) : [],
      imgSrc: data.imgSrc
    };

    const html = RenderHBS.render('map.hbs', templateParams);

    return pdf
      .create(html, options)
      .toFile(`${config.pdfPath}/${data.props.id}.pdf`, (err, res) => {
        if (err) return reject(err);
        resolve({pdf: path.basename(res.filename)});
      });
  })


};


module.exports = PDFService;