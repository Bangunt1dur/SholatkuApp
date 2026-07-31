// src/data/Data.js
import { MOVEMENT_IMAGES } from './movementImages';

export const SHOLAT_MOVEMENTS = [
  {
    id: 1,
    key: 'qiyam',
    name: 'Berdiri Tegak (Qiyam)',
    nameKids: 'Berdiri Tegak',
    image: MOVEMENT_IMAGES['takbiratul ihram'] || MOVEMENT_IMAGES['takbiratul_ihram'],
    arabicText: '',
    latin: 'Menghadap kiblat dan berniat di dalam hati.',
    translation: '',
    explanation: 'Berdiri tegak lurus menghadap kiblat. Niat sholat dilakukan di dalam hati ikhlas karena Allah Ta\'ala tanpa perlu dilafalkan (diucapkan dengan lisan).',
    explanationKids: 'Berdiri tegak menghadap kiblat. Siapkan hatimu untuk sholat karena Allah ya!',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  },
  {
    id: 2,
    key: 'takbiratul_ihram',
    name: 'Takbiratul Ihram',
    nameKids: 'Takbir',
    image: MOVEMENT_IMAGES['takbiratul ihram'] || MOVEMENT_IMAGES['takbiratul_ihram'],
    arabicText: 'اللَّهُ أَكْبَرُ',
    latin: 'Allāhu Akbar',
    translation: 'Allah Maha Besar.',
    explanation: 'Mengangkat kedua tangan sejajar telinga atau bahu sambil mengucapkan takbir.',
    explanationKids: 'Angkat kedua tanganmu dan ucapkan "Allahu Akbar" dengan semangat!',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  },
  {
    id: 3,
    key: 'bersedekap_iftitah',
    name: 'Bersedekap & Doa Iftitah',
    nameKids: 'Bersedekap',
    image: MOVEMENT_IMAGES['takbiratul ihram'] || MOVEMENT_IMAGES['takbiratul_ihram'],
    arabicText: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ ، اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ ، اللَّهُمَّ اغْسِلْ خَطَايَايَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ',
    latin: 'Allaahumma baa\'id bainii wabainaa khotoo yaa ya kamaa baa \'adta bainal masyriqi wal maghrib. Allaahumma naqqinii minal khotoo yaa kamaa yunqqots tsaubul abyadhuu minaddanas. Allaahummaghsil khotoo yaa ya bil maa i wats tsalji walbarod.',
    translation: 'Ya Allah, jauhkanlah antara diriku dan kesalahan-kesalahanku sebagaimana Engkau jauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan-kesalahan sebagaimana dibersihkannya kain putih dari kotoran. Ya Allah, cucilah kesalahan-kesalahanku dengan air, salju, dan es.',
    explanation: 'Meletakkan telapak tangan kanan di atas punggung tangan kiri, pergelangan, atau lengan kiri, diletakkan di dada. Kemudian membaca doa Iftitah.',
    explanationKids: 'Letakkan tangan kanan di atas tangan kirimu di dada, lalu baca doa pembuka sholat (Iftitah).',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  },
  {
    id: 4,
    key: 'al_fatihah',
    name: 'Membaca Al-Fatihah',
    nameKids: 'Surah Al-Fatihah',
    image: MOVEMENT_IMAGES['takbiratul ihram'] || MOVEMENT_IMAGES['takbiratul_ihram'],
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ... (إلى آخر السورة)',
    latin: 'Bismillāhir-raḥmānir-raḥīm... (sampai akhir surah)',
    translation: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang... (dst)',
    explanation: 'Membaca Ta\'awudz pelan, lalu membaca surah Al-Fatihah yang merupakan rukun sholat. Setelah itu disunnahkan membaca surah/ayat Al-Qur\'an lain.',
    explanationKids: 'Baca surah Al-Fatihah dengan tartil. Ini wajib lho di setiap rakaat!',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  },
  {
    id: 5,
    key: 'rukuk',
    name: 'Rukuk',
    nameKids: 'Rukuk',
    image: MOVEMENT_IMAGES['Rukuk'] || MOVEMENT_IMAGES['rukuk'],
    arabicText: 'سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي',
    latin: 'Subhaanaka allaahuma robbanaa wabihamdika allaahumaghfirlii.',
    translation: 'Maha Suci Engkau ya Allah, Tuhan kami, dan dengan memuji-Mu ya Allah, ampunilah aku.',
    explanation: 'Membungkukkan badan dengan punggung rata, tangan memegang lutut dengan thuma\'ninah (tenang).',
    explanationKids: 'Bungkukkan badanmu, punggung lurus seperti meja, pegang lutut, lalu baca doanya pelan-pelan.',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  },
  {
    id: 6,
    key: 'itidal',
    name: 'I\'tidal',
    nameKids: 'I\'tidal',
    image: MOVEMENT_IMAGES['takbiratul ihram'] || MOVEMENT_IMAGES['takbiratul_ihram'],
    arabicText: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ، رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
    latin: 'Sami\'allaahu liman hamidah. Robbanaa walakalhamdu hamdan katsiiran thayyiban mubaarokan fiihi.',
    translation: 'Allah maha mendengar orang yang memuji-Nya. Ya Tuhan kami, bagi-Mu segala puji, pujian yang banyak, baik, dan diberkahi di dalamnya.',
    explanation: 'Bangkit dari rukuk hingga berdiri tegak lurus (thuma\'ninah). Mengangkat tangan saat membaca "Sami\'allahu...", lalu melepas tangan ke bawah.',
    explanationKids: 'Berdiri tegak lagi setelah rukuk. Angkat tanganmu sebentar lalu lepaskan ke bawah.',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  },
  {
    id: 7,
    key: 'sujud',
    name: 'Sujud',
    nameKids: 'Sujud',
    image: MOVEMENT_IMAGES['sujud'],
    arabicText: 'سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي',
    latin: 'Subhaanaka allaahuma robbanaa wabihamdika allaahumaghfirlii.',
    translation: 'Maha Suci Engkau ya Allah, Tuhan kami, dan dengan memuji-Mu ya Allah, ampunilah aku.',
    explanation: 'Turun sujud bertumpu pada 7 anggota badan: dahi (termasuk hidung), kedua telapak tangan, kedua lutut, dan ujung jari kedua kaki.',
    explanationKids: 'Sujud menempelkan dahi, hidung, tangan, lutut, dan ujung kaki ke lantai. Posisi paling dekat dengan Allah!',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  },
  {
    id: 8,
    key: 'duduk_antara_sujud',
    name: 'Duduk Antara Dua Sujud',
    nameKids: 'Duduk',
    image: MOVEMENT_IMAGES['duduk diantara dua sujud'] || MOVEMENT_IMAGES['duduk_diantara_dua_sujud'],
    arabicText: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَاهْدِنِي وَارْزُقْنِي',
    latin: 'Allaahummaghfirlii warhamnii wajburnii wahdinii warzuqnii.',
    translation: 'Ya Allah, ampunilah aku, rahmatilah aku, cukupkanlah aku, berilah aku petunjuk, dan berilah aku rezeki.',
    explanation: 'Duduk iftirasy (menduduki telapak kaki kiri, telapak kaki kanan ditegakkan). Telapak tangan diletakkan di atas paha/lutut.',
    explanationKids: 'Duduk yang tenang sebentar, letakkan tangan di atas paha, dan minta kebaikan kepada Allah.',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  },
  {
    id: 9,
    key: 'tasyahud_awal',
    name: 'Tasyahud Awal',
    nameKids: 'Tasyahud Awal',
    image: MOVEMENT_IMAGES['tahiyyat awal'] || MOVEMENT_IMAGES['tahiyyat_awal'],
    arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    latin: 'Attahiyyaatu lillaahi washsholawaatu waththoyyibaat. Assalaamu \'alaika ayyuhannabiyyu warohmatullaahi wabarokaatuh. Assalaamu\'alainaa wa\'ala \'ibaadillaahi shshoolihiin. Asyhadu anlaa ilaaha illallaah waasyhadu annamuhammadan \'abduhu warosuuluh.',
    translation: 'Segala kehormatan, kebahagiaan, dan kebagusan adalah milik Allah. Semoga keselamatan bagi Engkau, wahai Nabi, beserta rahmat Allah dan berkah-Nya...',
    explanation: 'Duduk iftirasy. Telapak tangan di atas paha. Jari telunjuk tangan kanan diisyaratkan lurus ke depan saat membaca doa.',
    explanationKids: 'Duduk dan acungkan jari telunjuk kananmu pelan-pelan saat membaca doanya.',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  },
  {
    id: 10,
    key: 'tasyahud_akhir',
    name: 'Tasyahud Akhir & Shalawat',
    nameKids: 'Tasyahud Akhir',
    image: MOVEMENT_IMAGES['tahiyyat akhir'] || MOVEMENT_IMAGES['tahiyyat_akhir'],
    arabicText: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَآلِ إِبْرَاهِيمَ وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَآلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: 'Allaahumma sholli \'alaa Muhammad wa\'alaa aali Muhammad. Kamaa shollaita \'alaa ibroohiim wa aali ibroohiim. Wabaarik \'alaa Muhammad wa aali Muhammad. Kamaa baarokta \'alaa ibroohiim wa aali ibroohiim. Innaka hamiidummajiid.',
    translation: 'Ya Allah, limpahkanlah kemurahan-Mu kepada Muhammad dan keluarganya, sebagaimana telah Engkau limpahkan kepada Ibrahim...',
    explanation: 'Duduk tawarruk (telapak kaki kiri dimasukkan ke bawah betis kanan, pantat duduk di lantai). Membaca Tasyahud disusul Shalawat Nabi.',
    explanationKids: 'Duduk tawarruk (kaki kirinya dimasukkan). Baca doa memuji Allah dan Nabi Muhammad.',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  },
  {
    id: 11,
    key: 'salam',
    name: 'Salam',
    nameKids: 'Salam',
    image: MOVEMENT_IMAGES['salam pertama(kanan)'] || MOVEMENT_IMAGES['salam_pertamakanan'],
    arabicText: 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
    latin: 'Assalāmu \'alaikum wa raḥmatullāhi wa barakātuh.',
    translation: 'Keselamatan, rahmat Allah, dan berkah-Nya semoga dilimpahkan kepadamu.',
    explanation: 'Menoleh ke kanan hingga terlihat pipi kanan dari belakang membaca salam, kemudian menoleh ke kiri dan membaca salam yang sama.',
    explanationKids: 'Tengok ke kanan dan ucapkan salam, lalu tengok ke kiri dan ucapkan salam. Selesai deh sholatnya!',
    audioUrl: '',
    source: 'HPT Muhammadiyah (RS PKU Muhammadiyah Cepu)'
  }
];

