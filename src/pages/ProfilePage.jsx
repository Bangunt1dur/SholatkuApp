// src/pages/ProfilePage.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS, SHOLAT_MOVEMENTS } from '../data/data';
import { Edit2, Award as Trophy } from 'lucide-react';

export default function ProfilePage() {
  const { userMode, profile, setProfile, isKidsMode } = useApp();
  const isKids = userMode === 'kids' || isKidsMode;

  const xpPercent = Math.min(100, Math.round(((profile?.xp || 0) / (profile?.xpToNext || 100)) * 100)) || 0;

  const handleNameChange = () => {
    const newName = prompt('Masukkan nama baru:', profile?.name);
    if (newName && newName.trim()) {
      setProfile(p => ({ ...p, name: newName.trim() }));
    }
  };

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
    <div className="animate-fadeInUp" style={{ padding: '16px', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #000', paddingBottom: '12px', marginBottom: '24px' }}>
        <Trophy size={24} style={{ color: isKids ? 'var(--game-purple)' : '#113C2B' }} />
        <h2 style={{ 
          fontFamily: isKids ? 'var(--font-headline)' : 'Playfair Display, serif', 
          fontSize: '24px', fontWeight: 900, 
          color: '#113C2B', 
          margin: 0 
        }}>
          {isKids ? 'Profil Ku 🌟' : 'Profil Saya'}
        </h2>
      </div>

      {/* Responsive Bento Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* BENTO BLOCK 1: Identity & XP Ring */}
        <div className="card" style={{ textAlign: 'center', padding: '24px', background: '#fff', borderRadius: '24px', border: '4px solid #000', boxShadow: '6px 6px 0px #000' }}>
          
          <div style={{ 
            width: '96px', height: '96px', borderRadius: '50%', 
            background: isKids ? 'linear-gradient(135deg, var(--game-purple) 0%, var(--game-purple-dark) 100%)' : 'linear-gradient(135deg, #113C2B, #082218)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '44px', margin: '0 auto 16px', border: '3px solid #000', 
            boxShadow: '4px 4px 0 #000', position: 'relative'
          }}>
            {isKids ? '🧒' : '👤'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '22px', fontWeight: 950, color: '#113C2B', margin: 0 }}>
              {profile.name}
            </h3>
            <button 
              onClick={handleNameChange} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#113C2B' }}
            >
              <Edit2 size={16} />
            </button>
          </div>

          <span style={{ 
            display: 'inline-block', background: 'var(--game-yellow)', color: 'var(--game-dark)', 
            border: '2.5px solid #000', padding: '4px 14px', borderRadius: '99px', 
            fontSize: '12px', fontWeight: 900, boxShadow: '2px 2px 0 #000', marginBottom: '20px'
          }}>
            🗺️ Level {profile.level || 1} Explorer
          </span>

          {/* Circular SVG Level Progress Tracker */}
          <div style={{ margin: '0 auto 16px', position: 'relative', width: '100px', height: '100px' }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke={isKids ? "var(--game-purple)" : "#113C2B"} strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - xpPercent / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontWeight: 950, fontSize: '24px', color: '#113C2B', lineHeight: 1 }}>{profile.level || 1}</div>
              <div style={{ fontSize: '9px', fontWeight: 900, color: '#64748B' }}>LEVEL</div>
            </div>
          </div>

          <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B' }}>
            {profile.xp || 0} / {profile.xpToNext || 100} XP
          </div>
          
          <div style={{ 
            marginTop: '8px', height: '16px', background: '#F1F5F9', borderRadius: '10px', 
            overflow: 'hidden', border: '2.5px solid #000', padding: '2px' 
          }}>
            <div style={{ height: '100%', width: `${xpPercent}%`, background: 'var(--game-green-light)', borderRadius: '6px', transition: 'width 0.4s' }} />
          </div>
        </div>

        {/* BENTO BLOCK 2: 6 Stats Grid Badges */}
        <div className="card" style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '4px solid #000', boxShadow: '6px 6px 0px #000' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 900, color: '#113C2B' }}>
            📊 Statistik Pencapaian Belajar
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { icon: '⭐', val: profile.stars || 0, label: 'Bintang', color: '#B45309', bg: '#FEF3C7' },
              { icon: '💎', val: profile.gems || 0, label: 'Gems', color: '#6D28D9', bg: '#F5F3FF' },
              { icon: '🔥', val: profile.streak || 0, label: 'Hari Streak', color: '#B91C1C', bg: '#FEF2F2' },
              { icon: '🏅', val: earnedCount, label: 'Badge Diraih', color: '#047857', bg: '#ECFDF5' },
              { icon: '📖', val: completedMovements, label: 'Gerakan Selesai', color: '#1D4ED8', bg: '#EFF6FF' },
              { icon: '🧠', val: profile.quizCorrect || 0, label: 'Kuis Benar', color: '#BE185D', bg: '#FDF2F8' },
            ].map((s) => (
              <div 
                key={s.label} 
                style={{ 
                  textAlign: 'center', padding: '12px', background: s.bg,
                  borderRadius: '16px', border: '2.5px solid #000', boxShadow: '2px 2px 0 #000',
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

      </div>

      {/* BENTO BLOCK 3: Achievement Badges Collection */}
      <div className="card" style={{ marginTop: '24px', padding: '24px', background: '#fff', borderRadius: '24px', border: '4px solid #000', boxShadow: '6px 6px 0px #000' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 900, color: '#113C2B', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🏅 Koleksi Badge Pencapaian ({earnedCount}/{achievementList.length})
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {achievementList.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '14px',
                borderRadius: '16px',
                border: '2.5px solid #000',
                backgroundColor: a.earned ? '#ECFDF5' : '#F8FAFC',
                boxShadow: a.earned ? '3px 3px 0 #000' : 'none',
                opacity: a.earned ? 1 : 0.6,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ fontSize: '32px', filter: a.earned ? 'none' : 'grayscale(100%)' }}>
                {a.icon || '🏆'}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 900, color: a.earned ? '#047857' : '#475569' }}>
                  {a.title}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', marginTop: '2px' }}>
                  {a.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
