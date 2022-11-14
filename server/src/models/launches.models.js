// Map is same as object, but keys can be numbers, function
// order of keys are preserved and guaranteed
const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

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

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({ flightNumber: launchId });
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

async function abortLaunchById(launchId) {
  // this one not actually removing, but just updating
  // to remove completely from DB use e.g. .findOneAndRemove()
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  console.log(aborted);
  return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduledNewLaunch,
};
