import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SURAH_LIST, SURAH_VERSES } from '../data/quranData';
import { DZIKIR_LIST } from '../data/dzikirData';
import { Award, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

// Premium Minimalist Apple-like Design Styles (Matching Image 2 Theme)
const glassCardStyle = {
  background: '#FFFFFF',
  border: '1px solid rgba(99, 102, 241, 0.12)',
  boxShadow: '0 4px 24px rgba(99, 102, 241, 0.02)',
  borderRadius: '20px',
  padding: '24px',
  color: '#1F2937',
  position: 'relative',
  boxSizing: 'border-box'
};

const glassInnerCardStyle = {
  background: '#F9FAFB',
  border: '1px solid rgba(0, 0, 0, 0.04)',
  borderRadius: '14px',
  padding: '20px',
  position: 'relative',
  boxSizing: 'border-box'
};

const glassButtonStyle = {
  display: 'inline-flex', 
  alignItems: 'center', 
  gap: '8px',
  backgroundColor: 'rgba(99, 102, 241, 0.06)',
  border: 'none',
  color: '#4F46E5',
  borderRadius: '12px', 
  padding: '10px 18px', 
  fontWeight: 700, 
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  fontFamily: 'var(--font-headline)'
};

const glassButtonActiveStyle = {
  ...glassButtonStyle,
  backgroundColor: '#4F46E5',
  color: '#FFFFFF',
  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
};

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
      case 'kajian':
        return <AdultKajian />;
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
    <div style={glassCardStyle}>
      <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1F2937', margin: 0 }}>Profil Pengguna 👤</h2>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', margin: '4px 0 0' }}>Informasi akun dan statistik pencapaian ibadah Anda.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '24px', alignItems: 'start' }}>
        <div style={{ ...glassInnerCardStyle, flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', fontWeight: 800, color: '#4F46E5'
            }}>
              {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#1F2937' }}>{profile?.name || 'Pengguna'}</h3>
              <p style={{ margin: '2px 0 0', fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>{profile?.email || 'email@domain.com'}</p>
            </div>
          </div>
          
          <div style={{ borderTop: '1px dashed rgba(0, 0, 0, 0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#1F2937' }}>
              <span>Mode Aplikasi:</span>
              <span style={{ backgroundColor: 'rgba(99, 102, 241, 0.08)', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 800, color: '#4F46E5' }}>Dewasa</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#1F2937' }}>
              <span>Bergabung Sejak:</span>
              <span style={{ fontWeight: 700, color: '#4B5563' }}>{profile?.createdAt || 'Juli 2026'}</span>
            </div>
          </div>
        </div>

        <div style={{ ...glassInnerCardStyle, flex: 1, minWidth: '280px' }}>
          <h4 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 800, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} style={{ color: '#4F46E5' }} /> Ringkasan Aktivitas Hari Ini
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.06)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Target Dzikir</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#4F46E5', marginTop: '4px' }}>3 / 3</div>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.06)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Surah Dibaca</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>1</div>
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
  const { markSurahRead } = useApp();
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
    if (markSurahRead) {
      markSurahRead(surah.number, surah.name, surah.translation);
    }
  };

  const filteredSurahs = (SURAH_LIST || []).filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.translation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedSurah) {
    return (
      <div style={glassCardStyle}>
        <button 
          onClick={() => setSelectedSurah(null)}
          style={glassButtonStyle}
        >
          <ArrowLeft size={16} /> Kembali ke Daftar Surah
        </button>

        <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '20px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1F2937', margin: '0 0 6px' }}>
            Surah {selectedSurah.name}
          </h2>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#6B7280', margin: 0 }}>
            {selectedSurah.translation} • {selectedSurah.versesCount} Ayat • {selectedSurah.type}
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', fontWeight: 800, color: '#4F46E5' }}>
            <RefreshCw className="animate-spin" style={{ margin: '0 auto 12px' }} size={32} />
            Memuat ayat-ayat suci...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
              <div style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', margin: '20px 0', fontFamily: 'serif', color: '#1F2937' }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            )}
            
            {verses.length > 0 ? (
              verses.map((v, idx) => {
                const numberDisplay = typeof v.number === 'object' ? (v.number?.inSurah || idx + 1) : v.number;
                const arabicText = v.arabic || (typeof v.text === 'object' ? v.text?.arab : v.text);
                const translationText = typeof v.translation === 'object' ? v.translation?.id : v.translation;

                return (
                  <div key={idx} style={{ borderBottom: '1px dashed rgba(0, 0, 0, 0.06)', paddingBottom: '20px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '12px' }}>
                      <span style={{
                        width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(99, 102, 241, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px',
                        fontWeight: 800, color: '#4F46E5', backgroundColor: '#EEF2FF', flexShrink: 0
                      }}>
                        {numberDisplay}
                      </span>
                      <p style={{
                        fontSize: '26px', direction: 'rtl', textAlign: 'right', margin: 0,
                        fontFamily: 'serif', lineHeight: '2', color: '#1F2937', flex: 1
                      }}>
                        {arabicText}
                      </p>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#4B5563', margin: 0, paddingLeft: '48px', lineHeight: 1.6 }}>
                      {translationText}
                    </p>
                  </div>
                );
              })
            ) : (
              <div style={{ ...glassInnerCardStyle, borderStyle: 'dashed', textAlign: 'center' }}>
                <p style={{ fontWeight: 800, color: '#1F2937', margin: '0 0 8px' }}>Detail ayat untuk Surah ini belum terunduh.</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', margin: 0 }}>Pastikan Anda terhubung ke internet untuk mengambil data 30 Juz secara penuh.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={glassCardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1F2937', margin: 0 }}>Al-Qur'an Digital 📖</h2>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', margin: '4px 0 0' }}>Membaca 30 Juz Al-Qur'an lengkap dengan terjemahan Bahasa Indonesia.</p>
        </div>
        <input 
          type="text" 
          placeholder="Cari Surah..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.12)',
            fontSize: '14px', fontWeight: 700, outline: 'none', width: '220px',
            backgroundColor: '#F9FAFB', color: '#1F2937'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredSurahs.map((surah) => (
          <div 
            key={surah.number}
            onClick={() => handleSelectSurah(surah)}
            style={{
              ...glassInnerCardStyle,
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.05)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.backgroundColor = '#F9FAFB';
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.04)';
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#EEF2FF',
              border: '1px solid rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#4F46E5'
            }}>
              {surah.number}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1F2937' }}>
                {surah.name}
              </h4>
              <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>
                {surah.translation}
              </p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: 800, color: '#4F46E5', backgroundColor: '#EEF2FF', padding: '4px 8px', borderRadius: '6px' }}>
              {surah.versesCount} Ayat
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────
// 2. BACAAN SHOLAT COMPONENT (SESUAI HPT MUHAMMADIYAH)
// ────────────────────────────────────────────────────────────────────────
function AdultSholatGuide() {
  const { completeMovement } = useApp();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleSelectStep = (idx) => {
    setSelectedIdx(idx);
    const keys = ['takbir', 'takbir', 'iftitah', 'rukuk', 'itidal', 'sujud', 'duduk', 'tashahhud_awal', 'tashahhud_akhir', 'tashahhud_akhir', 'salam'];
    if (completeMovement && keys[idx]) {
      completeMovement(keys[idx]);
    }
  };

  const guideData = [
    { 
      title: "1. Berdiri Tegak (Qiyam) & Niat", 
      arabic: "", 
      latin: "Menghadap kiblat dan memantapkan niat di dalam hati.", 
      meaning: "Menghadap kiblat dan berniat ikhlas karena Allah Ta'ala tanpa perlu dilafalkan dengan lisan (tidak membaca ushalli).", 
      desc: "Berdiri tegak lurus menghadap kiblat dengan pandangan mengarah ke tempat sujud. Niat shalat ditanamkan secara ikhlas di dalam hati." 
    },
    { 
      title: "2. Takbiratul Ihram", 
      arabic: "اللَّهُ أَكْبَرُ", 
      latin: "Allāhu Akbar", 
      meaning: "Allah Maha Besar.", 
      desc: "Mengangkat kedua belah tangan sejajar telinga atau bahu dengan telapak tangan menghadap ke depan, bersamaan dengan mengucapkan kalimat takbir." 
    },
    { 
      title: "3. Bersedekap & Membaca Doa Iftitah", 
      arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ ، اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ ، اللَّهُمَّ اغْسِلْ خَطَايَايَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ", 
      latin: "Allaahumma baa'id bainii wabainaa khotoo yaa ya kamaa baa 'adta bainal masyriqi wal maghrib. Allaahumma naqqinii minal khotoo yaa kamaa yunqqots tsaubul abyadhuu minaddanas. Allaahummaghsil khotoo yaa ya bil maa i wats tsalji walbarod.", 
      meaning: "Ya Allah, jauhkanlah antara diriku dan kesalahan-kesalahanku sebagaimana Engkau jauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan-kesalahan sebagaimana dibersihkannya kain putih dari kotoran. Ya Allah, cucilah kesalahan-kesalahanku dengan air, salju, dan es.", 
      desc: "Meletakkan tangan kanan di atas punggung tangan kiri di dada, lalu membaca doa Iftitah di atas disusul Ta'awudz pelan dan Al-Fatihah." 
    },
    { 
      title: "4. Rukuk dengan Thuma'ninah", 
      arabic: "سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي", 
      latin: "Subhaanaka allaahuma robbanaa wabihamdika allaahumaghfirlii.", 
      meaning: "Maha Suci Engkau ya Allah, Tuhan kami, dan dengan memuji-Mu ya Allah, ampunilah aku.", 
      desc: "Membungkukkan badan dengan punggung dan kepala sejajar mendatar (rata seperti meja), kedua telapak tangan memegang lutut." 
    },
    { 
      title: "5. I'tidal (Bangkit dari Rukuk)", 
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ", 
      latin: "Sami'allaahu liman hamidah. Robbanaa walakalhamdu hamdan katsiiran thayyiban mubaarokan fiihi.", 
      meaning: "Allah maha mendengar orang yang memuji-Nya. Ya Tuhan kami, bagi-Mu segala puji, pujian yang banyak, baik, dan diberkahi di dalamnya.", 
      desc: "Bangkit dari rukuk hingga berdiri tegak lurus (thuma'ninah), mengangkat tangan saat bangkit lalu melepaskannya lurus ke bawah di samping badan." 
    },
    { 
      title: "6. Sujud dengan Thuma'ninah", 
      arabic: "سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي", 
      latin: "Subhaanaka allaahuma robbanaa wabihamdika allaahumaghfirlii.", 
      meaning: "Maha Suci Engkau ya Allah, Tuhan kami, dan dengan memuji-Mu ya Allah, ampunilah aku.", 
      desc: "Sujud bertumpu pada 7 anggota badan: dahi+hidung, kedua telapak tangan, kedua lutut, dan ujung jari-jari kedua kaki." 
    },
    { 
      title: "7. Duduk di Antara Dua Sujud", 
      arabic: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَاهْدِنِي وَارْزُقْنِي", 
      latin: "Allaahummaghfirlii warhamnii wajburnii wahdinii warzuqnii.", 
      meaning: "Ya Allah, ampunilah aku, rahmatilah aku, cukupkanlah aku, berilah aku petunjuk, dan berilah aku rezeki.", 
      desc: "Duduk bersimpuh Iftirasy (menduduki telapak kaki kiri, telapak kaki kanan ditegakkan) di antara dua sujud." 
    },
    { 
      title: "8. Tasyahud Awal", 
      arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", 
      latin: "Attahiyyaatu lillaahi washsholawaatu waththoyyibaat. Assalaamu 'alaika ayyuhannabiyyu warohmatullaahi wabarokaatuh. Assalaamu'alainaa wa'ala 'ibaadillaahi shshoolihiin. Asyhadu anlaa ilaaha illallaah waasyhadu annamuhammadan 'abduhu warosuuluh.", 
      meaning: "Segala kehormatan, kebahagiaan dan kebagusan adalah kepunyaan Allah. Semoga keselamatan bagi Engkau, wahai Nabi, beserta rahmat Allah dan berkah-Nya. Semoga keselamatan bagi kami dan bagi hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada Tuhan selain Allah dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya.", 
      desc: "Duduk Iftirasy pada rakaat kedua shalat 3 atau 4 rakaat. Jari telunjuk tangan kanan diacungkan lurus ke depan sejak awal duduk." 
    },
    { 
      title: "9. Tasyahud Akhir & Shalawat Nabi", 
      arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَآلِ إِبْرَاهِيمَ وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَآلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ", 
      latin: "Allaahumma sholli 'alaa Muhammad wa'alaa aali Muhammad. Kamaa shollaita 'alaa ibroohiim wa aali ibroohiim. Wabaarik 'alaa Muhammad wa aali Muhammad. Kamaa baarokta 'alaa ibroohiim wa aali ibroohiim. Innaka hamiidummajiid.", 
      meaning: "Ya Allah, limpahkanlah kemurahan-Mu kepada Muhammad dan keluarganya, sebagaimana telah Engkau limpahkan kepada Ibrahim dan keluarganya. Dan berkahilah Muhammad beserta keluarganya, sebagaimana telah Engkau berkahi Ibrahim dan keluarganya. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.", 
      desc: "Duduk Tawarruk (pantat di lantai, kaki kiri di bawah kaki kanan). Membaca Tasyahud awal dilanjutkan Shalawat Ibrahimiyah." 
    },
    { 
      title: "10. Doa Sesudah Tasyahud Akhir", 
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالَمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ", 
      latin: "Allaahumma innii a'uudzubika min 'adzaabi jahannam. Wamin 'adzaabil qobri. Wamin fitnatil mahyaa walmamaati. Wamin syarri fitnatil masiihiddadjaal.", 
      meaning: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari siksa neraka Jahannam, dari siksa kubur, dari fitnah kehidupan dan kematian, dan dari kejahatan fitnah Al-Masih Ad-Dajjal.", 
      desc: "Membaca doa perlindungan 4 hal pada tasyahud akhir sebelum mengucapkan salam." 
    },
    { 
      title: "11. Salam (Kanan & Kiri)", 
      arabic: "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ", 
      latin: "Assalāmu 'alaikum wa raḥmatullāhi wa barakātuh.", 
      meaning: "Semoga keselamatan, rahmat Allah, dan berkah-Nya dilimpahkan kepadamu.", 
      desc: "Menolehkan kepala ke arah kanan hingga pipi kanan terlihat dari belakang, kemudian menoleh ke kiri dan membaca salam yang sama." 
    }
  ];

  return (
    <div style={glassCardStyle}>
      <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1F2937', margin: 0 }}>Tuntunan & Bacaan Sholat Tarjih 📖</h2>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', margin: '4px 0 0' }}>Panduan tata cara sholat fardhu sesuai HPT Muhammadiyah (RS PKU Muhammadiyah Cepu).</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '520px', overflowY: 'auto', paddingRight: '6px' }}>
          {guideData.map((step, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectStep(idx)}
              style={selectedIdx === idx ? glassButtonActiveStyle : glassButtonStyle}
            >
              {step.title}
            </button>
          ))}
        </div>

        <div style={glassInnerCardStyle}>
          <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 800, color: '#1F2937', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '8px' }}>
            {guideData[selectedIdx].title}
          </h3>
          <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#6B7280', marginBottom: '20px', lineHeight: 1.5 }}>
            {guideData[selectedIdx].desc}
          </p>

          {guideData[selectedIdx].arabic && (
            <div style={{
              backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px',
              border: '1px solid rgba(0, 0, 0, 0.06)', textAlign: 'center', marginBottom: '16px'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'serif', direction: 'rtl', lineHeight: '1.8', color: '#1F2937' }}>
                {guideData[selectedIdx].arabic}
              </div>
              {guideData[selectedIdx].latin && (
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#4F46E5', fontStyle: 'italic', marginTop: '10px' }}>
                  "{guideData[selectedIdx].latin}"
                </div>
              )}
            </div>
          )}

          <div style={{ backgroundColor: '#EEF2FF', padding: '14px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
            <h4 style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 800, color: '#4F46E5', textTransform: 'uppercase' }}>Artinya:</h4>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#1F2937', lineHeight: 1.5 }}>
              {guideData[selectedIdx].meaning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// KAJIAN & BERITA ISLAM COMPONENT (AUTOMATED RSS FEED & YOUTUBE GRID)
// ────────────────────────────────────────────────────────────────────────
function AdultKajian() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'video', 'news'
  const [playingVideo, setPlayingVideo] = useState(null);
  const [liveNews, setLiveNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);

  const defaultItems = [
    {
      id: 'vid-1',
      type: 'video',
      title: 'Tata Cara Sholat Nabi - Ustadz Adi Hidayat',
      author: 'Adi Hidayat Official',
      youtubeId: 'k5j4a9wPj3A',
      thumbnail: 'https://i.ytimg.com/vi/k5j4a9wPj3A/hqdefault.jpg'
    },
    {
      id: 'vid-2',
      type: 'video',
      title: 'Fiqh Sholat: Makna Takbir dan Doa Iftitah - Ustadz Adi Hidayat',
      author: 'Adi Hidayat Official',
      youtubeId: 'Cj890-0j11o',
      thumbnail: 'https://i.ytimg.com/vi/Cj890-0j11o/hqdefault.jpg'
    },
    {
      id: 'vid-3',
      type: 'video',
      title: 'Cara, Makna dan Rahasia Ruku dalam Sholat - Ustadz Adi Hidayat',
      author: 'Adi Hidayat Official',
      youtubeId: 'cM35s7u6w1M',
      thumbnail: 'https://i.ytimg.com/vi/cM35s7u6w1M/hqdefault.jpg'
    },
    {
      id: 'vid-4',
      type: 'video',
      title: 'Hikmah Di Balik Bacaan Doa Sujud - Ustadz Adi Hidayat',
      author: 'Adi Hidayat Official',
      youtubeId: 'J_j8J4W-g3s',
      thumbnail: 'https://i.ytimg.com/vi/J_j8J4W-g3s/hqdefault.jpg'
    },
    {
      id: 'vid-5',
      type: 'video',
      title: 'Tanya Jawab Seputar Sholat - Ustadz Adi Hidayat (Penjelasan Ilmiah)',
      author: 'Adi Hidayat Official',
      youtubeId: 'l_p3gM9v8gA',
      thumbnail: 'https://i.ytimg.com/vi/l_p3gM9v8gA/hqdefault.jpg'
    },
    {
      id: 'news-1',
      type: 'news',
      title: 'Kalender Hijriah Global 1448 H Muhammadiyah: Link Akses & Jadwal',
      author: 'detiknews',
      url: 'https://muhammadiyah.or.id',
      thumbnail: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'news-2',
      type: 'news',
      title: 'Hukum Menunda Penguburan Jenazah dalam Islam, Kapan Diperbolehkan?',
      author: 'SindoNews',
      url: 'https://sindonews.com',
      thumbnail: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'news-3',
      type: 'news',
      title: 'Bacaan Dzikir Pendek Sehari-hari, Yuk Amalkan Setiap Hari!',
      author: 'detikhikmah',
      url: 'https://detik.com/hikmah',
      thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&auto=format&fit=crop&q=60'
    }
  ];

  // Option A: Auto-update news dynamically via live RSS Feed
  useEffect(() => {
    async function fetchLiveNews() {
      setLoadingNews(true);
      try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.republika.co.id/rss/khazanah');
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            const fetched = data.items.slice(0, 6).map((item, idx) => ({
              id: `rss-${idx}`,
              type: 'news',
              title: item.title,
              author: 'Republika Islam',
              url: item.link,
              thumbnail: item.thumbnail || item.enclosure?.link || 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&auto=format&fit=crop&q=60'
            }));
            setLiveNews(fetched);
          }
        }
      } catch (err) {
        console.log('RSS Feed auto-update fallback:', err);
      } finally {
        setLoadingNews(false);
      }
    }
    fetchLiveNews();
  }, []);

  const items = liveNews.length > 0 ? [...defaultItems.filter(i => i.type === 'video'), ...liveNews] : defaultItems;

  const filteredItems = items.filter(item => {
    if (activeTab === 'video') return item.type === 'video';
    if (activeTab === 'news') return item.type === 'news';
    return true;
  });

  const handleCardClick = (item) => {
    if (item.type === 'video') {
      window.open(`https://www.youtube.com/watch?v=${item.youtubeId}`, '_blank');
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  return (
    <div style={glassCardStyle}>
      {/* Header Section */}
      <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1F2937', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔥</span> INSPIRASI & KAJIAN HARI INI
        </h2>
        <p style={{ fontSize: '13.5px', fontWeight: 600, color: '#6B7280', margin: 0 }}>
          Pilihan video kajian YouTube dan artikel berita keislaman terkini.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('all')}
          style={activeTab === 'all' ? glassButtonActiveStyle : glassButtonStyle}
        >
          🌐 Semua Content ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('video')}
          style={activeTab === 'video' ? glassButtonActiveStyle : glassButtonStyle}
        >
          ▶ Video Kajian ({items.filter(i => i.type === 'video').length})
        </button>
        <button
          onClick={() => setActiveTab('news')}
          style={activeTab === 'news' ? glassButtonActiveStyle : glassButtonStyle}
        >
          📰 Berita & Artikel ({items.filter(i => i.type === 'news').length})
        </button>
      </div>

      {/* Modal Video Player */}
      {playingVideo && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: '24px', width: '100%', maxWidth: '740px',
            overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ fontWeight: 800, fontSize: '15px', color: '#1F2937', flex: 1, paddingRight: '12px' }}>
                {playingVideo.title}
              </div>
              <button
                onClick={() => setPlayingVideo(null)}
                style={{
                  border: 'none', background: '#F3F4F6', borderRadius: '50%', width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer', color: '#374151'
                }}
              >
                ✕
              </button>
            </div>
            
            {/* Embedded YouTube Frame */}
            <div style={{ aspectRatio: '16/9', backgroundColor: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1&rel=0`}
                title={playingVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>

            {/* Modal Bottom Bar with Direct YouTube Link Button */}
            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', backgroundColor: '#F9FAFB' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#4B5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#10B981', fontWeight: 900 }}>✓</span> {playingVideo.author}
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${playingVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  backgroundColor: '#DC2626', color: '#FFFFFF', padding: '8px 16px',
                  borderRadius: '10px', fontWeight: 800, fontSize: '12.5px', textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
                }}
              >
                ▶ Tonton Langsung di YouTube ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Content Cards Grid (Matching Reference Screenshot 2) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '16px' }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)';
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
            }}
          >
            {/* Thumbnail Box */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#E5E7EB', overflow: 'hidden' }}>
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  // Fallback thumbnail if YouTube thumbnail fails
                  e.target.src = 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=500&auto=format&fit=crop&q=60';
                }}
              />
              {/* Type Badge at Bottom-Right */}
              <div style={{
                position: 'absolute', bottom: '8px', right: '8px',
                backgroundColor: item.type === 'video' ? '#DC2626' : 'rgba(17, 24, 39, 0.85)',
                color: '#FFFFFF', fontSize: '10.5px', fontWeight: 800,
                padding: '3px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                {item.type === 'video' ? '▶ Video' : '📰 Berita'}
              </div>
            </div>

            {/* Card Content Body */}
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
              <h4 style={{
                margin: '0 0 10px', fontSize: '13.5px', fontWeight: 800, color: '#1F2937',
                lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden', height: '38px'
              }}>
                {item.title}
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 700, color: '#4B5563' }}>
                <span style={{ color: '#10B981', fontWeight: 900, fontSize: '12px' }}>✓</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.author}</span>
              </div>
            </div>
          </div>
        ))}
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
    <div style={glassCardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1F2937', margin: 0 }}>Jadwal Waktu Sholat ⏱️</h2>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', margin: '4px 0 0' }}>Jadwal sholat fardhu harian agar ibadah tepat waktu.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={activateGPS}
            style={useGPS ? glassButtonActiveStyle : glassButtonStyle}
          >
            📍 {useGPS ? "GPS Aktif" : "Gunakan GPS Saya"}
          </button>
          
          <select 
            value={selectedCity} 
            disabled={useGPS}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.15)',
              fontSize: '14px', fontWeight: 700, outline: 'none', backgroundColor: useGPS ? 'rgba(99, 102, 241, 0.02)' : '#FFFFFF',
              color: '#4F46E5', cursor: useGPS ? 'not-allowed' : 'pointer',
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
        <div style={{ color: '#b91c1c', fontWeight: 700, fontSize: '13px', border: '1px dashed rgba(239, 68, 68, 0.15)', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#FFF5F5', marginBottom: '20px' }}>
          ⚠️ {gpsError}
        </div>
      )}

      {loadingSchedule ? (
        <div style={{ textAlign: 'center', padding: '40px', fontWeight: 800, color: '#4F46E5' }}>
          <RefreshCw className="animate-spin" style={{ margin: '0 auto 12px' }} size={32} />
          Mencari lokasi koordinat Anda & menghitung jadwal sholat...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
          {Object.entries(schedule).map(([prayer, time]) => (
            <div key={prayer} style={glassInnerCardStyle}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#6B7280', marginBottom: '6px', textAlign: 'center' }}>{prayer}</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#4F46E5', letterSpacing: '-0.5px', textAlign: 'center' }}>{time}</div>
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
  const [qiblaAngle, setQiblaAngle] = useState(294); 
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [manualRotation, setManualRotation] = useState(0); 
  const [gpsStatus, setGpsStatus] = useState("Belum dideteksi");
  const [hasCompassSupport, setHasCompassSupport] = useState(false);

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

    const handleOrientation = (e) => {
      let heading = e.alpha;
      if (e.webkitCompassHeading) {
        heading = e.webkitCompassHeading;
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

  const finalRotate = hasCompassSupport 
    ? (qiblaAngle - deviceHeading) 
    : (qiblaAngle - manualRotation);

  return (
    <div style={{ ...glassCardStyle, textAlign: 'center' }}>
      <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px', marginBottom: '24px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1F2937', margin: 0 }}>Penunjuk Arah Kiblat 🧭</h2>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', margin: '4px 0 0' }}>Kompas dinamis terkalibrasi presisi mengarah langsung ke Ka'bah.</p>
      </div>

      <div style={{ 
        fontSize: '13px', fontWeight: 700, color: '#4F46E5', 
        backgroundColor: '#EEF2FF', border: '1px solid rgba(99, 102, 241, 0.15)', 
        padding: '8px 16px', borderRadius: '10px', display: 'inline-block',
        marginBottom: '20px'
      }}>
        📍 Status: <strong>{gpsStatus}</strong>
      </div>

      <div style={{ position: 'relative', width: '240px', height: '240px', margin: '30px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          border: '4px solid rgba(99, 102, 241, 0.15)', backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(99, 102, 241, 0.04)', position: 'relative',
          transform: `rotate(${-deviceHeading}deg)`,
          transition: hasCompassSupport ? 'transform 0.1s ease' : 'none'
        }}>
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', fontWeight: 800, color: '#1F2937', fontSize: '16px' }}>U</div>
          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', fontWeight: 800, color: '#1F2937', fontSize: '16px' }}>S</div>
          <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#1F2937', fontSize: '16px' }}>T</div>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#1F2937', fontSize: '16px' }}>B</div>

          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#4F46E5',
            zIndex: 5
          }} />
        </div>

        <div style={{
          position: 'absolute', width: '4px', height: '100px', backgroundColor: '#4F46E5',
          transformOrigin: 'bottom center',
          transform: `translateY(-50px) rotate(${finalRotate}deg)`,
          transition: 'transform 0.2s ease',
          zIndex: 8
        }}>
          <div style={{
            width: '0', height: '0',
            borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
            borderBottom: '20px solid #4F46E5',
            position: 'absolute', top: '-18px', left: '-8px'
          }} />
          <div style={{
            position: 'absolute', top: '-48px', left: '50%', transform: 'translateX(-50%) rotate(${-finalRotate}deg)',
            fontSize: '26px'
          }}>🕋</div>
        </div>
      </div>

      {!hasCompassSupport && (
        <div style={{ maxWidth: '360px', margin: '20px auto 0' }}>
          <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
            🧭 Putar simulator kompas manual (Desktop): {manualRotation}°
          </label>
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={manualRotation}
            onChange={(e) => setManualRotation(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#4F46E5', cursor: 'pointer' }}
          />
        </div>
      )}

      <div style={{ 
        backgroundColor: '#EEF2FF', border: '1px solid rgba(99, 102, 241, 0.15)', 
        borderRadius: '16px', padding: '16px', display: 'inline-block',
        maxWidth: '460px', marginTop: '24px', textAlign: 'left'
      }}>
        <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 800, color: '#4F46E5' }}>Arah Kiblat Terkalkulasi</h4>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#1F2937', lineHeight: 1.5 }}>
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

  if (!activeDzikir) {
    return (
      <div style={glassCardStyle}>
        <p style={{ fontWeight: 800, color: '#1F2937' }}>Data dzikir sedang tidak tersedia.</p>
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
    <div style={glassCardStyle}>
      <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1F2937', margin: 0 }}>Dzikir Setelah Sholat Fardhu 📿</h2>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', margin: '4px 0 0' }}>Hitung dzikir harian Anda dengan penghitung digital interaktif.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
        <div style={{ ...glassInnerCardStyle, minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#EEF2FF', color: '#4F46E5', border: '1px solid rgba(99, 102, 241, 0.15)', padding: '4px 10px', borderRadius: '8px' }}>
              DZIKIR {activeIdx + 1} DARI {list.length}
            </span>
            <h3 style={{ margin: '14px 0 6px', fontSize: '20px', fontWeight: 800, color: '#1F2937' }}>{activeDzikir.title}</h3>
            <p style={{ fontSize: '26px', fontWeight: 'bold', fontFamily: 'serif', direction: 'rtl', color: '#1F2937', margin: '14px 0', lineHeight: 1.5 }}>
              {activeDzikir.arabic}
            </p>
            <p style={{ fontSize: '13.5px', fontWeight: 700, fontStyle: 'italic', color: '#6B7280', margin: '0 0 10px' }}>
              "{activeDzikir.latin}"
            </p>
          </div>
          <div style={{ borderTop: '1px dashed rgba(0, 0, 0, 0.08)', paddingTop: '10px', fontSize: '12.5px', fontWeight: 700, color: '#1F2937' }}>
            <strong>Artinya:</strong> {activeDzikir.translation}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div 
            onClick={handleTap}
            style={{
              width: '160px', height: '160px', borderRadius: '50%',
              border: '4px solid rgba(99, 102, 241, 0.15)', backgroundColor: completed ? '#EEF2FF' : '#FFFFFF',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.05)', margin: '0 auto 20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: completed ? 'default' : 'pointer', transition: 'all 0.1s ease'
            }}
          >
            {completed ? (
              <CheckCircle2 size={56} style={{ color: '#10B981' }} />
            ) : (
              <>
                <div style={{ fontSize: '40px', fontWeight: 800, color: '#1F2937' }}>{count}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>TAPS TO {activeDzikir.target}</div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={handleReset}
              style={glassButtonStyle}
            >
              Ulangi
            </button>
            <button
              onClick={handleNext}
              disabled={!completed && activeDzikir.target > 1}
              style={completed || activeDzikir.target === 1 ? glassButtonActiveStyle : { ...glassButtonStyle, opacity: 0.6, cursor: 'not-allowed' }}
            >
              {activeIdx + 1 === list.length ? "Selesai" : "Selanjutnya"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}