const express = require('express');
const { httpGetAllLaunches, httpAddNewLaunch } = require('./lauches.controller');

const launcherRouter = express.Router();

launcherRouter.get('/', httpGetAllLaunches);
launcherRouter.post('/', httpAddNewLaunch);

module.exports = launcherRouter;
