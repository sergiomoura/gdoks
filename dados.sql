-- MySQL dump 10.13  Distrib 5.6.26, for Win64 (x86_64)
--
-- Host: localhost    Database: gdoks
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_acoes`
--

LOCK TABLES `gdoks_acoes` WRITE;
/*!40000 ALTER TABLE `gdoks_acoes` DISABLE KEYS */;
INSERT INTO `gdoks_acoes` VALUES (1,'Logar','Logou no sistema'),(2,'Alterar Dados Pessoais','Alterou dados pessoais');
/*!40000 ALTER TABLE `gdoks_acoes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_clientes`
--

LOCK TABLES `gdoks_clientes` WRITE;
/*!40000 ALTER TABLE `gdoks_clientes` DISABLE KEYS */;
INSERT INTO `gdoks_clientes` VALUES (1,'GDoks');
/*!40000 ALTER TABLE `gdoks_clientes` ENABLE KEYS */;
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
  `parametros` varchar(45) DEFAULT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_id_usuario_idx` (`id_usuario`),
  KEY `FK_id_acao_idx` (`id_acao`),
  CONSTRAINT `FK_id_acao` FOREIGN KEY (`id_acao`) REFERENCES `gdoks_acoes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_log`
--

LOCK TABLES `gdoks_log` WRITE;
/*!40000 ALTER TABLE `gdoks_log` DISABLE KEYS */;
INSERT INTO `gdoks_log` VALUES (1,1,1,NULL,'2017-01-02 08:30:36'),(2,1,2,NULL,'2017-01-02 08:37:26'),(3,1,2,NULL,'2017-01-02 08:38:34');
/*!40000 ALTER TABLE `gdoks_log` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`,`id_cliente`),
  KEY `FK_clientes_x_usuarios_idx` (`id_cliente`),
  CONSTRAINT `FK_clientes_x_usuarios` FOREIGN KEY (`id_cliente`) REFERENCES `gdoks_clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios`
--

LOCK TABLES `gdoks_usuarios` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios` VALUES (1,'sergio','*91D6F94093CD93F1E8405462FE7DC8771C8AB6E1','Sérgio Moura','smouracalmon@gmail.com','586a3c36a5d6e8.63411099','2017-01-02 10:40:38',1),(2,'user1','*34D3B87A652E7F0D1D371C3DBF28E291705468C4','Usu├írio 1','usuario1@gmail.com',NULL,NULL,1);
/*!40000 ALTER TABLE `gdoks_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-02  8:42:31