export const PRAYER_NAMES = [
  { key: 'fajr', label: 'Subuh', labelKids: 'Subuh', emoji: '🌅' },
  { key: 'dhuhr', label: 'Dzuhur', labelKids: 'Dzuhur', emoji: '☀️' },
  { key: 'asr', label: 'Ashar', labelKids: 'Ashar', emoji: '⛅' },
  { key: 'maghrib', label: 'Maghrib', labelKids: 'Maghrib', emoji: '🌇' },
  { key: 'isha', label: 'Isya', labelKids: 'Isya', emoji: '🌙' },
];

export const ACHIEVEMENTS = [
  { id: 'first_blood', name: 'Langkah Pertama', nameKids: 'Mulai Belajar!', emoji: '🌱', desc: 'Menyelesaikan 1 gerakan sholat', condition: (p) => p.completedMovements.length >= 1 },
  { id: 'half_way', name: 'Setengah Perjalanan', nameKids: 'Hebat!', emoji: '⭐', desc: 'Mempelajari 5 gerakan sholat', condition: (p) => p.completedMovements.length >= 5 },
  { id: 'master_sholat', name: 'Master Gerakan', nameKids: 'Master Sholat', emoji: '👑', desc: 'Menyelesaikan semua gerakan', condition: (p) => p.completedMovements.length >= 11 },
  { id: 'streak_3', name: 'Konsisten 3 Hari', nameKids: 'Rajin Sholat!', emoji: '🔥', desc: 'Mempertahankan streak 3 hari', condition: (p) => p.streak >= 3 },
  { id: 'streak_7', name: 'Konsisten 1 Minggu', nameKids: 'Juara Sholat!', emoji: '🏆', desc: 'Mempertahankan streak 7 hari', condition: (p) => p.streak >= 7 },
  { id: 'subuh_warrior', name: 'Pejuang Subuh', nameKids: 'Bangun Pagi', emoji: '🌅', desc: 'Melakukan sholat Subuh', condition: (p) => p.subuhDone },
  { id: 'quiz_master', name: 'Ahli Kuis', nameKids: 'Si Pintar!', emoji: '🧠', desc: 'Menjawab 10 kuis dengan benar', condition: (p) => p.quizCorrect >= 10 },
  { id: 'full_day', name: 'Sholat Penuh', nameKids: '5 Waktu Lengkap!', emoji: '🌟', desc: 'Menyelesaikan sholat 5 waktu dalam sehari', condition: (p) => p.dailyComplete >= 1 },
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Apa bacaan yang dibaca saat gerakan Rukuk sesuai HPT Muhammadiyah?",
    questionKids: "Apa doa yang kita baca waktu Rukuk? 🙇‍♂️",
    options: [
      "Subhana rabbiyal a'la",
      "Subhanakallahumma rabbana wa bihamdika allahummaghfirli",
      "Sami'allahu liman hamidah",
      "Allahu Akbar"
    ],
    correct: 1,
    explanation: "Doa rukuk menurut HPT Muhammadiyah adalah Subhanakallahumma rabbana wa bihamdika allahummaghfirli."
  },
  {
    id: 2,
    question: "Berapa anggota badan yang harus menempel di lantai saat sujud?",
    questionKids: "Waktu sujud, ada berapa anggota badan kita yang harus kena lantai? 🤔",
    options: ["5 anggota badan", "6 anggota badan", "7 anggota badan", "8 anggota badan"],
    correct: 2,
    explanation: "7 anggota badan saat sujud adalah: Dahi+hidung (1), kedua telapak tangan (2), kedua lutut (2), dan ujung kedua kaki (2)."
  },
  {
    id: 3,
    question: "Kapan kita membaca doa Iftitah?",
    questionKids: "Kapan ya kita membaca doa Iftitah? 📖",
    options: [
      "Setelah membaca Al-Fatihah",
      "Setelah Takbiratul Ihram sebelum Al-Fatihah",
      "Saat sujud",
      "Sebelum salam"
    ],
    correct: 1,
    explanation: "Doa Iftitah dibaca tepat setelah Takbiratul Ihram dan sebelum membaca surah Al-Fatihah."
  },
  {
    id: 4,
    question: "Apa nama posisi duduk pada Tasyahud Akhir?",
    questionKids: "Duduk waktu membaca doa terakhir sebelum salam namanya duduk apa? 🪑",
    options: ["Duduk Iftirasy", "Duduk Tawarruk", "Duduk Sila", "Duduk Bersimpuh"],
    correct: 1,
    explanation: "Duduk Tawarruk adalah duduk di mana kaki kiri dimasukkan ke bawah betis kaki kanan, dan pantat menyentuh lantai."
  },
  {
    id: 5,
    question: "Ke arah mana salam pertama dilakukan?",
    questionKids: "Waktu salam pertama kali, kita tengok ke arah mana? 👀",
    options: ["Kiri", "Atas", "Kanan", "Depan"],
    correct: 2,
    explanation: "Salam pertama wajib menoleh ke sebelah kanan hingga pipi kanan terlihat dari belakang."
  }
];

export const MASCOT_TIPS = [
  "Jangan lupa niat sholat karena Allah ya! 🌟",
  "Sholat tepat waktu itu hebat sekali! ✨",
  "Ayo, gerakan selanjutnya adalah ruku yang tenang. 🙇‍♂️",
  "Alhamdulillah, kamu makin pintar belajar sholat! 💎",
  "Ingat, Allah selalu melihat kesungguhanmu. 😊"
];
