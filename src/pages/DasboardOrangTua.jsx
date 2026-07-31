import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRAYER_NAMES, SHOLAT_MOVEMENTS, ACHIEVEMENTS } from '../data/Data';
import { BarChart2, Shield, TrendingUp, Award, Gift, Target, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function ParentDashboard({ section = 'overview' }) {
  const { 
    isKidsMode, 
    toggleMode, 
    profile, 
    tracker, 
    streakHistory, 
    prayersDoneToday,
    parentTarget,
    setParentTarget,
    prayerPunctuality
  } = useApp();

  // ==========================================
  // STATE & LOGIC UNTUK PARENTAL GATE (PIN)
  // ==========================================
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInputs, setPinInputs] = useState(['', '', '', '']);
  const [isPinError, setIsPinError] = useState(false);

  // Form input targets
  const [targetInput, setTargetInput] = useState(parentTarget.targetCount);
  const [rewardInput, setRewardInput] = useState(parentTarget.reward);
  const [isSaved, setIsSaved] = useState(false);

  const CORRECT_PIN = '1234'; 

  const handleModeSwitchClick = () => {
    if (isKidsMode) {
      setShowPinModal(true);
    } else {
      toggleMode();
    }
  };

  const handlePinChange = (val, idx) => {
    if (isNaN(val)) return;
    const newInputs = [...pinInputs];
    newInputs[idx] = val;
    setPinInputs(newInputs);
    setIsPinError(false);

    if (val !== '' && idx < 3) {
      const nextInput = document.getElementById(`pin-input-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handlePinKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && pinInputs[idx] === '' && idx > 0) {
      const prevInput = document.getElementById(`pin-input-${idx - 1}`);
      prevInput?.focus();
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const joinedPin = pinInputs.join('');

    if (joinedPin === CORRECT_PIN) {
      toggleMode();
      setShowPinModal(false);
      setPinInputs(['', '', '', '']);
    } else {
      setIsPinError(true);
      setPinInputs(['', '', '', '']);
      const firstInput = document.getElementById('pin-input-0');
      firstInput?.focus();
    }
  };

  const handleCloseModal = () => {
    setShowPinModal(false);
    setPinInputs(['', '', '', '']);
    setIsPinError(false);
  };

  // ==========================================
  // KALKULASI LAPORAN 30 HARI TERAKHIR
  // ==========================================
  const today = new Date();
  const past30Days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    past30Days.push(d.toISOString().split('T')[0]);
  }

  let totalPrayers30Days = 0;
  let onTimeCount = 0;
  let lateCount = 0;

  const historyList = past30Days.map(dateStr => {
    const isToday = dateStr === today.toISOString().split('T')[0];
    const entry = isToday
      ? { count: prayersDoneToday }
      : streakHistory.find(h => h.date === dateStr);
    
    const count = entry?.count ?? 0;
    totalPrayers30Days += count;

    const dayDetails = prayerPunctuality[dateStr] || {};
    Object.values(dayDetails).forEach(status => {
      if (status === 'tepat') onTimeCount++;
      if (status === 'terlambat') lateCount++;
    });

    const missed = Math.max(0, 5 - count);

    return {
      date: dateStr,
      count,
      onTime: Object.values(dayDetails).filter(s => s === 'tepat').length,
      late: Object.values(dayDetails).filter(s => s === 'terlambat').length,
      missed
    };
  }).reverse();

  const totalPossiblePrayers = 30 * 5; 
  const missedPrayers30Days = Math.max(0, totalPossiblePrayers - totalPrayers30Days);

  const onTimePercentage = totalPrayers30Days > 0 ? Math.round((onTimeCount / totalPrayers30Days) * 100) : 0;
  const latePercentage = totalPrayers30Days > 0 ? Math.round((lateCount / totalPrayers30Days) * 100) : 0;

  const targetAchieved = totalPrayers30Days >= parentTarget.targetCount;

  const handleSaveTarget = (e) => {
    e.preventDefault();
    setParentTarget({
      targetCount: Number(targetInput),
      reward: rewardInput,
      isClaimed: parentTarget.isClaimed
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleClaimReward = () => {
    setParentTarget({ ...parentTarget, isClaimed: true });
  };

  const handleResetReward = () => {
    setParentTarget({
      targetCount: 120,
      reward: 'Mainan LEGO Baru 🧱',
      isClaimed: false
    });
    setTargetInput(120);
    setRewardInput('Mainan LEGO Baru 🧱');
  };

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

  const formatIndoDate = (dateStr) => {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    return new Date(dateStr).toLocaleDateString('id-ID', options);
  };

  // Gaya Kartu Standar Khas Neo-Brutalisme
  const neobrutalistCardStyle = {
    background: '#FFFFFF',
    border: '4px solid #113C2B',
    boxShadow: '4px 4px 0px #113C2B',
    borderRadius: '24px',
    padding: '24px',
    boxSizing: 'border-box'
  };

  return (
    <div className="animate-fadeInUp" style={{ position: 'relative', color: '#113C2B' }}>
      
      {/* BUNGKUS LOCK */}
      <div style={{ pointerEvents: isKidsMode ? 'none' : 'auto', opacity: isKidsMode ? 0.95 : 1 }}>
        
        {/* Header Banner */}
        <div style={{ 
          background: '#D4DDD3', 
          color: '#113C2B', 
          border: '4px solid #113C2B', 
          boxShadow: '6px 6px 0px #113C2B', 
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 40 }}>👨‍👩‍👧</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 2, letterSpacing: '-0.5px' }}>Parent Zone Dashboard</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#556B52' }}>
                  {isKidsMode ? `Pratinjau perkembangan sholat ${profile.name}` : `Pantau perkembangan sholat ${profile.name} di sini`}
                </div>
              </div>
            </div>
            <button
              style={{ 
                backgroundColor: '#113C2B', 
                color: '#FFFFFF', 
                fontWeight: 900,
                border: '3px solid #113C2B',
                boxShadow: '3px 3px 0px rgba(0,0,0,0.2)',
                borderRadius: '14px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'transform 0.1s'
              }}
              onClick={handleModeSwitchClick}
              onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'none'}
            >
              {isKidsMode ? '🔒 Masuk Mode Orang Tua' : '🌟 Kembali ke Mode Anak'}
            </button>
          </div>
        </div>

        {/* ─── DYNAMIC CONTENT AREA BASED ON SECTION PROP ─── */}
        
        {section === 'overview' && (
          <div>
            {/* Overview Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              {[
                { icon: '🔥', val: profile.streak, label: 'Streak Sekarang', color: '#113C2B', sub: `Terpanjang: ${profile.longestStreak} hari`, bg: '#F8FAF8' },
                { icon: '🙏', val: profile.totalPrayers, label: 'Total Sholat', color: '#113C2B', sub: 'Sepanjang waktu', bg: '#D4DDD3' },
                { icon: '📊', val: `${onTimePercentage}%`, label: 'Ketepatan Waktu', color: '#113C2B', sub: 'Bulan ini', bg: '#F8FAF8' },
                { icon: '🏅', val: earnedBadgeList.length, label: 'Badge Diraih', color: '#113C2B', sub: `dari ${ACHIEVEMENTS.length} lencana`, bg: '#D4DDD3' },
              ].map((s, idx) => (
                <div key={idx} style={{ ...neobrutalistCardStyle, backgroundColor: s.bg, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '32px' }}>{s.icon}</div>
                  <div style={{ fontSize: '36px', fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: '15px', fontWeight: 900 }}>{s.label}</div>
                  <div style={{ fontSize: '12px', color: '#556B52', fontWeight: 700 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', alignItems: 'start', gap: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* Weekly Chart */}
                <div style={neobrutalistCardStyle}>
                  <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <BarChart2 size={18} style={{ color: '#113C2B' }} />
                    Grafik Sholat 7 Hari Terakhir
                  </div>
                  <div style={{ display: 'flex', gap: 12, height: 160, alignItems: 'flex-end', padding: '0 8px', marginBottom: '16px' }}>
                    {weeklyData.map((d, i) => {
                      const h = maxCount > 0 ? Math.round((d.count / maxCount) * 100) : 0;
                      const isToday = i === 6;
                      return (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                          <div style={{ fontSize: '11px', fontWeight: 900 }}>{d.count}</div>
                          <div style={{
                            width: '100%',
                            height: `${Math.max(h, 6)}%`,
                            backgroundColor: isToday ? '#113C2B' : '#B8C6B6',
                            border: '3px solid #113C2B',
                            boxShadow: '2px 2px 0px #113C2B',
                            borderRadius: '6px 6px 0 0',
                            minHeight: 8,
                          }} />
                          <div style={{ fontSize: '11px', fontWeight: 800, color: isToday ? '#113C2B' : '#556B52' }}>{d.day}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800, color: '#556B52', borderTop: '2px dashed #113C2B', paddingTop: '12px' }}>
                    <span>Rata-rata: {weeklyAvg.toFixed(1)} sholat/hari</span>
                    <span>Maks: {maxCount}/5</span>
                  </div>
                </div>

                {/* Today's Prayers Check kehadiran */}
                <div style={neobrutalistCardStyle}>
                  <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 16 }}>
                    📅 Kehadiran Sholat Hari Ini ({prayersDoneToday}/5)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {PRAYER_NAMES.map((p) => (
                      <div key={p.key} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        padding: '12px 16px', 
                        borderRadius: '14px', 
                        background: tracker[p.key] ? '#D4DDD3' : '#F8FAF8', 
                        border: '3px solid #113C2B', 
                        boxShadow: tracker[p.key] ? '2px 2px 0px #113C2B' : 'none' 
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '18px' }}>{p.emoji}</span>
                          <span style={{ fontWeight: 900, fontSize: '14px' }}>{p.label}</span>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 900, color: tracker[p.key] ? '#113C2B' : '#556B52' }}>
                          {tracker[p.key] ? '✅ Sudah Absen' : '⬜ Belum Absen'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* Learning Progress Bars */}
                <div style={neobrutalistCardStyle}>
                  <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TrendingUp size={18} style={{ color: '#113C2B' }} />
                    Progress Pembelajaran Gerakan & Kuis
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { label: 'Gerakan Sholat', val: completedMovements, max: SHOLAT_MOVEMENTS.length },
                      { label: 'Kuis Benar', val: profile.quizCorrect, max: 10 },
                      { label: 'Hari Streak', val: profile.streak, max: 7 },
                      { label: 'Level Belajar', val: profile.level, max: 5 },
                    ].map((item, idx) => {
                      const pct = Math.min(100, Math.round((item.val / item.max) * 100));
                      return (
                        <div key={idx}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800, marginBottom: 6 }}>
                            <span>{item.label}</span>
                            <span style={{ color: '#113C2B', fontWeight: 900 }}>{item.val}/{item.max}</span>
                          </div>
                          <div style={{ height: '24px', backgroundColor: '#F8FAF8', borderRadius: '12px', border: '3px solid #113C2B', padding: '2px', boxSizing: 'border-box', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, backgroundColor: '#113C2B', borderRadius: '6px', borderRight: pct > 0 ? '2px solid #113C2B' : 'none' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Badges List */}
                <div style={neobrutalistCardStyle}>
                  <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Award size={18} style={{ color: '#113C2B' }} />
                    Badge yang Diraih ({earnedBadgeList.length}/{ACHIEVEMENTS.length})
                  </div>
                  {earnedBadgeList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '16px 0', color: '#556B52', fontSize: 13, fontWeight: 800 }}>
                      Belum ada lencana yang diraih. Terus semangat belajar sholat! 💪
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {earnedBadgeList.map((b) => (
                        <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#D4DDD3', borderRadius: '99px', padding: '6px 14px', border: '3px solid #113C2B', boxShadow: '2px 2px 0px #113C2B' }}>
                          <span style={{ fontSize: 16 }}>{b.emoji}</span>
                          <span style={{ fontSize: '12px', fontWeight: 900 }}>{b.nameKids}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {section === 'punctuality' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', alignItems: 'start' }}>
            {/* Laporan Kiri: Ringkasan Tepat Waktu */}
            <div style={{ ...neobrutalistCardStyle, backgroundColor: '#D4DDD3' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Clock size={24} style={{ color: '#113C2B' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 900, margin: 0 }}>
                  Analisis Ketepatan Waktu Sholat (30 Hari Terakhir)
                </h3>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <div style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1 }}>{onTimePercentage}%</div>
                  <div style={{ fontSize: '13px', fontWeight: 900, marginTop: '6px' }}>Sholat Tepat Waktu</div>
                </div>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <div style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1, opacity: 0.8 }}>{latePercentage}%</div>
                  <div style={{ fontSize: '13px', fontWeight: 900, marginTop: '6px', opacity: 0.8 }}>Sholat Terlambat</div>
                </div>
              </div>

              <div style={{ borderTop: '2px dashed #113C2B', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 8px' }}>Rincian Frekuensi Sholat:</h4>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', fontWeight: 700, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Tepat Waktu: {onTimeCount} kali sholat</li>
                  <li>Terlambat / Masbuq: {lateCount} kali sholat</li>
                  <li>Total Sholat Terabsen: {totalPrayers30Days} kali</li>
                </ul>
              </div>
            </div>

            {/* List Detail Harian Tepat Waktu */}
            <div style={{ ...neobrutalistCardStyle, maxHeight: '500px', overflowY: 'auto' }}>
              <div style={{ fontWeight: 900, fontSize: '16px', marginBottom: '16px', borderBottom: '3px solid #113C2B', paddingBottom: '8px', sticky: 'top', background: '#fff' }}>
                📋 Riwayat Harian Ketepatan Waktu
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {historyList.map(h => (
                  <div key={h.date} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '14px', border: '2.5px solid #113C2B', background: '#F8FAF8' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 900 }}>{formatIndoDate(h.date)}</div>
                      <div style={{ fontSize: '11px', color: '#556B52', fontWeight: 700, marginTop: '2px' }}>
                        Sholat Dikerjakan: {h.count} / 5 waktu
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, backgroundColor: '#D4DDD3', border: '1.5px solid #113C2B', padding: '2px 8px', borderRadius: '6px' }}>
                        {h.onTime} Tepat
                      </span>
                      {h.late > 0 && (
                        <span style={{ fontSize: '11px', fontWeight: 900, backgroundColor: '#F8FAF8', border: '1.5px solid #113C2B', padding: '2px 8px', borderRadius: '6px', opacity: 0.7 }}>
                          {h.late} Lambat
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {section === 'missed' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', alignItems: 'start' }}>
            {/* Laporan Kiri: Ringkasan Bolong */}
            <div style={{ ...neobrutalistCardStyle, backgroundColor: '#F8FAF8', borderColor: '#113C2B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <AlertTriangle size={24} style={{ color: '#113C2B' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 900, margin: 0 }}>
                  Log Kehadiran & Sholat Bolong (30 Hari)
                </h3>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '44px', fontWeight: 900, lineHeight: 1 }}>
                  {missedPrayers30Days} Kali Terlewat
                </div>
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#556B52', marginTop: '6px', lineHeight: 1.4 }}>
                  Dari target ideal sebanyak <strong>{totalPossiblePrayers} sholat</strong> dalam 1 bulan (30 hari x 5 waktu).
                </p>
              </div>

              <div style={{ borderTop: '2px dashed #113C2B', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 900, margin: '0 0 8px' }}>Statistik Kehadiran:</h4>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', fontWeight: 700, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Sholat Selesai: {totalPrayers30Days} waktu</li>
                  <li>Sholat Terlewat: {missedPrayers30Days} waktu</li>
                  <li>Tingkat Kepatuhan: {Math.round((totalPrayers30Days / totalPossiblePrayers) * 100)}%</li>
                </ul>
              </div>
            </div>

            {/* List Detail Harian Bolong */}
            <div style={{ ...neobrutalistCardStyle, maxHeight: '500px', overflowY: 'auto' }}>
              <div style={{ fontWeight: 900, fontSize: '16px', marginBottom: '16px', borderBottom: '3px solid #113C2B', paddingBottom: '8px' }}>
                ⚠️ Rincian Sholat Terlewat Harian
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {historyList.map(h => (
                  <div key={h.date} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '14px', border: '2.5px solid #113C2B', background: h.missed > 0 ? '#FFFFFF' : '#D4DDD3' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 900 }}>{formatIndoDate(h.date)}</div>
                      <div style={{ fontSize: '11px', color: '#556B52', fontWeight: 700, marginTop: '2px' }}>
                        Sholat Berhasil: {h.count} / 5 waktu
                      </div>
                    </div>
                    <div>
                      {h.missed > 0 ? (
                        <span style={{ fontSize: '11px', fontWeight: 900, backgroundColor: '#F8FAF8', border: '1.5px solid #113C2B', padding: '2px 8px', borderRadius: '6px' }}>
                          ⚠️ {h.missed} Bolong
                        </span>
                      ) : (
                        <span style={{ fontSize: '11px', fontWeight: 900, backgroundColor: '#113C2B', color: '#FFF', border: '1.5px solid #113C2B', padding: '2px 8px', borderRadius: '6px' }}>
                          Lengkap ✅
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {section === 'target' && (
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ ...neobrutalistCardStyle, background: '#F8FAF8' }}>
              <div style={{ fontWeight: 900, fontSize: '18px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gift size={24} style={{ color: '#113C2B' }} />
                Pengaturan Target & Misi Reward Anak
              </div>

              <form onSubmit={handleSaveTarget} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 900, display: 'block', marginBottom: '8px' }}>
                    Target Minimal Sholat Bulanan:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="number" 
                      min="1" 
                      max="150"
                      value={targetInput} 
                      onChange={(e) => setTargetInput(e.target.value)} 
                      style={{ padding: '10px 12px', fontSize: '16px', borderRadius: '10px', border: '3.5px solid #113C2B', width: '90px', fontWeight: 900, textAlign: 'center', outline: 'none' }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#556B52' }}>
                      sholat (dari total ideal 150 kali sebulan)
                    </span>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '14px', fontWeight: 900, display: 'block', marginBottom: '8px' }}>
                    Hadiah / Reward yang Dijanjikan:
                  </label>
                  <input 
                    type="text" 
                    value={rewardInput} 
                    onChange={(e) => setRewardInput(e.target.value)} 
                    placeholder="Contoh: Sepeda Baru 🚲"
                    style={{ padding: '12px 14px', fontSize: '14px', borderRadius: '10px', border: '3.5px solid #113C2B', width: '100%', boxSizing: 'border-box', fontWeight: 800, outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  <button 
                    type="submit" 
                    style={{
                      flex: 1, 
                      padding: '14px',
                      backgroundColor: '#113C2B',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      border: '3px solid #113C2B',
                      boxShadow: '3px 3px 0px rgba(0,0,0,0.15)',
                      fontWeight: 900,
                      cursor: 'pointer'
                    }}
                  >
                    Simpan Target & Reward
                  </button>
                  {parentTarget.isClaimed && (
                    <button 
                      type="button" 
                      onClick={handleResetReward} 
                      style={{ 
                        padding: '14px 20px',
                        backgroundColor: '#D4DDD3',
                        color: '#113C2B',
                        borderRadius: '12px',
                        border: '3px solid #113C2B',
                        boxShadow: '3px 3px 0px rgba(0,0,0,0.15)',
                        fontWeight: 900,
                        cursor: 'pointer'
                      }}
                    >
                      Reset Target Baru
                    </button>
                  )}
                </div>

                {isSaved && (
                  <div style={{ color: '#113C2B', fontSize: '13px', fontWeight: 800, border: '2px dashed #113C2B', padding: '8px 12px', borderRadius: '8px', background: '#D4DDD3' }}>
                    ✅ Target dan Hadiah berhasil disimpan dan ditampilkan ke dashboard anak!
                  </div>
                )}
              </form>

              {/* Status target saat ini */}
              <div style={{ marginTop: '28px', padding: '18px', borderRadius: '18px', border: '3px solid #113C2B', backgroundColor: '#FFFFFF', boxShadow: '4px 4px 0px #113C2B' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 900 }}>Progres Anak Saat Ini:</span>
                  <span style={{ fontSize: '14px', fontWeight: 900 }}>
                    {totalPrayers30Days} / {parentTarget.targetCount} Sholat
                  </span>
                </div>
                <div style={{ height: '24px', backgroundColor: '#F8FAF8', borderRadius: '12px', overflow: 'hidden', border: '3px solid #113C2B', padding: '2px', boxSizing: 'border-box' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${Math.min(100, Math.round((totalPrayers30Days / parentTarget.targetCount) * 100))}%`, 
                    backgroundColor: '#113C2B',
                    borderRadius: '8px'
                  }} />
                </div>

                <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900 }}>
                    Status Misi: {parentTarget.isClaimed 
                      ? '🎁 Hadiah Sudah Diserahkan!' 
                      : targetAchieved 
                        ? '🎉 Target Tercapai! Anak Anda layak mendapat hadiah!' 
                        : '⏳ Sedang Berjuang'}
                  </div>

                  {targetAchieved && !parentTarget.isClaimed && (
                    <button 
                      onClick={handleClaimReward}
                      style={{ 
                        padding: '8px 16px', 
                        fontSize: '13px',
                        backgroundColor: '#D4DDD3',
                        color: '#113C2B',
                        border: '2.5px solid #113C2B',
                        borderRadius: '8px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: '2px 2px 0px #113C2B'
                      }}
                    >
                      Beri Hadiah 🎁
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Parental Gate PIN Modal */}
      {showPinModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(17, 60, 43, 0.4)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div className="card animate-fadeInUp" style={{ ...neobrutalistCardStyle, width: '100%', maxWidth: '380px', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔒</div>
            <div style={{ fontWeight: 900, fontSize: '22px', marginBottom: '8px', letterSpacing: '-0.5px' }}>Khusus Orang Tua</div>
            <div style={{ fontSize: '14px', color: '#556B52', fontWeight: 700, marginBottom: '24px', lineHeight: 1.4 }}>
              Masukkan 4 digit PIN Ma/Pa untuk mengakses dashboard perkembangan ibadah anak.
            </div>

            <form onSubmit={handlePinSubmit}>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
                {pinInputs.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`pin-input-${idx}`}
                    type="password"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(e.target.value, idx)}
                    onKeyDown={(e) => handlePinKeyDown(e, idx)}
                    autoFocus={idx === 0}
                    style={{
                      width: '52px',
                      height: '52px',
                      textAlign: 'center',
                      fontSize: '24px',
                      fontWeight: '900',
                      borderRadius: '14px',
                      border: '3.5px solid #113C2B',
                      background: isPinError ? '#FFFFFF' : '#F8FAF8',
                      outline: 'none',
                      color: '#113C2B',
                      boxShadow: '3px 3px 0px #113C2B',
                      transition: 'all 0.1s ease'
                    }}
                  />
                ))}
              </div>

              {isPinError && (
                <div style={{ color: '#113C2B', fontSize: '13px', fontWeight: '900', marginBottom: '16px', marginTop: '10px', border: '2px dashed #113C2B', padding: '6px', borderRadius: '8px' }}>
                  ❌ PIN salah! Silakan coba lagi.
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ 
                    flex: 1, 
                    backgroundColor: '#F8FAF8', 
                    color: '#113C2B',
                    padding: '12px',
                    border: '3px solid #113C2B',
                    borderRadius: '12px',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{ 
                    flex: 1, 
                    backgroundColor: '#113C2B', 
                    color: '#FFFFFF',
                    padding: '12px',
                    border: '3px solid #113C2B',
                    borderRadius: '12px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.15)'
                  }}
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