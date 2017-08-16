'use strict';

const config = require('../../config');
const Promise = require('bluebird');
const request = require('superagent');

const gMaps = require('@google/maps').createClient({
  key: config.googleMapsAPI.key,
  Promise: Promise
});

const GoogleMapsService = {

  /**
   * @param {Object} params
   * @param {number} params.id - list user id
   * @param {string} params.from - origin zip code
   * @param {string} params.to - destination zip code
   * @return {bluebird}
   */
  getDirections: (params) => new Promise((resolve, reject) => {

    const directionsParams = {
      origin: params.from,
      destination: params.to,
      mode: 'driving',
      alternatives: false,
    };

    return gMaps.directions(directionsParams)
      .asPromise()
      .then(result => {

        const meta = result.json.routes[0].legs[0];
        const polyline = result.json.routes[0].overview_polyline.points;

        const data = {
          id: params.id,
          distance: meta.distance.text,
          duration: meta.duration.text,
          startAddress: meta.start_address,
          endAddress: meta.end_address
        };

        return resolve({
          data: data,
          polyline: polyline
        });

      }).catch(err => reject(err));
  }),

  /**
   * @param {Object} params
   * @param {string} params.polyline
   * @param {Object} params.data
   * @return {bluebird}
   */
  fetchStaticImage: (params) => new Promise((resolve, reject) => {

    const mapParams = {
      size: '640x640',
      scale: '2',
      language: 'en',
      path: encodeURIComponent(params.polyline),
      markers: `size:mid%7Ccolor:red%7C${encodeURIComponent(params.data.startAddress)}%7C${encodeURIComponent(params.data.endAddress)}`
    };

    const apiEndpoint = 'https://maps.googleapis.com/maps/api/staticmap';

    const reqParams = `
      ?size=${mapParams.size}
      &scale=${mapParams.scale}
      &language=${mapParams.language}
      &path=weight:8%7Ccolor:0x4a80f5FF%7Cenc%3A${mapParams.path}
      &markers=${mapParams.markers}
      &key=${config.googleMapsAPI.key}`;

    const reqUrl = apiEndpoint + reqParams.replace(/\s/g, '');

    return request
      .get(reqUrl)
      .then(res => {
        const imgBuffer = res.body;
        return resolve({
          img: imgBuffer,
          imgSrc: reqUrl,
          meta: params.data
        });
      })
      .catch(err => reject(err));
  })


};


module.exports = GoogleMapsService;