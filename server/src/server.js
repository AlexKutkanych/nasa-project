const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://Alex:test123@nasacluster.vyu9xo9.mongodb.net/?retryWrites=true&w=majority';

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

  server.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
  });
}

startServer();

// another way to listen to app
// app.listen(PORT, () => {
//   console.log(`App is running at ${PORT}`);
// });
