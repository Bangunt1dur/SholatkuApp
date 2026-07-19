import React from 'react';
import { useApp } from '../context/AppContext';
import { PRAYER_NAMES, ACHIEVEMENTS, SHOLAT_MOVEMENTS } from '../data/Data';
import { Award, Star, Flame, Trophy } from 'lucide-react';
import MascotRafi from '../components/Shared/MascotRafi';

export default function ChildDashboard() {
  const { profile, tracker, togglePrayer, prayersDoneToday, parentTarget, streakHistory } = useApp();

  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNext) * 100));
  const earnedBadgeList = ACHIEVEMENTS.filter(a => profile.earnedBadges.includes(a.id));

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
      : streakHistory.find(h => h.date === dateStr);
    totalPrayers30Days += entry?.count ?? 0;
  });

  const progressPercentage = Math.min(100, Math.round((totalPrayers30Days / parentTarget.targetCount) * 100));

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Hero Welcome banner */}
      <div className="card mb-4" style={{ 
        background: 'linear-gradient(135deg, #712ae2 0%, #5a00c6 100%)', 
        color: 'white', 
        border: '4px solid #000', 
        boxShadow: '6px 6px 0px #000', 
        borderRadius: '24px',
        padding: '32px 24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '50px', transform: 'rotate(-5deg)' }}>🚀</div>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 900, margin: '0 0 6px', color: '#fff' }}>
              Dashboard Petualangan {profile.name}!
            </h2>
            <p style={{ fontSize: '15px', opacity: 0.95, fontWeight: 700, margin: 0 }}>
              Pantau poin, bintang, dan lencana hebat yang sudah kamu kumpulkan di sini.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid-3 mb-4">
        {/* Level & XP */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#eff6ff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '24px' }}>🗺️</span>
            <span style={{ fontSize: '12px', fontWeight: 900, backgroundColor: 'var(--game-yellow)', border: '2px solid #000', padding: '2px 8px', borderRadius: '8px' }}>
              LEVEL {profile.level}
            </span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, marginTop: '8px' }}>Level Progress</div>
          <div style={{ height: '16px', backgroundColor: '#e2e8f0', borderRadius: '10px', border: '2.5px solid #000', overflow: 'hidden', padding: '2px', boxSizing: 'border-box' }}>
            <div style={{ height: '100%', width: `${xpPercent}%`, backgroundColor: 'var(--game-purple)', borderRadius: '5px' }} />
          </div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#555' }}>
            {profile.xp} / {profile.xpToNext} XP
          </div>
        </div>

        {/* Streak */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#fff5f5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '24px' }}>🔥</span>
            <span style={{ fontSize: '12px', fontWeight: 900, backgroundColor: '#f43f5e', color: '#fff', border: '2px solid #000', padding: '2px 8px', borderRadius: '8px' }}>
              STREAK
            </span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#f43f5e', marginTop: '4px' }}>
            {profile.streak} Hari
          </div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#555' }}>
            Streak terlama: {profile.longestStreak} hari
          </div>
        </div>

        {/* Rewards */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#fffbeb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '24px' }}>🪙</span>
            <span style={{ fontSize: '12px', fontWeight: 900, backgroundColor: '#d97706', color: '#fff', border: '2px solid #000', padding: '2px 8px', borderRadius: '8px' }}>
              REWARDS
            </span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#b45309', marginTop: '4px' }}>
            {profile.gems * 250} Koin
          </div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#555' }}>
            Bintang terkumpul: {profile.stars} ⭐
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start', gap: '24px' }}>
        
        {/* Left: Daily Checklist */}
        <div>
          <div className="card" style={{ backgroundColor: '#fff' }}>
            <div style={{ fontWeight: 900, fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📅</span> Jurnal Sholatku Hari Ini ({prayersDoneToday}/5)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {PRAYER_NAMES.map((p) => {
                const done = tracker[p.key];
                return (
                  <div 
                    key={p.key} 
                    onClick={() => togglePrayer(p.key)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '12px 16px', 
                      borderRadius: '12px', 
                      background: done ? 'var(--game-green-light)' : '#f8fafc', 
                      border: '3px solid #000', 
                      boxShadow: done ? '3px 3px 0px #000' : 'none',
                      cursor: 'pointer',
                      transform: done ? 'translateY(2px)' : 'none',
                      transition: 'all 0.1s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '20px' }}>{p.emoji}</span>
                      <span style={{ fontWeight: 900, fontSize: '14px' }}>{p.label}</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 900, color: done ? '#166534' : '#666' }}>
                      {done ? '✅ Sudah' : '⬜ Ketuk untuk Absen'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <MascotRafi />
          </div>
        </div>

        {/* Right: Badges and Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Misi Hadiah dari Orang Tua */}
          <div className="card" style={{ border: '4px solid var(--game-purple)', background: '#f5f3ff' }}>
            <div style={{ fontWeight: 900, fontSize: '16px', color: '#5b21b6', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎁</span> Misi Hadiah Spesial!
            </div>
            <p style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 10px', color: '#4c1d95', lineHeight: 1.4 }}>
              Papa & Mama menyiapkan hadiah: <strong style={{ textDecoration: 'underline' }}>{parentTarget.reward}</strong> jika kamu mencapai <strong>{parentTarget.targetCount} sholat</strong> dalam 30 hari!
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 900, marginBottom: '6px' }}>
              <span>Progresmu:</span>
              <span>{totalPrayers30Days} / {parentTarget.targetCount} Sholat</span>
            </div>
            <div style={{ height: '20px', backgroundColor: '#e2e8f0', borderRadius: '10px', border: '3px solid #000', overflow: 'hidden', padding: '2px', boxSizing: 'border-box', marginBottom: '8px' }}>
              <div style={{ height: '100%', width: `${progressPercentage}%`, backgroundColor: progressPercentage >= 100 ? 'var(--game-green-light)' : 'var(--game-purple)', borderRadius: '6px' }} />
            </div>
            <div style={{ fontSize: '12px', fontWeight: 800, textAlign: 'center', color: '#4c1d95', lineHeight: 1.4 }}>
              {parentTarget.isClaimed 
                ? '🎉 Selamat! Hadiah sudah diberikan oleh Papa/Mama!' 
                : progressPercentage >= 100 
                  ? '🎉 Yey! Target tercapai! Laporkan ke Papa/Mama untuk ambil hadiahmu!' 
                  : `Kurang ${Math.max(0, parentTarget.targetCount - totalPrayers30Days)} sholat lagi untuk dapat hadiah! Semangat! 💪`}
            </div>
          </div>

          {/* Lencana */}
          <div className="card">
            <div style={{ fontWeight: 900, fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '3px solid #000', paddingBottom: '8px' }}>
              <Trophy size={18} style={{ color: '#d97706' }} />
              Lencana Prestasi ({earnedBadgeList.length}/{ACHIEVEMENTS.length})
            </div>
            {earnedBadgeList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666', fontSize: '13px', fontWeight: 800 }}>
                Ayo absen sholat dan main kuis untuk mendapatkan lencana pertamamu! 🏆
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {earnedBadgeList.map((b) => (
                  <div key={b.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: '#fef3c7', 
                    borderRadius: '99px', 
                    padding: '8px 16px', 
                    border: '3px solid #000', 
                    boxShadow: '2px 2px 0px #000' 
                  }}>
                    <span style={{ fontSize: '18px' }}>{b.emoji}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '12px', fontWeight: 900, color: '#000' }}>{b.nameKids}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gerakan Progress */}
          <div className="card">
            <div style={{ fontWeight: 900, fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '3px solid #000', paddingBottom: '8px' }}>
              <Star size={18} style={{ color: 'var(--game-purple)' }} />
              Gerakan yang Dipelajari ({profile.completedMovements.length}/{SHOLAT_MOVEMENTS.length})
            </div>
            <div style={{ height: '20px', backgroundColor: '#e2e8f0', borderRadius: '10px', border: '3px solid #000', overflow: 'hidden', padding: '2px', boxSizing: 'border-box', marginBottom: '12px' }}>
              <div style={{ height: '100%', width: `${Math.min(100, Math.round((profile.completedMovements.length / SHOLAT_MOVEMENTS.length) * 100))}%`, backgroundColor: 'var(--game-green-light)', borderRadius: '6px' }} />
            </div>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#555', margin: 0 }}>
              Terus buka modul petualangan untuk menyelesaikan semua gerakan sholat dan jadi juara!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}