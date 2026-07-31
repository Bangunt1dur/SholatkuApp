import React from 'react';
import { useApp } from '../context/AppContext';

export default function ProfilePicker({ setActivePage }) {
  const { selectProfile, userAccount, profile } = useApp();

  const handleSelect = (role) => {
    selectProfile(role);
    if (role === 'anak') {
      setActivePage('home');
    } else if (role === 'dewasa') {
      setActivePage('adult-quran');
    } else {
      setActivePage('parent-dashboard');
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '24px',
        backgroundColor: '#B8C6B6' // Menggunakan hijau sage polos sepenuhnya
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 900, marginBottom: '40px', color: '#113C2B' }}>
          Who is{' '}
          <span style={{ 
            color: '#FFFFFF', 
            backgroundColor: '#113C2B', // Label kontras hijau tua pekat
            border: '4px solid #113C2B', 
            padding: '6px 20px', 
            borderRadius: '14px',
            boxShadow: '0 6px 0px rgba(17, 60, 43, 0.2)',
            display: 'inline-block'
          }}>
            praying today? 🕌
          </span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          {/* Anak Profile Card */}
          <div 
            onClick={() => handleSelect('anak')}
            className="card"
            style={{ 
              cursor: 'pointer', 
              padding: '32px 24px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              backgroundColor: '#FFFFFF', // Putih bersih agar kontras dengan background luar
              borderRadius: '24px',
              border: '4px solid #113C2B',
              boxShadow: '0 8px 0px rgba(17, 60, 43, 0.15)',
              transition: 'transform 0.1s ease'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ 
              width: '96px', 
              height: '96px', 
              borderRadius: '50%', 
              backgroundColor: '#D4DDD3', // Detail lingkaran hijau sage muda pasif
              border: '3px solid #113C2B', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              👶
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 4px', color: '#113C2B' }}>
              {profile.name || 'Anak'}
            </h3>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#556B52', margin: 0 }}>
              Level {profile.level} • {profile.xp} XP
            </p>
          </div>

          {/* Mode Dewasa Profile Card */}
          <div 
            onClick={() => handleSelect('dewasa')}
            className="card"
            style={{ 
              cursor: 'pointer', 
              padding: '32px 24px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              backgroundColor: '#FFFFFF', 
              borderRadius: '24px',
              border: '4px solid #113C2B',
              boxShadow: '0 8px 0px rgba(17, 60, 43, 0.15)',
              transition: 'transform 0.1s ease'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ 
              width: '96px', 
              height: '96px', 
              borderRadius: '50%', 
              backgroundColor: '#D4DDD3', 
              border: '3px solid #113C2B', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              🧔
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 4px', color: '#113C2B' }}>
              Dewasa
            </h3>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#556B52', margin: 0 }}>
              Al-Qur'an, Jadwal & Dzikir
            </p>
          </div>

          {/* Orang Tua Profile Card */}
          <div 
            onClick={() => handleSelect('ortu')}
            className="card"
            style={{ 
              cursor: 'pointer', 
              padding: '32px 24px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              backgroundColor: '#FFFFFF', 
              borderRadius: '24px',
              border: '4px solid #113C2B',
              boxShadow: '0 8px 0px rgba(17, 60, 43, 0.15)',
              transition: 'transform 0.1s ease'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ 
              width: '96px', 
              height: '96px', 
              borderRadius: '50%', 
              backgroundColor: '#D4DDD3', 
              border: '3px solid #113C2B', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              👨‍👩‍👦
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 4px', color: '#113C2B' }}>
              Orang Tua
            </h3>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#556B52', margin: 0 }}>
              Parent Zone Dashboard
            </p>
          </div>

        </div>

        <button 
          className="btn" 
          onClick={() => setActivePage('register')} 
          style={{ 
            fontSize: '15px', 
            backgroundColor: '#D4DDD3', // Tombol sekunder hijau sage muda
            color: '#113C2B',
            padding: '12px 24px',
            border: '3px solid #113C2B',
            borderRadius: '14px',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 4px 0px #113C2B',
            transition: 'all 0.1s ease'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(2px)';
            e.currentTarget.style.boxShadow = '0 2px 0px #113C2B';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 0px #113C2B';
          }}
        >
          + Tambah Profile Baru
        </button>

      </div>
    </div>
  );
}