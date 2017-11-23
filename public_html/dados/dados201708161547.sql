CREATE DATABASE  IF NOT EXISTS `gdoks` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `gdoks`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: gdoks
-- ------------------------------------------------------
-- Server version	5.7.19-log

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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_acoes`
--

LOCK TABLES `gdoks_acoes` WRITE;
/*!40000 ALTER TABLE `gdoks_acoes` DISABLE KEYS */;
INSERT INTO `gdoks_acoes` VALUES (1,'Logar','Logou no sistema'),(2,'Alterar Dados Pessoais','Alterou dados pessoais'),(3,'Alterar Dados de Usuário','Alterou dados de usuário nome:$1, email:$2, login:$3, ativo:$4'),(4,'Criou usuário','Criou usuário nome:$1, email:$2, login:$3, ativo:$4'),(5,'Alterou Disciplina','Alterou disciplina nome:$1, sigla:$2, ativa:$3'),(6,'Criou Disciplina','Criou disciplina nome:$1, sigla:$2, ativa:$3'),(7,'Alterou Subdisciplina','Alterou subdisciplina nome:$1, sigla:$2, ativa:$3'),(8,'Criou Subdisciplina','Criou subdisciplina nome:$1, sigla:$2, ativa:$3'),(9,'Removeu Subdisciplina','Removeu subdisciplina nome:$1, sigla:$2, ativa:$3'),(10,'Associou Especialista','Associou especialista $1 a disciplina $2'),(11,'Desassociou Especialista','Desassociou especialista $1 da disciplina $2'),(12,'Associou Validador','Associou o validador $1 a disciplina $2 (Tipo $3)'),(13,'Desassociou Validador','Desassociou o validador $1 da disciplina $2'),(14,'Alterou Cliente','Alterou dados do cliente $1,nome:$2, nome_fantasia $3'),(15,'Adicionou Cliente','Adicionou cliente $1 (nome:$2)'),(16,'Alterou Projeto','Alterou o projeto $8: $1,$2,$3,$4,$5,$6,$7'),(17,'Adicionou Projeto','Adicionou o projeto $8: $1,$2,$3,$4,$5,$6,$7'),(18,'Adicionou Área','Adicionou área ao projeto $3: $1,$2'),(19,'Alterou Área','Alterou área do projeto $3: $1,$2'),(20,'Removeu Área','Removeu área do projeto $3: $1,$2'),(21,'Criou DAO','Criou DAO $3: $1 [$2]'),(22,'Removeu DAO','Removeu DAO $3: $1 [$2]'),(23,'Alterou Documento','Alterou o documento $1: [nome] => $2 [id_subdisciplina] => $3 [id_area] => $4)'),(24,'Adicionou Documento','Adicionou o documento $1: [nome] => $2, [id_subdisciplina] => $3 [id_area]=>$4 [id_projeto]] => $5'),(25,'Removeu Documento','Removeu documento $1:  [id] => 3 [nome] => $2 [id_area] => $3 [id_subdisciplina] => $4'),(26,'Baixou Arquivo','Baixou arquivo $1'),(27,'Validou Progresso','Validou Progresso de $1% para o documento $2'),(28,'Bloqueou Documento','Bloqueou o documento $1'),(29,'Desbloqueou Documento','Desbloqueou documento $1'),(30,'Atualizou Documento','Atualizou documento $1 com arquivo $2 ($3)'),(31,'Alterou Cargo','Alterou cargo $1 (nome:$2, hh:$3)'),(32,'Adicionou Cargo','Adicionou cargo $1 (nome:$2, hh:$3)'),(33,'Removeu Cargo','Removeu cargo $1'),(34,'Alterou Sub-área','Alterou sub-área $1,(nome:$2,codigo:$3, area:$4)'),(35,'Criou Sub-área','Criou sub-área $1,(nome:$2,codigo:$3, area:$4)'),(36,'Removeu Subárea','Removeu Sub-área $1,(nome:$2,codigo:$3, area:$4)'),(37,'Alterou Especialistas','Alterou especialistas da disciplina $1. Novos especialistas: $2'),(38,'Alterou Validadores','Alterou validadores da disciplina $1. Novos validadores: $2'),(39,'Atualizou Revisão','Atualizou revisão $1 com o pacote de arquivos $2'),(40,'Criou GRD','Criou GRD (id: $1, cod: $2, id_prj:$3)'),(41,'Anexou Documentos a GRD','Anexou documentos a GRD $1'),(42,'Alterou GRD','Alterou GRD (id: $1, cod: $2, id_prj: $3)'),(43,'Enviou GRD via FTP','Enviou GRD (id: $1) para FTP do cliente'),(44,'Enviou GRD via e-mail','Enviou zip da GRD (id: $1) por email'),(45,'Enviou Link de GRD via e-mail','Enviou link da GRD (id: $1) por email'),(46,'Adicionou Retorno/Observação a GRD','Adicionou Retorno/Observação a GRD: [id_grd:$1, id_obs:$2]');
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
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_areas`
--

