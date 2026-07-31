import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { QUIZ_QUESTIONS, SHOLAT_MOVEMENTS } from '../data/data';
import { CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react';

// ─── Multiple Choice Quiz ─────────────────────────────────────
function MultipleChoiceQuiz({ question, isKidsMode, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === question.correct;
    setTimeout(() => onAnswer(correct), 1200);
  };

  return (
    <div className="animate-fadeIn">
      <h3 style={{ fontWeight: 900, fontSize: 18, color: '#000', lineHeight: 1.4, marginBottom: 20, padding: '16px', background: '#f8fafc', border: '3px solid #000', borderRadius: '16px', boxShadow: '4px 4px 0px #000' }}>
        {isKidsMode ? question.questionKids : question.question}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {question.options.map((opt, i) => {
          const isCorrect = answered && i === question.correct;
          const isWrong = answered && i === selected && i !== question.correct;
          const isSelected = !answered && i === selected;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 18px', borderRadius: '14px', cursor: answered ? 'default' : 'pointer',
                fontWeight: 900, fontSize: 14, textAlign: 'left',
                border: `3px solid #000`,
                background: isCorrect ? 'var(--game-green-light)' : isWrong ? '#fecdd3' : isSelected ? 'var(--game-yellow)' : '#fff',
                boxShadow: isCorrect ? '3px 3px 0px #166534' : isWrong ? '3px 3px 0px #be123c' : isSelected ? '3px 3px 0px #000' : '3px 3px 0px #000',
                transform: isCorrect || isWrong ? 'translate(1px, 1px)' : 'none',
                transition: 'all 0.1s ease'
              }}
            >
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2.5px solid #000', backgroundColor: isCorrect ? 'var(--game-green)' : isWrong ? '#f43f5e' : isSelected ? 'var(--game-purple)' : '#e2e8f0', color: isCorrect || isWrong || isSelected ? '#fff' : '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, flexShrink: 0 }}>
                {['A', 'B', 'C', 'D'][i]}
              </span>
              {opt}
              {isCorrect && <span style={{ marginLeft: 'auto', fontSize: 18 }}>✅</span>}
              {isWrong && <span style={{ marginLeft: 'auto', fontSize: 18 }}>❌</span>}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: 16, padding: '14px', borderRadius: '14px', border: '3px solid #000', background: selected === question.correct ? 'var(--game-green-light)' : '#fecdd3', fontSize: 13, fontWeight: 800, color: '#000', boxShadow: '3px 3px 0px #000' }} className="animate-fadeIn">
          {selected === question.correct ? '🎉 Benar! +15 XP ' : '❌ Jawaban kurang tepat. '}
          {question.explanation}
        </div>
      )}
    </div>
  );
}

