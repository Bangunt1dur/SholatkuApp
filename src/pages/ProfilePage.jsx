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
    <div className="animate-fadeInUp">
      <div className="section-title">
        <div className="title-icon">👤</div>
        {isKidsMode ? 'Profil Ku 🌟' : 'Profil Pengguna'}
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left: Profile Card */}
        <div>
          {/* Avatar & Identity */}
          <div className="card mb-4" style={{ textAlign: 'center', background: 'linear-gradient(180deg, var(--primary-light) 0%, white 60%)' }}>
            <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, margin: '0 auto 14px', border: '4px solid white', boxShadow: 'var(--shadow-lg)' }}>
              {isKidsMode ? '🧒' : '👤'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-dark)', margin: 0 }}>{profile.name}</h2>
              <button onClick={handleNameChange} style={{ background: 'none', color: 'var(--text-muted)', padding: 4 }}>
                <Edit2 size={14} />
              </button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <span className="badge badge-primary" style={{ fontSize: 13, padding: '5px 14px' }}>
                🗺️ Level {profile.level} Explorer
              </span>
            </div>

            {/* Level Ring */}
            <div style={{ margin: '0 auto 14px', position: 'relative', width: 100, height: 100 }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="44" fill="none"
                  stroke="var(--primary)" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - xpPercent / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: 22, color: 'var(--text-dark)', lineHeight: 1 }}>{profile.level}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>LEVEL</div>
              </div>
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>
              {profile.xp} / {profile.xpToNext} XP menuju Level {profile.level + 1}
            </div>
            <div className="progress-track" style={{ marginBottom: 0 }}>
              <div className="progress-fill" style={{ width: `${xpPercent}%` }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid-2 mb-4">
            {[
              { icon: '⭐', val: profile.stars,             label: 'Bintang',         color: 'var(--accent)' },
              { icon: '💎', val: profile.gems,              label: 'Gems',            color: '#7C3AED' },
              { icon: '🔥', val: profile.streak,            label: 'Hari Streak',     color: '#DC2626' },
              { icon: '🏅', val: earnedCount,               label: 'Badge Diraih',    color: 'var(--primary)' },
              { icon: '📖', val: completedMovements,        label: 'Gerakan Selesai', color: '#2563EB' },
              { icon: '🧠', val: profile.quizCorrect,       label: 'Kuis Benar',      color: '#EC4899' },
            ].map((s) => (
              <div key={s.label} className="stat-card" style={{ textAlign: 'center' }}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value" style={{ color: s.color }}>{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Achievements */}
        <div>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14 }}>
                🏆 Achievement Badges
              </div>
              <span className="badge badge-accent">{earnedCount}/{achievementList.length}</span>
            </div>
            <div className="grid-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
              {achievementList.map((a) => (
                <div
                  key={a.id}
                  className={`achievement-badge ${a.earned ? 'earned' : ''}`}
                  data-tip={a.desc}
                  title={a.desc}
                >
                  <div className="badge-icon">{a.emoji}</div>
                  <div className="badge-name">{isKidsMode ? a.nameKids : a.name}</div>
                  {a.earned && <span style={{ fontSize: 9.5, fontWeight: 800, color: 'var(--accent-dark)' }}>DIRAIH!</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Completed Movements */}
          <div className="card mt-4">
            <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 12 }}>
              📖 Gerakan Sholat Dipelajari ({completedMovements}/{SHOLAT_MOVEMENTS.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {SHOLAT_MOVEMENTS.map((m) => {
                const done = profile.completedMovements.includes(m.key);
                return (
                  <div key={m.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 18 }}>{done ? '✅' : '⬜'}</span>
                    <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: done ? 'var(--text-dark)' : 'var(--text-muted)' }}>
                      {isKidsMode ? m.nameKids : m.name}
                    </span>
                    {done && <span className="badge badge-success" style={{ fontSize: 10 }}>Selesai</span>}
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
