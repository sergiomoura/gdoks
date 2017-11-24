-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: gdoks
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_acoes`
--

LOCK TABLES `gdoks_acoes` WRITE;
/*!40000 ALTER TABLE `gdoks_acoes` DISABLE KEYS */;
INSERT INTO `gdoks_acoes` VALUES (1,'Logar','Logou no sistema'),(2,'Alterar Dados Pessoais','Alterou dados pessoais'),(3,'Alterar Dados de Usuário','Alterou dados de usuário nome:$1, email:$2, login:$3, ativo:$4'),(4,'Criou usuário','Criou usuário nome:$1, email:$2, login:$3, ativo:$4'),(5,'Alterou Disciplina','Alterou disciplina nome:$1, sigla:$2, ativa:$3'),(6,'Criou Disciplina','Criou disciplina nome:$1, sigla:$2, ativa:$3'),(7,'Alterou Subdisciplina','Alterou subdisciplina nome:$1, sigla:$2, ativa:$3'),(8,'Criou Subdisciplina','Criou subdisciplina nome:$1, sigla:$2, ativa:$3'),(9,'Removeu Subdisciplina','Removeu subdisciplina nome:$1, sigla:$2, ativa:$3'),(10,'Associou Especialista','Associou especialista $1 a disciplina $2'),(11,'Desassociou Especialista','Desassociou especialista $1 da disciplina $2'),(12,'Associou Validador','Associou o validador $1 a disciplina $2 (Tipo $3)'),(13,'Desassociou Validador','Desassociou o validador $1 da disciplina $2'),(14,'Alterou Cliente','Alterou dados do cliente $1,nome:$2, nome_fantasia $3'),(15,'Adicionou Cliente','Adicionou cliente $1 (nome:$2)'),(16,'Alterou Projeto','Alterou o projeto $8: $1,$2,$3,$4,$5,$6,$7'),(17,'Adicionou Projeto','Adicionou o projeto $8: $1,$2,$3,$4,$5,$6,$7'),(18,'Adicionou Área','Adicionou área ao projeto $3: $1,$2'),(19,'Alterou Área','Alterou área do projeto $3: $1,$2'),(20,'Removeu Área','Removeu área do projeto $3: $1,$2'),(21,'Criou DAO','Criou DAO $3: $1 [$2]'),(22,'Removeu DAO','Removeu DAO $3: $1 [$2]'),(23,'Alterou Documento','Alterou o documento $1: [nome] => $2 [id_subdisciplina] => $3 [id_area] => $4)'),(24,'Adicionou Documento','Adicionou o documento $1: [nome] => $2, [id_subdisciplina] => $3 [id_area]=>$4 [id_projeto]] => $5'),(25,'Removeu Documento','Removeu documento $1:  [id] => 3 [nome] => $2 [id_area] => $3 [id_subdisciplina] => $4'),(26,'Baixou Arquivo','Baixou arquivo $1'),(27,'Validou Progresso','Validou Progresso de $1% para o documento $2'),(28,'Bloqueou Documento','Bloqueou o documento $1'),(29,'Desbloqueou Documento','Desbloqueou documento $1'),(30,'Atualizou Documento','Atualizou documento $1 com arquivo $2 ($3)');
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
  `codigo` varchar(12) DEFAULT NULL,
  `id_projeto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_areas_x_projetos_idx` (`id_projeto`),
  CONSTRAINT `FK_areas_x_projetos` FOREIGN KEY (`id_projeto`) REFERENCES `gdoks_projetos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_areas`
--

LOCK TABLES `gdoks_areas` WRITE;
/*!40000 ALTER TABLE `gdoks_areas` DISABLE KEYS */;
INSERT INTO `gdoks_areas` VALUES (9,'PA1','Área 1',12),(10,'PA2','Área 2',12),(11,'Área 1 PRJB','AR1',13);
/*!40000 ALTER TABLE `gdoks_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_arquivos`
--

DROP TABLE IF EXISTS `gdoks_arquivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_arquivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caminho` varchar(200) DEFAULT NULL,
  `nome_cliente` varchar(256) DEFAULT NULL,
  `id_documento` int(11) DEFAULT NULL,
  `datahora_upload` datetime DEFAULT NULL,
  `progresso_total` smallint(8) NOT NULL DEFAULT '0',
  `idu` int(11) DEFAULT NULL,
  `tamanho` int(11) DEFAULT NULL,
  `idu_validador` int(11) DEFAULT NULL,
  `datahora_validacao` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_idu_x_usuarios_idx` (`idu`),
  KEY `FK_idu_validador_x_usuarios_idx` (`idu_validador`),
  KEY `FK_id_documento_x_documentos_idx` (`id_documento`),
  CONSTRAINT `FK_id_documento_x_documentos` FOREIGN KEY (`id_documento`) REFERENCES `gdoks_documentos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_idu_validador_x_usuarios` FOREIGN KEY (`idu_validador`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_idu_x_usuarios` FOREIGN KEY (`idu`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_arquivos`
--

LOCK TABLES `gdoks_arquivos` WRITE;
/*!40000 ALTER TABLE `gdoks_arquivos` DISABLE KEYS */;
INSERT INTO `gdoks_arquivos` VALUES (16,'../../uploads/1/15909ef545670a','chpass_icon.png',22,'2017-05-03 11:55:16',20,1,2194,1,'2017-05-03 11:56:05'),(17,'../../uploads/1/1590a044a0324b','icon_home.png',22,'2017-05-03 13:24:42',30,1,708,1,'2017-05-03 13:30:31'),(18,'../../uploads/1/1590a07e1e0755','projeto.png',22,'2017-05-03 13:40:01',38,1,1312,1,'2017-05-03 14:49:14'),(19,'../../uploads/1/1590a18abaccf0','logo.png',22,'2017-05-03 14:51:39',42,1,13569,1,'2017-05-03 14:52:33'),(20,'../../uploads/1/1590a19ea0edad','icon_home.png',22,'2017-05-03 14:56:58',45,1,708,1,'2017-05-03 15:03:19'),(21,'../../uploads/1/1590a1ba8f2450','cliente.png',22,'2017-05-03 15:04:24',55,1,1952,1,'2017-05-03 15:05:00'),(22,'../../uploads/1/1590a1c5734f13','icon_projetos.png',22,'2017-05-03 15:07:19',60,1,645,1,'2017-05-03 15:08:18'),(23,'../../uploads/1/1590a20a468a18','mini-icons.png',22,'2017-05-03 15:25:40',65,1,2927,1,'2017-05-03 15:26:33'),(24,'../../uploads/1/1590a20efc8a10','min-menu.png',22,'2017-05-03 15:26:55',70,1,255,1,'2017-05-03 15:27:45'),(25,'../../uploads/1/1590a213665756','cliente.png',22,'2017-05-03 15:28:06',80,1,1952,1,'2017-05-03 15:44:52'),(26,'../../uploads/1/1590a2544342c0','cliente.png',22,'2017-05-03 15:45:24',85,1,1952,1,'2017-05-03 15:48:56'),(27,'../../uploads/1/1590a263db0cc6','disciplina.png',22,'2017-05-03 15:49:33',86,1,1720,1,'2017-05-03 16:08:21'),(28,'../../uploads/1/1590a2acc83a8a','projeto.png',22,'2017-05-03 16:09:00',86,1,1312,1,'2017-05-03 16:14:41'),(29,'../../uploads/1/1590a2c3a8d671','logo.png',22,'2017-05-03 16:15:06',86,1,13569,1,'2017-05-03 16:16:44'),(30,'../../uploads/1/1590a2cade1a91','icon_documentos.png',22,'2017-05-03 16:17:01',86,1,449,1,'2017-05-03 16:46:39'),(31,'../../uploads/1/1590a33b29b15c','icon_home.png',22,'2017-05-03 16:46:58',86,1,708,1,'2017-05-03 16:51:07'),(32,'../../uploads/1/1590a34cd64943','disciplina.png',22,'2017-05-03 16:51:41',86,1,1720,1,'2017-05-03 17:03:07'),(33,'../../uploads/1/1590a378f124e9','documentos.png',22,'2017-05-03 17:03:27',86,1,1178,1,'2017-05-03 17:04:27'),(34,'../../uploads/1/1590a37d841b23','chpass_icon.png',22,'2017-05-03 17:04:40',87,1,2194,1,'2017-05-03 17:05:35'),(35,'../../uploads/1/1590a382faf26a','chpass_icon.png',22,'2017-05-03 17:06:07',100,1,2194,1,'2017-05-03 17:06:17'),(36,'../../uploads/1/1591285c56bf23','761GJIB7iGeZ.jpg',24,'2017-05-10 00:15:17',17,1,89988,NULL,NULL);
/*!40000 ALTER TABLE `gdoks_arquivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_cargos`
--

DROP TABLE IF EXISTS `gdoks_cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_cargos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `hh` decimal(12,2) NOT NULL DEFAULT '0.00',
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_nome_de_cargo_na_empresa` (`nome`,`id_empresa`),
  KEY `FK_cargos_x_empresas_idx` (`id_empresa`),
  CONSTRAINT `FK_cargos_x_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_cargos`
--

LOCK TABLES `gdoks_cargos` WRITE;
/*!40000 ALTER TABLE `gdoks_cargos` DISABLE KEYS */;
INSERT INTO `gdoks_cargos` VALUES (1,'Engenheiro Júnior',80.00,1),(2,'Engenheiro Sênior',120.00,1),(3,'Desenhista',50.00,1);
/*!40000 ALTER TABLE `gdoks_cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_clientes`
--

DROP TABLE IF EXISTS `gdoks_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cpf` varchar(14) DEFAULT NULL,
  `cnpj` varchar(18) DEFAULT NULL,
  `nome` varchar(45) NOT NULL,
  `nome_fantasia` varchar(45) DEFAULT NULL,
  `registrado_em` datetime NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `contato_nome` varchar(45) DEFAULT NULL,
  `contato_email` varchar(45) DEFAULT NULL,
  `contato_telefone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cliente_x_empresas_idx` (`id_empresa`),
  CONSTRAINT `FK_cliente_x_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_clientes`
--

LOCK TABLES `gdoks_clientes` WRITE;
/*!40000 ALTER TABLE `gdoks_clientes` DISABLE KEYS */;
INSERT INTO `gdoks_clientes` VALUES (1,'802.828.065-04',NULL,'Sérgio Moura','Cliente PF','2017-02-08 11:25:00',1,'Sérgio','smouracalmon@gmail.com','(71) 99359-8089'),(2,NULL,'12.101.111/2222-21','Emporius Empreendimentos','Empresa X','2017-02-08 11:30:00',1,'Teste','teste@teste.com.br','(71) 96669-9966'),(3,NULL,'11.111.111/1111-12','Paseo Shopping','Paseo','2017-02-08 12:00:00',1,'Horlando','teste2@teste.com','(71) 98888-8888'),(4,NULL,'34.343.434/3434-33','Teste 355','Teste','2017-02-08 17:06:03',1,'teste contato','teste@teste.com','12121212'),(5,NULL,'12.312.312/3123-12','aaaa22','aaaa','2017-02-08 23:06:51',1,'','dddd@teste.com',''),(6,'558.884.848-88',NULL,'Wowooo','wwowoo','2017-02-08 23:47:26',1,'','',''),(7,NULL,'06.236.852/0001-69','Faraday Ilimitada','Faraday','2017-02-10 19:41:40',1,'Anthony Stark','anthony@starkindustries.com','99999999'),(8,NULL,'11.112.132/1355-50','Teste Pessoa Jurídica 1','TPJ 1','2017-02-17 08:41:09',1,'teste','teste@teste.com','123123123');
/*!40000 ALTER TABLE `gdoks_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_daos`
--

DROP TABLE IF EXISTS `gdoks_daos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_daos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `nome_unico` varchar(45) DEFAULT NULL,
  `nome_cliente` varchar(200) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `tamanho` int(11) DEFAULT NULL,
  `id_projeto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_nome_x_projeto` (`nome`,`id_projeto`),
  KEY `FK_daos_x_projetos_idx` (`id_projeto`),
  CONSTRAINT `FK_daos_x_projetos` FOREIGN KEY (`id_projeto`) REFERENCES `gdoks_projetos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='documentos de abertura de operações';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_daos`
--

LOCK TABLES `gdoks_daos` WRITE;
/*!40000 ALTER TABLE `gdoks_daos` DISABLE KEYS */;
INSERT INTO `gdoks_daos` VALUES (1,'CCH3','159127d14a28ad','585305-1000-1454057020-expressive-dog-portraits-elke-vogelsang-14.jpg','image/jpeg',111609,13),(2,'CCH2','159127d14c2227','585205-1000-1454057020-expressive-dog-portraits-elke-vogelsang-1.jpg','image/jpeg',264079,13),(3,'CCH1','159127d1506e14','404111_498589010168836_1957634377_n.jpg','image/jpeg',55141,13);
/*!40000 ALTER TABLE `gdoks_daos` ENABLE KEYS */;
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
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_sigla` (`sigla`,`id_empresa`),
  UNIQUE KEY `UNIQUE_nome` (`nome`,`id_empresa`),
  KEY `FK_cliente_idx` (`id_empresa`),
  CONSTRAINT `FK_cliente` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_disciplinas`
--

LOCK TABLES `gdoks_disciplinas` WRITE;
/*!40000 ALTER TABLE `gdoks_disciplinas` DISABLE KEYS */;
INSERT INTO `gdoks_disciplinas` VALUES (16,'Elétrica','ELE','',1);
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
  `id_subdisciplina` int(11) DEFAULT NULL,
  `data_limite` date DEFAULT NULL,
  `datahora_do_checkout` datetime DEFAULT NULL,
  `idu_checkout` int(11) DEFAULT NULL,
  `id_progresso_a_validar` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_documentos_area_idx` (`id_area`),
  KEY `FK_subdisciplinas_idx` (`id_subdisciplina`),
  KEY `FK_idu_checkout_x_usuarios_idx` (`idu_checkout`),
  KEY `FK_id_progresso_a_validar_x_arquivos_idx` (`id_progresso_a_validar`),
  CONSTRAINT `FK_id_area_x_areas` FOREIGN KEY (`id_area`) REFERENCES `gdoks_areas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_id_progresso_a_validar_x_arquivos` FOREIGN KEY (`id_progresso_a_validar`) REFERENCES `gdoks_arquivos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_id_subdisciplina` FOREIGN KEY (`id_subdisciplina`) REFERENCES `gdoks_subdisciplinas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_idu_checkout_x_usuarios` FOREIGN KEY (`idu_checkout`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_documentos`
--

LOCK TABLES `gdoks_documentos` WRITE;
/*!40000 ALTER TABLE `gdoks_documentos` DISABLE KEYS */;
INSERT INTO `gdoks_documentos` VALUES (22,'Doc das Tomadas',9,20,'2017-05-10',NULL,NULL,NULL),(23,'Docu dos Cabos',9,21,'2017-05-10','2017-05-06 01:17:18',1,NULL),(24,'DOC1',11,20,'2017-05-31',NULL,NULL,36);
/*!40000 ALTER TABLE `gdoks_documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_documentos_x_dependencias`
--

DROP TABLE IF EXISTS `gdoks_documentos_x_dependencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_documentos_x_dependencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_documento` int(11) DEFAULT NULL,
  `id_dependencia` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_documentos_x_doc_dependente_idx` (`id_documento`),
  KEY `FK_documentos_x_doc_pai_idx` (`id_dependencia`),
  CONSTRAINT `FK_documentos_x_doc_dependente` FOREIGN KEY (`id_documento`) REFERENCES `gdoks_documentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_documentos_x_doc_pai` FOREIGN KEY (`id_dependencia`) REFERENCES `gdoks_documentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_documentos_x_dependencias`
--

LOCK TABLES `gdoks_documentos_x_dependencias` WRITE;
/*!40000 ALTER TABLE `gdoks_documentos_x_dependencias` DISABLE KEYS */;
INSERT INTO `gdoks_documentos_x_dependencias` VALUES (45,23,22);
/*!40000 ALTER TABLE `gdoks_documentos_x_dependencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_empresas`
--

DROP TABLE IF EXISTS `gdoks_empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_empresas`
--

LOCK TABLES `gdoks_empresas` WRITE;
/*!40000 ALTER TABLE `gdoks_empresas` DISABLE KEYS */;
INSERT INTO `gdoks_empresas` VALUES (2,'Faraday'),(1,'GDoks');
/*!40000 ALTER TABLE `gdoks_empresas` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_especialistas`
--

LOCK TABLES `gdoks_especialistas` WRITE;
/*!40000 ALTER TABLE `gdoks_especialistas` DISABLE KEYS */;
INSERT INTO `gdoks_especialistas` VALUES (20,1,16);
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
) ENGINE=InnoDB AUTO_INCREMENT=927 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_log`
--

LOCK TABLES `gdoks_log` WRITE;
/*!40000 ALTER TABLE `gdoks_log` DISABLE KEYS */;
INSERT INTO `gdoks_log` VALUES (1,1,1,NULL,'2017-01-02 08:30:36'),(2,1,2,NULL,'2017-01-02 08:37:26'),(3,1,2,NULL,'2017-01-02 08:38:34'),(4,1,1,NULL,'2017-01-02 10:40:17'),(5,1,1,NULL,'2017-01-02 15:41:05'),(6,1,1,NULL,'2017-01-02 19:12:13'),(7,1,1,NULL,'2017-01-02 22:25:31'),(8,1,1,NULL,'2017-01-03 05:55:45'),(9,1,1,NULL,'2017-01-03 08:21:24'),(10,1,1,NULL,'2017-01-03 09:03:25'),(11,1,1,NULL,'2017-01-03 10:55:58'),(12,1,1,NULL,'2017-01-03 10:56:29'),(13,1,1,NULL,'2017-01-03 10:58:46'),(14,1,1,NULL,'2017-01-03 11:01:50'),(15,1,1,NULL,'2017-01-03 11:02:13'),(16,1,1,NULL,'2017-01-03 11:08:05'),(17,1,1,NULL,'2017-01-03 13:08:10'),(18,1,1,NULL,'2017-01-03 13:08:47'),(19,1,1,NULL,'2017-01-03 13:10:30'),(20,1,1,NULL,'2017-01-03 13:13:25'),(21,1,1,NULL,'2017-01-03 13:14:47'),(22,1,1,NULL,'2017-01-03 13:16:39'),(23,1,1,NULL,'2017-01-03 13:18:08'),(24,1,1,NULL,'2017-01-03 17:19:16'),(25,1,1,NULL,'2017-01-03 17:20:55'),(26,1,1,NULL,'2017-01-04 23:44:03'),(27,1,1,NULL,'2017-01-04 23:44:07'),(28,1,1,NULL,'2017-01-04 23:44:09'),(29,1,1,NULL,'2017-01-04 23:44:55'),(30,1,1,NULL,'2017-01-04 23:45:51'),(31,1,1,NULL,'2017-01-04 23:49:47'),(32,1,1,NULL,'2017-01-05 01:26:44'),(33,1,3,'Usuário 2,usuario2@gmail.com,user1,1','2017-01-05 01:44:17'),(34,1,3,'Usuário 2,usuario2@gmail.com,user1,1','2017-01-05 01:45:52'),(35,1,3,'Usuário 2,usuario2@gmail.com,user2,1','2017-01-05 01:46:01'),(36,1,4,'Teste 3,teste@teste.com,teste3,1','2017-01-05 01:48:32'),(37,1,1,NULL,'2017-01-05 20:10:38'),(38,1,1,NULL,'2017-01-05 22:32:26'),(39,1,3,'Teste Moura,teste@gmail.com,teste,1','2017-01-05 22:34:19'),(40,1,3,'Teste Moura,teste@gmail.com,teste,','2017-01-05 22:34:26'),(41,1,1,NULL,'2017-01-05 22:34:52'),(42,1,3,'Teste Moura,teste@gmail.com,teste,1','2017-01-05 22:35:01'),(43,1,3,'Teste Moura,teste@gmail.com,teste,1','2017-01-05 22:35:32'),(44,4,1,NULL,'2017-01-05 22:35:47'),(45,1,1,NULL,'2017-01-06 03:53:23'),(46,1,1,NULL,'2017-01-06 11:11:54'),(47,1,1,NULL,'2017-01-06 15:13:57'),(48,1,5,'Disciplina A,AA2A,1','2017-01-06 16:27:44'),(49,1,5,'Disciplina A,AAA,1','2017-01-06 16:28:00'),(50,1,5,'Disciplina A,AAA,','2017-01-06 16:28:35'),(51,1,5,'Disciplina A,AAA,1','2017-01-06 16:29:16'),(52,1,5,'Disciplina A,AAA,','2017-01-06 16:29:39'),(53,1,1,NULL,'2017-01-06 21:42:55'),(54,1,5,'Disciplina A,AAA,1','2017-01-06 21:53:37'),(55,1,5,'Disciplina A,AAA,1','2017-01-06 22:00:14'),(56,1,5,'Disciplina A,AAA,0','2017-01-06 22:00:18'),(57,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,','2017-01-06 22:00:42'),(58,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,','2017-01-06 22:01:37'),(59,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,','2017-01-06 22:02:02'),(60,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-06 22:03:32'),(61,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,0','2017-01-06 22:03:50'),(62,1,6,'teste1,tt1,1','2017-01-06 22:38:14'),(63,1,1,NULL,'2017-01-07 01:42:40'),(64,1,5,'Disciplina X,XXX,1','2017-01-07 01:43:22'),(65,1,6,'Dosciplina Z,ZZZ,1','2017-01-07 01:44:11'),(66,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-07 01:47:15'),(67,1,5,'Disciplina C2,CCC2,1','2017-01-07 02:20:30'),(68,1,5,'Disciplina C2,CCC2,1','2017-01-07 02:20:55'),(69,1,1,NULL,'2017-01-09 12:02:14'),(70,1,6,'Teste 3,tt3,1','2017-01-09 12:03:26'),(71,1,5,'Teste 32,tt32,1','2017-01-09 12:05:31'),(72,1,5,'Teste 32,tt32,1','2017-01-09 12:09:08'),(73,1,5,'Teste 321,tt32,1','2017-01-09 12:09:20'),(74,1,5,'Teste 3212,tt32,1','2017-01-09 12:09:24'),(75,1,5,'Teste 32121,tt31,1','2017-01-09 12:10:23'),(76,1,5,'Teste 32121,tt31,1','2017-01-09 12:11:22'),(77,1,1,NULL,'2017-01-09 12:30:16'),(78,1,1,NULL,'2017-01-09 13:22:54'),(79,1,5,'Disciplina B2,BBB,1','2017-01-09 13:40:08'),(80,1,5,'Disciplina B,BBB,1','2017-01-09 13:40:32'),(81,1,6,'teste 9,tt9,1','2017-01-09 13:46:18'),(82,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-09 15:15:05'),(83,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-09 15:15:21'),(84,1,5,'Disciplina B1,BBB,1','2017-01-09 15:17:05'),(85,1,5,'Disciplina B,BBB,1','2017-01-09 15:17:26'),(86,1,5,'Disciplina B1,BBB,1','2017-01-09 15:19:38'),(87,1,5,'Disciplina B,BBB,1','2017-01-09 15:21:14'),(88,1,5,'Disciplina B1,BBB,1','2017-01-09 16:05:28'),(89,1,5,'Disciplina B,BBB,1','2017-01-09 16:07:30'),(90,1,5,'Disciplina G1,GGG,1','2017-01-09 16:07:37'),(91,1,5,'Disciplina G,GGG,1','2017-01-09 16:09:47'),(92,1,5,'Disciplina G,GGG,1','2017-01-09 16:10:36'),(93,1,1,NULL,'2017-01-10 05:48:53'),(94,1,1,NULL,'2017-01-10 05:51:25'),(95,1,1,NULL,'2017-01-10 05:53:45'),(96,1,1,NULL,'2017-01-10 23:12:18'),(97,1,1,NULL,'2017-01-18 10:40:19'),(98,1,1,NULL,'2017-01-19 01:01:11'),(99,1,1,NULL,'2017-01-19 06:52:27'),(100,1,1,NULL,'2017-01-19 08:51:36'),(101,1,5,'Disciplina D,DD,0','2017-01-19 08:52:01'),(102,1,5,'Disciplina E,EE,0','2017-01-19 08:52:13'),(103,1,5,'Disciplina C2,CC,0','2017-01-19 08:52:25'),(104,1,1,NULL,'2017-01-19 10:40:11'),(105,1,1,NULL,'2017-01-19 20:28:13'),(106,1,1,NULL,'2017-01-20 16:56:18'),(107,1,1,NULL,'2017-01-20 22:37:01'),(108,1,1,NULL,'2017-01-21 03:26:04'),(109,1,1,NULL,'2017-01-21 03:59:07'),(110,1,1,NULL,'2017-01-21 04:31:26'),(111,1,1,NULL,'2017-01-21 08:59:50'),(112,1,1,NULL,'2017-01-21 19:44:43'),(113,1,1,NULL,'2017-01-22 01:03:07'),(114,1,1,NULL,'2017-01-29 10:54:26'),(115,1,1,NULL,'2017-01-29 14:42:40'),(116,1,1,NULL,'2017-01-29 15:53:37'),(117,1,6,'fwfewwf,ddd,1','2017-01-29 18:30:17'),(118,1,5,'Elétrica,ELE,1','2017-01-29 18:31:08'),(119,1,5,'Elétrica,ELE,0','2017-01-29 18:33:04'),(120,1,5,'Elétrica,ELE,1','2017-01-29 18:33:14'),(121,1,1,NULL,'2017-01-29 18:58:58'),(122,1,1,NULL,'2017-01-29 19:00:21'),(123,1,1,NULL,'2017-01-29 19:03:57'),(124,1,1,NULL,'2017-01-29 19:05:13'),(125,1,1,NULL,'2017-01-29 19:10:08'),(126,1,1,NULL,'2017-01-30 07:55:50'),(127,1,7,'Sub B1,SBBY,1','2017-01-30 10:50:31'),(128,1,7,'Sub B1,SBB1,1','2017-01-30 10:54:49'),(129,1,7,'Sub B1,SBBX,1','2017-01-30 10:55:25'),(130,1,7,'Sub B1,SBB1,1','2017-01-30 10:56:01'),(131,1,7,'Sub B1,SBBx,1','2017-01-30 10:58:09'),(132,1,7,'Sub B1,SBB1,1','2017-01-30 10:59:12'),(133,1,7,'Sub B1,SBBo,0','2017-01-30 11:10:48'),(134,1,7,'Sub B1,SBB1,1','2017-01-30 11:11:02'),(135,1,7,'Sub B22,SBBc,0','2017-01-30 11:11:27'),(136,1,7,'Sub B22,SBBc,1','2017-01-30 11:11:34'),(137,1,7,'Sub B22,SBB2,1','2017-01-30 11:11:46'),(138,1,7,'Sub B2,SBB2,1','2017-01-30 11:12:09'),(139,1,7,'Sub B1,SBB1,1','2017-01-30 11:15:59'),(140,1,7,'Sub B1,SBBx,1','2017-01-30 11:31:14'),(141,1,7,'Sub B1,SBB1,1','2017-01-30 11:31:57'),(142,1,7,'Sub B1,SBB1,1','2017-01-30 11:32:10'),(143,1,8,'TESTE,TTTT,1','2017-01-30 11:56:23'),(144,1,8,'teste 3,tt3,1','2017-01-30 11:58:27'),(145,1,8,'teste 4,ttt4,0','2017-01-30 11:59:38'),(146,1,8,'teste 5,ttt5,1','2017-01-30 12:00:49'),(147,1,8,'Teste 6,ttt6,1','2017-01-30 12:06:55'),(148,1,8,'Teste 7,ttt7,1','2017-01-30 12:28:15'),(149,1,8,'Teste 8,ttt8,1','2017-01-30 12:35:58'),(150,1,8,',,1','2017-01-30 12:38:11'),(151,1,7,'teste 9,tt9,1','2017-01-30 12:38:20'),(152,1,1,NULL,'2017-01-30 13:10:38'),(153,1,1,NULL,'2017-01-30 14:40:54'),(154,1,9,'teste 9,tt9,1','2017-01-30 14:50:50'),(155,1,9,'Teste 7,ttt7,1','2017-01-30 14:51:10'),(156,1,9,'teste 4,ttt4,0','2017-01-30 14:54:33'),(157,1,9,'Teste 6,ttt6,1','2017-01-30 14:54:37'),(158,1,9,'TESTE,TTTT,1','2017-01-30 14:54:40'),(159,1,9,'teste 3,tt3,1','2017-01-30 14:54:42'),(160,1,9,'teste 5,ttt5,1','2017-01-30 14:54:46'),(161,1,8,'teste 1,ttt1,0','2017-01-30 14:54:58'),(162,1,9,'teste 1,ttt1,0','2017-01-30 14:55:03'),(163,1,7,'Sub B2,SBB3,1','2017-01-30 14:55:16'),(164,1,7,'Sub B2,SBB2,1','2017-01-30 14:55:29'),(165,1,8,'Teste 3,TTT3,1','2017-01-30 15:00:05'),(166,1,1,NULL,'2017-01-30 15:52:10'),(167,1,1,NULL,'2017-01-30 16:06:36'),(168,1,10,'4,1','2017-01-30 18:01:52'),(169,1,10,'4,1','2017-01-30 18:02:27'),(170,1,11,'6,1','2017-01-30 18:18:06'),(171,1,10,'6,1','2017-01-30 18:23:39'),(172,1,11,'2,1','2017-01-30 18:23:47'),(173,1,10,'2,1','2017-01-30 18:24:35'),(174,1,11,'6,1','2017-01-30 18:24:39'),(175,1,11,'2,1','2017-01-30 18:24:42'),(176,1,10,'4,1','2017-01-30 18:24:56'),(177,1,11,'4,1','2017-01-30 18:24:59'),(178,1,1,NULL,'2017-01-31 08:35:22'),(179,1,10,'6,1','2017-01-31 08:37:38'),(180,1,11,'6,1','2017-01-31 08:39:07'),(181,1,10,'6,1','2017-01-31 08:39:11'),(183,1,12,'4,1,2','2017-01-31 10:51:47'),(184,1,12,'6,1,1','2017-01-31 11:10:15'),(185,1,13,'1,1','2017-01-31 11:22:37'),(186,1,13,'6,1','2017-01-31 11:24:29'),(187,1,13,'2,1','2017-01-31 11:24:34'),(188,1,13,'4,1','2017-01-31 11:26:46'),(189,1,12,'4,1,1','2017-01-31 11:27:36'),(190,1,13,'4,1','2017-01-31 11:29:22'),(191,1,12,'4,1,1','2017-01-31 11:29:28'),(192,1,12,'1,1,2','2017-01-31 11:31:58'),(193,1,12,'6,1,2','2017-01-31 11:35:31'),(194,1,12,'2,1,1','2017-01-31 11:35:41'),(195,1,13,'2,1','2017-01-31 11:35:56'),(196,1,13,'6,1','2017-01-31 11:36:03'),(197,1,13,'4,1','2017-01-31 11:36:05'),(198,1,10,'4,3','2017-01-31 11:37:02'),(199,1,12,'1,3,1','2017-01-31 11:37:06'),(200,1,12,'4,3,1','2017-01-31 11:40:37'),(201,1,13,'1,1','2017-01-31 11:42:06'),(202,1,12,'6,1,2','2017-01-31 11:42:28'),(203,1,12,'4,1,1','2017-01-31 11:42:51'),(204,1,13,'6,1','2017-01-31 11:43:01'),(205,1,13,'4,1','2017-01-31 11:43:21'),(206,1,12,'6,1,2','2017-01-31 11:43:27'),(207,1,11,'1,1','2017-01-31 11:43:41'),(208,1,10,'1,1','2017-01-31 11:43:47'),(209,1,8,'tetettt,lll,1','2017-01-31 11:44:05'),(210,1,9,'tetettt,lll,1','2017-01-31 11:44:10'),(211,1,3,'Raul Castro Validador 2,raulcastro@gdoks.com.br,teste,1','2017-01-31 11:52:12'),(212,1,3,'Raul Castro Validador,raulcastro@gdoks.com.br,teste,1','2017-01-31 11:52:19'),(213,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-31 11:52:42'),(214,1,6,'Hidráulica,HDR,1','2017-01-31 11:53:46'),(215,1,8,'Tubulações,HDR1,1','2017-01-31 11:54:13'),(216,1,8,'Vazões,HDR2,1','2017-01-31 11:55:08'),(217,1,10,'4,15','2017-01-31 11:55:16'),(218,1,12,'1,15,1','2017-01-31 11:55:22'),(219,1,13,'1,15','2017-01-31 11:55:28'),(220,1,12,'1,15,2','2017-01-31 11:55:36'),(221,1,1,NULL,'2017-01-31 14:05:00'),(222,1,1,NULL,'2017-02-08 09:22:30'),(223,1,1,NULL,'2017-02-08 10:32:39'),(224,1,5,'Disciplina B1,BBB,1','2017-02-08 10:32:58'),(225,1,5,'Disciplina B,BBB,1','2017-02-08 10:33:06'),(226,1,14,'1,Cliente Pessoa Física da Silva,Cliente PF 2','2017-02-08 15:58:43'),(227,1,14,'1,Cliente PF,Cliente PF','2017-02-08 15:59:34'),(228,1,14,'1,Cliente Pessoa Física,Cliente PF','2017-02-08 16:00:21'),(229,1,14,'2,Emporius Empreendimentos,Empresa X','2017-02-08 16:00:34'),(230,1,15,'4,Teste 34','2017-02-08 17:06:04'),(231,1,1,NULL,'2017-02-08 22:25:38'),(232,1,15,'5,aaaa','2017-02-08 23:06:51'),(233,1,14,'5,aaaa22,aaaa','2017-02-08 23:07:54'),(234,1,14,'3,Paseo Shopping,Paseo','2017-02-08 23:08:18'),(235,1,14,'1,Cliente Pessoa Física,Cliente PF','2017-02-08 23:10:55'),(236,1,14,'2,Emporius Empreendimentos,Empresa X','2017-02-08 23:11:18'),(237,1,14,'5,aaaa22,aaaa','2017-02-08 23:42:41'),(238,1,14,'5,aaaa22,aaaa','2017-02-08 23:43:36'),(239,1,14,'5,aaaa22,aaaa','2017-02-08 23:44:23'),(240,1,14,'2,Emporius Empreendimentos,Empresa X','2017-02-08 23:45:42'),(241,1,14,'2,Emporius Empreendimentos,Empresa X','2017-02-08 23:45:55'),(242,1,14,'3,Paseo Shopping,Paseo','2017-02-08 23:46:06'),(243,1,14,'1,Cliente Pessoa Física,Cliente PF','2017-02-08 23:46:15'),(244,1,14,'4,Teste 34,Teste','2017-02-08 23:46:44'),(245,1,15,'6,Wowooo','2017-02-08 23:47:26'),(246,1,14,'6,Wowooo,wwowoo','2017-02-08 23:50:03'),(247,1,14,'5,aaaa22,aaaa','2017-02-09 00:06:06'),(248,1,14,'5,aaaa22,aaaa','2017-02-09 00:06:32'),(249,1,14,'1,Cliente Pessoa Física,Cliente PF','2017-02-09 00:06:49'),(250,1,14,'6,Wowooo,wwowoo','2017-02-09 00:07:38'),(251,1,8,'twww,tttt,1','2017-02-09 01:22:45'),(252,1,8,'gsdf,ferg,1','2017-02-09 01:22:53'),(253,1,8,'rrrtg,ggg,1','2017-02-09 01:22:59'),(254,1,9,'gsdf,ferg,1','2017-02-09 01:23:04'),(255,1,1,NULL,'2017-02-09 09:11:22'),(256,1,1,NULL,'2017-02-09 14:20:35'),(257,1,2,NULL,'2017-02-09 14:53:37'),(258,1,1,NULL,'2017-02-09 20:18:16'),(259,1,1,NULL,'2017-02-09 21:48:08'),(260,1,1,NULL,'2017-02-09 23:51:26'),(261,1,1,NULL,'2017-02-10 00:09:40'),(262,1,1,NULL,'2017-02-10 09:19:25'),(263,1,1,NULL,'2017-02-10 15:39:31'),(264,1,1,NULL,'2017-02-10 16:37:23'),(265,1,1,NULL,'2017-02-10 19:04:09'),(266,1,15,'7,Faraday Ilimitada','2017-02-10 19:41:40'),(267,1,14,'7,Faraday Ilimitada,Faraday','2017-02-10 19:43:01'),(268,1,1,NULL,'2017-02-11 15:50:05'),(269,1,1,NULL,'2017-02-14 04:22:14'),(270,1,1,NULL,'2017-02-14 04:30:16'),(271,1,1,NULL,'2017-02-14 09:46:55'),(272,1,1,NULL,'2017-02-14 15:04:54'),(273,1,1,NULL,'2017-02-14 15:05:34'),(274,1,1,NULL,'2017-02-14 15:05:50'),(275,1,1,NULL,'2017-02-14 15:06:42'),(276,1,1,NULL,'2017-02-14 15:08:03'),(277,1,1,NULL,'2017-02-14 15:10:14'),(278,1,1,NULL,'2017-02-14 15:11:24'),(279,1,1,NULL,'2017-02-14 15:11:47'),(280,1,1,NULL,'2017-02-14 15:13:53'),(281,1,1,NULL,'2017-02-14 15:27:56'),(282,1,1,NULL,'2017-02-14 15:28:19'),(283,1,1,NULL,'2017-02-14 15:28:31'),(284,1,1,NULL,'2017-02-14 15:29:43'),(285,1,1,NULL,'2017-02-14 15:30:08'),(286,1,1,NULL,'2017-02-14 15:30:27'),(287,1,1,NULL,'2017-02-14 15:31:08'),(288,1,1,NULL,'2017-02-14 15:31:43'),(289,1,1,NULL,'2017-02-15 01:24:50'),(290,1,1,NULL,'2017-02-15 01:33:28'),(291,1,1,NULL,'2017-02-15 01:34:20'),(292,1,1,NULL,'2017-02-15 01:34:37'),(293,1,1,NULL,'2017-02-15 01:35:04'),(294,1,1,NULL,'2017-02-15 01:59:52'),(295,1,1,NULL,'2017-02-15 02:10:59'),(296,1,1,NULL,'2017-02-15 02:59:19'),(297,1,1,NULL,'2017-02-15 03:01:05'),(298,1,1,NULL,'2017-02-15 03:04:27'),(299,1,1,NULL,'2017-02-15 03:04:48'),(300,1,1,NULL,'2017-02-15 03:13:55'),(301,1,1,NULL,'2017-02-15 03:15:49'),(302,1,1,NULL,'2017-02-15 03:16:38'),(303,1,1,NULL,'2017-02-15 03:25:05'),(304,1,1,NULL,'2017-02-15 03:27:18'),(305,1,1,NULL,'2017-02-15 03:28:35'),(306,1,1,NULL,'2017-02-15 06:56:33'),(307,1,1,NULL,'2017-02-15 07:01:54'),(308,1,1,NULL,'2017-02-15 07:06:34'),(309,1,1,NULL,'2017-02-15 07:17:25'),(310,1,1,NULL,'2017-02-15 09:26:12'),(311,1,1,NULL,'2017-02-15 09:38:29'),(312,1,1,NULL,'2017-02-15 09:38:46'),(313,1,1,NULL,'2017-02-15 09:43:27'),(314,1,1,NULL,'2017-02-15 09:43:37'),(315,1,1,NULL,'2017-02-15 09:44:49'),(316,1,1,NULL,'2017-02-15 09:45:33'),(317,1,1,NULL,'2017-02-15 09:45:36'),(318,1,1,NULL,'2017-02-15 09:45:41'),(319,1,1,NULL,'2017-02-15 09:50:28'),(320,1,1,NULL,'2017-02-15 09:50:30'),(321,1,1,NULL,'2017-02-15 09:51:18'),(322,1,1,NULL,'2017-02-15 09:51:33'),(323,1,1,NULL,'2017-02-15 09:52:12'),(324,1,1,NULL,'2017-02-15 09:52:26'),(325,1,1,NULL,'2017-02-15 10:13:09'),(326,1,1,NULL,'2017-02-15 10:22:42'),(327,1,1,NULL,'2017-02-15 10:29:14'),(328,1,1,NULL,'2017-02-15 10:32:56'),(329,1,1,NULL,'2017-02-15 10:44:31'),(330,1,1,NULL,'2017-02-15 10:47:34'),(331,1,1,NULL,'2017-02-15 10:53:05'),(332,1,1,NULL,'2017-02-15 10:55:07'),(333,1,1,NULL,'2017-02-15 11:28:34'),(334,1,1,NULL,'2017-02-15 12:30:02'),(335,1,1,NULL,'2017-02-15 12:31:18'),(336,1,1,NULL,'2017-02-15 14:16:17'),(337,1,4,'Teste 55,teste55@teste.com,teste55,1','2017-02-15 14:24:24'),(338,1,3,'Teste 55,teste55@teste.com,teste555,1','2017-02-15 14:30:10'),(339,1,1,NULL,'2017-02-15 15:34:58'),(340,1,1,NULL,'2017-02-15 16:05:40'),(341,1,1,NULL,'2017-02-15 16:15:17'),(342,1,1,NULL,'2017-02-15 16:17:41'),(343,1,1,NULL,'2017-02-15 16:19:36'),(344,1,1,NULL,'2017-02-16 05:10:07'),(345,1,1,NULL,'2017-02-16 05:21:47'),(346,1,1,NULL,'2017-02-16 05:27:17'),(347,1,1,NULL,'2017-02-16 05:31:08'),(348,1,1,NULL,'2017-02-16 09:11:47'),(349,1,8,'Sub B3,SBB3,1','2017-02-16 09:22:08'),(350,1,1,NULL,'2017-02-16 09:23:53'),(351,1,8,'Sub B4,SBB4,1','2017-02-16 09:41:35'),(352,1,1,NULL,'2017-02-16 09:43:13'),(353,1,8,'Sub B5,SBB5,0','2017-02-16 09:44:04'),(354,1,7,'Sub B3 T,SBB3,1','2017-02-16 09:44:55'),(355,1,7,'Sub B3-3,SBB3,1','2017-02-16 09:46:00'),(356,1,1,NULL,'2017-02-16 09:46:56'),(357,1,7,'Sub B2-2,SBB2,1','2017-02-16 10:59:26'),(358,1,7,'Sub B2-2,SBB2,1','2017-02-16 11:00:02'),(359,1,1,NULL,'2017-02-16 11:00:50'),(360,1,7,'Sub B2,SBB2,1','2017-02-16 11:01:10'),(361,1,7,'Sub B3,SBB3,1','2017-02-16 11:01:17'),(362,1,7,'Sub B5,SBB5,1','2017-02-16 11:03:52'),(363,1,8,'Sub B6,SBB6,1','2017-02-16 11:05:59'),(364,1,9,'Sub B5,SBB5,1','2017-02-16 11:07:25'),(365,1,1,NULL,'2017-02-16 11:07:54'),(366,1,9,'Sub B6,SBB6,1','2017-02-16 11:08:12'),(367,1,1,NULL,'2017-02-16 11:11:15'),(368,1,9,'Sub B4,SBB4,1','2017-02-16 11:11:45'),(369,1,1,NULL,'2017-02-16 11:12:10'),(370,1,9,'Sub B3,SBB3,1','2017-02-16 11:15:49'),(371,1,1,NULL,'2017-02-16 11:17:36'),(372,1,8,'Sub B3,SBB3,1','2017-02-16 11:18:03'),(373,1,9,'Sub B3,SBB3,1','2017-02-16 11:18:16'),(374,1,1,NULL,'2017-02-17 03:06:55'),(375,1,10,'2,1','2017-02-17 03:07:50'),(376,1,1,NULL,'2017-02-17 03:15:15'),(377,1,10,'4,1','2017-02-17 03:15:40'),(378,1,1,NULL,'2017-02-17 03:34:56'),(379,1,10,'7,1','2017-02-17 03:35:22'),(380,1,11,'7,1','2017-02-17 03:40:56'),(381,1,11,'7,1','2017-02-17 03:41:37'),(382,1,11,'7,1','2017-02-17 03:41:55'),(383,1,1,NULL,'2017-02-17 04:06:32'),(384,1,11,'6,1','2017-02-17 04:10:16'),(385,1,11,'2,1','2017-02-17 04:10:33'),(386,1,1,NULL,'2017-02-17 04:50:28'),(387,1,12,'2,1,1','2017-02-17 04:59:55'),(388,1,1,NULL,'2017-02-17 05:00:32'),(389,1,12,'1,1,1','2017-02-17 05:01:27'),(390,1,12,'4,1,1','2017-02-17 05:15:32'),(391,1,1,NULL,'2017-02-17 06:50:48'),(392,1,12,'7,1,2','2017-02-17 07:25:31'),(393,1,13,'6,1','2017-02-17 07:29:19'),(394,1,1,NULL,'2017-02-17 07:29:54'),(395,1,13,'2,1','2017-02-17 07:30:13'),(396,1,13,'7,1','2017-02-17 07:30:24'),(397,1,14,'4,Teste 355,Teste','2017-02-17 07:40:35'),(398,1,1,NULL,'2017-02-17 08:36:57'),(399,1,14,'1,Sérgio Moura,Cliente PF','2017-02-17 08:37:20'),(400,1,15,'8,Teste Pessoa Jurídica 1','2017-02-17 08:41:09'),(401,1,14,'8,Teste Pessoa Jurídica 1,TPJ 1','2017-02-17 08:41:41'),(402,1,14,'8,Teste Pessoa Jurídica 1,TPJ 1','2017-02-17 08:41:57'),(403,1,1,NULL,'2017-02-19 03:08:03'),(404,1,1,NULL,'2017-02-19 03:23:26'),(405,1,1,NULL,'2017-02-19 11:37:35'),(406,1,1,NULL,'2017-02-21 07:25:34'),(407,1,1,NULL,'2017-03-06 09:02:15'),(408,1,1,NULL,'2017-03-06 10:32:49'),(409,1,1,NULL,'2017-03-07 11:37:56'),(410,1,1,NULL,'2017-03-07 13:22:07'),(411,1,1,NULL,'2017-03-08 00:57:19'),(412,1,1,NULL,'2017-03-08 10:54:58'),(413,1,1,NULL,'2017-03-08 14:22:52'),(414,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-02-01,2017-02-28,1','2017-03-08 15:04:18'),(415,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-02-02,2017-02-28,1','2017-03-08 15:06:32'),(416,1,16,'1,ADP2,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,','2017-03-08 15:17:40'),(417,1,16,'1,ADP2,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,','2017-03-08 15:18:13'),(418,1,16,'1,ADP2,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 15:37:39'),(419,1,16,'1,ADP22,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 15:40:58'),(420,1,16,'1,ADP,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 15:41:48'),(421,1,16,'1,ADP1,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 15:44:51'),(422,1,16,'1,ADP1,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,','2017-03-08 16:16:26'),(423,1,16,'1,ADP1,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 16:16:32'),(424,1,16,'1,ADP,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 16:17:50'),(425,1,16,'1,ADP,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 16:18:41'),(426,1,16,'1,ADP,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,','2017-03-08 16:22:31'),(427,1,16,'1,ADP,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 16:23:11'),(428,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-01-02,2017-02-28,1','2017-03-08 16:25:26'),(429,1,1,NULL,'2017-03-08 23:58:25'),(430,1,1,NULL,'2017-03-09 08:16:35'),(431,1,17,'0,Teste de Projeto 1,tetet,3,4,2017-03-01,2017-04-30,1','2017-03-09 08:42:14'),(432,1,1,NULL,'2017-03-09 08:44:24'),(433,1,17,'0,AAATeste,AAAA1,1,1,2017-03-09,2017-03-31,1','2017-03-09 08:50:27'),(434,1,1,NULL,'2017-03-09 08:54:42'),(435,1,17,'0,BBBTeste,BBB1,2,4,2017-03-01,2017-03-31,1','2017-03-09 08:56:02'),(436,1,17,'0,CCC1,CCCC22,1,6,2017-03-01,2017-03-31,1','2017-03-09 08:57:17'),(437,1,16,'3,CNT,Centro,6,1,2017-03-01,2017-03-31,1','2017-03-09 08:58:07'),(438,1,1,NULL,'2017-03-09 09:30:30'),(439,1,17,'0,DDDTeste,DDD,8,2,2017-03-01,2017-03-29,1','2017-03-09 09:39:54'),(440,1,17,'0,Teste EEE,EEE,3,4,2017-03-01,2017-03-31,','2017-03-09 09:53:14'),(441,1,16,'10,EEE,Teste EEE,3,4,2017-03-01,2017-03-31,1','2017-03-09 09:53:35'),(442,1,17,'0,Teste FFF,FFF,4,4,2017-03-01,2017-03-31,1','2017-03-09 09:55:14'),(443,1,1,NULL,'2017-03-09 11:32:47'),(444,1,1,NULL,'2017-03-09 14:08:35'),(445,1,18,'0,1,Área 3,A3','2017-03-09 14:25:14'),(446,1,1,NULL,'2017-03-09 14:25:33'),(447,1,18,'0,1,Área 4,A4','2017-03-09 14:30:42'),(448,1,1,NULL,'2017-03-09 14:31:02'),(449,1,18,'0,1,Área 5,A5','2017-03-09 14:33:00'),(450,1,1,NULL,'2017-03-09 14:34:41'),(451,1,18,'0,1,Área 6,A6','2017-03-09 14:35:05'),(452,1,1,NULL,'2017-03-09 14:40:54'),(453,1,18,'0,1,Área 7,A7','2017-03-09 14:41:24'),(454,1,1,NULL,'2017-03-09 14:44:02'),(455,1,1,NULL,'2017-03-09 14:45:30'),(456,1,18,'0,1,Área 8,A8','2017-03-09 14:46:30'),(457,1,18,'0,1,Área 9,A9','2017-03-09 14:49:48'),(458,1,18,'0,1,Área 10,A10','2017-03-09 14:51:05'),(459,1,18,'0,1,Área 11,A 11','2017-03-09 15:00:07'),(460,1,1,NULL,'2017-03-09 16:09:27'),(461,1,1,NULL,'2017-03-09 16:09:29'),(462,1,1,NULL,'2017-03-09 16:09:30'),(463,1,1,NULL,'2017-03-09 16:09:31'),(464,1,1,NULL,'2017-03-09 16:09:32'),(465,1,1,NULL,'2017-03-09 16:09:32'),(466,1,1,NULL,'2017-03-09 16:09:33'),(467,1,1,NULL,'2017-03-09 16:09:34'),(468,1,1,NULL,'2017-03-09 16:09:44'),(469,1,1,NULL,'2017-03-09 16:09:46'),(470,1,1,NULL,'2017-03-09 16:13:53'),(472,1,19,'8,A6,Área 6,1','2017-03-09 16:27:34'),(473,1,19,'8,A6,Área 6,1','2017-03-09 16:34:24'),(474,1,19,'8,A6,Área 6,1','2017-03-09 16:37:37'),(475,1,1,NULL,'2017-03-09 21:23:34'),(476,1,19,'8,A6,Área 6,1','2017-03-09 21:24:23'),(477,1,19,'8,A61,Área 61,1','2017-03-09 21:26:35'),(478,1,1,NULL,'2017-03-10 02:44:03'),(479,1,20,'13,Área 11,A 11,1','2017-03-10 03:08:16'),(480,1,20,'6,Área 4,A4,1','2017-03-10 04:00:16'),(481,1,20,'7,Área 5,A5,1','2017-03-10 04:00:20'),(482,1,20,'5,Área 3,A3,1','2017-03-10 04:00:23'),(483,1,20,'8,Área 61,A61,1','2017-03-10 04:00:26'),(484,1,20,'10,Área 8,A8,1','2017-03-10 04:00:28'),(485,1,20,'12,Área 10,A10,1','2017-03-10 04:00:31'),(486,1,20,'9,Área 7,A7,1','2017-03-10 04:00:34'),(487,1,20,'11,Área 9,A9,1','2017-03-10 04:00:38'),(488,1,1,NULL,'2017-03-10 07:20:36'),(489,1,1,NULL,'2017-03-10 14:30:19'),(490,1,1,NULL,'2017-03-10 19:33:36'),(491,1,1,NULL,'2017-03-11 01:52:28'),(492,1,1,NULL,'2017-03-11 03:41:15'),(493,1,21,'Teste 3,Manual.PDF,1','2017-03-11 03:45:03'),(494,1,21,'Teste 2,Comprovante-Condomínio2.pdf,2','2017-03-11 03:45:03'),(495,1,21,'Teste1,Comprovante-Condomínio1.pdf,3','2017-03-11 03:45:03'),(496,1,1,NULL,'2017-03-11 05:19:40'),(497,1,1,NULL,'2017-03-11 05:31:24'),(498,1,1,NULL,'2017-03-11 08:01:05'),(499,1,21,'Teste 7,Boleto Condomínio 1.jpg,image/jpeg,603923,0','2017-03-11 08:35:15'),(500,1,1,NULL,'2017-03-11 10:48:30'),(501,1,21,'Teste 7,Boleto Condomínio 1.jpg,image/jpeg,603923,0','2017-03-11 10:49:16'),(502,1,1,NULL,'2017-03-11 22:04:45'),(503,1,21,'ewwwew,Comprovante-Condomínio2.pdf,application/pdf,33436,20','2017-03-11 22:18:52'),(504,1,21,'sdfssef,Comprovante-Condomínio1.pdf,application/pdf,33765,21','2017-03-11 22:18:52'),(505,1,21,'sdfsd,aarteweb.pdf,application/pdf,0,22','2017-03-11 22:18:52'),(506,1,1,NULL,'2017-03-12 01:28:32'),(507,1,21,'Teste 9,Esboço.png,image/png,639979,23','2017-03-12 01:38:08'),(508,1,21,'Teste 8,ContaTaiana.png,image/png,266416,24','2017-03-12 01:38:08'),(509,1,21,'teste 10,transferência-valtemir.png,image/png,123109,26','2017-03-12 01:40:59'),(510,1,21,'Teste 12,ContaTaiana.png,image/png,266416,28','2017-03-12 01:57:30'),(511,1,21,'Teste 11,Comprovante-Condomínio2.pdf,application/pdf,33436,29','2017-03-12 01:57:30'),(512,1,21,'teste 13,ResultadosMariana.pdf,application/pdf,1296362,31','2017-03-12 02:07:26'),(513,1,21,'Teste 14,NF_LePostiche.pdf,application/pdf,223741,33','2017-03-12 02:44:22'),(514,1,21,'wtwetwhdfdgdwer4etter,VIVOSERGIO022017.pdf,application/pdf,234474,35','2017-03-12 02:47:06'),(515,1,21,'teeerrrrrrrrrr,IMG_13022017_120046.png,image/png,246033,36','2017-03-12 02:48:27'),(516,1,21,'teste 111,Comprovante-Condomínio2.pdf,application/pdf,33436,37','2017-03-12 02:50:25'),(517,1,21,'teste 22,Comprovante-Condomínio2.pdf,application/pdf,33436,39','2017-03-12 02:52:30'),(518,1,21,'teste 16,Comprovante-Condomínio1.pdf,application/pdf,33765,40','2017-03-12 02:52:31'),(519,1,21,'teste 1,Cadastro EspaçoBabyAcademia.txt,text/plain,107,41','2017-03-12 02:52:31'),(520,1,21,'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr,Manual.PDF,application/pdf,0,42','2017-03-12 02:58:47'),(521,1,21,'rrrrrrrrrrrrrrrrrrrrrr,Comprovante-Condomínio2.pdf,application/pdf,33436,43','2017-03-12 02:58:47'),(522,1,21,'rrrrrrrrr,Comprovante-Condomínio1.pdf,application/pdf,33765,44','2017-03-12 02:58:47'),(523,1,21,'333423,Esboço.png,image/png,639979,45','2017-03-12 03:01:05'),(524,1,21,'555555555555555555555555,ContaTaiana.png,image/png,266416,46','2017-03-12 03:01:05'),(525,1,21,'werwe222225,Comprovante-Condomínio2.pdf,application/pdf,33436,47','2017-03-12 03:16:18'),(526,1,21,'2aaaaa,Comprovante-Condomínio1.pdf,application/pdf,33765,48','2017-03-12 03:16:18'),(527,1,21,'42345fvvf,Cadastro EspaçoBabyAcademia.txt,text/plain,107,49','2017-03-12 03:16:18'),(528,1,1,NULL,'2017-03-12 04:06:01'),(529,1,21,'t3,NF_LePostiche.pdf,application/pdf,223741,50','2017-03-12 04:06:57'),(530,1,21,'t2,Manual.PDF,application/pdf,0,51','2017-03-12 04:06:58'),(531,1,21,'t1,Comprovante-Condomínio1.pdf,application/pdf,33765,52','2017-03-12 04:06:58'),(532,1,1,NULL,'2017-03-13 14:35:43'),(533,1,22,'22,sdfsd,158c4a1fcd69b1','2017-03-13 15:07:56'),(534,1,22,'42,rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr,158c4e3972fd53','2017-03-13 15:08:02'),(535,1,22,'51,t2,158c4f391ed76f','2017-03-13 15:08:05'),(536,1,22,'52,t1,158c4f3920a81f','2017-03-13 15:08:20'),(537,1,22,'3,Teste1,158c39cefe61ed','2017-03-13 15:08:30'),(538,1,22,'5,Teste 5,158c3d948bee8f','2017-03-13 15:08:33'),(539,1,22,'6,teste 6,158c3e04d75a41','2017-03-13 15:08:37'),(540,1,22,'20,ewwwew,158c4a1fc08ca1','2017-03-13 15:08:43'),(541,1,22,'23,Teste 9,158c4d0b08aa90','2017-03-13 15:08:46'),(542,1,22,'24,Teste 8,158c4d0b0c7940','2017-03-13 15:08:49'),(543,1,22,'28,Teste 12,158c4d53a323b8','2017-03-13 15:08:51'),(544,1,22,'31,teste 13,158c4d78ea21f9','2017-03-13 15:08:53'),(545,1,22,'33,Teste 14,158c4e0362dbe5','2017-03-13 15:08:55'),(546,1,22,'26,teste 10,158c4d15aebda4','2017-03-13 15:08:57'),(547,1,22,'37,teste 111,158c4e1a1bc109','2017-03-13 15:09:07'),(548,1,22,'39,teste 22,158c4e21ebb63a','2017-03-13 15:09:09'),(549,1,22,'35,wtwetwhdfdgdwer4etter,158c4e0da480f6','2017-03-13 15:09:11'),(550,1,22,'36,teeerrrrrrrrrr,158c4e12b16da4','2017-03-13 15:09:15'),(551,1,22,'7,Teste 7,158c3e0a7e7d0c','2017-03-13 15:09:23'),(552,1,22,'21,sdfssef,158c4a1fc50e61','2017-03-13 15:09:26'),(553,1,22,'40,teste 16,158c4e21ef1584','2017-03-13 15:09:29'),(554,1,22,'41,teste 1,158c4e21f080a1','2017-03-13 15:09:32'),(555,1,22,'43,rrrrrrrrrrrrrrrrrrrrrr,158c4e3974ca90','2017-03-13 15:09:35'),(556,1,22,'44,rrrrrrrrr,158c4e39777cb3','2017-03-13 15:09:39'),(557,1,22,'45,333423,158c4e42165ff9','2017-03-13 15:09:43'),(558,1,22,'46,555555555555555555555555,158c4e4218f9da','2017-03-13 15:09:54'),(559,1,22,'49,42345fvvf,158c4e7b29b45b','2017-03-13 15:10:03'),(560,1,22,'47,werwe222225,158c4e7b24fbe9','2017-03-13 15:10:10'),(561,1,22,'48,2aaaaa,158c4e7b2906ec','2017-03-13 15:10:16'),(562,1,22,'4,Teste 4,158c3d917d0c90','2017-03-13 15:10:29'),(563,1,22,'50,t3,158c4f391699aa','2017-03-13 15:10:32'),(564,1,21,'Sérgio Moura,SergioMoura.jpg,image/jpeg,22536,53','2017-03-13 15:11:12'),(565,1,22,'53,Sérgio Moura,158c6e0c0411e0','2017-03-13 15:11:24'),(566,1,1,NULL,'2017-03-14 00:58:51'),(567,1,21,'Teste 4,11 (1).jpg,image/jpeg,61735,54','2017-03-14 01:43:27'),(568,1,21,'Teste 3,8_dodecaedro_e_icosaedro.jpg,image/jpeg,79980,55','2017-03-14 01:43:27'),(569,1,21,'teste 5,4directions-SZ-128x128.ico,image/x-icon,99678,57','2017-03-14 02:00:43'),(570,1,21,'teste 1,___orange_sky____by_lionyigit.jpg,image/jpeg,796129,59','2017-03-14 02:00:43'),(571,1,21,'Teste 7,4directions-SZ-128x128.ico,image/x-icon,99678,60','2017-03-14 02:13:56'),(572,1,21,'Teste,02_falando_ingles.jpg,image/jpeg,126657,61','2017-03-14 02:13:56'),(573,1,21,'Teste X,___orange_sky____by_lionyigit.jpg,image/jpeg,796129,65','2017-03-14 02:14:10'),(574,1,21,'asfasdasasd,arrow2.png,image/png,245,66','2017-03-14 02:17:49'),(575,1,21,'Teste XX,addressbook.png,image/png,2004,68','2017-03-14 02:17:49'),(576,1,21,'Teste 9879,aids.jpg,image/jpeg,30966,70','2017-03-14 02:18:23'),(577,1,1,NULL,'2017-04-01 10:00:04'),(578,1,1,NULL,'2017-04-02 09:09:20'),(579,1,1,NULL,'2017-04-04 03:38:12'),(580,1,1,NULL,'2017-04-04 04:24:37'),(581,1,2,NULL,'2017-04-04 17:07:21'),(582,1,1,NULL,'2017-04-05 00:31:48'),(583,1,1,NULL,'2017-04-05 00:33:05'),(584,1,1,NULL,'2017-04-05 00:49:02'),(585,1,1,NULL,'2017-04-05 23:45:32'),(586,1,1,NULL,'2017-04-06 03:38:17'),(587,1,1,NULL,'2017-04-06 04:09:42'),(588,1,1,NULL,'2017-04-06 05:44:47'),(589,1,1,NULL,'2017-04-06 07:33:09'),(590,1,1,NULL,'2017-04-06 07:34:04'),(591,1,1,NULL,'2017-04-06 07:35:16'),(592,1,1,NULL,'2017-04-06 08:47:11'),(593,1,18,'0,1,Área 3,A3','2017-04-06 12:38:30'),(594,1,20,'5,Área 3,A3,1','2017-04-06 12:38:45'),(595,1,19,'2,A2,Area 21,1','2017-04-06 12:38:55'),(596,1,22,'29,Teste 11,158c4d53a6e78e','2017-04-06 13:20:55'),(597,1,22,'54,Teste 4,158c774efa9202','2017-04-06 13:25:16'),(598,1,22,'2,Teste 2,158c39cefcb075','2017-04-06 14:41:41'),(599,1,21,'asdddd,Comprovante-Condomínio2.pdf,application/pdf,33436,71','2017-04-06 16:19:09'),(600,1,21,'asdasd,Comprovante-Condomínio1.pdf,application/pdf,33765,72','2017-04-06 16:19:09'),(601,1,21,'sdasd,Cadastro EspaçoBabyAcademia.txt,text/plain,107,73','2017-04-06 16:19:09'),(602,1,21,'f,Comprovante-Condomínio2.pdf,application/pdf,33436,74','2017-04-06 16:27:54'),(603,1,21,'dddd,Comprovante-Condomínio1.pdf,application/pdf,33765,75','2017-04-06 16:27:55'),(604,1,21,'asd,Boleto Condomínio 2.jpg,image/jpeg,594469,76','2017-04-06 16:27:55'),(605,1,21,'ultraaa,Cadastro EspaçoBabyAcademia.txt,text/plain,107,80','2017-04-06 16:46:15'),(606,1,21,'questa,VIVOSERGIO022017.pdf,application/pdf,234474,81','2017-04-06 16:58:45'),(607,1,21,'transf,Transferir para Sérgio.xlsx,application/octet-stream,9425,82','2017-04-06 17:00:39'),(608,1,21,'ccopiacprvante,Comprovante-Condomínio1.pdf,application/pdf,33765,83','2017-04-06 17:00:40'),(609,1,21,'ataulfo,NF_LePostiche.pdf,application/pdf,223741,84','2017-04-06 17:02:09'),(610,1,21,'godofredo,IMG_13022017_120046.png,image/png,246033,85','2017-04-06 17:02:09'),(611,1,21,'mes4Aquarela,NFSE-AQUARELA-04-2017.pdf,application/pdf,372585,86','2017-04-06 17:07:21'),(612,1,21,'mes3Aquarela,NFSE-AQUARELA-03-2017.pdf,application/pdf,77227,87','2017-04-06 17:07:21'),(613,1,21,'edbrinq2,NFSE-EDUCARBRINCANDO-02-2017.pdf,application/pdf,83325,88','2017-04-06 17:10:25'),(614,1,21,'cesma4,NFSE-CESMA-04-2017.pdf,application/pdf,370832,89','2017-04-06 17:10:25'),(615,1,1,NULL,'2017-04-06 18:42:12'),(616,1,21,'piaget2,NFSE-PIAGET-02-2017.pdf,application/pdf,83880,91','2017-04-06 18:43:44'),(617,1,21,'Teste 5 +,NFSE-PIAGET-03-2017.pdf,application/pdf,77065,92','2017-04-06 18:44:00'),(618,1,22,'65,Teste X,158c77c2298d25','2017-04-06 18:49:21'),(619,1,22,'61,Teste,158c77c14e1e1d','2017-04-06 18:49:31'),(620,1,22,'59,teste 1,158c778fb9a685','2017-04-06 18:49:34'),(621,1,22,'71,asdddd,158e694ad07465','2017-04-06 18:49:40'),(622,1,22,'92,Teste 5 +,158e6b6a03c438','2017-04-06 18:49:44'),(623,1,22,'91,piaget2,158e6b68fc91b5','2017-04-06 18:49:46'),(624,1,22,'89,cesma4,158e6a0b1bb5a5','2017-04-06 18:49:49'),(625,1,22,'88,edbrinq2,158e6a0b198045','2017-04-06 18:49:51'),(626,1,22,'87,mes3Aquarela,158e69ff9445c5','2017-04-06 18:49:56'),(627,1,1,NULL,'2017-04-06 21:12:19'),(628,1,1,NULL,'2017-04-06 23:56:35'),(629,1,18,'0,1,Área 4,A4','2017-04-07 00:28:05'),(630,1,1,NULL,'2017-04-07 03:36:05'),(631,1,1,NULL,'2017-04-08 01:25:22'),(632,1,18,'0,1,Área 5,A5','2017-04-08 03:15:16'),(633,1,1,NULL,'2017-04-08 06:06:29'),(634,1,23,'2,Documento 2,18,1,1','2017-04-08 06:13:49'),(635,1,23,'1,Documento 11,15,7,1','2017-04-08 06:28:42'),(636,1,23,'1,Documento 1,12,6,1','2017-04-08 06:29:45'),(637,1,23,'1,Documento 11,15,7,1','2017-04-08 06:30:47'),(638,1,23,'1,Documento 1,14,6,1','2017-04-08 06:33:06'),(639,1,1,NULL,'2017-04-08 06:48:25'),(640,1,1,NULL,'2017-04-08 15:57:58'),(641,1,1,NULL,'2017-04-08 16:31:46'),(642,1,23,'1,Documento 1,14,1,1','2017-04-08 16:32:26'),(643,1,23,'2,Documento 2,18,1,1','2017-04-08 16:35:02'),(644,1,23,'2,Documento 2,18,1,1','2017-04-08 16:36:15'),(645,1,23,'2,Documento 2,15,7,1','2017-04-08 16:40:02'),(646,1,23,'3,Documento 3,15,2,1','2017-04-08 16:42:43'),(647,1,23,'1,Documento 1,15,2,1','2017-04-08 16:42:53'),(648,1,23,'1,Documento 1,15,6,1','2017-04-08 16:43:15'),(649,1,23,'2,Documento 233,14,2,1','2017-04-08 16:50:34'),(650,1,1,NULL,'2017-04-08 23:23:14'),(651,1,1,NULL,'2017-04-09 02:43:45'),(652,1,23,'1,Documento 12,15,7,1','2017-04-09 03:02:33'),(653,1,23,'1,Documento 1,14,7,1','2017-04-09 03:03:16'),(654,1,23,'2,Documento 233,18,1,1','2017-04-09 03:56:09'),(655,1,23,'1,Documento 11,16,1,1','2017-04-09 04:03:57'),(656,1,23,'1,Documento 1,15,6,1','2017-04-09 04:04:13'),(657,1,24,'0,Doc Teste 5,14,1,1','2017-04-09 04:38:38'),(658,1,24,'0,Doc Teste 6,16,7,1','2017-04-09 04:41:05'),(659,1,24,'0,Doc Teste 7,14,6,1','2017-04-09 04:41:30'),(660,1,20,'6,Área 4,A4,1','2017-04-09 05:21:46'),(662,1,25,'4,Documento 44,1,14','2017-04-09 05:35:43'),(663,1,25,'5,Doc Teste 5,1,14','2017-04-09 05:35:48'),(664,1,25,'1,Documento 1,6,15','2017-04-09 05:35:50'),(665,1,24,'0,teste 4,1,2,1','2017-04-09 05:36:04'),(666,1,25,'8,teste 4,2,1','2017-04-09 05:36:11'),(667,1,22,'81,questa,158e69df554c37','2017-04-09 05:38:09'),(668,1,25,'2,Documento 233,1,18','2017-04-09 05:44:34'),(669,1,24,'0,tetetete,2,2,1','2017-04-09 05:44:43'),(670,1,1,NULL,'2017-04-15 18:43:18'),(671,1,1,NULL,'2017-04-15 21:12:39'),(672,1,24,'0,Mais um outro,14,1,1','2017-04-16 01:28:44'),(673,1,24,'0,Credo,18,2,1','2017-04-16 03:39:44'),(674,1,23,'10,Outro documento,2,2,1','2017-04-16 04:16:53'),(675,1,23,'10,Outro documento,2,2,1','2017-04-16 04:17:15'),(676,1,1,NULL,'2017-04-16 04:30:46'),(677,1,23,'10,Outro documento,2,2,1','2017-04-16 04:35:22'),(678,1,23,'10,Outro documento,2,2,1','2017-04-16 04:36:07'),(679,1,23,'10,Outro documento,2,2,1','2017-04-16 04:39:46'),(680,1,23,'10,Outro documento,2,2,1','2017-04-16 05:17:10'),(681,1,23,'10,Outro documento,2,2,1','2017-04-16 05:18:49'),(682,1,23,'11,Mais um outro,14,1,1','2017-04-16 05:19:25'),(683,1,23,'12,Credo,18,2,1','2017-04-16 05:23:16'),(684,1,23,'12,Credo,18,2,1','2017-04-16 05:24:46'),(685,1,23,'12,Credo,18,2,1','2017-04-16 05:27:26'),(686,1,23,'12,Credo,18,2,1','2017-04-16 05:28:11'),(687,1,23,'10,Outro documento,2,2,1','2017-04-16 06:18:58'),(688,1,24,'0,DocExame,15,2,1','2017-04-16 06:26:18'),(689,1,24,'0,Candomblé,18,1,1','2017-04-16 06:26:37'),(690,1,24,'0,Banda Flor,14,1,1','2017-04-16 06:27:00'),(691,1,23,'11,Mais um outro,14,1,1','2017-04-16 06:28:29'),(692,1,23,'14,DocExame,15,2,1','2017-04-16 06:29:04'),(693,1,23,'15,Candomblé,18,1,1','2017-04-16 06:29:19'),(694,1,23,'11,Mais um outro,14,1,1','2017-04-16 06:30:47'),(695,1,23,'11,Mais um outro,14,1,1','2017-04-16 06:31:41'),(696,1,23,'15,Candomblé,18,1,1','2017-04-16 06:32:09'),(697,1,23,'13,DocExame22,15,2,1','2017-04-16 11:23:45'),(698,1,23,'15,Candomblé,18,1,1','2017-04-16 12:21:27'),(699,1,23,'13,DocExame22,15,2,1','2017-04-16 12:21:54'),(700,1,23,'15,Candomblé,18,1,1','2017-04-16 12:22:47'),(701,1,1,NULL,'2017-04-18 19:18:02'),(702,1,1,NULL,'2017-04-18 19:45:06'),(703,1,1,NULL,'2017-04-18 21:34:19'),(704,1,1,NULL,'2017-04-18 23:45:26'),(705,1,1,NULL,'2017-04-18 23:52:07'),(706,1,1,NULL,'2017-04-19 00:05:26'),(707,1,1,NULL,'2017-04-19 00:53:35'),(708,1,1,NULL,'2017-04-19 01:11:27'),(709,1,23,'9,tetetete,2,2,1,2017-04-20','2017-04-19 01:17:46'),(710,1,23,'9,tetetete,2,2,1,2017-04-20','2017-04-19 01:18:13'),(711,1,23,'9,tetetete,2,2,1,2017-06-15','2017-04-19 01:20:14'),(712,1,23,'9,tetetete,2,2,1,2017-06-15','2017-04-19 01:21:46'),(713,1,23,'9,tetetete,2,2,1,2017-04-26','2017-04-19 01:22:06'),(714,1,1,NULL,'2017-04-19 02:25:36'),(715,1,1,NULL,'2017-04-19 05:24:39'),(716,1,23,'10,Outro documento,2,2,1,2017-04-18','2017-04-19 05:25:02'),(717,1,23,'10,Outro documento,2,2,1,2017-04-18','2017-04-19 05:32:37'),(718,1,1,NULL,'2017-04-19 07:24:04'),(719,1,23,'10,Outro documento,2,2,1,2017-04-18','2017-04-19 07:28:23'),(720,1,23,'11,Mais um outro,14,1,1,2017-04-26','2017-04-19 07:28:42'),(721,1,24,'0,TTT,1,2,1,2017-04-30T03:00:00.000Z','2017-04-19 07:31:11'),(722,1,24,'0,Gueba Gueba,14,1,1,2017-04-24','2017-04-19 07:34:17'),(723,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-01-11,2017-02-28,1','2017-04-19 08:00:22'),(724,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-01-11,2017-02-28,1','2017-04-19 08:01:41'),(725,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-01-11,2017-03-04,1','2017-04-19 08:01:51'),(726,1,23,'13,DocExame22,15,2,1,2017-04-11','2017-04-19 08:12:50'),(727,1,1,NULL,'2017-04-19 08:22:36'),(728,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-02-09,2017-04-28,1','2017-04-19 08:24:00'),(729,1,1,NULL,'2017-04-19 08:27:05'),(730,1,1,NULL,'2017-04-19 08:33:57'),(731,1,23,'16,Banda Flor,14,1,1,2017-04-19','2017-04-19 09:35:00'),(732,1,23,'17,TTT,1,2,1,2017-04-18','2017-04-19 09:37:33'),(733,1,1,NULL,'2017-04-19 14:08:08'),(734,1,1,NULL,'2017-04-19 21:35:27'),(735,1,23,'15,Candomblé,18,1,1,2017-04-28','2017-04-19 21:36:00'),(736,1,23,'14,DocExame,15,2,1,2017-04-29','2017-04-19 21:36:07'),(737,1,23,'12,Credo,18,2,1,2017-04-30','2017-04-19 21:36:16'),(738,1,1,NULL,'2017-04-19 21:53:03'),(739,1,1,NULL,'2017-04-20 03:19:47'),(740,1,1,NULL,'2017-04-20 15:31:56'),(741,1,1,NULL,'2017-04-20 15:33:08'),(742,1,1,NULL,'2017-04-20 15:35:52'),(743,1,1,NULL,'2017-04-20 17:36:51'),(744,1,1,NULL,'2017-04-20 17:38:43'),(745,1,1,NULL,'2017-04-20 22:32:13'),(746,1,1,NULL,'2017-04-21 14:53:57'),(747,1,1,NULL,'2017-04-22 00:48:56'),(748,1,1,NULL,'2017-04-22 22:40:33'),(749,1,1,NULL,'2017-04-23 02:10:05'),(750,1,1,NULL,'2017-04-23 02:11:54'),(751,1,1,NULL,'2017-04-23 04:54:14'),(752,1,1,NULL,'2017-04-23 05:21:37'),(753,1,1,NULL,'2017-04-23 07:31:27'),(754,1,1,NULL,'2017-04-23 13:21:43'),(755,1,1,NULL,'2017-04-23 14:19:52'),(756,1,1,NULL,'2017-04-23 15:25:54'),(757,1,1,NULL,'2017-04-24 01:04:24'),(758,1,26,'6','2017-04-24 04:20:42'),(759,1,26,'6','2017-04-24 04:23:07'),(760,1,26,'6','2017-04-24 04:25:58'),(761,1,26,'6','2017-04-24 04:27:21'),(762,1,26,'6','2017-04-24 04:55:34'),(763,1,26,'6','2017-04-24 04:56:00'),(764,1,1,NULL,'2017-04-24 09:11:46'),(765,1,23,'9,Documento de SUB B2,2,2,1,2017-04-26','2017-04-24 09:55:05'),(766,1,1,NULL,'2017-04-25 04:11:02'),(767,1,1,NULL,'2017-04-25 06:13:10'),(768,1,27,'50,9','2017-04-25 06:15:45'),(769,1,27,'80,13','2017-04-25 06:20:11'),(770,1,4,'Anthony,tony@avangers.com,tony,1','2017-04-25 07:05:12'),(771,1,4,'Paulo César,pcesar@faraday.com.br,pcesar,1','2017-04-25 07:06:01'),(772,1,10,'8,1','2017-04-25 07:06:21'),(773,1,10,'9,1','2017-04-25 07:06:33'),(774,1,1,NULL,'2017-04-25 14:55:49'),(775,1,1,NULL,'2017-04-25 15:12:47'),(776,1,1,NULL,'2017-04-25 16:41:41'),(777,1,1,NULL,'2017-04-26 03:37:12'),(778,1,1,NULL,'2017-04-26 08:39:08'),(779,1,1,NULL,'2017-04-26 11:09:54'),(780,1,28,'10','2017-04-26 11:13:22'),(781,1,1,NULL,'2017-04-26 14:04:55'),(783,1,28,'10','2017-04-26 14:09:04'),(784,1,29,'9','2017-04-26 14:10:02'),(785,1,28,'9','2017-04-26 14:11:22'),(786,1,28,'17','2017-04-26 14:19:24'),(787,1,28,'9','2017-04-26 14:29:09'),(788,1,28,'10','2017-04-26 14:32:12'),(789,1,28,'10','2017-04-26 14:33:30'),(790,1,28,'17','2017-04-26 14:34:44'),(791,1,28,'10','2017-04-26 14:35:11'),(792,1,1,NULL,'2017-04-26 15:00:43'),(793,1,28,'10','2017-04-26 15:19:16'),(794,1,28,'10','2017-04-26 15:28:43'),(795,1,28,'10','2017-04-27 11:11:37'),(796,1,27,'60,9','2017-04-27 11:12:24'),(797,1,26,'5','2017-04-27 11:52:28'),(798,1,28,'10','2017-04-27 12:00:22'),(799,1,26,'2','2017-04-27 12:00:23'),(800,1,1,NULL,'2017-04-28 02:27:28'),(801,1,1,NULL,'2017-04-28 11:28:29'),(802,1,1,NULL,'2017-04-29 13:29:23'),(803,1,1,NULL,'2017-04-29 17:43:08'),(804,1,26,'2','2017-04-29 17:48:41'),(805,1,26,'2','2017-04-29 17:48:51'),(806,1,28,'10','2017-04-29 17:48:51'),(807,1,24,'0,Documento,12,1,1,2017-04-30','2017-04-29 18:33:14'),(808,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-02-09,2017-04-28,1','2017-04-29 19:06:59'),(809,1,16,'1,ADP,Aratuba dos Palmares,2,8,2017-02-09,2017-04-28,1','2017-04-29 19:07:09'),(810,1,1,NULL,'2017-04-30 04:52:46'),(811,1,1,NULL,'2017-04-30 04:53:40'),(812,1,1,NULL,'2017-05-01 13:42:58'),(813,1,1,NULL,'2017-05-01 23:59:09'),(814,1,1,NULL,'2017-05-02 00:22:07'),(815,1,1,NULL,'2017-05-02 07:50:29'),(816,1,26,'2','2017-05-02 08:45:36'),(817,1,26,'2','2017-05-02 09:32:59'),(818,1,1,NULL,'2017-05-02 09:40:30'),(819,1,1,NULL,'2017-05-02 09:42:46'),(820,1,26,'7','2017-05-03 06:07:16'),(821,1,24,'0,Teste 3,2,6,1,2017-05-04','2017-05-03 09:46:29'),(822,1,8,'Tomadas Novas,TMDN,1','2017-05-03 10:03:38'),(823,1,10,'1,14','2017-05-03 10:03:50'),(824,1,12,'1,14,1','2017-05-03 10:04:02'),(825,1,16,'6,AAAA1,AAATeste,2,1,2017-03-09,2017-05-05,1','2017-05-03 10:05:16'),(826,1,18,'0,6,A,Área Única','2017-05-03 10:05:39'),(827,1,24,'0,Teste 1,19,8,6,2017-05-05','2017-05-03 10:06:03'),(828,1,30,'21,10,1,','2017-05-03 10:08:43'),(829,1,27,'10,20','2017-05-03 10:15:50'),(830,1,30,'20,11,1,','2017-05-03 10:16:23'),(831,1,27,'20,20','2017-05-03 10:18:47'),(832,1,30,'20,12,1,30,2017-05-03UTC13:19:43','2017-05-03 10:19:43'),(833,1,27,'10,21','2017-05-03 10:22:56'),(834,1,30,'21,13,1,25','2017-05-03 10:24:02'),(835,1,27,'60,10','2017-05-03 10:36:05'),(836,1,30,'10,14,70','2017-05-03 10:37:07'),(837,1,27,'25,21','2017-05-03 10:50:51'),(838,1,30,'21,15,35','2017-05-03 10:51:25'),(839,1,26,'13','2017-05-03 10:52:24'),(840,1,26,'7','2017-05-03 10:59:25'),(841,1,28,'20','2017-05-03 10:59:38'),(842,1,26,'12','2017-05-03 10:59:38'),(843,1,28,'20','2017-05-03 11:07:05'),(844,1,1,NULL,'2017-05-03 11:26:12'),(845,1,1,NULL,'2017-05-03 11:41:04'),(846,1,17,'0,Projeto A,PRJa,3,1,2017-05-10T03:00:00.000Z,2017-05-17T03:00:00.000Z,1','2017-05-03 11:47:17'),(847,1,18,'0,12,PA1,Area 1','2017-05-03 11:48:22'),(848,1,19,'9,12,PA1,Área 1','2017-05-03 11:48:38'),(849,1,18,'0,12,PA2,Área 2','2017-05-03 11:48:50'),(850,1,6,'Elétrica,ELE,1','2017-05-03 11:49:40'),(851,1,8,'Tomadas Novas,TMD1,1','2017-05-03 11:50:08'),(852,1,8,'Cabeamento,ELE2,1','2017-05-03 11:50:34'),(853,1,7,'Tomadas Novas,ELE1,1','2017-05-03 11:50:44'),(854,1,10,'1,16','2017-05-03 11:50:53'),(855,1,12,'1,16,1','2017-05-03 11:51:10'),(856,1,24,'0,Documento das Tomadas,20,9,12,2017-05-10','2017-05-03 11:52:18'),(857,1,24,'0,Documento dos Cabos,21,9,12,2017-05-10','2017-05-03 11:53:02'),(858,1,23,'22,Doc das Tomadas,20,9,12,2017-05-10','2017-05-03 11:53:31'),(859,1,23,'23,Documento dos Cabos,21,9,12,2017-05-10','2017-05-03 11:53:44'),(860,1,23,'23,Docu dos Cabos,21,9,12,2017-05-10','2017-05-03 11:53:54'),(861,1,30,'22,16,25','2017-05-03 11:55:16'),(862,1,26,'16','2017-05-03 11:55:49'),(863,1,27,'20,22','2017-05-03 11:56:05'),(864,1,1,NULL,'2017-05-03 13:21:32'),(865,1,30,'22,17,35','2017-05-03 13:24:42'),(866,1,27,'30,22','2017-05-03 13:30:32'),(867,1,30,'22,18,38','2017-05-03 13:40:02'),(868,1,27,'38,22','2017-05-03 14:49:15'),(869,1,30,'22,19,45','2017-05-03 14:51:39'),(870,1,27,'42,22','2017-05-03 14:52:33'),(871,1,30,'22,20,50','2017-05-03 14:56:58'),(872,1,27,'45,22','2017-05-03 15:03:19'),(873,1,30,'22,21,60','2017-05-03 15:04:25'),(874,1,27,'55,22','2017-05-03 15:05:00'),(875,1,30,'22,22,60','2017-05-03 15:07:19'),(876,1,27,'60,22','2017-05-03 15:08:18'),(877,1,30,'22,23,65','2017-05-03 15:25:40'),(878,1,27,'65,22','2017-05-03 15:26:33'),(879,1,30,'22,24,70','2017-05-03 15:26:55'),(880,1,27,'70,22','2017-05-03 15:27:46'),(881,1,30,'22,25,80','2017-05-03 15:28:06'),(882,1,27,'80,22','2017-05-03 15:44:52'),(883,1,30,'22,26,85','2017-05-03 15:45:24'),(884,1,27,'85,22','2017-05-03 15:48:56'),(885,1,30,'22,27,90','2017-05-03 15:49:33'),(886,1,27,'86,22','2017-05-03 16:08:21'),(887,1,30,'22,28,90','2017-05-03 16:09:01'),(888,1,27,'86,22','2017-05-03 16:14:41'),(889,1,30,'22,29,87','2017-05-03 16:15:07'),(890,1,27,'86,22','2017-05-03 16:16:44'),(891,1,30,'22,30,90','2017-05-03 16:17:02'),(892,1,27,'86,22','2017-05-03 16:46:39'),(893,1,30,'22,31,88','2017-05-03 16:46:58'),(894,1,27,'86,22','2017-05-03 16:51:07'),(895,1,30,'22,32,87','2017-05-03 16:51:41'),(896,1,27,'86,22','2017-05-03 17:03:07'),(897,1,30,'22,33,90','2017-05-03 17:03:27'),(898,1,27,'86,22','2017-05-03 17:04:27'),(899,1,30,'22,34,89','2017-05-03 17:04:40'),(900,1,27,'87,22','2017-05-03 17:05:36'),(901,1,30,'22,35,100','2017-05-03 17:06:07'),(902,1,27,'100,22','2017-05-03 17:06:17'),(903,1,28,'23','2017-05-03 17:06:45'),(904,1,1,NULL,'2017-05-04 01:12:09'),(905,1,1,NULL,'2017-05-04 10:26:08'),(906,1,28,'23','2017-05-04 10:27:08'),(907,1,1,NULL,'2017-05-05 10:56:29'),(908,1,1,NULL,'2017-05-05 14:09:48'),(909,1,1,NULL,'2017-05-05 23:59:38'),(910,1,28,'23','2017-05-06 01:17:18'),(911,1,1,NULL,'2017-05-08 09:13:05'),(912,1,1,NULL,'2017-05-08 10:35:51'),(913,1,1,NULL,'2017-05-08 14:39:05'),(914,1,1,NULL,'2017-05-09 12:06:17'),(915,1,1,NULL,'2017-05-09 16:06:30'),(916,1,1,NULL,'2017-05-09 17:19:28'),(917,1,17,'0,Projeto B,PRJB,3,1,2017-05-09T03:00:00.000Z,2017-06-30T03:00:00.000Z,1','2017-05-09 23:36:49'),(918,1,18,'0,13,Área 1 PRJB,AR1','2017-05-09 23:37:43'),(919,1,21,'CCH3,585305-1000-1454057020-expressive-dog-portraits-elke-vogelsang-14.jpg,image/jpeg,111609,1','2017-05-09 23:38:12'),(920,1,21,'CCH2,585205-1000-1454057020-expressive-dog-portraits-elke-vogelsang-1.jpg,image/jpeg,264079,2','2017-05-09 23:38:12'),(921,1,21,'CCH1,404111_498589010168836_1957634377_n.jpg,image/jpeg,55141,3','2017-05-09 23:38:13'),(922,1,24,'0,DOC1,20,11,13,2017-05-31','2017-05-09 23:38:42'),(923,1,30,'24,36,17','2017-05-10 00:15:17'),(924,1,1,NULL,'2017-05-10 06:03:03'),(925,1,1,NULL,'2017-05-10 07:31:26'),(926,1,2,NULL,'2017-05-10 07:37:13');
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
  `nome` varchar(45) NOT NULL,
  `codigo` varchar(20) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_responsavel` int(11) DEFAULT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  `data_inicio_p` date DEFAULT NULL,
  `data_final_p` date DEFAULT NULL,
  `ativo` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  KEY `FK_cliente_idx` (`id_empresa`),
  KEY `FK_projetos_x_clientes_idx` (`id_cliente`),
  KEY `FK_projetos_x_responsaveis_idx` (`id_responsavel`),
  CONSTRAINT `FK_projetos_x_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `gdoks_clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_projetos_x_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_projetos_x_responsaveis` FOREIGN KEY (`id_responsavel`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_projetos`
