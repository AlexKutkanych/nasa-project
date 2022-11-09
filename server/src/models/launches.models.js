// Map is same as object, but keys can be numbers, function
// order of keys are preserved and guaranteed
const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler',
  rocket: 'Explorer',
  launchDate: new Date(),
  destination: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);
// lauches.get(100) // launch

function getAllLaunches() {
  return Array.from(launches.values());
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

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
