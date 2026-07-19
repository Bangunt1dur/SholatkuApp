// src/pages/DoaSurahPage.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, ArrowLeft } from 'lucide-react';

const DOAS_KIDS = [
  {
    id: 'doa_ortu',
    name: 'Doa Kedua Orang Tua 👨‍👩‍👦',
    arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    latin: 'Rabbighfir lī wa li-wālidayya warhamhumā kamā rabbayānī shaghīrā.',
    translation: 'Ya Tuhanku, ampunilah dosaku dan dosa kedua orang tuaku, dan sayangilah mereka sebagaimana mereka mendidikku di waktu kecil.',
    benefit: 'Pahala berbakti kepada ayah & bunda, didoakan malaikat, dan dibukakan pintu surga! ✨'
  },
  {
    id: 'doa_sapu_jagad',
    name: 'Doa Kebaikan Dunia Akhirat 🌍✨',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: "Rabbanā ātinā fid-dun-yā hasanataw wa fil-ākhirati hasanataw wa qinā 'adhāban-nār.",
    translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    benefit: 'Doa paling lengkap untuk memohon keselamatan dan kesenangan dunia akhirat!'
  },
  {
    id: 'doa_setelah_sholat',
    name: 'Doa Keselamatan & Ampunan 🤲',
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    latin: "Allāhumma a'innī 'alā dhikrika wa shukrika wa husni 'ibādatik.",
    translation: 'Ya Allah, bantulah aku untuk selalu mengingat-Mu, bersyukur kepada-Mu, dan beribadah dengan baik kepada-Mu.',
    benefit: 'Dibaca setelah salam agar ibadah kita selalu diterima dan kita rajin bersyukur.'
  }
];

const SURAHS_KIDS = [
  {
    id: 'surah_al_ikhlas',
    name: 'Surah Al-Ikhlas 👑',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ . اللَّهُ الصَّمَدُ . لَمْ يَلِدْ وَلَمْ يُولَدْ . وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    latin: "Qul huwal-lāhu ahad. Allāhuṣ-ṣamad. Lam yalid wa lam yūlad. Wa lam yakul lahū kufuwan ahad.",
    translation: "Katakanlah: Dialah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. Dia tiada beranak dan tidak pula diperanakkan. Dan tidak ada seorang pun yang setara dengan Dia.",
    benefit: "Membaca surah ini nilainya sama dengan membaca sepertiga Al-Qur'an!"
  },
  {
    id: 'surah_al_falaq',
    name: 'Surah Al-Falaq 🛡️',
    arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ . مِن شَرِّ مَا خَلَقَ . وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ . وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ . وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    latin: "Qul a'ūdhu bi rabbil-falaq. Min sharri mā khalaq. Wa min sharri ghāsiqin idhā waqab. Wa min sharri-n-naffāthāti fil-'uqad. Wa min sharri hāsidin idhā hasad.",
    translation: 'Katakanlah: Aku berlindung kepada Tuhan Yang Menguasai subuh, dari kejahatan makhluk-Nya, dari kejahatan malam apabila telah gelap gulita, dari kejahatan wanita-wanita penyihir yang meniup pada buhul-buhul, dan dari kejahatan pendengki bila ia dengki.',
    benefit: 'Melindungi diri dari segala kejahatan, mimpi buruk, dan gangguan setan!'
  },
  {
    id: 'surah_an_nas',
    name: 'Surah An-Nas 🛡️✨',
    arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ . مَلِكِ النَّاسِ . إِلَٰهِ النَّاسِ . مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ . الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ . مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin: "Qul a'ūdhu bi rabbin-nās. Malikin-nās. Ilāhin-nās. Min sharril-waswāsil-khannās. Alladhī yuwaswisu fī ṣudūrin-nās. Minal-jinnati wan-nās.",
    translation: 'Katakanlah: Aku berlindung kepada Tuhannya manusia. Rajanya manusia. Sembahannya manusia. Dari kejahatan (bisikan) setan yang biasa bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari golongan jin dan manusia.',
    benefit: 'Surah pelindung terbaik sebelum tidur dan sesudah sholat bersama Al-Falaq.'
  }
];

