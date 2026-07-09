import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRAYER_NAMES, SHOLAT_MOVEMENTS, ACHIEVEMENTS } from '../data/data';
import { BarChart2, Shield, TrendingUp, Award } from 'lucide-react';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function ParentDashboard() {
  const { isKidsMode, toggleMode, profile, tracker, streakHistory, prayersDoneToday } = useApp();

  // ==========================================
  // STATE & LOGIC UNTUK PARENTAL GATE (PIN)
  // ==========================================
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInputs, setPinInputs] = useState(['', '', '', '']);
  const [isPinError, setIsPinError] = useState(false);

  // PIN standar untuk verifikasi
  const CORRECT_PIN = '1234'; 

  // Interseptor tombol switch mode
  const handleModeSwitchClick = () => {
    if (isKidsMode) {
      // Jika berada di Mode Anak, kunci akses dengan Modal PIN
      setShowPinModal(true);
    } else {
      // Jika sudah di Mode Orang Tua, bebas kembali ke Mode Anak tanpa sandi
      toggleMode();
    }
  };

  // Mengatur input angka dan auto-focus ke depan
  const handlePinChange = (val, idx) => {
    if (isNaN(val)) return; // Blokir jika bukan angka
    
    const newInputs = [...pinInputs];
    newInputs[idx] = val;
    setPinInputs(newInputs);
    setIsPinError(false);

    // Otomatis focus pindah ke kotak kanan
    if (val !== '' && idx < 3) {
      const nextInput = document.getElementById(`pin-input-${idx + 1}`);
      nextInput?.focus();
    }
  };

  // Mengatur navigasi mundur saat menekan Backspace
  const handlePinKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && pinInputs[idx] === '' && idx > 0) {
      const prevInput = document.getElementById(`pin-input-${idx - 1}`);
      prevInput?.focus();
    }
  };

  // Submit form PIN
  const handlePinSubmit = (e) => {
    e.preventDefault();
    const joinedPin = pinInputs.join('');

    if (joinedPin === CORRECT_PIN) {
      toggleMode(); // Berhasil masuk ke Mode Orang Tua
      setShowPinModal(false);
      setPinInputs(['', '', '', '']);
    } else {
      setIsPinError(true); // Trigger status error
      setPinInputs(['', '', '', '']);
      const firstInput = document.getElementById('pin-input-0');
      firstInput?.focus(); // Balikkan fokus ke input pertama
    }
  };

  // Tutup modal secara paksa
  const handleCloseModal = () => {
    setShowPinModal(false);
    setPinInputs(['', '', '', '']);
    setIsPinError(false);
  };
  // ==========================================

  // Build weekly data
  const weeklyData = DAYS.map((day, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const isToday = i === 6;
    const entry = isToday
      ? { count: prayersDoneToday }
      : streakHistory.find((h) => h.date === dateStr);
    return { day, count: entry?.count ?? 0 };
  });

  const maxCount = Math.max(...weeklyData.map(d => d.count), 1);
  const weeklyAvg = weeklyData.reduce((a, b) => a + b.count, 0) / 7;

  const earnedBadgeList = ACHIEVEMENTS.filter(a => profile.earnedBadges.includes(a.id));
  const completedMovements = profile.completedMovements.length;
  const monthlyRate = Math.min(100, Math.round((profile.totalPrayers / (new Date().getDate() * 5)) * 100));

  return (
    <div className="animate-fadeInUp" style={{ position: 'relative' }}>
      
      {/* BUNGKUS UTAMA: Mengunci interaksi jika masih dalam Mode Anak (Read-Only)
      */}
      <div 
        style={{ 
          pointerEvents: isKidsMode ? 'none' : 'auto', 
          opacity: isKidsMode ? 0.95 : 1 
        }}
      >
        {/* Header Banner */}
        <div className="card mb-4" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563EB 100%)', color: 'white', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 40 }}>👨‍👩‍👧</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 2 }}>Parent Zone</div>
              <div style={{ fontSize: 12.5, opacity: 0.85, fontWeight: 600 }}>
                {isKidsMode ? `Pratinjau perkembangan sholat ${profile.name}` : `Pantau perkembangan sholat ${profile.name} di sini`}
              </div>
            </div>
            <button
              className="btn btn-sm"
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}
              onClick={handleModeSwitchClick}
            >
              {isKidsMode ? '🔒 Mode Orang Tua' : '🌟 Mode Anak'}
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid-4 mb-4">
          {[
            { icon: '🔥', val: profile.streak,      label: 'Streak Sekarang', color: '#DC2626',      sub: `Terpanjang: ${profile.longestStreak} hari` },
            { icon: '🙏', val: profile.totalPrayers, label: 'Total Sholat',    color: 'var(--primary)', sub: 'Sepanjang waktu' },
            { icon: '📊', val: `${isNaN(monthlyRate) ? 0 : monthlyRate}%`,     label: 'Konsistensi',   color: '#7C3AED',     sub: 'Bulan ini' },
            { icon: '🏅', val: earnedBadgeList.length, label: 'Badge Diraih',  color: 'var(--accent)',  sub: `dari ${ACHIEVEMENTS.length} badge` },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.val}</div>
              <div className="stat-label">{s.label}</div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 600, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ alignItems: 'start' }}>
          {/* Left Column */}
          <div>
            {/* Weekly Chart */}
            <div className="card mb-4">
              <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <BarChart2 size={16} style={{ color: 'var(--primary)' }} />
                Grafik Sholat 7 Hari Terakhir
              </div>
              <div style={{ display: 'flex', gap: 4, height: 140, alignItems: 'flex-end', padding: '0 4px' }}>
                {weeklyData.map((d, i) => {
                  const h = maxCount > 0 ? Math.round((d.count / maxCount) * 100) : 0;
                  const isToday = i === 6;
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{ fontSize: 9.5, fontWeight: 800, color: 'var(--text-muted)' }}>{d.count}</div>
                      <div style={{
                        width: '100%',
                        height: `${Math.max(h, 4)}%`,
                        background: isToday
                          ? 'linear-gradient(180deg, var(--accent) 0%, var(--accent-dark) 100%)'
                          : 'linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 100%)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.6s ease',
                        minHeight: 4,
                        boxShadow: isToday ? '0 -2px 6px rgba(245,166,35,0.4)' : '0 -2px 6px rgba(26,168,142,0.3)',
                      }} />
                      <div style={{ fontSize: 9.5, fontWeight: 700, color: isToday ? 'var(--accent-dark)' : 'var(--text-muted)' }}>{d.day}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)', padding: '0 4px' }}>
                <span>Rata-rata: {weeklyAvg.toFixed(1)} sholat/hari</span>
                <span>Maks: {maxCount}/5</span>
              </div>
            </div>

            {/* Today's Prayers */}
            <div className="card">
              <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 12 }}>
                📅 Sholat Hari Ini ({prayersDoneToday}/5)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PRAYER_NAMES.map((p) => (
                  <div key={p.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: tracker[p.key] ? 'var(--success-light)' : 'var(--bg)', border: `1px solid ${tracker[p.key] ? 'var(--success)' : 'var(--border)'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{p.emoji}</span>
                      <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--text-dark)' }}>{p.label}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: tracker[p.key] ? '#166534' : 'var(--text-muted)' }}>
                      {tracker[p.key] ? '✅ Sudah' : '⬜ Belum'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Learning Progress */}
            <div className="card mb-4">
              <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={16} style={{ color: 'var(--primary)' }} />
                Progress Pembelajaran
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Gerakan Sholat', val: completedMovements, max: SHOLAT_MOVEMENTS.length, color: 'var(--primary)' },
                  { label: 'Kuis Benar',     val: profile.quizCorrect, max: 20, color: '#EC4899' },
                  { label: 'Hari Streak',    val: profile.streak,       max: 30, color: '#DC2626' },
                  { label: 'Level',          val: profile.level,        max: 10, color: '#7C3AED' },
                ].map((item) => {
                  const pct = Math.min(100, Math.round((item.val / item.max) * 100));
                  return (
                    <div key={item.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                        <span>{item.label}</span>
                        <span style={{ color: item.color }}>{item.val}/{item.max}</span>
                      </div>
                      <div className="progress-track" style={{ height: 8 }}>
                        <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${item.color}99, ${item.color})` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Earned Badges */}
            <div className="card mb-4">
              <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Award size={16} style={{ color: 'var(--accent)' }} />
                Badge yang Diraih ({earnedBadgeList.length}/{ACHIEVEMENTS.length})
              </div>
              {earnedBadgeList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '16px 0', color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>
                  Belum ada badge yang diraih. Terus semangat! 💪
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {earnedBadgeList.map((b) => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--accent-light)', borderRadius: 'var(--radius-full)', padding: '5px 12px', border: '1.5px solid var(--accent)' }}>
                      <span style={{ fontSize: 16 }}>{b.emoji}</span>
                      <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--accent-dark)' }}>{b.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="card" style={{ background: 'var(--blue-light)', border: '1.5px solid #93C5FD' }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>📋</div>
              <div style={{ fontWeight: 900, color: '#1D4ED8', fontSize: 14, marginBottom: 8 }}>
                Rekomendasi untuk Orang Tua
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  prayersDoneToday < 5 && `Ingatkan ${profile.name} untuk ${5 - prayersDoneToday} sholat yang belum dilakukan hari ini.`,
                  profile.streak === 0 && 'Bantu anak memulai streak dengan sholat bersama hari ini!',
                  completedMovements < SHOLAT_MOVEMENTS.length && `${profile.name} masih perlu belajar ${SHOLAT_MOVEMENTS.length - completedMovements} gerakan lagi.`,
                  profile.quizCorrect < 5 && 'Ajak anak mengerjakan kuis bersama untuk meningkatkan pemahaman.',
                  '🌟 Berikan pujian setiap kali anak sholat tepat waktu!',
                ].filter(Boolean).slice(0, 4).map((tip, i) => (
                  <div key={i} style={{ fontSize: 12, color: '#1D4ED8', fontWeight: 600, display: 'flex', gap: 6 }}>
                    <span style={{ flexShrink: 0 }}>•</span> {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div> {/* <-- AKHIR BUNGKUS LOCK */}

      {/* ==========================================
          PORTAL POP-UP MODAL (PARENTAL GATE)
          ========================================== */}
      {showPinModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          {/* Modal ditaruh di luar bungkusan pointerEvents agar input text-nya tetap responsif */}
          <div className="card animate-fadeInUp" style={{ width: '100%', maxWidth: '340px', padding: '24px', textAlign: 'center', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔒</div>
            <div style={{ fontWeight: 900, fontSize: '16px', color: 'var(--text-dark)', marginBottom: '4px' }}>Khusus Orang Tua</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '20px' }}>
              Masukkan 4 digit PIN Anda untuk masuk ke Mode Orang Tua.
            </div>

            <form onSubmit={handlePinSubmit}>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '12px' }}>
                {pinInputs.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`pin-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(e.target.value, idx)}
                    onKeyDown={(e) => handlePinKeyDown(e, idx)}
                    autoFocus={idx === 0}
                    style={{
                      width: '46px',
                      height: '46px',
                      textAlign: 'center',
                      fontSize: '18px',
                      fontWeight: '800',
                      borderRadius: '10px',
                      border: `2px solid ${isPinError ? '#DC2626' : 'var(--border)'}`,
                      background: isPinError ? '#FEF2F2' : 'var(--bg)',
                      outline: 'none',
                      color: 'var(--text-dark)',
                      transition: 'border-color 0.2s'
                    }}
                  />
                ))}
              </div>

              {isPinError && (
                <div style={{ color: '#DC2626', fontSize: '11px', fontWeight: '700', marginBottom: '16px', marginTop: '6px' }}>
                  ❌ PIN salah! Silakan coba lagi.
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-sm"
                  style={{ flex: 1, background: '#E2E8F0', color: '#475569', border: 'none', fontWeight: 700, padding: '10px' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn-sm"
                  style={{ flex: 1, background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 700, padding: '10px' }}
                >
                  Verifikasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}