// src/pages/ProfilePage.jsx
import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS, SHOLAT_MOVEMENTS } from '../data/data';
import { Edit2, Award, BookOpen, Star, Gem, Flame, CheckCircle, Award as Trophy } from 'lucide-react';

export default function Profile() {
  const { userMode, profile, setProfile } = useApp();
  const isKidsMode = userMode === 'kids';

  const xpPercent = Math.min(100, Math.round((profile?.xp / profile?.xpToNext) * 100)) || 0;

  const handleNameChange = () => {
    const newName = prompt('Masukkan nama baru:', profile?.name);
    if (newName && newName.trim()) {
      setProfile(p => ({ ...p, name: newName.trim() }));
    }
  };

  // Build achievement list with earned status
  const achievementList = ACHIEVEMENTS.map((a) => ({
    ...a,
    earned: profile?.earnedBadges?.includes(a.id) || false,
  }));

  const earnedCount = achievementList.filter((a) => a.earned).length;
  const completedMovements = profile?.completedMovements?.length || 0;

  if (!profile) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--game-dark)' }}>
        <h3>Loading Profile...</h3>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn" style={{ padding: '16px', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '12px', marginBottom: '24px' }}>
        <Trophy size={20} style={{ color: isKidsMode ? 'var(--game-dark)' : '#065F46' }} />
        <h2 style={{ 
          fontFamily: isKidsMode ? 'var(--font-headline)' : 'Playfair Display, serif', 
          fontSize: '24px', fontWeight: 900, 
          color: 'var(--game-dark)', 
          margin: 0 
        }}>
          {isKidsMode ? 'Profil Ku 🌟' : 'Profil Saya'}
        </h2>
      </div>

      {/* Responsive Bento Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* BENTO BLOCK 1: Identity & XP Ring */}
        <div className="clay-card" style={{ textAlign: 'center', padding: '24px', background: '#fff' }}>
          
          <div style={{ 
            width: '96px', height: '96px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--game-purple) 0%, var(--game-purple-dark) 100%)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '44px', margin: '0 auto 16px', border: '3px solid var(--game-dark)', 
            boxShadow: '4px 4px 0 var(--game-dark)', position: 'relative'
          }}>
            {isKidsMode ? '🧒' : '👤'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', fontWeight: 950, color: 'var(--game-dark)', margin: 0 }}>
              {profile.name}
            </h3>
            <button 
              onClick={handleNameChange} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748B' }}
            >
              <Edit2 size={14} />
            </button>
          </div>

          <span style={{ 
            display: 'inline-block', background: 'var(--game-yellow)', color: 'var(--game-dark)', 
            border: '2.5px solid var(--game-dark)', padding: '4px 14px', borderRadius: '99px', 
            fontSize: '12px', fontWeight: 900, boxShadow: '2px 2px 0 var(--game-dark)', marginBottom: '20px'
          }}>
            🗺️ Level {profile.level} Explorer
          </span>

          {/* Circular SVG Level Progress Tracker */}
          <div style={{ margin: '0 auto 16px', position: 'relative', width: '100px', height: '100px' }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke="var(--game-purple)" strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - xpPercent / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontWeight: 950, fontSize: '24px', color: 'var(--game-dark)', lineHeight: 1 }}>{profile.level}</div>
              <div style={{ fontSize: '9px', fontWeight: 900, color: '#64748B' }}>LEVEL</div>
            </div>
          </div>

          <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B' }}>
            {profile.xp} / {profile.xpToNext} XP
          </div>
          
          <div style={{ 
            marginTop: '8px', height: '16px', background: '#F1F5F9', borderRadius: '10px', 
            overflow: 'hidden', border: '2.5px solid var(--game-dark)', padding: '2px' 
          }}>
            <div style={{ height: '100%', width: `${xpPercent}%`, background: 'var(--game-green-light)', borderRadius: '6px', borderRight: '1.5px solid var(--game-dark)', transition: 'width 0.4s' }} />
          </div>
          
          <p style={{ margin: '8px 0 0', fontSize: '11px', fontWeight: 700, fontStyle: 'italic', color: '#94A3B8' }}>
            Butuh {profile.xpToNext - profile.xp} XP lagi untuk naik ke Level {profile.level + 1}!
          </p>
        </div>

        {/* BENTO BLOCK 2: 6 Stats Grid Badges */}
        <div className="clay-card" style={{ padding: '24px', background: '#fff' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 900, color: 'var(--game-dark)' }}>
            📊 Statistik Pencapaian Belajar
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { icon: '⭐', val: profile.stars, label: 'Bintang', color: '#B45309', bg: '#FEF3C7' },
              { icon: '💎', val: profile.gems, label: 'Gems', color: '#6D28D9', bg: '#F5F3FF' },
              { icon: '🔥', val: profile.streak, label: 'Hari Streak', color: '#B91C1C', bg: '#FEF2F2' },
              { icon: '🏅', val: earnedCount, label: 'Badge Diraih', color: '#047857', bg: '#ECFDF5' },
              { icon: '📖', val: completedMovements, label: 'Gerakan Selesai', color: '#1D4ED8', bg: '#EFF6FF' },
              { icon: '🧠', val: profile.quizCorrect, label: 'Kuis Benar', color: '#BE185D', bg: '#FDF2F8' },
            ].map((s) => (
              <div 
                key={s.label} 
                className="clay-card"
                style={{ 
                  textAlign: 'center', padding: '12px', background: s.bg,
                  border: '2.5px solid var(--game-dark)', boxShadow: '2px 2px 0 var(--game-dark)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{s.icon}</div>
                <div style={{ fontSize: '20px', fontWeight: 950, color: s.color, lineHeight: 1.1 }}>{s.val}</div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BENTO BLOCK 3: Achievement Badges Collection */}
        <div className="clay-card" style={{ padding: '24px', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: 'var(--game-dark)' }}>
              🏆 Lencana Penghargaan
            </h4>
            <span style={{
              background: 'var(--game-purple)', color: '#fff', border: '2px solid var(--game-dark)',
              padding: '2px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 900,
              boxShadow: '2px 2px 0 var(--game-dark)'
            }}>
              {earnedCount}/{achievementList.length}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '12px' }}>
            {achievementList.map((a) => (
              <div
                key={a.id}
                title={a.desc}
                className="clay-card"
                style={{
                  textAlign: 'center', padding: '8px',
                  border: '2.5px solid var(--game-dark)',
                  boxShadow: a.earned ? '3px 3px 0 var(--game-dark)' : 'none',
                  background: a.earned ? 'var(--game-green-light)' : '#F1F5F9',
                  opacity: a.earned ? 1 : 0.5,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
                }}
              >
                <div style={{ fontSize: '24px' }}>{a.emoji}</div>
                <div style={{ 
                  fontSize: '9px', fontWeight: 900, color: 'var(--game-dark)', 
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' 
                }}>
                  {isKidsMode ? a.nameKids : a.name}
                </div>
                {a.earned && (
                  <span style={{ fontSize: '7.5px', fontWeight: 900, color: '#047857', textTransform: 'uppercase' }}>
                    Dapat!
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BENTO BLOCK 4: Gerakan Sholat Checklist Progress */}
        <div className="clay-card" style={{ padding: '24px', background: '#fff', gridColumn: 'span 1', lgGridColumn: 'span 2' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 900, color: 'var(--game-dark)' }}>
            📖 Daftar Penguasaan Gerakan Sholat ({completedMovements}/{SHOLAT_MOVEMENTS.length})
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
            {SHOLAT_MOVEMENTS.map((m) => {
              const done = profile.completedMovements?.includes(m.key) || false;
              return (
                <div 
                  key={m.key} 
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', 
                    borderRadius: '12px', border: '2px solid var(--game-dark)',
                    background: done ? 'rgba(111, 255, 157, 0.15)' : '#F8FAFC',
                    boxShadow: done ? '2px 2px 0 var(--game-dark)' : 'none'
                  }}
                >
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    border: '2px solid var(--game-dark)',
                    background: done ? 'var(--game-green-light)' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {done && <CheckCircle size={12} style={{ color: 'var(--game-dark)' }} />}
                  </div>
                  <span style={{ 
                    fontSize: '12.5px', fontWeight: 800, 
                    color: done ? 'var(--game-dark)' : '#64748B',
                    textDecoration: done ? 'none' : 'none' 
                  }}>
                    {isKidsMode ? m.nameKids : m.name}
                  </span>
                  {done && (
                    <span style={{ 
                      marginLeft: 'auto', fontSize: '9px', fontWeight: 900, 
                      color: '#047857', border: '1px solid #047857', 
                      background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' 
                    }}>
                      Selesai
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
