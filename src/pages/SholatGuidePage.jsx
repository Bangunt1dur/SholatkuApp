import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOLAT_MOVEMENTS } from '../data/data';
import AudioPlayer from '../components/UI/AudioPlayer';
import rukukGif from '../assets/Rukuk.gif'; 
import itidalGif from '../assets/I\'tidal.gif';
import sujudGif from '../assets/Sujud.gif';
import salamKananGif from '../assets/salam pertama(kanan).svg';
import salamKiriGif from '../assets/salam ke dua.gif';

const YOUTUBE_VIDEO_ID = 'TqRvfvAMtOc';

export default function PrayerGuide() {
  const { isKidsMode, profile, completeMovement } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const movement = SHOLAT_MOVEMENTS[currentIdx];
  const isCompleted = profile.completedMovements.includes(movement.key);
  const totalCount = SHOLAT_MOVEMENTS.length;

  // Fungsi untuk menentukan source gambar berdasarkan key gerakan
  const getMovementImage = (m) => {
    switch (m.key) {
      case 'rukuk': return rukukGif;
      case 'itidal': return itidalGif;
      case 'sujud': return sujudGif;
      case 'salam_pertama': return salamKananGif;
      case 'salam_kedua': return salamKiriGif;
      default: return m.image;
    }
  };

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

        <div>
          <div className="prayer-movement-card mb-4" key={movement.id}>
            <div className="movement-image clay-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', position: 'relative', marginBottom: '16px' }}>
              <img 
                src={getMovementImage(movement)} 
                alt={movement.name} 
                style={{ width: '160px', height: '160px', objectFit: 'contain', animation: 'float 3s ease-in-out infinite' }} 
              />
              <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--mint-dark)', color: 'white', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13 }}>
                {currentIdx + 1}
              </div>
            </div>

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

              {/* ... sisanya (arabicText, latin, translation, penjelasan, dll) tetap sama ... */}
              {movement.arabicText && (
                <div style={{ background: 'rgba(126, 224, 185, 0.2)', borderRadius: 'var(--radius-clay)', padding: '16px 20px', marginBottom: 14, borderLeft: '4px solid var(--mint-base)' }}>
                  <div className="arabic-text" style={{ fontSize: '22px', textAlign: 'right' }}>{movement.arabicText}</div>
                </div>
              )}

              {movement.latin && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--mint-dark)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>Latin</div>
                  <div className="latin-text" style={{ fontStyle: 'italic', fontWeight: '600' }}>{movement.latin}</div>
                </div>
              )}
              
              {/* ... (lanjutkan bagian sisa komponen lainnya) ... */}
              
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

          <div className="nav-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <button className="clay-btn" onClick={goPrev} disabled={currentIdx === 0} style={{ padding: '10px 16px' }}>
              <ChevronLeft size={18} /> {isKidsMode ? 'Kembali' : 'Sebelumnya'}
            </button>

            <button className="clay-btn yellow" onClick={goNext} disabled={currentIdx === totalCount - 1} style={{ padding: '10px 16px' }}>
              {isKidsMode ? 'Lanjut' : 'Selanjutnya'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}