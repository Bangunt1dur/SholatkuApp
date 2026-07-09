import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipForward } from 'lucide-react';

export default function AudioPlayer({ src, label, onEnded, autoPlay = false }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Reset when src changes
  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  }, [src]);

  // Autoplay support
  useEffect(() => {
    if (autoPlay && src && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [src, autoPlay]);

  const togglePlay = () => {
    if (!src || !audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const curr = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setCurrentTime(curr);
    setProgress(dur ? (curr / dur) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (onEnded) onEnded();
  };

  const handleTrackClick = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-player">
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}

      <button
        className="audio-play-btn"
        onClick={togglePlay}
        disabled={!src}
        title={playing ? 'Pause' : 'Play'}
      >
        {playing ? <Pause size={20} /> : <Play size={20} />}
      </button>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Volume2 size={14} style={{ opacity: 0.7 }} />
          <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.9, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {label || 'Audio Bacaan'}
          </span>
          <span style={{ fontSize: 11, opacity: 0.7, fontVariantNumeric: 'tabular-nums' }}>
            {fmt(currentTime)} / {fmt(duration)}
          </span>
        </div>
        <div
          className="audio-track"
          onClick={handleTrackClick}
          title="Klik untuk loncat ke posisi"
        >
          <div className="audio-progress" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {onEnded && (
        <button
          className="audio-play-btn"
          onClick={handleEnded}
          title="Skip"
          style={{ width: 32, height: 32, fontSize: 14 }}
        >
          <SkipForward size={16} />
        </button>
      )}
    </div>
  );
}