LOCK TABLES `gdoks_areas` WRITE;
/*!40000 ALTER TABLE `gdoks_areas` DISABLE KEYS */;
INSERT INTO `gdoks_areas` VALUES (194,'1000','Lado Leste',68),(195,'2000','Lado Oeste',68);
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
) ENGINE=InnoDB AUTO_INCREMENT=238 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_arquivos`
--

LOCK TABLES `gdoks_arquivos` WRITE;
/*!40000 ALTER TABLE `gdoks_arquivos` DISABLE KEYS */;
INSERT INTO `gdoks_arquivos` VALUES (1,'1/26/28589596','FelisSedInterdum.gif','2016-08-24 14:44:48',8,440,1,4),(2,'1/7/95572543','MetusSapienUt.gif','2017-01-05 22:26:27',2,880,1,7),(3,'1/53/90205285','CongueRisus.txt','2016-09-25 08:39:58',7,440,1,10),(5,'1/31/13205230','Diam.mp3','2017-05-10 16:06:02',9,440,1,9),(7,'1/40/59958048','DolorSitAmet.avi','2017-04-01 20:24:28',2,880,1,10),(8,'1/59/45945930','InFaucibusOrci.mpeg','2016-07-27 04:44:05',6,660,1,7),(9,'1/48/70868256','IdLuctusNec.jpeg','2017-04-29 00:15:15',2,0,1,6),(10,'1/34/53393272','Nam.txt','2017-03-25 14:10:30',1,0,1,3),(11,'1/49/74160883','AmetErosSuspendisse.avi','2016-11-07 07:31:26',10,880,1,8),(14,'1/36/53931251','MiInPorttitor.mov','2016-07-11 15:11:42',4,220,1,5),(15,'1/9/45344157','Donec.avi','2017-06-09 23:45:15',5,220,1,3),(16,'1/60/16725417','In.txt','2017-05-04 13:24:50',8,1100,1,8),(17,'1/55/78208981','DapibusNullaSuscipit.jpeg','2017-01-18 10:48:35',1,0,1,7),(18,'1/48/11839713','VolutpatEleifendDonec.png','2016-10-15 22:55:33',10,440,1,6),(19,'1/6/28397654','DonecQuisOrci.xls','2017-01-03 19:56:20',10,220,1,4),(20,'1/48/67966455','LiberoRutrumAc.gif','2017-05-16 07:59:49',3,660,1,5),(21,'1/41/75635713','Ante.mov','2017-01-01 16:12:27',5,880,1,5),(22,'1/59/84947480','Dolor.avi','2017-02-18 07:49:34',6,0,1,4),(23,'1/55/45344772','NecEuismod.avi','2017-06-23 10:20:29',2,440,1,8),(24,'1/40/71669159','ConsequatMetusSapien.xls','2017-06-02 09:18:52',8,0,1,7),(25,'1/23/36716060','NullaElitAc.tiff','2016-12-01 02:16:14',5,220,1,5),(26,'1/20/35431638','VulputateJusto.txt','2017-03-17 09:52:41',7,220,1,1),(27,'1/3/51106436','Diam.gif','2017-06-13 00:57:45',10,440,1,5),(28,'1/54/63885185','Integer.txt','2016-12-30 11:40:51',2,440,1,4),(29,'1/8/10313354','Nullam.ppt','2017-05-13 19:41:35',8,880,1,4),(30,'1/56/62154372','NamDuiProin.jpeg','2017-06-17 20:43:49',5,220,1,10),(31,'1/17/59573983','Ante.mp3','2016-12-16 10:22:56',2,440,1,1),(32,'1/58/43303254','FermentumJustoNec.jpeg','2017-03-26 21:35:53',6,220,1,1),(33,'1/50/37879601','LacusCurabiturAt.avi','2017-04-09 06:27:59',8,660,1,8),(34,'1/57/72325392','EgetCongueEget.mpeg','2016-10-27 21:24:17',9,660,1,6),(35,'1/38/57145027','EleifendPedeLibero.avi','2016-07-14 22:32:49',7,0,1,3),(36,'1/54/84489846','IaculisDiam.xls','2016-12-17 09:04:32',10,440,1,10),(37,'1/42/39795796','UltricesEnim.xls','2016-08-28 00:31:39',7,220,1,7),(38,'1/52/56371932','NislDuis.avi','2016-10-23 11:08:05',7,0,1,4),(39,'1/56/59116531','JustoLacinia.ppt','2017-03-28 00:48:55',3,440,1,6),(40,'1/27/14180506','Ac.ppt','2017-04-03 12:22:03',3,220,1,9),(41,'1/14/30097597','UtBlanditNon.mp3','2016-09-02 13:54:12',7,0,1,2),(42,'1/52/43547350','Nulla.gif','2016-11-19 15:11:30',4,220,1,4),(43,'1/14/60851165','NullaTellusIn.mov','2017-06-22 16:09:09',10,220,1,6),(44,'1/50/78457408','Pretium.doc','2016-10-31 11:26:03',7,440,1,6),(45,'1/3/41263994','MiPede.avi','2016-12-23 03:40:41',9,1100,1,2),(47,'1/38/71736168','Sapien.ppt','2017-05-13 00:23:10',8,1100,1,8),(48,'1/45/33666704','DolorVel.jpeg','2017-01-21 19:13:14',10,660,1,10),(49,'1/19/76677554','Habitasse.ppt','2016-07-06 17:34:00',3,220,1,10),(50,'1/3/15949098','Lacus.xls','2016-07-11 06:44:20',7,0,1,10),(51,'1/4/78727706','IntegerANibh.xls','2016-10-12 05:57:09',8,660,1,10),(52,'1/5/37834149','Consequat.jpeg','2017-05-04 04:56:58',10,220,1,5),(53,'1/48/92023048','TristiqueFusceCongue.ppt','2017-05-15 09:54:20',5,440,1,4),(55,'1/39/74001397','InFelisDonec.png','2017-01-06 17:33:42',3,0,1,9),(56,'1/24/51912110','Sollicitudin.pdf','2016-11-09 15:43:31',1,880,1,4),(57,'1/22/33150903','RhoncusAliquamLacus.avi','2016-08-02 15:36:12',10,440,1,3),(58,'1/35/70667608','Tellus.xls','2017-06-23 20:00:36',7,660,1,1),(59,'1/27/67434767','Elementum.mp3','2016-09-30 03:52:35',1,1100,1,5),(60,'1/14/29192363','In.ppt','2016-09-04 21:40:21',10,0,1,2),(61,'1/31/11122889','ALiberoNam.png','2016-08-22 10:04:31',2,880,1,6),(62,'1/54/25228761','EratNulla.doc','2016-10-01 08:05:33',3,220,1,7),(63,'1/26/88478396','MetusSapien.xls','2017-01-31 16:34:43',6,440,1,5),(64,'1/11/82364085','Lacus.tiff','2017-03-24 11:13:12',3,0,1,3),(66,'1/24/33165135','Ipsum.mp3','2017-05-16 17:49:30',3,0,1,3),(68,'1/28/11091047','MaecenasLeo.mpeg','2017-01-22 21:04:13',4,220,1,1),(69,'1/26/29193747','AtNunc.xls','2017-01-17 02:01:33',5,880,1,5),(70,'1/5/41226790','TurpisSedAnte.pdf','2016-10-19 16:59:27',5,220,1,10),(71,'1/47/62762333','VelAccumsan.tiff','2017-03-10 17:24:33',7,440,1,6),(72,'1/35/41381670','Aenean.doc','2016-11-10 13:42:06',10,440,1,5),(73,'1/47/43527329','Posuere.pdf','2017-04-22 10:02:32',2,220,1,4),(74,'1/27/39604081','InFelisDonec.xls','2017-06-08 22:23:00',10,660,1,1),(76,'1/39/89872620','QuamFringillaRhoncus.xls','2017-06-21 08:05:09',4,660,1,1),(77,'1/15/11007227','VitaeIpsumAliquam.avi','2016-10-30 12:39:49',9,880,1,5),(78,'1/33/86457741','Dolor.txt','2016-11-16 22:46:17',7,220,1,2),(79,'1/48/67778688','Pede.ppt','2016-09-01 04:12:38',9,660,1,8),(80,'1/4/33047477','NonPretiumQuis.jpeg','2017-03-17 23:56:56',8,220,1,10),(81,'1/11/15815937','JustoNec.jpeg','2016-08-26 21:58:50',7,220,1,5),(82,'1/38/22427337','Urna.avi','2016-11-14 12:18:57',8,0,1,2),(83,'1/34/25026604','AcDiam.jpeg','2017-04-05 11:08:23',8,440,1,5),(84,'1/22/29874864','MaecenasUt.mp3','2017-05-07 03:14:15',1,660,1,3),(85,'1/10/47073513','NecEuismodScelerisque.avi','2016-10-23 21:56:21',10,880,1,5),(87,'1/59/96266877','AliquetAt.ppt','2016-07-09 09:45:52',1,440,1,6),(88,'1/12/15008065','DolorQuis.mpeg','2016-11-30 07:31:03',7,220,1,5),(89,'1/17/12206787','EgestasMetus.avi','2016-12-10 23:05:51',1,660,1,1),(90,'1/2/30097555','Nulla.xls','2017-01-01 23:04:11',9,220,1,7),(91,'1/53/15133290','Nullam.ppt','2017-06-03 16:37:29',5,660,1,4),(92,'1/6/79166948','Primis.jpeg','2016-10-07 09:28:45',5,880,1,8),(93,'1/18/52533810','Sodales.xls','2017-05-12 21:42:44',10,1100,1,2),(94,'1/46/23680078','SuscipitLigula.xls','2017-05-19 10:48:42',10,0,1,9),(96,'1/38/75607899','ElitAcNulla.ppt','2017-03-06 09:34:09',10,440,1,1),(97,'1/45/45066474','Turpis.pdf','2016-10-23 21:27:19',7,660,1,3),(98,'1/21/86434339','LoremQuisqueUt.tiff','2016-08-30 22:39:01',9,440,1,1),(100,'1/36/68411417','Penatibus.pdf','2017-05-19 07:36:28',2,220,1,4),(101,'1/57/42144315','EtCommodoVulputate.xls','2016-11-10 01:58:17',3,440,1,8),(102,'1/55/16693177','Est.ppt','2017-04-19 23:51:46',9,220,1,4),(103,'1/9/97334997','Semper.xls','2016-11-09 01:49:09',2,220,1,10),(104,'1/7/75229252','Luctus.gif','2017-05-06 07:50:19',5,0,1,6),(105,'1/20/25815948','AtDiamNam.mp3','2017-04-15 09:56:12',9,660,1,7),(106,'1/45/40347707','Dapibus.mp3','2017-05-22 09:47:43',4,440,1,1),(107,'1/3/70283936','In.avi','2016-07-14 21:38:18',3,660,1,6),(109,'1/54/79386185','Nibh.xls','2016-08-14 11:47:28',7,0,1,3),(110,'1/60/41761763','UtNullaSed.mp3','2017-01-08 16:24:23',8,440,1,7),(111,'1/15/24274016','Ante.ppt','2017-03-04 21:14:14',9,220,1,7),(112,'1/24/16862242','PretiumNislUt.doc','2016-08-05 07:09:14',8,0,1,2),(113,'1/23/94702599','Iaculis.xls','2017-03-28 18:11:16',8,220,1,8),(114,'1/23/15652277','Interdum.ppt','2016-11-06 23:18:13',3,440,1,10),(116,'1/5/80736883','VariusInteger.avi','2017-05-15 12:32:03',4,220,1,8),(117,'1/58/95112465','LacusPurusAliquet.mov','2017-05-24 07:08:01',10,880,1,8),(118,'1/60/93813346','Habitasse.gif','2017-02-13 04:49:15',8,440,1,5),(119,'1/40/10342265','CondimentumCurabiturIn.ppt','2017-01-05 19:13:50',2,0,1,1),(120,'1/9/29415729','IntegerTinciduntAnte.avi','2016-09-29 10:00:21',6,660,1,10),(121,'1/10/80143260','UtSuscipitA.xls','2017-02-04 18:38:08',2,220,1,10),(122,'1/29/69905434','NullaSuspendissePotenti.ppt','2017-03-21 12:37:43',2,440,1,6),(123,'1/54/43853342','Porttitor.tiff','2017-05-11 14:04:29',4,880,1,5),(124,'1/48/91455382','NonMattisPulvinar.tiff','2017-03-24 16:32:55',8,440,1,7),(125,'1/59/31639876','JustoInHac.pdf','2017-02-23 16:52:04',2,220,1,8),(126,'1/53/30555347','Integer.xls','2016-08-14 21:24:35',7,440,1,9),(127,'1/18/60454387','Blandit.tiff','2017-01-19 14:09:44',2,660,1,5),(128,'1/19/27267958','Eget.mpeg','2017-05-12 16:59:43',7,440,1,3),(129,'1/7/11164804','ElitSodales.avi','2016-12-02 01:06:40',7,880,1,8),(130,'1/59/38249438','NibhQuisque.avi','2016-07-23 12:27:46',1,0,1,3),(131,'1/49/89591437','Viverra.pdf','2016-10-22 09:13:40',5,0,1,3),(132,'1/4/84784486','PlaceratAnte.ppt','2016-11-05 02:17:54',3,440,1,5),(133,'1/36/48107299','CongueDiam.tiff','2017-06-01 08:34:42',4,440,1,5),(134,'1/41/74017390','EuInterdum.mp3','2017-03-23 06:42:38',7,0,1,3),(135,'1/8/90473029','EratId.doc','2016-07-19 04:12:49',5,220,1,3),(136,'1/27/57412647','Est.avi','2017-02-06 13:12:08',1,0,1,1),(137,'1/34/75355994','Mauris.pdf','2016-11-19 01:42:06',1,220,1,6),(138,'1/34/93923579','Ultrices.xls','2016-12-29 04:21:54',3,440,1,7),(139,'1/16/16032138','UtEratId.txt','2016-09-25 04:13:31',5,440,1,5),(140,'1/4/96833974','Vulputate.jpeg','2017-02-25 16:58:01',9,660,1,5),(143,'1/5/37212254','Nam.xls','2017-02-21 09:59:21',1,1100,1,9),(145,'1/44/71599669','Dignissim.ppt','2016-12-23 00:10:15',8,220,1,6),(146,'1/15/39020779','Proin.doc','2016-08-16 15:00:38',6,440,1,9),(147,'1/33/43661533','Morbi.mp3','2016-11-29 03:21:40',10,880,1,3),(149,'1/44/53653324','SuspendisseOrnareConsequat.ppt','2016-07-15 13:34:22',1,220,1,10),(150,'1/4/83981718','NislNuncNisl.tiff','2016-08-14 16:17:37',2,0,1,4),(151,'1/25/60001644','Quisque.mp3','2017-02-18 05:13:08',2,220,1,9),(152,'1/11/48013999','Vel.mp3','2017-05-11 21:05:06',10,0,1,3),(153,'1/20/94753367','NullaTellus.jpeg','2016-08-12 11:15:51',1,220,1,7),(154,'1/42/40625847','ConsequatInConsequat.mpeg','2017-05-11 02:36:06',6,440,1,9),(156,'1/19/20384487','Odio.mpeg','2016-12-10 00:49:04',3,0,1,3),(157,'1/54/67372347','SedJusto.jpeg','2017-01-05 01:59:21',9,0,1,1),(158,'1/43/52269184','NuncNisl.tiff','2017-02-08 12:34:39',3,220,1,6),(159,'1/6/11591581','Quis.gif','2016-09-01 20:29:57',9,0,1,2),(160,'1/25/30844087','Odio.ppt','2017-06-04 03:56:52',5,440,1,10),(161,'1/9/21401266','In.mpeg','2016-07-26 15:43:33',3,880,1,2),(162,'1/21/44491047','Non.mov','2016-10-10 23:50:51',9,220,1,2),(163,'1/1/54296513','CurabiturIn.doc','2017-04-05 03:54:03',8,0,1,8),(164,'1/27/13436711','DiamNam.avi','2016-07-30 09:12:26',1,220,1,10),(165,'1/20/16275889','RisusPraesent.txt','2016-10-03 06:20:23',6,0,1,9),(166,'1/49/41028248','FuscePosuere.ppt','2016-12-15 14:55:48',10,660,1,8),(167,'1/10/36567106','OrciEgetOrci.mp3','2017-03-05 17:19:57',10,220,1,9),(173,'1/33/98656643','VolutpatQuamPede.mp3','2016-07-16 02:56:44',7,220,1,1),(174,'1/54/49566410','FeugiatNon.jpeg','2017-06-23 13:29:02',7,220,1,8),(175,'1/5/15310406','Nec.ppt','2016-12-06 16:52:53',1,220,1,9),(176,'1/43/83675431','MusVivamusVestibulum.doc','2017-06-08 02:48:35',4,220,1,9),(177,'1/38/73233994','EuMagna.avi','2016-07-13 00:35:42',4,660,1,9),(178,'1/13/68579408','MorbiA.mp3','2017-04-11 00:42:03',3,880,1,6),(179,'1/8/37654864','Vitae.tiff','2016-11-01 07:58:33',8,660,1,9),(180,'1/46/26038492','Ut.mpeg','2016-12-16 13:52:07',10,660,1,8),(181,'1/18/75908044','NonSodales.png','2017-06-20 21:10:27',6,0,1,3),(182,'1/38/98692192','NullamVarius.tiff','2017-02-22 09:54:55',3,0,1,4),(183,'1/21/82012929','PlaceratPraesent.xls','2017-04-14 15:55:17',4,0,1,7),(184,'1/36/28793790','MolestieSed.gif','2016-10-07 16:27:08',1,440,1,1),(186,'1/5/10828582','AnteVivamus.jpeg','2017-05-23 02:52:29',9,440,1,2),(187,'1/57/86491878','VestibulumQuam.pdf','2016-08-07 19:24:30',2,660,1,2),(189,'1/51/29859368','NullaQuisqueArcu.mpeg','2016-09-03 20:46:18',4,660,1,3),(190,'1/54/99868215','TurpisDonecPosuere.ppt','2016-07-22 08:15:47',3,440,1,8),(191,'1/51/51065714','Id.tiff','2016-09-09 16:39:53',4,660,1,5),(192,'1/24/69251865','NullaJusto.pdf','2016-08-09 03:33:11',1,660,1,6),(193,'1/33/76281276','AliquamAugueQuam.gif','2017-04-02 04:56:52',9,440,1,5),(194,'1/30/62429133','Ante.tiff','2016-09-30 10:44:05',7,0,1,10),(195,'1/25/92041654','SedInterdumVenenatis.xls','2016-11-13 21:21:05',9,220,1,3),(196,'1/32/97948310','PenatibusEt.tiff','2016-09-14 12:30:41',7,220,1,8),(197,'1/19/73438983','OrciPedeVenenatis.xls','2016-10-29 08:11:30',4,880,1,7),(198,'1/14/37010386','Luctus.mpeg','2017-04-23 20:31:49',5,220,1,2),(199,'1/27/38267979','FaucibusOrciLuctus.jpeg','2016-09-24 13:00:01',3,0,1,1),(200,'1/21/17947169','EratFermentumJusto.jpeg','2017-02-14 01:11:18',8,660,1,4),(201,'1/10/159525554cc8a3','1214327031apGYy4e.jpg','2017-06-27 09:53:40',1,16828,5,1),(202,'1/10/159525554ed406','1214625936yZynHVd.jpg','2017-06-27 09:53:40',1,143196,5,1),(203,'1/10/1595255551147a','1214751884LpWxall.jpg','2017-06-27 09:53:41',1,76772,5,1),(204,'1/60/1595255dc87da6','doc.pdf','2017-06-27 09:55:56',1,1352,3,4),(205,'1/61/159525a37d023e','1214327031apGYy4e.jpg','2017-06-27 10:14:31',1,16828,5,1),(206,'1/62/15956669bba03f','1214327031apGYy4e.jpg','2017-06-30 10:56:27',1,16828,5,1),(207,'1/62/15956669bbbde4','1214625936yZynHVd.jpg','2017-06-30 10:56:27',1,143196,5,1),(208,'1/62/15956669bbea27','1214751884LpWxall.jpg','2017-06-30 10:56:27',1,76772,5,1),(209,'1/62/15956669bc047d','1215471604fESdi9X.jpg','2017-06-30 10:56:27',1,181485,5,1),(210,'1/62/159566a173caf3','doc.pdf','2017-06-30 11:11:19',1,1352,5,1),(211,'1/62/15956d5d1c0942','FRY-1704.00-E11-006=0.dwg','2017-06-30 18:50:57',1,1550816,5,1),(212,'1/62/15956dc9a1a1dd','FRY-1704.00-E11-005=0.dwg','2017-06-30 19:19:54',1,1547923,5,1),(213,'1/64/15957b1872dc11','guia19465-20170603111233.pdf','2017-07-01 10:28:23',1,106163,5,1),(214,'1/64/15957b1872f351','ponto aterramento JDe.dwg','2017-07-01 10:28:23',1,1855030,5,1),(215,'1/64/15957b7d39a635','guia19465-20170603111233.pdf','2017-07-01 10:55:15',1,106163,5,1),(216,'1/64/15957b7d39be1c','nfse-1000814-0-201706031111559475980.pdf','2017-07-01 10:55:15',1,48128,5,1),(217,'1/65/1595e46482ef4a','1215471604fESdi9X.jpg','2017-07-06 10:16:40',1,181485,5,1),(218,'1/66/159629a1a387e5','Cartão de Embarque - GOL.pdf','2017-07-09 17:03:22',1,108596,5,1),(219,'1/66/159629a87162b5','CUSTO DE CARTÃO DE CRÉDITO.xlsx','2017-07-09 17:05:11',1,13171,5,1),(220,'1/66/159629a871911d','DADOS BANCÁRIOS DO GESA.docx','2017-07-09 17:05:11',1,13182,5,1),(221,'1/66/159629ae46b744','CUSTO DE CARTÃO DE CRÉDITO.xlsx','2017-07-09 17:06:44',1,13171,5,1),(222,'1/66/159629ae46d760','DADOS BANCÁRIOS DO GESA.docx','2017-07-09 17:06:44',1,13182,5,1),(223,'1/66/159629b391fb57','DTV- DOCUMENTO DE TRANSFERÊNCIA DE VALORES.doc','2017-07-09 17:08:09',1,205824,5,1),(224,'1/66/159629c675527b','ANUNCIO PREÇO LIVROS CLE.docx','2017-07-09 17:13:11',1,12941,5,1),(225,'1/66/15962a2d1ce7a8','CNPJ _ GESA -Cabula.pdf','2017-07-09 17:40:33',1,346765,5,1),(226,'1/66/15962a50db46e8','MARKETING E VENDAS DO LIVRO ESPÍRITA - FICHA DE INSCRIÇÃO.xlsx','2017-07-09 17:50:05',1,20663,4,1),(227,'1/54/15973eaa3c0d54','curriculu 2017.docx','2017-07-22 21:15:31',1,12483,5,1),(228,'1/67/159789ee13b412','Hydrangeas.jpg','2017-07-26 09:53:37',1,595284,5,1),(229,'1/68/15994395073494','dados-201703141008.sql','2017-08-16 09:23:44',1,51922,5,1),(230,'1/68/1599439b75729e','dados-201704060907.sql','2017-08-16 09:25:27',1,52414,5,1),(231,'1/68/1599439e674bbb','dados201704230539.sql','2017-08-16 09:26:14',1,64922,5,1),(232,'1/68/159944b5475775','dados-201702210913.sql','2017-08-16 10:40:36',1,39098,5,1),(233,'1/68/159944b8482492','dados-201702210913.sql','2017-08-16 10:41:24',1,39098,5,1),(234,'1/68/159944bb9462e9','dados-201703141008.sql','2017-08-16 10:42:17',1,51922,5,1),(235,'1/68/159944bd7eee32','dados-201703141008.sql','2017-08-16 10:42:47',1,51922,5,1),(236,'1/68/159944c0438dba','dados-201702210913.sql','2017-08-16 10:43:32',1,39098,5,1),(237,'1/68/159944c4eb25c3','dados-201703141008.sql','2017-08-16 10:44:46',1,51922,5,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_cargos`
--

