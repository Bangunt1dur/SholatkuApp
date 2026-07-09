export const ACHIEVEMENTS = [
  { 
    id: 'first_blood', 
    name: 'Langkah Pertama', 
    nameKids: 'Mulai Belajar! 🌱', 
    emoji: '🌱', 
    desc: 'Menyelesaikan 1 gerakan sholat', 
    condition: (p) => p.completedMovements.length >= 1 
  },
  { 
    id: 'half_way', 
    name: 'Setengah Perjalanan', 
    nameKids: 'Hebat! ⭐', 
    emoji: '⭐', 
    desc: 'Mempelajari 5 gerakan sholat', 
    condition: (p) => p.completedMovements.length >= 5 
  },
  { 
    id: 'master_sholat', 
    name: 'Master Gerakan', 
    nameKids: 'Master Sholat 👑', 
    emoji: '👑', 
    desc: 'Menyelesaikan semua gerakan sholat', 
    condition: (p) => p.completedMovements.length >= 11 
  },
  { 
    id: 'streak_3', 
    name: 'Konsisten 3 Hari', 
    nameKids: 'Rajin Sholat! 🔥', 
    emoji: '🔥', 
    desc: 'Mempertahankan streak absen sholat selama 3 hari', 
    condition: (p) => p.streak >= 3 
  },
  { 
    id: 'streak_7', 
    name: 'Konsisten 1 Minggu', 
    nameKids: 'Juara Sholat! 🏆', 
    emoji: '🏆', 
    desc: 'Mempertahankan streak absen sholat selama 7 hari', 
    condition: (p) => p.streak >= 7 
  },
  { 
    id: 'subuh_warrior', 
    name: 'Pejuang Subuh', 
    nameKids: 'Bangun Pagi 🌅', 
    emoji: '🌅', 
    desc: 'Berhasil mencentang sholat Subuh hari ini', 
    condition: (p) => p.subuhDone 
  },
  { 
    id: 'quiz_master', 
    name: 'Ahli Kuis', 
    nameKids: 'Si Pintar! 🧠', 
    emoji: '🧠', 
    desc: 'Menjawab 10 kuis dengan benar', 
    condition: (p) => p.quizCorrect >= 10 
  },
  { 
    id: 'full_day', 
    name: 'Sholat Penuh', 
    nameKids: '5 Waktu Lengkap! 🌟', 
    emoji: '🌟', 
    desc: 'Menyelesaikan sholat 5 waktu lengkap dalam sehari', 
    condition: (p) => p.dailyComplete >= 1 
  },
];

// =========================================================================
// 2. DATA PERTANYAAN KUIS (QUIZ QUESTIONS)
// =========================================================================
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Apa bacaan yang dibaca saat gerakan Rukuk sesuai HPT Muhammadiyah?",
    questionKids: "Apa doa yang kita baca waktu gerakan Rukuk? 🙇‍♂️",
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
    questionKids: "Waktu kita bersujud, ada berapa anggota badan yang harus kena lantai? 🤔",
    options: ["5 anggota badan", "6 anggota badan", "7 anggota badan", "8 anggota badan"],
    correct: 2,
    explanation: "7 anggota badan saat sujud adalah: Dahi + hidung (1), kedua telapak tangan (2), kedua lutut (2), dan ujung jari kedua kaki (2)."
  },
  {
    id: 3,
    question: "Kapan kita membaca doa Iftitah?",
    questionKids: "Kapan ya waktunya kita membaca doa Iftitah? 📖",
    options: [
      "Setelah membaca Al-Fatihah",
      "Setelah Takbiratul Ihram sebelum Al-Fatihah",
      "Saat gerakan sujud",
      "Sebelum melakukan salam"
    ],
    correct: 1,
    explanation: "Doa Iftitah dibaca tepat setelah Takbiratul Ihram dan sebelum memulai bacaan surah Al-Fatihah."
  },
  {
    id: 4,
    question: "Apa nama posisi duduk pada Tasyahud Akhir?",
    questionKids: "Duduk waktu membaca doa terakhir sebelum salam dinamakan duduk apa? 🪑",
    options: ["Duduk Iftirasy", "Duduk Tawarruk", "Duduk Sila", "Duduk Bersimpuh"],
    correct: 1,
    explanation: "Duduk Tawarruk adalah posisi duduk di mana kaki kiri diselipkan ke bawah betis kaki kanan, dan pantat menyentuh lantai."
  },
  {
    id: 5,
    question: "Ke arah mana salam pertama dilakukan?",
    questionKids: "Waktu salam pertama kali, kepala kita menoleh ke arah mana? 👀",
    options: ["Kiri", "Atas", "Kanan", "Depan"],
    correct: 2,
    explanation: "Salam pertama wajib menoleh ke sebelah kanan hingga pipi kanan terlihat dari posisi belakang."
  }
];


export const MASCOT_TIPS = [
  "Jangan lupa menata niat sholat ikhlas karena Allah ya! 🌟",
  "Hebat! Sholat tepat waktu itu adalah kunci anak sukses. ✨",
  "Ayo, gerakan selanjutnya adalah ruku dengan posisi punggung yang rata. 🙇‍♂️",
  "Alhamdulillah, kamu semakin pintar dan rajin belajar sholat! 💎",
  "Ingat ya, Allah selalu sayang dan melihat anak yang rajin sholat. 😊"
];