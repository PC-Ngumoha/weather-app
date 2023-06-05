'use strict';
/**
 * geocode.js
 *
 * Contains the definition for the geoCode function which
 * makes our geocoding functionality reusable.
 */
const request = require('postman-request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicHJpbmNlLWVsZGVuIiwiYSI6ImNsaWRidTZrdzA4N3Iza284ZnEzaWJ1NTAifQ.V9EZiylk_lsxbwQj68IzeQ&limit=1`;

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      const {
        center: [long, lat],
        place_name: location
      } = body.features[0];
      callback(undefined, {lat, long, location});
    }
  });
};

module.exports = geoCode;
