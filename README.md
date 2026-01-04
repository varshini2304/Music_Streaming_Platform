# Music Streaming Platform

A full-stack MERN (MongoDB, Express, React, Node.js) music streaming application that allows users to browse, search, and stream music with advanced features like playlists, recommendations, and social sharing.

## Features

### User Authentication & Profiles
- User registration and login with JWT authentication
- User profile management
- User preferences and settings
- Password recovery functionality

### Music Browsing & Discovery
- Browse songs by genre, artist, and albums
- Advanced search functionality
- Real-time search suggestions
- Trending songs and artists
- Genre-based recommendations

### Playlist Management
- Create, edit, and delete playlists
- Add/remove songs from playlists
- Share playlists with other users
- Collaborative playlists
- Playlist privacy settings (public/private)

### Music Streaming
- Stream music with HTML5 audio player
- Control playback (play, pause, skip, shuffle)
- Volume control
- Seek to specific time
- Display current playback time and duration
- Queue management

### Recommendations
- Personalized song recommendations
- Recommendations based on listening history
- Similar artists suggestions
- Trending music suggestions
- Collaborative filtering recommendations

### Social Features
- Share songs, playlists, and artists
- Share to social media (Twitter, Facebook)
- Follow artists and other users
- Like/favorite songs
- User activity feed
- Notifications for followed artists

### Admin Features
- Upload and manage music library
- Manage user accounts
- View analytics and statistics
- Manage content (artists, albums, genres)

## Tech Stack

### Frontend
- **React.js** - UI library
- **Redux** - State management
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Tailwind CSS / Material-UI** - Styling
- **React Audio Player** - Audio playback
- **Socket.io Client** - Real-time updates

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload
- **Cloudinary / AWS S3** - Cloud storage for audio files
- **Socket.io** - Real-time communication

## Project Structure

```
music-streaming-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store, actions, reducers
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── uploads/            # Upload directory
│   ├── .env.example        # Environment variables example
│   ├── server.js           # Entry point
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```
   or for development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/:id` - Get song details
- `GET /api/songs/search?q=` - Search songs
- `POST /api/songs` - Upload song (admin)
- `PUT /api/songs/:id` - Update song (admin)
- `DELETE /api/songs/:id` - Delete song (admin)

### Artists
- `GET /api/artists` - Get all artists
- `GET /api/artists/:id` - Get artist details
- `GET /api/artists/:id/songs` - Get artist's songs
- `POST /api/artists/:id/follow` - Follow artist

### Playlists
- `GET /api/playlists` - Get user's playlists
- `GET /api/playlists/:id` - Get playlist details
- `POST /api/playlists` - Create playlist
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist
- `POST /api/playlists/:id/songs` - Add song to playlist
- `DELETE /api/playlists/:id/songs/:songId` - Remove song from playlist

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations
- `GET /api/recommendations/trending` - Get trending songs

### Social
- `POST /api/songs/:id/like` - Like a song
- `POST /api/playlists/:id/share` - Share playlist
- `POST /api/users/:id/follow` - Follow user

## Usage

1. Create an account or login
2. Browse songs by genre or use the search function
3. Click on a song to play it
4. Create playlists and add songs
5. Share playlists and songs with others
6. Follow your favorite artists
7. Get personalized recommendations

## Contributing

Feel free to fork the repository and submit pull requests for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please contact: varshini0235@gmail.com

## Future Enhancements

- [ ] Offline music download capability
- [ ] Lyrics display during playback
- [ ] Karaoke mode
- [ ] Podcast support
- [ ] Radio stations
- [ ] Music analytics dashboard
- [ ] Premium subscription features
- [ ] Payment integration
- [ ] Mobile app (React Native)
- [ ] AI-powered music recommendations
- [ ] Advanced audio visualizations
- [ ] Concert/event ticketing integration
