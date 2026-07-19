// src/pages/AdultSurahPage.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

const ADULT_SURAHS = [
  { id: '114', name: 'Surah An-Nas', verses: 6, arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ . مَلِكِ النَّاسِ . إِلَٰهِ النَّاسِ . مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ . الَّCustomِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ . مِنَ الْجِنَّةِ وَالنَّاسِ', latin: 'Qul a\'ūdhu bi rabbin-nās. Malikin-nās. Ilāhin-nās. Min sharril-waswāsil-khannās. Alladhī yuwaswisu fī ṣudūrin-nās. Minal-jinnati wan-nās.', translation: 'Katakanlah: Aku berlindung kepada Tuhannya manusia. Rajanya manusia. Sembahannya manusia. Dari kejahatan (bisikan) setan yang biasa bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari golongan jin dan manusia.' },
  { id: '113', name: 'Surah Al-Falaq', verses: 5, arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ . مِن شَرِّ مَا خَلَقَ . وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ . وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ . وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', latin: 'Qul a\'ūdhu bi rabbil-falaq. Min sharri mā khalaq. Wa min sharri ghāsiqin idhā waqab. Wa min sharri-n-naffāthāti fil-\'uqad. Wa min sharri hāsidin idhā hasad.', translation: 'Katakanlah: Aku berlindung kepada Tuhan Yang Menguasai subuh, dari kejahatan makhluk-Nya, dan dari kejahatan malam apabila telah gelap gulita, dan dari kejahatan wanita-wanita penyihir yang meniup pada buhul-buhul, dan dari kejahatan pendengki bila ia dengki.' },
  { id: '112', name: 'Surah Al-Ikhlas', verses: 4, arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ . اللَّهُ الصَّمَدُ . لَمْ يَلِدْ وَلَمْ يُولَدْ . وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', latin: 'Qul huwal-lāhu ahad. Allāhuṣ-ṣamad. Lam yalid wa lam yūlad. Wa lam yakul lahū kufuwan ahad.', translation: 'Katakanlah: Dialah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. Dia tiada beranak dan tidak pula diperanakkan. Dan tidak ada seorang pun yang setara dengan Dia.' },
  { id: '111', name: 'Surah Al-Lahab', verses: 5, arabic: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ . مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ . سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ . وَامْرَأَتُهُ حَمَّALAH الَّتِي حَمَلَتِ الْحَطَبَ . فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ', latin: 'Tabbat yadā abī lahabiw wa tabb. Mā aghnā \'anhu māluhū wa mā kasab. Sayaslā nāran dhāta lahab. Wamra\'atuhū hammālatal-hatab. Fī jīdihā hablum mim masad.', translation: 'Binasalah kedua tangan Abu Lahab dan benar-benar binasa dia! Tidaklah berguna baginya hartanya dan apa yang dia usahakan. Kelak dia akan masuk ke dalam api yang bergejolak (neraka), dan (begitu pula) istrinya, pembawa kayu bakar (penyebar fitnah), di lehernya ada tali dari sabut yang dipintal.' },
  { id: '110', name: 'Surah An-Nasr', verses: 3, arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ . وَرَأَيْتَ النَّASَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا . فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا', latin: 'Idhā jā\'a naṣrullāhi wal-fatḥ. Wa ra\'aitan-nāsa yadkhulūna fī dīnillāhi afwājā. Fasabbiḥ biḥamdi rabbika wastagfirh, innahū kāna tawwābā.', translation: 'Apabila telah datang pertolongan Allah dan kemenangan, dan kamu lihat manusia masuk agama Allah dengan berbondong-bondong, maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampun kepada-Nya. Sesungguhnya Dia adalah Maha Penerima tobat.' },
  { id: '109', name: 'Surah Al-Kafirun', verses: 6, arabic: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ . لَا أَعْبُدُ مَا تَعْبُدُونَ . وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ . وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ . وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ . لَكُمْ دِينُكُمْ وَلِيَ دِينِ', latin: 'Qul yā ayyuhal-kāfirūn. Lā a\'budu mā ta\'budūn. Wa lā antum \'ābidūna mā a\'bud. Wa lā ana \'ābidum mā \'abattum. Wa lā antum \'ābidūna mā a\'bud. Lakum dīnukum wa liya dīn.', translation: 'Katakanlah: Hai orang-orang kafir, aku tidak akan menyembah apa yang kamu sembah. Dan kamu bukan penyembah Tuhan yang aku sembah. Dan aku tidak pernah menjadi penyembah apa yang kamu sembah, dan kamu tidak pernah (pula) menjadi penyembah Tuhan yang aku sembah. Untukmu agamamu, dan untukkulah, agamaku.' },
  { id: '108', name: 'Surah Al-Kautsar', verses: 3, arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ . فَصَلِّ لِرَبِّكَ وَانْحَرْ . إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', latin: 'Innā a\'ṭainākal-kauthar. Faṣalli lirabbika wanhar. Inna shāni\'aka huwal-abtar.', translation: 'Sesungguhnya Kami telah memberikan kepadamu nikmat yang banyak. Maka dirikanlah shalat karena Tuhanmu; dan berkurbanlah. Sesungguhnya orang-orang yang membenci kamu dialah yang terputus.' }
];

export default function AdultSurahPage() {
  const { currentUser, toggleAdultSurah } = useApp();
  const [selectedSurah, setSelectedSurah] = useState(null);

  const adultProgress = currentUser?.adultSurahProgress || {};

  const getStatusLabel = (status) => {
    switch (status) {
      case 'memorized': return { text: 'Sudah Hafal', color: '#047857', bg: '#D1FAE5' };
      case 'memorizing': return { text: 'Sedang Dihafal', color: '#D97706', bg: '#FEF3C7' };
      default: return { text: 'Belum Mulai', color: '#6B7280', bg: '#F1F5F9' };
    }
  };

  const totalSurahs = ADULT_SURAHS.length;
  const memorizedCount = ADULT_SURAHS.filter(s => adultProgress[s.id] === 'memorized').length;
  const memorizingCount = ADULT_SURAHS.filter(s => adultProgress[s.id] === 'memorizing').length;
  const progressPercent = Math.round((memorizedCount / totalSurahs) * 100);

  return (
    <div className="animate-fadeIn" style={{ fontFamily: 'Inter, sans-serif', padding: '16px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '12px', marginBottom: '24px' }}>
        <BookOpen size={20} style={{ color: '#065F46' }} />
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
          Pelacak Hafalan Surah Pendek
        </h2>
      </div>

      {/* Bento Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
        
        {/* Bento Item 1: Wide Progress Banner Card (Liquid Glass) */}
        <div className="clay-card" style={{
          gridColumn: 'span 12', padding: '24px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '20px'
        }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Progress Juz Amma Dewasa
            </span>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '4px 0 10px', lineHeight: 1 }}>
              {memorizedCount} <span style={{ fontSize: '15px', color: '#64748B', fontWeight: 600 }}>dari {totalSurahs} Surah Selesai ({progressPercent}%)</span>
            </h3>
            
            {/* Progress line */}
            <div style={{ height: '8px', backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPercent}%`, backgroundColor: '#059669', transition: 'width 0.6s ease' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ textAlign: 'center', padding: '10px 16px', background: 'rgba(4, 120, 87, 0.1)', borderRadius: '10px', border: '1px solid rgba(4, 120, 87, 0.2)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#047857' }}>{memorizedCount}</div>
              <div style={{ fontSize: '10.5px', color: '#065F46', fontWeight: 700 }}>Sudah Hafal</div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 16px', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '10px', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#B45309' }}>{memorizingCount}</div>
              <div style={{ fontSize: '10.5px', color: '#92400E', fontWeight: 700 }}>Sedang Dihafal</div>
            </div>
          </div>
        </div>

        {/* Bento Item 2: Surah List (Bento Tall Left Column) */}
        <div className="clay-card" style={{ gridColumn: 'span 12', lgGridColumn: 'span 5', gridColumnEnd: 'span 5', display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
            Daftar Surah Pilihan
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
            {ADULT_SURAHS.map((surah) => {
              const status = adultProgress[surah.id] || 'none';
              const badge = getStatusLabel(status);
              const isSelected = selectedSurah?.id === surah.id;

              return (
                <div
                  key={surah.id}
                  onClick={() => setSelectedSurah(surah)}
                  style={{
                    cursor: 'pointer', padding: '14px 16px',
                    background: isSelected ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.35)',
                    border: isSelected ? '1.5px solid #059669' : '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: isSelected ? '0 4px 12px rgba(5,150,105,0.08)' : 'none',
                    borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'all 0.2s ease', backdropFilter: 'blur(8px)'
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 3px', fontSize: '14.5px', fontWeight: 700, color: '#0F172A' }}>{surah.name}</h4>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{surah.verses} Ayat</span>
                  </div>
                  
                  <span style={{
                    fontSize: '10.5px', fontWeight: 700, color: badge.color, backgroundColor: badge.bg,
                    padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.05)'
                  }}>
                    {badge.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bento Item 3: Workspace Detail View (Bento Tall Right Column) */}
        <div className="clay-card" style={{ gridColumn: 'span 12', lgGridColumn: 'span 7', gridColumnEnd: 'span 7', padding: '24px' }}>
          {selectedSurah ? (
            (() => {
              const status = adultProgress[selectedSurah.id] || 'none';
              return (
                <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Surah Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '12px' }}>
                    <div>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', margin: 0, fontSize: '18px', fontWeight: 750, color: '#0F172A' }}>
                        {selectedSurah.name}
                      </h3>
                      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{selectedSurah.verses} Ayat</span>
                    </div>
                    
                    {/* Status Toggles */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[
                        { key: 'none', label: 'Belum Mulai', color: '#6B7280', bg: '#F1F5F9' },
                        { key: 'memorizing', label: 'Dihafal', icon: <Clock size={11} />, color: '#D97706', bg: '#FEF3C7' },
                        { key: 'memorized', label: 'Hafal', icon: <CheckCircle size={11} />, color: '#047857', bg: '#D1FAE5' }
                      ].map((opt) => (
                        <button
                          key={opt.key}
                          onClick={() => toggleAdultSurah(selectedSurah.id, opt.key)}
                          style={{
                            padding: '6px 10px', fontSize: '11px', fontWeight: 700,
                            borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px',
                            border: status === opt.key ? `1.5px solid ${opt.color}` : '1.5px solid rgba(0,0,0,0.08)',
                            backgroundColor: status === opt.key ? opt.bg : 'rgba(255,255,255,0.4)',
                            color: status === opt.key ? opt.color : '#64748B',
                            transition: 'all 0.15s'
                          }}
                        >
                          {opt.icon}
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Arabic Display */}
                  <div style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '12px', padding: '20px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '24px', textAlign: 'right', fontWeight: 500, direction: 'rtl', fontFamily: 'serif', lineHeight: '2.3', color: '#0F172A' }}>
                      {selectedSurah.arabic}
                    </div>
                  </div>

                  {/* Latin */}
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Transliterasi</span>
                    <p style={{ margin: 0, fontSize: '13px', color: '#1E293B', fontStyle: 'italic', lineHeight: 1.45 }}>
                      {selectedSurah.latin}
                    </p>
                  </div>

                  {/* Translation */}
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Terjemahan</span>
                    <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.45 }}>
                      "{selectedSurah.translation}"
                    </p>
                  </div>

                </div>
              );
            })()
          ) : (
            <div style={{
              textAlign: 'center', padding: '64px 20px', border: '1px dashed rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px', borderStyle: 'dashed'
            }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>📖</span>
              <h4 style={{ margin: '0 0 6px', fontSize: '14.5px', fontWeight: 700, color: '#0F172A' }}>Pilih Surah</h4>
              <p style={{ margin: 0, fontSize: '12.5px', color: '#64748B' }}>
                Pilih salah satu surah di sebelah kiri untuk melihat lafal ayat dan memperbarui progress hafalan Anda.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
