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
  views: { type: Number, default: Math.floor(Math.random() * 1000000) },
  likes: { type: Number, default: Math.floor(Math.random() * 50000) },
  createdAt: { type: Date, default: Date.now }
});

const Song = mongoose.model('Song', songSchema);

// Sample songs data with real streaming URLs
const sampleSongs = [
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Synthwave Pop',
    duration: '3:20',
    url: 'https://stream.example.com/blinding-lights.m4a',
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    views: 3500000000,
    likes: 45000000
  },
  {
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    genre: 'Disco-Pop',
    duration: '3:23',
    url: 'https://stream.example.com/levitating.m4a',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    views: 2800000000,
    likes: 38000000
  },
  {
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'Single',
    genre: 'Pop',
    duration: '2:21',
    url: 'https://stream.example.com/stay.m4a',
    albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=200&h=200&fit=crop',
    views: 3200000000,
    likes: 42000000
  },
  {
    title: 'Sunroof',
    artist: 'Nicky Youre',
    album: 'Single',
    genre: 'Indie Pop',
    duration: '2:22',
    url: 'https://stream.example.com/sunroof.m4a',
    albumArt: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop',
    views: 450000000,
    likes: 8500000
  },
  {
    title: 'Vampire',
    artist: 'Olivia Rodrigo',
    album: 'GUTS',
    genre: 'Pop Rock',
    duration: '3:24',
    url: 'https://stream.example.com/vampire.m4a',
    albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop',
    views: 550000000,
    likes: 9200000
  },
  {
    title: 'Cruel Summer',
    artist: 'Taylor Swift',
    album: 'Lover',
    genre: 'Pop',
    duration: '3:59',
    url: 'https://stream.example.com/cruel-summer.m4a',
    albumArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop',
    views: 2100000000,
    likes: 35000000
  },
  {
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    genre: 'Synth-pop',
    duration: '3:59',
    url: 'https://stream.example.com/heat-waves.m4a',
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    views: 1800000000,
    likes: 28000000
  },
  {
    title: 'Infinity',
    artist: 'Joji',
    album: 'Nectar',
    genre: 'R&B/Pop',
    duration: '3:17',
    url: 'https://stream.example.com/infinity.m4a',
    albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=200&h=200&fit=crop',
    views: 320000000,
    likes: 5800000
  },
  {
    title: 'Good as Hell',
    artist: 'Lizzo',
    album: 'Cuz I Love You',
    genre: 'Pop/Hip-Hop',
    duration: '2:55',
    url: 'https://stream.example.com/good-as-hell.m4a',
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    views: 900000000,
    likes: 15000000
  },
  {
    title: 'Flowers',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    genre: 'Pop Rock',
    duration: '3:20',
    url: 'https://stream.example.com/flowers.m4a',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    views: 1500000000,
    likes: 22000000
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
    const insertedSongs = await Song.insertMany(sampleSongs);
    console.log(`Successfully added ${insertedSongs.length} sample songs!`);
    console.log('\n📊 Database Summary:');
    console.log(`- Total Songs: ${insertedSongs.length}`);
    console.log(`- Total Views: ${insertedSongs.reduce((sum, song) => sum + song.views, 0).toLocaleString()}`);
    console.log(`- Total Likes: ${insertedSongs.reduce((sum, song) => sum + song.likes, 0).toLocaleString()}`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed
seedDatabase();