// ─── Order Quiz (Susun Urutan) ────────────────────────────────
function OrderQuiz({ isKidsMode, onAnswer }) {
  const shuffled = useMemo(() => {
    const items = SHOLAT_MOVEMENTS.map((m, i) => ({ id: m.key, label: isKidsMode ? m.nameKids : m.name, order: i }));
    return [...items].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [isKidsMode]);

  const [arranged, setArranged] = useState([...shuffled]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const moveUp = (idx) => {
    if (idx === 0) return;
    const arr = [...arranged];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setArranged(arr);
  };

  const moveDown = (idx) => {
    if (idx === arranged.length - 1) return;
    const arr = [...arranged];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setArranged(arr);
  };

  const checkAnswer = () => {
    const sortedByOrder = [...arranged].sort((a, b) => a.order - b.order);
    const isCorrect = arranged.every((item, i) => item.id === sortedByOrder[i].id);
    setChecked(true);
    setCorrect(isCorrect);
    setTimeout(() => onAnswer(isCorrect), 1500);
  };

  return (
    <div className="animate-fadeIn">
      <h3 style={{ fontWeight: 900, fontSize: 17, color: 'var(--text-dark)', lineHeight: 1.4, marginBottom: 8 }}>
        {isKidsMode ? 'Urutkan gerakan sholat dari awal sampai akhir! ⬆️⬇️' : 'Susun urutan gerakan sholat yang benar!'}
      </h3>
      <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 16, fontWeight: 600 }}>
        Gunakan tombol ↑↓ untuk mengatur urutan
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {arranged.map((item, idx) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 28, background: 'var(--game-yellow)', color: '#000', border: '2.5px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0 }}>
              {idx + 1}
            </span>
            <div style={{ flex: 1, padding: '10px 14px', background: '#fff', border: '3px solid #000', borderRadius: '12px', fontWeight: 800, fontSize: 13, boxShadow: '2px 2px 0px #000' }}>{item.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button onClick={() => moveUp(idx)} disabled={idx === 0 || checked} style={{ width: 30, height: 30, borderRadius: '8px', border: '2.5px solid #000', background: '#f8fafc', cursor: 'pointer', fontWeight: 900, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '1px 1px 0px #000' }}>↑</button>
              <button onClick={() => moveDown(idx)} disabled={idx === arranged.length - 1 || checked} style={{ width: 30, height: 30, borderRadius: '8px', border: '2.5px solid #000', background: '#f8fafc', cursor: 'pointer', fontWeight: 900, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '1px 1px 0px #000' }}>↓</button>
            </div>
          </div>
        ))}
      </div>
      {!checked && (
        <button className="btn btn-primary w-full" onClick={checkAnswer}>
          ✅ Cek Jawaban
        </button>
      )}
      {checked && (
        <div style={{ padding: '14px', borderRadius: '14px', border: '3px solid #000', background: correct ? 'var(--game-green-light)' : '#fecdd3', fontWeight: 900, color: '#000', fontSize: 13, boxShadow: '3px 3px 0px #000' }} className="animate-fadeIn">
          {correct ? '🎉 Urutan sudah benar! Luar biasa! +15 XP' : "❌ Belum tepat. Urutan sholat: Qiyam → Takbir → Bersedekap → Al-Fatihah → Ruku → I'tidal → Sujud → Duduk → Tasyahud → Salam"}
        </div>
      )}
    </div>
  );
}

