import React, { useState, useEffect } from 'react';

function Search({ songs, onPlaySong }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, title, artist
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSource, setSearchSource] = useState('local'); // local or musicbrainz

  // Search MusicBrainz API in real-time
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchSource('local');
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);
      try {
        // First, try searching local database
        const query = searchQuery.toLowerCase().trim();
        const localResults = songs.filter((song) => {
          if (filterType === 'title') {
            return song.title.toLowerCase().includes(query);
          } else if (filterType === 'artist') {
            return song.artist.toLowerCase().includes(query);
          } else {
            return (
              song.title.toLowerCase().includes(query) ||
              song.artist.toLowerCase().includes(query)
            );
          }
        });

        // If local results found, show them
        if (localResults.length > 0) {
          setSearchResults(localResults);
          setSearchSource('local');
        } else {
          // If no local results, fetch from MusicBrainz API
          try {
            const response = await fetch(
              `/api/musicbrainz/search?q=${encodeURIComponent(searchQuery)}`
            );
            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
              // Map MusicBrainz response to match local song format
              const musicbrainzSongs = data.data.map((song) => ({
                _id: song.mbid || song.id,
                title: song.title,
                artist: song.artist,
                album: song.album,
                url: song.url,
                albumArt: song.albumArt,
                duration: song.duration,
                source: 'MusicBrainz'
              }));
              
              setSearchResults(musicbrainzSongs);
              setSearchSource('musicbrainz');
            } else {
              setSearchResults([]);
            }
          } catch (error) {
            console.error('MusicBrainz API error:', error);
            setSearchResults([]);
          }
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const debounceTimer = setTimeout(performSearch, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filterType, songs]);

  const clearSearch = () => {
    setSearchQuery('');
    setFilterType('all');
    setSearchResults([]);
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Search Bar and Filters */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search songs, artists, Kannada music, movies..."
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
          <div className="flex gap-2 flex-wrap">
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
            {isLoading && (
              <div className="px-3 py-1 text-gray-400 text-sm animate-pulse">
                Searching...
              </div>
            )}
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
            {searchSource === 'musicbrainz' && ' from MusicBrainz (Real-time)'}  
            {searchSource === 'local' && ' from Local Database'}
          </p>

          <div className="space-y-2">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin">
                  <i className="fas fa-spinner text-cyan-400 text-3xl"></i>
                </div>
                <p className="text-gray-400 mt-4">Searching for songs...</p>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((song) => (
                <div
                  key={song._id}
                  className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center justify-between transition cursor-pointer group"
                  onClick={() => onPlaySong(song)}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Album Art */}
                    <div className="w-14 h-14 rounded bg-gray-700 flex-shrink-0 overflow-hidden">
                      {song.albumArt ? (
                        <img
                          src={song.albumArt}
                          alt={song.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/56?text=Album';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                          <i className="fas fa-music text-white text-lg"></i>
                        </div>
                      )}
                    </div>
                    
                    {/* Song Info */}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate text-sm group-hover:text-cyan-400 transition">
                        {song.title}
                      </p>
                      <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                      {song.album && (
                        <p className="text-gray-500 text-xs truncate">{song.album}</p>
                      )}
                      {song.source && (
                        <span className="inline-block text-xs text-cyan-400 mt-1">
                          {song.source}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <button
                    className="text-cyan-400 hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition ml-4 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySong(song);
                    }}
                  >
                    <i className="fas fa-play-circle text-2xl"></i>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <i className="fas fa-search text-gray-600 text-4xl mb-4"></i>
                <p className="text-gray-400">
                  No songs found matching "{searchQuery}"
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Try searching for different keywords, artists, or Kannada songs
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Initial State */}
      {!searchQuery && (
        <div className="text-center py-12">
          <i className="fas fa-search text-gray-600 text-4xl mb-4"></i>
          <p className="text-gray-400 text-lg">Start typing to search</p>
          <p className="text-gray-500 text-sm mt-2">
            Search for songs, artists, Kannada music, movie soundtracks, and more!
          </p>
          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <p>💡 <strong>Tip:</strong> Search for Kannada songs directly - powered by MusicBrainz API</p>
            <p>🎵 Try: "Rathod", "Nenapirali", "Kannada", or any artist name</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
