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
   * @param {string} params.zipCode - origin zip code
   * @param {string} params.to - destination zip code
   * @return {bluebird}
   */
  getDirections: (params) => new Promise((resolve, reject) => {

    const directionsParams = {
      origin: params.zipCode,
      destination: '7 Ballynahinch Rd, Hillsborough BT26 6AR, UK',
      mode: 'driving',
      language: 'en',
      units: 'imperial',
      alternatives: true,
    };

    return gMaps.directions(directionsParams)
      .asPromise()
      .then(result => {
        const directionsData = result.json;

        const data = {
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

        data.routes.sort((a,b) => {
          if (a.duration < b.duration)
            return -1;
          if (a.duration > b.duration)
            return 1;
          return 0;
        });

        return resolve(data);

      }).catch(err => reject(err));
  }),

  /**
   * @param {Object} params
   * @param {Object} params.id
   * @param {Array} params.routes
   * @param {String} params.startAddress
   * @param {String} params.endAddress
   * @return {bluebird}
   */
  fetchStaticImage: (params) => new Promise((resolve, reject) => {
    const apiEndpoint = 'https://maps.googleapis.com/maps/api/staticmap';
    const mapParams = {
      size: '640x640',
      scale: '2',
      language: 'en',
      path1: `weight:5%7Ccolor:0x4a80f5BB%7Cenc%3A${encodeURIComponent(params.routes[0].polyline)}`,
      path2: `weight:5%7Ccolor:0x989898AA%7Cenc%3A${encodeURIComponent(params.routes[1].polyline)}`,
      markers: `size:mid%7Ccolor:red%7C${encodeURIComponent(params.startAddress)}%7C${encodeURIComponent(params.endAddress)}`
    };

    const reqParams = `
      ?size=${mapParams.size}
      &scale=${mapParams.scale}
      &language=${mapParams.language}
      &path=${mapParams.path1}
      &path=${mapParams.path2}
      &markers=${mapParams.markers}
      &key=${config.googleMapsAPI.key}`;

    const reqUrl = apiEndpoint + reqParams.replace(/\s/g, '');

    return resolve({
      imgSrc: reqUrl,
      props: params
    });

    /*return request
      .get(reqUrl)
      .then(res => {
        return resolve({
          imgSrc: reqUrl,
          props: params
        });
      })
      .catch(err => reject(err));*/
  })


};


module.exports = GoogleMapsService;