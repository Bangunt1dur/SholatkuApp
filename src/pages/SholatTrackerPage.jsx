import { useApp } from '../context/AppContext';
import { PRAYER_NAMES } from '../data/data';
import StreakCalendar from '../components/UI/StreakCalendar';
import { Check } from 'lucide-react';

export default function Tracker() {
  const { isKidsMode, profile, tracker, togglePrayer, prayersDoneToday } = useApp();
  const prayerProgress = Math.round((prayersDoneToday / 5) * 100);

  const monthlyTotal = Math.round((profile.totalPrayers / (new Date().getDate() * 5)) * 100);

  return (
    <div className="animate-fadeInUp">
      <div className="section-title">
        <div className="title-icon">✅</div>
        {isKidsMode ? 'Cek Sholat Hari Ini 📅' : 'Prayer Tracker — Absen Sholat'}
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left: Daily Checklist */}
        <div>
          {/* Today Summary */}
          <div className="card mb-4" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'white', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.8, marginBottom: 2 }}>
                  {isKidsMode ? '🙏 Sholat Hari Ini' : "Today's Prayer"}
                </div>
                <div style={{ fontSize: 32, fontWeight: 900 }}>
                  {prayersDoneToday}<span style={{ fontSize: 18, opacity: 0.7 }}>/5</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.8, marginBottom: 2 }}>🔥 Streak</div>
                <div style={{ fontSize: 32, fontWeight: 900 }}>{profile.streak}<span style={{ fontSize: 14, opacity: 0.7 }}> hari</span></div>
              </div>
            </div>
            <div style={{ height: 10, background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${prayerProgress}%`, background: 'rgba(255,255,255,0.85)', borderRadius: 'var(--radius-full)', transition: 'width 0.6s ease' }} />
            </div>
            {prayersDoneToday === 5 && (
              <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius)', padding: '6px 12px', textAlign: 'center', fontSize: 13, fontWeight: 800 }}>
                🎉 Alhamdulillah! Sholat 5 waktu lengkap hari ini!
              </div>
            )}
          </div>

          {/* Prayer Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PRAYER_NAMES.map((prayer) => {
              const isDone = tracker[prayer.key];
              return (
                <div
                  key={prayer.key}
                  className={`prayer-item ${isDone ? 'checked' : ''}`}
                  onClick={() => togglePrayer(prayer.key)}
                  role="checkbox"
                  aria-checked={isDone}
                >
                  <div className={`prayer-checkbox ${isDone ? 'checked' : ''}`}>
                    {isDone && <Check size={14} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 20 }}>{prayer.emoji}</span>
                      {isKidsMode ? prayer.labelKids : prayer.label}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600, marginTop: 1 }}>
                      {isDone ? '✅ Sudah sholat' : '⬜ Belum sholat'}
                    </div>
                  </div>
                  {isDone && (
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>+10 XP</span>
                      <span style={{ fontSize: 13 }}>⭐</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Streak Calendar & Stats */}
        <div>
          {/* Stats */}
          <div className="grid-2 mb-4">
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-value" style={{ color: '#DC2626' }}>{profile.streak}</div>
              <div className="stat-label">Streak Sekarang</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-value" style={{ color: 'var(--accent)' }}>{profile.longestStreak}</div>
              <div className="stat-label">Streak Terpanjang</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🙏</div>
              <div className="stat-value" style={{ color: 'var(--primary)' }}>{profile.totalPrayers}</div>
              <div className="stat-label">Total Sholat</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-value" style={{ color: '#7C3AED' }}>{isNaN(monthlyTotal) ? 0 : Math.min(100, monthlyTotal)}%</div>
              <div className="stat-label">Bulan Ini</div>
            </div>
          </div>

          {/* Streak Calendar */}
          <div className="card">
            <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              📅 {isKidsMode ? 'Kalender Sholatku' : 'Kalender Streak Sholat'}
            </div>
            <StreakCalendar weeks={8} />
          </div>

          {/* Motivation Banner */}
          <div className="card mt-4" style={{ background: 'linear-gradient(135deg, var(--accent-light), #FEF9EC)', border: '2px solid var(--accent)' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>💪</div>
            <div style={{ fontWeight: 900, color: 'var(--accent-dark)', fontSize: 14, marginBottom: 4 }}>
              {isKidsMode ? 'Kamu Hebat!' : 'Tetap Semangat!'}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.6 }}>
              {profile.streak >= 7
                ? `MasyaAllah! ${profile.streak} hari berturut-turut sholat! Luar biasa! 🏆`
                : profile.streak >= 3
                ? `Streak ${profile.streak} hari! Terus pertahankan ya! 🔥`
                : 'Mulailah hari ini! Sholat tepat waktu adalah kunci sukses dunia akhirat. 🌟'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
