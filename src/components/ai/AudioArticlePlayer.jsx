import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, FastForward, Sparkles } from 'lucide-react';

export default function AudioArticlePlayer({ title, contentText, estimatedMinutes = 5 }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [supported, setSupported] = useState(false);
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const handlePlay = () => {
    if (!supported || !synthRef.current) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    synthRef.current.cancel();

    const cleanText = `${title}. Key Overview. ${contentText ? contentText.replace(/[#*`_[\]()]/g, '') : 'Welcome to this tech article on UniqueDigit.'}`;
    const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 3000));
    utterance.rate = rate;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleRateChange = (newRate) => {
    setRate(newRate);
    if (isPlaying && utteranceRef.current) {
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  if (!supported) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left Side: Info & Visualizer */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400 shadow-inner">
            <Volume2 className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Listen to Article
              </span>
              <span className="text-[10px] rounded-full bg-slate-800 px-2 py-0.5 font-mono text-slate-400">
                {estimatedMinutes} Min Audio
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Free AI Web Speech Podcast Engine</p>
          </div>
        </div>

        {/* Middle: Audio Equalizer Bar Animation */}
        {isPlaying && (
          <div className="flex items-center gap-1 h-6 px-3 py-1 bg-cyan-950/40 rounded-full border border-cyan-500/20">
            <span className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-5 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="w-1 h-4 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '75ms' }} />
            <span className="w-1 h-6 bg-cyan-200 rounded-full animate-bounce" style={{ animationDelay: '225ms' }} />
            <span className="w-1 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
          </div>
        )}

        {/* Right Side: Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Rate Selector */}
          <div className="flex rounded-lg bg-slate-800/80 p-0.5 text-xs font-mono border border-slate-700">
            {[1, 1.25, 1.5].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRateChange(r)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  rate === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}x
              </button>
            ))}
          </div>

          {/* Stop Button */}
          {(isPlaying || isPaused) && (
            <button
              type="button"
              onClick={handleStop}
              className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              title="Reset Audio"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}

          {/* Play / Pause Main CTA */}
          <button
            type="button"
            onClick={isPlaying ? handlePause : handlePlay}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 fill-current" /> Pause
              </>
            ) : isPaused ? (
              <>
                <Play className="h-4 w-4 fill-current" /> Resume
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" /> Play Audio
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
