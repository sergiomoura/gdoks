-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gdoks
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gdoks_acoes`
--

DROP TABLE IF EXISTS `gdoks_acoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_acoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL COMMENT '$n posicionados na descrição serão substituídos pelos parâmetros que serão separados por vírgula na coluna parâmetros na tabela gdoks_log',
  `descricao` tinytext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_acoes`
--

LOCK TABLES `gdoks_acoes` WRITE;
/*!40000 ALTER TABLE `gdoks_acoes` DISABLE KEYS */;
INSERT INTO `gdoks_acoes` VALUES (1,'Logar','Logou no sistema'),(2,'Alterar Dados Pessoais','Alterou dados pessoais'),(3,'Alterar Dados de Usuário','Alterou dados de usuário nome:$1, email:$2, login:$3, ativo:$4'),(4,'Criou usuário','Criou usuário nome:$1, email:$2, login:$3, ativo:$4'),(5,'Alterou Disciplina','Alterou disciplina nome:$1, sigla:$2, ativa:$3'),(6,'Criou Disciplina','Criou disciplina nome:$1, sigla:$2, ativa:$3'),(7,'Alterou Subdisciplina','Alterou subdisciplina nome:$1, sigla:$2, ativa:$3'),(8,'Criou Subdisciplina','Criou subdisciplina nome:$1, sigla:$2, ativa:$3'),(9,'Removeu Subdisciplina','Removeu subdisciplina nome:$1, sigla:$2, ativa:$3'),(10,'Associou Especialista','Associou especialista $1 a disciplina $2'),(11,'Desassociou Especialista','Desassociou especialista $1 da disciplina $2'),(12,'Associou Validador','Associou o validador $1 a disciplina $2 (Tipo $3)'),(13,'Desassociou Validador','Desassociou o validador $1 da disciplina $2');
/*!40000 ALTER TABLE `gdoks_acoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_areas`
--

DROP TABLE IF EXISTS `gdoks_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `id_projeto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_areas_x_projetos_idx` (`id_projeto`),
  CONSTRAINT `FK_areas_x_projetos` FOREIGN KEY (`id_projeto`) REFERENCES `gdoks_projetos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_areas`
--

