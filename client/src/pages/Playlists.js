import React, { useState } from 'react';

function Playlists({ playlists, onCreatePlaylist }) {
  const [playlistName, setPlaylistName] = useState('');

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      onCreatePlaylist(playlistName);
      setPlaylistName('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-2">
        <i className="fas fa-list text-cyan-400"></i>
        My Playlists
      </h1>

      <div className="mb-8 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Create New Playlist</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Playlist name..."
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={handleCreatePlaylist}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition"
          >
            <i className="fas fa-plus mr-2"></i>
            Create
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <i className="fas fa-music text-cyan-400 text-3xl"></i>
                <div>
                  <h3 className="text-lg font-bold text-white">{playlist.name}</h3>
                  <p className="text-gray-400 text-sm">{playlist.songs.length} songs</p>
                </div>
              </div>
              <div className="text-gray-400 text-xs mt-2 text-center py-2 border-t border-gray-700">
                {playlist.songs.length === 0 ? 'No songs yet' : 'View playlist'}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <i className="fas fa-inbox text-gray-600 text-4xl mb-4 block"></i>
            <p className="text-gray-400">No playlists yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Playlists;
