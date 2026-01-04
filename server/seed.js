const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Song = require('./models/Song');

// Sample songs data with REAL, PLAYABLE audio URLs from free sources
const sampleSongs = [
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Synthwave Pop',
    duration: '3:20',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
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
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
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
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
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
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
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
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
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
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
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
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
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
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
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
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
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
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    views: 1500000000,
    likes: 22000000
  }
];

// Seed database
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/music-streaming');
    console.log('\u2705 Connected to MongoDB');

    // Clear existing songs
    await Song.deleteMany({});
    console.log('\ud83d\uddd1️  Cleared existing songs');

    // Insert sample songs
    const insertedSongs = await Song.insertMany(sampleSongs);
    console.log(`\u2705 Successfully added ${insertedSongs.length} playable songs!`);
    console.log('\n\ud83c\udfa7 Database Summary:');
    console.log(`- Total Songs: ${insertedSongs.length}`);
    console.log(`- Total Views: ${insertedSongs.reduce((sum, song) => sum + song.views, 0).toLocaleString()}`);
    console.log(`- Total Likes: ${insertedSongs.reduce((sum, song) => sum + song.likes, 0).toLocaleString()}`);
    console.log('\n\ud83d\udd8a All URLs are NOW PLAYABLE! Music streaming is ready to go!\n');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\u274c Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed
seedDatabase();
