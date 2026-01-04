import React, { useRef, useState, useEffect } from 'react';

function Player({ song, isPlaying, onTogglePause }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(1);
  const progressBarRef = useRef(null);

  // Sync play/pause with audio element
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const formatTime = (time) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleProgressBarMouseDown = () => {
    setIsSeeking(true);
  };

  const handleProgressBarMouseUp = () => {
    setIsSeeking(false);
  };

  const handleProgressBarMouseMove = (e) => {
    if (isSeeking) {
      handleSeek(e);
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-800 border-t border-gray-700 p-4 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Progress Bar */}
        <div 
          className="mb-4 h-1 bg-gray-700 rounded-full cursor-pointer group hover:h-1.5 transition-all"
          ref={progressBarRef}
          onMouseDown={handleProgressBarMouseDown}
          onMouseUp={handleProgressBarMouseUp}
          onMouseMove={handleProgressBarMouseMove}
          onMouseLeave={handleProgressBarMouseUp}
        >
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="float-right w-3 h-3 bg-white rounded-full -mt-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Main Player Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Song Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {song?.albumArt && (
              <img
                src={song.albumArt}
                alt={song.title}
                className="w-16 h-16 rounded-lg object-cover shadow-lg"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-white font-semibold truncate text-lg hover:text-cyan-400 transition">
                {song?.title || 'No song'}
              </p>
              <p className="text-gray-400 text-sm truncate hover:text-gray-300 transition">
                {song?.artist || 'Unknown'}
              </p>
            </div>
          </div>

          {/* Time and Progress Info */}
          <div className="flex items-center gap-4 flex-1 justify-center max-w-md">
            <span className="text-xs text-gray-400 w-10 text-right font-mono">
              {formatTime(currentTime)}
            </span>
            <span className="text-xs text-gray-400 w-10 text-left font-mono">
              {formatTime(duration)}
            </span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-6">
            <button
              onClick={onTogglePause}
              className="text-white hover:text-cyan-400 transition transform hover:scale-110 active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              <i className={`fas fa-${isPlaying ? 'pause-circle' : 'play-circle'} text-3xl`}></i>
            </button>
            
            <div className="flex items-center gap-2">
              <i className="fas fa-volume-up text-gray-400 text-sm"></i>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-gray-700 rounded cursor-pointer appearance-none slider"
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={song?.url}
        onTimeUpdate={(e) => !isSeeking && setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => onTogglePause()}
      />
    </div>
  );
}

export default Player;
