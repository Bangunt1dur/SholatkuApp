import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRAYER_NAMES, SHOLAT_MOVEMENTS, ACHIEVEMENTS } from '../data/Data';
import { BarChart2, TrendingUp, Award, Gift, AlertTriangle, Clock } from 'lucide-react';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function ParentDashboard({ section = 'overview', setActivePage }) {
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
      if (setActivePage) {
        setActivePage('home');
      }
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
      if (setActivePage) {
        setActivePage('parent-dashboard');
      }
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

  // Image 2 Inspired Premium Minimalist Styles
  const minCardStyle = {
    background: '#FFFFFF',
    border: '1px solid rgba(99, 102, 241, 0.12)',
    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.02)',
    borderRadius: '20px',
    padding: '24px',
    boxSizing: 'border-box'
  };

  const minInnerCardStyle = {
    background: '#F9FAFB',
    border: '1px solid rgba(0, 0, 0, 0.04)',
    borderRadius: '14px',
    padding: '16px',
    boxSizing: 'border-box'
  };

  return (
    <div className="animate-fadeInUp" style={{ position: 'relative', color: '#1F2937' }}>
      
      {/* BUNGKUS LOCK */}
      <div style={{ pointerEvents: isKidsMode ? 'none' : 'auto', opacity: isKidsMode ? 0.95 : 1 }}>
        
        {/* Header Banner - Image 2 Gradient Style */}
        <div style={{ 
          background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', 
          color: '#1F2937', 
          border: '1px solid rgba(99, 102, 241, 0.15)', 
          boxShadow: '0 4px 24px rgba(99, 102, 241, 0.04)', 
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 40 }}>👨‍👩‍👧</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 2, letterSpacing: '-0.5px', color: '#1F2937' }}>Parent Zone Dashboard</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#4B5563' }}>
                  {isKidsMode ? `Pratinjau perkembangan sholat ${profile.name}` : `Pantau perkembangan sholat ${profile.name} di sini`}
                </div>
              </div>
            </div>
            <button
              style={{ 
                backgroundColor: '#4F46E5', 
                color: '#FFFFFF', 
                fontWeight: 700,
                border: 'none',
                borderRadius: '12px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.2s',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
              }}
              onClick={handleModeSwitchClick}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4338CA'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4F46E5'}
            >
              {isKidsMode ? '🔒 Masuk Mode Orang Tua' : '🌟 Buka Mode Anak-anak'}
            </button>
          </div>
        </div>

        {/* ─── DYNAMIC CONTENT AREA BASED ON SECTION PROP ─── */}
        
        {section === 'overview' && (
          <div>
            {/* Overview Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              {[
                { icon: '🔥', val: profile.streak, label: 'Streak Sekarang', color: '#4F46E5', sub: `Terpanjang: ${profile.longestStreak} hari`, bg: '#FFFFFF' },
                { icon: '🙏', val: profile.totalPrayers, label: 'Total Sholat', color: '#10B981', sub: 'Sepanjang waktu', bg: '#FFFFFF' },
                { icon: '📊', val: `${onTimePercentage}%`, label: 'Ketepatan Waktu', color: '#3B82F6', sub: 'Bulan ini', bg: '#FFFFFF' },
                { icon: '🏅', val: earnedBadgeList.length, label: 'Badge Diraih', color: '#F59E0B', sub: `dari ${ACHIEVEMENTS.length} lencana`, bg: '#FFFFFF' },
              ].map((s, idx) => (
                <div key={idx} style={{ ...minCardStyle, backgroundColor: s.bg, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '4px' }}>{s.icon}</div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937' }}>{s.label}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', alignItems: 'start', gap: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                
                {/* Weekly Chart */}
                <div style={minCardStyle}>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, color: '#1F2937' }}>
                    <BarChart2 size={18} style={{ color: '#4F46E5' }} />
                    Grafik Sholat 7 Hari Terakhir
                  </div>
                  <div style={{ display: 'flex', gap: 12, height: 160, alignItems: 'flex-end', padding: '0 8px', marginBottom: '16px' }}>
                    {weeklyData.map((d, i) => {
                      const h = maxCount > 0 ? Math.round((d.count / maxCount) * 100) : 0;
                      const isToday = i === 6;
                      return (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#4B5563' }}>{d.count}</div>
                          <div style={{
                            width: '100%',
                            height: `${Math.max(h, 6)}%`,
                            backgroundColor: isToday ? '#4F46E5' : '#C7D2FE',
                            borderRadius: '6px 6px 0 0',
                            minHeight: 8,
                            boxShadow: isToday ? '0 4px 12px rgba(79, 70, 229, 0.2)' : 'none'
                          }} />
                          <div style={{ fontSize: '11px', fontWeight: 700, color: isToday ? '#4F46E5' : '#6B7280' }}>{d.day}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: '#6B7280', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px' }}>
                    <span>Rata-rata: {weeklyAvg.toFixed(1)} sholat/hari</span>
                    <span>Maks: {maxCount}/5</span>
                  </div>
                </div>

                {/* Today's Prayers Attendance */}
                <div style={minCardStyle}>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16, color: '#1F2937' }}>
                    📅 Kehadiran Sholat Hari Ini ({prayersDoneToday}/5)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {PRAYER_NAMES.map((p) => (
                      <div key={p.key} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        padding: '12px 16px', 
                        borderRadius: '12px', 
                        background: tracker[p.key] ? '#ECFDF5' : '#F9FAFB', 
                        border: tracker[p.key] ? '1px solid rgba(16, 185, 129, 0.15)' : '1px solid rgba(0, 0, 0, 0.04)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '18px' }}>{p.emoji}</span>
                          <span style={{ fontWeight: 700, fontSize: '14px', color: '#1F2937' }}>{p.label}</span>
                        </div>
                        <span style={{ 
                          fontSize: '12px', 
                          fontWeight: 800, 
                          color: tracker[p.key] ? '#10B981' : '#6B7280',
                          backgroundColor: tracker[p.key] ? '#D1FAE5' : '#F3F4F6',
                          padding: '3px 10px',
                          borderRadius: '20px'
                        }}>
                          {tracker[p.key] ? 'Absen ✅' : 'Belum ⬜'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                
                {/* Learning Progress Bars */}
                <div style={minCardStyle}>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, color: '#1F2937' }}>
                    <TrendingUp size={18} style={{ color: '#4F46E5' }} />
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
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: 6, color: '#4B5563' }}>
                            <span>{item.label}</span>
                            <span style={{ color: '#1F2937', fontWeight: 800 }}>{item.val}/{item.max}</span>
                          </div>
                          <div style={{ height: '8px', backgroundColor: '#F3F4F6', borderRadius: '99px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, backgroundColor: '#4F46E5', borderRadius: '99px' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Badges List */}
                <div style={minCardStyle}>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, color: '#1F2937' }}>
                    <Award size={18} style={{ color: '#4F46E5' }} />
                    Badge yang Diraih ({earnedBadgeList.length}/{ACHIEVEMENTS.length})
                  </div>
                  {earnedBadgeList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '16px 0', color: '#6B7280', fontSize: 13, fontWeight: 700 }}>
                      Belum ada lencana yang diraih. Terus semangat belajar sholat! 💪
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {earnedBadgeList.map((b) => (
                        <div key={b.id} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 6, 
                          background: '#EEF2FF', 
                          borderRadius: '99px', 
                          padding: '6px 14px', 
                          border: '1px solid rgba(99, 102, 241, 0.15)'
                        }}>
                          <span style={{ fontSize: 16 }}>{b.emoji}</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#4F46E5' }}>{b.nameKids}</span>
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
            
            {/* Ringkasan Tepat Waktu */}
            <div style={{ ...minCardStyle, background: 'linear-gradient(135deg, #F5F3FF 0%, #EEF2FF 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Clock size={24} style={{ color: '#4F46E5' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#1F2937' }}>
                  Analisis Ketepatan Waktu Sholat (30 Hari Terakhir)
                </h3>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <div style={{ fontSize: '48px', fontWeight: 800, color: '#4F46E5', lineHeight: 1 }}>{onTimePercentage}%</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '6px', color: '#4B5563' }}>Sholat Tepat Waktu</div>
                </div>
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <div style={{ fontSize: '48px', fontWeight: 800, color: '#9CA3AF', lineHeight: 1, opacity: 0.8 }}>{latePercentage}%</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '6px', color: '#6B7280', opacity: 0.8 }}>Sholat Terlambat</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(99, 102, 241, 0.15)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 8px', color: '#1F2937' }}>Rincian Frekuensi Sholat:</h4>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', fontWeight: 700, color: '#4B5563', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Tepat Waktu: {onTimeCount} kali sholat</li>
                  <li>Terlambat / Masbuq: {lateCount} kali sholat</li>
                  <li>Total Sholat Terabsen: {totalPrayers30Days} kali</li>
                </ul>
              </div>
            </div>

            {/* List Detail Harian Tepat Waktu */}
            <div style={{ ...minCardStyle, maxHeight: '500px', overflowY: 'auto' }}>
              <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '8px', position: 'sticky', top: 0, background: '#fff', zIndex: 2 }}>
                📋 Riwayat Harian Ketepatan Waktu
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {historyList.map(h => (
                  <div key={h.date} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)', background: '#F9FAFB' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#1F2937' }}>{formatIndoDate(h.date)}</div>
                      <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 700, marginTop: '2px' }}>
                        Sholat Dikerjakan: {h.count} / 5 waktu
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '20px' }}>
                        {h.onTime} Tepat
                      </span>
                      {h.late > 0 && (
                        <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '20px', opacity: 0.8 }}>
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
            
            {/* Ringkasan Bolong */}
            <div style={{ ...minCardStyle, backgroundColor: '#FFF5F5', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <AlertTriangle size={24} style={{ color: '#EF4444' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#991B1B' }}>
                  Log Kehadiran & Sholat Terlewat (30 Hari)
                </h3>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '44px', fontWeight: 800, color: '#B91C1C', lineHeight: 1 }}>
                  {missedPrayers30Days} Kali Terlewat
                </div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#7F1D1D', marginTop: '6px', lineHeight: 1.4 }}>
                  Dari target ideal sebanyak <strong>{totalPossiblePrayers} sholat</strong> dalam 1 bulan (30 hari x 5 waktu).
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(239, 68, 68, 0.15)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 8px', color: '#991B1B' }}>Statistik Kehadiran:</h4>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', fontWeight: 700, color: '#7F1D1D', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Sholat Selesai: {totalPrayers30Days} waktu</li>
                  <li>Sholat Terlewat: {missedPrayers30Days} waktu</li>
                  <li>Tingkat Kepatuhan: {Math.round((totalPrayers30Days / totalPossiblePrayers) * 100)}%</li>
                </ul>
              </div>
            </div>

            {/* List Detail Harian Bolong */}
            <div style={{ ...minCardStyle, maxHeight: '500px', overflowY: 'auto' }}>
              <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '8px' }}>
                ⚠️ Rincian Sholat Terlewat Harian
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {historyList.map(h => (
                  <div key={h.date} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)', background: h.missed > 0 ? '#FFFFFF' : '#ECFDF5' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#1F2937' }}>{formatIndoDate(h.date)}</div>
                      <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 700, marginTop: '2px' }}>
                        Sholat Berhasil: {h.count} / 5 waktu
                      </div>
                    </div>
                    <div>
                      {h.missed > 0 ? (
                        <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: '20px' }}>
                          ⚠️ {h.missed} Terlewat
                        </span>
                      ) : (
                        <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: '20px' }}>
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
            <div style={minCardStyle}>
              <div style={{ fontWeight: 800, fontSize: '18px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1F2937' }}>
                <Gift size={24} style={{ color: '#4F46E5' }} />
                Pengaturan Target & Misi Reward Anak
              </div>

              <form onSubmit={handleSaveTarget} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 800, display: 'block', marginBottom: '8px', color: '#4B5563' }}>
                    Target Minimal Sholat Bulanan:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="number" 
                      min="1" 
                      max="150"
                      value={targetInput} 
                      onChange={(e) => setTargetInput(e.target.value)} 
                      style={{ 
                        padding: '10px 12px', 
                        fontSize: '16px', 
                        borderRadius: '10px', 
                        border: '1px solid rgba(0,0,0,0.12)', 
                        width: '90px', 
                        fontWeight: 800, 
                        textAlign: 'center', 
                        outline: 'none',
                        color: '#1F2937'
                      }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#6B7280' }}>
                      sholat (dari total ideal 150 kali sebulan)
                    </span>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '14px', fontWeight: 800, display: 'block', marginBottom: '8px', color: '#4B5563' }}>
                    Hadiah / Reward yang Dijanjikan:
                  </label>
                  <input 
                    type="text" 
                    value={rewardInput} 
                    onChange={(e) => setRewardInput(e.target.value)} 
                    placeholder="Contoh: Sepeda Baru 🚲"
                    style={{ 
                      padding: '12px 14px', 
                      fontSize: '14px', 
                      borderRadius: '10px', 
                      border: '1px solid rgba(0,0,0,0.12)', 
                      width: '100%', 
                      boxSizing: 'border-box', 
                      fontWeight: 700, 
                      outline: 'none',
                      color: '#1F2937'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  <button 
                    type="submit" 
                    style={{
                      flex: 1, 
                      padding: '14px',
                      backgroundColor: '#4F46E5',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                      fontWeight: 700,
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
                        backgroundColor: '#F3F4F6',
                        color: '#4B5563',
                        borderRadius: '12px',
                        border: 'none',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Reset Target Baru
                    </button>
                  )}
                </div>

                {isSaved && (
                  <div style={{ 
                    color: '#065F46', 
                    fontSize: '13px', 
                    fontWeight: 700, 
                    border: '1px solid rgba(16, 185, 129, 0.15)', 
                    padding: '8px 12px', 
                    borderRadius: '8px', 
                    background: '#D1FAE5' 
                  }}>
                    ✅ Target dan Hadiah berhasil disimpan dan ditampilkan ke dashboard anak!
                  </div>
                )}
              </form>

              {/* Status target saat ini */}
              <div style={{ marginTop: '28px', padding: '18px', borderRadius: '14px', border: '1px solid rgba(99, 102, 241, 0.15)', backgroundColor: '#FFFFFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#1F2937' }}>Progres Anak Saat Ini:</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#4F46E5' }}>
                    {totalPrayers30Days} / {parentTarget.targetCount} Sholat
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#F3F4F6', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${Math.min(100, Math.round((totalPrayers30Days / parentTarget.targetCount) * 100))}%`, 
                    backgroundColor: '#4F46E5',
                    borderRadius: '99px'
                  }} />
                </div>

                <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#4B5563' }}>
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
                        backgroundColor: '#10B981',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
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
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div className="card animate-fadeInUp" style={{ ...minCardStyle, width: '100%', maxWidth: '380px', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔒</div>
            <div style={{ fontWeight: 800, fontSize: '22px', marginBottom: '8px', letterSpacing: '-0.5px', color: '#1F2937' }}>Khusus Orang Tua</div>
            <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: 600, marginBottom: '24px', lineHeight: 1.4 }}>
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
                      fontWeight: '800',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.15)',
                      background: '#F9FAFB',
                      outline: 'none',
                      color: '#1F2937',
                      transition: 'all 0.1s ease'
                    }}
                  />
                ))}
              </div>

              {isPinError && (
                <div style={{ 
                  color: '#B91C1C', 
                  fontSize: '13px', 
                  fontWeight: 700, 
                  marginBottom: '16px', 
                  marginTop: '10px', 
                  border: '1px solid rgba(239, 68, 68, 0.15)', 
                  padding: '8px', 
                  borderRadius: '8px',
                  backgroundColor: '#FFF5F5'
                }}>
                  ❌ PIN salah! Silakan coba lagi.
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ 
                    flex: 1, 
                    backgroundColor: '#F3F4F6', 
                    color: '#4B5563',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{ 
                    flex: 1, 
                    backgroundColor: '#4F46E5', 
                    color: '#FFFFFF',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
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