// src/pages/DashboardDewasa.jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SURAH_LIST, SURAH_VERSES } from '../data/quranData';
import { DZIKIR_LIST } from '../data/dzikirData';
import { Award, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function DashboardDewasa({ section }) {
  const { profile } = useApp();
  const [activeSection, setActiveSection] = useState(section || 'quran');

  useEffect(() => {
    if (section) {
      setActiveSection(section);
    }
  }, [section]);

  const renderContent = () => {
    switch (activeSection) {
      case 'quran':
        return <QuranReader />;
      case 'guide':
        return <AdultSholatGuide />;
      case 'schedule':
        return <AdultPrayerSchedule />;
      case 'kiblat':
        return <AdultKiblat />;
      case 'dzikir':
        return <AdultDzikirCounter />;
      case 'profile':
        return <UserProfileSection profile={profile} />;
      default:
        return <QuranReader />;
    }
  };

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      {renderContent()}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// PROFIL PENGGUNA
// ────────────────────────────────────────────────────────────────────────
function UserProfileSection({ profile }) {
  return (
    <div className="card" style={{ border: '4px solid #113C2B', boxShadow: '6px 6px 0px #113C2B', borderRadius: '24px', backgroundColor: '#FFFFFF', padding: '24px' }}>
      <div style={{ borderBottom: '3.5px solid #113C2B', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#113C2B', margin: 0 }}>Profil Pengguna 👤</h2>
        <p style={{ fontSize: '14px', fontWeight: 800, color: '#556B52', margin: '4px 0 0' }}>Informasi akun dan statistik pencapaian ibadah Anda.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'start' }}>
        <div style={{ border: '3px solid #113C2B', borderRadius: '18px', padding: '20px', backgroundColor: '#F8FAF8', boxShadow: '4px 4px 0px #113C2B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#D4DDD3',
              border: '3px solid #113C2B', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', fontWeight: 900, color: '#113C2B'
            }}>
              {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#113C2B' }}>{profile?.name || 'Pengguna'}</h3>
              <p style={{ margin: '2px 0 0', fontSize: '13px', fontWeight: 800, color: '#556B52' }}>{profile?.email || 'email@domain.com'}</p>
            </div>
          </div>
          
          <div style={{ borderTop: '2px dashed #113C2B', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#113C2B' }}>
              <span>Mode Aplikasi:</span>
              <span style={{ backgroundColor: '#D4DDD3', padding: '2px 8px', borderRadius: '6px', border: '1.5px solid #113C2B', fontSize: '12px', fontWeight: 900 }}>Dewasa</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#113C2B' }}>
              <span>Bergabung Sejak:</span>
              <span style={{ fontWeight: 800 }}>{profile?.createdAt || 'Juli 2026'}</span>
            </div>
          </div>
        </div>

        <div style={{ border: '3px solid #113C2B', borderRadius: '18px', padding: '20px', backgroundColor: '#F8FAF8', boxShadow: '4px 4px 0px #113C2B' }}>
          <h4 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 900, color: '#113C2B', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} /> Ringkasan Aktivitas Hari Ini
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '2.5px solid #113C2B', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#556B52' }}>Target Dzikir</div>
              <div style={{ fontSize: '22px', fontWeight: 950, color: '#113C2B', marginTop: '4px' }}>3 / 3</div>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', border: '2.5px solid #113C2B', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#556B52' }}>Surah Dibaca</div>
              <div style={{ fontSize: '22px', fontWeight: 950, color: '#113C2B', marginTop: '4px' }}>1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 1. QURAN READER COMPONENT
// ────────────────────────────────────────────────────────────────────────
function QuranReader() {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSurahVerses = async (surahNumber) => {
    setLoading(true);
    setVerses([]);
    try {
      const res = await fetch(`https://quran-api-id.vercel.app/surahs/${surahNumber}`);
      if (res.ok) {
        const data = await res.json();
        setVerses(data.verses || []);
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      console.log("Using local quran fallback");
      const fallback = (SURAH_VERSES && SURAH_VERSES[surahNumber]) || [];
      setVerses(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSurah = (surah) => {
    setSelectedSurah(surah);
    fetchSurahVerses(surah.number);
  };

  const filteredSurahs = (SURAH_LIST || []).filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.translation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedSurah) {
    return (
      <div className="card" style={{ border: '4px solid #113C2B', boxShadow: '6px 6px 0px #113C2B', borderRadius: '24px', backgroundColor: '#FFFFFF', padding: '24px' }}>
        <button 
          onClick={() => setSelectedSurah(null)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: '#D4DDD3', color: '#113C2B', border: '3px solid #113C2B',
            borderRadius: '12px', padding: '8px 16px', fontWeight: 900, cursor: 'pointer',
            marginBottom: '20px', boxShadow: '2px 2px 0px #113C2B'
          }}
        >
          <ArrowLeft size={16} /> Kembali ke Daftar Surah
        </button>

        <div style={{ textAlign: 'center', borderBottom: '3.5px solid #113C2B', paddingBottom: '20px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#113C2B', margin: '0 0 6px' }}>
            Surah {selectedSurah.name}
          </h2>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#556B52', margin: 0 }}>
            {selectedSurah.translation} • {selectedSurah.versesCount} Ayat • {selectedSurah.type}
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', fontWeight: 900, color: '#113C2B' }}>
            <RefreshCw className="animate-spin" style={{ margin: '0 auto 12px' }} size={32} />
            Memuat ayat-ayat suci...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
              <div style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', margin: '20px 0', fontFamily: 'serif', color: '#113C2B' }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            )}
            
            {verses.length > 0 ? (
              verses.map((v, idx) => {
                // Penanganan aman untuk menghindari render object
                const numberDisplay = typeof v.number === 'object' ? (v.number?.inSurah || idx + 1) : v.number;
                const arabicText = v.arabic || (typeof v.text === 'object' ? v.text?.arab : v.text);
                const translationText = typeof v.translation === 'object' ? v.translation?.id : v.translation;

                return (
                  <div key={idx} style={{ borderBottom: '1px dashed #E2E8F0', paddingBottom: '20px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '12px' }}>
                      <span style={{
                        width: '32px', height: '32px', borderRadius: '50%', border: '2.5px solid #113C2B',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px',
                        fontWeight: 900, color: '#113C2B', backgroundColor: '#D4DDD3', flexShrink: 0
                      }}>
                        {numberDisplay}
                      </span>
                      <p style={{
                        fontSize: '26px', direction: 'rtl', textAlign: 'right', margin: 0,
                        fontFamily: 'serif', lineHeight: '2', color: '#113C2B', flex: 1
                      }}>
                        {arabicText}
                      </p>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#113C2B', margin: 0, paddingLeft: '48px', lineHeight: 1.6 }}>
                      {translationText}
                    </p>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#F8FAF8', border: '3px dashed #113C2B', borderRadius: '16px' }}>
                <p style={{ fontWeight: 800, color: '#113C2B', margin: '0 0 8px' }}>Detail ayat untuk Surah ini belum terunduh.</p>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#556B52', margin: 0 }}>Pastikan Anda terhubung ke internet untuk mengambil data 30 Juz secara penuh.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card" style={{ border: '4px solid #113C2B', boxShadow: '6px 6px 0px #113C2B', borderRadius: '24px', backgroundColor: '#FFFFFF', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', borderBottom: '3.5px solid #113C2B', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#113C2B', margin: 0 }}>Al-Qur'an Digital 📖</h2>
          <p style={{ fontSize: '14px', fontWeight: 800, color: '#556B52', margin: '4px 0 0' }}>Membaca 30 Juz Al-Qur'an lengkap dengan terjemahan Bahasa Indonesia.</p>
        </div>
        <input 
          type="text" 
          placeholder="Cari Surah..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px 16px', borderRadius: '12px', border: '3px solid #113C2B',
            fontSize: '14px', fontWeight: 700, outline: 'none', width: '220px',
            backgroundColor: '#F8FAF8'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredSurahs.map((surah) => (
          <div 
            key={surah.number}
            onClick={() => handleSelectSurah(surah)}
            style={{
              padding: '16px', borderRadius: '16px', border: '3px solid #113C2B',
              backgroundColor: '#F8FAF8', cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '16px', transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              boxShadow: '3px 3px 0px #113C2B'
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D4DDD3',
              border: '2.5px solid #113C2B', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#113C2B'
            }}>
              {surah.number}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#113C2B' }}>
                {surah.name}
              </h4>
              <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: 800, color: '#556B52' }}>
                {surah.translation}
              </p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: 800, color: '#113C2B', backgroundColor: '#D4DDD3', padding: '4px 8px', borderRadius: '6px' }}>
              {surah.versesCount} Ayat
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 2. BACAAN SHOLAT COMPONENT
// ────────────────────────────────────────────────────────────────────────
function AdultSholatGuide() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const guideData = [
    { title: "Niat Sholat & Takbiratul Ihram", arabic: "اللهُ أَكْبَرُ", latin: "Allahu Akbar", meaning: "Allah Maha Besar.", desc: "Mengangkat kedua belah tangan sejajar dengan telinga atau bahu seraya membaca takbiratul ihram." },
    { title: "Membaca Doa Iftitah", arabic: "اللهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ للهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلاً...", latin: "Allahu akbar kabira, wal-hamdu lillahi katsira...", meaning: "Allah Maha Besar dengan sebesar-besarnya. Segala puji bagi Allah sebanyak-banyaknya...", desc: "Dibaca setelah takbiratul ihram sebelum membaca Al-Fatihah." },
    { title: "Rukuk dengan Tumakninah", arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ (٣x)", latin: "Subhana rabbiyal-'adhimi wa bihamdih (3x)", meaning: "Maha Suci Tuhanku Yang Maha Agung dan segala puji bagi-Nya (3 kali).", desc: "Membungkukkan badan dengan punggung rata dan kedua tangan memegang lutut." },
    { title: "Iktidal (Bangkit dari Rukuk)", arabic: "سَمِعَ اللهُ لِمَنْ حَمِدَهُ", latin: "Sami'allahu liman hamidah", meaning: "Allah mendengar orang yang memuji-Nya.", desc: "Berdiri tegak kembali setelah rukuk." },
    { title: "Sujud dengan Tumakninah", arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ وَبِحَمْدِهِ (٣x)", latin: "Subhana rabbiyal-a'la wa bihamdih (3x)", meaning: "Maha Suci Tuhanku Yang Maha Tinggi dan segala puji bagi-Nya (3 kali).", desc: "Menempelkan dahi, hidung, kedua telapak tangan, kedua lutut, dan jari-jari kaki ke lantai." },
    { title: "Duduk di Antara Dua Sujud", arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي", latin: "Rabbighfirli warhamni wajburni warfa'ni warzuqni wahdini wa 'afini wa'fu 'anni", meaning: "Ya Tuhanku ampunilah aku, rahmatilah aku, cukupkanlah aku, tinggikanlah derajatku, berilah aku rezeki, berilah aku petunjuk...", desc: "Duduk bersimpuh setelah sujud pertama." },
    { title: "Tahiyyat / Tasyahud Akhir", arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ...", latin: "At-tahiyyatul-mubarakatus-salawatut-tayyibatu lillah...", meaning: "Segala penghormatan yang penuh berkah, sholat, dan kebaikan adalah milik Allah...", desc: "Membaca tasyahud akhir sebelum mengucapkan salam pada rakaat terakhir." }
  ];

  return (
    <div className="card" style={{ border: '4px solid #113C2B', boxShadow: '6px 6px 0px #113C2B', borderRadius: '24px', backgroundColor: '#FFFFFF', padding: '24px' }}>
      <div style={{ borderBottom: '3.5px solid #113C2B', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#113C2B', margin: 0 }}>Tuntunan & Bacaan Sholat 📖</h2>
        <p style={{ fontSize: '14px', fontWeight: 800, color: '#556B52', margin: '4px 0 0' }}>Panduan tata cara sholat fardhu beserta bacaan Arab, Latin, dan terjemahan lengkap.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {guideData.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              style={{
                textAlign: 'left', padding: '14px 18px', borderRadius: '12px',
                border: selectedIdx === idx ? '3px solid #113C2B' : '3px solid transparent',
                backgroundColor: selectedIdx === idx ? '#D4DDD3' : '#F8FAF8',
                color: '#113C2B', fontWeight: 900, fontSize: '14px', cursor: 'pointer',
                boxShadow: selectedIdx === idx ? '2px 2px 0px #113C2B' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {idx + 1}. {step.title}
            </button>
          ))}
        </div>

        <div style={{ border: '3.5px solid #113C2B', borderRadius: '18px', padding: '24px', backgroundColor: '#F8FAF8', boxShadow: '4px 4px 0px #113C2B' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 900, color: '#113C2B', borderBottom: '2.5px solid #113C2B', paddingBottom: '8px' }}>
            {guideData[selectedIdx].title}
          </h3>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#556B52', marginBottom: '24px', lineHeight: 1.5 }}>
            {guideData[selectedIdx].desc}
          </p>

          <div style={{
            backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '14px',
            border: '2.5px solid #113C2B', textAlign: 'center', marginBottom: '20px'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'serif', direction: 'rtl', lineHeight: '1.8', color: '#113C2B' }}>
              {guideData[selectedIdx].arabic}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#113C2B', fontStyle: 'italic', marginTop: '12px' }}>
              "{guideData[selectedIdx].latin}"
            </div>
          </div>

          <div style={{ backgroundColor: '#D4DDD3', padding: '16px', borderRadius: '12px', border: '2.5px solid #113C2B' }}>
            <h4 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 900, color: '#113C2B', textTransform: 'uppercase' }}>Artinya:</h4>
            <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#113C2B', lineHeight: 1.5 }}>
              {guideData[selectedIdx].meaning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 3. JADWAL SHOLAT COMPONENT (WITH GEOLOCATION & LIVE API)
// ────────────────────────────────────────────────────────────────────────
function AdultPrayerSchedule() {
  const [selectedCity, setSelectedCity] = useState("Jakarta");
  const [useGPS, setUseGPS] = useState(false);
  const [gpsLocation, setGpsLocation] = useState(null);
  const [gpsError, setGpsError] = useState("");
  const [liveSchedule, setLiveSchedule] = useState(null);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  const mockSchedules = {
    "Jakarta": { Subuh: "04:43", Terbit: "06:01", Dzuhur: "12:01", Ashar: "15:23", Maghrib: "17:58", Isya: "19:11" },
    "Surabaya": { Subuh: "04:22", Terbit: "05:40", Dzuhur: "11:38", Ashar: "14:59", Maghrib: "17:34", Isya: "18:48" },
    "Bandung": { Subuh: "04:42", Terbit: "06:00", Dzuhur: "12:00", Ashar: "15:22", Maghrib: "17:58", Isya: "19:10" },
    "Medan": { Subuh: "04:58", Terbit: "06:22", Dzuhur: "12:28", Ashar: "15:52", Maghrib: "18:32", Isya: "19:46" },
    "Makassar": { Subuh: "04:45", Terbit: "06:02", Dzuhur: "12:03", Ashar: "15:25", Maghrib: "17:59", Isya: "19:12" }
  };

  const getActiveSchedule = () => {
    if (useGPS && liveSchedule) return liveSchedule;
    return mockSchedules[selectedCity] || mockSchedules["Jakarta"];
  };

  const activateGPS = () => {
    if (!navigator.geolocation) {
      setGpsError("Browser Anda tidak mendukung deteksi lokasi.");
      return;
    }
    setLoadingSchedule(true);
    setGpsError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setGpsLocation({ lat: latitude, lng: longitude });
        setUseGPS(true);
        
        try {
          const dateStr = new Date().toISOString().split('T')[0];
          // Panggil Aladhan API untuk koordinat pengguna
          const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=2`);
          if (res.ok) {
            const data = await res.json();
            const timings = data.data.timings;
            setLiveSchedule({
              Subuh: timings.Fajr,
              Terbit: timings.Sunrise,
              Dzuhur: timings.Dhuhr,
              Ashar: timings.Asr,
              Maghrib: timings.Maghrib,
              Isya: timings.Isha
            });
          } else {
            throw new Error("Failed to load");
          }
        } catch {
          setGpsError("Gagal mengambil jadwal real-time. Menggunakan jadwal kota terdekat.");
          setUseGPS(false);
        } finally {
          setLoadingSchedule(false);
        }
      },
      (err) => {
        setGpsError("Akses GPS ditolak atau tidak terdeteksi. Silakan pilih kota secara manual.");
        setUseGPS(false);
        setLoadingSchedule(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const schedule = getActiveSchedule();

  return (
    <div className="card" style={{ border: '4px solid #113C2B', boxShadow: '6px 6px 0px #113C2B', borderRadius: '24px', backgroundColor: '#FFFFFF', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '3.5px solid #113C2B', paddingBottom: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#113C2B', margin: 0 }}>Jadwal Waktu Sholat ⏱️</h2>
          <p style={{ fontSize: '14px', fontWeight: 800, color: '#556B52', margin: '4px 0 0' }}>Jadwal sholat fardhu harian agar ibadah tepat waktu.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={activateGPS}
            style={{
              padding: '10px 16px', borderRadius: '12px', border: '3px solid #113C2B',
              fontSize: '13px', fontWeight: 900, backgroundColor: useGPS ? '#113C2B' : '#FFFFFF',
              color: useGPS ? '#FFFFFF' : '#113C2B', cursor: 'pointer', boxShadow: '2px 2px 0px #113C2B'
            }}
          >
            📍 {useGPS ? "GPS Aktif" : "Gunakan GPS Saya"}
          </button>
          
          <select 
            value={selectedCity} 
            disabled={useGPS}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: '10px 16px', borderRadius: '12px', border: '3px solid #113C2B',
              fontSize: '14px', fontWeight: 900, outline: 'none', backgroundColor: useGPS ? '#E8EFE8' : '#D4DDD3',
              color: '#113C2B', cursor: useGPS ? 'not-allowed' : 'pointer', boxShadow: '2px 2px 0px #113C2B',
              opacity: useGPS ? 0.6 : 1
            }}
          >
            <option value="Jakarta">DKI Jakarta</option>
            <option value="Surabaya">Surabaya</option>
            <option value="Bandung">Bandung</option>
            <option value="Medan">Medan</option>
            <option value="Makassar">Makassar</option>
          </select>
        </div>
      </div>

      {gpsError && (
        <div style={{ color: '#113C2B', fontWeight: 800, fontSize: '13px', border: '2px dashed #113C2B', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#F8FAF8', marginBottom: '20px' }}>
          ⚠️ {gpsError}
        </div>
      )}

      {loadingSchedule ? (
        <div style={{ textAlign: 'center', padding: '40px', fontWeight: 900, color: '#113C2B' }}>
          <RefreshCw className="animate-spin" style={{ margin: '0 auto 12px' }} size={32} />
          Mencari lokasi koordinat Anda & menghitung jadwal sholat...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
          {Object.entries(schedule).map(([prayer, time]) => (
            <div key={prayer} style={{
              textAlign: 'center', padding: '20px 12px', borderRadius: '16px',
              border: '3px solid #113C2B', backgroundColor: '#F8FAF8', boxShadow: '4px 4px 0px #113C2B'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#556B52', marginBottom: '6px' }}>{prayer}</div>
              <div style={{ fontSize: '26px', fontWeight: 950, color: '#113C2B', letterSpacing: '-0.5px' }}>{time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 4. KIBLAT SHOLAT COMPONENT (WITH DYNAMIC ANGLE CALCULATION & COMPASS)
// ────────────────────────────────────────────────────────────────────────
function AdultKiblat() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [qiblaAngle, setQiblaAngle] = useState(294); // Default untuk Indonesia
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [manualRotation, setManualRotation] = useState(0); // Simulator seret untuk desktop
  const [gpsStatus, setGpsStatus] = useState("Belum dideteksi");
  const [hasCompassSupport, setHasCompassSupport] = useState(false);

  // Kalkulasi Arah Kiblat (Azimuth Bearing ke Ka'bah: 21.4225 N, 39.8262 E)
  const calculateQiblaDirection = (lat, lng) => {
    const dLng = (39.8262 - lng) * Math.PI / 180;
    const latRad = lat * Math.PI / 180;
    const meccaLatRad = 21.4225 * Math.PI / 180;
    
    const y = Math.sin(dLng);
    const x = Math.cos(latRad) * Math.tan(meccaLatRad) - Math.sin(latRad) * Math.cos(dLng);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360;
    return Math.round(bearing);
  };

  useEffect(() => {
    // Jalankan geolokasi otomatis
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          setLatitude(lat);
          setLongitude(lng);
          const angle = calculateQiblaDirection(lat, lng);
          setQiblaAngle(angle);
          setGpsStatus(`Lokasi terdeteksi (Kiblat: ${angle}°)`);
        },
        () => {
          setGpsStatus("Akses GPS ditolak. Menggunakan estimasi default Indonesia (294°).");
        }
      );
    }

    // Tangkap sensor kompas magnetik handphone jika didukung
    const handleOrientation = (e) => {
      let heading = e.alpha; // Default fallback
      if (e.webkitCompassHeading) {
        heading = e.webkitCompassHeading; // iOS support
      }
      if (heading !== null) {
        setDeviceHeading(Math.round(heading));
        setHasCompassSupport(true);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // Hitung putaran panah penunjuk (Qibla Angle - Device Heading)
  const finalRotate = hasCompassSupport 
    ? (qiblaAngle - deviceHeading) 
    : (qiblaAngle - manualRotation);

  return (
    <div className="card" style={{ border: '4px solid #113C2B', boxShadow: '6px 6px 0px #113C2B', borderRadius: '24px', backgroundColor: '#FFFFFF', padding: '24px', textAlign: 'center' }}>
      <div style={{ borderBottom: '3.5px solid #113C2B', paddingBottom: '16px', marginBottom: '24px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#113C2B', margin: 0 }}>Penunjuk Arah Kiblat 🧭</h2>
        <p style={{ fontSize: '14px', fontWeight: 800, color: '#556B52', margin: '4px 0 0' }}>Kompas dinamis terkalibrasi presisi mengarah langsung ke Ka'bah.</p>
      </div>

      <div style={{ 
        fontSize: '13px', fontWeight: 800, color: '#113C2B', 
        backgroundColor: '#D4DDD3', border: '2px solid #113C2B', 
        padding: '8px 16px', borderRadius: '10px', display: 'inline-block',
        marginBottom: '20px'
      }}>
        📍 Status: <strong>{gpsStatus}</strong>
      </div>

      <div style={{ position: 'relative', width: '240px', height: '240px', margin: '30px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Outer Compass Ring */}
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          border: '6px solid #113C2B', backgroundColor: '#F8FAF8',
          boxShadow: '0 6px 0px rgba(17,60,43,0.15)', position: 'relative',
          transform: `rotate(${-deviceHeading}deg)`,
          transition: hasCompassSupport ? 'transform 0.1s ease' : 'none'
        }}>
          {/* Compass Cardinal Points */}
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', fontWeight: 950, color: '#113C2B', fontSize: '16px' }}>U</div>
          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', fontWeight: 950, color: '#113C2B', fontSize: '16px' }}>S</div>
          <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 950, color: '#113C2B', fontSize: '16px' }}>T</div>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 950, color: '#113C2B', fontSize: '16px' }}>B</div>

          {/* Compass Center Dot */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#113C2B',
            zIndex: 5
          }} />
        </div>

        {/* Dynamic Qibla Arrow (Points to Kaaba) */}
        <div style={{
          position: 'absolute', width: '4px', height: '100px', backgroundColor: '#113C2B',
          transformOrigin: 'bottom center',
          transform: `translateY(-50px) rotate(${finalRotate}deg)`,
          transition: 'transform 0.2s ease',
          zIndex: 8
        }}>
          {/* Arrow Head */}
          <div style={{
            width: '0', height: '0',
            borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
            borderBottom: '20px solid #113C2B',
            position: 'absolute', top: '-18px', left: '-8px'
          }} />
          {/* Mecca Kaaba Tag */}
          <div style={{
            position: 'absolute', top: '-48px', left: '50%', transform: 'translateX(-50%) rotate(${-finalRotate}deg)',
            fontSize: '26px'
          }}>🕋</div>
        </div>
      </div>

      {!hasCompassSupport && (
        <div style={{ maxWidth: '360px', margin: '20px auto 0' }}>
          <label style={{ fontSize: '13px', fontWeight: 900, display: 'block', marginBottom: '8px' }}>
            🧭 Putar simulator kompas manual (Desktop): {manualRotation}°
          </label>
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={manualRotation}
            onChange={(e) => setManualRotation(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#113C2B', cursor: 'pointer' }}
          />
        </div>
      )}

      <div style={{ 
        backgroundColor: '#D4DDD3', border: '2.5px solid #113C2B', 
        borderRadius: '16px', padding: '16px', display: 'inline-block',
        maxWidth: '460px', marginTop: '24px', textAlign: 'left'
      }}>
        <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 900, color: '#113C2B' }}>Arah Kiblat Terkalkulasi</h4>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#113C2B', lineHeight: 1.5 }}>
          Sudut Kiblat Anda adalah <strong>{qiblaAngle}°</strong> dari Utara. {hasCompassSupport ? "Pegang HP secara mendatar dan sejajarkan jarum kompas ke arah 🕋." : "Posisikan kompas hingga jarum menunjuk tegak lurus ke atas."}
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// 5. INTERACTIVE DZIKIR COUNTER COMPONENT
// ────────────────────────────────────────────────────────────────────────
function AdultDzikirCounter() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const list = DZIKIR_LIST || [];
  const activeDzikir = list[activeIdx];

  // Penanganan aman jika data dzikir belum siap
  if (!activeDzikir) {
    return (
      <div className="card" style={{ border: '4px solid #113C2B', borderRadius: '24px', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontWeight: 800, color: '#113C2B' }}>Data dzikir sedang tidak tersedia.</p>
      </div>
    );
  }

  const handleTap = () => {
    if (completed) return;

    if (count + 1 >= activeDzikir.target) {
      setCount(activeDzikir.target);
      setCompleted(true);
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    } else {
      setCount(prev => prev + 1);
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    }
  };

  const handleNext = () => {
    if (activeIdx + 1 < list.length) {
      setActiveIdx(prev => prev + 1);
      setCount(0);
      setCompleted(false);
    } else {
      alert("Alhamdulillah! Anda telah menyelesaikan seluruh rangkaian dzikir fardhu. 🌟");
      setActiveIdx(0);
      setCount(0);
      setCompleted(false);
    }
  };

  const handleReset = () => {
    setCount(0);
    setCompleted(false);
  };

  return (
    <div className="card" style={{ border: '4px solid #113C2B', boxShadow: '6px 6px 0px #113C2B', borderRadius: '24px', backgroundColor: '#FFFFFF', padding: '24px' }}>
      <div style={{ borderBottom: '3.5px solid #113C2B', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#113C2B', margin: 0 }}>Dzikir Setelah Sholat Fardhu 📿</h2>
        <p style={{ fontSize: '14px', fontWeight: 800, color: '#556B52', margin: '4px 0 0' }}>Hitung dzikir harian Anda dengan penghitung digital interaktif.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
        <div style={{ border: '3px solid #113C2B', borderRadius: '18px', padding: '20px', backgroundColor: '#F8FAF8', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 900, backgroundColor: '#D4DDD3', color: '#113C2B', border: '2px solid #113C2B', padding: '4px 10px', borderRadius: '8px' }}>
              DZIKIR {activeIdx + 1} DARI {list.length}
            </span>
            <h3 style={{ margin: '14px 0 6px', fontSize: '20px', fontWeight: 900, color: '#113C2B' }}>{activeDzikir.title}</h3>
            <p style={{ fontSize: '26px', fontWeight: 'bold', fontFamily: 'serif', direction: 'rtl', color: '#113C2B', margin: '14px 0', lineHeight: 1.5 }}>
              {activeDzikir.arabic}
            </p>
            <p style={{ fontSize: '13.5px', fontWeight: 700, fontStyle: 'italic', color: '#556B52', margin: '0 0 10px' }}>
              "{activeDzikir.latin}"
            </p>
          </div>
          <div style={{ borderTop: '2px dashed #113C2B', paddingTop: '10px', fontSize: '12.5px', fontWeight: 700, color: '#113C2B' }}>
            <strong>Artinya:</strong> {activeDzikir.translation}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div 
            onClick={handleTap}
            style={{
              width: '160px', height: '160px', borderRadius: '50%',
              border: '6px solid #113C2B', backgroundColor: completed ? '#D4DDD3' : '#FFFFFF',
              boxShadow: '0 8px 0px rgba(17,60,43,0.15)', margin: '0 auto 20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: completed ? 'default' : 'pointer', transition: 'all 0.1s ease',
              transform: completed ? 'none' : 'translateY(0px)'
            }}
          >
            {completed ? (
              <CheckCircle2 size={56} style={{ color: '#113C2B' }} />
            ) : (
              <>
                <div style={{ fontSize: '40px', fontWeight: 950, color: '#113C2B' }}>{count}</div>
                <div style={{ fontSize: '11px', fontWeight: 900, color: '#556B52', textTransform: 'uppercase' }}>TAPS TO {activeDzikir.target}</div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={handleReset}
              style={{
                backgroundColor: '#FFFFFF', color: '#113C2B', border: '3px solid #113C2B',
                borderRadius: '12px', padding: '10px 18px', fontWeight: 900, fontSize: '13px',
                cursor: 'pointer', boxShadow: '2px 2px 0px #113C2B'
              }}
            >
              Ulangi
            </button>
            <button
              onClick={handleNext}
              disabled={!completed && activeDzikir.target > 1}
              style={{
                backgroundColor: completed || activeDzikir.target === 1 ? '#113C2B' : '#D4DDD3',
                color: completed || activeDzikir.target === 1 ? '#FFFFFF' : '#113C2B',
                border: '3px solid #113C2B',
                borderRadius: '12px', padding: '10px 18px', fontWeight: 900, fontSize: '13px',
                cursor: (!completed && activeDzikir.target > 1) ? 'not-allowed' : 'pointer',
                boxShadow: '2px 2px 0px #113C2B',
                opacity: (!completed && activeDzikir.target > 1) ? 0.6 : 1
              }}
            >
              {activeIdx + 1 === list.length ? "Selesai" : "Selanjutnya"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}