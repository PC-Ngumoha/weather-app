'use strict';
/**
 * app.js
 */
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

// Configuring file paths for express
const staticDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Configuring express to work with handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Configuring express to work with static files and assets
app.use(express.static(staticDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Freaking Weather App',
    name: 'Chukwuemeka Ngumoha'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Creator',
    name: 'Chukwuemeka Ngumoha'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help You Live',
    message: 'Are You Stuck? Do You Need Some Help?',
    name: 'Chukwuemeka Ngumoha'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address term'
    });
  }
  const address = req.query.address;

  geoCode(address, (error, {lat, long, location} = {}) => {
    if (error) {
      return res.send({
        error: error
      });
    } else {
      forecast(long, lat, (error, {actual, apparent} = {}) => {
        if (error) {
          return res.send({
            error: error
          });
        } else {
          return res.send({
            forecast: `It is ${actual} degrees celsius, feels like ${apparent} degrees celsius at ${location}`,
            location: location,
            address: address
          });
        }
      });
    }
  });
});

/**
 * The following needs to come last so that if express is unable to
 * match any of the routes above, it will match with the next route
 * below. Hence, we use a wildcard(*) which indicates that we want to
 * match everything else.
 */

app.get('/help/*', (req, res) => {
  res.render('404-page', {
    title: '404',
    name: 'Chukwuemeka Ngumoha',
    message: 'Help Article Not Found'
  });
});

app.get('*', (req, res) => {
  res.render('404-page', {
    title: '404',
    name: 'Chukwuemeka Ngumoha',
    message: 'Page Not Found'
  });
});

app.listen(3000, () => {
  console.log('Server is up and running @ port 3000');
});
