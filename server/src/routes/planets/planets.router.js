const express = require('express');
const { httpGetAllPlanets } = require('./planets.controller');

const planetsRequest = express.Router();

planetsRequest.get('/', httpGetAllPlanets);

module.exports = planetsRequest;
