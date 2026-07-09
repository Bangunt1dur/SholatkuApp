# SholatKu 🌟 - Belajar Sholat Menyenangkan & Interaktif

> [!NOTE]
> Proyek ini merupakan bagian dari tugas **Project-Based Learning (PjBL)** untuk mata kuliah **Al-Islam & Kemuhammadiyahan (AIK)** di **Universitas Muhammadiyah Pontianak**. 

Aplikasi **SholatKu** dirancang khusus untuk anak-anak agar dapat mempelajari tata cara, gerakan, dan bacaan sholat fardhu secara menyenangkan, interaktif, dan mudah dipahami. Tuntunan ibadah di dalam aplikasi ini merujuk pada **Himpunan Putusan Tarjih (HPT) Muhammadiyah**.

---

## 🎨 Konsep & Gamifikasi
Untuk memotivasi anak dalam beribadah secara rutin, **SholatKu** dilengkapi dengan elemen gamifikasi (sistem permainan):
*   **XP & Leveling:** Mempelajari gerakan baru dan menyelesaikan kuis akan memberikan XP (Experience Points) untuk menaikkan Level petualangan anak.
*   **Streak Harian:** Konsistensi sholat 5 waktu dihitung dalam jumlah hari beruntun (Streak) dengan ikon api yang membakar semangat.
*   **Mata Uang Game (Gems & Stars):** Hadiah yang didapatkan setelah menyelesaikan misi harian atau menjawab kuis dengan benar.
*   **Achievement Badges (Lencana):** Penghargaan yang bisa dikumpulkan oleh anak (seperti lencana "Juara Sholat", "Pejuang Subuh", "Langkah Pertama", dll).
*   **Parental Gate PIN:** Fitur keamanan 4-digit PIN (`1234`) untuk memisahkan **Mode Anak** dan **Mode Orang Tua**.

---

## 📂 Struktur Halaman Utama (Pages)
Berikut adalah daftar halaman utama yang ada di dalam aplikasi ini, sesuai dengan file di folder `src/pages`:

### 1. [HomePage.jsx](file:///d:/AIK/sholat-app/src/pages/HomePage.jsx) (Misi Hari Ini)
Berfungsi sebagai beranda utama anak saat pertama kali membuka aplikasi. Halaman ini memuat:
*   **XP Tracker:** Visual kemajuan level anak berupa progress bar.
*   **Streak Tracker:** Menampilkan jumlah hari beruntun anak rajin sholat.
*   **Mascot Rafi 🤖:** Karakter robot asisten interaktif yang memberikan kutipan dan motivasi acak (dari data `MASCOT_TIPS`).
*   **Daily Missions:** Misi cepat untuk mengarahkan anak langsung ke modul panduan sholat atau absensi sholat hari ini.

### 2. [AdventurePage.jsx](file:///d:/AIK/sholat-app/src/pages/AdventurePage.jsx) (Peta Petualangan)
Merupakan visualisasi jalur belajar anak dengan peta interaktif:
*   Menggunakan visual SVG garis penghubung yang dinamis untuk menggambarkan level/node perjalanan gerakan sholat.
*   Anak harus menyelesaikan gerakan sholat secara bertahap (11 Level gerakan) dari berdiri tegak sampai salam untuk membuka level berikutnya yang masih terkunci.
*   Menyelesaikan level baru akan memicu munculnya animasi peti harta karun (**TreasureBox**) yang berisi reward XP, Stars, dan Gems.

### 3. [SholatGuidePage.jsx](file:///d:/AIK/sholat-app/src/pages/SholatGuidePage.jsx) (Belajar Sholat)
Modul panduan langkah-demi-langkah (slider interaktif) yang memuat 11 gerakan sholat lengkap:
*   **Visualisasi Gerakan:** Ilustrasi bergaya anak-anak dengan animasi mengambang (floating animation).
*   **Teks Lengkap:** Dilengkapi tulisan Arab, transliterasi Latin, arti terjemahan bahasa Indonesia, dan penjelasan fiqih yang santun.
*   **Ramah Anak:** Penjelasan gerakan disesuaikan dengan bahasa anak yang sederhana (`explanationKids`).
*   **Audio Bacaan:** Dilengkapi pemutar audio mandiri untuk melatih pelafalan bacaan sholat anak.
*   **Video Tutorial:** Integrasi dengan video tata cara sholat via YouTube yang dapat diciutkan/ditampilkan.
*   **Autoplay:** Kemampuan memutar otomatis panduan gerakan dari awal sampai akhir.

