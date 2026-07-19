// src/data/quranData.js

export const SURAH_LIST = [
  { number: 1, name: "Al-Fatihah", EnglishName: "The Opening", translation: "Pembukaan", versesCount: 7, type: "Makkiyah" },
  { number: 2, name: "Al-Baqarah", EnglishName: "The Cow", translation: "Sapi Betina", versesCount: 286, type: "Madaniyah" },
  { number: 3, name: "Ali 'Imran", EnglishName: "Family of Imran", translation: "Keluarga Imran", versesCount: 200, type: "Madaniyah" },
  { number: 4, name: "An-Nisa'", EnglishName: "The Women", translation: "Wanita", versesCount: 176, type: "Madaniyah" },
  { number: 5, name: "Al-Ma'idah", EnglishName: "The Table Spread", translation: "Hidangan", versesCount: 120, type: "Madaniyah" },
  { number: 6, name: "Al-An'am", EnglishName: "The Cattle", translation: "Binatang Ternak", versesCount: 165, type: "Makkiyah" },
  { number: 7, name: "Al-A'raf", EnglishName: "The Heights", translation: "Tempat yang Tinggi", versesCount: 206, type: "Makkiyah" },
  { number: 8, name: "Al-Anfal", EnglishName: "The Spoils of War", translation: "Rampasan Perang", versesCount: 75, type: "Madaniyah" },
  { number: 9, name: "At-Tawbah", EnglishName: "The Repentance", translation: "Pengampunan", versesCount: 129, type: "Madaniyah" },
  { number: 10, name: "Yunus", EnglishName: "Jonah", translation: "Nabi Yunus", versesCount: 109, type: "Makkiyah" },
  { number: 36, name: "Ya-Sin", EnglishName: "Ya Seen", translation: "Ya Sin", versesCount: 83, type: "Makkiyah" },
  { number: 67, name: "Al-Mulk", EnglishName: "The Sovereignty", translation: "Kerajaan", versesCount: 30, type: "Makkiyah" },
  { number: 78, name: "An-Naba'", EnglishName: "The Announcement", translation: "Berita Besar", versesCount: 40, type: "Makkiyah" },
  { number: 93, name: "Ad-Duha", EnglishName: "The Morning Hours", translation: "Waktu Dhuha", versesCount: 11, type: "Makkiyah" },
  { number: 94, name: "Al-Insyirah", EnglishName: "The Consolation", translation: "Kelapangan", versesCount: 8, type: "Makkiyah" },
  { number: 97, name: "Al-Qadr", EnglishName: "The Power", translation: "Kemuliaan", versesCount: 5, type: "Makkiyah" },
  { number: 103, name: "Al-'Asr", EnglishName: "The Declining Day", translation: "Demi Masa", versesCount: 3, type: "Makkiyah" },
  { number: 104, name: "Al-Humazah", EnglishName: "The Slanderer", translation: "Pengumpat", versesCount: 9, type: "Makkiyah" },
  { number: 105, name: "Al-Fil", EnglishName: "The Elephant", translation: "Gajah", versesCount: 5, type: "Makkiyah" },
  { number: 106, name: "Quraisy", EnglishName: "Quraysh", translation: "Suku Quraisy", versesCount: 4, type: "Makkiyah" },
  { number: 107, name: "Al-Ma'un", EnglishName: "Small Kindnesses", translation: "Barang yang Berguna", versesCount: 7, type: "Makkiyah" },
  { number: 108, name: "Al-Kautsar", EnglishName: "Abundance", translation: "Nikmat yang Banyak", versesCount: 3, type: "Makkiyah" },
  { number: 109, name: "Al-Kafirun", EnglishName: "The Disbelievers", translation: "Orang-orang Kafir", versesCount: 6, type: "Makkiyah" },
  { number: 110, name: "An-Nasr", EnglishName: "The Divine Support", translation: "Pertolongan", versesCount: 3, type: "Madaniyah" },
  { number: 111, name: "Al-Lahab", EnglishName: "The Palm Fiber", translation: "Gejolak Api", versesCount: 5, type: "Makkiyah" },
  { number: 112, name: "Al-Ikhlas", EnglishName: "The Sincerity", translation: "Ikhlas", versesCount: 4, type: "Makkiyah" },
  { number: 113, name: "Al-Falaq", EnglishName: "The Daybreak", translation: "Waktu Subuh", versesCount: 5, type: "Makkiyah" },
  { number: 114, name: "An-Nas", EnglishName: "Mankind", translation: "Manusia", versesCount: 6, type: "Makkiyah" }
];

export const SURAH_VERSES = {
  1: [
    { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang." },
    { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "Segala puji bagi Allah, Tuhan seluruh alam," },
    { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "Yang Maha Pengasih, Maha Penyayang," },
    { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", translation: "Pemilik hari pembalasan." },
    { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan." },
    { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Tunjukilah kami jalan yang lurus," },
    { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat." }
  ],
  112: [
    { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Katakanlah (Muhammad), Dia-lah Allah, Yang Maha Esa." },
    { number: 2, arabic: "اللَّهُ الصَّمَدُ", translation: "Allah tempat meminta segala sesuatu." },
    { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "Dia tidak beranak dan tidak pula diperanakkan," },
    { number: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", translation: "dan tidak ada sesuatu yang setara dengan Dia." }
  ],
  113: [
    { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", translation: "Katakanlah, Aku berlindung kepada Tuhan yang menguasai subuh (fajar)," },
    { number: 2, arabic: "مِن شَرِّ مَا خَلَقَ", translation: "dari kejahatan makhluk yang Dia ciptakan," },
    { number: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", translation: "dan dari kejahatan malam apabila telah gelap gulita," },
    { number: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", translation: "dan dari kejahatan perempuan-perempuan (penyihir) yang meniup pada buhul-buhul (talinya)," },
    { number: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", translation: "dan dari kejahatan orang yang dengki apabila dia dengki." }
  ],
  114: [
    { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", translation: "Katakanlah, Aku berlindung kepada Tuhannya manusia," },
    { number: 2, arabic: "مَلِكِ النَّاسِ", translation: "Raja manusia," },
    { number: 3, arabic: "إِلَٰهِ النَّASِ", translation: "Sembahan manusia," },
    { number: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", translation: "dari kejahatan (bisikan) setan yang biasa bersembunyi," },
    { number: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", translation: "yang membisikkan (kejahatan) ke dalam dada manusia," },
    { number: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", translation: "dari (golongan) jin dan manusia." }
  ],
  108: [
    { number: 1, arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْتَثَرَ", translation: "Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak." },
    { number: 2, arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", translation: "Maka laksanakanlah sholat karena Tuhanmu, dan berqurbanlah." },
    { number: 3, arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", translation: "Sungguh, orang-orang yang membencimu dialah yang terputus (dari rahmat Allah)." }
  ]
};
