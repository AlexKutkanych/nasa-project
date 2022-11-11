// Map is same as object, but keys can be numbers, function
// order of keys are preserved and guaranteed
const lauches = require('./launches.mongo');
const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler',
  rocket: 'Explorer',
  launchDate: new Date(),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);
// lauches.get(100) // launch

function getAllLaunches() {
  return Array.from(launches.values());
}

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  return launches.set(
    launch.flightNumber,
    Object.assign(launch, {
      ...launch,
      success: true,
      upcoming: true,
      customer: ['ZTM', 'NASA'],
      flightNumber: latestFlightNumber,
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