export default function DoaSurahPage() {
  const { isMobile } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('doa'); // 'doa' | 'surah'
  const [selectedItem, setSelectedItem] = useState(null);

  const list = activeSubTab === 'doa' ? DOAS_KIDS : SURAHS_KIDS;

  // Di mobile, tampilkan detail sebagai "view" tersendiri (sembunyikan list)
  const showDetailOnly = isMobile && selectedItem !== null;

  return (
    <div className="animate-fadeInUp" style={{ padding: isMobile ? '12px' : '20px' }}>

      {/* Header judul */}
      {!showDetailOnly && (
        <div className="section-title" style={{ marginBottom: '16px' }}>
          <div className="title-icon">🤲</div>
          Doa &amp; Surah Pilihan Anak 🌟
        </div>
      )}

      {/* Tombol kembali (mobile, saat detail terbuka) */}
      {showDetailOnly && (
        <button
          onClick={() => setSelectedItem(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontWeight: 900, fontSize: '14px', color: 'var(--game-dark)',
            marginBottom: '16px', padding: '4px 0',
          }}
        >
          <ArrowLeft size={18} />
          Kembali ke Daftar
        </button>
      )}

      {/* Tab selector — sembunyikan saat mobile detail terbuka */}
      {!showDetailOnly && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => { setActiveSubTab('doa'); setSelectedItem(null); }}
            className={`clay-btn ${activeSubTab === 'doa' ? 'purple' : ''}`}
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            🙏 Doa Harian
          </button>
          <button
            onClick={() => { setActiveSubTab('surah'); setSelectedItem(null); }}
            className={`clay-btn ${activeSubTab === 'surah' ? 'purple' : ''}`}
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            📖 Surah Pendek
          </button>
        </div>
      )}

      {/* Desktop: grid 2-kolom | Mobile: satu kolom / satu view */}
      {!isMobile ? (
        /* ── DESKTOP LAYOUT ── */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '20px', alignItems: 'start' }}>
          {/* Kolom kiri: list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {list.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="clay-card hover-lift"
                style={{
                  cursor: 'pointer',
                  border: selectedItem?.id === item.id ? '3px solid var(--game-purple)' : '2px solid #000',
                  background: selectedItem?.id === item.id ? 'var(--mint-bg)' : '#ffffff',
                  padding: '16px',
                }}
              >
                <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 900, color: 'var(--game-dark)' }}>
                  {item.name}
                </h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#718096', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.latin}
                </p>
              </div>
            ))}
          </div>

          {/* Kolom kanan: detail */}
          <DetailPanel item={selectedItem} />
        </div>
      ) : (
        /* ── MOBILE LAYOUT ── */
        <>
          {!showDetailOnly ? (
            /* List tampil penuh */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {list.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="clay-card hover-lift"
                  style={{
                    cursor: 'pointer',
                    border: '2px solid #000',
                    background: '#ffffff',
                    padding: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 900, color: 'var(--game-dark)' }}>
                      {item.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#718096', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.latin}
                    </p>
                  </div>
                  <span style={{ fontSize: '20px', marginLeft: '8px', flexShrink: 0 }}>›</span>
                </div>
              ))}
            </div>
          ) : (
            /* Detail tampil menggantikan list */
            <DetailPanel item={selectedItem} />
          )}
        </>
      )}
    </div>
  );
}

function DetailPanel({ item }) {
  if (!item) {
    return (
      <div className="clay-card" style={{ textAlign: 'center', padding: '40px 20px', border: '3px dashed #CBD5E0', background: '#F7FAFC' }}>
        <span style={{ fontSize: '56px', display: 'block', marginBottom: '12px' }}>📖</span>
        <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 900, color: 'var(--game-dark)' }}>Pilih Bacaan</h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#718096', fontWeight: 700 }}>
          Pilih salah satu doa atau surah di sebelah kiri untuk melihat lafal Arab dan artinya! 🌟
        </p>
      </div>
    );
  }

  return (
    <div className="clay-card animate-fadeIn" style={{ border: '3px solid #000', padding: '20px', background: '#fff' }}>
      {/* Judul */}
      <div style={{ background: 'var(--mint-bg)', border: '2px solid #000', borderRadius: '12px', padding: '14px', textAlign: 'center', marginBottom: '18px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 950, color: 'var(--mint-dark)' }}>
          {item.name}
        </h3>
      </div>

      {/* Arab */}
      <div style={{ background: '#F7FAFC', border: '2px solid #000', borderRadius: '14px', padding: '16px 20px', marginBottom: '14px' }}>
        <div style={{ fontSize: '22px', textAlign: 'right', fontWeight: 700, direction: 'rtl', fontFamily: 'serif', lineHeight: 2 }}>
          {item.arabic}
        </div>
      </div>

      {/* Latin */}
      <div style={{ marginBottom: '12px' }}>
        <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--game-purple)', textTransform: 'uppercase' }}>Cara Baca</span>
        <p style={{ margin: '4px 0 0', fontSize: '13.5px', fontWeight: 700, fontStyle: 'italic', color: '#2D3748', lineHeight: 1.5 }}>
          {item.latin}
        </p>
      </div>

      {/* Terjemahan */}
      <div style={{ marginBottom: '16px' }}>
        <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--game-purple)', textTransform: 'uppercase' }}>Artinya</span>
        <p style={{ margin: '4px 0 0', fontSize: '13px', fontWeight: 700, color: '#4A5568', lineHeight: 1.5 }}>
          "{item.translation}"
        </p>
      </div>

      {/* Keutamaan */}
      <div style={{ background: 'linear-gradient(135deg, #FEF9EC 0%, #FFF5D9 100%)', border: '2px solid var(--accent)', borderRadius: '12px', padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--accent-dark)', fontWeight: 900, fontSize: '12px', marginBottom: '6px' }}>
          <Award size={14} /> Keutamaan
        </div>
        <p style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: 'var(--game-dark)', lineHeight: 1.5 }}>
          {item.benefit}
        </p>
      </div>
    </div>
  );
}
