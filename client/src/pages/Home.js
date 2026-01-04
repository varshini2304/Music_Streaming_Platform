import React from 'react';

function Home({ songs, onPlaySong }) {
  const trendingSongs = songs.slice(0, 8);
  const recentSongs = songs.slice(0, 10);

  return (
    <div className="p-6 pb-32">
      {/* Trending Section */}
      <section className="mb-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-fire text-orange-500"></i>
            <span>Trending Now</span>
          </h2>
          <p className="text-gray-400 text-sm">Hottest tracks right now</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingSongs.map((song, index) => (
            <div
              key={song._id}
              className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-4 hover:from-gray-600 hover:to-gray-700 transition group cursor-pointer"
              onClick={() => onPlaySong(song)}
            >
              {/* Album Art */}
              <div className="relative mb-4 aspect-square rounded-md overflow-hidden bg-gray-900">
                {song.albumArt ? (
                  <img
                    src={song.albumArt}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                    <i className="fas fa-music text-gray-400 text-3xl"></i>
                  </div>
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                  <button
                    className="opacity-0 group-hover:opacity-100 transition transform scale-75 group-hover:scale-100 bg-cyan-500 hover:bg-cyan-400 rounded-full w-12 h-12 flex items-center justify-center text-white shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySong(song);
                    }}
                  >
                    <i className="fas fa-play ml-1"></i>
                  </button>
                </div>
                
                {/* Trending Badge */}
                <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{index + 1}
                </div>
              </div>
              
              {/* Song Info */}
              <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition">
                {song.title}
              </h3>
              <p className="text-gray-400 text-sm truncate">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Added Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-clock text-cyan-400"></i>
            <span>Recently Added</span>
          </h2>
          <p className="text-gray-400 text-sm">Latest additions to the library</p>
        </div>
        
        <div className="space-y-2">
          {recentSongs.map((song) => (
            <div
              key={song._id}
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition cursor-pointer group flex items-center justify-between"
              onClick={() => onPlaySong(song)}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Album Art Thumbnail */}
                <div className="w-12 h-12 rounded bg-gray-700 flex-shrink-0 overflow-hidden">
                  {song.albumArt ? (
                    <img
                      src={song.albumArt}
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      <i className="fas fa-music text-gray-400 text-sm"></i>
                    </div>
                  )}
                </div>
                
                {/* Song Details */}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white truncate group-hover:text-cyan-400 transition">
                    {song.title}
                  </p>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
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
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