--

LOCK TABLES `gdoks_projetos` WRITE;
/*!40000 ALTER TABLE `gdoks_projetos` DISABLE KEYS */;
INSERT INTO `gdoks_projetos` VALUES (12,'Projeto A','PRJa',3,1,1,'2017-05-10','2017-05-17',''),(13,'Projeto B','PRJB',3,1,1,'2017-05-09','2017-06-30','');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_subdisciplinas`
--

LOCK TABLES `gdoks_subdisciplinas` WRITE;
/*!40000 ALTER TABLE `gdoks_subdisciplinas` DISABLE KEYS */;
INSERT INTO `gdoks_subdisciplinas` VALUES (20,'Tomadas Novas','ELE1','',16),(21,'Cabeamento','ELE2','',16);
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
  `id_empresa` int(11) DEFAULT NULL,
  `ativo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`,`id_empresa`),
  KEY `FK_clientes_x_usuarios_idx` (`id_empresa`),
  CONSTRAINT `FK_clientes_x_usuarios` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios`
--

LOCK TABLES `gdoks_usuarios` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios` VALUES (1,'sergio','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Sérgio Moura','smouracalmon@gmail.com','591359e8abffc0.03398910','2017-05-10 19:20:24',1,''),(2,'user2','*FB59F051EDC5779D26DDA273499B8B3E5901DFBE','Usuário 2','usuario2@gmail.com',NULL,NULL,1,''),(3,'tony','asda','Anthony Barbosa','tony@faraday.com.br',NULL,NULL,2,''),(4,'teste','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Raul Castro Validador','raulcastro@gdoks.com.br','586ef4744c7fc0.56527252','2017-01-06 00:35:48',1,''),(6,'teste3','teste','Teste 3','teste@teste.com',NULL,NULL,1,''),(7,'teste555','*91D6F94093CD93F1E8405462FE7DC8771C8AB6E1','Teste 55','teste55@teste.com',NULL,NULL,1,''),(8,'tony','tony','Anthony','tony@avangers.com',NULL,NULL,1,''),(9,'pcesar','pcesar','Paulo César','pcesar@faraday.com.br',NULL,NULL,1,'');
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
  CONSTRAINT `FK_usuarios_x_areas_area` FOREIGN KEY (`id_area`) REFERENCES `gdoks_areas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_usuarios_x_areas_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios_x_areas`
--

LOCK TABLES `gdoks_usuarios_x_areas` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios_x_areas` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  KEY `FK_validadores_x_usuarios_idx` (`id_usuario`),
  KEY `FK_validadores_x_disciplinas_idx` (`id_disciplina`),
  CONSTRAINT `FK_validadores_x_disciplinas` FOREIGN KEY (`id_disciplina`) REFERENCES `gdoks_disciplinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_validadores_x_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_validadores`
--

LOCK TABLES `gdoks_validadores` WRITE;
/*!40000 ALTER TABLE `gdoks_validadores` DISABLE KEYS */;
INSERT INTO `gdoks_validadores` VALUES (22,1,16,1);
/*!40000 ALTER TABLE `gdoks_validadores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-10 15:23:25
