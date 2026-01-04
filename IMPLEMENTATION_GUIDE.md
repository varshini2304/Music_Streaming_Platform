# Music Streaming Platform - Implementation Guide

This guide provides detailed instructions for building and deploying the complete MERN stack Music Streaming Platform.

## Table of Contents
1. [Backend Setup](#backend-setup)
2. [Frontend Setup](#frontend-setup)
3. [Database Models](#database-models)
4. [API Endpoints](#api-endpoints)
5. [Running the Application](#running-the-application)

## Backend Setup

### Step 1: Create Server Directory Structure

```
server/
├── config/
│   ├── db.js
│   ├── cloudinary.js
│   └── jwt.js
├── controllers/
│   ├── authController.js
│   ├── songController.js
│   ├── artistController.js
│   ├── playlistController.js
│   ├── userController.js
│   └── recommendationController.js
├── models/
│   ├── User.js
│   ├── Song.js
│   ├── Artist.js
│   ├── Playlist.js
│   ├── Genre.js
│   └── Like.js
├── routes/
│   ├── auth.js
│   ├── songs.js
│   ├── artists.js
│   ├── playlists.js
│   ├── users.js
│   └── recommendations.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── utils/
│   ├── validators.js
│   └── helpers.js
├── .env.example
├── package.json
└── server.js
```

### Step 2: Install Dependencies

```bash
cd server
npm install
```

### Step 3: Create .env File

Create `.env` file with:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/music-streaming
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:3000
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### Step 4: Database Models

#### User Model (models/User.js)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: String,
  bio: String,
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  followingArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
  followingUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  listeningHistory: [{
    song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
    listenedAt: Date
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### Song Model (models/Song.js)

```javascript
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  album: String,
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  duration: Number,
  releaseDate: Date,
  audioUrl: String,
  imageUrl: String,
  description: String,
  likeCount: { type: Number, default: 0 },
  playCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', songSchema);
```

#### Artist Model (models/Artist.js)

```javascript
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  profileImage: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Artist', artistSchema);
```

#### Playlist Model (models/Playlist.js)

```javascript
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  coverImage: String,
  isPublic: { type: Boolean, default: false },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Playlist', playlistSchema);
```

### Step 5: Authentication Controller (controllers/authController.js)

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register User
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Create JWT Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('likedSongs')
      .populate('playlists')
      .populate('followingArtists');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### Step 6: Authentication Middleware (middleware/auth.js)

```javascript
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
```

## Frontend Setup

### Step 1: Create React App

```bash
cd client
npx create-react-app .
npm install axios react-redux @reduxjs/toolkit react-router-dom
```

### Step 2: Create .env File

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Redux Setup (src/redux/store.js)

```javascript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import songReducer from './slices/songSlice';
import playlistReducer from './slices/playlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    songs: songReducer,
    playlists: playlistReducer
  }
});
```

### Step 4: API Service (src/services/api.js)

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile')
};

export const songAPI = {
  getAllSongs: () => api.get('/songs'),
  getSongById: (id) => api.get(`/songs/${id}`),
  searchSongs: (query) => api.get(`/songs/search?q=${query}`),
  likeSong: (id) => api.post(`/songs/${id}/like`)
};

export const playlistAPI = {
  getUserPlaylists: () => api.get('/playlists'),
  createPlaylist: (data) => api.post('/playlists', data),
  addSongToPlaylist: (playlistId, songId) => 
    api.post(`/playlists/${playlistId}/songs`, { songId }),
  sharePlaylist: (playlistId, data) => 
    api.post(`/playlists/${playlistId}/share`, data)
};

export default api;
```

## Running the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Deployment

### Backend (Heroku)

1. Create Procfile: `web: node server.js`
2. Push to Heroku: `git push heroku main`

### Frontend (Vercel)

1. Connect repository to Vercel
2. Set environment variables
3. Deploy automatically on push

## Testing

Use Postman or Insomnia to test API endpoints with the token in Authorization header.

## Contributing

Follow the existing code structure and naming conventions.
