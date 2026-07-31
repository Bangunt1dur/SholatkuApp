import React from 'react';
import { useApp } from '../context/AppContext';
import { SHOLAT_MOVEMENTS } from '../data/data';
import MascotRafi from '../components/Shared/MascotRafi';

export default function HomePage({ setActivePage }) {
  const { profile, prayersDoneToday } = useApp();

  const completedCount = profile?.completedMovements?.length || 0;
  const totalMovements = SHOLAT_MOVEMENTS?.length || 11;
  const xpPercent = profile ? Math.min(100, Math.round((profile.xp / profile.xpToNext) * 100)) : 0;

  if (!profile) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--game-dark)' }}>
        <h3>Memuat Halaman...</h3>
      </div>
    );
  }

  const neobrutalistCardBase = {
    border: '4px solid #000',
    boxShadow: '5px 5px 0px #000',
    borderRadius: '24px',
    padding: '24px',
    position: 'relative',
    boxSizing: 'border-box',
    color: '#000'
  };

  const interactiveCardStyle = {
    ...neobrutalistCardBase,
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  };

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px', color: '#000' }}>

      {/* GREETING & MASCOT BANNER */}
      <section style={{ 
        ...neobrutalistCardBase, 
        backgroundColor: '#FFFFFF', 
        display: 'flex', 
        gap: '24px', 
        alignItems: 'center', 
        marginBottom: '32px', 
        flexWrap: 'wrap',
        boxShadow: '6px 6px 0px #000'
      }}>
        <div className="mancot-float" style={{ 
          fontSize: '64px', 
          backgroundColor: '#FFFFFF', 
          border: '4px solid #000', 
          borderRadius: '20px', 
          padding: '10px', 
          boxShadow: '3px 3px 0px #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          🤖
        </div>
        <div style={{ flex: 1, minWidth: '260px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
            Assalamualaikum, <span style={{ 
              backgroundColor: '#FFFFFF', 
              border: '3.5px solid #000', 
              padding: '2px 14px', 
              borderRadius: '14px', 
              boxShadow: '3px 3px 0px #000',
              color: 'var(--game-purple)'
            }}>{profile.name || 'Adit'}!</span> 👋
          </h1>
          <p style={{ fontSize: '15px', fontWeight: 800, color: '#555', margin: 0, lineHeight: 1.5 }}>
            Siap untuk petualangan hari ini? Jaga konsistensi sholatmu dan kumpulkan lebih banyak koin & gems!
          </p>
        </div>
      </section>

      {/* BENTO GRID STATS */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px', 
        marginBottom: '32px' 
      }}>

        {/* Card 1: Status Sholat */}
        <div style={{ ...neobrutalistCardBase, backgroundColor: '#3b82f6', color: '#FFFFFF' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#dbeafe' }}>SHOLAT</span>
          <h2 style={{ fontSize: '40px', fontWeight: 900, margin: '6px 0', color: '#FFFFFF', lineHeight: 1 }}>{prayersDoneToday}/5</h2>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>Waktu Terabsen</span>
          <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '28px', opacity: 0.9 }}>🕌</div>
        </div>

        {/* Card 2: Koin Rewards */}
        <div style={{ ...neobrutalistCardBase, backgroundColor: 'var(--game-yellow)' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#78350f' }}>KOIN REWARDS</span>
          <h2 style={{ fontSize: '40px', fontWeight: 900, margin: '6px 0', lineHeight: 1 }}>{(profile.gems || 0) * 250}</h2>
          <span style={{ fontSize: '13px', fontWeight: 800 }}>Koin Terkumpul</span>
          <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '28px' }}>🪙</div>
        </div>

        {/* Card 3: Poin XP */}
        <div style={{ ...neobrutalistCardBase, backgroundColor: '#FFFFFF' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#4c1d95' }}>POIN PERTANYAAN</span>
          <h2 style={{ fontSize: '40px', fontWeight: 900, margin: '6px 0', lineHeight: 1 }}>{profile.xp || 0} <span style={{ fontSize: '14px', fontWeight: 800, color: '#4c1d95' }}>XP</span></h2>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#555' }}>Level {profile.level || 1}</div>
          <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '28px' }}>🧠</div>
        </div>

        {/* Card 4: Streak Konsistensi */}
        <div style={{ ...neobrutalistCardBase, backgroundColor: '#f43f5e', color: '#FFFFFF' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#ffe4e6' }}>STREAK HARIAN</span>
          <h2 style={{ fontSize: '40px', fontWeight: 900, margin: '6px 0', lineHeight: 1 }}>{profile.streak || 0} <span style={{ fontSize: '16px', fontWeight: 800 }}>Hari</span></h2>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>Sangat Konsisten!</span>
          <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '28px' }}>🔥</div>
        </div>

      </div>

      {/* MASCOT TALK */}
      <div style={{ marginBottom: '36px' }}>
        <MascotRafi />
      </div>

      {/* TRACK PERJALANAN SHOLAT */}
      <h2 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        Ayo Mulai Petualangan! 🗺️
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px' 
      }}>

        {/* Belajar Gerakan Sholat */}
        <div
          style={interactiveCardStyle}
          onClick={() => setActivePage('prayer-guide')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '40px' }}>📖</div>
            <span style={{ fontSize: '12px', fontWeight: 900, backgroundColor: 'var(--game-green-light)', padding: '4px 10px', borderRadius: '8px', border: '2px solid #000' }}>
              {completedCount}/{totalMovements} Selesai
            </span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '6px 0 2px' }}>Belajar Sholat</h3>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#555', margin: 0 }}>
            Pelajari tata cara dan bacaan sholat lengkap Kaidah Muhammadiyah.
          </p>
        </div>

        {/* Absen Sholat Harian */}
        <div
          style={interactiveCardStyle}
          onClick={() => setActivePage('tracker')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '40px' }}>📅</div>
            <span style={{ fontSize: '12px', fontWeight: 900, backgroundColor: '#fed7aa', padding: '4px 10px', borderRadius: '8px', border: '2px solid #000' }}>
              {prayersDoneToday}/5 Hari Ini
            </span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '6px 0 2px' }}>Absen Sholatku</h3>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#555', margin: 0 }}>
            Catat sholat 5 waktu harianmu dan dapatkan poin serta koin bonus.
          </p>
        </div>

        {/* Kuis Seru */}
        <div
          style={interactiveCardStyle}
          onClick={() => setActivePage('quiz')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '40px' }}>🎯</div>
            <span style={{ fontSize: '12px', fontWeight: 900, backgroundColor: '#e9d5ff', padding: '4px 10px', borderRadius: '8px', border: '2px solid #000' }}>
              Asah Otak
            </span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '6px 0 2px' }}>Kuis Seru</h3>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#555', margin: 0 }}>
            Uji pemahaman sholatmu dengan kuis interaktif yang seru!
          </p>
        </div>

        {/* Jalur Petualangan */}
        <div
          style={interactiveCardStyle}
          onClick={() => setActivePage('adventure')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '40px' }}>🗺️</div>
            <span style={{ fontSize: '12px', fontWeight: 900, backgroundColor: '#fef08a', padding: '4px 10px', borderRadius: '8px', border: '2px solid #000' }}>
              Petualangan
            </span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '6px 0 2px' }}>Jalur Petualangan</h3>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#555', margin: 0 }}>
            Jelajahi peta petualangan ibadah dan raih hadiah kejutan!
          </p>
        </div>

      </div>
    </div>
  );
}