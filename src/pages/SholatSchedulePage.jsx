// src/pages/SholatSchedulePage.jsx
import { useState, useEffect } from 'react';
import { MapPin, RefreshCw, Clock } from 'lucide-react';
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
  const { userMode, tracker } = useApp();
  const { times, location, loading, error, fetchByGeo, fetchByCity } = usePrayerTimes();
  const [inputCity, setInputCity] = useState('Jakarta');

  const isKidsMode = userMode === 'kids';
  const isAdultTheme = userMode === 'adult';

  useEffect(() => { fetchByGeo(); }, []);

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
    <div className="animate-fadeIn">
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '24px' }}>
        <Clock size={20} style={{ color: isAdultTheme ? '#065F46' : 'var(--game-purple)' }} />
        <h2 style={{ 
          fontFamily: isAdultTheme ? 'Playfair Display, serif' : 'var(--font-headline)', 
          fontSize: '24px', fontWeight: 700, 
          color: isAdultTheme ? '#0F172A' : 'var(--game-dark)', 
          margin: 0 
        }}>
          {isKidsMode ? 'Waktu Sholat Hari Ini ⏰' : 'Jadwal Sholat Fardhu'}
        </h2>
      </div>

      {/* Location Bar */}
      <div 
        className={isAdultTheme ? "" : "card mb-4"} 
        style={{ 
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          padding: '16px', background: '#fff', border: isAdultTheme ? '1px solid #E2E8F0' : '2px solid #000',
          borderRadius: isAdultTheme ? '8px' : '16px', marginBottom: '20px'
        }}
      >
        <MapPin size={18} style={{ color: isAdultTheme ? '#059669' : 'var(--primary)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, color: 'var(--text-dark)', fontSize: 14 }}>
            {location || 'Mendeteksi lokasi Anda...'}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 700 }}>
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        <button 
          className={isAdultTheme ? "btn btn-ghost btn-sm" : "btn btn-ghost btn-sm"} 
          onClick={fetchByGeo} 
          disabled={loading}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Memuat...' : 'Perbarui GPS'}
        </button>
      </div>

      {/* City Search */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          type="text"
          value={inputCity}
          onChange={e => setInputCity(e.target.value)}
          placeholder="Cari jadwal kota lain (Contoh: Bandung)..."
          style={{ 
            flex: 1, padding: '10px 16px', 
            borderRadius: isAdultTheme ? '8px' : 'var(--radius-full)', 
            border: isAdultTheme ? '1px solid #CBD5E0' : '2px solid #000', 
            fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: 700, outline: 'none', background: '#fff' 
          }}
        />
        <button 
          type="submit" 
          className={isAdultTheme ? "btn btn-primary" : "clay-btn purple btn-sm"}
          style={{ padding: '8px 20px', fontSize: '13px' }}
        >
          Cari
        </button>
      </form>

      {error && (
        <div style={{ background: '#FFF5F5', borderRadius: '10px', padding: '10px 16px', color: '#C53030', fontWeight: 800, fontSize: 13, marginBottom: 14, border: '2px solid #FEB2B2' }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Prayer Time List */}
        <div 
          className={isAdultTheme ? "" : "card"}
          style={{
            background: '#fff', padding: '20px', border: isAdultTheme ? '1px solid #E2E8F0' : '2.5px solid #000',
            borderRadius: isAdultTheme ? '10px' : '16px'
          }}
        >
          <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 14 }}>
            🕐 Waktu Sholat Fardhu:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PRAYER_NAMES.map((p) => {
              const apiKey = { fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' }[p.key];
              const timeStr = times?.[apiKey];
              const [h, m] = timeStr ? timeStr.split(':').map(Number) : [0, 0];
              const isPassed = timeStr && h * 60 + m < nowMinutes;
              const isNext = apiKey === nextPrayerKey;
              const isDone = tracker && tracker[p.key];

              return (
                <div
                  key={p.key}
                  className={`prayer-time-row ${isNext ? 'next' : ''} ${isPassed && !isNext ? 'passed' : ''}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', borderRadius: isAdultTheme ? '8px' : '12px',
                    border: isNext 
                      ? `2px solid ${isAdultTheme ? '#059669' : 'var(--primary)'}` 
                      : `1px solid ${isAdultTheme ? '#E2E8F0' : '#000'}`,
                    background: isNext 
                      ? (isAdultTheme ? '#ECFDF5' : 'var(--primary-light)') 
                      : '#fff',
                    opacity: isPassed && !isNext ? 0.6 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{p.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 14, color: 'var(--text-dark)' }}>
                        {isKidsMode ? (p.labelKids || p.label) : p.label}
                      </div>
                      {isNext && <div style={{ fontSize: 11, color: isAdultTheme ? '#059669' : 'var(--primary)', fontWeight: 800 }}>Berikutnya ⏰</div>}
                      {isPassed && !isNext && <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>Sudah lewat</div>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isDone && <span style={{ color: 'var(--game-green)', fontWeight: 900 }}>✓</span>}
                    <span style={{ 
                      fontWeight: 900, fontSize: 16, 
                      color: isNext ? (isAdultTheme ? '#047857' : 'var(--primary-dark)') : 'var(--text-dark)', 
                      fontVariantNumeric: 'tabular-nums' 
                    }}>
                      {loading ? '...' : timeStr || '--:--'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Prayer Countdown Card */}
        <div>
          {nextInfo && (
            <div 
              className={isAdultTheme ? "" : "card mb-4"} 
              style={{ 
                background: isAdultTheme ? '#fff' : 'linear-gradient(135deg, var(--primary-dark), var(--primary))', 
                color: isAdultTheme ? '#0F172A' : 'white', 
                border: isAdultTheme ? '1px solid #E2E8F0' : 'none', 
                textAlign: 'center',
                padding: '24px', borderRadius: isAdultTheme ? '10px' : '16px',
                boxShadow: isAdultTheme ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                Sholat Berikutnya
              </div>
              <div style={{ fontSize: 36, marginBottom: 4 }}>{nextInfo.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 4, color: isAdultTheme ? '#065F46' : '#white' }}>
                {isKidsMode ? (nextInfo.labelKids || nextInfo.label) : nextInfo.label}
              </div>
              <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 700, marginBottom: 12 }}>
                Pukul {nextTime || '--:--'}
              </div>
              <div style={{ 
                fontSize: 48, fontWeight: 900, letterSpacing: -2, lineHeight: 1,
                color: isAdultTheme ? '#059669' : 'white'
              }}>
                {countdown || '--:--:--'}
              </div>
              <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 700, marginTop: 10 }}>
                Hitung mundur menuju waktu sholat selanjutnya.
              </div>
            </div>
          )}

          {/* Sunrise / Sunset times */}
          <div 
            className={isAdultTheme ? "" : "card mt-4"}
            style={{
              background: '#fff', padding: '16px', border: isAdultTheme ? '1px solid #E2E8F0' : '2px solid #000',
              borderRadius: isAdultTheme ? '10px' : '16px'
            }}
          >
            <div style={{ fontWeight: 900, color: 'var(--text-dark)', fontSize: 14, marginBottom: 10 }}>⏰ Waktu Tambahan</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['Sunrise', 'Imsak', 'Midnight'].map((k) => (
                times?.[k] && (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E2E8F0', fontSize: 13 }}>
                    <span style={{ fontWeight: 700, color: '#64748B' }}>{k}</span>
                    <span style={{ fontWeight: 900, color: '#1E293B', fontVariantNumeric: 'tabular-nums' }}>{times[k]}</span>
                  </div>
                )
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