LOCK TABLES `gdoks_cargos` WRITE;
/*!40000 ALTER TABLE `gdoks_cargos` DISABLE KEYS */;
INSERT INTO `gdoks_cargos` VALUES (1,'Engenheiro 1',500.00,1),(2,'Engenheiro 2',755.00,1),(3,'Técnico 1',350.00,1),(4,'Engenheiro 3',900.00,1);
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
  `ftp_host` varchar(60) DEFAULT NULL,
  `ftp_usuario` varchar(20) DEFAULT NULL,
  `ftp_senha` blob,
  PRIMARY KEY (`id`),
  KEY `FK_cliente_x_empresas_idx` (`id_empresa`),
  CONSTRAINT `FK_cliente_x_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_clientes`
--

LOCK TABLES `gdoks_clientes` WRITE;
/*!40000 ALTER TABLE `gdoks_clientes` DISABLE KEYS */;
INSERT INTO `gdoks_clientes` VALUES (17,NULL,'12.345.678/0001-00','Petrobras SA','Petrobras','2017-08-14 14:32:18',1,'Júlio Rabelo','julio@petrobras.com','1234335676','ftp.petrobras.com.br','gdoks','\�\�\�\��\�[��~�^,');
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
  `nome` varchar(100) DEFAULT NULL,
  `nome_unico` varchar(45) DEFAULT NULL,
  `nome_cliente` varchar(200) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `tamanho` int(11) DEFAULT NULL,
  `id_projeto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_nome_x_projeto` (`nome`,`id_projeto`),
  KEY `FK_daos_x_projetos_idx` (`id_projeto`),
  CONSTRAINT `FK_daos_x_projetos` FOREIGN KEY (`id_projeto`) REFERENCES `gdoks_projetos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=316 DEFAULT CHARSET=utf8 COMMENT='documentos de abertura de operações';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_daos`
--

LOCK TABLES `gdoks_daos` WRITE;
/*!40000 ALTER TABLE `gdoks_daos` DISABLE KEYS */;
INSERT INTO `gdoks_daos` VALUES (314,'DAO 2','159920d926db42','extrato-mariana-abril.pdf','application/pdf',12221,68),(315,'DAO 1','159920d929a5c1','extrato_maio_sergio.pdf','application/pdf',9925,68);
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
  `nome` varchar(100) DEFAULT NULL,
  `sigla` varchar(4) DEFAULT NULL,
  `ativa` bit(1) DEFAULT b'1',
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_sigla` (`sigla`,`id_empresa`),
  KEY `FK_cliente_idx` (`id_empresa`),
  CONSTRAINT `FK_cliente` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_disciplinas`
--

LOCK TABLES `gdoks_disciplinas` WRITE;
/*!40000 ALTER TABLE `gdoks_disciplinas` DISABLE KEYS */;
INSERT INTO `gdoks_disciplinas` VALUES (1,'Direção / Gestão','A','',1),(2,'Administração','B','',1),(3,'Civil','C','',1),(4,'Elétrica','ELE','',1),(5,'Telecomunicações','TEL','',1),(6,'Instrumentação','I','',1),(7,'Suprimentos','H','',1),(8,'Mecânica','M','',1),(9,'Processo','P','',1),(10,'Tecnologia','J','',1),(11,'Estimativas e Controle de Custos','K','',1),(12,'Tubulações','T','',1),(13,'Informática','X','',1),(14,'Planejamento','S','',1),(15,'Automação','U','',1);
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
  `codigo_cliente` varchar(45) DEFAULT NULL,
  `codigo_alternativo` varchar(45) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=617 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_documentos`
--

LOCK TABLES `gdoks_documentos` WRITE;
/*!40000 ALTER TABLE `gdoks_documentos` DISABLE KEYS */;
INSERT INTO `gdoks_documentos` VALUES (615,'Diagrama 1','COD-A001',NULL,NULL,376,50,NULL,NULL),(616,'Planta do Segmento Arbóreo','COD-A002',NULL,NULL,378,27,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_documentos_x_dependencias`
--

LOCK TABLES `gdoks_documentos_x_dependencias` WRITE;
/*!40000 ALTER TABLE `gdoks_documentos_x_dependencias` DISABLE KEYS */;
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
  `nome` varchar(45) NOT NULL,
  `codigo` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_empresas`
--

LOCK TABLES `gdoks_empresas` WRITE;
/*!40000 ALTER TABLE `gdoks_empresas` DISABLE KEYS */;
INSERT INTO `gdoks_empresas` VALUES (1,'Faraday','fday');
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_especialistas`
--

LOCK TABLES `gdoks_especialistas` WRITE;
/*!40000 ALTER TABLE `gdoks_especialistas` DISABLE KEYS */;
INSERT INTO `gdoks_especialistas` VALUES (62,1,1),(68,1,2),(60,1,3),(67,1,4),(23,1,6),(2,1,9),(16,1,10),(14,1,11),(57,1,15),(69,2,2),(66,2,4),(36,2,8),(26,2,14),(61,3,1),(32,3,12),(46,3,13),(56,3,15),(59,4,3),(63,4,4),(1,4,10),(40,4,13),(8,5,7),(12,5,10),(10,5,13),(5,6,10),(20,6,12),(7,7,5),(3,7,7),(30,7,12),(43,7,13),(53,7,15),(65,8,4),(28,8,10),(58,9,3),(44,9,9),(33,9,10),(19,9,12),(55,9,15),(64,10,4),(9,10,5),(29,10,11),(35,10,13),(6,10,14),(54,10,15);
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
  `unique_link` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  KEY `FK_grd_x_id_projeto_idx` (`id_projeto`),
  CONSTRAINT `FK_grd_x_id_projeto` FOREIGN KEY (`id_projeto`) REFERENCES `gdoks_projetos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_grds`
--

