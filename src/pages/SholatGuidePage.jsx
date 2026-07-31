import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOLAT_MOVEMENTS } from '../data/Data';
import AudioPlayer from '../components/UI/AudioPlayer';

const YOUTUBE_VIDEO_ID = 'TqRvfvAMtOc'; // Video tata cara sholat

export default function PrayerGuide() {
  const { isKidsMode, profile, completeMovement, activeGuideIndex, setActiveGuideIndex } = useApp();
  const [autoplay, setAutoplay] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const currentIdx = activeGuideIndex;
  const setCurrentIdx = setActiveGuideIndex;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const movement = SHOLAT_MOVEMENTS[currentIdx] || SHOLAT_MOVEMENTS[0];
  const isCompleted = profile.completedMovements.includes(movement.key);
  const totalCount = SHOLAT_MOVEMENTS.length;

  const goNext = () => {
    if (currentIdx < totalCount - 1) setCurrentIdx(currentIdx + 1);
  };

  const goPrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const handleAudioEnded = () => {
    if (autoplay) {
      setTimeout(goNext, 800);
    }
  };

  const handleMarkComplete = () => {
    if (!isCompleted) {
      completeMovement(movement.key);
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 2000);
    }
  };

  return (
    <div className="animate-fadeInUp" style={{ paddingBottom: '60px' }}>
      <div className="section-title">
        <div className="title-icon">📖</div>
        {isKidsMode ? 'Belajar Gerakan Sholat 🌟' : 'Panduan Gerakan Sholat'}
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column-reverse' : 'row', 
        gap: '24px', 
        alignItems: 'start' 
      }}>
        {/* Movement List Sidebar / Bottom list on mobile */}
        <div className="card" style={{ 
          position: isMobile ? 'static' : 'sticky', 
          top: '20px', 
          alignSelf: 'flex-start', 
          padding: '20px 16px', 
          width: isMobile ? '100%' : '280px',
          boxSizing: 'border-box',
          flexShrink: 0
        }}>
          <div style={{ fontWeight: 900, fontSize: '14px', color: 'var(--text-dark)', marginBottom: '12px', borderBottom: '3px solid #000', paddingBottom: '8px' }}>
            📋 DAFTAR GERAKAN
          </div>
          <div className="movement-list" style={{ marginRight: 0 }}>
            {SHOLAT_MOVEMENTS.map((m, i) => {
              const done = profile.completedMovements.includes(m.key);
              return (
                <div
                  key={m.key}
                  className={`movement-list-item ${i === currentIdx ? 'active' : ''} ${done ? 'completed' : ''}`}
                  onClick={() => setCurrentIdx(i)}
                >
                  <div className={`movement-list-num ${i === currentIdx ? 'active' : ''} ${done ? 'completed' : ''}`}>
                    {done ? '✓' : i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 900, color: 'var(--text-dark)', lineHeight: 1.3 }}>
                      {isKidsMode ? m.nameKids : m.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Autoplay Toggle */}
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '3px dashed #000' }}>
            <div className="autoplay-toggle" onClick={() => setAutoplay(a => !a)} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <div 
                style={{ 
                  width: '44px', 
                  height: '24px', 
                  borderRadius: '12px', 
                  backgroundColor: autoplay ? 'var(--game-green-light)' : '#e2e8f0', 
                  border: '3px solid #000',
                  position: 'relative',
                  transition: 'background var(--transition)'
                }}
              >
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '2px', 
                    left: autoplay ? '20px' : '2px', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    backgroundColor: '#000', 
                    transition: 'left 0.1s ease' 
                  }} 
                />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#000' }}>
                {autoplay ? '🔄 Autoplay ON' : '⏸ Autoplay OFF'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', minWidth: 0 }}>
          <div className="card" key={movement.id} style={{ padding: '24px' }}>
            
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '28px',
              alignItems: 'stretch'
            }}>
              {/* Left Side: Large Movement Image */}
              <div style={{ 
                flex: isMobile ? 'none' : '0 0 320px',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '24px', 
                position: 'relative', 
                backgroundColor: 'var(--primary-light)',
                borderRadius: '20px',
                border: '3px solid #000',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
                minHeight: '280px'
              }}>
                <img 
                  src={movement.image} 
                  alt={movement.name} 
                  style={{ width: '100%', maxWidth: '260px', height: 'auto', maxHeight: '280px', objectFit: 'contain', animation: 'floatAnimation 3s ease-in-out infinite' }} 
                />
                <div style={{ position: 'absolute', top: 12, left: 12, backgroundColor: 'var(--game-yellow)', color: '#000', border: '3px solid #000', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, boxShadow: '2px 2px 0px #000' }}>
                  {currentIdx + 1}
                </div>
              </div>

              {/* Right Side: Text & Actions */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--game-dark)', margin: 0 }}>
                      {isKidsMode ? movement.nameKids : movement.name}
                    </h2>
                    {isCompleted ? (
                      <span style={{ background: 'var(--game-green-light)', color: '#000', border: '3px solid #000', padding: '6px 16px', borderRadius: '12px', fontWeight: '900', fontSize: '13px', boxShadow: '2px 2px 0px #000' }}>✓ Selesai</span>
                    ) : (
                      <span style={{ background: '#fecdd3', color: '#be123c', border: '3px solid #000', padding: '6px 16px', borderRadius: '12px', fontWeight: '900', fontSize: '13px' }}>Belum</span>
                    )}
                  </div>

                  {/* Arabic Text */}
                  {movement.arabicText && (
                    <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}>
                      <div className="arabic-text" style={{ fontSize: '26px', textAlign: 'right', fontWeight: 900, lineHeight: 1.6 }}>{movement.arabicText}</div>
                    </div>
                  )}

                  {/* Latin & Translation */}
                  {movement.latin && (
                    <div style={{ borderLeft: '4px solid var(--game-purple)', paddingLeft: '12px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--game-purple)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Latin</div>
                      <div className="latin-text" style={{ fontStyle: 'italic', fontWeight: '700', fontSize: '15px', color: '#333' }}>{movement.latin}</div>
                    </div>
                  )}
                  {movement.translation && (
                    <div style={{ borderLeft: '4px solid var(--game-green)', paddingLeft: '12px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--game-green)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Terjemahan</div>
                      <div className="translation-text" style={{ fontWeight: '700', fontSize: '14px', color: '#444' }}>{movement.translation}</div>
                    </div>
                  )}

                  {/* Explanation */}
                  <div style={{ background: isKidsMode ? '#fef3c7' : '#f1f5f9', borderRadius: '16px', border: '3px solid #000', padding: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: isKidsMode ? '#b45309' : '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {isKidsMode ? '💡 Penjelasan untuk Kamu' : 'ℹ️ Keterangan'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#000', lineHeight: 1.7, fontWeight: '700' }}>
                      {isKidsMode ? movement.explanationKids : movement.explanation}
                    </div>
                  </div>

                  {/* Audio Player */}
                  {movement.audioUrl && (
                    <div style={{ marginTop: '8px' }}>
                      <AudioPlayer
                        src={movement.audioUrl}
                        label={`Pelafalan Bacaan Sholat`}
                        onEnded={handleAudioEnded}
                        autoPlay={autoplay}
                      />
                    </div>
                  )}
                </div>

                {/* Mark Complete Button */}
                <button 
                  className={`btn w-full ${isCompleted ? 'btn-ghost' : 'btn-primary'}`} 
                  onClick={handleMarkComplete} 
                  disabled={isCompleted}
                  style={{ fontSize: '16px', padding: '14px', marginTop: '10px' }}
                >
                  {justCompleted ? (
                    <><CheckCircle size={18} /> Level Diselesaikan! +50 XP ⭐</>
                  ) : isCompleted ? (
                    <><CheckCircle size={18} /> Gerakan Sudah Dikuasai ✓</>
                  ) : (
                    <>🎯 Selesaikan Gerakan Ini (+50 XP) 🎁</>
                  )}
                </button>
              </div>
            </div>
            
          </div>

          {/* Navigation Controls */}
          <div className="nav-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <button className="btn" onClick={goPrev} disabled={currentIdx === 0} style={{ padding: '10px 20px' }}>
              <ChevronLeft size={18} /> {isKidsMode ? 'Kembali' : 'Sebelumnya'}
            </button>

            <div className="step-indicator" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {SHOLAT_MOVEMENTS.map((m, i) => (
                <div
                  key={i}
                  className={`step-dot ${i === currentIdx ? 'active' : ''} ${profile.completedMovements.includes(m.key) ? 'completed' : ''}`}
                  onClick={() => setCurrentIdx(i)}
                  style={{ 
                    cursor: 'pointer', 
                    width: '12px', height: '12px', borderRadius: '50%',
                    border: '2px solid #000',
                    backgroundColor: i === currentIdx ? 'var(--game-purple)' : profile.completedMovements.includes(m.key) ? 'var(--game-green-light)' : '#fff',
                    transition: 'all 0.1s ease'
                  }}
                />
              ))}
            </div>

            <button className="btn" onClick={goNext} disabled={currentIdx === totalCount - 1} style={{ padding: '10px 20px', backgroundColor: 'var(--game-yellow)' }}>
              {isKidsMode ? 'Lanjut' : 'Selanjutnya'} <ChevronRight size={18} />
            </button>
          </div>

          {/* Video Section (Dewasa saja, disembunyikan di Mode Anak) */}
          {!isKidsMode && (
            <div className="card" style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>🎬</span>
                  <span style={{ fontWeight: 900, fontSize: '16px' }}>Video Tutorial Sholat</span>
                </div>
                <button className="btn btn-sm" style={{ backgroundColor: '#fff' }} onClick={() => setShowVideo(v => !v)}>
                  {showVideo ? 'Tutup Video ❌' : 'Buka Video Tutorial 🎬'}
                </button>
              </div>
              
              {showVideo && (
                <div className="video-container animate-fadeInUp" style={{ borderRadius: '16px', overflow: 'hidden', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                    title="Video Tata Cara Sholat"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', height: '320px', border: 'none' }}
                  />
                </div>
              )}
              
              {!showVideo && (
                <div
                  style={{ background: '#f8fafc', borderRadius: '16px', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', border: '3px dashed #000' }}
                  onClick={() => setShowVideo(true)}
                >
                  <div style={{ fontSize: '40px' }}>▶️</div>
                  <div style={{ fontWeight: 900, fontSize: '14px' }}>Tonton Video Panduan Tata Cara Sholat</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}