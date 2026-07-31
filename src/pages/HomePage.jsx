import React from 'react';
import { useApp } from '../context/AppContext';
import { SHOLAT_MOVEMENTS } from '../data/sholatData';
import MascotRafi from '../components/Shared/MascotRafi';

export default function HomePage({ setActivePage }) {
  const { profile, prayersDoneToday, parentTarget, streakHistory } = useApp();
  const completedCount = profile.completedMovements?.length || 0;
  const totalMovements = SHOLAT_MOVEMENTS?.length || 11;
  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNext) * 100));

  const today = new Date();
  const past30Days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    past30Days.push(d.toISOString().split('T')[0]);
  }

  let totalPrayers30Days = 0;
  past30Days.forEach(dateStr => {
    const isToday = dateStr === today.toISOString().split('T')[0];
    const entry = isToday
      ? { count: prayersDoneToday }
      : (streakHistory || []).find(h => h.date === dateStr);
    totalPrayers30Days += entry?.count ?? 0;
  });

  const progressPercentage = Math.min(100, Math.round((totalPrayers30Days / (parentTarget?.targetCount || 120)) * 100));

  // Gaya Dasar Kartu Neo-Brutalisme (Warna Awal)
  const neobrutalistCardBase = {
    border: '4px solid #000',
    boxShadow: '5px 5px 0px #000',
    borderRadius: '24px',
    padding: '24px',
    position: 'relative',
    boxSizing: 'border-box',
    color: '#000'
  };

  // Gaya untuk kartu navigasi interaktif (bisa diklik)
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

      {/* ─── ATAS: GREETING & MASCOT BANNER ─── */}
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
            }}>{profile.name || 'Teman Sholat'}!</span> 👋
          </h1>
          <p style={{ fontSize: '15px', fontWeight: 800, color: '#555', margin: 0, lineHeight: 1.5 }}>
            Siap untuk petualangan hari ini? Jaga konsistensi sholatmu dan kumpulkan lebih banyak koin!
          </p>
        </div>
      </section>

      {/* ─── TENGAH: BENTO GRID STATS ─── */}
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
          <h2 style={{ fontSize: '40px', fontWeight: 900, margin: '6px 0', lineHeight: 1 }}>{profile.gems * 250}</h2>
          <span style={{ fontSize: '13px', fontWeight: 800 }}>Koin Terkumpul</span>
          <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '28px' }}>🪙</div>
        </div>

        {/* Card 3: Poin XP & Progress Bar */}
        <div style={{ ...neobrutalistCardBase, backgroundColor: '#FFFFFF' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#4c1d95' }}>POIN PERTANYAAN</span>
          <h2 style={{ fontSize: '40px', fontWeight: 900, margin: '6px 0', lineHeight: 1 }}>{profile.xp} <span style={{ fontSize: '14px', fontWeight: 800, color: '#4c1d95' }}>XP</span></h2>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#555' }}>Poin XP</div>
          <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '28px' }}>🧠</div>
        </div>

        {/* Card 4: Streak Konsistensi */}
        <div style={{ ...neobrutalistCardBase, backgroundColor: '#f43f5e', color: '#FFFFFF' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#ffe4e6' }}>STREAK HARIAN</span>
          <h2 style={{ fontSize: '40px', fontWeight: 900, margin: '6px 0', lineHeight: 1 }}>{profile.streak} <span style={{ fontSize: '16px', fontWeight: 800 }}>Days</span></h2>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>Sangat Konsisten!</span>
          <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '28px' }}>🔥</div>
        </div>

      </div>

      {/* ─── ASISTEN MASCOT TALK ─── */}
      <div style={{ marginBottom: '36px' }}>
        <MascotRafi />
      </div>

      {/* ─── BANNER MISI HADIAH SPESIAL DARI ORANG TUA ─── */}
      {parentTarget && (
        <section style={{
          ...neobrutalistCardBase,
          border: '4px solid var(--game-purple, #712ae2)',
          background: '#f5f3ff',
          marginBottom: '32px',
          boxShadow: '6px 6px 0px #5b21b6'
        }}>
          <div style={{ fontWeight: 900, fontSize: '18px', color: '#5b21b6', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎁</span> Misi Hadiah Spesial!
          </div>
          <p style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 14px', color: '#4c1d95', lineHeight: 1.5 }}>
            Papa & Mama menyiapkan hadiah: <strong style={{ textDecoration: 'underline', color: '#7c3aed' }}>{parentTarget.reward}</strong> jika kamu mencapai <strong>{parentTarget.targetCount} sholat</strong> dalam 30 hari!
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 900, marginBottom: '6px', color: '#4c1d95' }}>
            <span>Progres Ibadahmu:</span>
            <span>{totalPrayers30Days} / {parentTarget.targetCount} Sholat</span>
          </div>
          <div style={{ height: '22px', backgroundColor: '#e2e8f0', borderRadius: '12px', border: '3.5px solid #000', overflow: 'hidden', padding: '2px', boxSizing: 'border-box', marginBottom: '10px' }}>
            <div style={{ height: '100%', width: `${progressPercentage}%`, backgroundColor: progressPercentage >= 100 ? '#10B981' : 'var(--game-purple, #712ae2)', borderRadius: '6px' }} />
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, textAlign: 'center', color: '#4c1d95', lineHeight: 1.4 }}>
            {parentTarget.isClaimed 
              ? '🎉 Selamat! Hadiah sudah diberikan oleh Papa/Mama! Terima kasih Ma, Pa! ❤️' 
              : progressPercentage >= 100 
                ? '🎉 Yey! Target tercapai! Laporkan ke Papa/Mama untuk ambil hadiahmu sekarang! 🎁' 
                : `Kurang ${Math.max(0, parentTarget.targetCount - totalPrayers30Days)} sholat lagi untuk mendapatkan hadiah! Semangat terus, kamu pasti bisa! 💪`}
          </div>
        </section>
      )}

      {/* ─── TRACK PERJALANAN SHOLAT (MENU UTAMA ANAK) ─── */}
      <h2 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        Ayo Mulai Petualangan! 🗺️
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '24px' 
      }}>

        {/* Pilihan 1: Belajar Gerakan Sholat */}
        <div
          style={interactiveCardStyle}
          onClick={() => setActivePage('prayer-guide')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '7px 7px 0px #000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '5px 5px 0px #000';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '40px' }}>📖</div>
            <span style={{ fontSize: '12px', fontWeight: 900, backgroundColor: 'var(--game-green-light)', padding: '4px 10px', borderRadius: '8px', border: '2px solid #000' }}>
              Progres: {completedCount}/{totalMovements} Gerakan
            </span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '4px 0 0' }}>Belajar Gerakan Sholat</h3>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#555', margin: 0, lineHeight: 1.4 }}>
            Pelajari setiap gerakan sholat fardhu secara bertahap, lengkap dengan tuntunan audio bacaan yang jelas serta panduan interaktif.
          </p>
          <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--game-purple)', marginTop: 'auto', paddingTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Buka Panduan Sholat ➔
          </span>
        </div>

        {/* Pilihan 2: Peta Petualangan */}
        <div
          style={interactiveCardStyle}
          onClick={() => setActivePage('adventure')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '7px 7px 0px #000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '5px 5px 0px #000';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '40px' }}>🗺️</div>
            <span style={{ fontSize: '12px', fontWeight: 900, backgroundColor: 'var(--game-yellow)', color: '#000', padding: '4px 10px', borderRadius: '8px', border: '2px solid #000' }}>
              Level Misi: {profile.level}/5
            </span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '4px 0 0' }}>Peta Petualangan Sholat</h3>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#555', margin: 0, lineHeight: 1.4 }}>
            Lalui peta petualangan dari berdiri tegak hingga gerakan salam. Selesaikan setiap pos tantangan untuk membuka Peti Harta Karun!
          </p>
          <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--game-purple)', marginTop: 'auto', paddingTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Lihat Peta Petualangan ➔
          </span>
        </div>

        {/* Pilihan 3: Kuis Seru */}
        <div
          style={interactiveCardStyle}
          onClick={() => setActivePage('quiz')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '7px 7px 0px #000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '5px 5px 0px #000';
          }}
        >
          <div style={{ fontSize: '40px' }}>🎯</div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '4px 0 0' }}>Kuis Sholatku</h3>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#555', margin: 0, lineHeight: 1.4 }}>
            Uji pemahaman cerdasmu mengenai bacaan, tata cara, dan urutan rukun sholat. Dapatkan tambahan koin emas serta bonus skor XP!
          </p>
          <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--game-purple)', marginTop: 'auto', paddingTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Main Kuis Sekarang ➔
          </span>
        </div>

        {/* Pilihan 4: Jurnal Sholat Harian */}
        <div
          style={interactiveCardStyle}
          onClick={() => setActivePage('tracker')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '7px 7px 0px #000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '5px 5px 0px #000';
          }}
        >
          <div style={{ fontSize: '40px' }}>✅</div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '4px 0 0' }}>Jurnal Sholat Harian</h3>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#555', margin: 0, lineHeight: 1.4 }}>
            Catat absensi ibadah sholat 5 waktumu secara mandiri setiap hari, kumpulkan reward poin, dan pertahankan api *streak*-mu agar tidak padam!
          </p>
          <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--game-purple)', marginTop: 'auto', paddingTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Buka Jurnal Sholat ➔
          </span>
        </div>

      </div>

    </div>
  );
}