// ─── Match Quiz ───────────────────────────────────────────────
function MatchQuiz({ isKidsMode, onAnswer }) {
  const items = useMemo(() =>
    SHOLAT_MOVEMENTS.slice(0, 5).map((m) => ({ key: m.key, name: isKidsMode ? m.nameKids : m.name, emoji: m.emoji }))
  , [isKidsMode]);

  const shuffledEmojis = useMemo(() => [...items].sort(() => Math.random() - 0.5), [items]);

  const [selected, setSelected] = useState({ name: null, emoji: null });
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState([]);

  const selectName = (key) => {
    if (matched.find(m => m.name === key) || wrong.includes(key)) return;
    setSelected(s => ({ ...s, name: key }));
  };

  const selectEmoji = (key) => {
    if (matched.find(m => m.emoji === key)) return;
    const nameKey = selected.name;
    if (!nameKey) return;
    if (nameKey === key) {
      const newMatched = [...matched, { name: key, emoji: key }];
      setMatched(newMatched);
      setSelected({ name: null, emoji: null });
      if (newMatched.length === items.length) {
        setTimeout(() => onAnswer(true), 800);
      }
    } else {
      setWrong(w => [...w, nameKey]);
      setTimeout(() => { setSelected({ name: null, emoji: null }); setWrong([]); }, 800);
    }
  };

  return (
    <div className="animate-fadeIn">
      <h3 style={{ fontWeight: 900, fontSize: 17, color: 'var(--text-dark)', lineHeight: 1.4, marginBottom: 8 }}>
        {isKidsMode ? 'Cocokkan nama gerakan dengan gambarnya! 🎯' : 'Cocokkan gerakan sholat dengan ikonnya!'}
      </h3>
      <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 16, fontWeight: 600 }}>
        Pilih nama gerakan lalu pilih ikonnya yang sesuai
      </p>
      <div className="grid-2" style={{ gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Nama Gerakan</div>
          {items.map((item) => {
            const isMatched = matched.find(m => m.name === item.key);
            const isWrong = wrong.includes(item.key);
            const isSelected = selected.name === item.key;
            return (
              <button key={item.key}
                onClick={() => selectName(item.key)}
                style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: `2px solid ${isMatched ? 'var(--success)' : isWrong ? 'var(--danger)' : isSelected ? 'var(--primary)' : 'var(--border)'}`, background: isMatched ? 'var(--success-light)' : isWrong ? 'var(--danger-light)' : isSelected ? 'var(--primary-light)' : 'var(--bg-card)', fontWeight: 800, fontSize: 13, textAlign: 'left', cursor: isMatched ? 'default' : 'pointer', opacity: isMatched ? 0.7 : 1 }}
              >
                {isMatched ? '✓ ' : ''}{item.name}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Ikon Gerakan</div>
          {shuffledEmojis.map((item) => {
            const isMatched = matched.find(m => m.emoji === item.key);
            return (
              <button key={item.key}
                onClick={() => selectEmoji(item.key)}
                style={{ height: 48, borderRadius: 'var(--radius)', border: `2px solid ${isMatched ? 'var(--success)' : 'var(--border)'}`, background: isMatched ? 'var(--success-light)' : 'var(--bg-card)', fontSize: 28, cursor: isMatched ? 'default' : 'pointer', opacity: isMatched ? 0.7 : 1 }}
              >
                {item.emoji}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Quiz Page ───────────────────────────────────────────
const QUIZ_TYPES = ['multiple-choice', 'order', 'match'];
const TYPE_LABELS = { 'multiple-choice': '🔤 Pilih Bacaan', order: '⬆️ Susun Urutan', match: '🎯 Cocokkan Gerakan' };

export default function Quiz() {
  const { userMode, recordQuizCorrect, profile } = useApp();
  const isKidsMode = userMode === 'kids';
  const [quizType, setQuizType] = useState('multiple-choice');
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [finished, setFinished] = useState(false);
  const [key, setKey] = useState(0);

  const mcQuestions = useMemo(() => [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5), [key]);

  const handleAnswer = (correct) => {
    setTotal(t => t + 1);
    if (correct) {
      setScore(s => s + 1);
      recordQuizCorrect();
    }
    if (quizType === 'multiple-choice') {
      if (questionIdx < mcQuestions.length - 1) {
        setTimeout(() => setQuestionIdx(i => i + 1), 300);
      } else {
        setTimeout(() => setFinished(true), 300);
      }
    } else {
      setTimeout(() => setFinished(true), 800);
    }
  };

  const resetQuiz = () => {
    setQuestionIdx(0);
    setScore(0);
    setTotal(0);
    setFinished(false);
    setKey(k => k + 1);
  };

  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="animate-fadeInUp">
      <div className="section-title">
        <div className="title-icon">❓</div>
        {isKidsMode ? 'Kuis Seru! 🎉' : 'Mini Quiz — Uji Pengetahuanmu'}
      </div>

      {/* Quiz Type Selector */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        {QUIZ_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => { setQuizType(type); resetQuiz(); }}
            style={{
              padding: '10px 18px',
              borderRadius: '14px',
              border: '3px solid #000',
              fontWeight: 900,
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: quizType === type ? 'var(--game-purple)' : '#fff',
              color: quizType === type ? '#fff' : '#000',
              boxShadow: quizType === type ? '3px 3px 0px #000' : '2px 2px 0px #000',
              transform: quizType === type ? 'translate(-1px, -1px)' : 'none',
              transition: 'all 0.1s ease'
            }}
          >
            {TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: 'start', gap: '24px' }}>
        {/* Quiz Area */}
        <div className="card" style={{ border: '4px solid #000', boxShadow: '6px 6px 0px #000' }}>
          {!finished ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 14, borderBottom: '3px solid #000' }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#000', backgroundColor: '#f1f5f9', border: '2.5px solid #000', padding: '6px 12px', borderRadius: '10px' }}>
                  {quizType === 'multiple-choice' ? `📝 Soal ${questionIdx + 1} / ${mcQuestions.length}` : TYPE_LABELS[quizType]}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ padding: '4px 12px', borderRadius: '10px', border: '2.5px solid #000', backgroundColor: 'var(--game-green-light)', fontWeight: 900, fontSize: 13 }}>✅ {score}</span>
                  <span style={{ padding: '4px 12px', borderRadius: '10px', border: '2.5px solid #000', backgroundColor: '#fecdd3', fontWeight: 900, fontSize: 13 }}>❌ {total - score}</span>
                </div>
              </div>

              {quizType === 'multiple-choice' && (
                <MultipleChoiceQuiz
                  key={`mc-${questionIdx}-${key}`}
                  question={mcQuestions[questionIdx]}
                  isKidsMode={isKidsMode}
                  onAnswer={handleAnswer}
                />
              )}
              {quizType === 'order' && (
                <OrderQuiz key={`order-${key}`} isKidsMode={isKidsMode} onAnswer={handleAnswer} />
              )}
              {quizType === 'match' && (
                <MatchQuiz key={`match-${key}`} isKidsMode={isKidsMode} onAnswer={handleAnswer} />
              )}
            </>
          ) : (
            <div className="animate-fadeIn" style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{ fontSize: 72, marginBottom: 16, filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.2))' }}>
                {percent >= 80 ? '🏆' : percent >= 60 ? '🌟' : '💪'}
              </div>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: '#000', marginBottom: 8 }}>
                {percent >= 80 ? 'Luar Biasa! 🎉' : percent >= 60 ? 'Bagus Sekali! 👍' : 'Terus Berlatih! 💪'}
              </h3>
              <div style={{ fontSize: 52, fontWeight: 900, color: percent >= 60 ? 'var(--game-green)' : '#f43f5e', margin: '16px 0', border: '4px solid #000', borderRadius: '20px', padding: '12px', boxShadow: '4px 4px 0px #000', backgroundColor: percent >= 60 ? 'var(--game-green-light)' : '#fecdd3' }}>
                {score}/{total}
              </div>
              <div style={{ height: '24px', backgroundColor: '#e2e8f0', borderRadius: '12px', border: '3px solid #000', padding: '2px', boxSizing: 'border-box', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ height: '100%', width: `${percent}%`, backgroundColor: percent >= 60 ? 'var(--game-green-light)' : '#f87171', borderRadius: '6px', borderRight: percent > 0 ? '2px solid #000' : 'none', transition: 'width 0.6s ease' }} />
              </div>
              <div style={{ fontSize: 14, color: '#333', fontWeight: 800, marginBottom: 24, padding: '12px', background: '#f8fafc', border: '3px solid #000', borderRadius: '14px' }}>
                {isKidsMode
                  ? `Kamu menjawab ${score} soal dengan benar! ${percent >= 80 ? 'Kamu hebat sekali! ⭐' : 'Coba lagi yuk!'}`
                  : `Akurasi: ${percent}%. ${percent >= 80 ? '+15 XP per jawaban benar!' : 'Pelajari lagi materi sholat ya.'}`}
              </div>
              <button className="btn btn-primary w-full" onClick={resetQuiz} style={{ padding: '14px', fontSize: '16px' }}>
                <RefreshCw size={16} /> {isKidsMode ? '🔄 Coba Lagi!' : 'Mulai Ulang Quiz'}
              </button>
            </div>
          )}
        </div>

        {/* Stats & Tips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ border: '4px solid #000', boxShadow: '4px 4px 0px #000' }}>
            <div style={{ fontWeight: 900, color: '#000', fontSize: 15, marginBottom: 16, borderBottom: '3px solid #000', paddingBottom: '8px' }}>📊 STATISTIK QUIZ</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Total Benar', val: `⭐ ${profile.quizCorrect}`, bg: '#fef3c7' },
                { label: 'Gems Diraih', val: `💎 ${Math.floor(profile.quizCorrect)}`, bg: '#f3e8ff' },
                { label: 'Total XP', val: `⚡ ${profile.quizCorrect * 15} XP`, bg: '#eff6ff' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: '12px', border: '3px solid #000', backgroundColor: item.bg, boxShadow: '2px 2px 0px #000' }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: '#000' }}>{item.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 900, color: '#000' }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: 'var(--primary-light)', border: '4px solid #000', boxShadow: '4px 4px 0px #000' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>💡</div>
            <div style={{ fontWeight: 900, color: '#000', fontSize: 15, marginBottom: 12 }}>
              {isKidsMode ? '🎯 Tips Kuis Seru!' : '💡 Tips & Trik'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                isKidsMode ? '📖 Belajar dulu baru kuis!' : 'Pelajari materi di Panduan Sholat sebelum quiz',
                isKidsMode ? '🔄 Kuis bisa diulang berkali-kali!' : 'Semua quiz dapat diulang untuk meningkatkan nilai',
                isKidsMode ? '⭐ Jawab benar = dapat bintang!' : 'Setiap jawaban benar memberikan +15 XP & 💎',
              ].map((tip, i) => (
                <div key={i} style={{ fontSize: 13, color: '#000', fontWeight: 800, display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 10px', background: '#fff', border: '2.5px solid #000', borderRadius: '10px' }}>
                  <span style={{ color: 'var(--game-purple)', flexShrink: 0, fontWeight: 900 }}>•</span> {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
