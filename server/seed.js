const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Define Song Schema
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

const Song = mongoose.model('Song', songSchema);

// Sample songs data
const sampleSongs = [
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Synthwave Pop',
    duration: '3:20',
    url: 'https://example.com/blinding-lights.mp3',
    albumArt: 'https://via.placeholder.com/200?text=Blinding+Lights'
  },
  {
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    genre: 'Disco-Pop',
    duration: '3:23',
    url: 'https://example.com/levitating.mp3',
    albumArt: 'https://via.placeholder.com/200?text=Levitating'
  },
  {
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'Single',
    genre: 'Pop',
    duration: '2:21',
    url: 'https://example.com/stay.mp3',
    albumArt: 'https://via.placeholder.com/200?text=Stay'
  },
  {
    title: 'Sunroof',
    artist: 'Nicky Youre',
    album: 'Single',
    genre: 'Indie Pop',
    duration: '2:22',
    url: 'https://example.com/sunroof.mp3',
    albumArt: 'https://via.placeholder.com/200?text=Sunroof'
  },
  {
    title: 'Vampire',
    artist: 'Olivia Rodrigo',
    album: 'GUTS',
    genre: 'Pop Rock',
    duration: '3:24',
    url: 'https://example.com/vampire.mp3',
    albumArt: 'https://via.placeholder.com/200?text=Vampire'
  },
  {
    title: 'Cruel Summer',
    artist: 'Stella & Dot',
    album: 'Single',
    genre: 'Pop',
    duration: '3:15',
    url: 'https://example.com/cruel-summer.mp3',
    albumArt: 'https://via.placeholder.com/200?text=Cruel+Summer'
  },
  {
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    genre: 'Synth-pop',
    duration: '3:59',
    url: 'https://example.com/heat-waves.mp3',
    albumArt: 'https://via.placeholder.com/200?text=Heat+Waves'
  },
  {
    title: 'DSCVRY',
    artist: 'Joji',
    album: 'Nectar',
    genre: 'R&B/Hip-Hop',
    duration: '3:02',
    url: 'https://example.com/dscvry.mp3',
    albumArt: 'https://via.placeholder.com/200?text=DSCVRY'
  },
  {
    title: 'Good as Hell',
    artist: 'Lizzo',
    album: 'Cuz I Love You',
    genre: 'Pop/Hip-Hop',
    duration: '2:55',
    url: 'https://example.com/good-as-hell.mp3',
    albumArt: 'https://via.placeholder.com/200?text=Good+as+Hell'
  },
  {
    title: 'Flowers',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    genre: 'Pop Rock',
    duration: '3:20',
    url: 'https://example.com/flowers.mp3',
    albumArt: 'https://via.placeholder.com/200?text=Flowers'
  }
];

// Seed database
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/music-streaming');
    console.log('Connected to MongoDB');

    // Clear existing songs
    await Song.deleteMany({});
    console.log('Cleared existing songs');

    // Insert sample songs
    await Song.insertMany(sampleSongs);
    console.log('Sample songs added successfully!');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed
seedDatabase();
