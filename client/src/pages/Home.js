import React from 'react';

function Home({ songs, onPlaySong }) {
  const trendingSongs = songs.slice(0, 8);
  const recentSongs = songs.slice(0, 5);

  return (
    <div className="p-6">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <i className="fas fa-fire text-orange-500"></i>
          Trending Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingSongs.map((song) => (
            <div
              key={song._id}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition cursor-pointer group"
              onClick={() => onPlaySong(song)}
            >
              <h3 className="font-semibold text-white truncate">{song.title}</h3>
              <p className="text-gray-400 text-sm truncate">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <i className="fas fa-clock text-cyan-400"></i>
          Recently Added
        </h2>
        <div className="space-y-2">
          {recentSongs.map((song) => (
            <div
              key={song._id}
              className="bg-gray-800 p-4 rounded hover:bg-gray-700 transition cursor-pointer"
              onClick={() => onPlaySong(song)}
            >
              <p className="font-semibold text-white">{song.title}</p>
              <p className="text-gray-400 text-sm">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
