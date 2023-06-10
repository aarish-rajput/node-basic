const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