LOCK TABLES `gdoks_grds` WRITE;
/*!40000 ALTER TABLE `gdoks_grds` DISABLE KEYS */;
/*!40000 ALTER TABLE `gdoks_grds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_grds_x_revisoes`
--

DROP TABLE IF EXISTS `gdoks_grds_x_revisoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_grds_x_revisoes` (
  `id_grd` int(11) NOT NULL,
  `id_revisao` int(11) NOT NULL,
  `id_codEMI` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `nFolhas` int(11) DEFAULT NULL,
  `nVias` int(11) DEFAULT NULL,
  UNIQUE KEY `UQ_id_grd_x_id_rev` (`id_revisao`,`id_grd`),
  KEY `FK_grd_revisoes_x_id_revisoes_idx` (`id_revisao`),
  KEY `FK_grd_grd_x_id_grd_idx` (`id_grd`),
  KEY `FK_grd_x_rev_id_codEMI_idx` (`id_codEMI`),
  KEY `FK_grd_x_rev_id_tipo_idx` (`id_tipo`),
  CONSTRAINT `FK_grd_grd_x_id_grd` FOREIGN KEY (`id_grd`) REFERENCES `gdoks_grds` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_grd_revisoes_x_id_revisoes` FOREIGN KEY (`id_revisao`) REFERENCES `gdoks_revisoes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_grd_x_rev_id_codEMI` FOREIGN KEY (`id_codEMI`) REFERENCES `gdoks_codigos_emi` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_grd_x_rev_id_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `gdoks_tipos_de_doc` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_grds_x_revisoes`
--

LOCK TABLES `gdoks_grds_x_revisoes` WRITE;
/*!40000 ALTER TABLE `gdoks_grds_x_revisoes` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_hhemdocs`
--

LOCK TABLES `gdoks_hhemdocs` WRITE;
/*!40000 ALTER TABLE `gdoks_hhemdocs` DISABLE KEYS */;
INSERT INTO `gdoks_hhemdocs` VALUES (15,616,2,4);
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
) ENGINE=InnoDB AUTO_INCREMENT=374 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_log`
--

LOCK TABLES `gdoks_log` WRITE;
/*!40000 ALTER TABLE `gdoks_log` DISABLE KEYS */;
INSERT INTO `gdoks_log` VALUES (1,1,1,NULL,'2017-06-25 01:33:17'),(2,1,1,NULL,'2017-06-25 08:50:04'),(3,1,1,NULL,'2017-06-25 09:19:48'),(4,1,1,NULL,'2017-06-25 09:25:54'),(5,1,1,NULL,'2017-06-25 09:34:44'),(6,1,1,NULL,'2017-06-25 09:39:00'),(7,1,1,NULL,'2017-06-25 09:43:28'),(8,1,1,NULL,'2017-06-25 11:56:43'),(9,1,1,NULL,'2017-06-25 14:26:28'),(10,1,1,NULL,'2017-06-25 17:35:02'),(11,1,37,'2,[8|1]','2017-06-25 17:36:53'),(12,1,37,'15,[7|10|9|3|1]','2017-06-25 17:37:15'),(13,1,37,'3,[9|4|1]','2017-06-25 17:37:30'),(14,1,37,'1,[3|1]','2017-06-25 17:37:53'),(15,1,37,'4,[4|10|8|2|1]','2017-06-25 17:38:09'),(16,1,39,'292,82','2017-06-25 17:40:21'),(17,1,39,'292,83','2017-06-25 17:41:16'),(18,1,39,'292,84','2017-06-25 17:42:03'),(19,1,1,NULL,'2017-06-26 06:00:12'),(20,1,1,NULL,'2017-06-26 08:04:12'),(21,1,1,NULL,'2017-06-26 12:03:03'),(22,1,40,'55,FRY-12345.12345,20','2017-06-26 14:36:57'),(23,1,42,'55,FRY-12345.12345,20','2017-06-26 14:52:28'),(24,1,42,'55,FRY-12345.12345,35','2017-06-26 14:53:16'),(25,1,42,'55,FRY-12345.12345,35','2017-06-26 14:55:59'),(26,1,1,NULL,'2017-06-26 17:04:16'),(27,1,1,NULL,'2017-06-27 05:48:33'),(28,1,1,NULL,'2017-06-27 05:50:32'),(29,1,1,NULL,'2017-06-27 09:52:05'),(30,1,40,'56,NDR-1111-1111,10','2017-06-27 09:52:48'),(31,1,39,'208,85','2017-06-27 09:53:41'),(32,1,38,'10,[3|1]','2017-06-27 09:54:12'),(33,1,39,'68,86','2017-06-27 09:55:56'),(34,1,38,'2,[2|1]','2017-06-27 09:56:18'),(35,1,17,'0,Projeto 1,PRJ-1,5,1,2017-06-27T13:02:18.943Z,2017-08-31T03:00:00.000Z,1','2017-06-27 10:02:38'),(36,1,18,'0,Área 1,A1,61','2017-06-27 10:02:48'),(37,1,18,'0,Área 2,A2,61','2017-06-27 10:02:56'),(38,1,35,'0,A11,A11,181','2017-06-27 10:03:11'),(39,1,24,'0,Documento 1,DOC1,2017-06-21,61,47,361','2017-06-27 10:04:01'),(40,1,40,'57,NDV-0001-0001,61','2017-06-27 10:04:43'),(41,1,40,'58,NDV-0002-0001,61','2017-06-27 10:13:40'),(42,1,39,'601,87','2017-06-27 10:14:32'),(43,1,41,'58','2017-06-27 10:15:19'),(44,1,1,NULL,'2017-06-28 14:48:24'),(45,1,3,'Sérgio Moura,sergiomoura@faraday.com.br,sergio2,1','2017-06-28 15:05:19'),(46,1,3,'Sérgio Moura,sergiomoura@faraday.com.br,sergio,1','2017-06-28 15:05:25'),(47,1,1,NULL,'2017-06-28 20:22:35'),(48,1,1,NULL,'2017-06-28 21:40:25'),(49,1,1,NULL,'2017-06-28 23:40:29'),(50,1,1,NULL,'2017-06-28 23:40:49'),(51,1,1,NULL,'2017-06-28 23:55:18'),(52,1,1,NULL,'2017-06-28 23:56:01'),(53,1,1,NULL,'2017-06-29 00:38:31'),(54,1,1,NULL,'2017-06-29 00:39:37'),(55,1,1,NULL,'2017-06-29 00:41:02'),(56,1,1,NULL,'2017-06-29 02:11:07'),(57,1,1,NULL,'2017-06-29 02:11:39'),(58,1,1,NULL,'2017-06-29 02:12:30'),(59,1,1,NULL,'2017-06-29 02:41:08'),(60,1,1,NULL,'2017-06-29 02:43:25'),(61,1,1,NULL,'2017-06-29 02:45:17'),(62,1,1,NULL,'2017-06-29 02:46:12'),(63,1,1,NULL,'2017-06-29 06:40:15'),(64,1,1,NULL,'2017-06-29 06:45:15'),(65,1,1,NULL,'2017-06-29 09:08:57'),(66,1,1,NULL,'2017-06-29 09:14:38'),(67,1,1,NULL,'2017-06-29 09:29:05'),(68,1,1,NULL,'2017-06-29 10:23:37'),(69,1,1,NULL,'2017-06-29 10:29:29'),(70,1,1,NULL,'2017-06-29 10:29:36'),(71,1,1,NULL,'2017-06-29 10:31:29'),(72,1,1,NULL,'2017-06-29 10:45:45'),(73,1,1,NULL,'2017-06-29 11:57:15'),(74,1,1,NULL,'2017-06-29 11:57:28'),(75,1,1,NULL,'2017-06-29 12:08:40'),(76,1,1,NULL,'2017-06-29 12:08:51'),(77,1,1,NULL,'2017-06-29 13:10:19'),(78,1,1,NULL,'2017-06-29 13:33:21'),(79,1,1,NULL,'2017-06-29 13:33:26'),(80,1,1,NULL,'2017-06-29 13:45:38'),(81,1,1,NULL,'2017-06-29 14:19:41'),(82,1,1,NULL,'2017-06-29 15:21:13'),(83,1,1,NULL,'2017-06-29 15:36:55'),(84,1,1,NULL,'2017-06-29 15:40:03'),(85,1,1,NULL,'2017-06-29 15:44:09'),(86,1,1,NULL,'2017-06-29 15:44:15'),(87,1,1,NULL,'2017-06-29 15:44:32'),(88,1,1,NULL,'2017-06-29 15:53:29'),(89,1,1,NULL,'2017-06-29 15:53:35'),(90,1,1,NULL,'2017-06-29 15:59:37'),(91,1,1,NULL,'2017-06-29 16:15:38'),(92,1,1,NULL,'2017-06-29 16:15:42'),(93,1,1,NULL,'2017-06-29 16:15:47'),(94,1,1,NULL,'2017-06-29 16:16:14'),(95,1,1,NULL,'2017-06-29 16:19:04'),(96,1,1,NULL,'2017-06-29 16:28:33'),(97,1,1,NULL,'2017-06-29 16:28:50'),(98,1,1,NULL,'2017-06-29 16:29:24'),(99,1,1,NULL,'2017-06-29 16:45:47'),(100,1,1,NULL,'2017-06-29 19:09:40'),(101,1,1,NULL,'2017-06-29 19:40:32'),(102,1,1,NULL,'2017-06-29 19:41:45'),(103,1,1,NULL,'2017-06-29 19:41:49'),(104,1,1,NULL,'2017-06-29 19:50:47'),(105,1,1,NULL,'2017-06-29 19:57:30'),(106,1,1,NULL,'2017-06-29 19:58:07'),(107,1,1,NULL,'2017-06-30 03:45:48'),(108,1,1,NULL,'2017-06-30 04:07:10'),(109,1,1,NULL,'2017-06-30 04:08:57'),(110,1,1,NULL,'2017-06-30 04:09:26'),(111,1,1,NULL,'2017-06-30 04:14:15'),(112,1,1,NULL,'2017-06-30 04:14:20'),(113,1,1,NULL,'2017-06-30 04:29:18'),(114,1,1,NULL,'2017-06-30 04:33:37'),(115,1,1,NULL,'2017-06-30 09:29:28'),(116,1,1,NULL,'2017-06-30 08:47:43'),(117,1,1,NULL,'2017-06-30 09:04:14'),(118,1,1,NULL,'2017-06-30 09:11:26'),(119,1,1,NULL,'2017-06-30 09:12:55'),(120,1,4,'Teste Oitenta e Oito da Silva,teste88@teste.com,teste88,1','2017-06-30 09:30:07'),(121,1,3,'Teste Oito da Silva,teste8@teste.com,teste8,1','2017-06-30 09:30:38'),(122,1,4,'Teste 9,teste9@teste.com,teste9,1','2017-06-30 09:31:23'),(123,1,1,NULL,'2017-06-30 09:37:51'),(124,1,4,'Teste 10,teste10@teste.com,teste10,1','2017-06-30 09:38:24'),(125,1,1,NULL,'2017-06-30 09:39:03'),(126,1,4,'Teste 11,teste11@teste.com,teste11,1','2017-06-30 09:40:20'),(127,1,1,NULL,'2017-06-30 10:15:28'),(128,1,4,'Teste 12,teste12@teste.com,teste12,1','2017-06-30 10:16:07'),(129,17,1,NULL,'2017-06-30 10:16:28'),(130,1,1,NULL,'2017-06-30 10:16:53'),(131,1,17,'0,Projeto 2,PRJ-2,1,2,2017-06-30T03:00:00.000Z,2017-08-31T03:00:00.000Z,1','2017-06-30 10:18:05'),(132,1,18,'0,Área 1,A1,62','2017-06-30 10:18:37'),(133,1,18,'0,Área 2,A2,62','2017-06-30 10:18:47'),(134,1,35,'0,Sub 1.1,S1.1,183','2017-06-30 10:19:09'),(135,1,35,'0,Sub 1.2,S1.2,184','2017-06-30 10:19:40'),(136,1,35,'0,Sub 2.1,S2.1,184','2017-06-30 10:20:02'),(137,1,35,'0,Sub 2.2,S2.2,184','2017-06-30 10:20:36'),(138,1,21,'dao 5,large-1102328-1.jpg,image/jpeg,75792,301','2017-06-30 10:25:03'),(139,1,21,'dao 4,doc.pdf,application/pdf,1352,302','2017-06-30 10:25:03'),(140,1,21,'dao 3,1215471604fESdi9X.jpg,image/jpeg,181485,303','2017-06-30 10:25:03'),(141,1,21,'dao 2,1214751884LpWxall.jpg,image/jpeg,76772,304','2017-06-30 10:25:03'),(142,1,21,'dao 1,1214625936yZynHVd.jpg,image/jpeg,143196,305','2017-06-30 10:25:03'),(143,1,34,'363,Sub 1.2,S1.2,183','2017-06-30 10:27:31'),(144,1,24,'0,PRJ2-Doc1,PRJ2-DOC1-0001,2017-07-14,62,27,363','2017-06-30 10:29:15'),(145,1,24,'0,Prj2-DOC2,proj3-DOC2-0001,2017-07-28,62,11,365','2017-06-30 10:52:28'),(146,1,39,'602,88','2017-06-30 10:56:27'),(147,1,38,'3,[9|3|1]','2017-06-30 11:01:11'),(148,1,40,'59,FRY-00001-00001,62','2017-06-30 11:02:35'),(149,1,41,'59','2017-06-30 11:03:11'),(150,1,39,'603,89','2017-06-30 11:11:19'),(151,1,1,NULL,'2017-06-30 18:35:38'),(152,1,17,'0,Projeto 3,PRJ-001,1,3,2017-06-30T22:36:48.343Z,2017-09-01T03:00:00.000Z,1','2017-06-30 18:37:41'),(153,1,24,'0,Planta SPDA,E11,2017-06-30,62,54,362','2017-06-30 18:43:33'),(154,1,39,'604,90','2017-06-30 18:50:57'),(155,1,38,'4,[3|9|4]','2017-06-30 18:51:49'),(156,1,38,'4,[3|9|4|1]','2017-06-30 18:52:18'),(157,1,23,'604,Planta SPDA,FRY-1704.00-E11-004,1,604,75,2017-06-30,90,62,54,362','2017-06-30 19:00:12'),(158,1,39,'604,91','2017-06-30 19:19:54'),(159,1,40,'60,FRY-1704-GRD-001,62','2017-06-30 19:21:53'),(160,1,41,'60','2017-06-30 19:26:20'),(161,1,41,'60','2017-06-30 19:26:39'),(162,1,1,NULL,'2017-07-01 09:50:00'),(163,1,17,'0,Projeto 5,PRJ-5,1,2,2017-07-01T13:50:25.040Z,2017-08-31T03:00:00.000Z,1','2017-07-01 09:51:41'),(164,1,18,'0,1000,1000,64','2017-07-01 09:52:26'),(165,1,35,'0,1001,1001,185','2017-07-01 09:52:44'),(166,1,18,'0,2000,2000,64','2017-07-01 09:53:06'),(167,1,18,'0,3000,3000,64','2017-07-01 09:53:16'),(168,1,35,'0,2001,2001,186','2017-07-01 09:53:37'),(169,1,35,'0,3001,3001,187','2017-07-01 09:54:04'),(170,1,21,'Dao 3,plot.log,application/octet-stream,640,306','2017-07-01 10:00:35'),(171,1,21,'Dao 2,nfse-1000814-0-201706031111559475980.pdf,application/pdf,48128,307','2017-07-01 10:00:35'),(172,1,21,'Dao 1,guia19465-20170603111233.pdf,application/pdf,106163,308','2017-07-01 10:00:35'),(173,1,24,'0,Planta de Iluminação dos Vasos,DOC1-0001,2017-07-03,64,52,367','2017-07-01 10:06:11'),(174,1,24,'0,Planta do Cacete Armado de Tony,TONY-1000,2017-07-27,64,44,366','2017-07-01 10:08:29'),(175,1,39,'605,92','2017-07-01 10:28:23'),(176,1,40,'61,gasdafs,64','2017-07-01 10:38:33'),(177,1,39,'605,93','2017-07-01 10:55:15'),(178,1,40,'62,234234234,64','2017-07-01 10:55:55'),(179,1,41,'62','2017-07-01 10:56:08'),(180,1,40,'63,sfsfdsdffds,64','2017-07-01 11:12:49'),(181,1,1,NULL,'2017-07-05 10:13:15'),(182,1,44,'62','2017-07-05 10:17:53'),(183,1,44,'62','2017-07-05 10:18:59'),(184,1,1,NULL,'2017-07-05 13:07:58'),(185,1,44,'60','2017-07-05 14:15:59'),(186,1,44,'60','2017-07-05 14:32:11'),(187,1,44,'60','2017-07-05 14:36:35'),(188,1,45,'60','2017-07-05 15:05:07'),(189,1,45,'60,[smouracalmon@gmail.com,mariri@gmail.com]','2017-07-05 15:08:41'),(190,1,45,'60','2017-07-05 16:07:21'),(191,1,1,NULL,'2017-07-06 09:28:35'),(192,1,44,'60','2017-07-06 09:34:27'),(193,1,1,NULL,'2017-07-06 10:07:29'),(194,1,17,'0,Projeto 100,PRJ100,3,1,2017-06-30T03:00:00.000Z,2017-07-06T14:13:40.551Z,1','2017-07-06 10:14:15'),(195,1,18,'0,Área 1,A1,65','2017-07-06 10:14:27'),(196,1,35,'0,Subárea 1,S1,188','2017-07-06 10:14:46'),(197,1,24,'0,Documento XXX,DOC 111,DOC 111,,2017-07-11,65,45,369','2017-07-06 10:16:03'),(198,1,39,'607,94','2017-07-06 10:16:40'),(199,1,40,'64,88888888,65','2017-07-06 10:18:06'),(200,1,41,'64','2017-07-06 10:18:17'),(201,1,1,NULL,'2017-07-06 23:30:17'),(202,1,1,NULL,'2017-07-06 23:51:16'),(203,1,1,NULL,'2017-07-06 23:52:48'),(204,1,1,NULL,'2017-07-06 23:53:41'),(205,1,1,NULL,'2017-07-06 23:56:43'),(206,1,1,NULL,'2017-07-07 00:29:49'),(207,1,1,NULL,'2017-07-07 00:36:52'),(208,1,45,'60','2017-07-07 01:16:29'),(209,1,45,'60','2017-07-07 01:25:35'),(210,1,45,'60','2017-07-07 07:21:53'),(211,1,45,'60','2017-07-07 08:27:03'),(212,1,1,NULL,'2017-07-07 10:46:39'),(213,1,32,'5,Teste,50','2017-07-07 10:47:59'),(214,1,33,'5','2017-07-07 10:48:12'),(215,1,1,NULL,'2017-07-08 08:43:12'),(216,1,1,NULL,'2017-07-08 16:03:09'),(217,2,1,NULL,'2017-07-08 22:04:09'),(218,1,1,NULL,'2017-07-09 15:19:15'),(219,1,1,NULL,'2017-07-09 16:22:09'),(220,1,14,'3,Anderson Documentos LTDA,Anderson Docs','2017-07-09 16:31:59'),(221,1,17,'0,Mina de Andalucia,MANDALuz,3,1,2017-06-01T03:00:00.000Z,2017-08-31T03:00:00.000Z,1','2017-07-09 16:38:15'),(222,1,18,'0,Andalucia A,AA,66','2017-07-09 16:38:59'),(223,1,18,'0,Andalucia B,AB,66','2017-07-09 16:39:10'),(224,1,35,'0,Andalucia A1,AA1,189','2017-07-09 16:39:53'),(225,1,35,'0,Andalucia A2,AA2,189','2017-07-09 16:40:32'),(226,1,35,'0,Andalucia B1,B1,190','2017-07-09 16:41:13'),(227,1,35,'0,Andalucia B2,B2,190','2017-07-09 16:41:57'),(228,1,34,'371,Andalucia A2,A2,189','2017-07-09 16:42:06'),(229,1,34,'370,Andalucia A1,A1,189','2017-07-09 16:42:15'),(230,1,19,'189,Andalucia A,Anda-A,66','2017-07-09 16:44:32'),(231,1,19,'190,Andalucia B,Anda-B,66','2017-07-09 16:44:48'),(232,1,24,'0,Planta SPDA 1,FRY-SPDA-0001-2017,SPDA-0001,,2017-08-01,66,54,370','2017-07-09 16:46:58'),(233,1,24,'0,Diagrama Unif,FRY-DUNIF-0001,ANDS-0001,,2017-08-01,66,48,372','2017-07-09 16:50:53'),(234,1,24,'0,Diag. Trif. Funcional,FRY-TRIFUN-0001,TRIFUN-2017-0001,,2017-08-01,66,49,370','2017-07-09 16:54:44'),(235,1,24,'0,Diagrama de Blocos,FRY-DIAGBLOC-2017-0001,FRY-DIAGBLOC-2017-0001,,2017-08-01,66,111,370','2017-07-09 16:58:31'),(236,1,39,'610,95','2017-07-09 17:03:22'),(237,1,39,'608,96','2017-07-09 17:05:11'),(238,1,39,'609,97','2017-07-09 17:06:44'),(239,1,39,'611,98','2017-07-09 17:08:09'),(240,1,38,'5,[1]','2017-07-09 17:08:40'),(241,1,23,'611,Diagrama de Interligação,FRY-DIAG-2017-0001,FRY-DIAG-2017-0001,,1,611,50,2017-08-01,98,66,50,370','2017-07-09 17:12:07'),(242,1,39,'611,99','2017-07-09 17:13:11'),(243,1,40,'65,GRD-0001-2017,66','2017-07-09 17:19:40'),(244,1,41,'65','2017-07-09 17:19:54'),(245,1,41,'65','2017-07-09 17:20:09'),(246,1,14,'3,Anderson Documentos LTDA,Anderson Docs','2017-07-09 17:21:27'),(247,1,40,'66,GRD-2017-0001,66','2017-07-09 17:22:04'),(248,1,41,'66','2017-07-09 17:22:13'),(249,1,41,'66','2017-07-09 17:22:31'),(250,1,1,NULL,'2017-07-09 17:23:07'),(251,1,40,'67,GRD-2017-000002,66','2017-07-09 17:23:44'),(252,1,41,'67','2017-07-09 17:24:22'),(253,1,1,NULL,'2017-07-09 17:29:32'),(254,1,1,NULL,'2017-07-09 17:33:37'),(255,1,1,NULL,'2017-07-09 17:37:36'),(256,1,21,'DAO 1,CURSO DE MARKETING E VENDA DE LIVROS.docx,application/vnd.openxmlformats-officedocument,152377','2017-07-09 17:38:17'),(257,1,24,'0,Diagrama Unifilar 01,FRY-DIAGUNIF-0001,CLI-0001,,2017-08-31,66,48,371','2017-07-09 17:39:40'),(258,1,39,'612,100','2017-07-09 17:40:33'),(259,1,1,NULL,'2017-07-09 17:44:21'),(260,1,22,'309,DAO 1,15962a2496b192','2017-07-09 17:44:48'),(261,1,21,'DAO1,ANUNCIO PREÇO LIVROS CLE.docx,application/vnd.openxmlformats-officedocument,12941,310','2017-07-09 17:45:00'),(262,1,1,NULL,'2017-07-09 17:47:13'),(263,1,24,'0,Diagrama De Interligação B1,FRY-DIAGINTER-2017-0001,CLI-0001,,2017-08-01,66,50,372','2017-07-09 17:49:01'),(264,1,39,'613,101','2017-07-09 17:50:05'),(265,1,40,'71,GRD-2017-0005,66','2017-07-09 17:50:51'),(266,1,41,'71','2017-07-09 17:51:25'),(267,1,1,NULL,'2017-07-12 12:40:02'),(268,1,1,NULL,'2017-07-14 09:57:07'),(269,1,44,'60','2017-07-14 09:57:53'),(270,1,45,'60','2017-07-14 10:03:43'),(271,1,44,'60','2017-07-14 10:13:28'),(272,1,1,NULL,'2017-07-14 20:04:52'),(273,1,44,'60','2017-07-14 20:06:05'),(274,1,45,'60','2017-07-14 20:18:18'),(275,1,45,'60','2017-07-14 20:24:41'),(276,1,44,'60','2017-07-14 20:25:54'),(277,1,14,'1,Runolfsdottir and Sons,Runolfsdottir and Sons','2017-07-14 20:27:50'),(278,1,1,NULL,'2017-07-14 20:28:21'),(279,1,1,NULL,'2017-07-14 21:21:59'),(280,1,1,NULL,'2017-07-14 23:13:23'),(281,1,1,NULL,'2017-07-14 23:19:20'),(282,1,14,'1,Runolfsdottir and Sons,Runolfsdottir and Sons','2017-07-14 23:52:01'),(283,1,1,NULL,'2017-07-14 23:52:30'),(284,1,45,'60','2017-07-14 23:53:59'),(285,1,1,NULL,'2017-07-15 06:39:07'),(286,1,40,'72,GRD-2017-000041,65','2017-07-15 06:52:57'),(287,1,44,'72','2017-07-15 06:54:13'),(288,1,45,'72','2017-07-15 06:56:34'),(289,1,14,'3,Anderson Documentos LTDA,Anderson Docs','2017-07-15 06:59:07'),(290,1,1,NULL,'2017-07-15 07:00:14'),(291,1,1,NULL,'2017-07-15 07:01:45'),(292,1,1,NULL,'2017-07-15 07:01:51'),(293,1,1,NULL,'2017-07-15 07:02:30'),(294,1,1,NULL,'2017-07-15 07:03:33'),(295,1,1,NULL,'2017-07-15 07:16:31'),(296,1,43,'72','2017-07-15 07:52:57'),(297,1,40,'73,GRD-2017-000042,66','2017-07-15 08:04:33'),(298,1,43,'73','2017-07-15 08:05:11'),(299,1,40,'74,GRD-2017-000043,66','2017-07-15 08:52:12'),(300,1,43,'74','2017-07-15 08:53:41'),(301,1,1,NULL,'2017-07-15 09:07:17'),(302,1,1,NULL,'2017-07-18 10:38:57'),(303,1,1,NULL,'2017-07-22 21:10:29'),(304,1,39,'559,102','2017-07-22 21:15:31'),(305,1,40,'75,GRD-2017-000044,54','2017-07-22 21:25:37'),(306,1,44,'75','2017-07-22 21:29:58'),(307,1,1,NULL,'2017-07-23 08:31:15'),(308,1,1,NULL,'2017-07-25 07:14:45'),(309,1,1,NULL,'2017-07-26 09:11:00'),(310,1,15,'16,Antoni','2017-07-26 09:17:55'),(311,1,17,'0,projeto eletrico,200.155.98,16,3,2017-07-26T13:18:40.729Z,2017-07-26T03:00:00.000Z,1','2017-07-26 09:20:31'),(312,1,18,'0,1000,1001,67','2017-07-26 09:21:43'),(313,1,18,'0,patio1,1000,67','2017-07-26 09:22:35'),(314,1,20,'191,1000,1001,67','2017-07-26 09:22:43'),(315,1,18,'0,patio2,2000,67','2017-07-26 09:24:13'),(316,1,35,'0,-,1001,192','2017-07-26 09:29:20'),(317,1,21,'BBB-001-2017,Desert.jpg,image/jpeg,845941,311','2017-07-26 09:33:25'),(318,1,21,'ATA-001-2017,Chrysanthemum.jpg,image/jpeg,879394,312','2017-07-26 09:33:25'),(319,1,21,'ACA-001-2017,Tulips.jpg,image/jpeg,620888,313','2017-07-26 09:34:23'),(320,1,24,'0,PROCEDIMENTO,FRY-1705.00-E18-001,PR-3100.00-1000-300-FRY-001,JPW-1705.00-E18-050,2017-08-26,67,46,','2017-07-26 09:49:55'),(321,1,39,'614,103','2017-07-26 09:53:37'),(322,1,14,'16,Anthony,Anthony Engenharia','2017-07-26 10:16:08'),(323,1,40,'76,GRD-2017-000045,67','2017-07-26 10:19:48'),(324,1,45,'76','2017-07-26 10:37:47'),(325,1,4,'Ricardo,ricardo.luis@faraday.com.br,ricardo,1','2017-07-26 10:55:04'),(326,1,1,NULL,'2017-07-28 06:53:53'),(327,1,1,NULL,'2017-08-01 07:12:41'),(328,1,3,'Ricardo,ricardo.luis@faraday.com.br,ricardo,1','2017-08-01 07:58:11'),(329,1,1,NULL,'2017-08-01 08:20:09'),(330,1,3,'Anthony Valério,anthony@faraday.com.br,tony,1','2017-08-01 08:25:47'),(331,1,37,'2,[1|2]','2017-08-01 08:26:55'),(332,1,38,'4,[3|1|2]','2017-08-01 08:27:21'),(333,1,1,NULL,'2017-08-01 21:20:35'),(334,1,1,NULL,'2017-08-03 02:22:14'),(335,2,1,NULL,'2017-08-07 16:08:38'),(336,18,1,NULL,'2017-08-07 19:49:26'),(337,2,1,NULL,'2017-08-07 19:49:45'),(338,1,1,NULL,'2017-08-07 19:55:05'),(339,1,1,NULL,'2017-08-14 07:23:45'),(340,1,1,NULL,'2017-08-14 09:21:56'),(341,1,1,NULL,'2017-08-14 14:26:53'),(342,1,15,'17,Petrobras SA','2017-08-14 14:32:18'),(343,1,1,NULL,'2017-08-14 17:43:47'),(344,1,17,'0,Ponde Sobre São Franscisco,COD-0001,17,2,2017-07-01T03:00:00.000Z,2017-09-05T03:00:00.000Z,1','2017-08-14 17:50:46'),(345,1,18,'0,1000,Lado Leste,68','2017-08-14 17:51:05'),(346,1,18,'0,2000,Lado Oeste,68','2017-08-14 17:51:16'),(347,1,35,'0,,1001,194','2017-08-14 17:51:37'),(348,1,35,'0,,1002,194','2017-08-14 17:51:49'),(349,1,35,'0,,2001,195','2017-08-14 17:51:59'),(350,1,35,'0,,2002,195','2017-08-14 17:52:07'),(351,1,21,'DAO 2,extrato-mariana-abril.pdf,application/pdf,12221,314','2017-08-14 17:52:34'),(352,1,21,'DAO 1,extrato_maio_sergio.pdf,application/pdf,9925,315','2017-08-14 17:52:34'),(353,1,24,'0,Diagrama 1,COD-A001,,,2017-12-31,68,50,376','2017-08-14 17:54:17'),(354,1,23,'615,Diagrama 1,COD-A001,,,1,615,,0,2017-12-31,,68,50,376','2017-08-14 18:01:24'),(355,1,24,'0,Planta do Segmento Arbóreo,COD-A002,,,2017-08-15,68,27,378','2017-08-14 18:02:51'),(356,1,1,NULL,'2017-08-14 23:33:37'),(357,1,1,NULL,'2017-08-15 15:47:15'),(358,1,16,'68,COD-0001,Ponte Sobre São Francisco,17,2,2017-07-01,2017-09-05,1','2017-08-15 15:49:28'),(359,1,1,NULL,'2017-08-16 07:13:25'),(360,1,39,'617,104','2017-08-16 09:23:44'),(361,1,39,'617,105','2017-08-16 09:25:27'),(362,1,39,'617,106','2017-08-16 09:26:14'),(363,1,40,'77,GRD-2017-000001,68','2017-08-16 09:37:42'),(364,1,39,'616,107','2017-08-16 10:40:36'),(365,1,39,'616,108','2017-08-16 10:41:24'),(366,1,39,'616,109','2017-08-16 10:42:17'),(367,1,39,'616,110','2017-08-16 10:42:48'),(368,1,39,'616,111','2017-08-16 10:43:32'),(369,1,39,'616,112','2017-08-16 10:44:47'),(370,1,1,NULL,'2017-08-16 14:07:01'),(371,1,1,NULL,'2017-08-16 15:53:33'),(372,1,3,'Sérgio Moura,sergiomoura@faraday.com.br,sergio,1','2017-08-16 16:03:46'),(373,1,3,'Sérgio Moura,sergiomoura@faraday.com.br,sergio,1','2017-08-16 16:04:02');
/*!40000 ALTER TABLE `gdoks_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_observacoes`
--

DROP TABLE IF EXISTS `gdoks_observacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_observacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_grd` int(11) NOT NULL,
  `id_revisao` int(11) NOT NULL,
  `obs` text,
  `comentario_cliente` text,
  `data_recebida` date DEFAULT NULL,
  `datahora_registrada` datetime DEFAULT NULL,
  `idu` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_grd_x_revisao_idx` (`id_grd`,`id_revisao`),
  KEY `FK_obs_x_idu_idx` (`idu`),
  CONSTRAINT `FK_grd_x_revisao` FOREIGN KEY (`id_grd`, `id_revisao`) REFERENCES `gdoks_grds_x_revisoes` (`id_grd`, `id_revisao`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_obs_x_idu` FOREIGN KEY (`idu`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_observacoes`
--

LOCK TABLES `gdoks_observacoes` WRITE;
/*!40000 ALTER TABLE `gdoks_observacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `gdoks_observacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_observacoes_arquivos`
--

DROP TABLE IF EXISTS `gdoks_observacoes_arquivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_observacoes_arquivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caminho` varchar(60) DEFAULT NULL,
  `nome_cliente` varchar(60) DEFAULT NULL,
  `id_observacao` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_id_obs_x_arquivo_idx` (`id_observacao`),
  CONSTRAINT `FK_id_obs_x_arquivo` FOREIGN KEY (`id_observacao`) REFERENCES `gdoks_observacoes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_observacoes_arquivos`
--

LOCK TABLES `gdoks_observacoes_arquivos` WRITE;
/*!40000 ALTER TABLE `gdoks_observacoes_arquivos` DISABLE KEYS */;
/*!40000 ALTER TABLE `gdoks_observacoes_arquivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_opcoes_de_telas`
--

DROP TABLE IF EXISTS `gdoks_opcoes_de_telas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_opcoes_de_telas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(60) NOT NULL,
  `valor_padrao` tinyint(4) NOT NULL DEFAULT '1',
  `abreviacao` varchar(20) NOT NULL,
  `id_tela` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_id_opcao_de_tela_x_id_tela` (`id`,`id_tela`),
  UNIQUE KEY `abreviacao_UNIQUE` (`abreviacao`),
  KEY `FK_id_opcoes_de_tela_x_tela_idx` (`id_tela`),
  CONSTRAINT `FK_id_opcoes_de_tela_x_tela` FOREIGN KEY (`id_tela`) REFERENCES `gdoks_telas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_opcoes_de_telas`
--

LOCK TABLES `gdoks_opcoes_de_telas` WRITE;
/*!40000 ALTER TABLE `gdoks_opcoes_de_telas` DISABLE KEYS */;
INSERT INTO `gdoks_opcoes_de_telas` VALUES (1,'Cadastrar novo projeto',1,'CadastrarNovoPrj',1),(2,'Acessar um projeto cadastrado',1,'AcessarPrj',1),(3,'Adicionar um novo usuário',1,'AddNovoUsuario',2),(4,'Acessar/Alterar o cadastro de um outro usuário',1,'AlterarUsuario',2),(5,'Criar uma nova GRD',1,'CriarGRD',4),(6,'Enviar uma GRD ao cliente',1,'EnviarGRD',4),(7,'Acessar a tela de um documento a partir da tela da GRD',0,'AcessarDocDeGRD',4),(8,'Adicionar uma disciplina',1,'AddDisc',5),(9,'Acessar/Alterar as informações de uma disciplina',1,'AlterarDisc',5),(10,'Cadastrar especialistas na disciplina',1,'CadastrarEspEmDisc',5),(11,'Cadastrar validadores na disciplina',1,'CadastrarValEmDisc',5),(12,'Adicionar Cliente',1,'AddCliente',6),(13,'Acessar/Alterar informações de um cliente',1,'AlterarCliente',6),(14,'Adicionar um cargo',1,'AddCargo',7),(15,'Alterar as informações de um cargo (Valor da HH, etc)',1,'AlterarCargo',7),(16,'Remover um cargo',1,'RemoverCargo',7);
/*!40000 ALTER TABLE `gdoks_opcoes_de_telas` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_pdas`
--

LOCK TABLES `gdoks_pdas` WRITE;
/*!40000 ALTER TABLE `gdoks_pdas` DISABLE KEYS */;
INSERT INTO `gdoks_pdas` VALUES (104,70,617,1,'2017-08-16 09:24:16',1,'2017-08-16 09:23:44','...'),(105,100,617,1,'2017-08-16 09:25:35',1,'2017-08-16 09:25:27','...'),(106,100,617,NULL,NULL,1,'2017-08-16 09:26:14','..'),(107,35,616,1,'2017-08-16 10:40:42',1,'2017-08-16 10:40:36','Vai chegar'),(108,70,616,1,'2017-08-16 10:41:36',1,'2017-08-16 10:41:24','Vai chegar...'),(109,80,616,1,'2017-08-16 10:42:23',1,'2017-08-16 10:42:17','Vaaaaaai chegar...'),(110,80,616,NULL,NULL,1,'2017-08-16 10:42:47','Tá progredindo....'),(111,95,616,1,'2017-08-16 10:44:09',1,'2017-08-16 10:43:31','...'),(112,100,616,1,'2017-08-16 10:44:51',1,'2017-08-16 10:44:46','Cabou!');
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
  CONSTRAINT `FK_id_arquivo_x_arquivos` FOREIGN KEY (`id_arquivo`) REFERENCES `gdoks_arquivos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_id_pda_x_pdas` FOREIGN KEY (`id_pda`) REFERENCES `gdoks_pdas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1307 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_pdas_x_arquivos`
--

LOCK TABLES `gdoks_pdas_x_arquivos` WRITE;
/*!40000 ALTER TABLE `gdoks_pdas_x_arquivos` DISABLE KEYS */;
INSERT INTO `gdoks_pdas_x_arquivos` VALUES (1296,104,229),(1297,105,230),(1298,106,231),(1299,107,232),(1300,108,233),(1301,109,234),(1302,110,235),(1303,111,235),(1304,111,236),(1305,112,236),(1306,112,237);
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
  `nome` varchar(100) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_projetos`
--

LOCK TABLES `gdoks_projetos` WRITE;
/*!40000 ALTER TABLE `gdoks_projetos` DISABLE KEYS */;
INSERT INTO `gdoks_projetos` VALUES (68,'Ponte Sobre São Francisco','COD-0001',17,2,1,'2017-07-01','2017-09-05','');
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
  `end_fisico` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_serial__x_doxumento` (`serial`,`id_documento`),
  KEY `FK_id_documento_x_documentos_id_idx` (`id_documento`),
  CONSTRAINT `FK_id_documento_x_documentos_id` FOREIGN KEY (`id_documento`) REFERENCES `gdoks_documentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=619 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_revisoes`
--

LOCK TABLES `gdoks_revisoes` WRITE;
/*!40000 ALTER TABLE `gdoks_revisoes` DISABLE KEYS */;
INSERT INTO `gdoks_revisoes` VALUES (615,1,615,'2017-12-31',0,0,NULL,NULL),(616,1,616,'2017-08-15',100,0,'2017-08-16 10:44:46',NULL),(617,2,615,'2017-12-31',100,0,'2017-08-16 09:26:14','wwww');
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
) ENGINE=InnoDB AUTO_INCREMENT=379 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_subareas`
--

LOCK TABLES `gdoks_subareas` WRITE;
/*!40000 ALTER TABLE `gdoks_subareas` DISABLE KEYS */;
INSERT INTO `gdoks_subareas` VALUES (375,NULL,'1001',194),(376,NULL,'1002',194),(377,NULL,'2001',195),(378,NULL,'2002',195);
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
  `nome` varchar(100) DEFAULT NULL,
  `sigla` varchar(8) DEFAULT NULL,
  `ativa` bit(1) DEFAULT b'1',
  `id_disciplina` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sigla_UNIQUE` (`sigla`),
  KEY `FK_disciplinas_x_subdisciplinas_idx` (`id_disciplina`),
  CONSTRAINT `FK_disciplinas_x_subdisciplinas` FOREIGN KEY (`id_disciplina`) REFERENCES `gdoks_disciplinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_subdisciplinas`
