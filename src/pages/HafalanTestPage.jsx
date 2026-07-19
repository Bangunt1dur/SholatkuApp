// src/pages/HafalanTestPage.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, RefreshCw, Send, ArrowLeft } from 'lucide-react';
import TreasureBox from '../components/UI/TreasureBox';

export default function HafalanTestPage() {
  const { movements, submitHafalan, submissions, activeChild, isMobile } = useApp();
  const [selectedMovement, setSelectedMovement] = useState(null);

  const [words, setWords] = useState([]);
  const [scrambled, setScrambled] = useState([]);
  const [arranged, setArranged] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const testableMovements = movements.filter(m => m.latin && m.key !== 'qiyam');

  const startTest = (m) => {
    setSelectedMovement(m);
    setSubmitted(false);
    setIsCompleted(false);
    setIsWrong(false);
    setArranged([]);

    const cleanLatin = m.latin.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').replace(/\s{2,}/g, ' ');
    const wordsList = cleanLatin.split(' ').filter(w => w.length > 0);
    setWords(wordsList);
    const scrambledList = [...wordsList].sort(() => Math.random() - 0.5);
    setScrambled(scrambledList.map((w, index) => ({ id: index, val: w })));
  };

  const handleWordTap = (wordObj) => {
    if (isCompleted) return;
    setArranged([...arranged, wordObj.val]);
    setScrambled(scrambled.filter(w => w.id !== wordObj.id));
  };

  const handleRemoveWord = (wordVal, index) => {
    if (isCompleted) return;
    const newArranged = [...arranged];
    newArranged.splice(index, 1);
    setArranged(newArranged);
    setScrambled([...scrambled, { id: Date.now() + index, val: wordVal }]);
  };

  const checkAnswer = () => {
    const isCorrect = arranged.join(' ').toLowerCase() === words.join(' ').toLowerCase();
    if (isCorrect) {
      setIsCompleted(true);
      setIsWrong(false);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 2000);
    }
  };

  const resetGame = () => {
    if (selectedMovement) startTest(selectedMovement);
  };

  const handleSendToParent = () => {
    if (!selectedMovement) return;
    const res = submitHafalan(selectedMovement.key, selectedMovement.nameKids || selectedMovement.name);
    if (res.success) {
      setSubmitted(true);
      setShowConfetti(true);
    }
  };

  const mySubmissions = submissions.filter(s => activeChild && s.childId === activeChild.id);
  const getMovementStatus = (key) => {
    const sub = mySubmissions.find(s => s.movementKey === key);
    if (!sub) return null;
    return sub.status === 'graded' ? `graded-${sub.score}` : 'pending';
  };

  // Di mobile: tampilkan workspace game kalau sudah pilih gerakan
  const showGameOnly = isMobile && selectedMovement !== null;

  return (
    <div className="animate-fadeInUp" style={{ padding: isMobile ? '12px' : '20px' }}>
      {showConfetti && (
        <TreasureBox
          onClose={() => setShowConfetti(false)}
          rewards={{ xp: 30, stars: 2, gems: 0 }}
          title="Hafalan Disetorkan! 🚀"
        />
      )}

      {/* Tombol kembali di mobile saat game aktif */}
      {showGameOnly ? (
        <button
          onClick={() => setSelectedMovement(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontWeight: 900, fontSize: '14px', color: 'var(--game-dark)',
            marginBottom: '16px', padding: '4px 0',
          }}
        >
          <ArrowLeft size={18} />
          Kembali ke Pilihan Doa
        </button>
      ) : (
        <div className="section-title" style={{ marginBottom: '20px' }}>
          <div className="title-icon">🧠</div>
          Game Tes Hafalan Doa Sholat 🎉
        </div>
      )}

      {!isMobile ? (
        /* ── DESKTOP: 2-kolom grid ── */
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', alignItems: 'start' }}>
          <MovementSelector
            testableMovements={testableMovements}
            selectedMovement={selectedMovement}
            getMovementStatus={getMovementStatus}
            onSelect={startTest}
          />
          <GameWorkspace
            selectedMovement={selectedMovement}
            arranged={arranged}
            scrambled={scrambled}
            isCompleted={isCompleted}
            isWrong={isWrong}
            submitted={submitted}
            onWordTap={handleWordTap}
            onRemoveWord={handleRemoveWord}
            onCheck={checkAnswer}
            onReset={resetGame}
            onSend={handleSendToParent}
          />
        </div>
      ) : (
        /* ── MOBILE: satu kolom ── */
        <>
          {!showGameOnly ? (
            <MovementSelector
              testableMovements={testableMovements}
              selectedMovement={selectedMovement}
              getMovementStatus={getMovementStatus}
              onSelect={startTest}
            />
          ) : (
            <GameWorkspace
              selectedMovement={selectedMovement}
              arranged={arranged}
              scrambled={scrambled}
              isCompleted={isCompleted}
              isWrong={isWrong}
              submitted={submitted}
              onWordTap={handleWordTap}
              onRemoveWord={handleRemoveWord}
              onCheck={checkAnswer}
              onReset={resetGame}
              onSend={handleSendToParent}
            />
          )}
        </>
      )}
    </div>
  );
}

