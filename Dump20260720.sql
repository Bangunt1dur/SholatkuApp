CREATE DATABASE  IF NOT EXISTS `sholatku_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sholatku_db`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sholatku_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bacaan`
--

DROP TABLE IF EXISTS `bacaan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bacaan` (
  `bacaan_id` int NOT NULL AUTO_INCREMENT,
  `gerakan_id` int NOT NULL,
  `teks_arab` text NOT NULL,
  `teks_latin` text NOT NULL,
  `terjemahan` text NOT NULL,
  `audio_url` longtext,
  `sumber` varchar(255) DEFAULT 'HPT Muhammadiyah',
  PRIMARY KEY (`bacaan_id`),
  KEY `gerakan_id` (`gerakan_id`),
  CONSTRAINT `bacaan_ibfk_1` FOREIGN KEY (`gerakan_id`) REFERENCES `gerakan` (`gerakan_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bacaan`
--

LOCK TABLES `bacaan` WRITE;
/*!40000 ALTER TABLE `bacaan` DISABLE KEYS */;
INSERT INTO `bacaan` VALUES (2,1,'الله أكبر','Allahu Akbar','Allah Maha Besar','','HPT Muhammadiyah');
/*!40000 ALTER TABLE `bacaan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gerakan`
--

DROP TABLE IF EXISTS `gerakan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gerakan` (
  `gerakan_id` int NOT NULL AUTO_INCREMENT,
  `kategori_id` int DEFAULT NULL,
  `nama` varchar(100) NOT NULL,
  `urutan` smallint NOT NULL,
  `deskripsi` text,
  `gambar_url` longtext,
  `video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gerakan_id`),
  KEY `kategori_id` (`kategori_id`),
  CONSTRAINT `gerakan_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`kategori_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gerakan`
--

