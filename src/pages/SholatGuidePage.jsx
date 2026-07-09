import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOLAT_MOVEMENTS } from '../data/data';
import AudioPlayer from '../components/UI/AudioPlayer';

const YOUTUBE_VIDEO_ID = 'TqRvfvAMtOc'; // Video tata cara sholat

export default function PrayerGuide() {
  const { isKidsMode, profile, completeMovement } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const movement = SHOLAT_MOVEMENTS[currentIdx];
  const isCompleted = profile.completedMovements.includes(movement.key);
  const totalCount = SHOLAT_MOVEMENTS.length;

  const goNext = () => {
    if (currentIdx < totalCount - 1) setCurrentIdx(i => i + 1);
  };

  const goPrev = () => {
    if (currentIdx > 0) setCurrentIdx(i => i - 1);
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
    <div className="animate-fadeInUp">
      <div className="section-title">
        <div className="title-icon">📖</div>
        {isKidsMode ? 'Belajar Gerakan Sholat 🌟' : 'Panduan Gerakan Sholat'}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
        {/* Movement List Sidebar */}
        {/* Ubah .card menjadi .clay-card agar empuk */}
        <div className="clay-card" style={{ position: 'sticky', top: 20, alignSelf: 'flex-start', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: 'var(--text-dark)', marginBottom: 10 }}>
            📋 Daftar Gerakan
          </div>
          <div className="movement-list">
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
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.3 }}>
                      {isKidsMode ? m.nameKids : m.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Autoplay Toggle */}
          <div style={{ marginTop: 14, padding: '10px 0', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <div className="autoplay-toggle" onClick={() => setAutoplay(a => !a)}>
              <div className={`toggle-track ${autoplay ? 'on' : ''}`}>
                <div className="toggle-thumb" />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--mint-dark)' }}>
                {autoplay ? '🔄 Autoplay ON' : '⏸ Autoplay OFF'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          <div className="prayer-movement-card mb-4" key={movement.id}>
            
            {/* 👇👇 BAGIAN GAMBAR DIMULAI DARI SINI 👇👇 */}
            <div className="movement-image clay-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', position: 'relative', marginBottom: '16px' }}>
              <img 
                src={movement.image} 
                alt={movement.name} 
                style={{ width: '160px', height: '160px', objectFit: 'contain', animation: 'float 3s ease-in-out infinite' }} 
              />
              <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--mint-dark)', color: 'white', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13 }}>
                {currentIdx + 1}
              </div>
            </div>
            {/* 👆👆 BAGIAN GAMBAR BERAKHIR DI SINI 👆👆 */}

            {/* Content */}
            <div className="movement-content">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                <div>
                  <div className="movement-name" style={{ fontSize: '24px', fontWeight: '900', color: 'var(--mint-dark)' }}>
                    {isKidsMode ? movement.nameKids : movement.name}
                  </div>
                </div>
                {isCompleted ? (
                  <span className="badge" style={{ background: '#E0F5EE', color: '#3BA37B', padding: '6px 12px', borderRadius: '12px', fontWeight: '800' }}>✓ Selesai</span>
                ) : (
                  <span className="badge" style={{ background: '#FFD166', color: '#CC9900', padding: '6px 12px', borderRadius: '12px', fontWeight: '800' }}>Belum</span>
                )}
              </div>

              {/* Arabic Text */}
              {movement.arabicText && (
                <div style={{ background: 'rgba(126, 224, 185, 0.2)', borderRadius: 'var(--radius-clay)', padding: '16px 20px', marginBottom: 14, borderLeft: '4px solid var(--mint-base)' }}>
                  <div className="arabic-text" style={{ fontSize: '22px', textAlign: 'right' }}>{movement.arabicText}</div>
                </div>
              )}

              {/* Latin & Translation */}
              {movement.latin && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--mint-dark)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>Latin</div>
                  <div className="latin-text" style={{ fontStyle: 'italic', fontWeight: '600' }}>{movement.latin}</div>
                </div>
              )}
              {movement.translation && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--mint-dark)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>Terjemahan</div>
                  <div className="translation-text" style={{ fontWeight: '600' }}>{movement.translation}</div>
                </div>
              )}

              {/* Explanation */}
              <div style={{ background: isKidsMode ? '#FFD16620' : 'rgba(126, 224, 185, 0.2)', borderRadius: 'var(--radius-clay)', padding: '16px', marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: isKidsMode ? '#CC9900' : 'var(--mint-dark)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {isKidsMode ? '💡 Penjelasan untuk Kamu' : 'ℹ️ Penjelasan'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, fontWeight: '600' }}>
                  {isKidsMode ? movement.explanationKids : movement.explanation}
                </div>
              </div>

              {/* Audio Player */}
              {movement.audioUrl && (
                <div style={{ marginBottom: 14 }}>
                  <AudioPlayer
                    src={movement.audioUrl}
                    label={`Bacaan — ${isKidsMode ? movement.nameKids : movement.name}`}
                    onEnded={handleAudioEnded}
                    autoPlay={autoplay}
                  />
                </div>
              )}

              {/* Mark Complete Button (SUDAH DIPERBAIKI) */}
              <button 
                className={`clay-btn w-full ${isCompleted ? '' : 'yellow'}`} 
                onClick={handleMarkComplete} 
                disabled={isCompleted}
                style={{ opacity: isCompleted ? 0.6 : 1 }}
              >
                {justCompleted ? (
                  <><CheckCircle size={18} /> Tandai Selesai! ⭐</>
                ) : isCompleted ? (
                  <><CheckCircle size={18} /> Sudah Dipelajari ✓</>
                ) : (
                  <>📌 Tandai Sudah Belajar</>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="nav-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            
            {/* Tombol Sebelumnya (SUDAH DIPERBAIKI) */}
            <button className="clay-btn" onClick={goPrev} disabled={currentIdx === 0} style={{ padding: '10px 16px' }}>
              <ChevronLeft size={18} /> {isKidsMode ? 'Kembali' : 'Sebelumnya'}
            </button>

            <div className="step-indicator" style={{ display: 'flex', gap: '8px' }}>
              {SHOLAT_MOVEMENTS.map((m, i) => (
                <div
                  key={i}
                  className={`step-dot ${i === currentIdx ? 'active' : ''} ${profile.completedMovements.includes(m.key) ? 'completed' : ''}`}
                  onClick={() => setCurrentIdx(i)}
                  style={{ 
                    cursor: 'pointer', 
                    width: '12px', height: '12px', borderRadius: '50%',
                    backgroundColor: i === currentIdx ? 'var(--mint-dark)' : profile.completedMovements.includes(m.key) ? 'var(--mint-base)' : '#ccc'
                  }}
                />
              ))}
            </div>

            {/* Tombol Selanjutnya (SUDAH DIPERBAIKI) */}
            <button className="clay-btn yellow" onClick={goNext} disabled={currentIdx === totalCount - 1} style={{ padding: '10px 16px' }}>
              {isKidsMode ? 'Lanjut' : 'Selanjutnya'} <ChevronRight size={18} />
            </button>
          </div>

          {/* Video Section */}
          <div className="clay-card" style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div className="section-title" style={{ margin: 0 }}>
                <div className="title-icon">🎬</div>
                <span style={{ fontWeight: 900, color: 'var(--mint-dark)' }}>
                  {isKidsMode ? 'Video Sholat' : 'Video Tata Cara Sholat'}
                </span>
              </div>
              
              {/* Tombol Tonton Video (SUDAH DIPERBAIKI) */}
              <button className="clay-btn" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={() => setShowVideo(v => !v)}>
                {showVideo ? 'Tutup Video' : 'Tonton Video'}
              </button>
            </div>
            
            {showVideo && (
              <div className="video-container animate-fadeIn" style={{ borderRadius: 'var(--radius-clay)', overflow: 'hidden' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                  title="Video Tata Cara Sholat"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '300px', border: 'none' }}
                />
              </div>
            )}
            
            {!showVideo && (
              <div
                style={{ background: 'rgba(126, 224, 185, 0.2)', borderRadius: 'var(--radius-clay)', height: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', border: '3px dashed var(--mint-base)' }}
                onClick={() => setShowVideo(true)}
              >
                <div style={{ fontSize: 40 }}>▶️</div>
                <div style={{ fontWeight: 800, color: 'var(--mint-dark)', fontSize: 14 }}>
                  {isKidsMode ? 'Klik untuk Tonton Video Sholat!' : 'Tonton Video Tata Cara Sholat'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}