LOCK TABLES `gdoks_areas` WRITE;
/*!40000 ALTER TABLE `gdoks_areas` DISABLE KEYS */;
INSERT INTO `gdoks_areas` VALUES (1,'Area 1',1),(2,'Area 2',1),(3,'Area Única',2),(4,'Área Total',3);
/*!40000 ALTER TABLE `gdoks_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_clientes`
--

DROP TABLE IF EXISTS `gdoks_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_clientes`
--

LOCK TABLES `gdoks_clientes` WRITE;
/*!40000 ALTER TABLE `gdoks_clientes` DISABLE KEYS */;
INSERT INTO `gdoks_clientes` VALUES (2,'Faraday'),(1,'GDoks');
/*!40000 ALTER TABLE `gdoks_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_disciplinas`
--

DROP TABLE IF EXISTS `gdoks_disciplinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_disciplinas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `sigla` varchar(4) DEFAULT NULL,
  `ativa` bit(1) DEFAULT b'1',
  `id_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_sigla` (`sigla`,`id_cliente`),
  UNIQUE KEY `UNIQUE_nome` (`nome`,`id_cliente`),
  KEY `FK_cliente_idx` (`id_cliente`),
  CONSTRAINT `FK_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `gdoks_clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_disciplinas`
--

LOCK TABLES `gdoks_disciplinas` WRITE;
/*!40000 ALTER TABLE `gdoks_disciplinas` DISABLE KEYS */;
INSERT INTO `gdoks_disciplinas` VALUES (1,'Disciplina B','BBB','',1),(2,'Disciplina J','JJJ','',1),(3,'Disciplina C2','CC','\0',1),(4,'Disciplina D','DD','\0',1),(5,'Disciplina E','EE','\0',1),(6,'Disciplina F','FFF','',1),(7,'Disciplina G','GGG','',1),(8,'Disciplina H','HHH','',2),(9,'Disciplina I','III','',2),(10,'teste1','tt1','',1),(11,'Disciplina Z','ZZZ1','',1),(12,'Teste 3','tt3','',1),(13,'teste 9','tt9','',1),(14,'Elétrica','ELE','',1),(15,'Hidráulica','HDR','',1);
/*!40000 ALTER TABLE `gdoks_disciplinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_documentos`
--

DROP TABLE IF EXISTS `gdoks_documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_documentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `id_area` int(11) DEFAULT NULL,
  `id_disciplina` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_documentos_area_idx` (`id_area`),
  KEY `FK_documentos_disciplinas_idx` (`id_disciplina`),
  CONSTRAINT `FK_documentos_area` FOREIGN KEY (`id_area`) REFERENCES `gdoks_areas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_documentos_disciplinas` FOREIGN KEY (`id_disciplina`) REFERENCES `gdoks_disciplinas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_documentos`
--

LOCK TABLES `gdoks_documentos` WRITE;
/*!40000 ALTER TABLE `gdoks_documentos` DISABLE KEYS */;
INSERT INTO `gdoks_documentos` VALUES (1,'Documento 1',1,1),(2,'Documento 2',2,2),(3,'Documento 3',1,2);
/*!40000 ALTER TABLE `gdoks_documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_especialistas`
--

DROP TABLE IF EXISTS `gdoks_especialistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_especialistas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `id_disciplina` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_usuario_x_disciplina` (`id_usuario`,`id_disciplina`),
  KEY `FK_especialistas_x_disciplinas_idx` (`id_disciplina`),
  CONSTRAINT `FK_especialistas_x_disciplinas` FOREIGN KEY (`id_disciplina`) REFERENCES `gdoks_disciplinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_especialistas_x_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_especialistas`
--

LOCK TABLES `gdoks_especialistas` WRITE;
/*!40000 ALTER TABLE `gdoks_especialistas` DISABLE KEYS */;
INSERT INTO `gdoks_especialistas` VALUES (11,1,1),(2,1,2),(10,4,3),(12,4,15),(9,6,1);
/*!40000 ALTER TABLE `gdoks_especialistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_log`
--

DROP TABLE IF EXISTS `gdoks_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_acao` int(11) NOT NULL,
  `parametros` varchar(100) DEFAULT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_id_usuario_idx` (`id_usuario`),
  KEY `FK_id_acao_idx` (`id_acao`),
  CONSTRAINT `FK_id_acao` FOREIGN KEY (`id_acao`) REFERENCES `gdoks_acoes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_log`
--

LOCK TABLES `gdoks_log` WRITE;
/*!40000 ALTER TABLE `gdoks_log` DISABLE KEYS */;
INSERT INTO `gdoks_log` VALUES (1,1,1,NULL,'2017-01-02 08:30:36'),(2,1,2,NULL,'2017-01-02 08:37:26'),(3,1,2,NULL,'2017-01-02 08:38:34'),(4,1,1,NULL,'2017-01-02 10:40:17'),(5,1,1,NULL,'2017-01-02 15:41:05'),(6,1,1,NULL,'2017-01-02 19:12:13'),(7,1,1,NULL,'2017-01-02 22:25:31'),(8,1,1,NULL,'2017-01-03 05:55:45'),(9,1,1,NULL,'2017-01-03 08:21:24'),(10,1,1,NULL,'2017-01-03 09:03:25'),(11,1,1,NULL,'2017-01-03 10:55:58'),(12,1,1,NULL,'2017-01-03 10:56:29'),(13,1,1,NULL,'2017-01-03 10:58:46'),(14,1,1,NULL,'2017-01-03 11:01:50'),(15,1,1,NULL,'2017-01-03 11:02:13'),(16,1,1,NULL,'2017-01-03 11:08:05'),(17,1,1,NULL,'2017-01-03 13:08:10'),(18,1,1,NULL,'2017-01-03 13:08:47'),(19,1,1,NULL,'2017-01-03 13:10:30'),(20,1,1,NULL,'2017-01-03 13:13:25'),(21,1,1,NULL,'2017-01-03 13:14:47'),(22,1,1,NULL,'2017-01-03 13:16:39'),(23,1,1,NULL,'2017-01-03 13:18:08'),(24,1,1,NULL,'2017-01-03 17:19:16'),(25,1,1,NULL,'2017-01-03 17:20:55'),(26,1,1,NULL,'2017-01-04 23:44:03'),(27,1,1,NULL,'2017-01-04 23:44:07'),(28,1,1,NULL,'2017-01-04 23:44:09'),(29,1,1,NULL,'2017-01-04 23:44:55'),(30,1,1,NULL,'2017-01-04 23:45:51'),(31,1,1,NULL,'2017-01-04 23:49:47'),(32,1,1,NULL,'2017-01-05 01:26:44'),(33,1,3,'Usuário 2,usuario2@gmail.com,user1,1','2017-01-05 01:44:17'),(34,1,3,'Usuário 2,usuario2@gmail.com,user1,1','2017-01-05 01:45:52'),(35,1,3,'Usuário 2,usuario2@gmail.com,user2,1','2017-01-05 01:46:01'),(36,1,4,'Teste 3,teste@teste.com,teste3,1','2017-01-05 01:48:32'),(37,1,1,NULL,'2017-01-05 20:10:38'),(38,1,1,NULL,'2017-01-05 22:32:26'),(39,1,3,'Teste Moura,teste@gmail.com,teste,1','2017-01-05 22:34:19'),(40,1,3,'Teste Moura,teste@gmail.com,teste,','2017-01-05 22:34:26'),(41,1,1,NULL,'2017-01-05 22:34:52'),(42,1,3,'Teste Moura,teste@gmail.com,teste,1','2017-01-05 22:35:01'),(43,1,3,'Teste Moura,teste@gmail.com,teste,1','2017-01-05 22:35:32'),(44,4,1,NULL,'2017-01-05 22:35:47'),(45,1,1,NULL,'2017-01-06 03:53:23'),(46,1,1,NULL,'2017-01-06 11:11:54'),(47,1,1,NULL,'2017-01-06 15:13:57'),(48,1,5,'Disciplina A,AA2A,1','2017-01-06 16:27:44'),(49,1,5,'Disciplina A,AAA,1','2017-01-06 16:28:00'),(50,1,5,'Disciplina A,AAA,','2017-01-06 16:28:35'),(51,1,5,'Disciplina A,AAA,1','2017-01-06 16:29:16'),(52,1,5,'Disciplina A,AAA,','2017-01-06 16:29:39'),(53,1,1,NULL,'2017-01-06 21:42:55'),(54,1,5,'Disciplina A,AAA,1','2017-01-06 21:53:37'),(55,1,5,'Disciplina A,AAA,1','2017-01-06 22:00:14'),(56,1,5,'Disciplina A,AAA,0','2017-01-06 22:00:18'),(57,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,','2017-01-06 22:00:42'),(58,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,','2017-01-06 22:01:37'),(59,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,','2017-01-06 22:02:02'),(60,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-06 22:03:32'),(61,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,0','2017-01-06 22:03:50'),(62,1,6,'teste1,tt1,1','2017-01-06 22:38:14'),(63,1,1,NULL,'2017-01-07 01:42:40'),(64,1,5,'Disciplina X,XXX,1','2017-01-07 01:43:22'),(65,1,6,'Dosciplina Z,ZZZ,1','2017-01-07 01:44:11'),(66,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-07 01:47:15'),(67,1,5,'Disciplina C2,CCC2,1','2017-01-07 02:20:30'),(68,1,5,'Disciplina C2,CCC2,1','2017-01-07 02:20:55'),(69,1,1,NULL,'2017-01-09 12:02:14'),(70,1,6,'Teste 3,tt3,1','2017-01-09 12:03:26'),(71,1,5,'Teste 32,tt32,1','2017-01-09 12:05:31'),(72,1,5,'Teste 32,tt32,1','2017-01-09 12:09:08'),(73,1,5,'Teste 321,tt32,1','2017-01-09 12:09:20'),(74,1,5,'Teste 3212,tt32,1','2017-01-09 12:09:24'),(75,1,5,'Teste 32121,tt31,1','2017-01-09 12:10:23'),(76,1,5,'Teste 32121,tt31,1','2017-01-09 12:11:22'),(77,1,1,NULL,'2017-01-09 12:30:16'),(78,1,1,NULL,'2017-01-09 13:22:54'),(79,1,5,'Disciplina B2,BBB,1','2017-01-09 13:40:08'),(80,1,5,'Disciplina B,BBB,1','2017-01-09 13:40:32'),(81,1,6,'teste 9,tt9,1','2017-01-09 13:46:18'),(82,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-09 15:15:05'),(83,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-09 15:15:21'),(84,1,5,'Disciplina B1,BBB,1','2017-01-09 15:17:05'),(85,1,5,'Disciplina B,BBB,1','2017-01-09 15:17:26'),(86,1,5,'Disciplina B1,BBB,1','2017-01-09 15:19:38'),(87,1,5,'Disciplina B,BBB,1','2017-01-09 15:21:14'),(88,1,5,'Disciplina B1,BBB,1','2017-01-09 16:05:28'),(89,1,5,'Disciplina B,BBB,1','2017-01-09 16:07:30'),(90,1,5,'Disciplina G1,GGG,1','2017-01-09 16:07:37'),(91,1,5,'Disciplina G,GGG,1','2017-01-09 16:09:47'),(92,1,5,'Disciplina G,GGG,1','2017-01-09 16:10:36'),(93,1,1,NULL,'2017-01-10 05:48:53'),(94,1,1,NULL,'2017-01-10 05:51:25'),(95,1,1,NULL,'2017-01-10 05:53:45'),(96,1,1,NULL,'2017-01-10 23:12:18'),(97,1,1,NULL,'2017-01-18 10:40:19'),(98,1,1,NULL,'2017-01-19 01:01:11'),(99,1,1,NULL,'2017-01-19 06:52:27'),(100,1,1,NULL,'2017-01-19 08:51:36'),(101,1,5,'Disciplina D,DD,0','2017-01-19 08:52:01'),(102,1,5,'Disciplina E,EE,0','2017-01-19 08:52:13'),(103,1,5,'Disciplina C2,CC,0','2017-01-19 08:52:25'),(104,1,1,NULL,'2017-01-19 10:40:11'),(105,1,1,NULL,'2017-01-19 20:28:13'),(106,1,1,NULL,'2017-01-20 16:56:18'),(107,1,1,NULL,'2017-01-20 22:37:01'),(108,1,1,NULL,'2017-01-21 03:26:04'),(109,1,1,NULL,'2017-01-21 03:59:07'),(110,1,1,NULL,'2017-01-21 04:31:26'),(111,1,1,NULL,'2017-01-21 08:59:50'),(112,1,1,NULL,'2017-01-21 19:44:43'),(113,1,1,NULL,'2017-01-22 01:03:07'),(114,1,1,NULL,'2017-01-29 10:54:26'),(115,1,1,NULL,'2017-01-29 14:42:40'),(116,1,1,NULL,'2017-01-29 15:53:37'),(117,1,6,'fwfewwf,ddd,1','2017-01-29 18:30:17'),(118,1,5,'Elétrica,ELE,1','2017-01-29 18:31:08'),(119,1,5,'Elétrica,ELE,0','2017-01-29 18:33:04'),(120,1,5,'Elétrica,ELE,1','2017-01-29 18:33:14'),(121,1,1,NULL,'2017-01-29 18:58:58'),(122,1,1,NULL,'2017-01-29 19:00:21'),(123,1,1,NULL,'2017-01-29 19:03:57'),(124,1,1,NULL,'2017-01-29 19:05:13'),(125,1,1,NULL,'2017-01-29 19:10:08'),(126,1,1,NULL,'2017-01-30 07:55:50'),(127,1,7,'Sub B1,SBBY,1','2017-01-30 10:50:31'),(128,1,7,'Sub B1,SBB1,1','2017-01-30 10:54:49'),(129,1,7,'Sub B1,SBBX,1','2017-01-30 10:55:25'),(130,1,7,'Sub B1,SBB1,1','2017-01-30 10:56:01'),(131,1,7,'Sub B1,SBBx,1','2017-01-30 10:58:09'),(132,1,7,'Sub B1,SBB1,1','2017-01-30 10:59:12'),(133,1,7,'Sub B1,SBBo,0','2017-01-30 11:10:48'),(134,1,7,'Sub B1,SBB1,1','2017-01-30 11:11:02'),(135,1,7,'Sub B22,SBBc,0','2017-01-30 11:11:27'),(136,1,7,'Sub B22,SBBc,1','2017-01-30 11:11:34'),(137,1,7,'Sub B22,SBB2,1','2017-01-30 11:11:46'),(138,1,7,'Sub B2,SBB2,1','2017-01-30 11:12:09'),(139,1,7,'Sub B1,SBB1,1','2017-01-30 11:15:59'),(140,1,7,'Sub B1,SBBx,1','2017-01-30 11:31:14'),(141,1,7,'Sub B1,SBB1,1','2017-01-30 11:31:57'),(142,1,7,'Sub B1,SBB1,1','2017-01-30 11:32:10'),(143,1,8,'TESTE,TTTT,1','2017-01-30 11:56:23'),(144,1,8,'teste 3,tt3,1','2017-01-30 11:58:27'),(145,1,8,'teste 4,ttt4,0','2017-01-30 11:59:38'),(146,1,8,'teste 5,ttt5,1','2017-01-30 12:00:49'),(147,1,8,'Teste 6,ttt6,1','2017-01-30 12:06:55'),(148,1,8,'Teste 7,ttt7,1','2017-01-30 12:28:15'),(149,1,8,'Teste 8,ttt8,1','2017-01-30 12:35:58'),(150,1,8,',,1','2017-01-30 12:38:11'),(151,1,7,'teste 9,tt9,1','2017-01-30 12:38:20'),(152,1,1,NULL,'2017-01-30 13:10:38'),(153,1,1,NULL,'2017-01-30 14:40:54'),(154,1,9,'teste 9,tt9,1','2017-01-30 14:50:50'),(155,1,9,'Teste 7,ttt7,1','2017-01-30 14:51:10'),(156,1,9,'teste 4,ttt4,0','2017-01-30 14:54:33'),(157,1,9,'Teste 6,ttt6,1','2017-01-30 14:54:37'),(158,1,9,'TESTE,TTTT,1','2017-01-30 14:54:40'),(159,1,9,'teste 3,tt3,1','2017-01-30 14:54:42'),(160,1,9,'teste 5,ttt5,1','2017-01-30 14:54:46'),(161,1,8,'teste 1,ttt1,0','2017-01-30 14:54:58'),(162,1,9,'teste 1,ttt1,0','2017-01-30 14:55:03'),(163,1,7,'Sub B2,SBB3,1','2017-01-30 14:55:16'),(164,1,7,'Sub B2,SBB2,1','2017-01-30 14:55:29'),(165,1,8,'Teste 3,TTT3,1','2017-01-30 15:00:05'),(166,1,1,NULL,'2017-01-30 15:52:10'),(167,1,1,NULL,'2017-01-30 16:06:36'),(168,1,10,'4,1','2017-01-30 18:01:52'),(169,1,10,'4,1','2017-01-30 18:02:27'),(170,1,11,'6,1','2017-01-30 18:18:06'),(171,1,10,'6,1','2017-01-30 18:23:39'),(172,1,11,'2,1','2017-01-30 18:23:47'),(173,1,10,'2,1','2017-01-30 18:24:35'),(174,1,11,'6,1','2017-01-30 18:24:39'),(175,1,11,'2,1','2017-01-30 18:24:42'),(176,1,10,'4,1','2017-01-30 18:24:56'),(177,1,11,'4,1','2017-01-30 18:24:59'),(178,1,1,NULL,'2017-01-31 08:35:22'),(179,1,10,'6,1','2017-01-31 08:37:38'),(180,1,11,'6,1','2017-01-31 08:39:07'),(181,1,10,'6,1','2017-01-31 08:39:11'),(183,1,12,'4,1,2','2017-01-31 10:51:47'),(184,1,12,'6,1,1','2017-01-31 11:10:15'),(185,1,13,'1,1','2017-01-31 11:22:37'),(186,1,13,'6,1','2017-01-31 11:24:29'),(187,1,13,'2,1','2017-01-31 11:24:34'),(188,1,13,'4,1','2017-01-31 11:26:46'),(189,1,12,'4,1,1','2017-01-31 11:27:36'),(190,1,13,'4,1','2017-01-31 11:29:22'),(191,1,12,'4,1,1','2017-01-31 11:29:28'),(192,1,12,'1,1,2','2017-01-31 11:31:58'),(193,1,12,'6,1,2','2017-01-31 11:35:31'),(194,1,12,'2,1,1','2017-01-31 11:35:41'),(195,1,13,'2,1','2017-01-31 11:35:56'),(196,1,13,'6,1','2017-01-31 11:36:03'),(197,1,13,'4,1','2017-01-31 11:36:05'),(198,1,10,'4,3','2017-01-31 11:37:02'),(199,1,12,'1,3,1','2017-01-31 11:37:06'),(200,1,12,'4,3,1','2017-01-31 11:40:37'),(201,1,13,'1,1','2017-01-31 11:42:06'),(202,1,12,'6,1,2','2017-01-31 11:42:28'),(203,1,12,'4,1,1','2017-01-31 11:42:51'),(204,1,13,'6,1','2017-01-31 11:43:01'),(205,1,13,'4,1','2017-01-31 11:43:21'),(206,1,12,'6,1,2','2017-01-31 11:43:27'),(207,1,11,'1,1','2017-01-31 11:43:41'),(208,1,10,'1,1','2017-01-31 11:43:47'),(209,1,8,'tetettt,lll,1','2017-01-31 11:44:05'),(210,1,9,'tetettt,lll,1','2017-01-31 11:44:10'),(211,1,3,'Raul Castro Validador 2,raulcastro@gdoks.com.br,teste,1','2017-01-31 11:52:12'),(212,1,3,'Raul Castro Validador,raulcastro@gdoks.com.br,teste,1','2017-01-31 11:52:19'),(213,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-31 11:52:42'),(214,1,6,'Hidráulica,HDR,1','2017-01-31 11:53:46'),(215,1,8,'Tubulações,HDR1,1','2017-01-31 11:54:13'),(216,1,8,'Vazões,HDR2,1','2017-01-31 11:55:08'),(217,1,10,'4,15','2017-01-31 11:55:16'),(218,1,12,'1,15,1','2017-01-31 11:55:22'),(219,1,13,'1,15','2017-01-31 11:55:28'),(220,1,12,'1,15,2','2017-01-31 11:55:36');
/*!40000 ALTER TABLE `gdoks_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_projetos`
--

DROP TABLE IF EXISTS `gdoks_projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_projetos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `ativo` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  KEY `FK_cliente_idx` (`id_cliente`),
  CONSTRAINT `FK_projetos_x_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `gdoks_clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_projetos`
--

LOCK TABLES `gdoks_projetos` WRITE;
/*!40000 ALTER TABLE `gdoks_projetos` DISABLE KEYS */;
INSERT INTO `gdoks_projetos` VALUES (1,'Aratuba dos Palmares',1,''),(2,'Duplicação da BR 119',2,''),(3,'Centro de Convivência',1,'');
/*!40000 ALTER TABLE `gdoks_projetos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_subdisciplinas`
--

DROP TABLE IF EXISTS `gdoks_subdisciplinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_subdisciplinas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `sigla` varchar(4) DEFAULT NULL,
  `ativa` bit(1) DEFAULT b'1',
  `id_disciplina` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`),
  UNIQUE KEY `sigla_UNIQUE` (`sigla`),
  KEY `FK_disciplinas_x_subdisciplinas_idx` (`id_disciplina`),
  CONSTRAINT `FK_disciplinas_x_subdisciplinas` FOREIGN KEY (`id_disciplina`) REFERENCES `gdoks_disciplinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_subdisciplinas`
--

LOCK TABLES `gdoks_subdisciplinas` WRITE;
/*!40000 ALTER TABLE `gdoks_subdisciplinas` DISABLE KEYS */;
INSERT INTO `gdoks_subdisciplinas` VALUES (1,'Sub B1','SBB1','',1),(2,'Sub B2','SBB2','',1),(12,'Teste 3','TTT3','',3),(14,'Tubulações','HDR1','',15),(15,'Vazões','HDR2','',15);
/*!40000 ALTER TABLE `gdoks_subdisciplinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_usuarios`
--

DROP TABLE IF EXISTS `gdoks_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `token` varchar(45) DEFAULT NULL,
  `validade_do_token` datetime DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `ativo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`,`id_cliente`),
  KEY `FK_clientes_x_usuarios_idx` (`id_cliente`),
  CONSTRAINT `FK_clientes_x_usuarios` FOREIGN KEY (`id_cliente`) REFERENCES `gdoks_clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios`
--

LOCK TABLES `gdoks_usuarios` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios` VALUES (1,'sergio','*91D6F94093CD93F1E8405462FE7DC8771C8AB6E1','Sérgio Moura','smouracalmon@gmail.com','5890a95e833168.26164086','2017-01-31 14:12:30',1,''),(2,'user2','*FB59F051EDC5779D26DDA273499B8B3E5901DFBE','Usuário 2','usuario2@gmail.com',NULL,NULL,1,''),(3,'tony','asda','Anthony Barbosa','tony@faraday.com.br',NULL,NULL,2,''),(4,'teste','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Raul Castro Validador','raulcastro@gdoks.com.br','586ef4744c7fc0.56527252','2017-01-06 00:35:48',1,''),(6,'teste3','teste','Teste 3','teste@teste.com',NULL,NULL,1,'');
/*!40000 ALTER TABLE `gdoks_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_usuarios_x_areas`
--

DROP TABLE IF EXISTS `gdoks_usuarios_x_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_usuarios_x_areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `permissao` tinyint(8) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_usuario_x_projeto` (`id_usuario`,`id_area`),
  KEY `FK_perm_usuarios_idx` (`id_usuario`),
  KEY `FK_usuarios_x_areas_area_idx` (`id_area`),
  CONSTRAINT `FK_usuarios_x_areas_area` FOREIGN KEY (`id_area`) REFERENCES `gdoks_areas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_usuarios_x_areas_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios_x_areas`
--

LOCK TABLES `gdoks_usuarios_x_areas` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios_x_areas` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios_x_areas` VALUES (1,1,1,3),(2,1,3,1);
/*!40000 ALTER TABLE `gdoks_usuarios_x_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_validadores`
--

DROP TABLE IF EXISTS `gdoks_validadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_validadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `id_disciplina` int(11) DEFAULT NULL,
  `tipo` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_validadores`
--

LOCK TABLES `gdoks_validadores` WRITE;
/*!40000 ALTER TABLE `gdoks_validadores` DISABLE KEYS */;
INSERT INTO `gdoks_validadores` VALUES (11,1,3,1),(12,4,3,1),(15,6,1,2),(17,1,15,2);
/*!40000 ALTER TABLE `gdoks_validadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'gdoks'
--

--
-- Dumping routines for database 'gdoks'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-31 12:17:33
