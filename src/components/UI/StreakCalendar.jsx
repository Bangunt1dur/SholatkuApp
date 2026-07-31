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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
        {DAY_LABELS.map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#556B52' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {weekRows.map((week, wi) => (
          <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {week.map((cell) => (
              <div
                key={cell.dateStr}
                title={`${cell.dateStr}: ${cell.count}/5 sholat`}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: 800,
                  cursor: 'default',
                  backgroundColor:
                    cell.status === 'full'    ? '#113C2B' :
                    cell.status === 'partial' ? '#7BAB8B' : '#E8EFE8',
                  color:
                    cell.status === 'full'    ? '#FFFFFF' :
                    cell.status === 'partial' ? '#FFFFFF' : '#556B52',
                  outline: cell.isToday ? '2px solid #113C2B' : 'none',
                  outlineOffset: '2px',
                }}
              >
                {cell.isToday ? '●' : cell.day}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginTop: 10, justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#556B52' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, background: '#113C2B', borderRadius: 3, display: 'inline-block' }} />
          Lengkap 5 waktu
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, background: '#7BAB8B', borderRadius: 3, display: 'inline-block' }} />
          Sebagian
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, background: '#E8EFE8', borderRadius: 3, display: 'inline-block' }} />
          Belum
        </span>
      </div>
    </div>
  );
}
