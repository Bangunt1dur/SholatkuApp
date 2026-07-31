// src/pages/SholatGuidePage.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Volume2, Mic, Check, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AudioPlayer from '../components/UI/AudioPlayer';

const YOUTUBE_VIDEO_ID = 'TqRvfvAMtOc';

export default function PrayerGuide() {
  const { userMode, profile, movements, completeMovement, isKidsMode } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const isKids = userMode === 'kids' || isKidsMode;
  const movement = movements[currentIdx];
  
  const completedMovements = profile?.completedMovements || [];
  const isCompleted = completedMovements.includes(movement?.key);
  const totalCount = movements.length;

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
    if (!isCompleted && profile) {
      completeMovement(movement.key);
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 2000);
    }
  };

  if (!movement) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3>Belum Ada Data Gerakan Sholat</h3>
        <p>Silakan buat data gerakan sholat melalui Panel Admin terlebih dahulu.</p>
      </div>
    );
  }

  // KIDS LAYOUT
  if (isKids) {
    return (
      <div className="animate-fadeInUp" style={{ padding: '16px', maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Bento Grid: 2 Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'stretch', marginBottom: '20px' }}>
          
          {/* Left Column: Movement Info & Readings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Green Card: Movement Info */}
            <div className="clay-card" style={{ 
              background: '#6fff9d', border: '3px solid var(--game-dark)', padding: '20px', borderRadius: '24px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px'
            }}>
              <div>
                <span style={{ 
                  background: '#fff', border: '2px solid var(--game-dark)', padding: '4px 10px', 
                  borderRadius: '99px', fontSize: '11px', fontWeight: 900, color: 'var(--game-dark)', display: 'inline-block' 
                }}>
                  Gerakan ke-{currentIdx + 1}
                </span>
                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '26px', fontWeight: 950, color: 'var(--game-dark)', margin: '12px 0 6px' }}>
                  {movement.nameKids || movement.name}
                </h3>
                <p style={{ fontSize: '13px', fontWeight: 800, color: 'var(--game-dark)', lineHeight: 1.4, opacity: 0.8, margin: 0 }}>
                  {movement.explanationKids || movement.explanation}
                </p>
              </div>

              {/* Prev / Next buttons inside the card */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button 
                  onClick={goPrev} 
                  disabled={currentIdx === 0}
                  className="clay-btn" 
                  style={{ flex: 1, padding: '8px 12px', fontSize: '12px', opacity: currentIdx === 0 ? 0.5 : 1 }}
                >
                  <ChevronLeft size={14} /> Sebelumnya
                </button>
                <button 
                  onClick={goNext} 
                  disabled={currentIdx === totalCount - 1}
                  className="clay-btn yellow" 
                  style={{ flex: 1, padding: '8px 12px', fontSize: '12px', opacity: currentIdx === totalCount - 1 ? 0.5 : 1 }}
                >
                  Selanjutnya <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Purple Card: Arabic Text Box */}
            <div className="clay-card purple" style={{ 
              border: '3px solid var(--game-dark)', padding: '20px', borderRadius: '24px', textAlign: 'center' 
            }}>
              <span style={{ fontSize: '10.5px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9, display: 'block', marginBottom: '8px' }}>
                BACAAN BENTUK ARAB
              </span>

              {movement.arabicText ? (
                <div style={{ background: '#fff', border: '3.5px solid var(--game-dark)', borderRadius: '14px', padding: '14px', marginBottom: '10px', boxShadow: '3px 3px 0 var(--game-dark)' }}>
                  <div style={{ fontSize: '22px', fontWeight: 600, direction: 'rtl', fontFamily: 'serif', lineHeight: '2.0', color: 'var(--game-dark)' }}>
                    {movement.arabicText}
                  </div>
                </div>
              ) : (
                <div style={{ background: 'rgba(0,0,0,0.15)', border: '2px dashed #fff', borderRadius: '12px', padding: '14px', marginBottom: '10px', fontSize: '12px', fontWeight: 700 }}>
                  Tidak ada bacaan doa khusus (gerakan berdiri/perpindahan).
                </div>
              )}

              {movement.latin && (
                <p style={{ margin: '4px 0', fontSize: '12.5px', fontWeight: 800, color: '#fff', fontStyle: 'italic' }}>
                  "{movement.latin}"
                </p>
              )}
            </div>

          </div>

          {/* Right Column: Illustration Card */}
          <div className="clay-card" style={{ 
            background: '#fff', border: '3px solid var(--game-dark)', padding: '20px', borderRadius: '24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative'
          }}>
            <span style={{
              position: 'absolute', top: '16px', right: '16px', zIndex: 5,
              background: '#6fff9d', color: 'var(--game-dark)', border: '2.5px solid var(--game-dark)',
              padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 900,
              boxShadow: '2px 2px 0 var(--game-dark)'
            }}>
              {isCompleted ? 'Sudah Dikuasai! ✓' : 'Hampir Selesai! ⚡'}
            </span>

            <div style={{ 
              width: '100%', height: '100%', minHeight: '260px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              {movement.image ? (
                <img 
                  src={movement.image} 
                  alt={movement.name} 
                  style={{ width: '220px', height: '220px', objectFit: 'contain', animation: 'float 3s ease-in-out infinite' }} 
                />
              ) : (
                <div style={{ fontSize: '120px', animation: 'float 3s ease-in-out infinite' }}>
                  {movement.emoji || '🕌'}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Actions Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          
          <button 
            onClick={() => {
              if (movement.audioUrl) {
                const audio = new Audio(movement.audioUrl);
                audio.play().catch(() => alert('Gagal memutar audio.'));
              } else {
                alert('Audio pelafalan tidak tersedia.');
              }
            }}
            className="clay-btn" 
            style={{ padding: '14px', fontSize: '14.5px', border: '3px solid var(--game-dark)', boxShadow: '4px 4px 0 var(--game-dark)' }}
          >
            <Volume2 size={16} /> Dengarkan
          </button>
          
          <button 
            onClick={() => alert('Simulasi Uji Bacaan: Bacalah doa di atas dengan suara lantang! 🎙️')}
            className="clay-btn" 
            style={{ padding: '14px', fontSize: '14.5px', border: '3px solid var(--game-dark)', boxShadow: '4px 4px 0 var(--game-dark)' }}
          >
            <Mic size={16} /> Uji Bacaan
          </button>
          
          <button 
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className="clay-btn purple" 
            style={{ 
              padding: '14px', fontSize: '14.5px', border: '3px solid var(--game-dark)', 
              boxShadow: '4px 4px 0 var(--game-dark)',
              background: 'var(--game-purple)', borderColor: 'var(--game-dark)',
              opacity: isCompleted ? 0.6 : 1
            }}
          >
            <Check size={16} /> {isCompleted ? 'Selesai ✓' : 'Selesai 🎉'}
          </button>

        </div>

        {movement.audioUrl && (
          <div style={{ display: 'none' }}>
            <AudioPlayer
              src={movement.audioUrl}
              onEnded={handleAudioEnded}
              autoPlay={autoplay}
            />
          </div>
        )}
      </div>
    );
  }

  // ADULT/ADMIN CLEAN LAYOUT
  return (
    <div className="animate-fadeInUp" style={{ padding: '16px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '24px' }}>
        <BookOpen size={20} style={{ color: '#065F46' }} />
        <h2 style={{ 
          fontFamily: 'Playfair Display, serif', 
          fontSize: '24px', fontWeight: 700, 
          color: '#0F172A', 
          margin: 0 
        }}>
          Panduan Ibadah Sholat Muhammadiyah
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Sidebar: Movement List */}
        <div 
          style={{ 
            background: '#fff',
            border: '2px solid #000',
            borderRadius: '16px',
            boxShadow: '4px 4px 0px #000',
            padding: '20px 14px',
            position: 'sticky', top: 20, maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' 
          }}
        >
          <div style={{ fontWeight: 900, fontSize: '13px', color: '#1E293B', marginBottom: '12px' }}>
            📋 DAFTAR GERAKAN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {movements.map((m, i) => {
              const done = completedMovements.includes(m.key);
              const isActive = i === currentIdx;
              return (
                <div
                  key={m.key}
                  onClick={() => setCurrentIdx(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '10px',
                    borderRadius: '8px', cursor: 'pointer',
                    backgroundColor: isActive ? '#ECFDF5' : 'transparent',
                    border: isActive ? '1px solid #A7F3D0' : '1px solid transparent',
                    color: isActive ? '#047857' : '#4A5568',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 900,
                    backgroundColor: done ? '#059669' : '#E2E8F0',
                    color: done ? '#fff' : '#718096'
                  }}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                    {m.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 14, padding: '10px 0', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Putar Otomatis</span>
            <div className="autoplay-toggle" onClick={() => setAutoplay(a => !a)}>
              <div className={`toggle-track ${autoplay ? 'on' : ''}`} style={{ width: '40px', height: '20px', backgroundColor: autoplay ? '#059669' : '#CBD5E0', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                <div className="toggle-thumb" style={{ width: '14px', height: '14px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', left: autoplay ? '23px' : '3px', transition: 'left 0.2s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div 
            style={{ 
              background: '#fff',
              border: '2px solid #000',
              boxShadow: '4px 4px 0px #000',
              borderRadius: '16px',
              padding: '24px'
            }}
          >
            <div style={{ 
              background: '#FAF9F6',
              borderBottom: '1px solid #E2E8F0',
              borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center',
              position: 'relative', marginBottom: '20px'
            }}>
              {movement.image ? (
                <img 
                  src={movement.image} 
                  alt={movement.name} 
                  style={{ width: '150px', height: '150px', objectFit: 'contain' }} 
                />
              ) : (
                <div style={{ fontSize: '70px' }}>
                  {movement.emoji || '🕌'}
                </div>
              )}
              <div style={{ position: 'absolute', top: 12, left: 12, background: '#065F46', color: 'white', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13 }}>
                {currentIdx + 1}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ 
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0
                }}>
                  {movement.name}
                </h3>
                <span style={{ fontSize: '11px', color: '#718096', fontWeight: 700 }}>
                  Rujukan: {movement.source || 'HPT Muhammadiyah'}
                </span>
              </div>
            </div>

            {movement.arabicText && (
              <div style={{ 
                background: '#FAF9F6', 
                borderLeft: '4px solid #065F46',
                borderRadius: '0 12px 12px 0', 
                padding: '16px 20px', marginBottom: '16px'
              }}>
                <div style={{ fontSize: '24px', textAlign: 'right', fontWeight: 600, direction: 'rtl', fontFamily: 'serif', lineHeight: '2.2', color: '#0F172A' }}>
                  {movement.arabicText}
                </div>
              </div>
            )}

            {movement.latin && (
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#059669', textTransform: 'uppercase' }}>Transliterasi</span>
                <p style={{ margin: '2px 0 0', fontSize: '13.5px', fontWeight: 700, fontStyle: 'italic', color: '#2D3748', lineHeight: 1.4 }}>
                  {movement.latin}
                </p>
              </div>
            )}
            {movement.translation && (
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#059669', textTransform: 'uppercase' }}>Terjemahan</span>
                <p style={{ margin: '2px 0 0', fontSize: '13.5px', fontWeight: 700, color: '#4A5568', lineHeight: 1.4 }}>
                  "{movement.translation}"
                </p>
              </div>
            )}

            <div style={{ 
              background: 'rgba(6, 95, 70, 0.05)', 
              border: '2px solid #A7F3D0',
              borderRadius: '12px', padding: '16px', marginBottom: '20px' 
            }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#047857', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Kaidah & Fiqih Gerakan
              </span>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#1E293B', lineHeight: 1.6 }}>
                {movement.explanationDewasa || movement.explanation}
              </p>
            </div>

            {movement.audioUrl && (
              <div style={{ marginBottom: '20px' }}>
                <AudioPlayer
                  src={movement.audioUrl}
                  label={`Pelafalan Bacaan`}
                  onEnded={handleAudioEnded}
                  autoPlay={autoplay}
                />
              </div>
            )}

            <button 
              onClick={handleMarkComplete}
              disabled={isCompleted}
              style={{ 
                width: '100%',
                padding: '14px', fontSize: '15px', fontWeight: 900,
                borderRadius: '12px', border: '2px solid #000',
                backgroundColor: isCompleted ? '#E2E8F0' : '#059669',
                color: isCompleted ? '#64748B' : '#FFFFFF',
                boxShadow: '3px 3px 0px #000',
                cursor: isCompleted ? 'default' : 'pointer'
              }}
            >
              {justCompleted ? 'Level Diselesaikan! +50 XP ⭐' : isCompleted ? 'Gerakan Sudah Dikuasai ✓' : 'Selesaikan Gerakan Ini (+50 XP) 🎁'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={goPrev} 
              disabled={currentIdx === 0}
              style={{ padding: '10px 16px', fontWeight: 800, borderRadius: '10px', border: '2px solid #000', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ChevronLeft size={16} /> Sebelumnya
            </button>

            <button 
              onClick={goNext} 
              disabled={currentIdx === totalCount - 1}
              style={{ padding: '10px 16px', fontWeight: 800, borderRadius: '10px', border: '2px solid #000', backgroundColor: '#059669', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Selanjutnya <ChevronRight size={16} />
            </button>
          </div>

          {/* Video Section */}
          <div style={{ background: '#fff', border: '2px solid #000', borderRadius: '16px', padding: '20px', boxShadow: '4px 4px 0px #000' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, color: '#1E293B', margin: 0 }}>
                🎬 Video Tutorial Sholat
              </h4>
              <button 
                onClick={() => setShowVideo(!showVideo)}
                style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 800, borderRadius: '8px', border: '2px solid #000', backgroundColor: '#fff', cursor: 'pointer' }}
              >
                {showVideo ? 'Tutup Video' : 'Tonton Video'}
              </button>
            </div>

            {showVideo && (
              <div style={{ borderRadius: '10px', overflow: 'hidden', aspectRatio: '16/9' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
                  title="Video Tata Cara Sholat"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}