LOCK TABLES `gerakan` WRITE;
/*!40000 ALTER TABLE `gerakan` DISABLE KEYS */;
INSERT INTO `gerakan` VALUES (1,NULL,'Berdiri Tegak',1,'Posisi awal sholat','',''),(2,NULL,'Takbiratul Ihram',2,'Mengangkat kedua tangan','',''),(3,NULL,'Bersedekap',3,'Tangan bersedekap di dada','',''),(4,NULL,'Membaca Al-Fatihah',4,'Membaca surat Al-Fatihah','',''),(5,NULL,'Rukuk',5,'Membungkuk','',''),(6,NULL,'I\'tidal',6,'Bangkit dari rukuk','',''),(7,NULL,'Sujud',7,'Sujud pertama','',''),(8,NULL,'Duduk Diantara Dua Sujud',8,'Duduk diantara dua sujud','',''),(9,NULL,'Sujud Kedua',9,'Sujud kedua','',''),(10,NULL,'Tasyahud',10,'Membaca tahiyat','',''),(11,NULL,'Salam',11,'Mengakhiri sholat','',''),(12,NULL,'Berdiri Tegak',1,'Posisi awal sebelum sholat dimulai','',''),(16,2,'Tes Base64',99,'Testing Upload','','(boleh kosong)'),(17,2,'Tes Base64',99,'Testing Upload','','(boleh kosong)'),(18,2,'Tes Base64',99,'Testing Upload','','(boleh kosong)'),(19,2,'Tes Base64',99,'Testing Upload','','(boleh kosong)'),(20,2,'Tes Base64',99,'Testing Upload','','(boleh kosong)');
/*!40000 ALTER TABLE `gerakan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori`
--

DROP TABLE IF EXISTS `kategori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategori` (
  `kategori_id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  PRIMARY KEY (`kategori_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori`
--

LOCK TABLES `kategori` WRITE;
/*!40000 ALTER TABLE `kategori` DISABLE KEYS */;
INSERT INTO `kategori` VALUES (2,'Gerakan Wajib'),(3,'Gerakan Sunnah');
/*!40000 ALTER TABLE `kategori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kelompok`
--

DROP TABLE IF EXISTS `kelompok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kelompok` (
  `kelompok_id` int NOT NULL AUTO_INCREMENT,
  `nama_kelompok` varchar(100) NOT NULL,
  `prodi` varchar(100) NOT NULL,
  `mata_kuliah` varchar(100) NOT NULL,
  `dosen` varchar(100) NOT NULL,
  PRIMARY KEY (`kelompok_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kelompok`
--

LOCK TABLES `kelompok` WRITE;
/*!40000 ALTER TABLE `kelompok` DISABLE KEYS */;
/*!40000 ALTER TABLE `kelompok` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_child`
--

DROP TABLE IF EXISTS `parent_child`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent_child` (
  `relation_id` int NOT NULL AUTO_INCREMENT,
  `parent_profiles_id` int NOT NULL,
  `child_profiles_id` int NOT NULL,
  PRIMARY KEY (`relation_id`),
  KEY `parent_profiles_id` (`parent_profiles_id`),
  KEY `child_profiles_id` (`child_profiles_id`),
  CONSTRAINT `parent_child_ibfk_1` FOREIGN KEY (`parent_profiles_id`) REFERENCES `profiles` (`profiles_id`) ON DELETE CASCADE,
  CONSTRAINT `parent_child_ibfk_2` FOREIGN KEY (`child_profiles_id`) REFERENCES `profiles` (`profiles_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_child`
--

LOCK TABLES `parent_child` WRITE;
/*!40000 ALTER TABLE `parent_child` DISABLE KEYS */;
/*!40000 ALTER TABLE `parent_child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `profiles_id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `pin` varchar(4) DEFAULT '1234',
  `avatar_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`profiles_id`),
  KEY `users_id` (`users_id`),
  CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,4,'Faried Azfar','5678','https://example.com/avatar.png'),(2,5,'User Test','1234','default.png'),(3,6,'Ahmad','1234','default.png'),(4,7,'Faried Stats','1234',''),(5,8,'Child User','1234','');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reward_history`
--

DROP TABLE IF EXISTS `reward_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reward_history` (
  `reward_id` int NOT NULL AUTO_INCREMENT,
  `profiles_id` int NOT NULL,
  `activity` varchar(100) DEFAULT NULL,
  `coins` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reward_id`),
  KEY `profiles_id` (`profiles_id`),
  CONSTRAINT `reward_history_ibfk_1` FOREIGN KEY (`profiles_id`) REFERENCES `profiles` (`profiles_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reward_history`
--

LOCK TABLES `reward_history` WRITE;
/*!40000 ALTER TABLE `reward_history` DISABLE KEYS */;
INSERT INTO `reward_history` VALUES (1,4,'Lulus Uji Hafalan',10,'2026-07-19 17:06:31'),(2,4,'Lulus Uji Hafalan',10,'2026-07-19 17:27:33'),(3,4,'Lulus Uji Hafalan',10,'2026-07-19 17:29:07'),(4,4,'Lulus Uji Hafalan',10,'2026-07-19 17:39:26');
/*!40000 ALTER TABLE `reward_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracker_harian`
--

DROP TABLE IF EXISTS `tracker_harian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracker_harian` (
  `tracker_id` int NOT NULL AUTO_INCREMENT,
  `profiles_id` int NOT NULL,
  `tanggal` date NOT NULL,
  `sholat_subuh` tinyint(1) DEFAULT '0',
  `sholat_dzuhur` tinyint(1) DEFAULT '0',
  `sholat_ashar` tinyint(1) DEFAULT '0',
  `sholat_maghrib` tinyint(1) DEFAULT '0',
  `sholat_isya` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`tracker_id`),
  UNIQUE KEY `unique_tracker_harian` (`profiles_id`,`tanggal`),
  CONSTRAINT `tracker_harian_ibfk_1` FOREIGN KEY (`profiles_id`) REFERENCES `profiles` (`profiles_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracker_harian`
--

LOCK TABLES `tracker_harian` WRITE;
/*!40000 ALTER TABLE `tracker_harian` DISABLE KEYS */;
INSERT INTO `tracker_harian` VALUES (1,1,'2026-07-19',1,1,0,0,0),(2,4,'2026-07-19',0,1,0,0,0);
/*!40000 ALTER TABLE `tracker_harian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uji_hafalan`
--

DROP TABLE IF EXISTS `uji_hafalan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uji_hafalan` (
  `uji_hafalan_id` int NOT NULL AUTO_INCREMENT,
  `profiles_id` int NOT NULL,
  `bacaan_id` int NOT NULL,
  `status` enum('BELUM','PROSES','LULUS') DEFAULT 'BELUM',
  `tested_by_id` int DEFAULT NULL,
  `reward_coins` int DEFAULT '10',
  PRIMARY KEY (`uji_hafalan_id`),
  KEY `profiles_id` (`profiles_id`),
  KEY `bacaan_id` (`bacaan_id`),
  CONSTRAINT `uji_hafalan_ibfk_1` FOREIGN KEY (`profiles_id`) REFERENCES `profiles` (`profiles_id`) ON DELETE CASCADE,
  CONSTRAINT `uji_hafalan_ibfk_2` FOREIGN KEY (`bacaan_id`) REFERENCES `bacaan` (`bacaan_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uji_hafalan`
--

LOCK TABLES `uji_hafalan` WRITE;
/*!40000 ALTER TABLE `uji_hafalan` DISABLE KEYS */;
INSERT INTO `uji_hafalan` VALUES (3,4,2,'BELUM',NULL,10),(4,4,2,'LULUS',2,10),(5,4,2,'LULUS',7,10);
/*!40000 ALTER TABLE `uji_hafalan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_stats`
--

DROP TABLE IF EXISTS `user_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_stats` (
  `user_stats_id` int NOT NULL AUTO_INCREMENT,
  `profiles_id` int NOT NULL,
  `level` int DEFAULT '1',
  `xp` int DEFAULT '0',
  `coins` int DEFAULT '0',
  `streak_days` int DEFAULT '0',
  PRIMARY KEY (`user_stats_id`),
  UNIQUE KEY `profiles_id` (`profiles_id`),
  CONSTRAINT `user_stats_ibfk_1` FOREIGN KEY (`profiles_id`) REFERENCES `profiles` (`profiles_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_stats`
--

LOCK TABLES `user_stats` WRITE;
/*!40000 ALTER TABLE `user_stats` DISABLE KEYS */;
INSERT INTO `user_stats` VALUES (1,4,2,10,55,0),(2,5,1,0,0,0);
/*!40000 ALTER TABLE `user_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `users_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `account_type` enum('ADMIN','PARENT','ADULT','CHILD') NOT NULL DEFAULT 'ADULT',
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','$2b$10$75OWDkTFoiqjpBJLnS4zY.9ClhTU27i4gaIHZA1Nv8VcZuJalAD5i','PARENT'),(2,'parent@gmail.com','$2b$10$69h6uckWfzmvYtyQ6kPvKu7K5bPPKrlArugB0./yKqqNTjONBsIGe','PARENT'),(3,'anak1@gmail.com','$2b$10$imChWr7xGdNDAQlnRo2q7.aD0qphruyUcWNFnfQNn3ePjQcbA5BwO','CHILD'),(4,'orangtua1@gmail.com','$2b$10$.iw5hQvUGw/TS/lpDCJrguCy.CwgKI5ZCBMytqE125cvKoRqlVrf6','PARENT'),(5,'test@gmail.com','$2b$10$V2TNA2Hr5FS.QB2frDELseI/.q44x4PfFYzoGNcR2y2Zcao1jD/li','CHILD'),(6,'ayah@gmail.com','$2b$10$Q.a1SwXFamSxoQW85AUXxeFVxQFwooKcgd5KSo096mZN6xiJYlJsq','PARENT'),(7,'stats1@gmail.com','$2b$10$HCWG3.4e2l4qi6Y.h9YlJuG5xtY3yj17Prdf.HdeHHV19h1LaI5be','PARENT'),(8,'child@gmail.com','$2b$10$Z/3Fem.Y4/NVqfzQy/EJPe5.rP08fIhsUUEP65CwLD9hR..Ai48XS','CHILD');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-20  3:08:04
