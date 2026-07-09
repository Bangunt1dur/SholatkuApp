import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SHOLAT_MOVEMENTS } from '../data/data';
import TreasureBox from '../components/UI/TreasureBox';
import { Lock, CheckCircle, Star } from 'lucide-react';

const NODE_POSITIONS = [
  { x: 10, y: 85 },
  { x: 28, y: 68 },
  { x: 48, y: 55 },
  { x: 68, y: 65 },
  { x: 82, y: 50 },
  { x: 68, y: 33 },
  { x: 48, y: 22 },
  { x: 30, y: 30 },
  { x: 14, y: 15 },
  { x: 50, y: 8  },
];

export default function Adventure() {
  const { isKidsMode, profile, completeMovement, adventureLevel, setAdventureLevel } = useApp();
  const [selectedNode, setSelectedNode] = useState(null);
  const [showTreasure, setShowTreasure] = useState(false);

  const completedCount = profile.completedMovements.length;

  const handleNodeClick = (idx) => {
    if (idx > completedCount) return; // locked
    setSelectedNode(idx === selectedNode ? null : idx);
  };

  const handleCompleteLevel = (movement) => {
    const wasNew = !profile.completedMovements.includes(movement.key);
    completeMovement(movement.key);
    if (wasNew) {
      setShowTreasure(true);
    }
    setSelectedNode(null);
  };

  const movement = selectedNode !== null ? SHOLAT_MOVEMENTS[selectedNode] : null;

  return (
    <div className="animate-fadeInUp">
      {showTreasure && (
        <TreasureBox
          onClose={() => setShowTreasure(false)}
          rewards={{ xp: 50, stars: 3, gems: 1 }}
          title={isKidsMode ? 'Level Selesai! 🎉' : 'Gerakan Dikuasai!'}
        />
      )}

      <div className="section-title">
        <div className="title-icon">🗺️</div>
        {isKidsMode ? 'Petualangan Sholat 🌟' : 'Adventure Journey'}
      </div>

      {/* Progress */}
      <div className="card mb-4" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8 }}>
              {isKidsMode ? '🗺️ Perjalanan Sholat' : 'Adventure Progress'}
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, margin: '2px 0' }}>
              {completedCount}/{SHOLAT_MOVEMENTS.length} Level
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {completedCount >= SHOLAT_MOVEMENTS.length && (
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: 13, fontWeight: 800 }}>
                🏆 Master Sholat!
              </span>
            )}
          </div>
        </div>
        <div style={{ marginTop: 10, height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(completedCount / SHOLAT_MOVEMENTS.length) * 100}%`, background: 'rgba(255,255,255,0.85)', borderRadius: 'var(--radius-full)', transition: 'width 0.6s ease' }} />
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Adventure Map */}
        <div className="adventure-map" style={{ minHeight: 420 }}>
          <div style={{ textAlign: 'center', marginBottom: 16, fontWeight: 900, fontSize: 14, color: 'var(--primary-dark)' }}>
            {isKidsMode ? '🗺️ Peta Petualangan Sholatku' : 'Journey Map'}
          </div>

          {/* Nodes */}
          <div style={{ position: 'relative', height: 380 }}>
            {/* SVG connecting lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {NODE_POSITIONS.slice(0, -1).map((pos, i) => {
                const next = NODE_POSITIONS[i + 1];
                const done = i < completedCount - 1;
                return (
                  <line
                    key={i}
                    x1={`${pos.x}%`} y1={`${pos.y}%`}
                    x2={`${next.x}%`} y2={`${next.y}%`}
                    stroke={done ? 'var(--primary)' : 'var(--border-strong)'}
                    strokeWidth={3}
                    strokeDasharray={done ? '0' : '6 4'}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {SHOLAT_MOVEMENTS.map((m, i) => {
              const pos = NODE_POSITIONS[i];
              const isCompleted = profile.completedMovements.includes(m.key);
              const isCurrent = i === completedCount;
              const isLocked = i > completedCount;
              const status = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';

              return (
                <div
                  key={m.key}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    zIndex: 1,
                  }}
                >
                  <div
                    className={`journey-node ${status}`}
                    onClick={() => handleNodeClick(i)}
                    title={isLocked ? 'Selesaikan level sebelumnya' : m.name}
                  >
                    {isCompleted ? '✓' : isLocked ? <Lock size={20} /> : m.emoji}
                  </div>
                  <div style={{
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: isLocked ? 'var(--text-muted)' : 'var(--text-dark)',
                    maxWidth: 60,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: 4,
                    padding: '2px 4px',
                  }}>
                    {i + 1}. {isKidsMode ? m.nameKids.split(' ')[0] : m.name.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Detail */}
        <div>
          {movement ? (
            <div className="card animate-fadeInUp">
              <div style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius)', padding: 20, textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>{movement.emoji}</div>
                <div style={{ fontWeight: 900, fontSize: 18, color: 'var(--text-dark)' }}>
                  {isKidsMode ? movement.nameKids : movement.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 700 }}>Level {selectedNode + 1}</div>
              </div>

              {movement.arabicText && (
                <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 12 }}>
                  <div className="arabic-text" style={{ fontSize: 20 }}>{movement.arabicText}</div>
                </div>
              )}

              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 16 }}>
                {isKidsMode ? movement.explanationKids : movement.explanation}
              </div>

              <button
                className={`btn w-full ${profile.completedMovements.includes(movement.key) ? 'btn-ghost' : 'btn-primary'}`}
                onClick={() => handleCompleteLevel(movement)}
                disabled={profile.completedMovements.includes(movement.key)}
              >
                {profile.completedMovements.includes(movement.key)
                  ? <><CheckCircle size={16} /> Level Selesai ✓</>
                  : <><Star size={16} /> Selesaikan Level +50 XP 🎁</>}
              </button>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: 32 }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🗺️</div>
              <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 16, marginBottom: 8 }}>
                {isKidsMode ? 'Pilih Level untuk Dimulai!' : 'Pilih Level di Peta'}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.6 }}>
                {isKidsMode
                  ? 'Klik salah satu lingkaran di peta untuk mulai belajar gerakan sholat! 🌟'
                  : 'Klik node pada peta petualangan untuk melihat detail gerakan sholat.'}
              </div>

              {/* Level list */}
              <div style={{ marginTop: 20, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {SHOLAT_MOVEMENTS.map((m, i) => {
                  const done = profile.completedMovements.includes(m.key);
                  return (
                    <div
                      key={m.key}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 'var(--radius-sm)', background: done ? 'var(--success-light)' : 'var(--bg)', cursor: i <= completedCount ? 'pointer' : 'default', opacity: i > completedCount ? 0.5 : 1 }}
                      onClick={() => i <= completedCount && handleNodeClick(i)}
                    >
                      <span style={{ fontSize: 16 }}>{done ? '✅' : i === completedCount ? '▶️' : '🔒'}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: done ? '#166534' : 'var(--text-dark)' }}>
                        {i + 1}. {isKidsMode ? m.nameKids : m.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
