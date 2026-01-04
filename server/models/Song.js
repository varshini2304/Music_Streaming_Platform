const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  duration: String,
  url: String,
  albumArt: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', songSchema);
