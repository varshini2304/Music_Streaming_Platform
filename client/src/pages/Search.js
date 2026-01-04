import React, { useState, useMemo } from 'react';

function Search({ songs, onPlaySong }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, title, artist

  // Memoized search results for better performance
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    
    return songs.filter((song) => {
      if (filterType === 'title') {
        return song.title.toLowerCase().includes(query);
      } else if (filterType === 'artist') {
        return song.artist.toLowerCase().includes(query);
      } else {
        // Search in both title and artist
        return (
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query)
        );
      }
    });
  }, [searchQuery, filterType, songs]);

  const clearSearch = () => {
    setSearchQuery('');
    setFilterType('all');
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Search Bar and Filters */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search songs or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              autoFocus
            />
          </div>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
              title="Clear search"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        {searchQuery && (
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full text-sm transition ${
                filterType === 'all'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('title')}
              className={`px-3 py-1 rounded-full text-sm transition ${
                filterType === 'title'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Title
            </button>
            <button
              onClick={() => setFilterType('artist')}
              className={`px-3 py-1 rounded-full text-sm transition ${
                filterType === 'artist'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Artist
            </button>
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Results for "{searchQuery}"
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
          </p>

          <div className="space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((song) => (
                <div
                  key={song._id}
                  className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center justify-between transition cursor-pointer group"
                  onClick={() => onPlaySong(song)}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {song.albumArt && (
                      <img
                        src={song.albumArt}
                        alt={song.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate text-sm group-hover:text-cyan-400 transition">
                        {song.title}
                      </p>
                      <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                    </div>
                  </div>
                  <button
                    className="text-cyan-400 hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySong(song);
                    }}
                  >
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <i className="fas fa-search text-gray-600 text-4xl mb-4"></i>
                <p className="text-gray-400">No songs found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Initial State */}
      {!searchQuery && (
        <div className="text-center py-12">
          <i className="fas fa-search text-gray-600 text-4xl mb-4"></i>
          <p className="text-gray-400">Start typing to search for songs or artists</p>
        </div>
      )}
    </div>
  );
}

export default Search;
