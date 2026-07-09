// src/pages/HomePage.jsx
import { useApp } from '../context/AppContext';
import { SHOLAT_MOVEMENTS } from '../data/sholatData';
import MascotRafi from '../components/Shared/MascotRafi';

export default function HomePage({ setActivePage }) {
  const { profile, prayersDoneToday } = useApp();
  const completedCount = profile.completedMovements?.length || 0;
  const totalMovements = SHOLAT_MOVEMENTS?.length || 11;
  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNext) * 100));

  return (
    <div style={{ padding: '32px 16px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* ATAS: AREA HERO HEROAN & ROBOT RAFI */}
      <section style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div className="mancot-float" style={{ width: '120px', height: '120px', fontSize: '70px', textShadow: '4px 4px 0px #000', textAlign: 'center' }}>
          🤖
        </div>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: '36px', fontWeight: 900, margin: '0 0 4px' }}>
            Let The <span style={{ color: 'var(--game-purple)', backgroundColor: '#fff', border: '3px solid #000', padding: '0 8px', borderRadius: '8px' }}>Pahala</span> Begin!
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, opacity: 0.8, margin: 0 }}>
            Ready for your daily adventure, Champion? Keep up your streak and collect more gems today!
          </p>
        </div>
      </section>

      {/* TENGAH: BENTO GRID STATS (LEVEL, XP, STREAK) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Card Level (Ungu) */}
        <div className="clay-card purple" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, opacity: 0.9 }}>CURRENT LEVEL</span>
            <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '4px 0 0' }}>Level {profile.level}</h2>
          </div>
          <button className="clay-btn" style={{ alignSelf: 'flex-start', fontSize: '13px', padding: '6px 12px' }} onClick={() => setActivePage('profile')}>
            View Badges
          </button>
        </div>

        {/* Card XP Tracker */}
        <div className="clay-card" style={{ gridColumn: 'span 1', minWidth: '280px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 900, margin: 0 }}>XP Tracker</h3>
            <span style={{ backgroundColor: 'var(--game-green-light)', border: '2px solid #000', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 900 }}>
              {profile.xp}/{profile.xpToNext} XP
            </span>
          </div>
          {/* Progress bar tebal silinder figma */}
          <div style={{ height: '32px', backgroundColor: '#eae7e7', borderRadius: '12px', border: '4px solid #000', padding: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${xpPercent}%`, backgroundColor: 'var(--game-green)', borderRadius: '6px', borderRight: '2px solid #000', transition: 'width 0.3s ease' }} />
          </div>
          <p style={{ fontSize: '12px', fontWeight: 700, fontStyle: 'italic', marginTop: '8px', opacity: 0.7 }}>
            Only {profile.xpToNext - profile.xp} XP left until you reach Level {profile.level + 1}!
          </p>
        </div>

        {/* Card Streak */}
        <div className="clay-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '2px' }}>🔥</div>
          <h3 style={{ fontSize: '24px', fontWeight: 900, margin: 0 }}>{profile.streak} Days</h3>
          <p style={{ fontSize: '13px', fontWeight: 700, opacity: 0.8, margin: 0 }}>Amazing Streak!</p>
        </div>
      </div>

      {/* BAWAH: COMPONENT INTERAKTIF MASCOT TALK */}
      <div style={{ marginBottom: '32px' }}>
        <MascotRafi />
      </div>

      {/* TRACK PERJALANAN SHOLAT (Your Prayer Journey) */}
      <h2 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '16px' }}>Misi Hari Ini</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="clay-card" style={{ cursor: 'pointer' }} onClick={() => setActivePage('prayer-guide')}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📖</div>
          <h4 style={{ fontSize: '18px', fontWeight: 900, margin: '0 0 4px' }}>Belajar Sholat</h4>
          <p style={{ fontSize: '12px', fontWeight: 700, opacity: 0.6 }}>{completedCount}/{totalMovements} Gerakan dikuasai</p>
        </div>
        <div className="clay-card" style={{ cursor: 'pointer' }} onClick={() => setActivePage('tracker')}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
          <h4 style={{ fontSize: '18px', fontWeight: 900, margin: '0 0 4px' }}>Cek Sholatku</h4>
          <p style={{ fontSize: '12px', fontWeight: 700, opacity: 0.6 }}>{prayersDoneToday}/5 Waktu sholat terabsen</p>
        </div>
      </div>

    </div>
  );
}