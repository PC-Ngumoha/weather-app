'use strict';
/**
 * forecast.js
 *
 * contains the definition of the forecast() function
 * which provides the current temperature data for
 * our specified location's coordinates.
 *
 * @param {*} longitude
 * @param {*} latitude
 * @param {*} callback
 */
const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a35352276f99f2fb7e361b4247a8edc4&query=${latitude},${longitude}&units=m`;

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Invalid coordinates supplied. Supply another', undefined);
    } else {
      const {temperature: actual, feelslike: apparent} = body.current;
      callback(undefined, {actual, apparent});
    }
  });
};

module.exports = forecast;
