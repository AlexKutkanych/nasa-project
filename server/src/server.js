const http = require('http');
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.models');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

// event emitter
mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
})

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
  });
}

startServer();

// another way to listen to app
// app.listen(PORT, () => {
//   console.log(`App is running at ${PORT}`);
// });