/* ── Sub-component: Selector daftar gerakan ── */
function MovementSelector({ testableMovements, selectedMovement, getMovementStatus, onSelect }) {
  return (
    <div className="clay-card" style={{ padding: '20px' }}>
      <h4 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 900, color: 'var(--game-dark)' }}>
        🎯 Pilih Doa yang Ingin Dites:
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {testableMovements.map((m) => {
          const status = getMovementStatus(m.key);
          const isSelected = selectedMovement?.key === m.key;
          return (
            <button
              key={m.key}
              onClick={() => onSelect(m)}
              className="hover-lift"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 14px',
                border: isSelected ? '3px solid var(--game-purple)' : '2px solid #000',
                borderRadius: '14px',
                background: isSelected ? 'var(--mint-bg)' : '#fff',
                textAlign: 'left', cursor: 'pointer', fontWeight: 900, fontSize: '13px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{m.emoji || '📖'}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.nameKids || m.name}
                </span>
              </div>
              <div style={{ flexShrink: 0, marginLeft: '8px' }}>
                {status === 'pending' && (
                  <span style={{ fontSize: '9px', background: 'var(--accent-light)', color: 'var(--accent-dark)', padding: '2px 6px', borderRadius: '6px' }}>
                    ⏳ Menunggu
                  </span>
                )}
                {status?.startsWith('graded-') && (
                  <span style={{ fontSize: '9px', background: '#F0FDF4', color: '#166534', padding: '2px 6px', borderRadius: '6px' }}>
                    ⭐ {status.split('-')[1]}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Sub-component: Workspace game kuis ── */
function GameWorkspace({ selectedMovement, arranged, scrambled, isCompleted, isWrong, submitted, onWordTap, onRemoveWord, onCheck, onReset, onSend }) {
  if (!selectedMovement) {
    return (
      <div className="clay-card" style={{ textAlign: 'center', padding: '48px 20px', border: '3px dashed #CBD5E0', background: '#F7FAFC' }}>
        <span style={{ fontSize: '60px', display: 'block', marginBottom: '12px' }}>🎯</span>
        <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 900, color: 'var(--game-dark)' }}>Mulai Uji Hafalan</h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#718096', fontWeight: 700 }}>
          Pilih salah satu gerakan sholat untuk menguji hafalan doa sholatmu! 🌟
        </p>
      </div>
    );
  }

  return (
    <div className="clay-card" style={{ padding: '20px', border: '3px solid #000', background: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '18px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 950, color: 'var(--game-purple)' }}>
          📖 {selectedMovement.nameKids || selectedMovement.name}
        </h3>
        <button onClick={onReset} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 800, color: 'var(--game-purple)' }}>
          <RefreshCw size={12} /> Ulangi
        </button>
      </div>

      {/* Referensi Arab */}
      <div style={{ background: '#F7FAFC', border: '2px solid #E2E8F0', borderRadius: '12px', padding: '12px', textAlign: 'center', marginBottom: '18px' }}>
        <div style={{ fontSize: '18px', direction: 'rtl', fontFamily: 'serif', lineHeight: 1.8, marginBottom: '4px' }}>
          {selectedMovement.arabicText}
        </div>
        <div style={{ fontSize: '11px', color: '#718096', fontWeight: 700 }}>
          💡 Bacaan Arab di atas membantumu menyusun urutan kata Latin!
        </div>
      </div>

      {/* Zone susunan kata */}
      <div style={{
        minHeight: '72px', border: isWrong ? '3px solid #E53E3E' : '3px solid #000',
        borderRadius: '16px', padding: '12px', background: isWrong ? '#FFF5F5' : '#fff',
        marginBottom: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center',
        transition: 'border-color 0.2s, background 0.2s',
      }}>
        {arranged.length === 0 && (
          <span style={{ color: '#A0AEC0', fontSize: '13px', fontWeight: 800 }}>
            Ketuk kata-kata di bawah untuk menyusun bacaan...
          </span>
        )}
        {arranged.map((w, index) => (
          <button
            key={index}
            onClick={() => onRemoveWord(w, index)}
            className="clay-btn purple btn-sm animate-fadeIn"
            style={{ padding: '6px 12px', fontSize: '12.5px', textTransform: 'none' }}
          >
            {w} ×
          </button>
        ))}
      </div>

      {/* Kata acak pilihan */}
      {!isCompleted && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px', padding: '12px', background: '#F7FAFC', borderRadius: '12px', border: '2px dashed #CBD5E0' }}>
          {scrambled.map((wObj) => (
            <button
              key={wObj.id}
              onClick={() => onWordTap(wObj)}
              className="clay-btn btn-sm"
              style={{ padding: '6px 12px', fontSize: '12.5px', background: '#fff', textTransform: 'none' }}
            >
              {wObj.val}
            </button>
          ))}
        </div>
      )}

      {/* Tombol aksi */}
      {!isCompleted ? (
        <button
          onClick={onCheck}
          disabled={arranged.length === 0}
          className="clay-btn purple"
          style={{ width: '100%', padding: '12px', fontSize: '14px' }}
        >
          ✨ Periksa Hafalanku!
        </button>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F0FDF4', border: '2px solid #38A169', borderRadius: '12px', padding: '12px', color: '#276749', fontWeight: 800, fontSize: '13px', marginBottom: '14px' }}>
            <CheckCircle2 size={18} />
            Yey! Susunan doa kamu sudah benar! Kamu pintar sekali! ⭐
          </div>
          {!submitted ? (
            <button
              onClick={onSend}
              className="clay-btn yellow"
              style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px' }}
            >
              <Send size={16} /> Setor Hafalan ke Orang Tua (+30 XP)
            </button>
          ) : (
            <div style={{ background: 'var(--primary-light)', border: '2px solid var(--primary)', borderRadius: '12px', padding: '12px', color: 'var(--primary-dark)', fontWeight: 800, fontSize: '13px', textAlign: 'center' }}>
              🚀 Setoran berhasil dikirim! Beritahu Papa/Mama untuk memberikan nilai ya!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
