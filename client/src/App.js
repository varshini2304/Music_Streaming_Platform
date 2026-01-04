import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Playlists from './pages/Playlists';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/songs');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleCreatePlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: []
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home songs={songs} onPlaySong={handlePlaySong} />} />
            <Route path="/search" element={<Search songs={songs} onPlaySong={handlePlaySong} />} />
            <Route path="/playlists" element={<Playlists playlists={playlists} onCreatePlaylist={handleCreatePlaylist} />} />
          </Routes>
        </div>
        {currentSong && <Player song={currentSong} isPlaying={isPlaying} onTogglePause={() => setIsPlaying(!isPlaying)} />}
      </div>
    </Router>
  );
}

export default App;