### 4. [SholatTrackerPage.jsx](file:///d:/AIK/sholat-app/src/pages/SholatTrackerPage.jsx) (Cek Sholatku)
Lembar absensi sholat harian interaktif:
*   Checklist 5 waktu sholat (Subuh, Dzuhur, Ashar, Maghrib, Isya).
*   Setiap kali mencentang sholat yang sudah dilakukan, anak mendapat bonus **+10 XP** dan **Stars**.
*   **Kalender Streak:** Kalender rekam jejak visual 8 minggu terakhir untuk menunjukkan hari-hari di mana anak berhasil melengkapi sholalnya.
*   Banner motivasi yang menyesuaikan pesan berdasarkan pencapaian streak harian.

### 5. [SholatQuizPage.jsx](file:///d:/AIK/sholat-app/src/pages/SholatQuizPage.jsx) (Kuis Seru)
Sarana pengujian pemahaman anak dengan 3 jenis kuis seru:
*   **🔤 Pilih Bacaan (Multiple Choice):** Kuis pilihan ganda untuk menebak doa gerakan sholat yang tepat beserta pembahasannya.
*   **Urutan Gerakan (Order Quiz):** Kuis menyusun urutan gerakan sholat dari awal hingga akhir menggunakan tombol navigasi atas/bawah.
*   **🎯 Cocokkan Gerakan (Match Quiz):** Kuis mencocokkan nama gerakan sholat dengan ikon/emoji yang tepat.
*   Setiap jawaban benar memberikan XP dan Gems untuk profil anak.

### 6. [ProfilePage.jsx](file:///d:/AIK/sholat-app/src/pages/ProfilePage.jsx) (Profil Ku)
Halaman personalisasi anak yang menampilkan:
*   Foto profil anak berupa avatar kartun.
*   Indikator level dengan visual circular progress ring.
*   Statistik lengkap (Jumlah Bintang, Gems, Streak saat ini, total kuis yang dijawab benar, dan total gerakan sholat yang sudah dipelajari).
*   **Achievement Badges:** Koleksi lencana penghargaan yang berhasil didapatkan berdasarkan kondisi tertentu (misal: "Juara Sholat" jika berhasil menyelesaikan semua gerakan sholat).

### 7. [ParentDashboard.jsx](file:///d:/AIK/sholat-app/src/pages/ParentDashboard.jsx) (Mode Orang Tua)
Dashboard khusus bagi orang tua untuk memantau ibadah buah hatinya:
*   **Proteksi Parental Gate:** Dilengkapi pop-up modal verifikasi PIN 4-digit untuk menjamin keamanan data dan konfigurasi.
*   **Grafik 7 Hari Terakhir:** Grafik batang dinamis yang menunjukkan performa sholat anak seminggu ke belakang.
*   **Overview Analitik:** Data konsistensi bulanan, total ibadah, rekam jejak streak terpanjang, dan progres kuis anak.
*   **Rekomendasi Cerdas:** Tips berbasis AI/Kondisi real-time anak yang memberikan saran bagi orang tua untuk menyemangati ibadah anak mereka.

### 8. [SholatSchedulePage.jsx](file:///d:/AIK/sholat-app/src/pages/SholatSchedulePage.jsx) (Jadwal Sholat)
Halaman informasi waktu sholat fardhu:
*   Menggunakan API eksternal Aladhan untuk mendapatkan jadwal sholat akurat sesuai tanggal hari ini.
*   **Deteksi Geolocation:** Menggunakan modul GPS browser untuk mendeteksi posisi otomatis pengguna dan memperbarui jadwal sholat setempat.
*   **Pencarian Kota:** Memungkinkan pencarian jadwal sholat secara manual berdasarkan input nama kota.
*   **Countdown Timer:** Penghitung mundur waktu yang terus berjalan menunjukkan sisa waktu menuju sholat fardhu berikutnya.

---

## 🛠️ Spesifikasi Teknologi (Tech Stack)
*   **Framework:** React (v19) + Vite
*   **State Management:** React Context API melalui `AppContext.jsx`
*   **Desain & Styling:** CSS Modern (Claymorphism, Smooth Gradients, Transition Animations)
*   **Ikonografi:** Lucide React Icons
*   **Notifikasi:** React Hot Toast
*   **Sumber Data:** HPT Muhammadiyah (Kitab Shalat)

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

1.  **Clone repositori ini:**
    ```bash
    git clone <repository-url>
    cd sholat-app
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

4.  **Buka aplikasi:**
    Akses [http://localhost:5173](http://localhost:5173) pada browser Anda.

---

> Proyek PjBL AIK ini dibuat dengan penuh kesungguhan di **Universitas Muhammadiyah Pontianak** untuk mendukung pembelajaran ibadah anak-anak Indonesia yang cerdas dan bertaqwa. 🌟
