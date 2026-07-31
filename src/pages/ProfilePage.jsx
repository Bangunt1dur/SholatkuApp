import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS, SHOLAT_MOVEMENTS, PRAYER_NAMES } from '../data/data';
import { Edit2, ShieldAlert, User, Mail, Calendar, Key, CheckCircle2, Lock, Award } from 'lucide-react';

const glassCardStyle = {
  background: '#FFFFFF',
  border: '1px solid rgba(99, 102, 241, 0.12)',
  boxShadow: '0 4px 24px rgba(99, 102, 241, 0.02)',
  borderRadius: '20px',
  padding: '24px',
  color: '#1F2937',
  position: 'relative',
  boxSizing: 'border-box'
};

const glassInnerCardStyle = {
  background: '#F9FAFB',
  border: '1px solid rgba(0, 0, 0, 0.04)',
  borderRadius: '14px',
  padding: '20px',
  position: 'relative',
  boxSizing: 'border-box'
};

const glassButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'rgba(99, 102, 241, 0.06)',
  border: 'none',
  color: '#4F46E5',
  borderRadius: '12px',
  padding: '10px 18px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  fontFamily: 'var(--font-headline)'
};

export default function Profile() {
  const { isKidsMode, activeProfile, profile, setProfile, tracker, userAccount, updateParentPin, logout } = useApp();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile?.name || '');

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setProfile(p => ({ ...p, name: nameInput.trim() }));
      setEditingName(false);
    }
  };

  const handleUbahPin = () => {
    const newPin = prompt('Masukkan 4 digit PIN Orang Tua baru:', userAccount?.pin || '1234');
    if (newPin && newPin.trim().length === 4 && !isNaN(newPin)) {
      if (updateParentPin) {
        updateParentPin(newPin.trim());
        alert(`PIN Orang Tua berhasil diubah menjadi: ${newPin.trim()}`);
      }
    } else if (newPin !== null) {
      alert('PIN harus berupa 4 angka numerik!');
    }
  };

  // If in Adult or Parent mode (isKidsMode is false or activeProfile is not 'anak')
  if (!isKidsMode && activeProfile !== 'anak') {
    const isAdult = activeProfile === 'dewasa';
    const isParent = activeProfile === 'ortu';
    const roleLabel = isAdult ? 'Dewasa' : isParent ? 'Orang Tua' : 'Pengguna';

    return (
      <div className="animate-fadeInUp" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
        <div style={glassCardStyle}>
          {/* Header section */}
          <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1F2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={24} style={{ color: '#4F46E5' }} /> Profil Pengguna ({roleLabel})
            </h2>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', margin: '4px 0 0' }}>
              Informasi akun, statistik aktivitas ibadah, dan pengaturan profil Anda.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
            
            {/* Left: User Identity Card */}
            <div style={glassInnerCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  backgroundColor: '#EEF2FF', border: '1px solid rgba(99, 102, 241, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '32px', fontWeight: 900, color: '#4F46E5'
                }}>
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                </div>

                <div style={{ flex: 1 }}>
                  {editingName ? (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        style={{
                          padding: '6px 12px', borderRadius: '8px', border: '1px solid #4F46E5',
                          fontSize: '16px', fontWeight: 800, outline: 'none', width: '140px'
                        }}
                      />
                      <button onClick={handleSaveName} style={{ ...glassButtonStyle, padding: '6px 12px', fontSize: '12px' }}>
                        Simpan
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#1F2937' }}>
                        {profile?.name || 'Pengguna'}
                      </h3>
                      <button onClick={() => { setNameInput(profile?.name || ''); setEditingName(true); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#4F46E5' }}>
                        <Edit2 size={16} />
                      </button>
                    </div>
                  )}
                  <p style={{ margin: '4px 0 0', fontSize: '13px', fontWeight: 600, color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Mail size={13} /> {userAccount?.email || 'user@sholatku.app'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px dashed rgba(0,0,0,0.08)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 700 }}>
                  <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={15} /> Peran Akun:
                  </span>
                  <span style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '3px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 800 }}>
                    Mode {roleLabel}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 700 }}>
                  <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Key size={15} /> PIN Khusus Ortu:
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#1F2937' }}>
                      •••• ({userAccount?.pin || '1234'})
                    </span>
                    <button onClick={handleUbahPin} style={{ ...glassButtonStyle, padding: '4px 10px', fontSize: '11.5px' }}>
                      Ubah PIN
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 700 }}>
                  <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={15} /> Bergabung Sejak:
                  </span>
                  <span style={{ fontWeight: 700, color: '#1F2937' }}>
                    {profile?.createdAt || 'Juli 2026'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Daily Prayer & Activity Summary */}
            <div style={glassInnerCardStyle}>
              <h4 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '8px' }}>
                <CheckCircle2 size={18} style={{ color: '#4F46E5' }} /> Ringkasan Ibadah Hari Ini
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {PRAYER_NAMES.map((p) => {
                  const done = tracker[p.key];
                  return (
                    <div key={p.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '10px', backgroundColor: done ? '#EEF2FF' : '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{p.emoji}</span> {p.label}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: done ? '#10B981' : '#9CA3AF' }}>
                        {done ? '✓ Sudah Terabsen' : 'Belum Absen'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.06)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Surah Dibaca</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#4F46E5', marginTop: '2px' }}>30 Juz</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.06)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Dzikir Harian</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#10B981', marginTop: '2px' }}>3 / 3 Set</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Kids Mode Layout (Neo-Brutalist Gamified UI with Badges, XP, Stars & Gems)
  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNext) * 100));

  const handleNameChange = () => {
    const newName = prompt('Masukkan nama:', profile.name);
    if (newName && newName.trim()) {
      setProfile(p => ({ ...p, name: newName.trim() }));
    }
  };

  const achievementList = ACHIEVEMENTS.map((a) => ({
    ...a,
    earned: profile.earnedBadges.includes(a.id),
  }));

  const earnedCount = achievementList.filter((a) => a.earned).length;
  const completedMovements = profile.completedMovements.length;

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      <div className="section-title">
        <div className="title-icon">🌟</div>
        Profilku 🏅
      </div>

      <div className="grid-2" style={{ alignItems: 'start', gap: '24px' }}>
        {/* Left: Profile Card */}
        <div>
          {/* Avatar & Identity */}
          <div className="card mb-4" style={{ textAlign: 'center', background: 'linear-gradient(180deg, var(--primary-light) 0%, white 60%)', border: '4px solid #000', boxShadow: '6px 6px 0px #000' }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--game-purple), var(--game-purple-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', margin: '0 auto 16px', border: '4px solid #000', boxShadow: '4px 4px 0px #000', position: 'relative', overflow: 'hidden' }}>
              🧒
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#000', margin: 0 }}>{profile.name}</h2>
              <button onClick={handleNameChange} style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer', padding: 4 }}>
                <Edit2 size={16} />
              </button>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', fontWeight: 900, backgroundColor: 'var(--game-yellow)', color: '#000', border: '3px solid #000', padding: '6px 16px', borderRadius: '12px', boxShadow: '2px 2px 0px #000', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                🗺️ Level {profile.level} Explorer
              </span>
            </div>

            {/* Level Progress Circle */}
            <div style={{ margin: '0 auto 16px', position: 'relative', width: 110, height: 110 }}>
              <svg width="110" height="110" viewBox="0 0 110 110">
                <circle cx="55" cy="55" r="46" fill="none" stroke="#000" strokeWidth="8" />
                <circle
                  cx="55" cy="55" r="46" fill="none"
                  stroke="var(--game-purple)" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 46}`}
                  strokeDashoffset={`${2 * Math.PI * 46 * (1 - xpPercent / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 55 55)"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: 26, color: '#000', lineHeight: 1 }}>{profile.level}</div>
                <div style={{ fontSize: '10px', fontWeight: 900, color: '#556B52' }}>LEVEL</div>
              </div>
            </div>

            <div style={{ fontSize: '13px', fontWeight: 800, color: '#000', marginBottom: '8px' }}>
              {profile.xp} / {profile.xpToNext} XP menuju Level {profile.level + 1}
            </div>
            <div style={{ height: '24px', backgroundColor: '#F8FAF8', borderRadius: '12px', border: '3px solid #000', padding: '2px', boxSizing: 'border-box', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${xpPercent}%`, backgroundColor: 'var(--game-green-light)', borderRadius: '6px', borderRight: xpPercent > 0 ? '2px solid #000' : 'none', transition: 'width 0.5s ease' }} />
            </div>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid-2 mb-4">
            {[
              { icon: '⭐', val: profile.stars,             label: 'Bintang',         color: '#d97706', bg: '#fef3c7' },
              { icon: '💎', val: profile.gems,              label: 'Gems',            color: 'var(--game-purple)', bg: '#f3e8ff' },
              { icon: '🔥', val: profile.streak,            label: 'Streak',          color: '#f43f5e', bg: '#ffe4e6' },
              { icon: '🏅', val: earnedCount,               label: 'Lencana',         color: 'var(--game-green)', bg: '#dcfce7' },
              { icon: '📖', val: completedMovements,        label: 'Misi Gerakan',    color: '#2563EB', bg: '#eff6ff' },
              { icon: '🧠', val: profile.quizCorrect,       label: 'Kuis Benar',      color: '#EC4899', bg: '#fce7f3' },
            ].map((s) => (
              <div key={s.label} className="card" style={{ textAlign: 'center', backgroundColor: s.bg, padding: '16px', border: '4px solid #000', boxShadow: '4px 4px 0px #000' }}>
                <div style={{ fontSize: '28px', marginBottom: '4px' }}>{s.icon}</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#000' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Achievements & Movements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Achievements Badges */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '3px solid #000', paddingBottom: '8px' }}>
              <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: '16px' }}>
                🏆 LENCANA PENGHARGAAN
              </div>
              <span className="btn btn-sm" style={{ backgroundColor: 'var(--game-yellow)' }}>{earnedCount}/{achievementList.length}</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '16px' }}>
              {achievementList.map((a) => (
                <div
                  key={a.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px 8px',
                    borderRadius: '16px',
                    border: '3px solid #000',
                    backgroundColor: a.earned ? 'var(--primary-light)' : '#f1f5f9',
                    boxShadow: a.earned ? '2px 2px 0px #000' : 'none',
                    opacity: a.earned ? 1 : 0.6,
                    textAlign: 'center',
                    transition: 'all 0.1s ease',
                    position: 'relative'
                  }}
                  title={a.desc}
                >
                  <div style={{ fontSize: '32px', marginBottom: '4px', filter: a.earned ? 'none' : 'grayscale(100%)' }}>{a.emoji}</div>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: '#000', lineHeight: 1.2, height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {a.nameKids || a.name}
                  </div>
                  {a.earned ? (
                    <span style={{ fontSize: '9px', fontWeight: 900, color: 'var(--game-purple)', marginTop: '4px', backgroundColor: '#fff', border: '1.5px solid #000', borderRadius: '4px', padding: '1px 4px' }}>DIRAIH!</span>
                  ) : (
                    <span style={{ fontSize: '9px', fontWeight: 900, color: '#666', marginTop: '4px' }}>Belum</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Completed Movements List */}
          <div className="card">
            <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: '16px', marginBottom: '16px', borderBottom: '3px solid #000', paddingBottom: '8px' }}>
              📖 GERAKAN SHOLAT YANG SUDAH DIPELAJARI ({completedMovements}/{SHOLAT_MOVEMENTS.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SHOLAT_MOVEMENTS.map((m) => {
                const done = profile.completedMovements.includes(m.key);
                return (
                  <div key={m.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: '12px', border: '3px solid #000', background: done ? 'var(--game-green-light)' : '#f8fafc', boxShadow: done ? '2px 2px 0px #000' : 'none' }}>
                    <span style={{ fontSize: 18 }}>{done ? '✅' : '🔒'}</span>
                    <span style={{ flex: 1, fontSize: '13px', fontWeight: 900, color: '#000' }}>
                      {m.nameKids || m.name}
                    </span>
                    {done && <span style={{ fontSize: '11px', fontWeight: 900, color: '#166534', backgroundColor: '#fff', border: '2.5px solid #000', borderRadius: '6px', padding: '2px 8px' }}>Selesai</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
