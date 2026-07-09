import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';

const DAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function StreakCalendar({ weeks = 10 }) {
  const { streakHistory, tracker } = useApp();

  const cells = useMemo(() => {
    const today = new Date();
    const totalDays = weeks * 7;
    const result = [];

    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const isToday = i === 0;

      const entry = streakHistory.find((h) => h.date === dateStr);
      const count = isToday
        ? ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].filter((k) => tracker[k]).length
        : entry?.count ?? 0;

      let status = 'empty';
      if (count === 5) status = 'full';
      else if (count > 0) status = 'partial';

      result.push({ dateStr, count, status, isToday, day: d.getDate(), dow: d.getDay() });
    }
    return result;
  }, [streakHistory, tracker, weeks]);

  // Group into weeks
  const weekRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }
    return rows;
  }, [cells]);

  return (
    <div>
      {/* Day labels */}
      <div className="streak-grid" style={{ marginBottom: 4 }}>
        {DAY_LABELS.map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {weekRows.map((week, wi) => (
          <div key={wi} className="streak-grid">
            {week.map((cell) => (
              <div
                key={cell.dateStr}
                className={`streak-day ${cell.status} ${cell.isToday ? 'today' : ''}`}
                title={`${cell.dateStr}: ${cell.count}/5 sholat`}
              >
                {cell.isToday ? '●' : cell.day}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginTop: 10, justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, background: 'var(--primary)', borderRadius: 3, display: 'inline-block' }} />
          Lengkap 5 waktu
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, background: 'var(--accent)', borderRadius: 3, display: 'inline-block' }} />
          Sebagian
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, background: 'var(--border)', borderRadius: 3, display: 'inline-block' }} />
          Belum
        </span>
      </div>
    </div>
  );
}
