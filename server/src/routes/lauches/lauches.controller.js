const {
  getAllLaunches,
  scheduledNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require('../../models/launches.models');

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }
  console.log(launch);
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Date is not valid',
    });
  }
  const newLaunch = await scheduledNewLaunch(launch);
  return res.status(201).json(newLaunch);
}

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'Launch not found',
    });
  } else {
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
