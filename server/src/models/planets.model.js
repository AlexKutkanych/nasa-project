const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanet = [];

const isHabitablePlanet = (planet) => {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
};

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data/kepler-data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanet.push(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject();
      })
      .on('end', () => {
        console.log(habitablePlanet.length);
        console.log('end');
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanet;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
