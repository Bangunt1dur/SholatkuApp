import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Gift, Star, Gem } from 'lucide-react';

export default function TreasureBox({ onClose, rewards = { xp: 50, stars: 3, gems: 1 }, title = 'Level Selesai!' }) {
  const { addXP, addStars, addGems } = useApp();
  const [opened, setOpened] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Award rewards when box shown
    addXP(rewards.xp);
    if (rewards.stars) addStars(rewards.stars);
    if (rewards.gems) addGems(rewards.gems);

    // Spawn confetti
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ['#1AA88E', '#F5A623', '#7C3AED', '#EC4899', '#3B82F6'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.8,
      size: 6 + Math.random() * 6,
    }));
    setConfetti(pieces);

    const t = setTimeout(() => setOpened(true), 200);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="treasure-overlay" onClick={onClose}>
      {/* Confetti */}
      <div className="confetti-wrap">
        {confetti.map((p) => (
          <div
            key={p.id}
            className="confetti-piece"
            style={{
              left: `${p.left}%`,
              background: p.color,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
          />
        ))}
      </div>

      {/* Box Card */}
      <div className="treasure-box-card" onClick={(e) => e.stopPropagation()}>
        <span className="treasure-chest">{opened ? '📦' : '🎁'}</span>

        <h2 style={{ fontSize: 24, fontWeight: 900, color: 'var(--text-dark)', margin: '0 0 6px' }}>
          {title}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
          Kamu mendapatkan hadiah!
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>⭐</div>
            <div style={{ fontWeight: 900, fontSize: 20, color: 'var(--accent)' }}>+{rewards.stars}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>Bintang</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>💎</div>
            <div style={{ fontWeight: 900, fontSize: 20, color: '#7C3AED' }}>+{rewards.gems}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>Gems</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>⚡</div>
            <div style={{ fontWeight: 900, fontSize: 20, color: 'var(--primary)' }}>+{rewards.xp}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>XP</div>
          </div>
        </div>

        <button className="btn btn-primary btn-lg w-full" onClick={onClose}>
          Lanjutkan Petualangan! 🚀
        </button>
      </div>
    </div>
  );
}
