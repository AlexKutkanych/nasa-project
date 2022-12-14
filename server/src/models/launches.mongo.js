// create schema
const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    // default: 100,
    // min: 100,
    // max: 999,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  target: {
    type: String,
    required: false,
    // TODO: didn't work with the type below
    // type: mongoose.Types.ObjectId,
    // reference to Planet schema
    // ref: 'Planet',
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// connects launchesSchema ith the 'launches' collection
module.exports = mongoose.model('Launch', launchesSchema);
