import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <i className="fas fa-music text-cyan-400 text-2xl"></i>
            <h1 className="text-2xl font-bold text-white">MusicHub</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            <Link to="/search" className="text-gray-300 hover:text-white transition">
              Search
            </Link>
            <Link to="/playlists" className="text-gray-300 hover:text-white transition">
              Playlists
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition">
            <i className="fas fa-user mr-2"></i>
            Profile
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
