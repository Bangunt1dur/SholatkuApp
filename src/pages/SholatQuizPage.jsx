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
      <h3 style={{ fontWeight: 900, fontSize: 17, color: 'var(--text-dark)', lineHeight: 1.4, marginBottom: 20 }}>
        {isKidsMode ? question.questionKids : question.question}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {question.options.map((opt, i) => {
          let cls = 'quiz-option';
          if (answered) {
            if (i === question.correct) cls += ' correct';
            else if (i === selected) cls += ' wrong';
          } else if (i === selected) cls += ' selected';
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)}>
              <span style={{ fontWeight: 800, color: 'var(--primary)', marginRight: 8 }}>
                {['A', 'B', 'C', 'D'][i]}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 'var(--radius)', background: selected === question.correct ? 'var(--success-light)' : 'var(--danger-light)', fontSize: 13, fontWeight: 700, color: selected === question.correct ? '#166534' : '#991B1B' }} className="animate-fadeIn">
          {selected === question.correct ? '🎉 Benar! ' : '❌ Jawaban kurang tepat. '}
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {arranged.map((item, idx) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 22, height: 22, background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, flexShrink: 0 }}>
              {idx + 1}
            </span>
            <div className="drag-item" style={{ flex: 1, cursor: 'default' }}>{item.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <button onClick={() => moveUp(idx)} disabled={idx === 0 || checked} style={{ padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--bg-card)', cursor: 'pointer', fontWeight: 800 }}>↑</button>
              <button onClick={() => moveDown(idx)} disabled={idx === arranged.length - 1 || checked} style={{ padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--bg-card)', cursor: 'pointer', fontWeight: 800 }}>↓</button>
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
        <div style={{ padding: '12px 14px', borderRadius: 'var(--radius)', background: correct ? 'var(--success-light)' : 'var(--danger-light)', fontWeight: 700, color: correct ? '#166534' : '#991B1B', fontSize: 13 }} className="animate-fadeIn">
          {correct ? '🎉 Urutan sudah benar! Luar biasa!' : '❌ Belum tepat. Urutan sholat: Qiyam → Takbir → Bersedekap → Al-Fatihah → Ruku → I\'tidal → Sujud → Duduk → Tasyahud → Salam'}
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
  const { isKidsMode, recordQuizCorrect, profile } = useApp();
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
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {QUIZ_TYPES.map((type) => (
          <button
            key={type}
            className={`btn btn-sm ${quizType === type ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => { setQuizType(type); resetQuiz(); }}
          >
            {TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Quiz Area */}
        <div className="card">
          {!finished ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>
                  {quizType === 'multiple-choice' ? `Soal ${questionIdx + 1} dari ${mcQuestions.length}` : TYPE_LABELS[quizType]}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="badge badge-success">✅ {score}</span>
                  <span className="badge badge-danger">❌ {total - score}</span>
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
            <div className="animate-fadeIn" style={{ textAlign: 'center', padding: 20 }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>
                {percent >= 80 ? '🏆' : percent >= 60 ? '🌟' : '💪'}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-dark)', marginBottom: 4 }}>
                {percent >= 80 ? 'Luar Biasa!' : percent >= 60 ? 'Bagus!' : 'Terus Berlatih!'}
              </h3>
              <div style={{ fontSize: 42, fontWeight: 900, color: 'var(--primary)', margin: '12px 0' }}>
                {score}/{total}
              </div>
              <div className="progress-track" style={{ marginBottom: 16 }}>
                <div className={`progress-fill ${percent >= 60 ? 'success' : 'danger'}`} style={{ width: `${percent}%` }} />
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 20 }}>
                {isKidsMode
                  ? `Kamu menjawab ${score} soal dengan benar! ${percent >= 80 ? 'Kamu hebat! ⭐' : 'Coba lagi yuk!'}`
                  : `Tingkat kebenaran: ${percent}%. ${percent >= 80 ? '+15 XP per jawaban benar.' : 'Pelajari lagi materi sholat.'}`}
              </div>
              <button className="btn btn-primary w-full" onClick={resetQuiz}>
                <RefreshCw size={16} /> {isKidsMode ? 'Coba Lagi!' : 'Mulai Ulang Quiz'}
              </button>
            </div>
          )}
        </div>

        {/* Stats & Tips */}
        <div>
          <div className="card mb-4">
            <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 12 }}>📊 Statistik Quiz</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
                <span style={{ color: 'var(--text)' }}>Total Jawaban Benar</span>
                <span style={{ color: 'var(--primary)' }}>⭐ {profile.quizCorrect}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
                <span style={{ color: 'var(--text)' }}>Gems dari Quiz</span>
                <span style={{ color: '#7C3AED' }}>💎 {Math.floor(profile.quizCorrect)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
                <span style={{ color: 'var(--text)' }}>XP dari Quiz</span>
                <span style={{ color: 'var(--accent)' }}>⚡ {profile.quizCorrect * 15} XP</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ background: 'var(--primary-light)', border: '1.5px solid var(--primary-mid)' }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>💡</div>
            <div style={{ fontWeight: 900, color: 'var(--primary-dark)', fontSize: 14, marginBottom: 8 }}>
              {isKidsMode ? 'Tips Kuis Seru!' : 'Tips & Trik'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                isKidsMode ? '📖 Belajar dulu baru kuis!' : 'Pelajari materi di Panduan Sholat sebelum quiz',
                isKidsMode ? '🔄 Kuis bisa diulang berkali-kali!' : 'Semua quiz dapat diulang untuk meningkatkan nilai',
                isKidsMode ? '⭐ Jawab benar = dapat bintang!' : 'Setiap jawaban benar memberikan +15 XP & 💎',
              ].map((tip, i) => (
                <div key={i} style={{ fontSize: 12.5, color: 'var(--text)', fontWeight: 600, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary)', flexShrink: 0 }}>•</span> {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
