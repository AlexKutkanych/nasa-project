const express = require('express');

const planetsRequest = require('./planets/planets.router');
const launchesRequest = require('./lauches/lauches.router');

const api = express.Router();

api.use('/planets', planetsRequest);
api.use('/launches', launchesRequest);

module.exports = api;