--

LOCK TABLES `gdoks_subdisciplinas` WRITE;
/*!40000 ALTER TABLE `gdoks_subdisciplinas` DISABLE KEYS */;
INSERT INTO `gdoks_subdisciplinas` VALUES (1,'Direção','A01','',1),(2,'Gestão de Contratos','A02','',1),(3,'Comercialização','A03','',1),(4,'Coordenação','A04','',1),(5,'Supervisão','A05','',1),(6,'Secretaria','A06','',1),(7,'Arquivo Técnico','A07','',1),(8,'Proc. Coordenação / Doc. QSSMA','A08','',1),(9,'QSSMA','A09','',1),(10,'Retrabalho','A20','',1),(11,'Direção','B01','',2),(12,'Supervisão','B02','',2),(13,'Treinamento','B03','',2),(14,'Disponibilidade','B04','',2),(15,'Administração Geral','B05','',2),(16,'Folga','B10','',2),(17,'Retrabalho','B20','',2),(18,'Doença','B91','',2),(19,'Permitidas','B92','',2),(20,'Férias','B93','',2),(21,'A compensar','B94','',2),(22,'Descanso em Férias','B96','',2),(23,'Ausências Cargos de Gestão','B97','',2),(24,'Supervisão','C01','',3),(25,'Levantamento de Campo / Levantamento de Documentos)','C02','',3),(26,'Especificação Técnica, Critérios de Projeto','C03','',3),(27,'Des. Terraplenagem','C04','',3),(28,'Des. Implantação (Locação Geral, Arrumento,Pavimentação e Urbanização, Sist. Subterr. e Drenagem)','C05','',3),(29,'Especificação para Cotação e Compra (RM)','C07','',3),(30,'Lista Material (Levant. Quantitativos)','C09','',3),(31,'Comentários DF\'s','C10','',3),(32,'Memorial Descritivo / Relatório','C11','',3),(33,'Memória Cálculo','C12','',3),(34,'Des. Concreto (Formas, Armaduras e Estaqueamento)','C13','',3),(35,'Des. Arquit. (Plantas, Cortes, Fachadas)','C14','',3),(36,'Des. Instal. Hidráulicas','C15','',3),(37,'Desenhos Unifilares Metálica','C16','',3),(38,'Desenhos Detalhamento Metálica','C17','',3),(39,'Bancos de Dados do Projeto Civil','C18','',3),(40,'Retrabalho','C20','',3),(41,'Reunião','C80','',3),(42,'Estágio','C90','',3),(43,'Especificações Técnicas de Equipamentos','E00','',4),(44,'Folha de Dados de Equipamentos','E01','',4),(45,'Requisições de Equipamentos','E02','',4),(46,'Parecer Técnico de Propostas para Equipamentos','E03','',4),(47,'Verificação de Documentos de Fornecedores','E04','',4),(48,'Diagramas Unifilares','E05','',4),(49,'Diagramas Trifilares Funcionais','E06','',4),(50,'Diagramas de Interligação e Conexão','E07','',4),(51,'Desenhos de Detalhes Típicos de Instalações','E08','',4),(52,'Planta de Subestações / Salas de Equipamentos','E09','',4),(53,'Planta de Distribuição de Força e Aterramento','E10','',4),(54,'Planta de Aterramento / SPDA','E11','',4),(55,'Planta de Iluminação','E12','',4),(56,'Listas de Materiais de Instalação','E13','',4),(57,'Análise Técnica de Propostas para Materiais de Instalação','E14','',4),(58,'Listas de Eletrodutos e Cabos','E15','',4),(59,'Listas de Consumidores Elétricos (Lista de Carga)','E16','',4),(60,'Planta de Classificação de Áreas','E17','',4),(61,'Relatórios Técnicos','E18','',4),(62,'Análise Técnica e Concepção de Projeto Básico','E19','',4),(63,'Memoriais Descritivos','E20','',4),(64,'Condicionamento / Preservação','E21','',4),(65,'Plano de Pré-Operação / Partida','E22','',4),(66,'Apoio a Parecer Técnico de Equipamentos Mecânicos','E23','',4),(67,'Apoio à Verificação de Docs. de Fornecedores de Eqptos. Mecânicos','E24','',4),(68,'Cálculos para Projeto (Cabos, Aterramentos, CC, etc.)','E25','',4),(69,'Diagrama Trifilar (Iluminação, CC, Instrumentação)','E26','',4),(70,'Listas em Geral','E27','',4),(71,'vago','E28','',4),(72,'Modelagem Elétrica','E29','',4),(73,'vago','E30','',4),(74,'vago','E31','',4),(75,'vago','E32','',4),(76,'vago','E33','',4),(77,'vago','E34','',4),(78,'vago','E35','',4),(79,'vago','E36','',4),(80,'vago','E37','',4),(81,'vago','E38','',4),(82,'vago','E39','',4),(83,'Gerenciamento, Planejamento e Programação','E40','',4),(84,'vago','E41','',4),(85,'vago','E42','',4),(86,'Assistência Técnica','E43','',4),(87,'Embarque (offshore)','E44','',4),(88,'As-built','E45','',4),(89,'Levantamento de Campo','E46','',4),(90,'vago','E47','',4),(91,'vago','E48','',4),(92,'vago','E49','',4),(93,'Gerência de Empreendimentos','F20','',4),(94,'Supervisão - Escritório Central','F01','',4),(95,'Supervisão/Administração - Escritório de Campo','F02','',4),(96,'Serviços Preparatórios de Construção','F03','',4),(97,'Coordenação de Campo','F04','',4),(98,'Planejamento e Controle de Custos','F05','',4),(99,'Fiscalização, Testes e Medição','F06','',4),(100,'Engenharia de Campo','F07','',4),(101,'Controles de Materiais','F08','',4),(102,'Partida','F09','',4),(103,'Viagem Residência/ Obra / Residência','F10','',4),(104,'Assistência Técnica ao Cliente','F11','',4),(105,'Retrabalho','F30','',4),(106,'Especificações Técnicas','E50','',5),(107,'Memorial de Cálculo','E51','',5),(108,'Requisições de Equipamentos / Serviços','E52','',5),(109,'Parecer Técnico de Propostas dos Sistemas','E53','',5),(110,'Verificação de Documentos de Fornecedor','E54','',5),(111,'Diagramas de Blocos','E55','',5),(112,'Arquitetura de Sistemas','E56','',5),(113,'Critério de Projeto de Telecomunicações','E57','',5),(114,'Detalhes Típicos de Instalação','E58','',5),(115,'Arranjo de Salas de Equipamentos','E59','',5),(116,'Plantas de Distribuição','E60','',5),(117,'Listas de Materiais','E61','',5),(118,'Listas em Geral','E62','',5),(119,'Memorial Descritivo Sistema de Comunicação (Telefonia e Alta Voz)','E63','',5),(120,'Memorial Descritivo Sistema de Acesso (Satélite, Rádio Enlace e Fibra Óptica)','E64','',5),(121,'Memorial Descritivo Sistema de Rádio Comunicação (Ponto a Ponto e Ponto Multiponto)','E65','',5),(122,'Memorial Descritivo Sistema de Segurança Controle de Acesso (CFTV, Controle de Perímetro)','E66','',5),(123,'Relatórios Técnicos','E67','',5),(124,'Análise Técnica, Desenvolvimento e Concepção de Projeto Básico','E68','',5),(125,'Memorial Descritivo Sistema de Rede de Dados (Conectividade, Armazenamento e Sala de TI)','E69','',5),(126,'Memorial Descritivo Sistema de Monitoração (CFTV - Processo Wall)','E70','',5),(127,'Memorial Descritivo Sistemas Especiais','E71','',5),(128,'Projeto de Viabilidade Técnica','E72','',5),(129,'Modelagem de Sistemas de Telecomunicação','E73','',5),(130,'vago','E74','',5),(131,'vago','E75','',5),(132,'vago','E76','',5),(133,'vago','E77','',5),(134,'vago','E98','',5),(135,'Gerenciamento, Planejamento e Programação','E90','',5),(136,'vago','E91','',5),(137,'vago','E92','',5),(138,'Assistência Técnica','E93','',5),(139,'Embarque (offshore)','E94','',5),(140,'As-built','E95','',5),(141,'Levantamento de Campo','E96','',5),(142,'vago','E97','',5),(143,'vago','E99','',5),(144,'Supervisão','I01','',6),(145,'Levantamento de Campo','I02','',6),(146,'Especificação Técnica, Critérios de Projeto','I03','',6),(147,'Plantas de Locação Instrumentos/ Plantas Salas (LayOut)','I04','',6),(148,'Arquitetura e Carregamento de Hardware','I05','',6),(149,'Folha de Dados (FD) / Folha de Especificação (FE)','I06','',6),(150,'Especificação para Cotação e Compra (RM)','I07','',6),(151,'Análise Técnica','I08','',6),(152,'Lista de Material (Cabos /Instrumentos/Entradas,Saidas)','I09','',6),(153,'Comentários DF´s','I10','',6),(154,'Memorial Descritivo / Relatórios','I11','',6),(155,'Memória de Cálculo','I12','',6),(156,'Diagramas','I13','',6),(157,'Arranjos Painéis','I15','',6),(158,'Detalhes Típicos','I16','',6),(159,'Bases de Dados de Instrumentação - até 2007','I17','',6),(160,'Bancos de Dados do Projeto de Instrumentação','I18','',6),(161,'Retrabalho','I20','',6),(162,'Reunião','I80','',6),(163,'Estágio','I90','',6),(164,'Supervisão','H01','',7),(165,'Mapa comparativo de compras','H02','',7),(166,'Pedido de Compra','H03','',7),(167,'Carta-Convite','H04','',7),(168,'Fax de Intenção','H05','',7),(169,'Mapa de acompanhamento de compras','H06','',7),(170,'Controle de diligenciamento / inspeção','H07','',7),(171,'Lista de fornecedores potenciais','H08','',7),(172,'Retrabalho','H20','',7),(173,'Supervisão','M01','',8),(174,'Levantamento de Campo / Atividades no Cliente','M02','',8),(175,'Especificação Técnica, Critérios de Projeto','M03','',8),(176,'Folhas de Dados (FD) / Folha de Especificação (FE)','M06','',8),(177,'Especific. para Cotação e Compra (RM)','M07','',8),(178,'Análise Técnica de Propostas (ATP) / Parecer Técnico (PT)','M08','',8),(179,'Lista de Materiais / Lista de Sobressalentes','M09','',8),(180,'Comentários DF´s','M10','',8),(181,'Memorial Descritivo / Relatórios','M11','',8),(182,'Memória de Cálculo','M12','',8),(183,'Desenhos de Fabricação','M13','',8),(184,'Desenho de Projeto / Setting Plan','M14','',8),(185,'Bancos de Dados do Projeto Mecânico','M18','',8),(186,'Retrabalho','M20','',8),(187,'Reunião','M80','',8),(188,'Estágio','M90','',8),(189,'Supervisão','P01','',9),(190,'Levantamento de Campo','P02','',9),(191,'Especific Técnica, Critérios de Projeto','P03','',9),(192,'Fluxograma de Processo (Engenharia Básica)','P04','',9),(193,'Fluxograma de Processo e Intrumentação P&I (Engenharia de Detalhamento)','P05','',9),(194,'Folhas de Dados (FD) / Folha de Especificação (FE)','P06','',9),(195,'Listas de Linhas / Equipamentos','P09','',9),(196,'Comentários DF´s','P10','',9),(197,'Memorial Descritivo / Relatório','P11','',9),(198,'Memória de Cálculo','P12','',9),(199,'Manuais de Operação','P13','',9),(200,'Análise de Risco','P14','',9),(201,'Tabela Causa e Efeito','P15','',9),(202,'Bancos de Dados do Projeto de Processo','P18','',9),(203,'Manual de Engenharia','P19','',9),(204,'Retrabalho','P20','',9),(205,'Reunião','P80','',9),(206,'Estágio','P90','',9),(207,'Supervisão','J01','',10),(208,'Bancos de Materiais','J02','',10),(209,'Espec. Técnic. e Critérios de Modelagem','J03','',10),(210,'Administração de Banco de Dados','J04','',10),(211,'Suporte ao Usuário','J05','',10),(212,'Customização','J06','',10),(213,'Padronização','J07','',10),(214,'Análise Técnica de Softwares e Equipamentos','J08','',10),(215,'Listas em Geral','J09','',10),(216,'Pesquisa e Desenvolvimento','J10','',10),(217,'Memoriais e Relatórios','J11','',10),(218,'Criação de Peças de Catálogo e Símbolos','J12','',10),(219,'Bancos de Dados de Projeto','J18','',10),(220,'Retrabalho','J20','',10),(221,'Reunião','J80','',10),(222,'Estágio','J90','',10),(223,'Supervisão','K01','',11),(224,'Estimativas de Custos de Empreendimento','K02','',11),(225,'Controle de Custos de Empreendimentos','K03','',11),(226,'Controle de Custos de Projetos','K04','',11),(227,'Retrabalho','K20','',11),(228,'Supervisão','T01','',12),(229,'Levantamento de Campo','T02','',12),(230,'Especificação Técnica, Critérios de Projeto','T03','',12),(231,'Plantas de Tubulação','T04','',12),(232,'Isométricos','T05','',12),(233,'Requisições de Materiais','T07','',12),(234,'Análise Técnica','T08','',12),(235,'Lista de Materiais, Suportes','T09','',12),(236,'Comentários DF´s','T10','',12),(237,'Memorial Descritivos / Relatórios','T11','',12),(238,'Memória de Cálculo','T12','',12),(239,'Detalhes Típicos (Suportes)','T13','',12),(240,'Arranjos de Equipamentos (Layout)','T14','',12),(241,'Maquetes - até 2007','T15','',12),(242,'Bancos de Dados do Projeto de Tubulação','T18','',12),(243,'Retrabalho','T20','',12),(244,'Reunião','T80','',12),(245,'Estágio','T90','',12),(246,'Chefia','X01','',13),(247,'Desenvolvimento','X02','',13),(248,'Produção','X03','',13),(249,'Suporte ao Usuário','X04','',13),(250,'Retrabalho','X20','',13),(251,'Supervisão','S01','',14),(252,'EAP – Estrutura Analítica de Projeto','S02','',14),(253,'Cronogramas','S03','',14),(254,'Programação e Acompanhamento de prazos','S04','',14),(255,'Curva de Progresso Físico','S05','',14),(256,'Mapa de Progresso Físico','S06','',14),(257,'Lista de Pendências','S07','',14),(258,'Punch List','S08','',14),(259,'Controle de Progresso de Documentos','S09','',14),(260,'Estimativa de Custos e Empreendimentos','S10','',14),(261,'Controle de Custos de Projetos','S11','',14),(262,'Boletim de Medição','S12','',14),(263,'Back-log','S13','',14),(264,'Relatório Mensal','S14','',14),(265,'Retrabalho','S20','',14),(266,'Supervisão','U01','',15),(267,'Levantamento de Campo','U02','',15),(268,'Especificação Técnica / Funcional','U03','',15),(269,'Plantas - Rede','U04','',15),(270,'Arquitetura e Carregamento de Hardware','U05','',15),(271,'Folha de Dados - FD','U06','',15),(272,'Requisição de Material - RM','U07','',15),(273,'Análise Técnica de Proposta - ATP','U08','',15),(274,'Listas','U09','',15),(275,'Análise de Documento de Fornecedor - ADF','U10','',15),(276,'Memorial Descritivo - MD','U11','',15),(277,'Memória de Cálculo - MC','U12','',15),(278,'Diagramas','U13','',15),(279,'Arranjos','U15','',15),(280,'Detalhes Típicos','U16','',15),(281,'Banco de Dados de Projeto de Automação','U18','',15),(282,'Retrabalho','U20','',15),(283,'Reunião','U80','',15),(284,'Estágio','U90','',15);
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
-- Table structure for table `gdoks_telas`
--

