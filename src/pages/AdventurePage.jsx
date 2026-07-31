// src/pages/AdventurePage.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SHOLAT_MOVEMENTS } from '../data/data';
import TreasureBox from '../components/UI/TreasureBox';
import { Lock, CheckCircle, Star, Sparkles } from 'lucide-react';

export default function AdventurePage() {
  const { userMode, profile, completeMovement, isKidsMode } = useApp();
  const isKids = userMode === 'kids' || isKidsMode;
  const [selectedNode, setSelectedNode] = useState(0);
  const [showTreasure, setShowTreasure] = useState(false);

  const completedCount = profile?.completedMovements?.length || 0;

  const handleNodeClick = (idx) => {
    if (idx > completedCount) return;
    setSelectedNode(idx);
  };

  const handleCompleteLevel = (movement) => {
    const wasNew = !profile?.completedMovements?.includes(movement.key);
    completeMovement(movement.key);
    if (wasNew) {
      setShowTreasure(true);
    }
  };

  const currentMovement = SHOLAT_MOVEMENTS[selectedNode];

  return (
    <div className="animate-fadeInUp" style={{ paddingBottom: '40px' }}>
      
      {showTreasure && (
        <TreasureBox
          onClose={() => setShowTreasure(false)}
          rewards={{ xp: 50, stars: 3, gems: 1 }}
          title={isKids ? 'Level Selesai! 🎉' : 'Gerakan Dikuasai!'}
        />
      )}

      {/* Progress Stats Card */}
      <div className="clay-card mb-4" style={{ 
        background: 'linear-gradient(135deg, var(--game-purple) 0%, var(--game-purple-dark) 100%)', 
        color: 'white', border: '3px solid var(--game-dark)', padding: '20px', borderRadius: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>
              {isKids ? '🗺️ Progress Petualangan Sholat' : 'Adventure Progress'}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, margin: '4px 0', fontFamily: 'var(--font-headline)' }}>
              {completedCount} <span style={{ fontSize: '15px', fontWeight: 700, opacity: 0.8 }}>dari {SHOLAT_MOVEMENTS.length} Gerakan Selesai</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ 
              background: '#fff', color: 'var(--game-purple-dark)', border: '2px solid var(--game-dark)',
              padding: '6px 14px', borderRadius: '12px', fontSize: '12.5px', fontWeight: 900,
              boxShadow: '2px 2px 0 var(--game-dark)'
            }}>
              ⭐ {profile?.stars || 0} Bintang
            </span>
            <span style={{ 
              background: '#ffe500', color: 'var(--game-dark)', border: '2px solid var(--game-dark)',
              padding: '6px 14px', borderRadius: '12px', fontSize: '12.5px', fontWeight: 900,
              boxShadow: '2px 2px 0 var(--game-dark)'
            }}>
              💎 {profile?.gems || 0} Gems
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: '14px', height: '14px', background: 'rgba(0,0,0,0.25)', borderRadius: '10px', overflow: 'hidden', border: '2px solid var(--game-dark)' }}>
          <div style={{ 
            height: '100%', 
            width: `${Math.max(4, (completedCount / SHOLAT_MOVEMENTS.length) * 100)}%`, 
            background: '#6fff9d', 
            transition: 'width 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
          }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        
        {/* Stepper Path Card */}
        <div className="clay-card" style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '4px solid #000', boxShadow: '4px 4px 0px #000' }}>
          <h3 style={{ 
            fontFamily: 'var(--font-headline)', fontWeight: 900, fontSize: '18px', 
            color: 'var(--game-dark)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' 
          }}>
            🗺️ Jalur Belajar Sholat Kita!
          </h3>

          <div style={{ 
            overflowX: 'auto', padding: '16px 8px', display: 'flex', gap: '16px', 
            alignItems: 'center', position: 'relative', border: '2px solid #E2E8F0', 
            borderRadius: '16px', background: '#F8FAFC', scrollbarWidth: 'thin'
          }}>
            {SHOLAT_MOVEMENTS.map((m, i) => {
              const isCompleted = profile?.completedMovements?.includes(m.key) || false;
              const isCurrent = i === completedCount;
              const isLocked = i > completedCount;
              const isSelected = i === selectedNode;

              let bg = '#E2E8F0';
              let color = '#718096';

              if (isCompleted) {
                bg = 'var(--game-green-light)';
                color = 'var(--game-dark)';
              } else if (isCurrent) {
                bg = 'var(--game-purple)';
                color = '#fff';
              }

              return (
                <div 
                  key={m.key} 
                  style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                  <div 
                    onClick={() => !isLocked && handleNodeClick(i)}
                    style={{
                      cursor: isLocked ? 'default' : 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      border: isSelected ? '4px solid var(--game-purple)' : '3px solid var(--game-dark)',
                      background: bg, color: color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px',
                      boxShadow: isSelected ? '0 0 12px var(--game-purple)' : '3px 3px 0 rgba(0,0,0,0.1)',
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                      {isCompleted ? '✓' : isLocked ? <Lock size={20} style={{ color: '#94A3B8' }} /> : m.emoji}
                    </div>

                    <span style={{ 
                      fontSize: '11px', fontWeight: 800, 
                      color: isSelected ? 'var(--game-purple)' : 'var(--game-dark)',
                      maxWidth: '80px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>
                      {m.nameKids ? m.nameKids.split(' ')[0] : m.name}
                    </span>
                  </div>

                  {i < SHOLAT_MOVEMENTS.length - 1 && (
                    <div style={{
                      width: '40px', height: '6px',
                      background: isCompleted ? 'var(--game-green-light)' : '#E2E8F0',
                      border: '2px solid var(--game-dark)',
                      borderRadius: '4px'
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Workspace Detail Card */}
        {currentMovement && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            <div className="clay-card" style={{ 
              background: '#fff', border: '3px solid var(--game-dark)', padding: '24px', borderRadius: '24px',
              display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center', textAlign: 'center'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--game-purple)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Level {selectedNode + 1} • {currentMovement.key}
              </span>
              
              <div style={{ 
                margin: '20px 0', width: '160px', height: '160px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--game-green-light) 0%, #CFFAEA 100%)',
                border: '3px solid var(--game-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '4px 4px 0 var(--game-dark)', position: 'relative'
              }}>
                {currentMovement.image ? (
                  <img src={currentMovement.image} alt={currentMovement.name} style={{ width: '110px', height: '110px', objectFit: 'contain' }} />
                ) : (
                  <div style={{ fontSize: '80px', animation: 'float 3s ease-in-out infinite' }}>{currentMovement.emoji}</div>
                )}
              </div>

              <h3 style={{ fontFamily: 'var(--font-headline)', fontWeight: 950, fontSize: '22px', color: 'var(--game-dark)', margin: '0 0 4px' }}>
                {currentMovement.nameKids || currentMovement.name}
              </h3>
              <p style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, margin: 0 }}>
                Rujukan: HPT Muhammadiyah
              </p>
            </div>

            <div className="clay-card" style={{ background: '#fff', border: '3px solid var(--game-dark)', padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--game-purple)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  📖 Lafal Doa Gerakan
                </span>

                {currentMovement.arabicText ? (
                  <div style={{ background: '#FAF9F6', border: '2px solid var(--game-dark)', borderRadius: '12px', padding: '12px 16px', marginBottom: '12px', boxShadow: '3px 3px 0 var(--game-dark)' }}>
                    <div style={{ fontSize: '20px', textAlign: 'right', fontWeight: 600, direction: 'rtl', fontFamily: 'serif', lineHeight: '2.0', color: '#0F172A' }}>
                      {currentMovement.arabicText}
                    </div>
                  </div>
                ) : (
                  <div style={{ background: '#F1F5F9', border: '2px solid var(--game-dark)', borderRadius: '12px', padding: '10px 14px', marginBottom: '12px', fontSize: '12px', fontWeight: 700, color: '#64748B', fontStyle: 'italic' }}>
                    Tanpa bacaan doa khusus (gerakan berdiri/perpindahan).
                  </div>
                )}

                {currentMovement.latin && (
                  <p style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 700, fontStyle: 'italic', color: '#334155' }}>
                    "{currentMovement.latin}"
                  </p>
                )}

                <div style={{ background: 'rgba(255, 209, 102, 0.1)', border: '2px solid #FFE8A3', borderRadius: '10px', padding: '12px', marginTop: '12px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#B45309', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
                    💡 Cara Gerakannya:
                  </span>
                  <p style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: '#1E293B', lineHeight: 1.5 }}>
                    {currentMovement.explanationKids || currentMovement.explanation}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                {(() => {
                  const isCompleted = profile?.completedMovements?.includes(currentMovement.key) || false;
                  return (
                    <button
                      onClick={() => handleCompleteLevel(currentMovement)}
                      disabled={isCompleted}
                      className={isCompleted ? "clay-btn w-full" : "clay-btn yellow w-full"}
                      style={{ padding: '14px', borderRadius: '14px', border: '3px solid #000', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: isCompleted ? 0.6 : 1, cursor: isCompleted ? 'default' : 'pointer' }}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle size={18} />
                          Level Selesai Dikuasai ✓
                        </>
                      ) : (
                        <>
                          <Star size={18} fill="currentColor" />
                          Selesaikan Level (+50 XP) 🎁
                        </>
                      )}
                    </button>
                  );
                })()}
              </div>
            </div>

          </div>
        )}

        {/* List of Movements */}
        <div className="clay-card" style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '4px solid #000', boxShadow: '4px 4px 0px #000' }}>
          <h3 style={{ 
            fontFamily: 'var(--font-headline)', fontWeight: 900, fontSize: '18px', 
            color: 'var(--game-dark)', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' 
          }}>
            <Sparkles size={18} style={{ color: 'var(--game-yellow)' }} />
            Daftar Pembelajaran Gerakan Sholat
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {SHOLAT_MOVEMENTS.map((m, i) => {
              const isCompleted = profile?.completedMovements?.includes(m.key) || false;
              const isCurrent = i === completedCount;
              const isLocked = i > completedCount;

              let statusText = 'Terkunci 🔒';
              let badgeBg = '#F1F5F9';
              let badgeColor = '#64748B';

              if (isCompleted) {
                statusText = 'Selesai ✓';
                badgeBg = '#ECFDF5';
                badgeColor = '#047857';
              } else if (isCurrent) {
                statusText = 'Sedang Dipelajari ⚡';
                badgeBg = '#FEF3C7';
                badgeColor = '#B45309';
              }

              return (
                <div
                  key={m.key}
                  onClick={() => !isLocked && handleNodeClick(i)}
                  style={{
                    cursor: isLocked ? 'default' : 'pointer',
                    padding: '16px', background: '#fff', border: '2.5px solid var(--game-dark)',
                    borderRadius: '16px', boxShadow: '3px 3px 0 var(--game-dark)',
                    opacity: isLocked ? 0.5 : 1, display: 'flex', gap: '12px', alignItems: 'center',
                    backgroundColor: i === selectedNode ? '#ECFDF5' : '#fff',
                    borderColor: i === selectedNode ? 'var(--game-purple)' : 'var(--game-dark)',
                    transition: 'all 0.15s'
                  }}
                >
                  <span style={{ fontSize: '32px' }}>{isLocked ? '🔒' : m.emoji}</span>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      fontWeight: 900, fontSize: '13.5px', color: 'var(--game-dark)', 
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
                    }}>
                      {m.nameKids || m.name}
                    </div>
                    <span style={{
                      display: 'inline-block', fontSize: '10px', fontWeight: 800, marginTop: '4px',
                      padding: '2px 8px', borderRadius: '6px', border: '1px solid currentColor',
                      backgroundColor: badgeBg, color: badgeColor
                    }}>
                      {statusText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}