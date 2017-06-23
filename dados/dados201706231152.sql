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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_acoes`
--

LOCK TABLES `gdoks_acoes` WRITE;
/*!40000 ALTER TABLE `gdoks_acoes` DISABLE KEYS */;
INSERT INTO `gdoks_acoes` VALUES (1,'Logar','Logou no sistema'),(2,'Alterar Dados Pessoais','Alterou dados pessoais'),(3,'Alterar Dados de Usuário','Alterou dados de usuário nome:$1, email:$2, login:$3, ativo:$4'),(4,'Criou usuário','Criou usuário nome:$1, email:$2, login:$3, ativo:$4'),(5,'Alterou Disciplina','Alterou disciplina nome:$1, sigla:$2, ativa:$3'),(6,'Criou Disciplina','Criou disciplina nome:$1, sigla:$2, ativa:$3'),(7,'Alterou Subdisciplina','Alterou subdisciplina nome:$1, sigla:$2, ativa:$3'),(8,'Criou Subdisciplina','Criou subdisciplina nome:$1, sigla:$2, ativa:$3'),(9,'Removeu Subdisciplina','Removeu subdisciplina nome:$1, sigla:$2, ativa:$3'),(10,'Associou Especialista','Associou especialista $1 a disciplina $2'),(11,'Desassociou Especialista','Desassociou especialista $1 da disciplina $2'),(12,'Associou Validador','Associou o validador $1 a disciplina $2 (Tipo $3)'),(13,'Desassociou Validador','Desassociou o validador $1 da disciplina $2'),(14,'Alterou Cliente','Alterou dados do cliente $1,nome:$2, nome_fantasia $3'),(15,'Adicionou Cliente','Adicionou cliente $1 (nome:$2)'),(16,'Alterou Projeto','Alterou o projeto $8: $1,$2,$3,$4,$5,$6,$7'),(17,'Adicionou Projeto','Adicionou o projeto $8: $1,$2,$3,$4,$5,$6,$7'),(18,'Adicionou Área','Adicionou área ao projeto $3: $1,$2'),(19,'Alterou Área','Alterou área do projeto $3: $1,$2'),(20,'Removeu Área','Removeu área do projeto $3: $1,$2'),(21,'Criou DAO','Criou DAO $3: $1 [$2]'),(22,'Removeu DAO','Removeu DAO $3: $1 [$2]'),(23,'Alterou Documento','Alterou o documento $1: [nome] => $2 [id_subdisciplina] => $3 [id_area] => $4)'),(24,'Adicionou Documento','Adicionou o documento $1: [nome] => $2, [id_subdisciplina] => $3 [id_area]=>$4 [id_projeto]] => $5'),(25,'Removeu Documento','Removeu documento $1:  [id] => 3 [nome] => $2 [id_area] => $3 [id_subdisciplina] => $4'),(26,'Baixou Arquivo','Baixou arquivo $1'),(27,'Validou Progresso','Validou Progresso de $1% para o documento $2'),(28,'Bloqueou Documento','Bloqueou o documento $1'),(29,'Desbloqueou Documento','Desbloqueou documento $1'),(30,'Atualizou Documento','Atualizou documento $1 com arquivo $2 ($3)'),(31,'Alterou Cargo','Alterou cargo $1 (nome:$2, hh:$3)'),(32,'Adicionou Cargo','Adicionou cargo $1 (nome:$2, hh:$3)'),(33,'Removeu Cargo','Removeu cargo $1'),(34,'Alterou Sub-área','Alterou sub-área $1,(nome:$2,codigo:$3, area:$4)'),(35,'Criou Sub-área','Criou sub-área $1,(nome:$2,codigo:$3, area:$4)'),(36,'Removeu Subárea','Removeu Sub-área $1,(nome:$2,codigo:$3, area:$4)'),(37,'Alterou Especialistas','Alterou especialistas da disciplina $1. Novos especialistas: $2'),(38,'Alterou Validadores','Alterou validadores da disciplina $1. Novos validadores: $2'),(39,'Atualizou Revisão','Atualizou revisão $1 com o pacote de arquivos $2'),(40,'Criou GRD','Criou GRD (id: $1, cod: $2, id_prj:$3)'),(41,'Anexou Documentos a GRD','Anexou documentos a GRD $1');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_areas`
--

