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

export default function SholatSchedulePage() {
  const { userMode, isKidsMode } = useApp();
  const { times, location, loading, error, fetchByGeo, fetchByCity } = usePrayerTimes();
  const [inputCity, setInputCity] = useState('Jakarta');

  const isKids = userMode === 'kids' || isKidsMode;

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
    <div className="animate-fadeInUp" style={{ padding: '16px', maxWidth: '1000px', margin: '0 auto', color: '#113C2B' }}>
      
      {/* Title Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        fontSize: '24px', 
        fontWeight: 900, 
        marginBottom: '24px',
        backgroundColor: '#D4DDD3',
        border: '3px solid #113C2B',
        padding: '10px 20px',
        borderRadius: '16px',
        boxShadow: '4px 4px 0px #113C2B',
        width: 'fit-content'
      }}>
        <Clock size={20} strokeWidth={2.5} />
        <div>{isKids ? 'Waktu Sholat Hari Ini ⏰' : 'Jadwal Sholat Fardhu'}</div>
      </div>

      {/* Location Bar */}
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        padding: '16px 20px', background: '#fff', border: '3px solid #113C2B',
        borderRadius: '16px', boxShadow: '4px 4px 0px #113C2B', marginBottom: '20px'
      }}>
        <MapPin size={22} style={{ color: '#113C2B', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, color: '#113C2B', fontSize: '15px' }}>
            {location || 'Mendeteksi lokasi Anda...'}
          </div>
          <div style={{ fontSize: '12px', color: '#556B52', fontWeight: 700 }}>
            Metode: Kemenag RI / Al-Adhan Method 11
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Cari Kota (mis. Surabaya)..."
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            style={{
              padding: '8px 12px', borderRadius: '10px', border: '2px solid #113C2B',
              fontSize: '13px', fontWeight: 700, outline: 'none', background: '#F8FAF8', color: '#113C2B'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '8px 14px', borderRadius: '10px', border: '2px solid #113C2B',
              backgroundColor: '#113C2B', color: '#fff', fontSize: '13px', fontWeight: 900,
              cursor: 'pointer', boxShadow: '2px 2px 0px #082218'
            }}
          >
            {loading ? 'Cari...' : 'Cari'}
          </button>
        </form>

        <button
          onClick={fetchByGeo}
          style={{
            padding: '8px', borderRadius: '10px', border: '2px solid #113C2B',
            backgroundColor: '#D4DDD3', color: '#113C2B', cursor: 'pointer', display: 'flex', alignItems: 'center'
          }}
          title="Gunakan Lokasi GPS Saya"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Countdown Card for Next Prayer */}
      {nextInfo && (
        <div style={{
          background: 'linear-gradient(135deg, #113C2B 0%, #082218 100%)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '24px',
          border: '4px solid #000',
          boxShadow: '6px 6px 0px #000',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>
              SHOLAT SELANJUTNYA
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 900, margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {nextInfo.emoji} Sholat {nextInfo.name} ({nextTime})
            </h2>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>
              MENUNJU ADZAN
            </span>
            <div style={{ fontSize: '36px', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '2px' }}>
              {countdown || '--:--:--'}
            </div>
          </div>
        </div>
      )}

      {/* Prayer Schedule Cards */}
      {times ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {PRAYER_KEYS.map((k) => {
            const info = PRAYER_NAMES[PRAYER_MAP[k]];
            const isNext = k === nextPrayerKey;
            const timeVal = times[k];

            return (
              <div
                key={k}
                style={{
                  background: isNext ? '#D4DDD3' : '#FFFFFF',
                  border: isNext ? '4px solid #113C2B' : '3px solid #113C2B',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: isNext ? '6px 6px 0px #113C2B' : '4px 4px 0px #113C2B',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  transition: 'transform 0.15s ease'
                }}
              >
                <div style={{ fontSize: '32px' }}>{info.emoji}</div>
                <div style={{ fontWeight: 900, fontSize: '18px', color: '#113C2B' }}>
                  {info.name}
                </div>
                <div style={{ fontWeight: 900, fontSize: '24px', color: isNext ? '#113C2B' : '#059669' }}>
                  {timeVal}
                </div>
                {isNext && (
                  <span style={{
                    fontSize: '11px', fontWeight: 900, color: '#FFFFFF', backgroundColor: '#113C2B',
                    padding: '4px 10px', borderRadius: '8px', width: 'fit-content'
                  }}>
                    Berikutnya ⏳
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', fontWeight: 800 }}>
          {error ? `⚠️ ${error}` : 'Memuat jadwal sholat...'}
        </div>
      )}
    </div>
  );
}