import ImgTakbiratulIhram from '../assets/takbiratul ihram.svg';
import ImgRukuk from '../assets/Rukuk.svg';
import ImgSujud from '../assets/sujud.svg';
import ImgDudukDiantaraSujud from '../assets/duduk diantara dua sujud.svg';
import ImgTahiyyatAwal from '../assets/tahiyyat awal.svg';
import ImgTahiyyatAkhir from '../assets/tahiyyat akhir.svg';
import ImgSalamKanan from '../assets/salam pertama(kanan).svg';
import ImgSalamKiri from '../assets/salam kedua(kiri).svg';


export const SHOLAT_MOVEMENTS = [
  {
    id: 1,
    key: 'qiyam',
    name: 'Berdiri Tegak (Qiyam)',
    nameKids: 'Berdiri Tegak 🧍',
    image: ImgTakbiratulIhram,
    arabicText: '',
    latin: 'Menghadap kiblat dan memantapkan niat di dalam hati.',
    translation: '',
    explanation: 'Berdiri tegak lurus menghadap kiblat dengan pandangan mengarah ke tempat sujud. Niat shalat ditanamkan secara ikhlas di dalam hati tanpa perlu dilafalkan (tidak menggunakan ushalli).',
    explanationKids: 'Posisikan badanmu berdiri tegak lurus menghadap kiblat ya! Tatap tempat sujudmu dan siapkan hati untuk sholat karena Allah.',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  },
  {
    id: 2,
    key: 'takbiratul_ihram',
    name: 'Takbiratul Ihram',
    nameKids: 'Takbiratul Ihram 👐',
    image: ImgTakbiratulIhram,
    arabicText: 'اللَّهُ أَكْبَرُ',
    latin: 'Allāhu Akbar',
    translation: 'Allah Maha Besar.',
    explanation: 'Mengangkat kedua tangan sejajar telinga atau sejajar bahu dengan telapak tangan menghadap ke depan, bersamaan dengan mengucapkan kalimat takbir.',
    explanationKids: 'Angkat kedua tanganmu sampai sejajar telinga atau bahu, lalu ucapkan "Allahu Akbar" dengan suara lembut.',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  },
  {
    id: 3,
    key: 'bersedekap_iftitah',
    name: 'Bersedekap & Doa Iftitah',
    nameKids: 'Bersedekap 📖',
    image: ImgTakbiratulIhram,
    arabicText: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ ، اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ ، اللَّهُمَّ اغْسِلْ خَطَايَايَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ',
    latin: 'Allāhumma bā\'id bainī wa baina khaṭāyāya kamā bā\'adta bainal-masyriqi wal-magrib. Allāhumma naqqinī minal-khaṭāyā kamā yunaqqas-ṡaubul-abyaḍu minad-danas. Allāhummaġsil khaṭāyāya bil-mā\'i waṡ-ṡalji wal-barad.',
    translation: 'Ya Allah, jauhkanlah antara diriku dan kesalahan-kesalahanku sebagaimana Engkau jauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan-kesalahan sebagaimana dibersihkannya kain putih dari kotoran. Ya Allah, cucilah kesalahan-kesalahanku dengan air, salju, dan es.',
    explanation: 'Meletakkan telapak tangan kanan di atas punggung tangan kiri, pergelangan, atau lengan kiri tepat di dada. Kemudian membaca doa Iftitah di atas, dilanjutkan membaca Ta\'awudz pelan, Al-Fatihah, dan Surah pendek.',
    explanationKids: 'Letakkan tangan kananmu di atas tangan kiri tepat di dada ya. Setelah itu, baca doa pembuka (Iftitah) ini dengan tenang.',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  },
  {
    id: 4,
    key: 'rukuk',
    name: 'Rukuk',
    nameKids: 'Rukuk 🙇‍♂️',
    image: ImgRukuk,
    arabicText: 'سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي',
    latin: 'Subḥānakallāhumma rabbanā wa biḥamdika allāhummaġfir lī',
    translation: 'Maha Suci Engkau ya Allah, Tuhan kami, dan dengan memuji-Mu ya Allah, ampunilah aku.',
    explanation: 'Membungkukkan badan hingga punggung dan kepala sejajar mendatar (rata seperti meja). Kedua telapak tangan mencengkeram lutut dengan jari-jari direnggangkan. Posisi thuma\'ninah.',
    explanationKids: 'Bungkukkan badanmu sampai lurus seperti meja. Pegang erat lututmu dan baca doa ini pelan-pelan ya.',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  },
  {
    id: 5,
    key: 'itidal',
    name: 'I\'tidal',
    nameKids: 'I\'tidal 🧍',
    image: ImgTakbiratulIhram, 
    arabicText: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ الْحَمْدُ',
    latin: 'Sami\'allāhu liman ḥamidah. Rabbanā wa lakal-ḥamd.',
    translation: 'Allah maha mendengar orang yang memuji-Nya. Ya Tuhan kami, bagi-Mu segala puji.',
    explanation: 'Bangkit dari rukuk hingga tubuh kembali tegak lurus. Mengangkat kedua tangan sejajar bahu/telinga saat bangkit membaca Sami\'allahu..., kemudian melepaskan tangan lurus ke bawah di samping badan (irsal) dengan thuma\'ninah.',
    explanationKids: 'Berdiri tegak kembali setelah rukuk. Angkat tanganmu sebentar lalu lepaskan lurus ke bawah dengan santun.',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  },
  {
    id: 6,
    key: 'sujud',
    name: 'Sujud',
    nameKids: 'Sujud 🧎‍♂️',
    image: ImgSujud,
    arabicText: 'سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي',
    latin: 'Subḥānakallāhumma rabbanā wa biḥamdika allāhummaġfir lī',
    translation: 'Maha Suci Engkau ya Allah, Tuhan kami, dan dengan memuji-Mu ya Allah, ampunilah aku.',
    explanation: 'Meletakkan 7 anggota badan di lantai: dahi dan hidung, kedua telapak tangan, kedua lutut, dan ujung jari-jari kedua kaki yang ditekuk menghadap kiblat. Siku diangkat dan tidak menempel ke lantai.',
    explanationKids: 'Yuk sujud dengan menempelkan dahi, hidung, kedua telapak tangan, lutut, dan ujung jari kakimu ke lantai. Angkat sikumu sedikit ya!',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  },
  {
    id: 7,
    key: 'duduk_antara_sujud',
    name: 'Duduk Antara Dua Sujud',
    nameKids: 'Duduk di Antara Dua Sujud 🧎‍♂️',
    image: ImgDudukDiantaraSujud,
    arabicText: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَاهْدِنِي وَارْزُقْنِي',
    latin: 'Allāhummaġfir lī warḥamnī wajburnī wahdinī warzuqnī',
    translation: 'Ya Allah, ampunilah aku, rahmatilah aku, cukupkanlah kekurangan kekuranganku, berilah aku petunjuk, dan berilah aku rezeki.',
    explanation: 'Duduk dengan posisi Iftirasy, yaitu menduduki telapak kaki kiri yang dihampar mendatar, sedangkan telapak kaki kanan ditegakkan dengan jari-jari menekuk menghadap kiblat.',
    explanationKids: 'Bangun dari sujud lalu duduk yang tenang. Lipat kaki kirimu untuk diduduki, dan tegakkan jari-jari kaki kananmu.',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  },
  {
    id: 8,
    key: 'tasyahud_awal',
    name: 'Tasyahud Awal',
    nameKids: 'Duduk Tasyahud Awal ☝️',
    image: ImgTahiyyatAwal,
    arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    latin: 'At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt. Assalāmu \'alaika ayyuhan-nabiyyu wa raḥmatullāhi wa barakātuh. Assalāmu \'alainā wa \'alā \'ibādillāhiṣ-ṣāliḥīn. Asyhadu allā ilāha illallāhu wa asyhadu anna Muḥammdan \'abduhū wa rasūluh.',
    translation: 'Segala kehormatan, kebahagiaan dan kebagusan adalah kepunyaan Allah. Semoga keselamatan bagi Engkau, wahai Nabi, beserta rahmat Allah dan berkah-Nya. Semoga keselamatan bagi kami dan bagi hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada Tuhan selain Allah dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya.',
    explanation: 'Duduk dengan posisi Iftirasy pada rakaat kedua shalat tiga atau empat rakaat. Tangan kanan diletakkan di atas paha kanan dengan jari telunjuk diacungkan lurus ke depan (mengisyaratkan tauhid) sejak awal duduk.',
    explanationKids: 'Duduklah dengan tenang seperti duduk antara dua sujud, lalu luruskan jari telunjuk kananmu ke depan sejak awal membaca doa ini.',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  },
  {
    id: 9,
    key: 'tasyahud_akhir',
    name: 'Tasyahud Akhir',
    nameKids: 'Duduk Tasyahud Akhir 🧎‍♂️',
    image: ImgTahiyyatAkhir,
    arabicText: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ ، وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ ، فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: 'Allāhumma ṣalli \'alā Muḥammad wa \'alā āli Muḥammad, kamā ṣallaita \'alā Ibrāhīm wa \'alā āli Ibrāhīm. Wa bārik \'alā Muḥammad wa \'alā āli Muḥammad, kamā bārakta \'alā Ibrāhīm wa \'alā āli Ibrāhīm, fil-\'ālamīna innaka ḥamīdum-majīd.',
    translation: 'Ya Allah, limpahkanlah kemurahan-Mu kepada Muhammad dan keluarganya, sebagaimana telah Engkau limpahkan kepada Ibrahim dan keluarganya. Dan berkahilah Muhammad beserta keluarganya, sebagaimana telah Engkau berkahi Ibrahim dan keluarganya. Di seluruh alam semesta, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
    explanation: 'Duduk dengan posisi Tawarruk (pantat langsung menyentuh lantai, kaki kiri diselipkan di bawah kaki kanan, dan telapak kaki kanan ditegakkan jari-jarinya). Membaca Tasyahud awal dilanjutkan shalawat Ibrahimiyah di atas.',
    explanationKids: 'Duduklah dengan posisi pantat menyentuh lantai dan kaki kirimu dimasukkan di bawah kaki kanan. Jangan lupa acungkan jari telunjuk kananmu ya!',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  },
  {
    id: 10,
    key: 'salam_kanan',
    name: 'Salam Kanan',
    nameKids: 'Salam ke Kanan 👉',
    image: ImgSalamKanan,
    arabicText: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
    latin: 'Assalāmu \'alaikum wa raḥmatullāhi wa barakātuh.',
    translation: 'Semoga keselamatan, rahmat Allah, dan berkah-Nya dilimpahkan kepadamu.',
    explanation: 'Menolehkan kepala ke arah kanan hingga pipi kanan terlihat dengan jelas dari posisi belakang badan, sambil melafalkan kalimat salam.',
    explanationKids: 'Tengokkan kepalamu ke arah kanan sampai pipimu terlihat dari belakang, lalu ucapkan doa salam ini.',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  },
  {
    id: 11,
    key: 'salam_kiri',
    name: 'Salam Kiri',
    nameKids: 'Salam ke Kiri 👈',
    image: ImgSalamKiri,
    arabicText: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
    latin: 'Assalāmu \'alaikum wa raḥmatullāhi wa barakātuh.',
    translation: 'Semoga keselamatan, rahmat Allah, dan berkah-Nya dilimpahkan kepadamu.',
    explanation: 'Menolehkan kepala ke arah kiri hingga pipi kiri terlihat dengan jelas dari posisi belakang badan, sambil melafalkan kalimat salam yang sama sebagai penutup ibadah shalat.',
    explanationKids: 'Terakhir, tengokkan kepalamu ke arah kiri dan ucapkan salam kembali. Alhamdulillah sholatmu selesai!',
    source: 'HPT Muhammadiyah (Kitab Shalat)'
  }
];

export const PRAYER_NAMES = [
  { key: 'fajr', label: 'Subuh', labelKids: 'Subuh 🌅', emoji: '🌅' },
  { key: 'dhuhr', label: 'Dzuhur', labelKids: 'Dzuhur ☀️', emoji: '☀️' },
  { key: 'asr', label: 'Ashar', labelKids: 'Ashar ⛅', emoji: '⛅' },
  { key: 'maghrib', label: 'Maghrib', labelKids: 'Maghrib 🌇', emoji: '🌇' },
  { key: 'isha', label: 'Isya', labelKids: 'Isya 🌙', emoji: '🌙' },
];