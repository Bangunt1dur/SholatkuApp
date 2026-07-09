// src/components/MascotRafi.jsx
import { useState, useEffect } from 'react';
import { MASCOT_TIPS } from '../../data/GameData';

export default function MascotRafi() {
  const [currentTip, setCurrentTip] = useState('');

  // Fungsi mengocok tips secara acak
  const shuffleTip = () => {
    const tipsArray = MASCOT_TIPS || [];
    if (tipsArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * tipsArray.length);
      setCurrentTip(tipsArray[randomIndex]);
    } else {
      setCurrentTip('Assalamu\'alaikum! Yuk semangat belajar sholat hari ini! 🌟');
    }
  };

  // Jalankan acak tips saat pertama kali komponen dimuat
  useEffect(() => {
    shuffleTip();
  }, []);

  return (
    <div 
      className="clay-card" 
      onClick={shuffleTip}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        background: '#ffffff',
        cursor: 'pointer',
        border: '3px solid var(--mint-base)',
        padding: '16px 20px',
        position: 'relative'
      }}
    >
      {/* Balon Ucapan Robot Rafi */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--mint-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
          🤖 Robot Rafi Berkata:
        </div>
        <div style={{ fontSize: '14px', fontWeight: '800', color: '#2D3748', lineHeight: '1.5' }}>
          "{currentTip}"
        </div>
        <div style={{ fontSize: '10px', color: '#A0AEC0', fontWeight: '700', marginTop: '6px' }}>
          💡 Klik robot untuk tips lainnya!
        </div>
      </div>

      {/* Ilustrasi Lingkaran Avatar Maskot */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--mint-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '36px',
        boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05)',
        flexShrink: 0,
        animation: 'float 3s ease-in-out infinite'
      }}>
        🤖
      </div>
    </div>
  );
}