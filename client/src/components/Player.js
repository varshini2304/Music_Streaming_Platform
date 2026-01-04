import React, { useRef, useState } from 'react';

function Player({ song, isPlaying, onTogglePause }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {song?.albumArt && (
              <img
                src={song.albumArt}
                alt={song.title}
                className="w-16 h-16 rounded object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-white font-semibold truncate">{song?.title || 'No song'}</p>
              <p className="text-gray-400 text-sm truncate">{song?.artist || 'Unknown'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-md">
            <span className="text-xs text-gray-400 w-8">{formatTime(currentTime)}</span>
            <div className="relative flex-1 h-1 bg-gray-700 rounded cursor-pointer">
              <div
                className="h-full bg-cyan-500 rounded"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-8 text-right">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePause}
              className="text-white hover:text-cyan-400 transition"
            >
              <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
            </button>
            <button className="text-gray-400 hover:text-white transition">
              <i className="fas fa-volume-up"></i>
            </button>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song?.url}
        autoPlay={isPlaying}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      />
    </div>
  );
}

export default Player;
