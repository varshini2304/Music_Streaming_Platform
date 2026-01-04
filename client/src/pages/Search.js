import React, { useState } from 'react';

function Search({ songs, onPlaySong }) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search songs or artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {searchQuery && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Results for "{searchQuery}"</h2>
          <div className="space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((song) => (
                <div
                  key={song._id}
                  className="bg-gray-800 p-4 rounded flex items-center justify-between hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => onPlaySong(song)}
                >
                  <div>
                    <p className="font-semibold text-white">{song.title}</p>
                    <p className="text-gray-400 text-sm">{song.artist}</p>
                  </div>
                  <button className="text-cyan-400 hover:text-cyan-300">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
