CREATE DATABASE  IF NOT EXISTS `kkb_shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kkb_shop`;
-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: kkb_shop
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'手机'),(2,'笔记本'),(3,'电视机');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int unsigned NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  `price` int unsigned NOT NULL DEFAULT '0',
  `cover` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,1,'荣耀9X',129900,'dc5164850933d966.jpg'),(2,1,'Redmi 8A',69900,'68d0ac29ce4a326d.jpg'),(3,1,'荣耀20青春版',119900,'79c4d1ea436ed9ea.jpg'),(4,1,'荣耀Play4T Pro',149900,'d2db1412dcce1d96.jpg'),(5,1,'Apple iPhone SE',379900,'bb5874532c7633ab.jpg'),(6,1,'华为nova7',299900,'b03c1199e47f0661.jpg'),(7,1,'荣耀Play4T',119900,'993a7456c638b93b.jpg'),(8,1,'荣耀20 PRO',229900,'62cf191f88e41447.jpg'),(9,1,'荣耀Play3',99900,'96717b886222b91b.jpg'),(10,2,'联想(Lenovo)小新Air14 2020性能版',549900,'14ae6bae4f0ceea4.jpg'),(11,2,'联想(Lenovo)小新Pro13锐龙版',499900,'aa22c3af40ec7b52.jpg'),(12,2,'联想(Lenovo)小新Pro13',629900,'de78d3d1c7630b3b.jpg'),(13,2,'联想(Lenovo)小新15',559900,'87effede1b943c01.jpg'),(14,2,'华为(HUAWEI) MateBook D',429900,'d0afc89316d02270.jpg'),(15,2,'RedmiBook 14 增强版',398900,'8ab1131edad29d20.jpg'),(16,2,'荣耀MagicBook Pro',459900,'feb860a77684cb42.jpg'),(17,2,'Apple苹果MacBook Pro15.4英寸/16英寸',2219900,'3b29d7c76c86d5a1.jpg'),(18,2,'Apple 2019款 MacBook Pro 13.3',1108800,'c39fe0cb7ab36c13.jpg'),(19,2,'外星人（Alienware）AREA-A51M M15M17新款',2539900,'0215962626ec524b.jpg'),(20,2,'机械革命(MECHREVO)S1 Pro',397900,'66a2a483cbabb7b2.jpg'),(21,3,'小米电视4X 43英寸',109900,'8f46cb2c09a10ec4.jpg'),(22,3,'长虹55D8P 55英寸液晶电视机',369900,'d30ebbc320873dbd.jpg'),(23,3,'康佳KKTV K32C 32英寸窄边高清节能护眼液晶平板电视',59900,'1b0c619e070aed76.jpg'),(24,3,'飞利浦（PHILIPS）55PUF7294/T3 55英寸',209900,'871f688468c19598.jpg'),(25,3,'TCL 55L680 55英寸液晶电视机',169900,'f98185309b92dd5b.jpg'),(26,3,'海信（Hisense）HZ55E3D-J 55英寸 E3D京享版',169900,'ae9d5fbee103262b.jpg'),(27,3,'乐视（Letv）超级电视 Y32 32英寸',63900,'74af09c899df616d.jpg'),(28,3,'康佳（KONKA）LED55D6 55英寸',169900,'27c61e8fe9e921d3.jpg'),(29,3,'创维（SKYWORTH）50V20 50英寸4K超高清',149900,'0c36b11834fa2ce5.jpg');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-14 19:42:47
