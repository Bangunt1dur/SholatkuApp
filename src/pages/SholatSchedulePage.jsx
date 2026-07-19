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

// Konfigurasi Gaya Dasar Global Neo-Brutalisme
const baseCardStyle = {
  border: '4px solid #113C2B',
  boxShadow: '5px 5px 0px #113C2B',
  borderRadius: '24px',
  padding: '24px',
  backgroundColor: '#FFFFFF',
  color: '#113C2B',
  boxSizing: 'border-box'
};

export default function Schedule() {
  const { isKidsMode, tracker } = useApp();
  const { times, location, loading, error, fetchByGeo, fetchByCity, city, setCity, country, setCountry } = usePrayerTimes();
  const [inputCity, setInputCity] = useState('Jakarta');

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
    <div className="animate-fadeInUp" style={{ color: '#113C2B' }}>
      
      {/* Title Header Badge */}
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
        <div style={{ display: 'flex', alignItems: 'center' }}><Clock size={20} strokeWidth={2.5} /></div>
        <div>{isKidsMode ? 'Waktu Sholat Hari Ini ⏰' : 'Jadwal Sholat'}</div>
      </div>

      {/* Location Bar Header */}
      <div className="mb-4" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 14, 
        flexWrap: 'wrap', 
        border: '4px solid #113C2B', 
        boxShadow: '4px 4px 0px #113C2B', 
        backgroundColor: '#D4DDD3', 
        borderRadius: '20px',
        padding: '16px 20px'
      }}>
        <div style={{ 
          width: 44, 
          height: 44, 
          borderRadius: '50%', 
          border: '3px solid #113C2B', 
          backgroundColor: '#FFFFFF', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          boxShadow: '2px 2px 0px #113C2B', 
          flexShrink: 0 
        }}>
          <MapPin size={20} style={{ color: '#113C2B' }} strokeWidth={2.5} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, color: '#113C2B', fontSize: 16 }}>
            {location || 'Mendeteksi lokasi...'}
          </div>
          <div style={{ fontSize: 12, color: '#556B52', fontWeight: 800 }}>
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        <button 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6, 
            padding: '8px 16px', 
            borderRadius: '12px', 
            border: '3px solid #113C2B', 
            backgroundColor: '#FFFFFF', 
            color: '#113C2B',
            fontWeight: 900, 
            fontSize: 13, 
            cursor: 'pointer', 
            boxShadow: '2px 2px 0px #113C2B',
            fontFamily: 'inherit'
          }} 
          onClick={fetchByGeo} 
          disabled={loading}
        >
          <RefreshCw size={14} strokeWidth={2.5} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Memuat...' : 'Perbarui'}
        </button>
      </div>

      {/* City Search Form */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <input
          type="text"
          value={inputCity}
          onChange={e => setInputCity(e.target.value)}
          placeholder="Cari kota... (misal: Surabaya)"
          style={{ 
            flex: 1, 
            padding: '12px 18px', 
            borderRadius: '14px', 
            border: '3px solid #113C2B', 
            fontSize: 14, 
            fontWeight: 800, 
            outline: 'none', 
            background: '#FFFFFF', 
            color: '#113C2B',
            boxShadow: '2px 2px 0px #113C2B',
            fontFamily: 'inherit'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '12px 20px', 
            borderRadius: '14px', 
            border: '3px solid #113C2B', 
            backgroundColor: '#113C2B', 
            color: '#FFFFFF', 
            fontWeight: 900, 
            fontSize: 14, 
            cursor: 'pointer', 
            boxShadow: '3px 3px 0px #556B52',
            fontFamily: 'inherit'
          }}
        >
          Cari 🔍
        </button>
      </form>

      {error && (
        <div style={{ 
          background: '#F5C2C2', 
          borderRadius: '14px', 
          border: '3px solid #113C2B', 
          padding: '12px 16px', 
          color: '#113C2B', 
          fontWeight: 900, 
          fontSize: 13, 
          marginBottom: 16, 
          boxShadow: '3px 3px 0px #113C2B' 
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Split Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', alignItems: 'start', gap: '28px' }} className="grid-2">
        
        {/* Core Prayer Module Card */}
        <div style={baseCardStyle}>
          <div style={{ fontWeight: 900, color: '#113C2B', fontSize: 14, marginBottom: 16, borderBottom: '3.5px solid #113C2B', paddingBottom: '8px', letterSpacing: '0.5px' }}>
            🕐 JADWAL SHOLAT HARI INI
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '16px',
                    border: '3px solid #113C2B',
                    backgroundColor: isNext ? '#D4DDD3' : isPassed ? '#F8FAF8' : '#FFFFFF',
                    boxShadow: isNext ? '4px 4px 0px #113C2B' : '2px 2px 0px #113C2B',
                    transform: isNext ? 'translate(-1px, -1px)' : 'none',
                    transition: 'all 0.1s ease',
                    opacity: isPassed && !isNext ? 0.65 : 1,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 26 }}>{p.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 15, color: '#113C2B' }}>{p.label}</div>
                      {isNext && <div style={{ fontSize: 11, color: '#113C2B', fontWeight: 900, textTransform: 'uppercase', marginTop: '2px' }}>⏰ Berikutnya</div>}
                      {isPassed && !isNext && <div style={{ fontSize: 11, color: '#556B52', fontWeight: 800 }}>Sudah lewat</div>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isDone && <span style={{ fontSize: '11px', fontWeight: 900, backgroundColor: '#FFFFFF', border: '2px solid #113C2B', borderRadius: '8px', padding: '2px 8px', color: '#113C2B' }}>✓ Sholat</span>}
                    <span style={{ 
                      fontWeight: 900, 
                      fontSize: 18, 
                      color: '#113C2B', 
                      fontVariantNumeric: 'tabular-nums', 
                      backgroundColor: isNext ? '#FFFFFF' : 'transparent', 
                      border: isNext ? '2.5px solid #113C2B' : 'none', 
                      borderRadius: '10px', 
                      padding: isNext ? '4px 10px' : '0' 
                    }}>
                      {loading ? '⌛' : timeStr || '--:--'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Widgets Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Box: Next Prayer Visual Countdown */}
          {nextInfo && (
            <div style={{ 
              backgroundColor: '#113C2B', 
              color: '#FFFFFF', 
              border: '4px solid #113C2B', 
              boxShadow: '5px 5px 0px #556B52', 
              borderRadius: '24px', 
              padding: '24px', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, color: '#D4DDD3' }}>
                ⏰ SHOLAT BERIKUTNYA
              </div>
              <div style={{ fontSize: 44, marginBottom: 6 }}>{nextInfo.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>
                {isKidsMode ? nextInfo.labelKids : nextInfo.label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '4px 12px', display: 'inline-block', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                Pukul {nextTime || '--:--'}
              </div>
              <div style={{ 
                fontSize: 40, 
                fontWeight: 900, 
                letterSpacing: -1, 
                fontVariantNumeric: 'tabular-nums', 
                border: '3px solid #FFFFFF', 
                borderRadius: '16px', 
                padding: '12px', 
                backgroundColor: 'rgba(0,0,0,0.2)', 
                margin: '0 auto 8px', 
                display: 'inline-block', 
                minWidth: '180px' 
              }}>
                {countdown || '--:--:--'}
              </div>
              <div style={{ fontSize: 11, color: '#D4DDD3', fontWeight: 800, marginTop: 8 }}>
                {isKidsMode ? '⏳ Bersiap-siap ambil wudhu yuk!' : 'Hitung mundur menuju waktu masuk sholat'}
              </div>
            </div>
          )}

          {/* Box: Additional Miscellaneous Times */}
          <div style={baseCardStyle}>
            <div style={{ fontWeight: 900, color: '#113C2B', fontSize: 14, marginBottom: 14, borderBottom: '3.5px solid #113C2B', paddingBottom: '8px', letterSpacing: '0.5px' }}>
              ⏰ WAKTU TAMBAHAN
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Sunrise', 'Imsak', 'Midnight'].map((k) => (
                times?.[k] && (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', border: '2.5px solid #113C2B', borderRadius: '12px', backgroundColor: '#F8FAF8', boxShadow: '2px 2px 0px #113C2B' }}>
                    <span style={{ fontWeight: 900, color: '#113C2B', fontSize: 13 }}>{k === 'Sunrise' ? '🌅 Syuruq' : k === 'Imsak' ? '🌙 Imsak' : '🌃 Tengah Malam'}</span>
                    <span style={{ fontWeight: 900, color: '#113C2B', fontSize: 15, fontVariantNumeric: 'tabular-nums', backgroundColor: '#D4DDD3', border: '2px solid #113C2B', borderRadius: '8px', padding: '4px 10px' }}>{times[k]}</span>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Box: Info/Tips Educational Guidance */}
          <div style={{ ...baseCardStyle, backgroundColor: '#F8FAF8' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>ℹ️</div>
            <div style={{ fontWeight: 900, color: '#113C2B', fontSize: 14, marginBottom: 8, letterSpacing: '0.3px' }}>
              {isKidsMode ? '💡 Tips Sholat Tepat Waktu!' : 'ℹ️ Informasi Metode Jadwal'}
            </div>
            <div style={{ fontSize: 13, color: '#113C2B', lineHeight: 1.6, fontWeight: 700 }}>
              {isKidsMode
                ? 'Sholat tepat waktu itu hebat dan disayang Allah! Yuk, siapkan diri sebelum alarm adzan berbunyi! 📱'
                : 'Sinkronisasi jadwal otomatis didasarkan pada standar metode Kemenag/MUI (Metode 11). Presisi menit dapat bergeser mengikuti koordinat geografis lokal.'}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}