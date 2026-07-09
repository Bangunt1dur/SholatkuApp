import { useState, useEffect, useRef } from 'react';
import { MapPin, Bell, RefreshCw, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRAYER_NAMES } from '../data/data';

const API_URL = 'https://api.aladhan.com/v1/timingsByCity';

function usePrayerTimes() {
  const [times, setTimes] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Jakarta');
  const [country, setCountry] = useState('Indonesia');

  const fetchByCity = async (c = city, co = country) => {
    setLoading(true);
    setError(null);
    try {
      const date = new Date();
      const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      const res = await fetch(`${API_URL}?city=${encodeURIComponent(c)}&country=${encodeURIComponent(co)}&method=11&date=${dateStr}`);
      const json = await res.json();
      if (json.code === 200) {
        setTimes(json.data.timings);
        setLocation(`${c}, ${co}`);
      } else {
        setError('Gagal mengambil data jadwal sholat.');
      }
    } catch {
      setError('Tidak dapat terhubung ke server jadwal sholat.');
    } finally {
      setLoading(false);
    }
  };

  const fetchByGeo = () => {
    if (!navigator.geolocation) {
      fetchByCity();
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          // Reverse geocode with nominatim
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const geoData = await geoRes.json();
          const detectedCity = geoData.address?.city || geoData.address?.town || geoData.address?.county || 'Jakarta';
          const detectedCountry = geoData.address?.country || 'Indonesia';

          const date = new Date();
          const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
          const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=11`);
          const json = await res.json();
          if (json.code === 200) {
            setTimes(json.data.timings);
            setLocation(`${detectedCity}, ${detectedCountry}`);
          }
        } catch {
          fetchByCity();
        } finally {
          setLoading(false);
        }
      },
      () => {
        fetchByCity();
        setLoading(false);
      }
    );
  };

  return { times, location, loading, error, fetchByGeo, fetchByCity, city, setCity, country, setCountry };
}

function useCountdown(targetTime) {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!targetTime) return;
    const tick = () => {
      const now = new Date();
      const [h, m] = targetTime.split(':').map(Number);
      const target = new Date(now);
      target.setHours(h, m, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
      const diff = target - now;
      const hh = Math.floor(diff / 3600000);
      const mm = Math.floor((diff % 3600000) / 60000);
      const ss = Math.floor((diff % 60000) / 1000);
      setCountdown(`${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetTime]);

  return countdown;
}

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const PRAYER_MAP = { Fajr: 0, Dhuhr: 1, Asr: 2, Maghrib: 3, Isha: 4 };

export default function Schedule() {
  const { isKidsMode, tracker } = useApp();
  const { times, location, loading, error, fetchByGeo, fetchByCity, city, setCity, country, setCountry } = usePrayerTimes();
  const [inputCity, setInputCity] = useState('Jakarta');

  useEffect(() => { fetchByGeo(); }, []);

  // Find next prayer
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const nextPrayerKey = times
    ? PRAYER_KEYS.find((k) => {
        if (!times[k]) return false;
        const [h, m] = times[k].split(':').map(Number);
        return h * 60 + m > nowMinutes;
      }) || 'Fajr'
    : null;

  const nextTime = times && nextPrayerKey ? times[nextPrayerKey] : null;
  const countdown = useCountdown(nextTime);
  const nextInfo = nextPrayerKey ? PRAYER_NAMES[PRAYER_MAP[nextPrayerKey]] : null;

  const handleSearch = (e) => {
    e.preventDefault();
    fetchByCity(inputCity);
  };

  return (
    <div className="animate-fadeInUp">
      <div className="section-title">
        <div className="title-icon"><Clock size={16} /></div>
        {isKidsMode ? 'Waktu Sholat Hari Ini ⏰' : 'Jadwal Sholat'}
      </div>

      {/* Location Bar */}
      <div className="card mb-4" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <MapPin size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, color: 'var(--text-dark)', fontSize: 14 }}>
            {location || 'Mendeteksi lokasi...'}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600 }}>
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={fetchByGeo} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Memuat...' : 'Perbarui Lokasi'}
        </button>
      </div>

      {/* City Search */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={inputCity}
          onChange={e => setInputCity(e.target.value)}
          placeholder="Cari kota..."
          style={{ flex: 1, padding: '10px 16px', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, outline: 'none', background: 'var(--bg-card)' }}
        />
        <button type="submit" className="btn btn-primary btn-sm">Cari</button>
      </form>

      {error && (
        <div style={{ background: 'var(--danger-light)', borderRadius: 'var(--radius)', padding: '10px 16px', color: '#991B1B', fontWeight: 700, fontSize: 13, marginBottom: 14 }}>
          ⚠️ {error}
        </div>
      )}

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Prayer Time List */}
        <div className="card">
          <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 14 }}>
            🕐 Jadwal Sholat Hari Ini
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PRAYER_NAMES.map((p) => {
              const apiKey = { fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' }[p.key];
              const timeStr = times?.[apiKey];
              const [h, m] = timeStr ? timeStr.split(':').map(Number) : [0, 0];
              const isPassed = timeStr && h * 60 + m < nowMinutes;
              const isNext = apiKey === nextPrayerKey;
              const isDone = tracker[p.key];

              return (
                <div
                  key={p.key}
                  className={`prayer-time-row ${isNext ? 'next' : ''} ${isPassed && !isNext ? 'passed' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{p.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 14, color: 'var(--text-dark)' }}>{p.label}</div>
                      {isNext && <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700 }}>Berikutnya ⏰</div>}
                      {isPassed && !isNext && <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>Sudah lewat</div>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isDone && <span className="badge badge-success">✓</span>}
                    <span style={{ fontWeight: 900, fontSize: 16, color: isNext ? 'var(--primary-dark)' : 'var(--text-dark)', fontVariantNumeric: 'tabular-nums' }}>
                      {loading ? '...' : timeStr || '--:--'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Prayer Countdown */}
        <div>
          {nextInfo && (
            <div className="card mb-4" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'white', border: 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                Sholat Berikutnya
              </div>
              <div style={{ fontSize: 36, marginBottom: 4 }}>{nextInfo.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>
                {isKidsMode ? nextInfo.labelKids : nextInfo.label}
              </div>
              <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 700, marginBottom: 12 }}>
                Pukul {nextTime || '--:--'}
              </div>
              <div className="countdown-display" style={{ color: 'white', fontSize: 48, letterSpacing: -2 }}>
                {countdown || '--:--:--'}
              </div>
              <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 700, marginTop: 6 }}>
                {isKidsMode ? 'Waktu tersisa sebelum sholat' : 'Countdown ke waktu sholat berikutnya'}
              </div>
            </div>
          )}

          {/* Additional prayer times */}
          <div className="card">
            <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 10 }}>⏰ Waktu Lain</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['Sunrise', 'Imsak', 'Midnight'].map((k) => (
                times?.[k] && (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span style={{ fontWeight: 700, color: 'var(--text)' }}>{k}</span>
                    <span style={{ fontWeight: 900, color: 'var(--text-dark)', fontVariantNumeric: 'tabular-nums' }}>{times[k]}</span>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="card mt-4" style={{ background: 'var(--primary-light)', border: '1.5px solid var(--primary-mid)' }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>ℹ️</div>
            <div style={{ fontWeight: 800, color: 'var(--primary-dark)', fontSize: 13, marginBottom: 4 }}>
              {isKidsMode ? 'Tips Sholat Tepat Waktu!' : 'Informasi'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>
              {isKidsMode
                ? 'Sholat tepat waktu itu dapat pahala lebih banyak! Yuk pasang alarm di HP supaya tidak telat! 📱'
                : 'Jadwal sholat menggunakan metode MUI/Kemenag (Metode 11). Waktu dapat sedikit berbeda tergantung wilayah.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
