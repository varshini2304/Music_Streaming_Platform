# How to Run Music Streaming Platform

## 🚀 Quick Start (5 Minutes)

If you just want to run the application quickly:

```bash
# 1. Clone the repository
git clone https://github.com/varshini2304/Music_Streaming_Platform.git
cd Music_Streaming_Platform

# 2. Start Backend (Terminal 1)
cd server
npm install
npm start

# 3. Start Frontend (Terminal 2)
cd client
npm install
npm start

# 4. Open browser
# Navigate to http://localhost:3000
```

---

## 📋 Prerequisites

Before running the application, ensure you have:

### Required
- **Node.js** v14+ ([Download here](https://nodejs.org/))
- **npm** v6+ (comes with Node.js)
- **MongoDB** (Local or MongoDB Atlas)

### Optional (For enhanced features)
- **Git** (for cloning the repository)
- **Postman** (for testing APIs)

### System Requirements
- 2GB RAM minimum
- 500MB free disk space
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## 🔧 Detailed Setup Guide

### Step 1: Clone the Repository

```bash
# Using Git
git clone https://github.com/varshini2304/Music_Streaming_Platform.git
cd Music_Streaming_Platform

# Or download as ZIP and extract
```

### Step 2: Backend Setup

#### 2.1 Navigate to Server Directory
```bash
cd server
```

#### 2.2 Install Dependencies
```bash
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ORM
- `axios` - HTTP client for MusicBrainz API
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables

#### 2.3 Create `.env` File

In the `server` directory, create a `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (Use MongoDB Atlas for cloud)
MONGODB_URI=mongodb://localhost:27017/music_streaming
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/music_streaming?retryWrites=true&w=majority

# JWT Configuration (Optional, for future auth)
JWT_SECRET=your_secret_key_here_change_in_production

# API Configuration
API_PORT=5000
API_HOST=http://localhost
```

**MongoDB Setup Options:**

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
# macOS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-macos/
# Linux: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

# Start MongoDB service
# Windows: mongod
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

#### 2.4 Seed Sample Data (Optional)

```bash
# In server directory
node seed.js
```

This populates the database with sample songs including SoundHelix test tracks and real audio URLs.

#### 2.5 Start Backend Server

```bash
npm start
```

Expected output:
```
🎵 Music Streaming Platform Backend
Server running on http://localhost:5000
Database connected successfully
```

**Backend is now running at `http://localhost:5000`**

---

### Step 3: Frontend Setup

#### 3.1 Open New Terminal and Navigate to Client

```bash
# From project root directory
cd client
```

#### 3.2 Install Dependencies

```bash
npm install
```

This installs:
- `react` - Frontend framework
- `react-router-dom` - Routing
- `axios` - HTTP client
- `tailwindcss` - Styling
- `font-awesome` - Icons

#### 3.3 Configure API URL (If needed)

Create `.env` in `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

#### 3.4 Start Frontend Development Server

```bash
npm start
```

Expected output:
```
Compiled successfully!
You can now view music-streaming-platform in the browser.
Open http://localhost:3000
```

**Frontend is now running at `http://localhost:3000`**

---

## 🌐 Accessing the Application

### Frontend
- **URL**: http://localhost:3000
- **Pages**:
  - Home: `/` - Browse trending and recently added songs
  - Search: `/search` - Search for songs and artists
  - Playlists: `/playlists` - Create and manage playlists (feature ready)

### Backend API
- **Base URL**: http://localhost:5000/api

### MusicBrainz Real-Time API Endpoints

**Search any song:**
```bash
GET http://localhost:5000/api/musicbrainz/search?q=Blinding+Lights
```

**Search Kannada songs:**
```bash
GET http://localhost:5000/api/musicbrainz/kannada?q=Kannada+song
```

**Search artists:**
```bash
GET http://localhost:5000/api/musicbrainz/artists?q=The+Weeknd
```

---

## 🎵 Features Available After Setup

✅ **Music Browsing**
- View trending songs with album artwork
- Browse recently added tracks
- See song details (title, artist, duration)

✅ **Search & Discovery**
- Real-time song search with MusicBrainz API
- Artist search and discovery
- Kannada-specific music search
- Filter by Title, Artist, or Both

✅ **Music Playback**
- Play/Pause controls
- Seek bar to jump to any part of song
- Volume control
- Real-time progress tracking
- Duration display

✅ **User Interface**
- Spotify-style design
- Album card grid with trending badges
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Dark theme with cyan accents

✅ **Real-Time Data**
- Live integration with MusicBrainz API
- Always up-to-date music metadata
- No API key required

---

## 🛠️ Troubleshooting

### Backend Issues

**Issue: MongoDB connection failed**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- If using MongoDB Atlas, verify internet connection

**Issue: Port 5000 already in use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Kill process on port 5000
# Windows:
taskkill /PID <PID> /F

# macOS/Linux:
sudo lsof -i :5000
sudo kill -9 <PID>

# Or change port in .env: PORT=5001
```

**Issue: npm install fails**
```bash
# Clear npm cache
npm cache clean --force
npm install
```

### Frontend Issues

**Issue: Port 3000 already in use**
```
Something is already running on port 3000
```
**Solution:**
```bash
# Windows: Change port
set PORT=3001 && npm start

# macOS/Linux:
PORT=3001 npm start
```

**Issue: Blank page or styles not loading**
```
Solution:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check browser console for errors (F12)
```

**Issue: MusicBrainz API returns empty results**
- Check internet connection
- Wait a moment and retry (rate limiting)
- Try different search query

### Common Issues

**API not connecting to frontend**
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in client `.env`
- Verify CORS is enabled in backend
- Check browser console (F12) for errors

**No songs appearing**
- Run `node seed.js` in server directory
- Check MongoDB connection
- Try using MusicBrainz search instead (real-time API)

---

## 🧪 Testing the Application

### Test Backend API

```bash
# Search songs
curl "http://localhost:5000/api/musicbrainz/search?q=Levitating"

# Search Kannada songs
curl "http://localhost:5000/api/musicbrainz/kannada?q=Kannada+song"

# Search artists
curl "http://localhost:5000/api/musicbrainz/artists?q=The+Weeknd"
```

### Test Frontend

1. Open http://localhost:3000
2. Home page loads with trending songs
3. Click on a song to play it
4. Use search bar to find songs
5. Test seek bar by dragging progress
6. Test volume control slider
7. Test play/pause button

---

## 📱 Development vs Production

### Development
```bash
# Backend
cd server
npm start

# Frontend
cd client
npm start
```

### Production Build

**Frontend:**
```bash
cd client
npm run build
```

This creates optimized build in `client/build/`

**Deployment:**
- Host backend on Heroku, Railway, or DigitalOcean
- Host frontend on Vercel, Netlify, or GitHub Pages
- Update `REACT_APP_API_URL` to production API URL

---

## 📚 Project Structure

```
Music_Streaming_Platform/
├── client/                  # React Frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components (Header, Player)
│   │   ├── pages/          # Page components (Home, Search, Playlists)
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── .env                # Frontend config
│
├── server/                  # Node.js Backend
│   ├── models/             # Database models (Song, User, etc.)
│   ├── routes/             # API routes
│   │   └── musicbrainz.js  # MusicBrainz integration
│   ├── musicbrainz.js      # MusicBrainz service
│   ├── seed.js             # Database seeding script
│   ├── server.js           # Express server setup
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend config
│
├── README.md               # Project overview
├── MUSICBRAINZ_API_GUIDE.md # API documentation
└── HOW_TO_RUN.md           # This file
```

---

## 🔗 Useful Links

- **GitHub**: https://github.com/varshini2304/Music_Streaming_Platform
- **MusicBrainz API**: https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **React Documentation**: https://react.dev
- **Express.js Guide**: https://expressjs.com

---

## ⚡ Performance Tips

1. **Use MongoDB Atlas** - Faster than local MongoDB
2. **Enable Browser Caching** - Reduce API calls
3. **Optimize Images** - Use WebP format where possible
4. **Lazy Load** - Load components on demand
5. **Use Production Build** - Run `npm run build`

---

## 🤝 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review the detailed setup instructions
3. Check browser console (F12) for errors
4. Check terminal logs for backend errors
5. Create an issue on GitHub with error details

---

## 📝 Notes

- All audio URLs in the database are working (SoundHelix test tracks)
- MusicBrainz API is free and requires no authentication
- Initial load may take 5-10 seconds (first API calls)
- The app works best in modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design works on all screen sizes

---

**Happy listening! 🎵**
