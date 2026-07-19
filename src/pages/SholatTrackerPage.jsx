// src/pages/SholatTrackerPage.jsx
import { useApp } from '../context/AppContext';
import { PRAYER_NAMES } from '../data/data';
import StreakCalendar from '../components/UI/StreakCalendar';
import { Check, Flame, Trophy } from 'lucide-react';

export default function Tracker() {
  const { userMode, profile, tracker, togglePrayer, prayersDoneToday } = useApp();
  const isKidsMode = userMode === 'kids';

  const prayerProgress = Math.round((prayersDoneToday / 5) * 100);
  const monthlyTotal = profile ? Math.round((profile.totalPrayers / (new Date().getDate() * 5)) * 100) : 0;

  const currentStreak = profile?.streak || 0;

  // ─── KIDS LAYOUT: FIGMA MOCKUP 4 (Prayer Tracker Kinetic Edition) ───
  if (isKidsMode) {
    return (
      <div className="animate-fadeIn" style={{ padding: '16px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Upper Bento Row: Hero title & Mascot Flame Card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '32px', fontWeight: 950, color: 'var(--game-dark)', margin: '0 0 8px', lineHeight: 1.1 }}>
              Ready to Level Up, <br />
              <span style={{ color: 'var(--game-purple)', background: '#fff', border: '3px solid #000', padding: '0 8px', borderRadius: '8px', display: 'inline-block', marginTop: '6px' }}>Little Hero?</span>
            </h2>
            <p style={{ fontSize: '13px', fontWeight: 700, opacity: 0.8, margin: 0, color: 'var(--game-dark)' }}>
              Complete your daily prayers to earn XP and unlock cool new rewards from your parents!
            </p>
          </div>

          {/* Flame Mascot Card */}
          <div className="clay-card" style={{ 
            background: '#fff', border: '3px solid var(--game-dark)', padding: '16px 24px',
            display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '36px', animation: 'float 2s ease-in-out infinite' }}>🔥</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '16px', color: 'var(--game-dark)' }}>{currentStreak} Hari Streak</div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>Semangat pantang padam!</div>
              </div>
            </div>
            <span style={{
              background: '#6fff9d', color: 'var(--game-dark)', border: '2px solid var(--game-dark)',
              padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 900,
              boxShadow: '2px 2px 0 var(--game-dark)'
            }}>
              Keep going!
            </span>
          </div>
        </div>

        {/* 5 Vertical Purple Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {PRAYER_NAMES.map((prayer) => {
            const isDone = tracker && tracker[prayer.key];
            const rakaatText = { fajr: '2 Raka\'at', dhuhr: '4 Raka\'at', asr: '4 Raka\'at', maghrib: '3 Raka\'at', isha: '4 Raka\'at' }[prayer.key];

            return (
              <div 
                key={prayer.key}
                className="clay-card purple animate-fadeInUp"
                style={{
                  border: '3.5px solid var(--game-dark)', borderRadius: '20px', padding: '16px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', 
                  alignItems: 'center', minHeight: '200px', textAlign: 'center',
                  background: 'var(--game-purple)', position: 'relative',
                  boxShadow: '4px 4px 0 var(--game-dark)'
                }}
              >
                {/* Completed Check icon in top right */}
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  width: '24px', height: '24px', borderRadius: '50%',
                  border: '2px solid var(--game-dark)',
                  background: isDone ? '#6fff9d' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {isDone && <Check size={14} style={{ color: 'var(--game-dark)', strokeWidth: 4 }} />}
                </div>

                <div style={{ marginTop: '20px' }}>
                  <div style={{ fontSize: '36px', marginBottom: '4px' }}>{prayer.emoji}</div>
                  <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#fff', margin: '0 0 2px' }}>
                    {prayer.labelKids}
                  </h4>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 800 }}>
                    {rakaatText}
                  </span>
                </div>

                {/* Done or Check in button */}
                <button
                  onClick={() => togglePrayer(prayer.key)}
                  className={`clay-btn ${isDone ? 'green' : ''}`}
                  style={{
                    width: '100%', padding: '8px 4px', fontSize: '12px',
                    border: '2px solid var(--game-dark)', borderRadius: '12px',
                    background: isDone ? '#6fff9d !important' : '#fff !important',
                    color: 'var(--game-dark) !important',
                    boxShadow: '2px 2px 0 var(--game-dark)'
                  }}
                >
                  {isDone ? 'Done! ✓' : 'Check in'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Card: Weekly Streak & Claim Reward */}
        <div className="clay-card" style={{ 
          background: '#fff', border: '3.5px solid var(--game-dark)', padding: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px'
        }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 900, color: 'var(--game-dark)' }}>
              Weekly Streak Tracker
            </h4>
            <p style={{ margin: '0 0 16px', fontSize: '12.5px', fontWeight: 700, color: '#64748B', lineHeight: 1.4 }}>
              Your streak is blazing! Don't let the flame go out—keep praying to stay on fire!
            </p>

            {/* Weekly Days circles */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                // Mocking visual completed status matching mockup (M, T, W, T completed)
                const isDayDone = i < 4; 
                return (
                  <div 
                    key={i}
                    style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      border: '2.5px solid var(--game-dark)',
                      background: isDayDone ? '#6fff9d' : '#fff',
                      color: 'var(--game-dark)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: 900,
                      boxShadow: '2px 2px 0 var(--game-dark)'
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Claim Reward Button */}
          <button
            onClick={() => alert('Klaim Hadiah: Kunjungi menu Hadiah Streak di Dashboard Orang Tua Anda! 🎁')}
            className="clay-btn purple"
            style={{
              padding: '16px 28px', fontSize: '15px', border: '3.5px solid var(--game-dark)',
              boxShadow: '4px 4px 0 var(--game-dark)', background: 'var(--game-purple)',
              color: '#fff', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <Trophy size={16} /> Claim Reward 🎉
          </button>
        </div>

      </div>
    );
  }

  // ─── ADULT/ADMIN CLEAN LAYOUT ───
  return (
    <div className="animate-fadeIn" style={{ padding: '16px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '24px' }}>
        <Check size={20} style={{ color: '#065F46' }} />
        <h2 style={{ 
          fontFamily: 'Playfair Display, serif', 
          fontSize: '24px', fontWeight: 700, 
          color: '#0F172A', 
          margin: 0 
        }}>
          Prayer Tracker — Absen Sholat
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left: Daily Checklist */}
        <div className="clay-card" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          
          {/* Today Summary */}
          <div style={{ 
            background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', 
            color: 'white', border: 'none', padding: '16px', borderRadius: '10px', marginBottom: '16px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8 }}>ABSEN HARI INI</div>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{prayersDoneToday}/5 Sholat</div>
              </div>
              <span style={{ fontSize: 32 }}>📅</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${prayerProgress}%`, background: '#fff', transition: 'width 0.4s' }} />
            </div>
          </div>

          {/* Checklist Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PRAYER_NAMES.map((prayer) => {
              const isDone = tracker && tracker[prayer.key];
              return (
                <div
                  key={prayer.key}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px', borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    background: isDone ? '#ECFDF5' : '#fff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{prayer.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: 13.5, color: '#1E293B' }}>{prayer.label}</span>
                  </div>
                  
                  <button
                    onClick={() => togglePrayer(prayer.key)}
                    className="clay-btn"
                    style={{
                      padding: '4px 10px', fontSize: '11.5px',
                      background: isDone ? '#6fff9d !important' : '#fff !important',
                      border: '1px solid #CBD5E1'
                    }}
                  >
                    {isDone ? 'Sudah ✓' : 'Absen'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Streak Calendar & Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Calendar */}
          <div className="clay-card" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '14.5px', fontWeight: 800, color: '#1E293B' }}>
              📅 Kalender Absensi Sholat
            </h4>
            <StreakCalendar />
          </div>

          {/* Summary Stats */}
          <div className="clay-card" style={{ background: '#fff', border: '1px solid #E2E8F0', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 32 }}>🔥</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13.5, color: '#1E293B' }}>Rata-rata Konsistensi</div>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700 }}>
                  Total Terabsen Bulan Ini: {monthlyTotal}% dari target
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
