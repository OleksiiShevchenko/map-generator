'use strict';

const config = require('../../config');
const Promise = require('bluebird');
const logger = require('../loggerService/logger.service');

const gMaps = require('@google/maps').createClient({
  key: config.googleMapsAPI.key,
  Promise: Promise
});

const GoogleMapsService = {

  /**
   * @param {Object} params
   * @param {number} params.id - list user id
   * @param {string} params.zipCode - origin zip code
   * @param {string} params.to - destination zip code
   * @return {bluebird}
   */
  getDirections: (params) => new Promise((resolve, reject) => {

    if (!params.zipCode) return resolve({
      directions: null,
      params: params
    });

    const directionsParams = {
      origin: params.zipCode,
      destination: config.googleMapsAPI.destination,
      mode: config.googleMapsAPI.mode,
      language: config.googleMapsAPI.language,
      units: config.googleMapsAPI.units,
      alternatives: config.googleMapsAPI.alternatives
    };

    return gMaps.directions(directionsParams)
      .asPromise()
      .then(directions => resolve({directions, params}))
      .catch(err => {

        if (err.json && err.json.status == 'NOT_FOUND') {
          return resolve({
            directions: null,
            params: params
          });
        } else {
          return reject(err)
        }

      });
  }),


  /**
   * @param {object} data
   * @param {object} data.directions
   * @param {object} data.params
   * @returns {object}
   */
  formatDirectionsResponse: (data) => new Promise((resolve, reject) => {

    if (!data.directions || data.directions.json.routes.length == 0) return resolve({
      id: data.params.id,
      routes: null,
      startAddress: null,
      endAddress: config.googleMapsAPI.destination
    });

    const directionsData = data.directions.json;
    const params = data.params;

    data = {
      id: params.id,
      routes: [],
      startAddress: directionsData.routes[0].legs[0].start_address,
      endAddress: directionsData.routes[0].legs[0].end_address
    };

    directionsData.routes.forEach(item => {
      data.routes.push({
        distance: item.legs[0].distance.text,
        duration: item.legs[0].duration.text,
        summary: item.summary,
        polyline: item.overview_polyline.points
      });
    });

    data.routes.sort((a, b) => {
      if (a.duration < b.duration)
        return -1;
      if (a.duration > b.duration)
        return 1;
      return 0;
    });

    return resolve(data);
  }),


  /**
   * @param {Object} params
   * @param {Object} params.id
   * @param {Array}  params.routes
   * @param {String} params.startAddress
   * @param {String} params.endAddress
   * @return {bluebird}
   */
  fetchStaticImage: (params) => new Promise((resolve, reject) => {

    const apiEndpoint = 'https://maps.googleapis.com/maps/api/staticmap';
    let reqParams;

    if (!params.routes && !params.startAddress) {

      const mapParams = {
        size: '640x640',
        scale: '2',
        zoom: '10',
        language: 'en',
        marker: `size:mid%7Ccolor:red%7C${encodeURIComponent(params.endAddress)}`
      };

      reqParams = `
        ?size=${mapParams.size}
        &scale=${mapParams.scale}
        &zoom=${mapParams.zoom}
        &language=${mapParams.language}
        &markers=${mapParams.marker}
        &key=${config.googleMapsAPI.key}`;

      const reqUrl = apiEndpoint + reqParams.replace(/\s/g, '');
      return resolve({
        imgSrc: reqUrl,
        props: params
      });

    } else {

      const mapParams = {
        size: '640x640',
        scale: '2',
        language: 'en',
        path1: `weight:5%7Ccolor:0x4a80f5BB%7Cenc%3A${encodeURIComponent(params.routes[0].polyline)}`,
        marker1: null,
        marker2: `size:mid%7Ccolor:red%7C${encodeURIComponent(params.endAddress)}`
      };

      reqParams = `
        ?size=${mapParams.size}
        &scale=${mapParams.scale}
        &language=${mapParams.language}
        &path=${mapParams.path1}`;

      if (params.routes.length > 1) {
        mapParams.path2 = `weight:5%7Ccolor:0x989898AA%7Cenc%3A${encodeURIComponent(params.routes[1].polyline)}`;
        reqParams += `&path=${mapParams.path2}`;
      }

      if (mapParams.marker1) reqParams += `&markers=${mapParams.marker2}`;

      reqParams += `&markers=${mapParams.marker2}`;
      reqParams += `&key=${config.googleMapsAPI.key}`;

      const reqUrl = apiEndpoint + reqParams.replace(/\s/g, '');
      return resolve({
        imgSrc: reqUrl,
        props: params
      });

    }

  }).catch(err => err)


};


module.exports = GoogleMapsService;