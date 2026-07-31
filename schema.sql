-- ============================================================
-- schema.sql - Database SholatKu App
-- Jalankan SQL ini di cPanel > phpMyAdmin
-- ============================================================

-- Tabel users (akun pengguna)
CREATE TABLE IF NOT EXISTS `users` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(100) NOT NULL,
  `email`      VARCHAR(150) NOT NULL UNIQUE,
  `password`   VARCHAR(255) NOT NULL,
  `pin`        VARCHAR(10)  DEFAULT '1234',
  `role`       ENUM('anak', 'ortu', 'dewasa') DEFAULT 'anak',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel profiles (data gamifikasi)
CREATE TABLE IF NOT EXISTS `profiles` (
  `id`                   INT AUTO_INCREMENT PRIMARY KEY,
  `user_id`              INT NOT NULL UNIQUE,
  `level`                INT DEFAULT 1,
  `xp`                   INT DEFAULT 0,
  `gems`                 INT DEFAULT 5,
  `stars`                INT DEFAULT 0,
  `streak`               INT DEFAULT 0,
  `total_prayers`        INT DEFAULT 0,
  `completed_movements`  TEXT DEFAULT '[]',
  `earned_badges`        TEXT DEFAULT '[]',
  `updated_at`           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel prayer_trackers (absen sholat harian)
CREATE TABLE IF NOT EXISTS `prayer_trackers` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `user_id`    INT NOT NULL,
  `date`       DATE NOT NULL,
  `fajr`       TINYINT(1) DEFAULT 0,
  `dhuhr`      TINYINT(1) DEFAULT 0,
  `asr`        TINYINT(1) DEFAULT 0,
  `maghrib`    TINYINT(1) DEFAULT 0,
  `isha`       TINYINT(1) DEFAULT 0,
  `count`      INT DEFAULT 0,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `user_date` (`user_id`, `date`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel sholat_movements (data bacaan & gambar gerakan sholat dari database)
CREATE TABLE IF NOT EXISTS `sholat_movements` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `movement_key`     VARCHAR(50) NOT NULL UNIQUE,
  `name`             VARCHAR(100) NOT NULL,
  `name_kids`        VARCHAR(100) NOT NULL,
  `arabic_text`      TEXT,
  `latin`            TEXT,
  `translation`      TEXT,
  `explanation`      TEXT,
  `explanation_kids` TEXT,
  `image_data`       LONGTEXT,
  `source`           VARCHAR(150) DEFAULT 'HPT Muhammadiyah'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