DROP TABLE IF EXISTS `gdoks_telas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_telas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `descricao` text,
  `endereco` varchar(200) DEFAULT NULL,
  `href` varchar(45) DEFAULT NULL,
  `icone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `titulo_UNIQUE` (`titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_telas`
--

LOCK TABLES `gdoks_telas` WRITE;
/*!40000 ALTER TABLE `gdoks_telas` DISABLE KEYS */;
INSERT INTO `gdoks_telas` VALUES (1,'Projetos','Lista e da acesso aos projetos cadastrados.','/webapp/app/modules/Projetos/projetos.php','#/projetos','group_work'),(2,'Usuários','Permite que se veja os usuários cadastrados no sistema bem como alterar as informações referentes a ele (permissões, especialidades, etc)','app/modules/Usuarios/usuarios.php','#/usuarios','face'),(3,'Documentos','Lista os documentos que das disciplinas das quais o usuário é especialista ou validador','app/modules/Documentos/documentos.php','#/documentos','insert_drive_file'),(4,'GRDs','Permite que o usuário veja as GRDs lançadas no sistema. Também é possível gerar uma GRD e enviar uma GRD a partir desta tela','app/modules/Grds/grds.php','#/grds/0','description'),(5,'Disciplinas','Permite ao usuário cadastrar/descadastrar disciplinas. Também permite que o usuário atribua as disciplinas especialistas e validadores','app/modules/Disciplinas/disciplinas.php','#/disciplinas','account_balance'),(6,'Clientes','Lista, altera e adiciona clientes','app/modules/Clientes/clientes.php','#/clientes','record_voice_over'),(7,'Cargos','Lista altera e adiciona cargos','app/modules/Cargos/cargos.html','#/cargos','work'),(8,'Log','Lista atividade de todos os usuários do sistema','app/modules/Log/log.php','#/log','history'),(9,'Configurações','Permite que o usuário altere configurações do GDoks','app/module/Configuracoes/configuracoes.html','#/configuracoes','build');
/*!40000 ALTER TABLE `gdoks_telas` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_tipos_de_doc`
--

LOCK TABLES `gdoks_tipos_de_doc` WRITE;
/*!40000 ALTER TABLE `gdoks_tipos_de_doc` DISABLE KEYS */;
INSERT INTO `gdoks_tipos_de_doc` VALUES (1,1,'E','Eletrônico'),(2,1,'B','Cópia de Papel'),(3,1,'EB','Eletrônico e Papel');
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
  `sigla` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`,`id_empresa`),
  UNIQUE KEY `sigla_UNIQUE` (`id_empresa`,`sigla`),
  KEY `FK_clientes_x_usuarios_idx` (`id_empresa`),
  CONSTRAINT `FK_clientes_x_usuarios` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios`
--

LOCK TABLES `gdoks_usuarios` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios` VALUES (1,'sergio','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Sérgio Moura','sergiomoura@faraday.com.br','599494ad8078b4.15658343','2017-08-16 16:53:33',1,'','SMS'),(2,'tony','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Anthony Valério','anthony@faraday.com.br','5988fc99453f83.29196503','2017-08-07 21:49:45',1,'','AVS'),(3,'paulocesar','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Paulo César','paulocesar@faraday.com.br',NULL,NULL,1,'','PCJ'),(4,'teste1','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 1','teste1@faraday.com.br',NULL,NULL,1,'','TT1'),(5,'teste2','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 2','teste2@faraday.com.br',NULL,NULL,1,'','TT2'),(6,'teste3','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 3','teste3@faraday.com.br',NULL,NULL,1,'','TT3'),(7,'teste4','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 4','teste4@faraday.com.br',NULL,NULL,1,'','TT4'),(8,'teste5','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 5','teste5@faraday.com.br',NULL,NULL,1,'','TT5'),(9,'teste6','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 6','teste6@faraday.com.br',NULL,NULL,1,'','TT6'),(10,'teste7','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 7','teste7@faraday.com.br',NULL,NULL,1,'','TT7'),(13,'teste8','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste Oito da Silva','teste8@teste.com',NULL,NULL,1,'','TT8'),(14,'teste9','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 9','teste9@teste.com',NULL,NULL,1,'','TT9'),(15,'teste10','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 10','teste10@teste.com',NULL,NULL,1,'','T10'),(16,'teste11','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 11','teste11@teste.com',NULL,NULL,1,'','T11'),(17,'teste12','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 12','teste12@teste.com','59565d3c2822f7.73560525','2017-06-30 15:16:28',1,'','T12'),(18,'ricardo','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Ricardo','ricardo.luis@faraday.com.br','5988fc86b4fd00.57756491','2017-08-07 21:49:26',1,'','RLU');
/*!40000 ALTER TABLE `gdoks_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_usuarios_x_opcoes_de_tela`
--

DROP TABLE IF EXISTS `gdoks_usuarios_x_opcoes_de_tela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_usuarios_x_opcoes_de_tela` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_tela` int(11) NOT NULL,
  `id_opcao` int(11) NOT NULL,
  `valor` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_permissao_x_opcoes_de_tela_idx` (`id_usuario`,`id_tela`),
  KEY `FK_id_opcao_x_id_tela_id_opcao_id_tela_idx` (`id_tela`,`id_opcao`),
  CONSTRAINT `FK_id_opcao_x_id_tela_id_opcao_id_tela` FOREIGN KEY (`id_tela`, `id_opcao`) REFERENCES `gdoks_opcoes_de_telas` (`id_tela`, `id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_id_usuario_x_id_tela_id_usuario_id_tela` FOREIGN KEY (`id_usuario`, `id_tela`) REFERENCES `gdoks_usuarios_x_telas` (`id_usuario`, `id_tela`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios_x_opcoes_de_tela`
--

LOCK TABLES `gdoks_usuarios_x_opcoes_de_tela` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios_x_opcoes_de_tela` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios_x_opcoes_de_tela` VALUES (179,1,1,1,1),(180,1,1,2,1),(181,1,2,3,1),(182,1,2,4,1),(183,1,4,5,1),(184,1,4,6,1),(185,1,4,7,1),(186,1,6,12,1),(187,1,6,13,1),(188,1,7,14,1),(189,1,7,15,1),(190,1,7,16,1),(191,2,1,1,1),(192,2,1,2,1),(193,2,2,3,1),(194,2,2,4,1),(195,2,4,5,1),(196,2,4,6,1),(197,2,4,7,1),(198,2,5,8,1),(199,2,5,9,1),(200,2,5,10,1),(201,2,5,11,1),(202,2,6,12,1),(203,2,6,13,1),(204,2,7,14,1),(205,2,7,15,1),(206,2,7,16,1),(207,3,1,1,1),(208,3,1,2,1),(209,3,2,3,1),(210,3,2,4,1),(211,3,4,5,1),(212,3,4,6,1),(213,3,4,7,1),(214,3,5,8,1),(215,3,5,9,1),(216,3,5,10,1),(217,3,5,11,1),(218,3,6,12,1),(219,3,6,13,1),(220,3,7,14,1),(221,3,7,15,1),(222,3,7,16,1),(237,18,1,1,1),(238,18,1,2,1),(239,18,2,3,1),(240,18,2,4,1),(241,18,4,5,1),(242,18,4,6,1),(243,18,4,7,1),(244,18,5,8,1),(245,18,5,9,1),(246,18,5,10,1),(247,18,5,11,1),(248,18,7,14,1),(249,18,7,15,1),(250,18,7,16,1);
/*!40000 ALTER TABLE `gdoks_usuarios_x_opcoes_de_tela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gdoks_usuarios_x_telas`
--

DROP TABLE IF EXISTS `gdoks_usuarios_x_telas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gdoks_usuarios_x_telas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_tela` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_id_usuario_x_id_tela` (`id_usuario`,`id_tela`),
  KEY `FK_id_usuario_x_tela_x_usuario_idx` (`id_usuario`),
  KEY `FK_id_usuario_x_tela_x_tela_idx` (`id_tela`),
  CONSTRAINT `FK_id_usuario_x_tela_x_tela` FOREIGN KEY (`id_tela`) REFERENCES `gdoks_telas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_id_usuario_x_tela_x_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `gdoks_usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios_x_telas`
--

LOCK TABLES `gdoks_usuarios_x_telas` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios_x_telas` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios_x_telas` VALUES (129,1,1),(130,1,2),(131,1,3),(132,1,4),(133,1,5),(134,1,6),(135,1,7),(136,1,8),(137,1,9),(138,2,1),(139,2,2),(140,2,3),(141,2,4),(142,2,5),(143,2,6),(144,2,7),(145,2,8),(146,2,9),(147,3,1),(148,3,2),(149,3,3),(150,3,4),(151,3,5),(152,3,6),(153,3,7),(154,3,8),(155,3,9),(165,18,1),(166,18,2),(167,18,3),(168,18,4),(169,18,5),(170,18,6),(171,18,7),(172,18,8),(173,18,9);
/*!40000 ALTER TABLE `gdoks_usuarios_x_telas` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_validadores`
--

LOCK TABLES `gdoks_validadores` WRITE;
/*!40000 ALTER TABLE `gdoks_validadores` DISABLE KEYS */;
INSERT INTO `gdoks_validadores` VALUES (1,6,13),(2,3,1),(3,4,11),(5,6,7),(6,1,14),(7,4,15),(11,1,11),(12,2,15),(13,5,9),(14,3,15),(15,7,15),(16,4,15),(17,5,14),(18,3,7),(19,7,1),(22,1,9),(25,9,12),(26,7,11),(27,10,6),(28,1,15),(29,10,15),(30,7,9),(31,3,10),(32,1,10),(33,2,2),(34,1,2),(35,9,3),(36,3,3),(37,1,3),(45,1,5),(46,3,4),(47,1,4),(48,2,4);
/*!40000 ALTER TABLE `gdoks_validadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'gdoks'
--
/*!50003 DROP FUNCTION IF EXISTS `trueFromInt` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `trueFromInt`(i int) RETURNS int(11)
BEGIN

RETURN true;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `trueFromStr` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `trueFromStr`(i text) RETURNS int(11)
BEGIN

RETURN true;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-16 16:12:05