LOCK TABLES `gdoks_areas` WRITE;
/*!40000 ALTER TABLE `gdoks_areas` DISABLE KEYS */;
INSERT INTO `gdoks_areas` VALUES (9,'Área 1','PA1',12),(10,'Área 2','PA2',12),(11,'Área 1 PRJB','AR1',13),(12,'Área 1 PD','PDA1',15),(13,'Área 2 PD','PDA2',15),(14,'Área Única','A1',20),(15,'Área Única','A1',21),(16,'Área 1','A1',22),(17,'Área 2','A2',22);
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
  `datahora_upload` datetime DEFAULT NULL,
  `idu` int(11) DEFAULT NULL,
  `tamanho` int(11) DEFAULT NULL,
  `tamanho_do_papel` int(11) DEFAULT NULL,
  `nPaginas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_idu_x_usuarios_idx` (`idu`),
  CONSTRAINT `FK_idu_x_usuarios` FOREIGN KEY (`idu`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_arquivos`
--

LOCK TABLES `gdoks_arquivos` WRITE;
/*!40000 ALTER TABLE `gdoks_arquivos` DISABLE KEYS */;
INSERT INTO `gdoks_arquivos` VALUES (1,'Caminho1','A.pdf','2017-05-23 10:17:02',1,10,NULL,NULL),(2,'1/12/159159544eed4a','B.pdf','2017-05-23 10:17:02',1,20,NULL,NULL),(3,'1/12/159159544eed43','C.pdf','2017-05-23 10:17:02',1,30,NULL,NULL),(4,'1/12/1591595451fc3a','D.pdf','2017-05-23 10:17:02',1,40,NULL,NULL),(5,'1/12/1591595451fc35','E.pdf','2017-05-10 10:17:02',1,50,NULL,NULL),(6,'Caminho6','F.pdf','2017-05-10 10:17:02',1,60,NULL,NULL),(7,'1/12/1591595451fc35','G.pdf','2017-05-11 23:00:10',1,70,NULL,NULL),(8,'Caminho8','H.pdf','2017-05-11 23:00:10',3,80,NULL,NULL),(9,'Caminho9','I.pdf','2017-05-23 10:00:00',3,90,NULL,NULL),(10,'Caminho10','J.pdf','2017-05-23 10:00:02',3,100,NULL,NULL),(17,'Caminho9','K.pdf','2017-05-28 12:05:10',1,120,NULL,NULL),(18,'Caminho13','L.pdf','2017-05-28 12:05:10',1,130,NULL,NULL),(19,'1/12/1593aac1e62820','A.pdf','2017-06-09 11:09:34',1,196580,5,1),(20,'1/12/1593aac1e68dbe','C.pdf','2017-06-09 11:09:34',1,1156232,5,1),(21,'1/12/1593aac1e70fd3','D.pdf','2017-06-09 11:09:34',1,777380,5,1),(22,'1/12/1593aac1e8938b','F.pdf','2017-06-09 11:09:34',1,64805,5,1),(23,'1/12/1593aac1eab7ee','H.pdf','2017-06-09 11:09:34',1,35818,5,1),(24,'1/20/1593ae84ee3632','A.pdf','2017-06-09 15:26:22',1,196580,5,4),(25,'1/20/1593aeb7a9f307','B.pdf','2017-06-09 15:39:54',1,409743,5,1),(26,'1/20/1593b691471a9f','C.pdf','2017-06-10 00:35:48',1,1156232,5,1),(27,'1/20/1593b691492284','D.pdf','2017-06-10 00:35:48',1,777380,5,1),(28,'1/20/1593d91d1b3223','F.pdf','2017-06-11 15:54:09',1,64805,5,1),(29,'1/20/1593da06f437d6','localhost-webapp-WebGDoks.php.png','2017-06-11 16:56:31',1,60726,5,1),(30,'1/20/1593da0edf1209','localhost-webapp-WebGDoks.php.png','2017-06-11 16:58:37',1,60726,5,1),(31,'1/20/1593da90160990','localhost-webapp-WebGDoks.php.png','2017-06-11 17:33:05',1,60726,5,1),(32,'1/20/1593daf84cbb28','localhost-webapp-WebGDoks.php.png','2017-06-11 18:00:52',1,60726,5,1),(33,'1/20/1593db024297cb','localhost-webapp-WebGDoks.php.png','2017-06-11 18:03:32',1,60726,5,1),(34,'1/20/1593dbacc57de4','localhost-webapp-WebGDoks.php.png','2017-06-11 18:49:00',1,60726,5,1),(35,'1/20/1593dbb3f515a3','localhost-webapp-WebGDoks.php.png','2017-06-11 18:50:55',1,60726,5,1),(36,'1/20/1593e3a5e940fc','2doList.ods','2017-06-12 03:53:18',1,17714,5,1),(37,'1/20/1593e3ad82c51b','ciro.mp4','2017-06-12 03:55:20',1,0,5,1),(38,'1/20/1593e40e41ba8c','localhost-webapp-WebGDoks.php.png','2017-06-12 04:21:08',1,60726,5,1),(39,'1/20/1593e5b95c90f5','localhost-webapp-WebGDoks.php.png','2017-06-12 06:15:01',1,60726,5,1),(40,'1/20/1593e5d1087691','ciro.mp4','2017-06-12 06:21:20',1,0,5,1),(41,'1/20/1593e5e95ae4d9','ciro.mp4','2017-06-12 06:27:49',1,0,5,1),(42,'1/20/1593e5f2712a16','localhost-webapp-WebGDoks.php.png','2017-06-12 06:30:15',1,60726,5,1),(43,'1/20/1593e5fafb3a15','localhost-webapp-WebGDoks.php.png','2017-06-12 06:32:31',1,60726,5,1),(44,'1/20/1593e625da5d56','pda_23.zip','2017-06-12 06:43:57',1,64716,5,1),(45,'1/20/159450844ae5d2','1214625936yZynHVd.jpg','2017-06-17 07:45:24',1,143196,5,1),(46,'1/20/159450844d4264','1214751884LpWxall.jpg','2017-06-17 07:45:24',1,76772,5,1),(47,'1/12/1594523c00147e','2doList.ods','2017-06-17 09:42:40',1,17714,5,1),(48,'1/12/1594523c029ffe','1214327031apGYy4e.jpg','2017-06-17 09:42:40',1,16828,5,1),(49,'1/12/1594523c0479ae','1214625936yZynHVd.jpg','2017-06-17 09:42:40',1,143196,5,1),(50,'1/20/159493b3d1cc3f','1214327031apGYy4e.jpg','2017-06-20 12:11:57',1,16828,5,1),(51,'1/20/159493b3d2a53c','1214625936yZynHVd.jpg','2017-06-20 12:11:57',1,143196,5,1),(52,'1/20/159493b3d36384','1214751884LpWxall.jpg','2017-06-20 12:11:57',1,76772,5,1);
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
  `valor_hh` decimal(12,2) NOT NULL DEFAULT '0.00',
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_nome_de_cargo_na_empresa` (`nome`,`id_empresa`),
  KEY `FK_cargos_x_empresas_idx` (`id_empresa`),
  CONSTRAINT `FK_cargos_x_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_cargos`
--

LOCK TABLES `gdoks_cargos` WRITE;
/*!40000 ALTER TABLE `gdoks_cargos` DISABLE KEYS */;
INSERT INTO `gdoks_cargos` VALUES (6,'Engenheiro 1',500.00,1),(7,'Engenheiro 2',755.00,1),(9,'Técnico 1',350.00,1),(10,'Engenheiro 3',900.00,1),(11,'sdfsdf',3333.00,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_clientes`
--

LOCK TABLES `gdoks_clientes` WRITE;
/*!40000 ALTER TABLE `gdoks_clientes` DISABLE KEYS */;
INSERT INTO `gdoks_clientes` VALUES (1,'802.828.065-04',NULL,'Sérgio Moura','Cliente PF','2017-02-08 11:25:00',1,'Sérgio','smouracalmon@gmail.com','(71) 99359-8089'),(2,NULL,'12.101.111/2222-21','Emporius Empreendimentos','Empresa X','2017-02-08 11:30:00',1,'Teste','teste@teste.com.br','(71) 96669-9966'),(3,NULL,'11.111.111/1111-12','Paseo Shopping','Paseo','2017-02-08 12:00:00',1,'Horlando','teste2@teste.com','(71) 98888-8888'),(4,NULL,'34.343.434/3434-33','Teste 355','Teste','2017-02-08 17:06:03',1,'teste contato','teste@teste.com','12121212'),(5,NULL,'12.312.312/3123-12','Ferreira Nunes LTDA','Ferreira Nunes','2017-02-08 23:06:51',1,'André Ferreira Nunes','andre@fnunes.com','8888-8888'),(6,'558.884.848-88',NULL,'Wowooo','wwowoo','2017-02-08 23:47:26',1,'','',''),(7,NULL,'06.236.852/0001-69','Faraday Ilimitada','Faraday','2017-02-10 19:41:40',1,'Anthony Stark','anthony@starkindustries.com','99999999'),(8,NULL,'11.112.132/1355-50','Teste Pessoa Jurídica 1','TPJ 1','2017-02-17 08:41:09',1,'teste','teste@teste.com','123123123'),(9,NULL,'32132132132132','Cliente 1','Cliente 1','2017-06-18 15:41:26',1,'João Mascarenhas','jmasc@cliente.com','33213121'),(10,NULL,'65465465465465','Cliente 1','Cliente 1','2017-06-18 15:47:46',1,'Teste','teste@teste.com','1928738'),(11,'45654654654',NULL,'Cliente 77','Cliente 77','2017-06-18 15:50:45',1,'kjakajhdkajhdkajshd','ksajdf@akjhsdakhd','121423123'),(12,NULL,'12.545.555/4444-56','Cliente 99','Cliente 99','2017-06-18 15:57:30',1,'Contato Cliente 99','asdasd@teste.com','1092389'),(13,'564.615.234-61',NULL,'Cliente 100','Cliente 122','2017-06-18 16:17:17',1,'Teste UU','teste@teste.com','1231231231');
/*!40000 ALTER TABLE `gdoks_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_codigos_emi`
--

DROP TABLE IF EXISTS `gdoks_codigos_emi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_codigos_emi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_empresa` int(11) DEFAULT NULL,
  `simbolo` varchar(5) DEFAULT NULL,
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_emi_id_empresa_x_id_empresa_idx` (`id_empresa`),
  CONSTRAINT `FK_emi_id_empresa_x_id_empresa` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_codigos_emi`
--

LOCK TABLES `gdoks_codigos_emi` WRITE;
/*!40000 ALTER TABLE `gdoks_codigos_emi` DISABLE KEYS */;
INSERT INTO `gdoks_codigos_emi` VALUES (1,1,'AP','Para aprovação'),(2,1,'CC','Como construído'),(3,1,'CD','Cancelado'),(4,1,'CF','Como fabricado'),(5,1,'CO','Para comentários'),(6,1,'CP','Como comprado'),(7,1,'CT','Certificado'),(8,1,'ES','Estudo, preliminar'),(9,1,'FA','Para fabricação'),(10,1,'PI','Para informação'),(11,1,'LC','Para construção'),(12,1,'OR','Para orçamento, cotação'),(13,1,'PC','Para compra'),(14,1,'PD','Para detalhamento'),(15,1,'PU','Para utilização'),(16,1,'PR','Para Registro');
/*!40000 ALTER TABLE `gdoks_codigos_emi` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COMMENT='documentos de abertura de operações';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_daos`
--

LOCK TABLES `gdoks_daos` WRITE;
/*!40000 ALTER TABLE `gdoks_daos` DISABLE KEYS */;
INSERT INTO `gdoks_daos` VALUES (1,'CCH3','159127d14a28ad','585305-1000-1454057020-expressive-dog-portraits-elke-vogelsang-14.jpg','image/jpeg',111609,13),(2,'CCH2','159127d14c2227','585205-1000-1454057020-expressive-dog-portraits-elke-vogelsang-1.jpg','image/jpeg',264079,13),(3,'CCH1','159127d1506e14','404111_498589010168836_1957634377_n.jpg','image/jpeg',55141,13),(4,'sws','159159544eed4a','130708Marina_nascimento 0170.jpg','image/jpeg',359288,12),(5,'asdasdd','1591595451fc3a','130708Marina_nascimento 0166.jpg','image/jpeg',327682,12),(6,'asdasd','1591595455f0cf','130708Marina_nascimento 0164.jpg','image/jpeg',335517,12),(7,'teste','15939b65d8289e','G.pdf','application/pdf',29247,12),(8,'Foto 1','15945095d84af3','1214327031apGYy4e.jpg','image/jpeg',16828,21),(30,'5','1594764fde9a6e','consultas.sql','application/octet-stream',3956,22),(31,'3','1594764fe1cf0b','1214625936yZynHVd.jpg','image/jpeg',143196,22),(32,'2','1594764fe3b13d','1214327031apGYy4e.jpg','image/jpeg',16828,22),(33,'9','159476857f0258','1215471604fESdi9X.jpg','image/jpeg',181485,22),(34,'8','15947685887040','1214751884LpWxall.jpg','image/jpeg',76772,22),(35,'7','159476858a7875','1214625936yZynHVd.jpg','image/jpeg',143196,22),(36,'6','159476858e9910','1214327031apGYy4e.jpg','image/jpeg',16828,22),(37,'11','1594768a5dfcf3','pda_7 (1).zip','application/x-zip-compressed',1661965,22),(41,'e','1594771e651877','pda_14.zip','application/x-zip-compressed',1839529,22),(42,'c','1594771e6eab07','pda_13 (1).zip','application/x-zip-compressed',405022,22),(43,'b','1594771e70b557','pda_7.zip','application/x-zip-compressed',1661965,22),(44,'a','1594771e72a022','pda_7 (6).zip','application/x-zip-compressed',1661965,22);
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_disciplinas`
--

LOCK TABLES `gdoks_disciplinas` WRITE;
/*!40000 ALTER TABLE `gdoks_disciplinas` DISABLE KEYS */;
INSERT INTO `gdoks_disciplinas` VALUES (16,'Direção/Gest]ap','AA','',1),(17,'Administração','B','',1),(18,'Civil','C','',1),(19,'Elétrica','ELE','',1),(20,'Gerência de Empreendimentos','F20','',1),(21,'Direção / Gestão','A','',2),(22,'Teste 1','TT1','',1),(24,'ssdfsdf','ttt','',1),(25,'Teste 2','asda','',1),(26,'Teste 3','TT3','',1),(27,'Teste 4','TTT4','',1),(28,'Teste 5','twer','',1),(29,'Teste 6','TT6','',1),(30,'ZZZ','z','\0',1);
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
  `nome` varchar(100) DEFAULT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `id_subarea` int(11) DEFAULT NULL,
  `id_subdisciplina` int(11) DEFAULT NULL,
  `datahora_do_checkout` datetime DEFAULT NULL,
  `idu_checkout` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_subdisciplinas_idx` (`id_subdisciplina`),
  KEY `FK_idu_checkout_x_usuarios_idx` (`idu_checkout`),
  KEY `FK_doc_id_subarea_x_subareas_idx` (`id_subarea`),
  CONSTRAINT `FK_doc_id_subarea_x_subareas` FOREIGN KEY (`id_subarea`) REFERENCES `gdoks_subareas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_id_subdisciplina` FOREIGN KEY (`id_subdisciplina`) REFERENCES `gdoks_subdisciplinas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_idu_checkout_x_usuarios` FOREIGN KEY (`idu_checkout`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_documentos`
--

LOCK TABLES `gdoks_documentos` WRITE;
/*!40000 ALTER TABLE `gdoks_documentos` DISABLE KEYS */;
INSERT INTO `gdoks_documentos` VALUES (25,'Documento 1','DOC1',2,21,NULL,NULL),(26,'Documento 2','DOC2',5,21,NULL,NULL),(27,'Documento 3','DOC3',2,20,NULL,NULL),(28,'Documento 4','DOC4',1,21,NULL,NULL),(29,'Documento 5','DOC5',3,20,NULL,NULL),(30,'Documento 6','DOC6',2,21,NULL,NULL),(31,'Documento 7','DOC7',4,23,NULL,NULL),(32,'Documento 8','DOC8',2,23,NULL,NULL),(33,'Documento 9','DOC9',2,21,NULL,NULL),(34,'Documento 10','DOC10',4,21,NULL,NULL),(35,'Documento 11','DOC11',5,23,NULL,NULL),(37,'Documento 16','DOC16',4,22,NULL,NULL),(38,'Doc Teste','DT1',4,20,NULL,NULL),(39,'Doc Teste 2','DT2',2,23,NULL,NULL),(41,'Teste 5','TT5',5,21,NULL,NULL),(42,'ITF-0200-E060-A1-02145 FL.1/3','DOC A',7,21,NULL,NULL),(43,'ITF-0200-E060-A1-02145 FL.2/3','DOC B',7,21,NULL,NULL),(44,'Cabine Clindada SE Entrada e Medição a b c','DOC C',7,23,NULL,NULL),(45,'Documento D','Doc D',7,22,NULL,NULL),(46,'Documento E','DOC E',7,24,'2017-06-20 15:49:16',1),(49,'F','DOC F',7,21,'2017-06-12 03:56:26',1),(50,'ITF-0200-E060-A1-02146','Doc G',7,21,NULL,NULL),(51,'Freios','FR',8,22,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_documentos_x_dependencias`
--

LOCK TABLES `gdoks_documentos_x_dependencias` WRITE;
/*!40000 ALTER TABLE `gdoks_documentos_x_dependencias` DISABLE KEYS */;
INSERT INTO `gdoks_documentos_x_dependencias` VALUES (47,26,25),(48,26,30),(49,27,25),(56,33,27),(57,31,30),(58,34,25),(59,34,27),(60,34,30),(61,35,27),(64,39,26),(65,39,25),(66,32,28),(67,32,26),(76,28,26);
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_especialistas`
--

LOCK TABLES `gdoks_especialistas` WRITE;
/*!40000 ALTER TABLE `gdoks_especialistas` DISABLE KEYS */;
INSERT INTO `gdoks_especialistas` VALUES (35,1,16),(44,1,17),(38,1,18),(45,1,26),(36,2,18),(37,4,18),(43,8,17);
/*!40000 ALTER TABLE `gdoks_especialistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_grds`
--

DROP TABLE IF EXISTS `gdoks_grds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_grds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_projeto` int(11) NOT NULL,
  `codigo` varchar(60) NOT NULL,
  `obs` varchar(256) DEFAULT NULL,
  `datahora_registro` datetime NOT NULL,
  `datahora_enviada` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  KEY `FK_grd_x_id_projeto_idx` (`id_projeto`),
  CONSTRAINT `FK_grd_x_id_projeto` FOREIGN KEY (`id_projeto`) REFERENCES `gdoks_projetos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_grds`
--

LOCK TABLES `gdoks_grds` WRITE;
/*!40000 ALTER TABLE `gdoks_grds` DISABLE KEYS */;
INSERT INTO `gdoks_grds` VALUES (1,15,'FRYoqioweqowe','sssss','2017-06-19 19:01:51',NULL),(2,16,'FRYKKKKKKK','Observações da GRD FRYKKKKKKK','2017-06-19 21:32:44',NULL),(3,22,'FRYOOOOOOO','','2017-06-19 21:38:08',NULL),(4,13,'FRY-GRD-000001','','2017-06-19 21:46:23',NULL),(5,21,'FRY-GRD-000002','','2017-06-19 21:48:35',NULL),(6,14,'TOTOOOOOO','','2017-06-19 22:05:51',NULL),(7,22,'OQWE','','2017-06-19 22:09:36',NULL),(8,17,'sssssssqqqw','www','2017-06-19 22:11:34',NULL),(9,19,'877887878','','2017-06-19 22:18:42',NULL),(10,19,'awsee211e2','','2017-06-19 22:20:28',NULL),(11,17,'b5e6','','2017-06-19 22:21:27',NULL),(12,22,'as222213','fff','2017-06-20 00:19:52',NULL),(13,17,'5f34g78','','2017-06-20 00:22:30',NULL),(14,15,'11212312312','123123','2017-06-20 00:28:19',NULL),(15,19,'323333344444','rwerw','2017-06-20 00:29:55',NULL),(16,21,'7887888811145','Obs','2017-06-20 08:14:59',NULL),(17,19,'e322323f','','2017-06-20 08:17:59',NULL),(18,20,'88e78887r','sem contato','2017-06-20 08:32:34',NULL),(19,15,'23wffwwe2333','fsddsdfsdf','2017-06-22 21:08:42',NULL);
/*!40000 ALTER TABLE `gdoks_grds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_grds_x_revisoes`
--

DROP TABLE IF EXISTS `gdoks_grds_x_revisoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_grds_x_revisoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_grd` int(11) NOT NULL,
  `id_revisao` int(11) NOT NULL,
  `id_codEMI` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `nFolhas` int(11) DEFAULT NULL,
  `nVias` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_grd_revisoes_x_id_revisoes_idx` (`id_revisao`),
  KEY `FK_grd_grd_x_id_grd_idx` (`id_grd`),
  KEY `FK_grd_x_rev_id_codEMI_idx` (`id_codEMI`),
  KEY `FK_grd_x_rev_id_tipo_idx` (`id_tipo`),
  CONSTRAINT `FK_grd_grd_x_id_grd` FOREIGN KEY (`id_grd`) REFERENCES `gdoks_grds` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_grd_revisoes_x_id_revisoes` FOREIGN KEY (`id_revisao`) REFERENCES `gdoks_revisoes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_grd_x_rev_id_codEMI` FOREIGN KEY (`id_codEMI`) REFERENCES `gdoks_codigos_emi` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_grd_x_rev_id_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `gdoks_tipos_de_doc` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_grds_x_revisoes`
--

LOCK TABLES `gdoks_grds_x_revisoes` WRITE;
/*!40000 ALTER TABLE `gdoks_grds_x_revisoes` DISABLE KEYS */;
INSERT INTO `gdoks_grds_x_revisoes` VALUES (35,18,24,3,1,3,1),(36,18,26,2,1,2,1),(37,18,28,5,2,1,1);
/*!40000 ALTER TABLE `gdoks_grds_x_revisoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_hhemdocs`
--

DROP TABLE IF EXISTS `gdoks_hhemdocs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_hhemdocs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_doc` int(11) DEFAULT NULL,
  `id_cargo` int(11) DEFAULT NULL,
  `hh` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_doc_x_cargo` (`id_doc`,`id_cargo`),
  KEY `fk_id_cargo_x_cargos_idx` (`id_cargo`),
  KEY `fk_id_documento_x_documentos_idx` (`id_doc`),
  CONSTRAINT `fk_hhemdocs_x_documentos` FOREIGN KEY (`id_doc`) REFERENCES `gdoks_documentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_id_cargo_x_cargos` FOREIGN KEY (`id_cargo`) REFERENCES `gdoks_cargos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_hhemdocs`
--

LOCK TABLES `gdoks_hhemdocs` WRITE;
/*!40000 ALTER TABLE `gdoks_hhemdocs` DISABLE KEYS */;
INSERT INTO `gdoks_hhemdocs` VALUES (11,25,6,1),(12,25,7,2),(14,33,6,1),(15,33,7,3),(16,31,7,3),(17,34,7,1),(18,39,6,2),(19,32,7,1),(20,32,9,3),(21,30,7,12),(22,30,9,15),(26,38,7,5),(30,28,6,1),(31,28,7,2),(34,41,6,3),(35,41,7,1),(39,51,6,3),(40,42,6,1),(41,43,7,5);
/*!40000 ALTER TABLE `gdoks_hhemdocs` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1480 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_log`
--

LOCK TABLES `gdoks_log` WRITE;
/*!40000 ALTER TABLE `gdoks_log` DISABLE KEYS */;
INSERT INTO `gdoks_log` VALUES (1,1,1,NULL,'2017-01-02 08:30:36'),(2,1,2,NULL,'2017-01-02 08:37:26'),(3,1,2,NULL,'2017-01-02 08:38:34'),(4,1,1,NULL,'2017-01-02 10:40:17'),(5,1,1,NULL,'2017-01-02 15:41:05'),(6,1,1,NULL,'2017-01-02 19:12:13'),(7,1,1,NULL,'2017-01-02 22:25:31'),(8,1,1,NULL,'2017-01-03 05:55:45'),(9,1,1,NULL,'2017-01-03 08:21:24'),(10,1,1,NULL,'2017-01-03 09:03:25'),(11,1,1,NULL,'2017-01-03 10:55:58'),(12,1,1,NULL,'2017-01-03 10:56:29'),(13,1,1,NULL,'2017-01-03 10:58:46'),(14,1,1,NULL,'2017-01-03 11:01:50'),(15,1,1,NULL,'2017-01-03 11:02:13'),(16,1,1,NULL,'2017-01-03 11:08:05'),(17,1,1,NULL,'2017-01-03 13:08:10'),(18,1,1,NULL,'2017-01-03 13:08:47'),(19,1,1,NULL,'2017-01-03 13:10:30'),(20,1,1,NULL,'2017-01-03 13:13:25'),(21,1,1,NULL,'2017-01-03 13:14:47'),(22,1,1,NULL,'2017-01-03 13:16:39'),(23,1,1,NULL,'2017-01-03 13:18:08'),(24,1,1,NULL,'2017-01-03 17:19:16'),(25,1,1,NULL,'2017-01-03 17:20:55'),(26,1,1,NULL,'2017-01-04 23:44:03'),(27,1,1,NULL,'2017-01-04 23:44:07'),(28,1,1,NULL,'2017-01-04 23:44:09'),(29,1,1,NULL,'2017-01-04 23:44:55'),(30,1,1,NULL,'2017-01-04 23:45:51'),(31,1,1,NULL,'2017-01-04 23:49:47'),(32,1,1,NULL,'2017-01-05 01:26:44'),(33,1,3,'Usuário 2,usuario2@gmail.com,user1,1','2017-01-05 01:44:17'),(34,1,3,'Usuário 2,usuario2@gmail.com,user1,1','2017-01-05 01:45:52'),(35,1,3,'Usuário 2,usuario2@gmail.com,user2,1','2017-01-05 01:46:01'),(36,1,4,'Teste 3,teste@teste.com,teste3,1','2017-01-05 01:48:32'),(37,1,1,NULL,'2017-01-05 20:10:38'),(38,1,1,NULL,'2017-01-05 22:32:26'),(39,1,3,'Teste Moura,teste@gmail.com,teste,1','2017-01-05 22:34:19'),(40,1,3,'Teste Moura,teste@gmail.com,teste,','2017-01-05 22:34:26'),(41,1,1,NULL,'2017-01-05 22:34:52'),(42,1,3,'Teste Moura,teste@gmail.com,teste,1','2017-01-05 22:35:01'),(43,1,3,'Teste Moura,teste@gmail.com,teste,1','2017-01-05 22:35:32'),(44,4,1,NULL,'2017-01-05 22:35:47'),(45,1,1,NULL,'2017-01-06 03:53:23'),(46,1,1,NULL,'2017-01-06 11:11:54'),(47,1,1,NULL,'2017-01-06 15:13:57'),(48,1,5,'Disciplina A,AA2A,1','2017-01-06 16:27:44'),(49,1,5,'Disciplina A,AAA,1','2017-01-06 16:28:00'),(50,1,5,'Disciplina A,AAA,','2017-01-06 16:28:35'),(51,1,5,'Disciplina A,AAA,1','2017-01-06 16:29:16'),(52,1,5,'Disciplina A,AAA,','2017-01-06 16:29:39'),(53,1,1,NULL,'2017-01-06 21:42:55'),(54,1,5,'Disciplina A,AAA,1','2017-01-06 21:53:37'),(55,1,5,'Disciplina A,AAA,1','2017-01-06 22:00:14'),(56,1,5,'Disciplina A,AAA,0','2017-01-06 22:00:18'),(57,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,','2017-01-06 22:00:42'),(58,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,','2017-01-06 22:01:37'),(59,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,','2017-01-06 22:02:02'),(60,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-06 22:03:32'),(61,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,0','2017-01-06 22:03:50'),(62,1,6,'teste1,tt1,1','2017-01-06 22:38:14'),(63,1,1,NULL,'2017-01-07 01:42:40'),(64,1,5,'Disciplina X,XXX,1','2017-01-07 01:43:22'),(65,1,6,'Dosciplina Z,ZZZ,1','2017-01-07 01:44:11'),(66,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-07 01:47:15'),(67,1,5,'Disciplina C2,CCC2,1','2017-01-07 02:20:30'),(68,1,5,'Disciplina C2,CCC2,1','2017-01-07 02:20:55'),(69,1,1,NULL,'2017-01-09 12:02:14'),(70,1,6,'Teste 3,tt3,1','2017-01-09 12:03:26'),(71,1,5,'Teste 32,tt32,1','2017-01-09 12:05:31'),(72,1,5,'Teste 32,tt32,1','2017-01-09 12:09:08'),(73,1,5,'Teste 321,tt32,1','2017-01-09 12:09:20'),(74,1,5,'Teste 3212,tt32,1','2017-01-09 12:09:24'),(75,1,5,'Teste 32121,tt31,1','2017-01-09 12:10:23'),(76,1,5,'Teste 32121,tt31,1','2017-01-09 12:11:22'),(77,1,1,NULL,'2017-01-09 12:30:16'),(78,1,1,NULL,'2017-01-09 13:22:54'),(79,1,5,'Disciplina B2,BBB,1','2017-01-09 13:40:08'),(80,1,5,'Disciplina B,BBB,1','2017-01-09 13:40:32'),(81,1,6,'teste 9,tt9,1','2017-01-09 13:46:18'),(82,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-09 15:15:05'),(83,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-09 15:15:21'),(84,1,5,'Disciplina B1,BBB,1','2017-01-09 15:17:05'),(85,1,5,'Disciplina B,BBB,1','2017-01-09 15:17:26'),(86,1,5,'Disciplina B1,BBB,1','2017-01-09 15:19:38'),(87,1,5,'Disciplina B,BBB,1','2017-01-09 15:21:14'),(88,1,5,'Disciplina B1,BBB,1','2017-01-09 16:05:28'),(89,1,5,'Disciplina B,BBB,1','2017-01-09 16:07:30'),(90,1,5,'Disciplina G1,GGG,1','2017-01-09 16:07:37'),(91,1,5,'Disciplina G,GGG,1','2017-01-09 16:09:47'),(92,1,5,'Disciplina G,GGG,1','2017-01-09 16:10:36'),(93,1,1,NULL,'2017-01-10 05:48:53'),(94,1,1,NULL,'2017-01-10 05:51:25'),(95,1,1,NULL,'2017-01-10 05:53:45'),(96,1,1,NULL,'2017-01-10 23:12:18'),(97,1,1,NULL,'2017-01-18 10:40:19'),(98,1,1,NULL,'2017-01-19 01:01:11'),(99,1,1,NULL,'2017-01-19 06:52:27'),(100,1,1,NULL,'2017-01-19 08:51:36'),(101,1,5,'Disciplina D,DD,0','2017-01-19 08:52:01'),(102,1,5,'Disciplina E,EE,0','2017-01-19 08:52:13'),(103,1,5,'Disciplina C2,CC,0','2017-01-19 08:52:25'),(104,1,1,NULL,'2017-01-19 10:40:11'),(105,1,1,NULL,'2017-01-19 20:28:13'),(106,1,1,NULL,'2017-01-20 16:56:18'),(107,1,1,NULL,'2017-01-20 22:37:01'),(108,1,1,NULL,'2017-01-21 03:26:04'),(109,1,1,NULL,'2017-01-21 03:59:07'),(110,1,1,NULL,'2017-01-21 04:31:26'),(111,1,1,NULL,'2017-01-21 08:59:50'),(112,1,1,NULL,'2017-01-21 19:44:43'),(113,1,1,NULL,'2017-01-22 01:03:07'),(114,1,1,NULL,'2017-01-29 10:54:26'),(115,1,1,NULL,'2017-01-29 14:42:40'),(116,1,1,NULL,'2017-01-29 15:53:37'),(117,1,6,'fwfewwf,ddd,1','2017-01-29 18:30:17'),(118,1,5,'Elétrica,ELE,1','2017-01-29 18:31:08'),(119,1,5,'Elétrica,ELE,0','2017-01-29 18:33:04'),(120,1,5,'Elétrica,ELE,1','2017-01-29 18:33:14'),(121,1,1,NULL,'2017-01-29 18:58:58'),(122,1,1,NULL,'2017-01-29 19:00:21'),(123,1,1,NULL,'2017-01-29 19:03:57'),(124,1,1,NULL,'2017-01-29 19:05:13'),(125,1,1,NULL,'2017-01-29 19:10:08'),(126,1,1,NULL,'2017-01-30 07:55:50'),(127,1,7,'Sub B1,SBBY,1','2017-01-30 10:50:31'),(128,1,7,'Sub B1,SBB1,1','2017-01-30 10:54:49'),(129,1,7,'Sub B1,SBBX,1','2017-01-30 10:55:25'),(130,1,7,'Sub B1,SBB1,1','2017-01-30 10:56:01'),(131,1,7,'Sub B1,SBBx,1','2017-01-30 10:58:09'),(132,1,7,'Sub B1,SBB1,1','2017-01-30 10:59:12'),(133,1,7,'Sub B1,SBBo,0','2017-01-30 11:10:48'),(134,1,7,'Sub B1,SBB1,1','2017-01-30 11:11:02'),(135,1,7,'Sub B22,SBBc,0','2017-01-30 11:11:27'),(136,1,7,'Sub B22,SBBc,1','2017-01-30 11:11:34'),(137,1,7,'Sub B22,SBB2,1','2017-01-30 11:11:46'),(138,1,7,'Sub B2,SBB2,1','2017-01-30 11:12:09'),(139,1,7,'Sub B1,SBB1,1','2017-01-30 11:15:59'),(140,1,7,'Sub B1,SBBx,1','2017-01-30 11:31:14'),(141,1,7,'Sub B1,SBB1,1','2017-01-30 11:31:57'),(142,1,7,'Sub B1,SBB1,1','2017-01-30 11:32:10'),(143,1,8,'TESTE,TTTT,1','2017-01-30 11:56:23'),(144,1,8,'teste 3,tt3,1','2017-01-30 11:58:27'),(145,1,8,'teste 4,ttt4,0','2017-01-30 11:59:38'),(146,1,8,'teste 5,ttt5,1','2017-01-30 12:00:49'),(147,1,8,'Teste 6,ttt6,1','2017-01-30 12:06:55'),(148,1,8,'Teste 7,ttt7,1','2017-01-30 12:28:15'),(149,1,8,'Teste 8,ttt8,1','2017-01-30 12:35:58'),(150,1,8,',,1','2017-01-30 12:38:11'),(151,1,7,'teste 9,tt9,1','2017-01-30 12:38:20'),(152,1,1,NULL,'2017-01-30 13:10:38'),(153,1,1,NULL,'2017-01-30 14:40:54'),(154,1,9,'teste 9,tt9,1','2017-01-30 14:50:50'),(155,1,9,'Teste 7,ttt7,1','2017-01-30 14:51:10'),(156,1,9,'teste 4,ttt4,0','2017-01-30 14:54:33'),(157,1,9,'Teste 6,ttt6,1','2017-01-30 14:54:37'),(158,1,9,'TESTE,TTTT,1','2017-01-30 14:54:40'),(159,1,9,'teste 3,tt3,1','2017-01-30 14:54:42'),(160,1,9,'teste 5,ttt5,1','2017-01-30 14:54:46'),(161,1,8,'teste 1,ttt1,0','2017-01-30 14:54:58'),(162,1,9,'teste 1,ttt1,0','2017-01-30 14:55:03'),(163,1,7,'Sub B2,SBB3,1','2017-01-30 14:55:16'),(164,1,7,'Sub B2,SBB2,1','2017-01-30 14:55:29'),(165,1,8,'Teste 3,TTT3,1','2017-01-30 15:00:05'),(166,1,1,NULL,'2017-01-30 15:52:10'),(167,1,1,NULL,'2017-01-30 16:06:36'),(168,1,10,'4,1','2017-01-30 18:01:52'),(169,1,10,'4,1','2017-01-30 18:02:27'),(170,1,11,'6,1','2017-01-30 18:18:06'),(171,1,10,'6,1','2017-01-30 18:23:39'),(172,1,11,'2,1','2017-01-30 18:23:47'),(173,1,10,'2,1','2017-01-30 18:24:35'),(174,1,11,'6,1','2017-01-30 18:24:39'),(175,1,11,'2,1','2017-01-30 18:24:42'),(176,1,10,'4,1','2017-01-30 18:24:56'),(177,1,11,'4,1','2017-01-30 18:24:59'),(178,1,1,NULL,'2017-01-31 08:35:22'),(179,1,10,'6,1','2017-01-31 08:37:38'),(180,1,11,'6,1','2017-01-31 08:39:07'),(181,1,10,'6,1','2017-01-31 08:39:11'),(183,1,12,'4,1,2','2017-01-31 10:51:47'),(184,1,12,'6,1,1','2017-01-31 11:10:15'),(185,1,13,'1,1','2017-01-31 11:22:37'),(186,1,13,'6,1','2017-01-31 11:24:29'),(187,1,13,'2,1','2017-01-31 11:24:34'),(188,1,13,'4,1','2017-01-31 11:26:46'),(189,1,12,'4,1,1','2017-01-31 11:27:36'),(190,1,13,'4,1','2017-01-31 11:29:22'),(191,1,12,'4,1,1','2017-01-31 11:29:28'),(192,1,12,'1,1,2','2017-01-31 11:31:58'),(193,1,12,'6,1,2','2017-01-31 11:35:31'),(194,1,12,'2,1,1','2017-01-31 11:35:41'),(195,1,13,'2,1','2017-01-31 11:35:56'),(196,1,13,'6,1','2017-01-31 11:36:03'),(197,1,13,'4,1','2017-01-31 11:36:05'),(198,1,10,'4,3','2017-01-31 11:37:02'),(199,1,12,'1,3,1','2017-01-31 11:37:06'),(200,1,12,'4,3,1','2017-01-31 11:40:37'),(201,1,13,'1,1','2017-01-31 11:42:06'),(202,1,12,'6,1,2','2017-01-31 11:42:28'),(203,1,12,'4,1,1','2017-01-31 11:42:51'),(204,1,13,'6,1','2017-01-31 11:43:01'),(205,1,13,'4,1','2017-01-31 11:43:21'),(206,1,12,'6,1,2','2017-01-31 11:43:27'),(207,1,11,'1,1','2017-01-31 11:43:41'),(208,1,10,'1,1','2017-01-31 11:43:47'),(209,1,8,'tetettt,lll,1','2017-01-31 11:44:05'),(210,1,9,'tetettt,lll,1','2017-01-31 11:44:10'),(211,1,3,'Raul Castro Validador 2,raulcastro@gdoks.com.br,teste,1','2017-01-31 11:52:12'),(212,1,3,'Raul Castro Validador,raulcastro@gdoks.com.br,teste,1','2017-01-31 11:52:19'),(213,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-01-31 11:52:42'),(214,1,6,'Hidráulica,HDR,1','2017-01-31 11:53:46'),(215,1,8,'Tubulações,HDR1,1','2017-01-31 11:54:13'),(216,1,8,'Vazões,HDR2,1','2017-01-31 11:55:08'),(217,1,10,'4,15','2017-01-31 11:55:16'),(218,1,12,'1,15,1','2017-01-31 11:55:22'),(219,1,13,'1,15','2017-01-31 11:55:28'),(220,1,12,'1,15,2','2017-01-31 11:55:36'),(221,1,1,NULL,'2017-01-31 14:05:00'),(222,1,1,NULL,'2017-02-08 09:22:30'),(223,1,1,NULL,'2017-02-08 10:32:39'),(224,1,5,'Disciplina B1,BBB,1','2017-02-08 10:32:58'),(225,1,5,'Disciplina B,BBB,1','2017-02-08 10:33:06'),(226,1,14,'1,Cliente Pessoa Física da Silva,Cliente PF 2','2017-02-08 15:58:43'),(227,1,14,'1,Cliente PF,Cliente PF','2017-02-08 15:59:34'),(228,1,14,'1,Cliente Pessoa Física,Cliente PF','2017-02-08 16:00:21'),(229,1,14,'2,Emporius Empreendimentos,Empresa X','2017-02-08 16:00:34'),(230,1,15,'4,Teste 34','2017-02-08 17:06:04'),(231,1,1,NULL,'2017-02-08 22:25:38'),(232,1,15,'5,aaaa','2017-02-08 23:06:51'),(233,1,14,'5,aaaa22,aaaa','2017-02-08 23:07:54'),(234,1,14,'3,Paseo Shopping,Paseo','2017-02-08 23:08:18'),(235,1,14,'1,Cliente Pessoa Física,Cliente PF','2017-02-08 23:10:55'),(236,1,14,'2,Emporius Empreendimentos,Empresa X','2017-02-08 23:11:18'),(237,1,14,'5,aaaa22,aaaa','2017-02-08 23:42:41'),(238,1,14,'5,aaaa22,aaaa','2017-02-08 23:43:36'),(239,1,14,'5,aaaa22,aaaa','2017-02-08 23:44:23'),(240,1,14,'2,Emporius Empreendimentos,Empresa X','2017-02-08 23:45:42'),(241,1,14,'2,Emporius Empreendimentos,Empresa X','2017-02-08 23:45:55'),(242,1,14,'3,Paseo Shopping,Paseo','2017-02-08 23:46:06'),(243,1,14,'1,Cliente Pessoa Física,Cliente PF','2017-02-08 23:46:15'),(244,1,14,'4,Teste 34,Teste','2017-02-08 23:46:44'),(245,1,15,'6,Wowooo','2017-02-08 23:47:26'),(246,1,14,'6,Wowooo,wwowoo','2017-02-08 23:50:03'),(247,1,14,'5,aaaa22,aaaa','2017-02-09 00:06:06'),(248,1,14,'5,aaaa22,aaaa','2017-02-09 00:06:32'),(249,1,14,'1,Cliente Pessoa Física,Cliente PF','2017-02-09 00:06:49'),(250,1,14,'6,Wowooo,wwowoo','2017-02-09 00:07:38'),(251,1,8,'twww,tttt,1','2017-02-09 01:22:45'),(252,1,8,'gsdf,ferg,1','2017-02-09 01:22:53'),(253,1,8,'rrrtg,ggg,1','2017-02-09 01:22:59'),(254,1,9,'gsdf,ferg,1','2017-02-09 01:23:04'),(255,1,1,NULL,'2017-02-09 09:11:22'),(256,1,1,NULL,'2017-02-09 14:20:35'),(257,1,2,NULL,'2017-02-09 14:53:37'),(258,1,1,NULL,'2017-02-09 20:18:16'),(259,1,1,NULL,'2017-02-09 21:48:08'),(260,1,1,NULL,'2017-02-09 23:51:26'),(261,1,1,NULL,'2017-02-10 00:09:40'),(262,1,1,NULL,'2017-02-10 09:19:25'),(263,1,1,NULL,'2017-02-10 15:39:31'),(264,1,1,NULL,'2017-02-10 16:37:23'),(265,1,1,NULL,'2017-02-10 19:04:09'),(266,1,15,'7,Faraday Ilimitada','2017-02-10 19:41:40'),(267,1,14,'7,Faraday Ilimitada,Faraday','2017-02-10 19:43:01'),(268,1,1,NULL,'2017-02-11 15:50:05'),(269,1,1,NULL,'2017-02-14 04:22:14'),(270,1,1,NULL,'2017-02-14 04:30:16'),(271,1,1,NULL,'2017-02-14 09:46:55'),(272,1,1,NULL,'2017-02-14 15:04:54'),(273,1,1,NULL,'2017-02-14 15:05:34'),(274,1,1,NULL,'2017-02-14 15:05:50'),(275,1,1,NULL,'2017-02-14 15:06:42'),(276,1,1,NULL,'2017-02-14 15:08:03'),(277,1,1,NULL,'2017-02-14 15:10:14'),(278,1,1,NULL,'2017-02-14 15:11:24'),(279,1,1,NULL,'2017-02-14 15:11:47'),(280,1,1,NULL,'2017-02-14 15:13:53'),(281,1,1,NULL,'2017-02-14 15:27:56'),(282,1,1,NULL,'2017-02-14 15:28:19'),(283,1,1,NULL,'2017-02-14 15:28:31'),(284,1,1,NULL,'2017-02-14 15:29:43'),(285,1,1,NULL,'2017-02-14 15:30:08'),(286,1,1,NULL,'2017-02-14 15:30:27'),(287,1,1,NULL,'2017-02-14 15:31:08'),(288,1,1,NULL,'2017-02-14 15:31:43'),(289,1,1,NULL,'2017-02-15 01:24:50'),(290,1,1,NULL,'2017-02-15 01:33:28'),(291,1,1,NULL,'2017-02-15 01:34:20'),(292,1,1,NULL,'2017-02-15 01:34:37'),(293,1,1,NULL,'2017-02-15 01:35:04'),(294,1,1,NULL,'2017-02-15 01:59:52'),(295,1,1,NULL,'2017-02-15 02:10:59'),(296,1,1,NULL,'2017-02-15 02:59:19'),(297,1,1,NULL,'2017-02-15 03:01:05'),(298,1,1,NULL,'2017-02-15 03:04:27'),(299,1,1,NULL,'2017-02-15 03:04:48'),(300,1,1,NULL,'2017-02-15 03:13:55'),(301,1,1,NULL,'2017-02-15 03:15:49'),(302,1,1,NULL,'2017-02-15 03:16:38'),(303,1,1,NULL,'2017-02-15 03:25:05'),(304,1,1,NULL,'2017-02-15 03:27:18'),(305,1,1,NULL,'2017-02-15 03:28:35'),(306,1,1,NULL,'2017-02-15 06:56:33'),(307,1,1,NULL,'2017-02-15 07:01:54'),(308,1,1,NULL,'2017-02-15 07:06:34'),(309,1,1,NULL,'2017-02-15 07:17:25'),(310,1,1,NULL,'2017-02-15 09:26:12'),(311,1,1,NULL,'2017-02-15 09:38:29'),(312,1,1,NULL,'2017-02-15 09:38:46'),(313,1,1,NULL,'2017-02-15 09:43:27'),(314,1,1,NULL,'2017-02-15 09:43:37'),(315,1,1,NULL,'2017-02-15 09:44:49'),(316,1,1,NULL,'2017-02-15 09:45:33'),(317,1,1,NULL,'2017-02-15 09:45:36'),(318,1,1,NULL,'2017-02-15 09:45:41'),(319,1,1,NULL,'2017-02-15 09:50:28'),(320,1,1,NULL,'2017-02-15 09:50:30'),(321,1,1,NULL,'2017-02-15 09:51:18'),(322,1,1,NULL,'2017-02-15 09:51:33'),(323,1,1,NULL,'2017-02-15 09:52:12'),(324,1,1,NULL,'2017-02-15 09:52:26'),(325,1,1,NULL,'2017-02-15 10:13:09'),(326,1,1,NULL,'2017-02-15 10:22:42'),(327,1,1,NULL,'2017-02-15 10:29:14'),(328,1,1,NULL,'2017-02-15 10:32:56'),(329,1,1,NULL,'2017-02-15 10:44:31'),(330,1,1,NULL,'2017-02-15 10:47:34'),(331,1,1,NULL,'2017-02-15 10:53:05'),(332,1,1,NULL,'2017-02-15 10:55:07'),(333,1,1,NULL,'2017-02-15 11:28:34'),(334,1,1,NULL,'2017-02-15 12:30:02'),(335,1,1,NULL,'2017-02-15 12:31:18'),(336,1,1,NULL,'2017-02-15 14:16:17'),(337,1,4,'Teste 55,teste55@teste.com,teste55,1','2017-02-15 14:24:24'),(338,1,3,'Teste 55,teste55@teste.com,teste555,1','2017-02-15 14:30:10'),(339,1,1,NULL,'2017-02-15 15:34:58'),(340,1,1,NULL,'2017-02-15 16:05:40'),(341,1,1,NULL,'2017-02-15 16:15:17'),(342,1,1,NULL,'2017-02-15 16:17:41'),(343,1,1,NULL,'2017-02-15 16:19:36'),(344,1,1,NULL,'2017-02-16 05:10:07'),(345,1,1,NULL,'2017-02-16 05:21:47'),(346,1,1,NULL,'2017-02-16 05:27:17'),(347,1,1,NULL,'2017-02-16 05:31:08'),(348,1,1,NULL,'2017-02-16 09:11:47'),(349,1,8,'Sub B3,SBB3,1','2017-02-16 09:22:08'),(350,1,1,NULL,'2017-02-16 09:23:53'),(351,1,8,'Sub B4,SBB4,1','2017-02-16 09:41:35'),(352,1,1,NULL,'2017-02-16 09:43:13'),(353,1,8,'Sub B5,SBB5,0','2017-02-16 09:44:04'),(354,1,7,'Sub B3 T,SBB3,1','2017-02-16 09:44:55'),(355,1,7,'Sub B3-3,SBB3,1','2017-02-16 09:46:00'),(356,1,1,NULL,'2017-02-16 09:46:56'),(357,1,7,'Sub B2-2,SBB2,1','2017-02-16 10:59:26'),(358,1,7,'Sub B2-2,SBB2,1','2017-02-16 11:00:02'),(359,1,1,NULL,'2017-02-16 11:00:50'),(360,1,7,'Sub B2,SBB2,1','2017-02-16 11:01:10'),(361,1,7,'Sub B3,SBB3,1','2017-02-16 11:01:17'),(362,1,7,'Sub B5,SBB5,1','2017-02-16 11:03:52'),(363,1,8,'Sub B6,SBB6,1','2017-02-16 11:05:59'),(364,1,9,'Sub B5,SBB5,1','2017-02-16 11:07:25'),(365,1,1,NULL,'2017-02-16 11:07:54'),(366,1,9,'Sub B6,SBB6,1','2017-02-16 11:08:12'),(367,1,1,NULL,'2017-02-16 11:11:15'),(368,1,9,'Sub B4,SBB4,1','2017-02-16 11:11:45'),(369,1,1,NULL,'2017-02-16 11:12:10'),(370,1,9,'Sub B3,SBB3,1','2017-02-16 11:15:49'),(371,1,1,NULL,'2017-02-16 11:17:36'),(372,1,8,'Sub B3,SBB3,1','2017-02-16 11:18:03'),(373,1,9,'Sub B3,SBB3,1','2017-02-16 11:18:16'),(374,1,1,NULL,'2017-02-17 03:06:55'),(375,1,10,'2,1','2017-02-17 03:07:50'),(376,1,1,NULL,'2017-02-17 03:15:15'),(377,1,10,'4,1','2017-02-17 03:15:40'),(378,1,1,NULL,'2017-02-17 03:34:56'),(379,1,10,'7,1','2017-02-17 03:35:22'),(380,1,11,'7,1','2017-02-17 03:40:56'),(381,1,11,'7,1','2017-02-17 03:41:37'),(382,1,11,'7,1','2017-02-17 03:41:55'),(383,1,1,NULL,'2017-02-17 04:06:32'),(384,1,11,'6,1','2017-02-17 04:10:16'),(385,1,11,'2,1','2017-02-17 04:10:33'),(386,1,1,NULL,'2017-02-17 04:50:28'),(387,1,12,'2,1,1','2017-02-17 04:59:55'),(388,1,1,NULL,'2017-02-17 05:00:32'),(389,1,12,'1,1,1','2017-02-17 05:01:27'),(390,1,12,'4,1,1','2017-02-17 05:15:32'),(391,1,1,NULL,'2017-02-17 06:50:48'),(392,1,12,'7,1,2','2017-02-17 07:25:31'),(393,1,13,'6,1','2017-02-17 07:29:19'),(394,1,1,NULL,'2017-02-17 07:29:54'),(395,1,13,'2,1','2017-02-17 07:30:13'),(396,1,13,'7,1','2017-02-17 07:30:24'),(397,1,14,'4,Teste 355,Teste','2017-02-17 07:40:35'),(398,1,1,NULL,'2017-02-17 08:36:57'),(399,1,14,'1,Sérgio Moura,Cliente PF','2017-02-17 08:37:20'),(400,1,15,'8,Teste Pessoa Jurídica 1','2017-02-17 08:41:09'),(401,1,14,'8,Teste Pessoa Jurídica 1,TPJ 1','2017-02-17 08:41:41'),(402,1,14,'8,Teste Pessoa Jurídica 1,TPJ 1','2017-02-17 08:41:57'),(403,1,1,NULL,'2017-02-19 03:08:03'),(404,1,1,NULL,'2017-02-19 03:23:26'),(405,1,1,NULL,'2017-02-19 11:37:35'),(406,1,1,NULL,'2017-02-21 07:25:34'),(407,1,1,NULL,'2017-03-06 09:02:15'),(408,1,1,NULL,'2017-03-06 10:32:49'),(409,1,1,NULL,'2017-03-07 11:37:56'),(410,1,1,NULL,'2017-03-07 13:22:07'),(411,1,1,NULL,'2017-03-08 00:57:19'),(412,1,1,NULL,'2017-03-08 10:54:58'),(413,1,1,NULL,'2017-03-08 14:22:52'),(414,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-02-01,2017-02-28,1','2017-03-08 15:04:18'),(415,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-02-02,2017-02-28,1','2017-03-08 15:06:32'),(416,1,16,'1,ADP2,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,','2017-03-08 15:17:40'),(417,1,16,'1,ADP2,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,','2017-03-08 15:18:13'),(418,1,16,'1,ADP2,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 15:37:39'),(419,1,16,'1,ADP22,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 15:40:58'),(420,1,16,'1,ADP,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 15:41:48'),(421,1,16,'1,ADP1,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 15:44:51'),(422,1,16,'1,ADP1,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,','2017-03-08 16:16:26'),(423,1,16,'1,ADP1,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 16:16:32'),(424,1,16,'1,ADP,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 16:17:50'),(425,1,16,'1,ADP,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 16:18:41'),(426,1,16,'1,ADP,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,','2017-03-08 16:22:31'),(427,1,16,'1,ADP,Aratuba dos Palmares 2,2,1,2017-01-02,2017-02-28,1','2017-03-08 16:23:11'),(428,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-01-02,2017-02-28,1','2017-03-08 16:25:26'),(429,1,1,NULL,'2017-03-08 23:58:25'),(430,1,1,NULL,'2017-03-09 08:16:35'),(431,1,17,'0,Teste de Projeto 1,tetet,3,4,2017-03-01,2017-04-30,1','2017-03-09 08:42:14'),(432,1,1,NULL,'2017-03-09 08:44:24'),(433,1,17,'0,AAATeste,AAAA1,1,1,2017-03-09,2017-03-31,1','2017-03-09 08:50:27'),(434,1,1,NULL,'2017-03-09 08:54:42'),(435,1,17,'0,BBBTeste,BBB1,2,4,2017-03-01,2017-03-31,1','2017-03-09 08:56:02'),(436,1,17,'0,CCC1,CCCC22,1,6,2017-03-01,2017-03-31,1','2017-03-09 08:57:17'),(437,1,16,'3,CNT,Centro,6,1,2017-03-01,2017-03-31,1','2017-03-09 08:58:07'),(438,1,1,NULL,'2017-03-09 09:30:30'),(439,1,17,'0,DDDTeste,DDD,8,2,2017-03-01,2017-03-29,1','2017-03-09 09:39:54'),(440,1,17,'0,Teste EEE,EEE,3,4,2017-03-01,2017-03-31,','2017-03-09 09:53:14'),(441,1,16,'10,EEE,Teste EEE,3,4,2017-03-01,2017-03-31,1','2017-03-09 09:53:35'),(442,1,17,'0,Teste FFF,FFF,4,4,2017-03-01,2017-03-31,1','2017-03-09 09:55:14'),(443,1,1,NULL,'2017-03-09 11:32:47'),(444,1,1,NULL,'2017-03-09 14:08:35'),(445,1,18,'0,1,Área 3,A3','2017-03-09 14:25:14'),(446,1,1,NULL,'2017-03-09 14:25:33'),(447,1,18,'0,1,Área 4,A4','2017-03-09 14:30:42'),(448,1,1,NULL,'2017-03-09 14:31:02'),(449,1,18,'0,1,Área 5,A5','2017-03-09 14:33:00'),(450,1,1,NULL,'2017-03-09 14:34:41'),(451,1,18,'0,1,Área 6,A6','2017-03-09 14:35:05'),(452,1,1,NULL,'2017-03-09 14:40:54'),(453,1,18,'0,1,Área 7,A7','2017-03-09 14:41:24'),(454,1,1,NULL,'2017-03-09 14:44:02'),(455,1,1,NULL,'2017-03-09 14:45:30'),(456,1,18,'0,1,Área 8,A8','2017-03-09 14:46:30'),(457,1,18,'0,1,Área 9,A9','2017-03-09 14:49:48'),(458,1,18,'0,1,Área 10,A10','2017-03-09 14:51:05'),(459,1,18,'0,1,Área 11,A 11','2017-03-09 15:00:07'),(460,1,1,NULL,'2017-03-09 16:09:27'),(461,1,1,NULL,'2017-03-09 16:09:29'),(462,1,1,NULL,'2017-03-09 16:09:30'),(463,1,1,NULL,'2017-03-09 16:09:31'),(464,1,1,NULL,'2017-03-09 16:09:32'),(465,1,1,NULL,'2017-03-09 16:09:32'),(466,1,1,NULL,'2017-03-09 16:09:33'),(467,1,1,NULL,'2017-03-09 16:09:34'),(468,1,1,NULL,'2017-03-09 16:09:44'),(469,1,1,NULL,'2017-03-09 16:09:46'),(470,1,1,NULL,'2017-03-09 16:13:53'),(472,1,19,'8,A6,Área 6,1','2017-03-09 16:27:34'),(473,1,19,'8,A6,Área 6,1','2017-03-09 16:34:24'),(474,1,19,'8,A6,Área 6,1','2017-03-09 16:37:37'),(475,1,1,NULL,'2017-03-09 21:23:34'),(476,1,19,'8,A6,Área 6,1','2017-03-09 21:24:23'),(477,1,19,'8,A61,Área 61,1','2017-03-09 21:26:35'),(478,1,1,NULL,'2017-03-10 02:44:03'),(479,1,20,'13,Área 11,A 11,1','2017-03-10 03:08:16'),(480,1,20,'6,Área 4,A4,1','2017-03-10 04:00:16'),(481,1,20,'7,Área 5,A5,1','2017-03-10 04:00:20'),(482,1,20,'5,Área 3,A3,1','2017-03-10 04:00:23'),(483,1,20,'8,Área 61,A61,1','2017-03-10 04:00:26'),(484,1,20,'10,Área 8,A8,1','2017-03-10 04:00:28'),(485,1,20,'12,Área 10,A10,1','2017-03-10 04:00:31'),(486,1,20,'9,Área 7,A7,1','2017-03-10 04:00:34'),(487,1,20,'11,Área 9,A9,1','2017-03-10 04:00:38'),(488,1,1,NULL,'2017-03-10 07:20:36'),(489,1,1,NULL,'2017-03-10 14:30:19'),(490,1,1,NULL,'2017-03-10 19:33:36'),(491,1,1,NULL,'2017-03-11 01:52:28'),(492,1,1,NULL,'2017-03-11 03:41:15'),(493,1,21,'Teste 3,Manual.PDF,1','2017-03-11 03:45:03'),(494,1,21,'Teste 2,Comprovante-Condomínio2.pdf,2','2017-03-11 03:45:03'),(495,1,21,'Teste1,Comprovante-Condomínio1.pdf,3','2017-03-11 03:45:03'),(496,1,1,NULL,'2017-03-11 05:19:40'),(497,1,1,NULL,'2017-03-11 05:31:24'),(498,1,1,NULL,'2017-03-11 08:01:05'),(499,1,21,'Teste 7,Boleto Condomínio 1.jpg,image/jpeg,603923,0','2017-03-11 08:35:15'),(500,1,1,NULL,'2017-03-11 10:48:30'),(501,1,21,'Teste 7,Boleto Condomínio 1.jpg,image/jpeg,603923,0','2017-03-11 10:49:16'),(502,1,1,NULL,'2017-03-11 22:04:45'),(503,1,21,'ewwwew,Comprovante-Condomínio2.pdf,application/pdf,33436,20','2017-03-11 22:18:52'),(504,1,21,'sdfssef,Comprovante-Condomínio1.pdf,application/pdf,33765,21','2017-03-11 22:18:52'),(505,1,21,'sdfsd,aarteweb.pdf,application/pdf,0,22','2017-03-11 22:18:52'),(506,1,1,NULL,'2017-03-12 01:28:32'),(507,1,21,'Teste 9,Esboço.png,image/png,639979,23','2017-03-12 01:38:08'),(508,1,21,'Teste 8,ContaTaiana.png,image/png,266416,24','2017-03-12 01:38:08'),(509,1,21,'teste 10,transferência-valtemir.png,image/png,123109,26','2017-03-12 01:40:59'),(510,1,21,'Teste 12,ContaTaiana.png,image/png,266416,28','2017-03-12 01:57:30'),(511,1,21,'Teste 11,Comprovante-Condomínio2.pdf,application/pdf,33436,29','2017-03-12 01:57:30'),(512,1,21,'teste 13,ResultadosMariana.pdf,application/pdf,1296362,31','2017-03-12 02:07:26'),(513,1,21,'Teste 14,NF_LePostiche.pdf,application/pdf,223741,33','2017-03-12 02:44:22'),(514,1,21,'wtwetwhdfdgdwer4etter,VIVOSERGIO022017.pdf,application/pdf,234474,35','2017-03-12 02:47:06'),(515,1,21,'teeerrrrrrrrrr,IMG_13022017_120046.png,image/png,246033,36','2017-03-12 02:48:27'),(516,1,21,'teste 111,Comprovante-Condomínio2.pdf,application/pdf,33436,37','2017-03-12 02:50:25'),(517,1,21,'teste 22,Comprovante-Condomínio2.pdf,application/pdf,33436,39','2017-03-12 02:52:30'),(518,1,21,'teste 16,Comprovante-Condomínio1.pdf,application/pdf,33765,40','2017-03-12 02:52:31'),(519,1,21,'teste 1,Cadastro EspaçoBabyAcademia.txt,text/plain,107,41','2017-03-12 02:52:31'),(520,1,21,'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr,Manual.PDF,application/pdf,0,42','2017-03-12 02:58:47'),(521,1,21,'rrrrrrrrrrrrrrrrrrrrrr,Comprovante-Condomínio2.pdf,application/pdf,33436,43','2017-03-12 02:58:47'),(522,1,21,'rrrrrrrrr,Comprovante-Condomínio1.pdf,application/pdf,33765,44','2017-03-12 02:58:47'),(523,1,21,'333423,Esboço.png,image/png,639979,45','2017-03-12 03:01:05'),(524,1,21,'555555555555555555555555,ContaTaiana.png,image/png,266416,46','2017-03-12 03:01:05'),(525,1,21,'werwe222225,Comprovante-Condomínio2.pdf,application/pdf,33436,47','2017-03-12 03:16:18'),(526,1,21,'2aaaaa,Comprovante-Condomínio1.pdf,application/pdf,33765,48','2017-03-12 03:16:18'),(527,1,21,'42345fvvf,Cadastro EspaçoBabyAcademia.txt,text/plain,107,49','2017-03-12 03:16:18'),(528,1,1,NULL,'2017-03-12 04:06:01'),(529,1,21,'t3,NF_LePostiche.pdf,application/pdf,223741,50','2017-03-12 04:06:57'),(530,1,21,'t2,Manual.PDF,application/pdf,0,51','2017-03-12 04:06:58'),(531,1,21,'t1,Comprovante-Condomínio1.pdf,application/pdf,33765,52','2017-03-12 04:06:58'),(532,1,1,NULL,'2017-03-13 14:35:43'),(533,1,22,'22,sdfsd,158c4a1fcd69b1','2017-03-13 15:07:56'),(534,1,22,'42,rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr,158c4e3972fd53','2017-03-13 15:08:02'),(535,1,22,'51,t2,158c4f391ed76f','2017-03-13 15:08:05'),(536,1,22,'52,t1,158c4f3920a81f','2017-03-13 15:08:20'),(537,1,22,'3,Teste1,158c39cefe61ed','2017-03-13 15:08:30'),(538,1,22,'5,Teste 5,158c3d948bee8f','2017-03-13 15:08:33'),(539,1,22,'6,teste 6,158c3e04d75a41','2017-03-13 15:08:37'),(540,1,22,'20,ewwwew,158c4a1fc08ca1','2017-03-13 15:08:43'),(541,1,22,'23,Teste 9,158c4d0b08aa90','2017-03-13 15:08:46'),(542,1,22,'24,Teste 8,158c4d0b0c7940','2017-03-13 15:08:49'),(543,1,22,'28,Teste 12,158c4d53a323b8','2017-03-13 15:08:51'),(544,1,22,'31,teste 13,158c4d78ea21f9','2017-03-13 15:08:53'),(545,1,22,'33,Teste 14,158c4e0362dbe5','2017-03-13 15:08:55'),(546,1,22,'26,teste 10,158c4d15aebda4','2017-03-13 15:08:57'),(547,1,22,'37,teste 111,158c4e1a1bc109','2017-03-13 15:09:07'),(548,1,22,'39,teste 22,158c4e21ebb63a','2017-03-13 15:09:09'),(549,1,22,'35,wtwetwhdfdgdwer4etter,158c4e0da480f6','2017-03-13 15:09:11'),(550,1,22,'36,teeerrrrrrrrrr,158c4e12b16da4','2017-03-13 15:09:15'),(551,1,22,'7,Teste 7,158c3e0a7e7d0c','2017-03-13 15:09:23'),(552,1,22,'21,sdfssef,158c4a1fc50e61','2017-03-13 15:09:26'),(553,1,22,'40,teste 16,158c4e21ef1584','2017-03-13 15:09:29'),(554,1,22,'41,teste 1,158c4e21f080a1','2017-03-13 15:09:32'),(555,1,22,'43,rrrrrrrrrrrrrrrrrrrrrr,158c4e3974ca90','2017-03-13 15:09:35'),(556,1,22,'44,rrrrrrrrr,158c4e39777cb3','2017-03-13 15:09:39'),(557,1,22,'45,333423,158c4e42165ff9','2017-03-13 15:09:43'),(558,1,22,'46,555555555555555555555555,158c4e4218f9da','2017-03-13 15:09:54'),(559,1,22,'49,42345fvvf,158c4e7b29b45b','2017-03-13 15:10:03'),(560,1,22,'47,werwe222225,158c4e7b24fbe9','2017-03-13 15:10:10'),(561,1,22,'48,2aaaaa,158c4e7b2906ec','2017-03-13 15:10:16'),(562,1,22,'4,Teste 4,158c3d917d0c90','2017-03-13 15:10:29'),(563,1,22,'50,t3,158c4f391699aa','2017-03-13 15:10:32'),(564,1,21,'Sérgio Moura,SergioMoura.jpg,image/jpeg,22536,53','2017-03-13 15:11:12'),(565,1,22,'53,Sérgio Moura,158c6e0c0411e0','2017-03-13 15:11:24'),(566,1,1,NULL,'2017-03-14 00:58:51'),(567,1,21,'Teste 4,11 (1).jpg,image/jpeg,61735,54','2017-03-14 01:43:27'),(568,1,21,'Teste 3,8_dodecaedro_e_icosaedro.jpg,image/jpeg,79980,55','2017-03-14 01:43:27'),(569,1,21,'teste 5,4directions-SZ-128x128.ico,image/x-icon,99678,57','2017-03-14 02:00:43'),(570,1,21,'teste 1,___orange_sky____by_lionyigit.jpg,image/jpeg,796129,59','2017-03-14 02:00:43'),(571,1,21,'Teste 7,4directions-SZ-128x128.ico,image/x-icon,99678,60','2017-03-14 02:13:56'),(572,1,21,'Teste,02_falando_ingles.jpg,image/jpeg,126657,61','2017-03-14 02:13:56'),(573,1,21,'Teste X,___orange_sky____by_lionyigit.jpg,image/jpeg,796129,65','2017-03-14 02:14:10'),(574,1,21,'asfasdasasd,arrow2.png,image/png,245,66','2017-03-14 02:17:49'),(575,1,21,'Teste XX,addressbook.png,image/png,2004,68','2017-03-14 02:17:49'),(576,1,21,'Teste 9879,aids.jpg,image/jpeg,30966,70','2017-03-14 02:18:23'),(577,1,1,NULL,'2017-04-01 10:00:04'),(578,1,1,NULL,'2017-04-02 09:09:20'),(579,1,1,NULL,'2017-04-04 03:38:12'),(580,1,1,NULL,'2017-04-04 04:24:37'),(581,1,2,NULL,'2017-04-04 17:07:21'),(582,1,1,NULL,'2017-04-05 00:31:48'),(583,1,1,NULL,'2017-04-05 00:33:05'),(584,1,1,NULL,'2017-04-05 00:49:02'),(585,1,1,NULL,'2017-04-05 23:45:32'),(586,1,1,NULL,'2017-04-06 03:38:17'),(587,1,1,NULL,'2017-04-06 04:09:42'),(588,1,1,NULL,'2017-04-06 05:44:47'),(589,1,1,NULL,'2017-04-06 07:33:09'),(590,1,1,NULL,'2017-04-06 07:34:04'),(591,1,1,NULL,'2017-04-06 07:35:16'),(592,1,1,NULL,'2017-04-06 08:47:11'),(593,1,18,'0,1,Área 3,A3','2017-04-06 12:38:30'),(594,1,20,'5,Área 3,A3,1','2017-04-06 12:38:45'),(595,1,19,'2,A2,Area 21,1','2017-04-06 12:38:55'),(596,1,22,'29,Teste 11,158c4d53a6e78e','2017-04-06 13:20:55'),(597,1,22,'54,Teste 4,158c774efa9202','2017-04-06 13:25:16'),(598,1,22,'2,Teste 2,158c39cefcb075','2017-04-06 14:41:41'),(599,1,21,'asdddd,Comprovante-Condomínio2.pdf,application/pdf,33436,71','2017-04-06 16:19:09'),(600,1,21,'asdasd,Comprovante-Condomínio1.pdf,application/pdf,33765,72','2017-04-06 16:19:09'),(601,1,21,'sdasd,Cadastro EspaçoBabyAcademia.txt,text/plain,107,73','2017-04-06 16:19:09'),(602,1,21,'f,Comprovante-Condomínio2.pdf,application/pdf,33436,74','2017-04-06 16:27:54'),(603,1,21,'dddd,Comprovante-Condomínio1.pdf,application/pdf,33765,75','2017-04-06 16:27:55'),(604,1,21,'asd,Boleto Condomínio 2.jpg,image/jpeg,594469,76','2017-04-06 16:27:55'),(605,1,21,'ultraaa,Cadastro EspaçoBabyAcademia.txt,text/plain,107,80','2017-04-06 16:46:15'),(606,1,21,'questa,VIVOSERGIO022017.pdf,application/pdf,234474,81','2017-04-06 16:58:45'),(607,1,21,'transf,Transferir para Sérgio.xlsx,application/octet-stream,9425,82','2017-04-06 17:00:39'),(608,1,21,'ccopiacprvante,Comprovante-Condomínio1.pdf,application/pdf,33765,83','2017-04-06 17:00:40'),(609,1,21,'ataulfo,NF_LePostiche.pdf,application/pdf,223741,84','2017-04-06 17:02:09'),(610,1,21,'godofredo,IMG_13022017_120046.png,image/png,246033,85','2017-04-06 17:02:09'),(611,1,21,'mes4Aquarela,NFSE-AQUARELA-04-2017.pdf,application/pdf,372585,86','2017-04-06 17:07:21'),(612,1,21,'mes3Aquarela,NFSE-AQUARELA-03-2017.pdf,application/pdf,77227,87','2017-04-06 17:07:21'),(613,1,21,'edbrinq2,NFSE-EDUCARBRINCANDO-02-2017.pdf,application/pdf,83325,88','2017-04-06 17:10:25'),(614,1,21,'cesma4,NFSE-CESMA-04-2017.pdf,application/pdf,370832,89','2017-04-06 17:10:25'),(615,1,1,NULL,'2017-04-06 18:42:12'),(616,1,21,'piaget2,NFSE-PIAGET-02-2017.pdf,application/pdf,83880,91','2017-04-06 18:43:44'),(617,1,21,'Teste 5 +,NFSE-PIAGET-03-2017.pdf,application/pdf,77065,92','2017-04-06 18:44:00'),(618,1,22,'65,Teste X,158c77c2298d25','2017-04-06 18:49:21'),(619,1,22,'61,Teste,158c77c14e1e1d','2017-04-06 18:49:31'),(620,1,22,'59,teste 1,158c778fb9a685','2017-04-06 18:49:34'),(621,1,22,'71,asdddd,158e694ad07465','2017-04-06 18:49:40'),(622,1,22,'92,Teste 5 +,158e6b6a03c438','2017-04-06 18:49:44'),(623,1,22,'91,piaget2,158e6b68fc91b5','2017-04-06 18:49:46'),(624,1,22,'89,cesma4,158e6a0b1bb5a5','2017-04-06 18:49:49'),(625,1,22,'88,edbrinq2,158e6a0b198045','2017-04-06 18:49:51'),(626,1,22,'87,mes3Aquarela,158e69ff9445c5','2017-04-06 18:49:56'),(627,1,1,NULL,'2017-04-06 21:12:19'),(628,1,1,NULL,'2017-04-06 23:56:35'),(629,1,18,'0,1,Área 4,A4','2017-04-07 00:28:05'),(630,1,1,NULL,'2017-04-07 03:36:05'),(631,1,1,NULL,'2017-04-08 01:25:22'),(632,1,18,'0,1,Área 5,A5','2017-04-08 03:15:16'),(633,1,1,NULL,'2017-04-08 06:06:29'),(634,1,23,'2,Documento 2,18,1,1','2017-04-08 06:13:49'),(635,1,23,'1,Documento 11,15,7,1','2017-04-08 06:28:42'),(636,1,23,'1,Documento 1,12,6,1','2017-04-08 06:29:45'),(637,1,23,'1,Documento 11,15,7,1','2017-04-08 06:30:47'),(638,1,23,'1,Documento 1,14,6,1','2017-04-08 06:33:06'),(639,1,1,NULL,'2017-04-08 06:48:25'),(640,1,1,NULL,'2017-04-08 15:57:58'),(641,1,1,NULL,'2017-04-08 16:31:46'),(642,1,23,'1,Documento 1,14,1,1','2017-04-08 16:32:26'),(643,1,23,'2,Documento 2,18,1,1','2017-04-08 16:35:02'),(644,1,23,'2,Documento 2,18,1,1','2017-04-08 16:36:15'),(645,1,23,'2,Documento 2,15,7,1','2017-04-08 16:40:02'),(646,1,23,'3,Documento 3,15,2,1','2017-04-08 16:42:43'),(647,1,23,'1,Documento 1,15,2,1','2017-04-08 16:42:53'),(648,1,23,'1,Documento 1,15,6,1','2017-04-08 16:43:15'),(649,1,23,'2,Documento 233,14,2,1','2017-04-08 16:50:34'),(650,1,1,NULL,'2017-04-08 23:23:14'),(651,1,1,NULL,'2017-04-09 02:43:45'),(652,1,23,'1,Documento 12,15,7,1','2017-04-09 03:02:33'),(653,1,23,'1,Documento 1,14,7,1','2017-04-09 03:03:16'),(654,1,23,'2,Documento 233,18,1,1','2017-04-09 03:56:09'),(655,1,23,'1,Documento 11,16,1,1','2017-04-09 04:03:57'),(656,1,23,'1,Documento 1,15,6,1','2017-04-09 04:04:13'),(657,1,24,'0,Doc Teste 5,14,1,1','2017-04-09 04:38:38'),(658,1,24,'0,Doc Teste 6,16,7,1','2017-04-09 04:41:05'),(659,1,24,'0,Doc Teste 7,14,6,1','2017-04-09 04:41:30'),(660,1,20,'6,Área 4,A4,1','2017-04-09 05:21:46'),(662,1,25,'4,Documento 44,1,14','2017-04-09 05:35:43'),(663,1,25,'5,Doc Teste 5,1,14','2017-04-09 05:35:48'),(664,1,25,'1,Documento 1,6,15','2017-04-09 05:35:50'),(665,1,24,'0,teste 4,1,2,1','2017-04-09 05:36:04'),(666,1,25,'8,teste 4,2,1','2017-04-09 05:36:11'),(667,1,22,'81,questa,158e69df554c37','2017-04-09 05:38:09'),(668,1,25,'2,Documento 233,1,18','2017-04-09 05:44:34'),(669,1,24,'0,tetetete,2,2,1','2017-04-09 05:44:43'),(670,1,1,NULL,'2017-04-15 18:43:18'),(671,1,1,NULL,'2017-04-15 21:12:39'),(672,1,24,'0,Mais um outro,14,1,1','2017-04-16 01:28:44'),(673,1,24,'0,Credo,18,2,1','2017-04-16 03:39:44'),(674,1,23,'10,Outro documento,2,2,1','2017-04-16 04:16:53'),(675,1,23,'10,Outro documento,2,2,1','2017-04-16 04:17:15'),(676,1,1,NULL,'2017-04-16 04:30:46'),(677,1,23,'10,Outro documento,2,2,1','2017-04-16 04:35:22'),(678,1,23,'10,Outro documento,2,2,1','2017-04-16 04:36:07'),(679,1,23,'10,Outro documento,2,2,1','2017-04-16 04:39:46'),(680,1,23,'10,Outro documento,2,2,1','2017-04-16 05:17:10'),(681,1,23,'10,Outro documento,2,2,1','2017-04-16 05:18:49'),(682,1,23,'11,Mais um outro,14,1,1','2017-04-16 05:19:25'),(683,1,23,'12,Credo,18,2,1','2017-04-16 05:23:16'),(684,1,23,'12,Credo,18,2,1','2017-04-16 05:24:46'),(685,1,23,'12,Credo,18,2,1','2017-04-16 05:27:26'),(686,1,23,'12,Credo,18,2,1','2017-04-16 05:28:11'),(687,1,23,'10,Outro documento,2,2,1','2017-04-16 06:18:58'),(688,1,24,'0,DocExame,15,2,1','2017-04-16 06:26:18'),(689,1,24,'0,Candomblé,18,1,1','2017-04-16 06:26:37'),(690,1,24,'0,Banda Flor,14,1,1','2017-04-16 06:27:00'),(691,1,23,'11,Mais um outro,14,1,1','2017-04-16 06:28:29'),(692,1,23,'14,DocExame,15,2,1','2017-04-16 06:29:04'),(693,1,23,'15,Candomblé,18,1,1','2017-04-16 06:29:19'),(694,1,23,'11,Mais um outro,14,1,1','2017-04-16 06:30:47'),(695,1,23,'11,Mais um outro,14,1,1','2017-04-16 06:31:41'),(696,1,23,'15,Candomblé,18,1,1','2017-04-16 06:32:09'),(697,1,23,'13,DocExame22,15,2,1','2017-04-16 11:23:45'),(698,1,23,'15,Candomblé,18,1,1','2017-04-16 12:21:27'),(699,1,23,'13,DocExame22,15,2,1','2017-04-16 12:21:54'),(700,1,23,'15,Candomblé,18,1,1','2017-04-16 12:22:47'),(701,1,1,NULL,'2017-04-18 19:18:02'),(702,1,1,NULL,'2017-04-18 19:45:06'),(703,1,1,NULL,'2017-04-18 21:34:19'),(704,1,1,NULL,'2017-04-18 23:45:26'),(705,1,1,NULL,'2017-04-18 23:52:07'),(706,1,1,NULL,'2017-04-19 00:05:26'),(707,1,1,NULL,'2017-04-19 00:53:35'),(708,1,1,NULL,'2017-04-19 01:11:27'),(709,1,23,'9,tetetete,2,2,1,2017-04-20','2017-04-19 01:17:46'),(710,1,23,'9,tetetete,2,2,1,2017-04-20','2017-04-19 01:18:13'),(711,1,23,'9,tetetete,2,2,1,2017-06-15','2017-04-19 01:20:14'),(712,1,23,'9,tetetete,2,2,1,2017-06-15','2017-04-19 01:21:46'),(713,1,23,'9,tetetete,2,2,1,2017-04-26','2017-04-19 01:22:06'),(714,1,1,NULL,'2017-04-19 02:25:36'),(715,1,1,NULL,'2017-04-19 05:24:39'),(716,1,23,'10,Outro documento,2,2,1,2017-04-18','2017-04-19 05:25:02'),(717,1,23,'10,Outro documento,2,2,1,2017-04-18','2017-04-19 05:32:37'),(718,1,1,NULL,'2017-04-19 07:24:04'),(719,1,23,'10,Outro documento,2,2,1,2017-04-18','2017-04-19 07:28:23'),(720,1,23,'11,Mais um outro,14,1,1,2017-04-26','2017-04-19 07:28:42'),(721,1,24,'0,TTT,1,2,1,2017-04-30T03:00:00.000Z','2017-04-19 07:31:11'),(722,1,24,'0,Gueba Gueba,14,1,1,2017-04-24','2017-04-19 07:34:17'),(723,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-01-11,2017-02-28,1','2017-04-19 08:00:22'),(724,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-01-11,2017-02-28,1','2017-04-19 08:01:41'),(725,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-01-11,2017-03-04,1','2017-04-19 08:01:51'),(726,1,23,'13,DocExame22,15,2,1,2017-04-11','2017-04-19 08:12:50'),(727,1,1,NULL,'2017-04-19 08:22:36'),(728,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-02-09,2017-04-28,1','2017-04-19 08:24:00'),(729,1,1,NULL,'2017-04-19 08:27:05'),(730,1,1,NULL,'2017-04-19 08:33:57'),(731,1,23,'16,Banda Flor,14,1,1,2017-04-19','2017-04-19 09:35:00'),(732,1,23,'17,TTT,1,2,1,2017-04-18','2017-04-19 09:37:33'),(733,1,1,NULL,'2017-04-19 14:08:08'),(734,1,1,NULL,'2017-04-19 21:35:27'),(735,1,23,'15,Candomblé,18,1,1,2017-04-28','2017-04-19 21:36:00'),(736,1,23,'14,DocExame,15,2,1,2017-04-29','2017-04-19 21:36:07'),(737,1,23,'12,Credo,18,2,1,2017-04-30','2017-04-19 21:36:16'),(738,1,1,NULL,'2017-04-19 21:53:03'),(739,1,1,NULL,'2017-04-20 03:19:47'),(740,1,1,NULL,'2017-04-20 15:31:56'),(741,1,1,NULL,'2017-04-20 15:33:08'),(742,1,1,NULL,'2017-04-20 15:35:52'),(743,1,1,NULL,'2017-04-20 17:36:51'),(744,1,1,NULL,'2017-04-20 17:38:43'),(745,1,1,NULL,'2017-04-20 22:32:13'),(746,1,1,NULL,'2017-04-21 14:53:57'),(747,1,1,NULL,'2017-04-22 00:48:56'),(748,1,1,NULL,'2017-04-22 22:40:33'),(749,1,1,NULL,'2017-04-23 02:10:05'),(750,1,1,NULL,'2017-04-23 02:11:54'),(751,1,1,NULL,'2017-04-23 04:54:14'),(752,1,1,NULL,'2017-04-23 05:21:37'),(753,1,1,NULL,'2017-04-23 07:31:27'),(754,1,1,NULL,'2017-04-23 13:21:43'),(755,1,1,NULL,'2017-04-23 14:19:52'),(756,1,1,NULL,'2017-04-23 15:25:54'),(757,1,1,NULL,'2017-04-24 01:04:24'),(758,1,26,'6','2017-04-24 04:20:42'),(759,1,26,'6','2017-04-24 04:23:07'),(760,1,26,'6','2017-04-24 04:25:58'),(761,1,26,'6','2017-04-24 04:27:21'),(762,1,26,'6','2017-04-24 04:55:34'),(763,1,26,'6','2017-04-24 04:56:00'),(764,1,1,NULL,'2017-04-24 09:11:46'),(765,1,23,'9,Documento de SUB B2,2,2,1,2017-04-26','2017-04-24 09:55:05'),(766,1,1,NULL,'2017-04-25 04:11:02'),(767,1,1,NULL,'2017-04-25 06:13:10'),(768,1,27,'50,9','2017-04-25 06:15:45'),(769,1,27,'80,13','2017-04-25 06:20:11'),(770,1,4,'Anthony,tony@avangers.com,tony,1','2017-04-25 07:05:12'),(771,1,4,'Paulo César,pcesar@faraday.com.br,pcesar,1','2017-04-25 07:06:01'),(772,1,10,'8,1','2017-04-25 07:06:21'),(773,1,10,'9,1','2017-04-25 07:06:33'),(774,1,1,NULL,'2017-04-25 14:55:49'),(775,1,1,NULL,'2017-04-25 15:12:47'),(776,1,1,NULL,'2017-04-25 16:41:41'),(777,1,1,NULL,'2017-04-26 03:37:12'),(778,1,1,NULL,'2017-04-26 08:39:08'),(779,1,1,NULL,'2017-04-26 11:09:54'),(780,1,28,'10','2017-04-26 11:13:22'),(781,1,1,NULL,'2017-04-26 14:04:55'),(783,1,28,'10','2017-04-26 14:09:04'),(784,1,29,'9','2017-04-26 14:10:02'),(785,1,28,'9','2017-04-26 14:11:22'),(786,1,28,'17','2017-04-26 14:19:24'),(787,1,28,'9','2017-04-26 14:29:09'),(788,1,28,'10','2017-04-26 14:32:12'),(789,1,28,'10','2017-04-26 14:33:30'),(790,1,28,'17','2017-04-26 14:34:44'),(791,1,28,'10','2017-04-26 14:35:11'),(792,1,1,NULL,'2017-04-26 15:00:43'),(793,1,28,'10','2017-04-26 15:19:16'),(794,1,28,'10','2017-04-26 15:28:43'),(795,1,28,'10','2017-04-27 11:11:37'),(796,1,27,'60,9','2017-04-27 11:12:24'),(797,1,26,'5','2017-04-27 11:52:28'),(798,1,28,'10','2017-04-27 12:00:22'),(799,1,26,'2','2017-04-27 12:00:23'),(800,1,1,NULL,'2017-04-28 02:27:28'),(801,1,1,NULL,'2017-04-28 11:28:29'),(802,1,1,NULL,'2017-04-29 13:29:23'),(803,1,1,NULL,'2017-04-29 17:43:08'),(804,1,26,'2','2017-04-29 17:48:41'),(805,1,26,'2','2017-04-29 17:48:51'),(806,1,28,'10','2017-04-29 17:48:51'),(807,1,24,'0,Documento,12,1,1,2017-04-30','2017-04-29 18:33:14'),(808,1,16,'1,ADP,Aratuba dos Palmares,2,1,2017-02-09,2017-04-28,1','2017-04-29 19:06:59'),(809,1,16,'1,ADP,Aratuba dos Palmares,2,8,2017-02-09,2017-04-28,1','2017-04-29 19:07:09'),(810,1,1,NULL,'2017-04-30 04:52:46'),(811,1,1,NULL,'2017-04-30 04:53:40'),(812,1,1,NULL,'2017-05-01 13:42:58'),(813,1,1,NULL,'2017-05-01 23:59:09'),(814,1,1,NULL,'2017-05-02 00:22:07'),(815,1,1,NULL,'2017-05-02 07:50:29'),(816,1,26,'2','2017-05-02 08:45:36'),(817,1,26,'2','2017-05-02 09:32:59'),(818,1,1,NULL,'2017-05-02 09:40:30'),(819,1,1,NULL,'2017-05-02 09:42:46'),(820,1,26,'7','2017-05-03 06:07:16'),(821,1,24,'0,Teste 3,2,6,1,2017-05-04','2017-05-03 09:46:29'),(822,1,8,'Tomadas Novas,TMDN,1','2017-05-03 10:03:38'),(823,1,10,'1,14','2017-05-03 10:03:50'),(824,1,12,'1,14,1','2017-05-03 10:04:02'),(825,1,16,'6,AAAA1,AAATeste,2,1,2017-03-09,2017-05-05,1','2017-05-03 10:05:16'),(826,1,18,'0,6,A,Área Única','2017-05-03 10:05:39'),(827,1,24,'0,Teste 1,19,8,6,2017-05-05','2017-05-03 10:06:03'),(828,1,30,'21,10,1,','2017-05-03 10:08:43'),(829,1,27,'10,20','2017-05-03 10:15:50'),(830,1,30,'20,11,1,','2017-05-03 10:16:23'),(831,1,27,'20,20','2017-05-03 10:18:47'),(832,1,30,'20,12,1,30,2017-05-03UTC13:19:43','2017-05-03 10:19:43'),(833,1,27,'10,21','2017-05-03 10:22:56'),(834,1,30,'21,13,1,25','2017-05-03 10:24:02'),(835,1,27,'60,10','2017-05-03 10:36:05'),(836,1,30,'10,14,70','2017-05-03 10:37:07'),(837,1,27,'25,21','2017-05-03 10:50:51'),(838,1,30,'21,15,35','2017-05-03 10:51:25'),(839,1,26,'13','2017-05-03 10:52:24'),(840,1,26,'7','2017-05-03 10:59:25'),(841,1,28,'20','2017-05-03 10:59:38'),(842,1,26,'12','2017-05-03 10:59:38'),(843,1,28,'20','2017-05-03 11:07:05'),(844,1,1,NULL,'2017-05-03 11:26:12'),(845,1,1,NULL,'2017-05-03 11:41:04'),(846,1,17,'0,Projeto A,PRJa,3,1,2017-05-10T03:00:00.000Z,2017-05-17T03:00:00.000Z,1','2017-05-03 11:47:17'),(847,1,18,'0,12,PA1,Area 1','2017-05-03 11:48:22'),(848,1,19,'9,12,PA1,Área 1','2017-05-03 11:48:38'),(849,1,18,'0,12,PA2,Área 2','2017-05-03 11:48:50'),(850,1,6,'Elétrica,ELE,1','2017-05-03 11:49:40'),(851,1,8,'Tomadas Novas,TMD1,1','2017-05-03 11:50:08'),(852,1,8,'Cabeamento,ELE2,1','2017-05-03 11:50:34'),(853,1,7,'Tomadas Novas,ELE1,1','2017-05-03 11:50:44'),(854,1,10,'1,16','2017-05-03 11:50:53'),(855,1,12,'1,16,1','2017-05-03 11:51:10'),(856,1,24,'0,Documento das Tomadas,20,9,12,2017-05-10','2017-05-03 11:52:18'),(857,1,24,'0,Documento dos Cabos,21,9,12,2017-05-10','2017-05-03 11:53:02'),(858,1,23,'22,Doc das Tomadas,20,9,12,2017-05-10','2017-05-03 11:53:31'),(859,1,23,'23,Documento dos Cabos,21,9,12,2017-05-10','2017-05-03 11:53:44'),(860,1,23,'23,Docu dos Cabos,21,9,12,2017-05-10','2017-05-03 11:53:54'),(861,1,30,'22,16,25','2017-05-03 11:55:16'),(862,1,26,'16','2017-05-03 11:55:49'),(863,1,27,'20,22','2017-05-03 11:56:05'),(864,1,1,NULL,'2017-05-03 13:21:32'),(865,1,30,'22,17,35','2017-05-03 13:24:42'),(866,1,27,'30,22','2017-05-03 13:30:32'),(867,1,30,'22,18,38','2017-05-03 13:40:02'),(868,1,27,'38,22','2017-05-03 14:49:15'),(869,1,30,'22,19,45','2017-05-03 14:51:39'),(870,1,27,'42,22','2017-05-03 14:52:33'),(871,1,30,'22,20,50','2017-05-03 14:56:58'),(872,1,27,'45,22','2017-05-03 15:03:19'),(873,1,30,'22,21,60','2017-05-03 15:04:25'),(874,1,27,'55,22','2017-05-03 15:05:00'),(875,1,30,'22,22,60','2017-05-03 15:07:19'),(876,1,27,'60,22','2017-05-03 15:08:18'),(877,1,30,'22,23,65','2017-05-03 15:25:40'),(878,1,27,'65,22','2017-05-03 15:26:33'),(879,1,30,'22,24,70','2017-05-03 15:26:55'),(880,1,27,'70,22','2017-05-03 15:27:46'),(881,1,30,'22,25,80','2017-05-03 15:28:06'),(882,1,27,'80,22','2017-05-03 15:44:52'),(883,1,30,'22,26,85','2017-05-03 15:45:24'),(884,1,27,'85,22','2017-05-03 15:48:56'),(885,1,30,'22,27,90','2017-05-03 15:49:33'),(886,1,27,'86,22','2017-05-03 16:08:21'),(887,1,30,'22,28,90','2017-05-03 16:09:01'),(888,1,27,'86,22','2017-05-03 16:14:41'),(889,1,30,'22,29,87','2017-05-03 16:15:07'),(890,1,27,'86,22','2017-05-03 16:16:44'),(891,1,30,'22,30,90','2017-05-03 16:17:02'),(892,1,27,'86,22','2017-05-03 16:46:39'),(893,1,30,'22,31,88','2017-05-03 16:46:58'),(894,1,27,'86,22','2017-05-03 16:51:07'),(895,1,30,'22,32,87','2017-05-03 16:51:41'),(896,1,27,'86,22','2017-05-03 17:03:07'),(897,1,30,'22,33,90','2017-05-03 17:03:27'),(898,1,27,'86,22','2017-05-03 17:04:27'),(899,1,30,'22,34,89','2017-05-03 17:04:40'),(900,1,27,'87,22','2017-05-03 17:05:36'),(901,1,30,'22,35,100','2017-05-03 17:06:07'),(902,1,27,'100,22','2017-05-03 17:06:17'),(903,1,28,'23','2017-05-03 17:06:45'),(904,1,1,NULL,'2017-05-04 01:12:09'),(905,1,1,NULL,'2017-05-04 10:26:08'),(906,1,28,'23','2017-05-04 10:27:08'),(907,1,1,NULL,'2017-05-05 10:56:29'),(908,1,1,NULL,'2017-05-05 14:09:48'),(909,1,1,NULL,'2017-05-05 23:59:38'),(910,1,28,'23','2017-05-06 01:17:18'),(911,1,1,NULL,'2017-05-08 09:13:05'),(912,1,1,NULL,'2017-05-08 10:35:51'),(913,1,1,NULL,'2017-05-08 14:39:05'),(914,1,1,NULL,'2017-05-09 12:06:17'),(915,1,1,NULL,'2017-05-09 16:06:30'),(916,1,1,NULL,'2017-05-09 17:19:28'),(917,1,17,'0,Projeto B,PRJB,3,1,2017-05-09T03:00:00.000Z,2017-06-30T03:00:00.000Z,1','2017-05-09 23:36:49'),(918,1,18,'0,13,Área 1 PRJB,AR1','2017-05-09 23:37:43'),(919,1,21,'CCH3,585305-1000-1454057020-expressive-dog-portraits-elke-vogelsang-14.jpg,image/jpeg,111609,1','2017-05-09 23:38:12'),(920,1,21,'CCH2,585205-1000-1454057020-expressive-dog-portraits-elke-vogelsang-1.jpg,image/jpeg,264079,2','2017-05-09 23:38:12'),(921,1,21,'CCH1,404111_498589010168836_1957634377_n.jpg,image/jpeg,55141,3','2017-05-09 23:38:13'),(922,1,24,'0,DOC1,20,11,13,2017-05-31','2017-05-09 23:38:42'),(923,1,30,'24,36,17','2017-05-10 00:15:17'),(924,1,1,NULL,'2017-05-10 06:03:03'),(925,1,1,NULL,'2017-05-10 07:31:26'),(926,1,2,NULL,'2017-05-10 07:37:13'),(927,1,31,'3,Desenhista,55.2','2017-05-10 18:26:47'),(928,1,31,'3,Desenhista,55','2017-05-10 18:30:56'),(929,1,31,'3,Desenhista,555','2017-05-10 18:31:19'),(930,1,31,'3,Desenhista,5550','2017-05-10 18:32:52'),(931,1,31,'3,Desenhista 1,32','2017-05-10 18:34:00'),(932,1,31,'3,Desenhista 1,50','2017-05-10 18:34:39'),(933,1,31,'3,Desenhista 1,55','2017-05-10 18:35:18'),(934,1,1,NULL,'2017-05-10 19:42:49'),(935,1,31,'1,Engenheiro Júnior,100','2017-05-10 20:11:02'),(936,1,31,'4,Cargo Teste,22.02','2017-05-10 20:33:13'),(937,1,31,'3,Desenhista 11,55','2017-05-10 20:36:09'),(938,1,31,'4,Cargo Teste,22.02','2017-05-10 20:42:38'),(939,1,31,'3,Desenhista 11,55','2017-05-10 20:43:19'),(940,1,31,'2,Engenheiro Sênior,120','2017-05-10 20:43:42'),(941,1,32,'5,Limpador de Parabrisas','2017-05-10 22:45:08'),(942,1,31,'4,Cargo Teste,22.06','2017-05-10 22:48:11'),(943,1,32,'6,Teste Jambeiro','2017-05-10 22:49:36'),(944,1,1,NULL,'2017-05-11 03:55:22'),(945,1,32,'7,Teste 1','2017-05-11 03:57:13'),(946,1,33,'4','2017-05-11 04:20:43'),(947,1,33,'3','2017-05-11 04:24:30'),(948,1,33,'1','2017-05-11 04:24:56'),(949,1,32,'8,Teste 2','2017-05-11 04:27:15'),(950,1,32,'9,Ataúlfo','2017-05-11 04:27:40'),(951,1,2,NULL,'2017-05-11 05:29:55'),(952,1,2,NULL,'2017-05-11 05:33:11'),(953,1,2,NULL,'2017-05-11 05:33:59'),(954,1,1,NULL,'2017-05-11 12:40:28'),(955,1,17,'0,Projeto C,PrjC,3,1,2017-05-11T19:10:01.190Z,2017-10-14T03:00:00.000Z,1','2017-05-11 16:10:59'),(956,1,1,NULL,'2017-05-11 21:00:09'),(957,1,1,NULL,'2017-05-12 04:01:42'),(958,1,1,NULL,'2017-05-12 06:13:49'),(959,1,19,'9,Área 11,PA1,12','2017-05-12 07:05:40'),(960,1,18,'0,Área 3,PA3,12','2017-05-12 07:06:11'),(961,1,19,'12,PA3,Área 31,12','2017-05-12 07:08:25'),(962,1,19,'10,PA2,Área 2,12','2017-05-12 07:08:46'),(963,1,19,'9,PA1,Área 11,12','2017-05-12 07:09:00'),(964,1,20,'12,Área 31,PA3,12','2017-05-12 07:52:02'),(965,1,21,'sws,130708Marina_nascimento 0170.jpg,image/jpeg,359288,4','2017-05-12 07:58:13'),(966,1,21,'asdasdd,130708Marina_nascimento 0166.jpg,image/jpeg,327682,5','2017-05-12 07:58:13'),(967,1,21,'asdasd,130708Marina_nascimento 0164.jpg,image/jpeg,335517,6','2017-05-12 07:58:13'),(968,1,19,'9,PA1,Área 1,12','2017-05-12 10:11:39'),(969,1,1,NULL,'2017-05-12 10:43:31'),(970,1,1,NULL,'2017-05-12 14:49:17'),(971,1,1,NULL,'2017-05-13 01:47:59'),(972,1,34,'2,Sub-área 21,SBA21,10','2017-05-13 04:36:34'),(973,1,35,'0,ASSDASD,ADAD,10','2017-05-13 05:00:46'),(974,1,34,'4,Sub-área 3,SBA3,10','2017-05-13 05:01:58'),(975,1,35,'0,Sub-área 4,SBA4,9','2017-05-13 05:02:34'),(976,1,35,'0,Sub-Área 5,SBA5,10','2017-05-13 05:04:38'),(977,1,1,NULL,'2017-05-13 06:34:01'),(978,1,36,'6,Sub-Área 5,SBA5,10','2017-05-13 12:35:11'),(979,1,36,'5,Sub-área 4,SBA4,9','2017-05-13 12:37:01'),(980,1,1,NULL,'2017-05-16 02:36:11'),(981,1,1,NULL,'2017-05-16 03:23:24'),(982,1,1,NULL,'2017-05-16 07:57:57'),(983,1,1,NULL,'2017-05-16 08:03:36'),(984,1,1,NULL,'2017-05-16 08:04:39'),(985,1,1,NULL,'2017-05-16 08:41:03'),(986,1,1,NULL,'2017-05-16 08:41:04'),(987,1,1,NULL,'2017-05-16 09:34:20'),(988,1,1,NULL,'2017-05-16 11:13:02'),(989,1,1,NULL,'2017-05-16 14:17:22'),(990,1,1,NULL,'2017-05-16 15:57:35'),(991,1,1,NULL,'2017-05-16 22:41:55'),(992,1,1,NULL,'2017-05-17 05:30:25'),(993,1,1,NULL,'2017-05-17 09:04:40'),(994,1,1,NULL,'2017-05-17 16:38:47'),(995,1,33,'8','2017-05-17 16:40:06'),(996,1,33,'5','2017-05-17 16:40:09'),(997,1,33,'2','2017-05-17 16:40:14'),(998,1,1,NULL,'2017-05-19 04:20:28'),(999,1,6,'Hidráulica,HDR,1','2017-05-19 11:37:19'),(1000,1,8,'Tubulações,HDR1,1','2017-05-19 11:37:53'),(1001,1,8,'Válvulas,HDR2,1','2017-05-19 11:38:11'),(1002,1,10,'1,17','2017-05-19 11:38:20'),(1003,1,10,'8,17','2017-05-19 11:38:24'),(1004,1,12,'1,17,1','2017-05-19 11:38:31'),(1005,1,12,'8,17,1','2017-05-19 11:38:36'),(1006,1,1,NULL,'2017-05-20 01:02:27'),(1007,1,1,NULL,'2017-05-20 08:15:48'),(1008,1,1,NULL,'2017-05-20 09:26:33'),(1009,1,23,'25,Documento 1,DOC1,2017-05-18,12,20,5','2017-05-20 09:51:39'),(1010,1,23,'25,Documento 1,DOC1,2017-05-20,12,21,1','2017-05-20 10:01:37'),(1011,1,23,'25,Documento 1,DOC1,2017-05-20,12,21,4','2017-05-20 10:08:14'),(1012,1,23,'25,Documento 1,DOC1,2017-05-21,12,21,2','2017-05-20 10:24:05'),(1013,1,24,'0,Documento 8,DOC8,2017-06-30,12,23,2','2017-05-20 10:57:29'),(1014,1,24,'0,Documento 9,DOC9,2017-07-31,12,21,2','2017-05-20 10:59:17'),(1015,1,23,'31,Documento 7,DOC7,2017-05-31,12,23,4','2017-05-20 11:02:53'),(1016,1,24,'0,Documento 10,DOC10,2017-07-28,12,21,4','2017-05-20 11:04:02'),(1017,1,24,'0,Documento 11,DOC11,2017-05-16,12,23,5','2017-05-20 11:16:57'),(1018,1,23,'28,Documento 4,DOC4,2017-05-13,12,21,1','2017-05-20 11:17:17'),(1019,1,23,'28,Documento 4,DOC4,2017-05-13,12,21,1','2017-05-20 11:18:01'),(1020,1,24,'0,Documento 12,DOC12,2017-05-09,12,23,4','2017-05-20 11:18:50'),(1021,1,25,'36,Documento 12,4,23','2017-05-20 11:47:13'),(1022,1,17,'0,Projeto C,PrjC,3,9,2017-05-20T16:31:49.487Z,2017-07-31T03:00:00.000Z,1','2017-05-20 13:32:31'),(1023,1,18,'0,Área 1 PD,PDA1,15','2017-05-20 13:34:42'),(1024,1,18,'0,Área 2 PD,PDA2,15','2017-05-20 13:35:09'),(1025,1,35,'0,Sub-área 1,PDA1.1,12','2017-05-20 13:35:55'),(1026,1,17,'0,Projeto E,PrjE,4,9,2017-05-20T03:00:00.000Z,2017-05-20T19:24:50.825Z,1','2017-05-20 16:26:04'),(1027,1,16,'12,PRJa,Projeto A,3,1,2017-04-03,2017-05-17,1','2017-05-20 16:59:29'),(1028,1,16,'12,PRJa,Projeto A,3,1,2017-04-03,2017-05-17,1','2017-05-20 16:59:41'),(1029,1,17,'0,Projeto E,PrjE,3,4,2017-05-20T20:00:26.127Z,2017-07-29T03:00:00.000Z,1','2017-05-20 17:01:08'),(1030,1,1,NULL,'2017-05-21 00:15:17'),(1031,1,24,'0,Documento 16,DOC16,2017-05-25,12,22,4','2017-05-21 00:33:14'),(1032,1,24,'0,Doc Teste,DT1,2017-05-28,12,20,4','2017-05-21 00:41:47'),(1033,1,24,'0,Doc Teste 2,DT2,2017-06-19,12,23,2','2017-05-21 00:45:03'),(1034,1,23,'39,Doc Teste 2,DT2,2017-06-19,12,23,2','2017-05-21 00:45:44'),(1035,1,1,NULL,'2017-05-21 00:46:48'),(1036,1,16,'17,PrjF,Projeto F,3,4,2017-05-20,2017-07-29,1','2017-05-21 00:47:52'),(1037,1,17,'0,Projeto G,PrjG,5,2,2017-05-31T03:00:00.000Z,2017-05-24T03:00:00.000Z,1','2017-05-21 00:49:41'),(1038,1,17,'0,Projeto H,PrjH,4,1,2017-11-30T02:00:00.000Z,2018-03-31T03:00:00.000Z,1','2017-05-21 01:03:53'),(1039,1,6,'Civil,CVL,1','2017-05-21 01:23:58'),(1040,1,5,'Civil,CIV,1','2017-05-21 01:24:49'),(1041,1,5,'Civil,CIV,1','2017-05-21 01:26:27'),(1042,1,5,'Civil,CVL,1','2017-05-21 01:27:35'),(1043,1,31,'7,Engenheiro 2,752','2017-05-21 01:47:26'),(1044,1,31,'7,Engenheiro 2,755','2017-05-21 01:49:08'),(1045,1,32,'10,Técnico 2','2017-05-21 01:49:32'),(1046,1,31,'10,Técnico 2,450.55','2017-05-21 01:49:56'),(1047,1,33,'10','2017-05-21 01:50:08'),(1048,1,17,'0,Projeto I,PrjI,5,4,2017-08-31T03:00:00.000Z,2017-09-30T03:00:00.000Z,1','2017-05-21 02:12:15'),(1049,1,16,'20,PrjI,Projeto I,5,1,2017-08-31,2017-09-30,1','2017-05-21 02:15:26'),(1050,1,16,'20,PrjI,Projeto I,5,6,2017-08-31,2017-09-30,1','2017-05-21 02:18:02'),(1051,1,5,'Civil,CIV,1','2017-05-21 03:17:13'),(1052,1,5,'Civil,CIV,1','2017-05-21 03:18:21'),(1053,1,6,'Rodovias,ROD,1','2017-05-21 03:22:47'),(1054,1,1,NULL,'2017-05-21 08:11:06'),(1055,1,1,NULL,'2017-05-21 08:16:31'),(1056,1,1,NULL,'2017-05-21 08:22:10'),(1057,1,1,NULL,'2017-05-21 10:36:31'),(1058,1,7,'Tomadas Novas2,ELE12222,0','2017-05-21 10:47:24'),(1059,1,7,'Tomadas Novas,ELE1,1','2017-05-21 10:47:36'),(1060,1,7,'Tomadas Novas,ELE1,1','2017-05-21 10:57:12'),(1061,1,8,'Conectores,ELE3,1','2017-05-21 11:20:04'),(1062,1,8,'Painéis,ELE4,1','2017-05-21 11:21:53'),(1063,1,8,'Cabou Criatividade,ELE5,1','2017-05-21 11:24:32'),(1064,1,1,NULL,'2017-05-21 12:07:38'),(1065,1,1,NULL,'2017-05-21 14:10:17'),(1066,1,1,NULL,'2017-05-21 16:57:13'),(1067,1,1,NULL,'2017-05-21 23:14:56'),(1068,1,1,NULL,'2017-05-22 05:59:30'),(1069,1,1,NULL,'2017-05-22 06:38:45'),(1070,1,1,NULL,'2017-05-22 09:05:20'),(1071,1,1,NULL,'2017-05-22 09:52:14'),(1072,1,37,'16,[4|1|9]','2017-05-22 10:00:40'),(1073,1,1,NULL,'2017-05-22 10:01:27'),(1074,1,37,'16,[1|9]','2017-05-22 10:05:41'),(1075,1,37,'16,[4|9]','2017-05-22 10:10:58'),(1076,1,37,'16,[4|9]','2017-05-22 10:12:57'),(1077,1,37,'16,[4|9|6]','2017-05-22 10:13:13'),(1078,1,37,'16,[]','2017-05-22 10:13:36'),(1079,1,37,'16,[1]','2017-05-22 10:13:50'),(1080,1,1,NULL,'2017-05-22 10:51:42'),(1081,1,38,'16,[1|6]','2017-05-22 11:01:40'),(1082,1,38,'16,[1]','2017-05-22 11:02:10'),(1083,1,23,'32,Documento 8,DOC8,2017-06-30,12,23,2','2017-05-22 11:26:36'),(1084,1,23,'30,Documento 6,DOC6,2017-05-30,12,21,2','2017-05-22 11:31:52'),(1085,1,1,NULL,'2017-05-22 14:17:53'),(1086,1,1,NULL,'2017-05-23 00:02:48'),(1087,1,1,NULL,'2017-05-23 05:21:37'),(1088,1,1,NULL,'2017-05-23 08:11:19'),(1089,1,1,NULL,'2017-05-23 16:23:16'),(1090,1,1,NULL,'2017-05-23 22:19:02'),(1091,1,1,NULL,'2017-05-23 23:03:00'),(1092,1,1,NULL,'2017-05-23 23:17:29'),(1093,1,1,NULL,'2017-05-23 23:53:54'),(1094,1,1,NULL,'2017-05-24 02:19:47'),(1095,1,1,NULL,'2017-05-25 09:01:55'),(1096,1,1,NULL,'2017-05-25 14:36:46'),(1097,1,1,NULL,'2017-05-26 00:54:24'),(1098,1,1,NULL,'2017-05-26 07:27:52'),(1099,1,1,NULL,'2017-05-27 04:05:39'),(1100,1,1,NULL,'2017-05-27 04:26:18'),(1101,1,1,NULL,'2017-05-27 04:27:18'),(1102,1,1,NULL,'2017-05-27 09:57:41'),(1103,1,1,NULL,'2017-05-27 23:46:04'),(1104,1,1,NULL,'2017-05-28 00:17:11'),(1105,1,1,NULL,'2017-05-28 04:35:54'),(1106,1,1,NULL,'2017-05-28 05:01:17'),(1107,1,1,NULL,'2017-05-28 16:07:43'),(1108,1,1,NULL,'2017-05-29 01:09:36'),(1109,1,1,NULL,'2017-05-29 03:05:18'),(1110,1,24,'0,DOC TESTE x,dtx,2017-05-31,12,23,2','2017-05-29 03:08:26'),(1111,1,23,'40,DOC TESTE x,dtx,2017-06-03,12,1,23,2','2017-05-29 03:45:51'),(1112,1,25,'40,DOC TESTE x,2,23','2017-05-29 03:46:50'),(1113,1,23,'38,Doc Teste,DT1,1,2017-07-10,12,20,4','2017-05-29 03:56:50'),(1114,1,23,'28,Documento 4,DOC4,2,2017-05-29,12,21,1','2017-05-29 04:05:59'),(1115,1,23,'28,Documento 4,DOC4,2,2017-05-29,12,21,1','2017-05-29 04:10:53'),(1116,1,1,NULL,'2017-05-29 09:26:46'),(1117,1,23,'28,Documento 4,DOC4,2,2017-05-29,12,21,1','2017-05-29 09:28:12'),(1118,1,1,NULL,'2017-05-29 11:21:29'),(1119,1,1,NULL,'2017-05-29 21:06:35'),(1120,1,1,NULL,'2017-05-30 07:17:02'),(1121,1,1,NULL,'2017-05-31 05:24:10'),(1122,1,1,NULL,'2017-05-31 05:24:10'),(1123,1,1,NULL,'2017-05-31 07:56:51'),(1124,1,1,NULL,'2017-06-05 02:39:19'),(1125,1,1,NULL,'2017-06-05 05:57:33'),(1126,1,1,NULL,'2017-06-05 08:21:03'),(1127,1,1,NULL,'2017-06-06 05:15:25'),(1128,1,1,NULL,'2017-06-06 13:27:59'),(1129,1,1,NULL,'2017-06-06 22:05:47'),(1130,1,1,NULL,'2017-06-07 01:09:35'),(1131,1,1,NULL,'2017-06-08 06:14:23'),(1132,1,1,NULL,'2017-06-08 06:59:20'),(1133,1,1,NULL,'2017-06-08 08:17:02'),(1134,1,24,'0,Teste 5,TT5,2017-06-08,12,21,5','2017-06-08 08:33:56'),(1135,1,37,'18,[2|4|1]','2017-06-08 08:35:56'),(1136,1,23,'41,Teste 5,TT5,1,2017-06-08,12,21,5','2017-06-08 08:38:11'),(1137,1,1,NULL,'2017-06-08 10:40:02'),(1138,1,1,NULL,'2017-06-08 17:07:37'),(1139,1,21,'teste,G.pdf,application/pdf,29247,7','2017-06-08 17:41:01'),(1140,1,1,NULL,'2017-06-08 19:39:39'),(1141,1,1,NULL,'2017-06-08 22:24:47'),(1142,1,1,NULL,'2017-06-09 00:19:20'),(1143,1,1,NULL,'2017-06-09 08:36:33'),(1144,1,1,NULL,'2017-06-09 11:08:28'),(1145,1,1,NULL,'2017-06-09 11:55:26'),(1146,1,18,'0,Área Única,A1,20','2017-06-09 12:05:37'),(1147,1,35,'0,Sub-área Única,SA1,14','2017-06-09 12:07:13'),(1148,1,24,'0,Documento A\',DOC A,2017-06-30,20,21,7','2017-06-09 12:08:13'),(1149,1,23,'42,Documento A,DOC A,1,2017-06-30,20,21,7','2017-06-09 12:10:29'),(1150,1,1,NULL,'2017-06-09 14:50:28'),(1151,1,1,NULL,'2017-06-09 15:18:32'),(1152,1,39,'22,12','2017-06-09 15:26:23'),(1153,1,24,'0,Documento B,DOC B,2017-06-29,20,21,7','2017-06-09 15:38:32'),(1154,1,39,'23,13','2017-06-09 15:39:55'),(1155,1,1,NULL,'2017-06-09 22:57:40'),(1156,1,1,NULL,'2017-06-10 00:32:59'),(1157,1,24,'0,Documento C,DOC C,2017-07-29,20,23,7','2017-06-10 00:34:15'),(1158,1,37,'17,[8]','2017-06-10 00:34:40'),(1159,1,37,'17,[8|1]','2017-06-10 00:34:56'),(1160,1,39,'24,14','2017-06-10 00:35:49'),(1161,1,1,NULL,'2017-06-10 06:33:15'),(1162,1,38,'17,[8|1]','2017-06-10 06:39:53'),(1163,1,1,NULL,'2017-06-10 13:15:45'),(1164,1,1,NULL,'2017-06-10 20:13:28'),(1165,1,1,NULL,'2017-06-10 21:49:39'),(1166,1,1,NULL,'2017-06-11 14:36:26'),(1167,1,24,'0,Documento D,Doc D,2017-08-10,20,22,7','2017-06-11 15:53:08'),(1168,1,39,'25,15','2017-06-11 15:54:10'),(1169,1,1,NULL,'2017-06-11 16:45:17'),(1170,1,39,'24,16','2017-06-11 16:56:31'),(1171,1,39,'24,17','2017-06-11 16:58:38'),(1172,1,24,'0,Documento E,DOC E,2017-06-29,20,24,7','2017-06-11 17:31:02'),(1173,1,39,'26,18','2017-06-11 17:33:05'),(1174,1,39,'26,19','2017-06-11 18:00:53'),(1175,1,39,'26,20','2017-06-11 18:03:32'),(1176,1,8,'Cimento,CMT,1','2017-06-11 18:20:01'),(1177,1,24,'0,F,DOC F,2017-07-27,20,21,7','2017-06-11 18:48:09'),(1178,1,39,'27,21','2017-06-11 18:49:00'),(1179,1,39,'27,22','2017-06-11 18:50:55'),(1180,1,1,NULL,'2017-06-11 21:13:48'),(1181,1,1,NULL,'2017-06-12 03:50:44'),(1182,1,39,'27,23','2017-06-12 03:53:18'),(1183,1,39,'27,24','2017-06-12 03:55:20'),(1184,1,24,'0,G,Doc G,2017-06-27,20,21,7','2017-06-12 04:19:40'),(1185,1,39,'28,25','2017-06-12 04:21:08'),(1186,1,1,NULL,'2017-06-12 06:12:40'),(1187,1,39,'28,26','2017-06-12 06:15:02'),(1188,1,39,'28,27','2017-06-12 06:21:20'),(1189,1,39,'28,28','2017-06-12 06:27:49'),(1190,1,1,NULL,'2017-06-12 06:29:27'),(1191,1,39,'28,29','2017-06-12 06:30:15'),(1192,1,39,'28,30','2017-06-12 06:32:31'),(1193,1,39,'28,31','2017-06-12 06:43:57'),(1194,10,1,NULL,'2017-06-12 16:12:54'),(1195,10,6,'Direção / Gestão,A,1','2017-06-12 16:13:26'),(1196,10,8,'Direção,A01,1','2017-06-12 16:13:47'),(1197,10,3,'Anthony Barbosa,tony@faraday.com.br,tony,1','2017-06-12 16:14:20'),(1198,1,1,NULL,'2017-06-13 09:21:56'),(1199,1,1,NULL,'2017-06-13 10:53:25'),(1200,1,1,NULL,'2017-06-14 16:41:03'),(1201,1,1,NULL,'2017-06-15 14:19:45'),(1202,1,1,NULL,'2017-06-16 07:59:31'),(1203,1,1,NULL,'2017-06-16 18:27:41'),(1204,1,1,NULL,'2017-06-17 00:11:10'),(1205,1,1,NULL,'2017-06-17 00:11:58'),(1206,1,1,NULL,'2017-06-17 00:16:04'),(1207,1,1,NULL,'2017-06-17 00:21:12'),(1208,1,1,NULL,'2017-06-17 00:24:12'),(1209,1,1,NULL,'2017-06-17 00:28:04'),(1210,1,1,NULL,'2017-06-17 00:43:51'),(1211,1,1,NULL,'2017-06-17 00:47:01'),(1212,1,1,NULL,'2017-06-17 00:48:38'),(1213,1,1,NULL,'2017-06-17 00:50:34'),(1214,1,1,NULL,'2017-06-17 07:04:05'),(1215,1,1,NULL,'2017-06-17 07:10:07'),(1216,1,1,NULL,'2017-06-17 07:10:46'),(1217,1,1,NULL,'2017-06-17 07:22:17'),(1218,1,1,NULL,'2017-06-17 07:26:54'),(1219,1,39,'25,32','2017-06-17 07:45:25'),(1220,1,17,'0,Projeto J,Prj J,4,9,2017-06-17T10:46:06.027Z,2017-06-17T10:46:06.027Z,1','2017-06-17 07:46:36'),(1221,1,18,'0,Área Única,A1,21','2017-06-17 07:46:55'),(1222,1,35,'0,Subárea Única,SUB1,15','2017-06-17 07:47:19'),(1223,1,21,'Foto 1,1214327031apGYy4e.jpg,image/jpeg,16828,8','2017-06-17 07:50:05'),(1224,1,24,'0,Freios,FR,2017-07-27,21,22,8','2017-06-17 07:51:28'),(1225,1,1,NULL,'2017-06-17 07:57:43'),(1226,1,1,NULL,'2017-06-17 07:58:06'),(1227,1,1,NULL,'2017-06-17 07:58:45'),(1228,1,1,NULL,'2017-06-17 07:59:05'),(1229,1,1,NULL,'2017-06-17 07:59:47'),(1230,1,1,NULL,'2017-06-17 08:01:10'),(1231,1,1,NULL,'2017-06-17 08:02:21'),(1232,1,1,NULL,'2017-06-17 08:03:55'),(1233,1,1,NULL,'2017-06-17 08:04:14'),(1234,1,1,NULL,'2017-06-17 08:15:51'),(1235,1,1,NULL,'2017-06-17 08:16:25'),(1236,1,1,NULL,'2017-06-17 09:41:40'),(1237,1,39,'7,33','2017-06-17 09:42:40'),(1238,1,38,'17,[8]','2017-06-17 12:04:42'),(1239,1,38,'17,[8|1]','2017-06-17 12:27:21'),(1240,1,38,'17,[1]','2017-06-17 12:27:30'),(1241,1,38,'17,[1|8]','2017-06-17 12:27:47'),(1242,1,37,'17,[8]','2017-06-17 12:27:53'),(1243,1,38,'17,[8]','2017-06-17 12:28:04'),(1244,1,38,'17,[8|1]','2017-06-17 12:28:12'),(1245,1,37,'17,[8|1]','2017-06-17 12:28:17'),(1246,1,1,NULL,'2017-06-17 18:49:51'),(1247,1,32,'10,Engenheiro 3,300','2017-06-17 18:54:19'),(1248,1,31,'10,Engenheiro 3,900','2017-06-17 18:54:35'),(1249,1,32,'11,sdfsdf,3333','2017-06-17 19:00:49'),(1250,1,32,'12,asdasdasd,222','2017-06-17 19:02:10'),(1251,1,1,NULL,'2017-06-17 21:22:09'),(1252,1,1,NULL,'2017-06-18 03:28:28'),(1253,1,1,NULL,'2017-06-18 07:22:08'),(1254,1,6,'Teste 1,,1','2017-06-18 08:20:19'),(1255,1,6,'ssdfsdf,ttt,1','2017-06-18 08:21:37'),(1256,1,5,'Teste 1,TT1,1','2017-06-18 08:23:30'),(1257,1,6,'Teste 2,,1','2017-06-18 08:24:45'),(1258,1,6,'Teste 3,TT3,1','2017-06-18 08:26:01'),(1259,1,8,'tewwer,teeres,1','2017-06-18 08:32:26'),(1260,1,38,'26,[2|8]','2017-06-18 08:33:29'),(1261,1,37,'26,[1]','2017-06-18 08:33:45'),(1262,1,6,'Teste 4,TTT4,1','2017-06-18 08:43:03'),(1263,1,6,'Teste 5,twer,1','2017-06-18 08:43:46'),(1264,1,8,'Teste 1,TT1,1','2017-06-18 09:09:02'),(1265,1,8,'Teste 2,TT2,1','2017-06-18 09:09:27'),(1266,1,8,'Teste 3,TT3,1','2017-06-18 09:13:19'),(1267,1,1,NULL,'2017-06-18 09:36:20'),(1268,1,7,'Teste1,TT1,1','2017-06-18 09:38:10'),(1269,1,7,'Teste 1,TT1,1','2017-06-18 09:38:21'),(1270,1,1,NULL,'2017-06-18 09:40:14'),(1271,1,6,'Teste 6,TT6,1','2017-06-18 09:40:59'),(1272,1,8,'Sub  6.1,S61,1','2017-06-18 09:41:34'),(1273,1,1,NULL,'2017-06-18 09:46:18'),(1274,1,8,'SUB 6.2,S62,1','2017-06-18 09:47:35'),(1275,1,1,NULL,'2017-06-18 09:51:52'),(1276,1,8,'SUB 6.3,S63,1','2017-06-18 09:52:35'),(1277,1,1,NULL,'2017-06-18 09:56:00'),(1278,1,8,'SUB 6.4,S64,1','2017-06-18 09:56:37'),(1279,1,7,'SUB6.4,S64,1','2017-06-18 09:56:47'),(1280,1,7,'SUB 6.4,S64,1','2017-06-18 09:56:53'),(1281,1,5,'Teste 2,asda,1','2017-06-18 11:11:30'),(1282,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-06-18 12:33:39'),(1283,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-06-18 12:34:35'),(1284,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-06-18 12:36:58'),(1285,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-06-18 12:37:03'),(1286,1,4,'Teste,teste@teste.com,teeee,1','2017-06-18 12:39:53'),(1287,1,4,'Teste 2,teste2@teste.com,kkdja,1','2017-06-18 12:42:12'),(1288,1,3,'Teste 2,teste2@teste.com1,kkdja,1','2017-06-18 12:42:45'),(1289,1,3,'Teste 2,teste2@teste.com,kkdja,1','2017-06-18 12:42:54'),(1290,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-06-18 12:43:47'),(1291,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-06-18 12:54:39'),(1292,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-06-18 12:54:54'),(1293,1,5,'Direção/Gest]ap,AA,1','2017-06-18 12:56:54'),(1294,1,1,NULL,'2017-06-18 13:10:32'),(1295,1,3,'Sérgio Moura,smouracalmon@gmail.com,sergio,1','2017-06-18 13:33:30'),(1296,1,4,'UNovo,w@novo.com,asdasd,','2017-06-18 13:34:03'),(1297,1,6,'ZZZ,z,1','2017-06-18 13:36:40'),(1298,1,5,'ZZZ,z,0','2017-06-18 13:37:02'),(1299,1,15,'9,Cliente 1','2017-06-18 15:41:27'),(1300,1,15,'10,Cliente 1','2017-06-18 15:47:46'),(1301,1,15,'11,Cliente 77','2017-06-18 15:50:46'),(1302,1,15,'12,Cliente 99','2017-06-18 15:57:30'),(1303,1,14,'12,Cliente 99,Cliente 99','2017-06-18 16:01:40'),(1304,1,14,'12,Cliente 99,Cliente 99','2017-06-18 16:02:32'),(1305,1,15,'13,Cliente 100','2017-06-18 16:17:17'),(1306,1,17,'0,Projeto Diff,fidd,4,1,2017-06-27T03:00:00.000Z,2017-07-02T03:00:00.000Z,1','2017-06-18 16:47:19'),(1307,1,21,'asdasd,1214625936yZynHVd.jpg,image/jpeg,143196,9','2017-06-18 17:34:50'),(1308,1,1,NULL,'2017-06-18 20:56:32'),(1309,1,21,'fghfghfgh,1214327031apGYy4e.jpg,image/jpeg,16828,11','2017-06-18 20:57:28'),(1310,1,22,'9,asdasd,15946e3e991407','2017-06-18 22:49:12'),(1311,1,21,'eeeeeeeeee,1214751884LpWxall.jpg,image/jpeg,76772,12','2017-06-18 22:49:42'),(1312,1,21,'sdfsdfsdfee,1214625936yZynHVd.jpg,image/jpeg,143196,13','2017-06-18 22:49:43'),(1313,1,21,'211222,1214327031apGYy4e.jpg,image/jpeg,16828,14','2017-06-18 22:49:43'),(1314,1,22,'14,211222,159472db730fec','2017-06-18 22:50:06'),(1315,1,21,'aa,1214751884LpWxall.jpg,image/jpeg,76772,15','2017-06-18 22:51:03'),(1316,1,1,NULL,'2017-06-19 01:32:34'),(1317,1,21,'saseeeee 12,1214625936yZynHVd.jpg,image/jpeg,143196,16','2017-06-19 01:33:35'),(1318,1,22,'11,fghfghfgh,159471367d9cc8','2017-06-19 01:34:45'),(1319,1,22,'12,eeeeeeeeee,159472db6cd1ab','2017-06-19 01:34:48'),(1320,1,22,'15,aa,159472e06d3b14','2017-06-19 01:34:51'),(1321,1,22,'13,sdfsdfsdfee,159472db6ec410','2017-06-19 01:34:54'),(1322,1,22,'16,saseeeee 12,15947541f5b7f5','2017-06-19 01:34:57'),(1323,1,21,'3,1214751884LpWxall.jpg,image/jpeg,76772,17','2017-06-19 01:48:03'),(1324,1,21,'2,1214625936yZynHVd.jpg,image/jpeg,143196,18','2017-06-19 01:48:03'),(1325,1,21,'1,1214327031apGYy4e.jpg,image/jpeg,16828,19','2017-06-19 01:48:03'),(1326,1,21,'4,1214327031apGYy4e.jpg,image/jpeg,16828,20','2017-06-19 02:03:49'),(1327,1,22,'19,1,159475783af489','2017-06-19 02:05:41'),(1328,1,22,'17,3,1594757834e55c','2017-06-19 02:07:12'),(1329,1,22,'20,4,159475b35b18f5','2017-06-19 02:07:20'),(1330,1,22,'18,2,1594757839902a','2017-06-19 02:07:47'),(1331,1,21,'12,1214327031apGYy4e.jpg,image/jpeg,16828,21','2017-06-19 02:23:22'),(1332,1,21,'1,1214625936yZynHVd.jpg,image/jpeg,143196,22','2017-06-19 02:25:42'),(1333,1,21,'999,1214751884LpWxall.jpg,image/jpeg,76772,23','2017-06-19 02:35:10'),(1334,1,21,'99,1214327031apGYy4e.jpg,image/jpeg,16828,25','2017-06-19 02:35:11'),(1335,1,22,'21,12,159475fcaa4b51','2017-06-19 02:35:49'),(1336,1,22,'22,1,15947605689780','2017-06-19 02:35:52'),(1337,1,22,'23,999,15947628e65c63','2017-06-19 02:35:55'),(1338,1,22,'25,99,15947628f0eefe','2017-06-19 02:35:57'),(1339,1,21,'5,1215471604fESdi9X.jpg,image/jpeg,181485,26','2017-06-19 02:38:04'),(1340,1,21,'4,1214751884LpWxall.jpg,image/jpeg,76772,27','2017-06-19 02:38:04'),(1341,1,21,'3,1214625936yZynHVd.jpg,image/jpeg,143196,28','2017-06-19 02:38:04'),(1342,1,21,'2,1214327031apGYy4e.jpg,image/jpeg,16828,29','2017-06-19 02:38:04'),(1343,1,22,'29,2,15947633c9a801','2017-06-19 02:44:32'),(1344,1,22,'28,3,15947633c59a1f','2017-06-19 02:44:35'),(1345,1,22,'27,4,15947633c43f6a','2017-06-19 02:44:38'),(1346,1,22,'26,5,15947633bc0f32','2017-06-19 02:44:40'),(1347,1,21,'5,consultas.sql,application/octet-stream,3956,30','2017-06-19 02:45:34'),(1348,1,21,'3,1214625936yZynHVd.jpg,image/jpeg,143196,31','2017-06-19 02:45:34'),(1349,1,21,'2,1214327031apGYy4e.jpg,image/jpeg,16828,32','2017-06-19 02:45:34'),(1350,1,21,'9,1215471604fESdi9X.jpg,image/jpeg,181485,33','2017-06-19 02:59:52'),(1351,1,21,'8,1214751884LpWxall.jpg,image/jpeg,76772,34','2017-06-19 02:59:52'),(1352,1,21,'7,1214625936yZynHVd.jpg,image/jpeg,143196,35','2017-06-19 02:59:52'),(1353,1,21,'6,1214327031apGYy4e.jpg,image/jpeg,16828,36','2017-06-19 02:59:53'),(1354,1,21,'11,pda_7 (1).zip,application/x-zip-compressed,1661965,37','2017-06-19 03:01:10'),(1355,1,21,'e,pda_14.zip,application/x-zip-compressed,1839529,41','2017-06-19 03:40:38'),(1356,1,21,'c,pda_13 (1).zip,application/x-zip-compressed,405022,42','2017-06-19 03:40:39'),(1357,1,21,'b,pda_7.zip,application/x-zip-compressed,1661965,43','2017-06-19 03:40:39'),(1358,1,21,'a,pda_7 (6).zip,application/x-zip-compressed,1661965,44','2017-06-19 03:40:39'),(1359,1,18,'0,Área 1,A1,22','2017-06-19 03:59:01'),(1360,1,18,'0,Área 2,A2,22','2017-06-19 04:02:26'),(1361,1,35,'0,Subárea 1.1,S1.1,16','2017-06-19 04:06:39'),(1362,1,35,'0,Subárea 1.2,S1.2,16','2017-06-19 04:07:17'),(1363,1,1,NULL,'2017-06-19 09:17:25'),(1364,1,33,'12','2017-06-19 09:29:12'),(1365,1,1,NULL,'2017-06-19 09:32:28'),(1366,1,1,NULL,'2017-06-19 09:34:02'),(1367,1,1,NULL,'2017-06-19 09:52:49'),(1368,1,1,NULL,'2017-06-19 13:13:24'),(1369,1,1,NULL,'2017-06-19 13:20:44'),(1370,1,1,NULL,'2017-06-19 13:27:44'),(1371,1,1,NULL,'2017-06-19 13:53:13'),(1372,1,40,'1,FRYoqioweqowe,15','2017-06-19 19:01:51'),(1373,1,1,NULL,'2017-06-19 19:31:39'),(1374,1,1,NULL,'2017-06-19 20:33:33'),(1375,1,40,'2,FRYKKKKKKK,16','2017-06-19 21:32:44'),(1376,1,40,'3,FRYOOOOOOO,22','2017-06-19 21:38:08'),(1377,1,40,'4,FRY-GRD-000001,13','2017-06-19 21:46:23'),(1378,1,40,'5,FRY-GRD-000002,21','2017-06-19 21:48:36'),(1379,1,40,'6,TOTOOOOOO,14','2017-06-19 22:05:52'),(1380,1,40,'7,OQWE,22','2017-06-19 22:09:36'),(1381,1,40,'8,sssssssqqqw,17','2017-06-19 22:11:34'),(1382,1,40,'9,877887878,19','2017-06-19 22:18:42'),(1383,1,40,'10,awsee211e2,19','2017-06-19 22:20:28'),(1384,1,40,'11,b5e6,17','2017-06-19 22:21:27'),(1385,1,40,'12,as222213,22','2017-06-20 00:19:52'),(1386,1,40,'13,5f34g78,17','2017-06-20 00:22:30'),(1387,1,40,'14,11212312312,15','2017-06-20 00:28:19'),(1388,1,40,'15,323333344444,19','2017-06-20 00:29:55'),(1389,1,1,NULL,'2017-06-20 08:09:46'),(1390,1,40,'16,7887888811145,21','2017-06-20 08:14:59'),(1391,1,40,'17,e322323f,19','2017-06-20 08:17:59'),(1392,1,40,'18,88e78887r,20','2017-06-20 08:32:34'),(1393,1,39,'28,34','2017-06-20 12:11:57'),(1394,1,23,'42,ITF-0200-E060-A1-02145 FL.1/3,DOC A,1,0,2017-06-30,20,21,7','2017-06-20 12:45:37'),(1395,1,23,'43,ITF-0200-E060-A1-02145 FL.2/3,DOC B,1,0,2017-06-29,20,21,7','2017-06-20 12:45:50'),(1396,1,23,'44,ITF-0200-E060-A1-02145 FL.3/3,DOC C,1,100,2017-07-29,20,23,7','2017-06-20 12:46:07'),(1397,1,23,'50,ITF-0200-E060-A1-02146,Doc G,1,100,2017-06-27,20,21,7','2017-06-20 12:46:23'),(1398,1,1,NULL,'2017-06-20 15:20:07'),(1399,1,1,NULL,'2017-06-20 17:05:52'),(1400,1,1,NULL,'2017-06-20 19:29:57'),(1401,1,1,NULL,'2017-06-20 21:16:46'),(1402,1,1,NULL,'2017-06-20 22:57:08'),(1403,1,1,NULL,'2017-06-20 23:57:08'),(1404,1,1,NULL,'2017-06-21 03:37:37'),(1405,1,1,NULL,'2017-06-21 09:57:39'),(1406,1,1,NULL,'2017-06-21 10:57:14'),(1407,1,1,NULL,'2017-06-21 11:23:37'),(1408,1,1,NULL,'2017-06-22 06:53:11'),(1409,1,1,NULL,'2017-06-22 07:04:10'),(1410,1,1,NULL,'2017-06-22 07:28:10'),(1412,1,41,'18','2017-06-22 07:41:58'),(1413,1,1,NULL,'2017-06-22 08:03:34'),(1414,1,1,NULL,'2017-06-22 08:27:01'),(1415,1,1,NULL,'2017-06-22 09:53:10'),(1416,1,41,'18','2017-06-22 11:25:48'),(1417,1,41,'18','2017-06-22 11:30:42'),(1418,1,41,'18','2017-06-22 11:43:54'),(1419,1,41,'18','2017-06-22 11:44:27'),(1420,1,41,'18','2017-06-22 11:52:38'),(1421,1,41,'18','2017-06-22 11:52:56'),(1422,1,41,'18','2017-06-22 11:53:21'),(1423,1,41,'18','2017-06-22 11:54:25'),(1424,1,41,'18','2017-06-22 11:55:14'),(1425,1,41,'18','2017-06-22 11:55:35'),(1426,1,1,NULL,'2017-06-22 12:51:44'),(1427,1,1,NULL,'2017-06-22 13:16:17'),(1428,1,1,NULL,'2017-06-22 13:31:41'),(1429,1,1,NULL,'2017-06-22 13:35:19'),(1430,1,1,NULL,'2017-06-22 14:05:48'),(1431,1,1,NULL,'2017-06-22 14:26:03'),(1432,1,1,NULL,'2017-06-22 14:46:37'),(1433,1,1,NULL,'2017-06-22 15:07:00'),(1434,1,1,NULL,'2017-06-22 15:58:31'),(1435,1,1,NULL,'2017-06-22 16:22:18'),(1436,1,1,NULL,'2017-06-22 17:14:48'),(1437,1,1,NULL,'2017-06-22 17:29:32'),(1438,1,1,NULL,'2017-06-22 17:31:44'),(1439,1,1,NULL,'2017-06-22 17:33:54'),(1440,1,1,NULL,'2017-06-22 17:35:18'),(1441,1,1,NULL,'2017-06-22 17:48:39'),(1442,1,1,NULL,'2017-06-22 20:00:27'),(1443,1,1,NULL,'2017-06-22 20:21:16'),(1444,1,1,NULL,'2017-06-22 20:55:20'),(1445,1,1,NULL,'2017-06-22 21:08:08'),(1446,1,40,'19,23wffwwe2333,15','2017-06-22 21:08:42'),(1447,1,1,NULL,'2017-06-22 22:10:21'),(1448,1,1,NULL,'2017-06-22 23:58:30'),(1449,1,14,'5,Ferreira Nunes LTDA,Ferreira Nunes','2017-06-23 00:03:43'),(1450,1,1,NULL,'2017-06-23 06:33:38'),(1451,1,23,'44,Cabine Clindada SE Entrada e Medição,DOC C,1,24,100,2017-07-29,17,20,23,7','2017-06-23 06:36:29'),(1452,1,23,'44,Cabine Clindada SE Entrada e Medição a b c,DOC C,1,24,100,2017-07-29,17,20,23,7','2017-06-23 06:37:23'),(1453,1,1,NULL,'2017-06-23 07:26:45'),(1454,1,1,NULL,'2017-06-23 07:46:29'),(1455,1,41,'18','2017-06-23 07:46:57'),(1456,1,1,NULL,'2017-06-23 08:22:27'),(1457,1,1,NULL,'2017-06-23 08:31:11'),(1458,1,1,NULL,'2017-06-23 09:39:54'),(1459,1,1,NULL,'2017-06-23 09:48:02'),(1460,1,1,NULL,'2017-06-23 09:54:03'),(1461,1,1,NULL,'2017-06-23 10:01:52'),(1462,1,1,NULL,'2017-06-23 10:02:43'),(1463,1,1,NULL,'2017-06-23 10:07:01'),(1464,1,1,NULL,'2017-06-23 10:43:46'),(1465,1,1,NULL,'2017-06-23 10:48:29'),(1466,1,1,NULL,'2017-06-23 10:59:45'),(1467,1,1,NULL,'2017-06-23 11:02:21'),(1468,1,1,NULL,'2017-06-23 11:03:39'),(1469,1,1,NULL,'2017-06-23 11:04:46'),(1470,1,1,NULL,'2017-06-23 11:05:47'),(1471,1,1,NULL,'2017-06-23 11:06:47'),(1472,1,1,NULL,'2017-06-23 11:10:52'),(1473,1,1,NULL,'2017-06-23 11:11:24'),(1474,1,1,NULL,'2017-06-23 11:13:07'),(1475,1,1,NULL,'2017-06-23 11:14:34'),(1476,1,1,NULL,'2017-06-23 11:15:58'),(1477,1,1,NULL,'2017-06-23 11:17:43'),(1478,1,1,NULL,'2017-06-23 11:30:12'),(1479,1,1,NULL,'2017-06-23 11:33:39');
/*!40000 ALTER TABLE `gdoks_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_pdas`
--

DROP TABLE IF EXISTS `gdoks_pdas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_pdas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `progresso_total` smallint(8) NOT NULL DEFAULT '0',
  `id_revisao` int(11) DEFAULT NULL,
  `idu_validador` int(11) DEFAULT NULL,
  `datahora_validacao` datetime DEFAULT NULL,
  `idu` int(11) NOT NULL,
  `datahora` datetime NOT NULL,
  `obs` tinytext,
  PRIMARY KEY (`id`),
  KEY `FK_pda_id_revisão_x_revisão_idx` (`id_revisao`),
  KEY `FK_pda_idu_x_usuarios_idx` (`idu`),
  CONSTRAINT `FK_pda_id_revisão_x_revisão` FOREIGN KEY (`id_revisao`) REFERENCES `gdoks_revisoes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_pda_idu_x_usuarios` FOREIGN KEY (`idu`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_pdas`
--

LOCK TABLES `gdoks_pdas` WRITE;
/*!40000 ALTER TABLE `gdoks_pdas` DISABLE KEYS */;
INSERT INTO `gdoks_pdas` VALUES (1,10,4,NULL,NULL,1,'2017-05-28 12:05:10',NULL),(2,15,5,NULL,NULL,1,'2017-05-28 12:05:10',NULL),(3,10,6,1,'2017-05-23 10:11:07',1,'2017-05-28 12:05:10',NULL),(4,100,6,1,'2017-05-23 11:11:07',1,'2017-05-28 12:05:10',NULL),(6,50,7,1,'2017-05-23 11:12:07',1,'2017-05-28 12:05:10',NULL),(7,60,7,1,'2017-06-17 08:22:09',1,'2017-05-28 12:05:10',NULL),(12,10,22,NULL,NULL,1,'2017-06-09 15:26:22','Primeira Atualização...'),(13,20,23,NULL,NULL,1,'2017-06-09 15:39:54','Primeira versão do documento B'),(14,5,24,NULL,NULL,1,'2017-06-10 00:35:48','Progresso 1'),(15,5,25,NULL,NULL,1,'2017-06-11 15:54:09','asda dsasd'),(16,15,24,NULL,NULL,1,'2017-06-11 16:56:30','mandando uma imagem'),(17,90,24,NULL,NULL,1,'2017-06-11 16:58:37','Quase lá'),(18,16,26,1,'2017-06-11 17:33:37',1,'2017-06-11 17:33:05','teste 1'),(19,25,26,1,'2017-06-11 18:01:26',1,'2017-06-11 18:00:52','asdasdasd'),(20,100,26,1,'2017-06-11 18:03:46',1,'2017-06-11 18:03:31','teste'),(21,30,27,1,'2017-06-11 18:50:04',1,'2017-06-11 18:48:59','Envio 1'),(22,31,27,1,'2017-06-11 21:45:37',1,'2017-06-11 18:50:55','5555s'),(23,32,27,1,'2017-06-12 03:54:11',1,'2017-06-12 03:53:18','sadsdasdasdas as dasdas d'),(24,90,27,1,'2017-06-12 03:55:29',1,'2017-06-12 03:55:19','testete'),(25,35,28,1,'2017-06-12 04:21:48',1,'2017-06-12 04:21:08','Obs 1'),(26,40,28,1,'2017-06-12 06:15:12',1,'2017-06-12 06:15:01','Teste'),(27,45,28,1,'2017-06-12 06:21:30',1,'2017-06-12 06:21:20','Teste 4'),(28,50,28,1,'2017-06-12 06:27:56',1,'2017-06-12 06:27:49','Teste 4'),(29,55,28,1,'2017-06-12 06:31:58',1,'2017-06-12 06:30:14','Teste'),(30,60,28,1,'2017-06-12 06:32:42',1,'2017-06-12 06:32:31','Teste'),(31,65,28,1,'2017-06-20 12:11:03',1,'2017-06-12 06:43:57','Teste'),(32,20,25,1,'2017-06-17 07:45:49',1,'2017-06-17 07:45:24','Adicionado imagens'),(33,73,7,NULL,NULL,1,'2017-06-17 09:42:38','asdasdasddasa'),(34,100,28,1,'2017-06-20 12:12:02',1,'2017-06-20 12:11:56','werwer');
/*!40000 ALTER TABLE `gdoks_pdas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_pdas_x_arquivos`
--

DROP TABLE IF EXISTS `gdoks_pdas_x_arquivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_pdas_x_arquivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pda` int(11) DEFAULT NULL,
  `id_arquivo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_pda_x_arquivo` (`id_pda`,`id_arquivo`),
  KEY `FK_id_pda_x_pdas_idx` (`id_pda`),
  KEY `FK_id_arquivo_x_arquivos_idx` (`id_arquivo`),
  CONSTRAINT `FK_id_arquivo_x_arquivos` FOREIGN KEY (`id_arquivo`) REFERENCES `gdoks_arquivos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_id_pda_x_pdas` FOREIGN KEY (`id_pda`) REFERENCES `gdoks_pdas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_pdas_x_arquivos`
--

LOCK TABLES `gdoks_pdas_x_arquivos` WRITE;
/*!40000 ALTER TABLE `gdoks_pdas_x_arquivos` DISABLE KEYS */;
INSERT INTO `gdoks_pdas_x_arquivos` VALUES (18,3,1),(19,3,2),(20,3,3),(22,4,2),(23,4,3),(24,4,4),(21,4,5),(26,6,2),(27,6,3),(28,6,4),(25,6,5),(29,6,6),(31,7,2),(32,7,3),(33,7,4),(30,7,5),(34,7,7),(41,12,24),(42,13,25),(43,14,26),(44,14,27),(45,15,28),(46,16,26),(47,16,27),(48,16,29),(49,17,26),(50,17,30),(51,18,31),(52,19,32),(53,20,33),(54,21,34),(55,22,35),(56,23,35),(57,23,36),(58,24,35),(59,24,36),(60,24,37),(61,25,38),(62,26,39),(63,27,39),(64,27,40),(65,28,39),(66,28,41),(67,29,41),(68,29,42),(69,30,41),(70,30,43),(71,31,41),(72,31,43),(73,31,44),(74,32,28),(75,32,45),(76,32,46),(77,33,2),(78,33,3),(79,33,4),(80,33,5),(81,33,7),(82,33,47),(83,33,48),(84,33,49),(85,34,41),(86,34,43),(87,34,44),(88,34,50),(89,34,51),(90,34,52);
/*!40000 ALTER TABLE `gdoks_pdas_x_arquivos` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_projetos`
--

LOCK TABLES `gdoks_projetos` WRITE;
/*!40000 ALTER TABLE `gdoks_projetos` DISABLE KEYS */;
INSERT INTO `gdoks_projetos` VALUES (12,'Projeto A','PRJa',3,1,1,'2017-04-03','2017-05-17',''),(13,'Projeto B','PRJB',3,1,1,'2017-05-09','2017-06-30',''),(14,'Projeto C','PrjC',3,1,1,'2017-05-11','2017-10-14',''),(15,'Projeto D','PrjD',3,9,1,'2017-05-20','2017-07-31',''),(16,'Projeto E','PrjE',4,9,1,'2017-05-20','2017-05-20',''),(17,'Projeto F','PrjF',3,4,1,'2017-05-20','2017-07-29',''),(18,'Projeto G','PrjG',5,2,1,'2017-05-31','2017-05-24',''),(19,'Projeto H','PrjH',4,1,1,'2017-11-30','2018-03-31',''),(20,'Projeto I','PrjI',5,6,1,'2017-08-31','2017-09-30',''),(21,'Projeto J','Prj J',4,9,1,'2017-06-17','2017-06-17',''),(22,'Projeto Diff','fidd',4,1,1,'2017-06-27','2017-07-02','');
/*!40000 ALTER TABLE `gdoks_projetos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_revisoes`
--

DROP TABLE IF EXISTS `gdoks_revisoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_revisoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serial` smallint(8) NOT NULL,
  `id_documento` int(11) NOT NULL,
  `data_limite` date DEFAULT NULL,
  `progresso_validado` smallint(8) NOT NULL DEFAULT '0',
  `progresso_a_validar` smallint(8) NOT NULL DEFAULT '0',
  `ua` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_serial__x_doxumento` (`serial`,`id_documento`),
  KEY `FK_id_documento_x_documentos_id_idx` (`id_documento`),
  CONSTRAINT `FK_id_documento_x_documentos_id` FOREIGN KEY (`id_documento`) REFERENCES `gdoks_documentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_revisoes`
--

LOCK TABLES `gdoks_revisoes` WRITE;
/*!40000 ALTER TABLE `gdoks_revisoes` DISABLE KEYS */;
INSERT INTO `gdoks_revisoes` VALUES (4,1,26,'2017-06-01',0,0,NULL),(5,1,27,'2017-06-02',100,0,NULL),(6,1,28,'2017-05-11',100,0,'2017-05-11 23:00:10'),(7,2,28,'2017-05-29',60,13,'2017-06-17 09:42:40'),(8,1,38,'2017-07-10',0,0,NULL),(9,1,35,'2017-07-01',0,0,NULL),(10,1,25,'2017-07-02',0,0,NULL),(11,1,30,'2017-07-03',0,0,NULL),(12,1,32,'2017-07-04',0,0,NULL),(13,1,33,'2017-07-05',0,0,NULL),(14,1,39,'2017-07-06',0,0,NULL),(15,1,31,'2017-07-07',0,0,NULL),(16,1,34,'2017-07-08',0,0,NULL),(17,1,37,'2017-07-09',0,0,NULL),(19,1,29,'2017-07-11',0,0,NULL),(21,1,41,'2017-06-08',0,0,NULL),(22,1,42,'2017-06-30',0,10,'2017-06-09 15:26:23'),(23,1,43,'2017-06-29',0,20,'2017-06-09 15:39:54'),(24,1,44,'2017-07-29',100,0,'2017-06-11 16:58:38'),(25,1,45,'2017-08-10',20,0,'2017-06-17 07:45:25'),(26,1,46,'2017-06-29',100,0,'2017-06-11 18:03:32'),(27,1,49,'2017-07-27',90,0,'2017-06-12 03:55:20'),(28,1,50,'2017-06-27',100,0,'2017-06-20 12:11:57'),(29,1,51,'2017-07-27',0,0,NULL);
/*!40000 ALTER TABLE `gdoks_revisoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_subareas`
--

DROP TABLE IF EXISTS `gdoks_subareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_subareas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `id_area` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_nome` (`nome`,`id_area`),
  UNIQUE KEY `UQ_codigo` (`codigo`,`id_area`),
  KEY `FK_id_area_x_subarea_idx` (`id_area`),
  CONSTRAINT `FK_id_area_x_subarea` FOREIGN KEY (`id_area`) REFERENCES `gdoks_areas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_subareas`
--

LOCK TABLES `gdoks_subareas` WRITE;
/*!40000 ALTER TABLE `gdoks_subareas` DISABLE KEYS */;
INSERT INTO `gdoks_subareas` VALUES (1,'Sub-área 1','SBA1',9),(2,'Sub-área 21','SBA21',10),(3,'Sub-área de Area11','SBA-X',11),(4,'Sub-área 3','SBA3',10),(5,'Sub-área 5','SBA5',9),(6,'Sub-área 1','PDA1.1',12),(7,'Sub-área Única','SA1',14),(8,'Subárea Única','SUB1',15),(9,'Subárea 1.1','S1.1',16),(10,'Subárea 1.2','S1.2',16);
/*!40000 ALTER TABLE `gdoks_subareas` ENABLE KEYS */;
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
  `sigla` varchar(8) DEFAULT NULL,
  `ativa` bit(1) DEFAULT b'1',
  `id_disciplina` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`),
  UNIQUE KEY `sigla_UNIQUE` (`sigla`),
  KEY `FK_disciplinas_x_subdisciplinas_idx` (`id_disciplina`),
  CONSTRAINT `FK_disciplinas_x_subdisciplinas` FOREIGN KEY (`id_disciplina`) REFERENCES `gdoks_disciplinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_subdisciplinas`
--

LOCK TABLES `gdoks_subdisciplinas` WRITE;
/*!40000 ALTER TABLE `gdoks_subdisciplinas` DISABLE KEYS */;
INSERT INTO `gdoks_subdisciplinas` VALUES (20,'Tomadas Novas','ELE1','',16),(21,'Cabeamento','ELE2','',16),(22,'Tubulações','HDR1','',17),(23,'Válvulas','HDR2','',17),(24,'Conectores','ELE3','',16),(25,'Painéis','ELE4','',16),(26,'Cabou Criatividade','ELE5','',16),(27,'Cimento','CMT','',18),(28,'Direção','A01','',21),(29,'tewwer','teeres','',26),(30,'Teste 1','TT1','',28),(32,'Teste 2','TT2','',28),(35,'Teste 3','TT3','',28),(36,'Sub  6.1','S61','',29),(37,'SUB 6.2','S62','',29),(38,'SUB 6.3','S63','',29),(39,'SUB 6.4','S64','',29);
/*!40000 ALTER TABLE `gdoks_subdisciplinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_tamanhos_de_papel`
--

DROP TABLE IF EXISTS `gdoks_tamanhos_de_papel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_tamanhos_de_papel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(6) DEFAULT NULL,
  `altura` int(11) DEFAULT NULL,
  `largura` int(11) DEFAULT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_tamanhos_de_papel`
--

LOCK TABLES `gdoks_tamanhos_de_papel` WRITE;
/*!40000 ALTER TABLE `gdoks_tamanhos_de_papel` DISABLE KEYS */;
INSERT INTO `gdoks_tamanhos_de_papel` VALUES (1,'A0',1189,841,1),(2,'A1',841,594,1),(3,'A2',594,420,1),(4,'A3',420,297,1),(5,'A4',297,210,1),(6,'A5',210,148,1),(7,'A6',148,105,1),(8,'A7',105,74,1),(9,'A8',74,52,1),(10,'A9',52,37,1),(11,'A10',37,26,1),(12,'B0',1414,1000,1),(13,'B1',1000,707,1),(14,'B2',707,500,1),(15,'B3',500,353,1),(16,'B4',353,250,1),(17,'B5',250,176,1),(18,'B6',176,125,1),(19,'B7',125,88,1),(20,'B8',88,62,1),(21,'B9',62,44,1),(22,'B10',44,31,1),(23,'C0',1297,917,1),(24,'C1',917,648,1),(25,'C2',648,458,1),(26,'C3',458,324,1),(27,'C4',324,229,1),(28,'C5',229,162,1),(29,'C6',162,114,1),(30,'C7',114,81,1),(31,'C8',81,57,1),(32,'C9',57,40,1),(33,'C10',40,28,1);
/*!40000 ALTER TABLE `gdoks_tamanhos_de_papel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_tipos_de_doc`
--

DROP TABLE IF EXISTS `gdoks_tipos_de_doc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_tipos_de_doc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_empresa` int(11) DEFAULT NULL,
  `simbolo` varchar(5) DEFAULT NULL,
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_id_empresa_x_empresa_idx` (`id_empresa`),
  CONSTRAINT `FK_id_empresa_x_empresa` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_tipos_de_doc`
--

LOCK TABLES `gdoks_tipos_de_doc` WRITE;
/*!40000 ALTER TABLE `gdoks_tipos_de_doc` DISABLE KEYS */;
INSERT INTO `gdoks_tipos_de_doc` VALUES (1,1,'E','Eletrônico'),(2,1,'B','Cópia de Papel');
/*!40000 ALTER TABLE `gdoks_tipos_de_doc` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios`
--

LOCK TABLES `gdoks_usuarios` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios` VALUES (1,'sergio','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Sérgio Moura','smouracalmon@gmail.com','594d2b357f5389.69984452','2017-06-23 15:52:37',1,''),(2,'user2','*FB59F051EDC5779D26DDA273499B8B3E5901DFBE','Usuário 2','usuario2@gmail.com',NULL,NULL,1,''),(3,'tony','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Anthony Barbosa','tony@faraday.com.br',NULL,NULL,2,''),(4,'teste','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Raul Castro Validador','raulcastro@gdoks.com.br','586ef4744c7fc0.56527252','2017-01-06 00:35:48',1,''),(6,'teste3','teste','Teste 3','teste@teste.com',NULL,NULL,1,''),(7,'teste555','*91D6F94093CD93F1E8405462FE7DC8771C8AB6E1','Teste 55','teste55@teste.com',NULL,NULL,1,''),(8,'tony','tony','Anthony','tony@avangers.com',NULL,NULL,1,''),(9,'pcesar','pcesar','Paulo César','pcesar@faraday.com.br',NULL,NULL,1,''),(10,'sergio','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Sérgio Moura','smouracalmon@gmail.com','593f3baa10ed63.24515179','2017-06-13 02:11:06',2,''),(11,'teeee','aaaa','Teste','teste@teste.com',NULL,NULL,1,''),(12,'kkdja','aaa','Teste 2','teste2@teste.com',NULL,NULL,1,''),(13,'asdasd','teste','UNovo','w@novo.com',NULL,NULL,1,'\0');
/*!40000 ALTER TABLE `gdoks_usuarios` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  KEY `FK_validadores_x_usuarios_idx` (`id_usuario`),
  KEY `FK_validadores_x_disciplinas_idx` (`id_disciplina`),
  CONSTRAINT `FK_validadores_x_disciplinas` FOREIGN KEY (`id_disciplina`) REFERENCES `gdoks_disciplinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_validadores_x_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_validadores`
--

LOCK TABLES `gdoks_validadores` WRITE;
/*!40000 ALTER TABLE `gdoks_validadores` DISABLE KEYS */;
INSERT INTO `gdoks_validadores` VALUES (23,1,18),(27,1,16),(37,8,17),(38,1,17),(39,2,26),(40,8,26);
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

-- Dump completed on 2017-06-23 11:52:56
