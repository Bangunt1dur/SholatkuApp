import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS, SHOLAT_MOVEMENTS } from '../data/data';
import { Edit2 } from 'lucide-react';

export default function Profile() {
  const { isKidsMode, profile, setProfile } = useApp();

  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNext) * 100));

  const handleNameChange = () => {
    const newName = prompt('Masukkan nama:', profile.name);
    if (newName && newName.trim()) {
      setProfile(p => ({ ...p, name: newName.trim() }));
    }
  };

  // Build achievement list with earned status
  const achievementList = ACHIEVEMENTS.map((a) => ({
    ...a,
    earned: profile.earnedBadges.includes(a.id),
  }));

  const earnedCount = achievementList.filter((a) => a.earned).length;
  const completedMovements = profile.completedMovements.length;

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      <div className="section-title">
        <div className="title-icon">👤</div>
        {isKidsMode ? 'Profil Ku 🌟' : 'Profil Pengguna'}
      </div>

      <div className="grid-2" style={{ alignItems: 'start', gap: '24px' }}>
        {/* Left: Profile Card */}
        <div>
          {/* Avatar & Identity */}
          <div className="card mb-4" style={{ textAlign: 'center', background: isKidsMode ? 'linear-gradient(180deg, var(--primary-light) 0%, white 60%)' : 'linear-gradient(180deg, #D4DDD3 0%, white 60%)', border: isKidsMode ? '4px solid #000' : '4px solid #113C2B', boxShadow: isKidsMode ? '6px 6px 0px #000' : '6px 6px 0px #113C2B' }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: isKidsMode ? 'linear-gradient(135deg, var(--game-purple), var(--game-purple-dark))' : 'linear-gradient(135deg, #113C2B, #082218)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', margin: '0 auto 16px', border: isKidsMode ? '4px solid #000' : '4px solid #113C2B', boxShadow: isKidsMode ? '4px 4px 0px #000' : '4px 4px 0px #113C2B', position: 'relative', overflow: 'hidden' }}>
              {isKidsMode ? '🧒' : (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>👤</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#113C2B', margin: 0 }}>{profile.name}</h2>
              <button onClick={handleNameChange} style={{ background: 'none', border: 'none', color: isKidsMode ? '#000' : '#113C2B', cursor: 'pointer', padding: 4 }}>
                <Edit2 size={16} />
              </button>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', fontWeight: 900, backgroundColor: isKidsMode ? 'var(--game-yellow)' : '#D4DDD3', color: '#113C2B', border: isKidsMode ? '3px solid #000' : '3px solid #113C2B', padding: '6px 16px', borderRadius: '12px', boxShadow: isKidsMode ? '2px 2px 0px #000' : '2px 2px 0px #113C2B', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                🗺️ Level {profile.level} Explorer
              </span>
            </div>

            {/* Level Progress Circle */}
            <div style={{ margin: '0 auto 16px', position: 'relative', width: 110, height: 110 }}>
              <svg width="110" height="110" viewBox="0 0 110 110">
                <circle cx="55" cy="55" r="46" fill="none" stroke={isKidsMode ? '#000' : '#113C2B'} strokeWidth="8" />
                <circle
                  cx="55" cy="55" r="46" fill="none"
                  stroke={isKidsMode ? "var(--game-purple)" : "#113C2B"} strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 46}`}
                  strokeDashoffset={`${2 * Math.PI * 46 * (1 - xpPercent / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 55 55)"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: 26, color: '#113C2B', lineHeight: 1 }}>{profile.level}</div>
                <div style={{ fontSize: '10px', fontWeight: 900, color: '#556B52' }}>LEVEL</div>
              </div>
            </div>

            <div style={{ fontSize: '13px', fontWeight: 800, color: '#113C2B', marginBottom: '8px' }}>
              {profile.xp} / {profile.xpToNext} XP menuju Level {profile.level + 1}
            </div>
            <div style={{ height: '24px', backgroundColor: '#F8FAF8', borderRadius: '12px', border: isKidsMode ? '3px solid #000' : '3px solid #113C2B', padding: '2px', boxSizing: 'border-box', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${xpPercent}%`, backgroundColor: isKidsMode ? 'var(--game-green-light)' : '#113C2B', borderRadius: '6px', borderRight: xpPercent > 0 ? (isKidsMode ? '2px solid #000' : '2px solid #113C2B') : 'none', transition: 'width 0.5s ease' }} />
            </div>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid-2 mb-4">
            {[
              { icon: '⭐', val: profile.stars,             label: 'Bintang',         color: '#d97706', bg: '#fef3c7' },
              { icon: '💎', val: profile.gems,              label: 'Gems',            color: isKidsMode ? 'var(--game-purple)' : '#113C2B', bg: '#f3e8ff' },
              { icon: '🔥', val: profile.streak,            label: 'Streak',          color: '#f43f5e', bg: '#ffe4e6' },
              { icon: '🏅', val: earnedCount,               label: 'Lencana',         color: isKidsMode ? 'var(--game-green)' : '#113C2B', bg: '#dcfce7' },
              { icon: '📖', val: completedMovements,        label: 'Misi Gerakan',    color: '#2563EB', bg: '#eff6ff' },
              { icon: '🧠', val: profile.quizCorrect,       label: 'Kuis Benar',      color: '#EC4899', bg: '#fce7f3' },
            ].map((s) => (
              <div key={s.label} className="card" style={{ textAlign: 'center', backgroundColor: s.bg, padding: '16px', border: isKidsMode ? '4px solid #000' : '4px solid #113C2B', boxShadow: isKidsMode ? '4px 4px 0px #000' : '4px 4px 0px #113C2B' }}>
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
                    {isKidsMode ? a.nameKids : a.name}
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
                      {isKidsMode ? m.nameKids : m.name}
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
