// src/pages/ParentDashboard.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRAYER_NAMES, ACHIEVEMENTS } from '../data/data';
import { BarChart2, Award, TrendingUp, Star, Send, Trash2, Gift, Play } from 'lucide-react';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function ParentDashboard() {
  const { 
    currentUser, setUserMode, submissions, gradeHafalan, 
    addReward, claimReward, deleteReward, tracker, prayersDoneToday
  } = useApp();

  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'grading' | 'rewards'
  
  // States for adding reward
  const [newRewardName, setNewRewardName] = useState('');
  const [newRewardStreak, setNewRewardStreak] = useState('');

  // States for grading submission
  const [selectedSubId, setSelectedSubId] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  // Access single child stats directly embedded in the parent object
  const child = currentUser?.childStats;

  if (!currentUser || currentUser.role !== 'parent') {
    return (
      <div className="clay-card" style={{ padding: '32px', textAlign: 'center', background: '#fff', border: '1px solid #CBD5E0' }}>
        <h3>Akses Ditolak</h3>
        <p>Anda harus login sebagai Orang Tua untuk mengakses halaman dashboard ini.</p>
      </div>
    );
  }

  // 1. STATS CALCULATIONS
  const streakHistory = child?.streakHistory || [];
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
  const completedMovements = child?.completedMovements?.length || 0;
  const earnedBadgeList = ACHIEVEMENTS.filter(a => (child?.earnedBadges || []).includes(a.id));
  const monthlyRate = child ? Math.min(100, Math.round((child.totalPrayers / (new Date().getDate() * 5)) * 100)) : 0;

  // 2. SUBMISSIONS LIST
  // Filter submissions by current parent
  const mySubmissions = submissions.filter(s => s.parentId === currentUser.id);
  const pendingSubmissions = mySubmissions.filter(s => s.status === 'pending');
  const gradedSubmissions = mySubmissions.filter(s => s.status === 'graded');

  // 3. REWARDS LIST
  const myRewards = currentUser.rewards || [];

  const handleRewardSubmit = (e) => {
    e.preventDefault();
    if (!newRewardName.trim() || !newRewardStreak) return;
    addReward(newRewardName.trim(), newRewardStreak);
    setNewRewardName('');
    setNewRewardStreak('');
  };

  const handleGradingSubmit = (e, subId) => {
    e.preventDefault();
    gradeHafalan(subId, rating, feedback);
    setSelectedSubId(null);
    setFeedback('');
    setRating(5);
  };

  return (
    <div className="animate-fadeInUp" style={{ paddingBottom: '40px' }}>
      
      {/* Header Banner */}
      <div className="card mb-4" style={{ 
        background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', 
        color: 'white', border: 'none', padding: '24px', borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 50 }}>👨‍👩‍👦</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '22px', fontWeight: 700, marginBottom: 2 }}>Dashboard Orang Tua</div>
            <div style={{ fontSize: 13.5, opacity: 0.9, fontWeight: 500 }}>
              Pantau perkembangan ibadah, kelola hadiah streak, dan beri nilai hafalan <strong>{currentUser.childName}</strong>
            </div>
          </div>
          <button
            onClick={() => setUserMode('kids')}
            style={{
              backgroundColor: '#fbbf24', color: '#78350f', border: 'none',
              padding: '12px 20px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 800,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            <Play size={15} fill="#78350f" /> Masuk Mode Anak 🧒
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', backgroundColor: '#EDF2F7', padding: '4px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
        <button
          onClick={() => setActiveTab('stats')}
          style={{
            flex: 1, padding: '10px', fontSize: '13px', fontWeight: 700, borderRadius: '8px', border: 'none',
            backgroundColor: activeTab === 'stats' ? '#fff' : 'transparent',
            color: activeTab === 'stats' ? '#065F46' : '#64748B',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
          }}
        >
          <BarChart2 size={16} /> Grafik & Statistik
        </button>
        <button
          onClick={() => setActiveTab('grading')}
          style={{
            flex: 1, padding: '10px', fontSize: '13px', fontWeight: 700, borderRadius: '8px', border: 'none',
            backgroundColor: activeTab === 'grading' ? '#fff' : 'transparent',
            color: activeTab === 'grading' ? '#065F46' : '#64748B',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
          }}
        >
          <Star size={16} /> Setoran Hafalan ({pendingSubmissions.length})
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          style={{
            flex: 1, padding: '10px', fontSize: '13px', fontWeight: 700, borderRadius: '8px', border: 'none',
            backgroundColor: activeTab === 'rewards' ? '#fff' : 'transparent',
            color: activeTab === 'rewards' ? '#065F46' : '#64748B',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
          }}
        >
          <Gift size={16} /> Kelola Hadiah Streak
        </button>
      </div>

      {/* =========================================================================
          TAB 1: STATS & ANALYTICS
          ========================================================================= */}
      {activeTab === 'stats' && child && (
        <div>
          {/* Stats Overview */}
          <div className="grid-4 mb-4">
            {[
              { icon: '🔥', val: child.streak,      label: 'Streak Sekarang', color: '#DC2626',      sub: `Terpanjang: ${child.longestStreak} hari` },
              { icon: '🙏', val: child.totalPrayers, label: 'Total Sholat',    color: '#059669', sub: 'Sepanjang waktu' },
              { icon: '📊', val: `${isNaN(monthlyRate) ? 0 : monthlyRate}%`,     label: 'Konsistensi',   color: '#7C3AED',     sub: 'Bulan ini' },
              { icon: '🏅', val: earnedBadgeList.length, label: 'Badge Diraih',  color: '#D97706',  sub: 'Lencana anak' },
            ].map((s) => (
              <div key={s.label} className="stat-card" style={{ border: '1px solid #E2E8F0', borderRadius: '10px', boxShadow: 'none' }}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value" style={{ color: s.color }}>{s.val}</div>
                <div className="stat-label">{s.label}</div>
                <div style={{ fontSize: 10.5, color: '#64748B', fontWeight: 650, marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div>
              {/* Weekly Chart */}
              <div className="card mb-4" style={{ border: '1px solid #E2E8F0', background: '#fff', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BarChart2 size={16} style={{ color: '#059669' }} />
                  Grafik Sholat 7 Hari Terakhir
                </div>
                <div style={{ display: 'flex', gap: 4, height: 140, alignItems: 'flex-end', padding: '0 4px' }}>
                  {weeklyData.map((d, i) => {
                    const h = maxCount > 0 ? Math.round((d.count / maxCount) * 100) : 0;
                    const isToday = i === 6;
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ fontSize: 9.5, fontWeight: 700, color: '#64748B' }}>{d.count}</div>
                        <div style={{
                          width: '100%',
                          height: `${Math.max(h, 4)}%`,
                          background: isToday
                            ? 'linear-gradient(180deg, #D97706 0%, #B45309 100%)'
                            : 'linear-gradient(180deg, #059669 0%, #047857 100%)',
                          borderRadius: '4px 4px 0 0',
                          transition: 'height 0.6s ease',
                          minHeight: 4
                        }} />
                        <div style={{ fontSize: 9.5, fontWeight: 700, color: isToday ? '#B45309' : '#64748B' }}>{d.day}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 11.5, fontWeight: 700, color: '#64748B', padding: '0 4px' }}>
                  <span>Rata-rata: {weeklyAvg.toFixed(1)} sholat/hari</span>
                  <span>Maks: {maxCount}/5</span>
                </div>
              </div>

              {/* Today Checklist */}
              <div className="card" style={{ border: '1px solid #E2E8F0', background: '#fff', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 14, marginBottom: 12 }}>
                  📅 Absensi Hari Ini ({prayersDoneToday}/5)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {PRAYER_NAMES.map((p) => {
                    const isDone = tracker && tracker[p.key];
                    return (
                      <div key={p.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', background: isDone ? '#ECFDF5' : '#F8FAFC', border: `1px solid ${isDone ? '#A7F3D0' : '#E2E8F0'}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{p.emoji}</span>
                          <span style={{ fontWeight: 700, fontSize: 13, color: '#1E293B' }}>{p.label}</span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: isDone ? '#047857' : '#64748B' }}>
                          {isDone ? '✅ Sudah' : '⬜ Belum'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Progress tracks */}
            <div>
              <div className="card mb-4" style={{ border: '1px solid #E2E8F0', background: '#fff', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 14, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <TrendingUp size={16} style={{ color: '#059669' }} />
                  Progres Pembelajaran
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Gerakan Sholat', val: completedMovements, max: 11, color: '#059669' },
                    { label: 'Kuis Benar',     val: child.quizCorrect, max: 20, color: '#EC4899' },
                    { label: 'Hari Streak',    val: child.streak,       max: 30, color: '#DC2626' },
                    { label: 'Level',          val: child.level,        max: 10, color: '#7C3AED' },
                  ].map((item) => {
                    const pct = Math.min(100, Math.round((item.val / item.max) * 100));
                    return (
                      <div key={item.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>
                          <span>{item.label}</span>
                          <span style={{ color: item.color }}>{item.val}/{item.max}</span>
                        </div>
                        <div className="progress-track" style={{ height: 8, backgroundColor: '#E2E8F0' }}>
                          <div className="progress-fill" style={{ width: `${pct}%`, background: item.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Badges */}
              <div className="card mb-4" style={{ border: '1px solid #E2E8F0', background: '#fff', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 14, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Award size={16} style={{ color: '#D97706' }} />
                  Badge yang Diraih ({earnedBadgeList.length}/{ACHIEVEMENTS.length})
                </div>
                {earnedBadgeList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '16px 0', color: '#64748B', fontSize: 13, fontWeight: 600 }}>
                    Belum ada lencana yang diraih oleh anak.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {earnedBadgeList.map((b) => (
                      <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FEF3C7', borderRadius: '8px', padding: '5px 12px', border: '1px solid #FDE68A' }}>
                        <span style={{ fontSize: 16 }}>{b.emoji}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: '#B45309' }}>{b.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: SUBMISSIONS & MEMORIZATION GRADING
          ========================================================================= */}
      {activeTab === 'grading' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
          
          {/* Submission List */}
          <div className="clay-card" style={{ padding: '20px', border: '1px solid #CBD5E0', background: '#fff' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
              Setoran Menunggu Dinilai ({pendingSubmissions.length}):
            </h4>
            {pendingSubmissions.length === 0 ? (
              <p style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 600, margin: '16px 0', textAlign: 'center' }}>
                🌟 Tidak ada setoran hafalan baru dari anak Anda.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pendingSubmissions.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => { setSelectedSubId(sub.id); setRating(5); setFeedback(''); }}
                    style={{
                      width: '100%', padding: '12px', border: selectedSubId === sub.id ? '2px solid #059669' : '1px solid #CBD5E0',
                      borderRadius: '10px', background: selectedSubId === sub.id ? '#ECFDF5' : '#fff',
                      textAlign: 'left', cursor: 'pointer', fontWeight: 700, fontSize: '13px', transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Doa: {sub.movementName}</span>
                      <span style={{ fontSize: '10px', color: '#64748B' }}>{new Date(sub.timestamp).toLocaleDateString()}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#059669', display: 'block', marginTop: '2px' }}>
                      Penyetor: {sub.childName}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Graded History */}
            <h4 style={{ margin: '24px 0 12px', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
              Riwayat Penilaian:
            </h4>
            {gradedSubmissions.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textAlign: 'center' }}>Belum ada hafalan yang dinilai.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                {gradedSubmissions.map((sub) => (
                  <div key={sub.id} style={{ padding: '10px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC', fontSize: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1E293B' }}>
                      <span>{sub.movementName}</span>
                      <span style={{ color: '#D97706' }}>⭐ {sub.score}/5</span>
                    </div>
                    {sub.comment && <div style={{ color: '#64748B', fontStyle: 'italic', marginTop: '2px' }}>"{sub.comment}"</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Grading Editor */}
          <div>
            {selectedSubId ? (
              (() => {
                const sub = pendingSubmissions.find(s => s.id === selectedSubId);
                if (!sub) return null;
                return (
                  <form onSubmit={(e) => handleGradingSubmit(e, sub.id)} className="clay-card animate-fadeIn" style={{ padding: '24px', border: '1px solid #CBD5E0', background: '#fff' }}>
                    <h4 style={{ margin: '0 0 12px', fontSize: '15.5px', fontWeight: 800, color: '#0F172A' }}>
                      📝 Beri Nilai Setoran: {sub.movementName}
                    </h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 600, marginBottom: '16px' }}>
                      Dengarkan bacaan doa anak Anda, beri bintang kelayakan, dan ketikkan apresiasi motivasi.
                    </p>

                    {/* Interactive Star Selector */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569' }}>SKOR BINTANG (1 - 5)</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            <Star size={30} fill={rating >= star ? '#F59E0B' : 'none'} style={{ color: rating >= star ? '#D97706' : '#94A3B8' }} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Feedback comment */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569' }}>CATATAN / APRESIASI</label>
                      <textarea
                        rows={3}
                        placeholder="Contoh: Luar biasa nak, bacaannya sudah sangat tajwid dan fasih! 🌟"
                        value={feedback}
                        onChange={e => setFeedback(e.target.value)}
                        style={{
                          width: '100%', padding: '10px', fontSize: '13px', fontWeight: 600,
                          borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedSubId(null)}
                        className="clay-btn yellow btn-sm"
                        style={{ flex: 1, padding: '10px' }}
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="clay-btn purple btn-sm"
                        style={{ flex: 2, padding: '10px', background: '#059669', borderColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        Kirim Penilaian
                      </button>
                    </div>
                  </form>
                );
              })()
            ) : (
              <div className="clay-card" style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed #CBD5E0', background: '#F8FAFC' }}>
                <span style={{ fontSize: '60px', display: 'block', marginBottom: '12px' }}>📝</span>
                <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>Workspace Penilaian</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                  Pilih salah satu setoran anak di sebelah kiri untuk membuka panel evaluasi penilaian.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: REWARDS MANAGEMENT
          ========================================================================= */}
      {activeTab === 'rewards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
          
          {/* Add Reward Form */}
          <form onSubmit={handleRewardSubmit} className="clay-card" style={{ padding: '20px', border: '1px solid #CBD5E0', background: '#fff' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
              🎁 TAMBAH HADIAH STREAK BARU
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569' }}>NAMA HADIAH</label>
                <input
                  type="text"
                  placeholder="Contoh: Es Krim Cokelat 🍦 / Mainan 🧸"
                  value={newRewardName}
                  onChange={e => setNewRewardName(e.target.value)}
                  style={{
                    width: '100%', padding: '10px', fontSize: '13px', fontWeight: 600,
                    borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569' }}>TARGET HARI STREAK</label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  placeholder="Contoh: 3 / 7 / 15 hari"
                  value={newRewardStreak}
                  onChange={e => setNewRewardStreak(e.target.value)}
                  style={{
                    width: '100%', padding: '10px', fontSize: '13px', fontWeight: 600,
                    borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none'
                  }}
                  required
                />
              </div>

              <button type="submit" className="clay-btn purple w-full" style={{ padding: '10px', background: '#059669', borderColor: '#059669', marginTop: '4px' }}>
                Tambah Hadiah
              </button>
            </div>
          </form>

          {/* Rewards List */}
          <div className="clay-card" style={{ padding: '20px', border: '1px solid #CBD5E0' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
              Daftar Hadiah Streak Anak:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myRewards.map((reward) => {
                const isMet = (child?.streak || 0) >= reward.targetStreak;
                return (
                  <div
                    key={reward.id}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px', border: '1px solid #E2E8F0', borderRadius: '10px',
                      background: reward.status === 'claimed' 
                        ? '#F8FAFC' 
                        : (isMet ? '#FEF3C7' : '#fff'),
                      opacity: reward.status === 'claimed' ? 0.65 : 1
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '13.5px', color: '#1E293B' }}>
                        {reward.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                        Target: {reward.targetStreak} Hari Streak (Anak saat ini: {child?.streak || 0} hari)
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {reward.status === 'claimed' ? (
                        <span style={{ fontSize: '11px', background: '#E2E8F0', color: '#64748B', padding: '4px 8px', borderRadius: '6px', fontWeight: 700 }}>
                          Sudah Diberi 🎁
                        </span>
                      ) : isMet ? (
                        <button
                          onClick={() => claimReward(reward.id)}
                          className="clay-btn yellow btn-sm"
                          style={{ padding: '6px 12px', fontSize: '11px' }}
                        >
                          Beri Hadiah 🎁
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', background: '#FFF5F5', color: '#C53030', padding: '4px 8px', borderRadius: '6px', fontWeight: 700 }}>
                          🔒 Kurang {reward.targetStreak - (child?.streak || 0)} Hari
                        </span>
                      )}

                      {/* Delete button */}
                      <button
                        onClick={() => deleteReward(reward.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {myRewards.length === 0 && (
                <p style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 600, textAlign: 'center', margin: '16px 0' }}>
                  Belum ada kustom hadiah yang dibuat. Buat di form sebelah kiri!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}