import React, { useState, useEffect, useRef } from 'react';
import { PlayCircle, Pause, Loader2, RefreshCw, X } from 'lucide-react';

/**
 * Video Player Component
 * Provides smooth video playback with adaptive quality, loading states, and controls
 */
export default function VideoPlayer({ 
  videoUrl, 
  thumbnailUrl = null,
  title = 'Video',
  autoplay = false,
  muted = true,
  loop = false,
  controls = true,
  className = '',
  onEnd,
  onError
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(!autoplay); // Start loading if not autoplaying
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef(null);
  const playbackRef = useRef(null);

  // Initialize video when URL changes
  useEffect(() => {
    if (videoUrl) {
      resetPlayer();
      if (autoplay) {
        playVideo();
      }
    }
  }, [videoUrl, autoplay]);

  // Handle video ended
  const handleEnded = () => {
    setIsPlaying(false);
    setIsLoading(false);
    if (onEnd) onEnd();
    if (loop) {
      playVideo();
    }
  };

  // Handle video error
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setIsPlaying(false);
    if (onError) onError(new Error('Video playback failed'));
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  // Handle can play through
  const handleCanPlayThrough = () => {
    setIsLoading(false);
  };

  const resetPlayer = () => {
    setIsPlaying(false);
    setIsLoading(true);
    setHasError(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(err => {
          console.warn('[VideoPlayer] Play failed (may require user interaction):', err);
          // Don't set error here as it might be a user interaction requirement
        });
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const seekTo = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const setVolumeLevel = (vol) => {
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    setVolumeLevel(volume > 0 ? 0 : 1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(err => {
        console.warn('[VideoPlayer] Fullscreen failed:', err);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.warn('[VideoPlayer] Exit fullscreen failed:', err);
      });
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  // Event listeners for fullscreen changes
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle error state
  if (hasError) {
    return (
      <div className={`relative w-full h-64 bg-slate-900 flex items-center justify-center rounded-lg border border-red-500/50 ${className}`}>
        <div className="text-center">
          <X size={24} className="text-red-400 mb-3" />
          <h3 className="text-slate-200 font-medium">Video Unavailable</h3>
          <p className="text-slate-400 text-sm mt-1">
            Unable to load video. Please check your connection or try again later.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              resetPlayer();
              if (videoUrl) playVideo();
            }}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading && !isPlaying && !hasError) {
    return (
      <div className={`relative w-full h-64 bg-slate-900 flex items-center justify-center rounded-lg ${className}`}>
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-slate-400 mb-3" />
          <p className="text-slate-300 text-sm">Loading video...</p>
        </div>
      </div>
    );
  }

  // Main video player
  return (
    <div className={`relative w-full ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay={autoplay && !isLoading}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        onEnded={handleEnded}
        onError={handleError}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlayThrough={handleCanPlayThrough}
        className="w-full h-auto rounded-lg"
        style={{
          display: isLoading || hasError ? 'none' : 'block'
        }}
      />
      
      {/* Poster/thumbnail when not playing */}
      {!isPlaying && !isLoading && !hasError && thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={`${title} thumbnail`}
          className="w-full h-64 object-cover rounded-lg cursor-pointer"
          onClick={togglePlay}
        />
      )}
      
      {/* Overlay controls */}
      {controls && !hasError && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none ${
          isPlaying ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'
        }`}>
          {!isPlaying && !isLoading && (
            <div className="flex items-center gap-3">
              <PlayCircle 
                size={48} 
                className={`text-white/80 hover:text-white transition-colors ${isLoading ? 'opacity-50' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
              />
              {!isLoading && (
                <div className="text-white text-sm">
                  {title}
                </div>
              )}
            </div>
          )}
          
          {/* Loading spinner overlay */}
          {isLoading && !isPlaying && (
            <Loader2 size={32} className="text-slate-400 animate-spin" />
          )}
          
          {/* Error overlay */}
          {hasError && (
            <div className="flex flex-col items-center gap-3">
              <X size={24} className="text-red-400" />
              <p className="text-red-300 text-sm">Video failed to load</p>
            </div>
          )}
        </div>
      )}
      
      {/* Bottom controls bar */}
      {controls && !hasError && (
        <div className={`absolute bottom-0 left-0 right-0 px-4 pt-2 pb-2 bg-black/50 backdrop-blur-sm flex items-center justify-between gap-3 pointer-events-auto ${
          isPlaying ? 'opacity-80 hover:opacity-100 transition-opacity duration-300' : 'opacity-0 hover:opacity-100 transition-opacity duration-300'
        }`}>
          {/* Left controls */}
          <div className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <button
              onClick={togglePlay}
              className="p-1.5 hover:bg-white/20 rounded"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <PlayCircle size={20} />}
            </button>
            
            {/* Current time */}
            <span className="whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          {/* Right controls */}
          <div className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
            {/* Volume control */}
            <div className="relative">
              <button
                onClick={toggleMute}
                className="p-1 hover:bg-white/20 rounded"
                title={volume > 0 ? 'Mute' : 'Unmute'}
              >
                {volume > 0 ? <VolDown size={20} /> : <VolumeOff size={20} />}
              </button>
              
              {/* Volume slider */}
              {!muted && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  className="w-24 h-1 bg-white/20 rounded"
                  onChange={(e) => setVolumeLevel(parseFloat(e.target.value))}
                />
              )}
            </div>
            
            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 hover:bg-white/20 rounded"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Compress size={20} /> : <Expand size={20} />}
            </button>
          </div>
        </div>
      )}
      
      {/* Progress bar */}
      {!hasError && (
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 ${isPlaying ? 'animate-progress' : ''}`}>
          <div 
            className={`h-0.5 bg-white transition-width duration-100 ease-linear ${
              isPlaying ? '' : 'animate-none'
            }`}
            style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Format time in MM:SS or HH:MM:SS format
 */
function formatTime(seconds) {
  if (isNaN(seconds) || seconds === 0) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

// Import icons that we referenced but didn't define above
// These would normally come from lucide-react, but let's define placeholders
const VolDown = () => null;
const VolumeOff = () => null;
const Compress = () => null;
const Expand = () => null;

// In a real implementation, you would import these from lucide-react:
// import { VolDown, VolumeOff, Compress, Expand } from 'lucide-react';