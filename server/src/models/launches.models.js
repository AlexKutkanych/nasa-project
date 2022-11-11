// Map is same as object, but keys can be numbers, function
// order of keys are preserved and guaranteed
const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler',
  rocket: 'Explorer',
  launchDate: new Date(),
  target: 'test b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);
// lauches.get(100)

async function getLatestFlightNumber() {
  // in .sort() we added '-' to sort descending
  const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { __v: 0, __id: 0 });
}

async function saveLaunch(launch) {
  try {
    const planet = await planets.findOne({
      keplerName: launch.target,
    });

    if (!planet) {
      throw new Error('No matching planet was found');
    }

    await launchesDatabase.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
}

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function scheduledNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  console.log(newFlightNumber, '<<<');
  const newLaunch = {
    ...launch,
    success: true,
    upcoming: true,
    customers: ['ZTM', 'NASA'],
    flightNumber: newFlightNumber,
  };

  await saveLaunch(newLaunch);
  return newLaunch;
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduledNewLaunch,
};
