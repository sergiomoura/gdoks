-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: gdoks_000
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_acoes`
--

LOCK TABLES `gdoks_acoes` WRITE;
/*!40000 ALTER TABLE `gdoks_acoes` DISABLE KEYS */;
INSERT INTO `gdoks_acoes` VALUES (1,'Logar','Logou no sistema'),(2,'Alterar Dados Pessoais','Alterou dados pessoais'),(3,'Alterar Dados de Usuário','Alterou dados de usuário nome:$1, email:$2, login:$3, ativo:$4'),(4,'Criou usuário','Criou usuário nome:$1, email:$2, login:$3, ativo:$4'),(5,'Alterou Disciplina','Alterou disciplina nome:$1, sigla:$2, ativa:$3'),(6,'Criou Disciplina','Criou disciplina nome:$1, sigla:$2, ativa:$3'),(7,'Alterou Subdisciplina','Alterou subdisciplina nome:$1, sigla:$2, ativa:$3'),(8,'Criou Subdisciplina','Criou subdisciplina nome:$1, sigla:$2, ativa:$3'),(9,'Removeu Subdisciplina','Removeu subdisciplina nome:$1, sigla:$2, ativa:$3'),(10,'Associou Especialista','Associou especialista $1 a disciplina $2'),(11,'Desassociou Especialista','Desassociou especialista $1 da disciplina $2'),(12,'Associou Validador','Associou o validador $1 a disciplina $2 (Tipo $3)'),(13,'Desassociou Validador','Desassociou o validador $1 da disciplina $2'),(14,'Alterou Cliente','Alterou dados do cliente $1,nome:$2, nome_fantasia $3'),(15,'Adicionou Cliente','Adicionou cliente $1 (nome:$2)'),(16,'Alterou Projeto','Alterou o projeto $8: $1,$2,$3,$4,$5,$6,$7'),(17,'Adicionou Projeto','Adicionou o projeto $8: $1,$2,$3,$4,$5,$6,$7'),(18,'Adicionou Área','Adicionou área ao projeto $3: $1,$2'),(19,'Alterou Área','Alterou área do projeto $3: $1,$2'),(20,'Removeu Área','Removeu área do projeto $3: $1,$2'),(21,'Criou DAO','Criou DAO $3: $1 [$2]'),(22,'Removeu DAO','Removeu DAO $3: $1 [$2]'),(23,'Alterou Documento','Alterou o documento $1: [nome] => $2 [id_subdisciplina] => $3 [id_area] => $4)'),(24,'Adicionou Documento','Adicionou o documento $1: [nome] => $2, [id_subdisciplina] => $3 [id_area]=>$4 [id_projeto]] => $5'),(25,'Removeu Documento','Removeu documento $1:  [id] => 3 [nome] => $2 [id_area] => $3 [id_subdisciplina] => $4'),(26,'Baixou Arquivo','Baixou arquivo $1'),(27,'Validou Progresso','Validou Progresso de $1% para o documento $2'),(28,'Bloqueou Documento','Bloqueou o documento $1'),(29,'Desbloqueou Documento','Desbloqueou documento $1'),(30,'Atualizou Documento','Atualizou documento $1 com arquivo $2 ($3)'),(31,'Alterou Cargo','Alterou cargo $1 (nome:$2, hh:$3)'),(32,'Adicionou Cargo','Adicionou cargo $1 (nome:$2, hh:$3)'),(33,'Removeu Cargo','Removeu cargo $1'),(34,'Alterou Sub-área','Alterou sub-área $1,(nome:$2,codigo:$3, area:$4)'),(35,'Criou Sub-área','Criou sub-área $1,(nome:$2,codigo:$3, area:$4)'),(36,'Removeu Subárea','Removeu Sub-área $1,(nome:$2,codigo:$3, area:$4)'),(37,'Alterou Especialistas','Alterou especialistas da disciplina $1. Novos especialistas: $2'),(38,'Alterou Validadores','Alterou validadores da disciplina $1. Novos validadores: $2'),(39,'Atualizou Revisão','Atualizou revisão $1 com o pacote de arquivos $2'),(40,'Criou GRD','Criou GRD (id: $1, cod: $2, id_prj:$3)'),(41,'Anexou Documentos a GRD','Anexou documentos a GRD $1'),(42,'Alterou GRD','Alterou GRD (id: $1, cod: $2, id_prj: $3)');
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
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_areas`
--

LOCK TABLES `gdoks_areas` WRITE;
/*!40000 ALTER TABLE `gdoks_areas` DISABLE KEYS */;
INSERT INTO `gdoks_areas` VALUES (1,'Pearson-639','PEA586',30),(2,'Doe Crossing-876','DOE954',19),(3,'International-554','INT375',35),(4,'Hansons-495','HAN439',42),(5,'Burning Wood-842','BUR934',12),(6,'Fisk-697','FIS742',40),(7,'Beilfuss-155','BEI705',40),(8,'Kenwood-663','KEN864',7),(9,'Bellgrove-108','BEL257',45),(10,'Oxford-231','OXF886',2),(11,'Transport-754','TRA644',28),(12,'Buhler-280','BUH495',5),(13,'Bay-426','BAY145',22),(14,'Hollow Ridge-246','HOL704',51),(15,'Goodland-270','GOO327',59),(16,'Lighthouse Bay-738','LIG745',26),(17,'Helena-530','HEL593',35),(18,'Waubesa-137','WAU470',24),(19,'Vernon-412','VER115',5),(20,'Porter-883','POR758',34),(21,'Dapin-488','DAP266',55),(22,'Merchant-997','MER493',24),(23,'Bartillon-200','BAR292',56),(24,'Scofield-414','SCO517',45),(25,'Linden-254','LIN868',46),(26,'Sherman-369','SHE367',45),(27,'Ridgeview-555','RID590',45),(28,'Lighthouse Bay-223','LIG971',19),(29,'Logan-853','LOG572',60),(30,'Rutledge-921','RUT318',37),(31,'Killdeer-441','KIL228',21),(32,'Bonner-671','BON579',42),(33,'New Castle-633','NEW686',45),(34,'Hermina-475','HER552',13),(35,'Saint Paul-724','SAI855',22),(36,'Bobwhite-310','BOB263',35),(37,'Dapin-284','DAP365',23),(38,'Kipling-688','KIP735',54),(39,'Northwestern-792','NOR130',54),(40,'Arizona-204','ARI995',3),(41,'Grayhawk-998','GRA259',14),(42,'Division-190','DIV880',6),(43,'Cherokee-125','CHE241',42),(44,'Drewry-897','DRE724',49),(45,'Oneill-345','ONE110',4),(46,'Arrowood-476','ARR446',55),(47,'Northfield-936','NOR205',58),(48,'Wayridge-236','WAY211',49),(49,'Moland-756','MOL571',43),(50,'Florence-493','FLO347',51),(51,'Carberry-280','CAR383',57),(52,'Continental-660','CON493',55),(53,'Melby-402','MEL711',10),(54,'Toban-471','TOB125',26),(55,'Portage-448','POR557',54),(56,'Pepper Wood-947','PEP521',11),(57,'Ludington-659','LUD442',45),(58,'Blaine-709','BLA621',50),(59,'Truax-759','TRU640',50),(60,'Loftsgordon-464','LOF643',43),(61,'Melody-885','MEL455',35),(62,'Hanover-881','HAN476',13),(63,'Stephen-753','STE673',58),(64,'Eggendart-419','EGG187',23),(65,'Ridgeview-632','RID727',3),(66,'Eggendart-212','EGG265',30),(67,'Towne-129','TOW496',51),(68,'Merchant-471','MER870',53),(69,'Superior-924','SUP584',16),(70,'Steensland-423','STE111',26),(71,'Mandrake-366','MAN163',57),(72,'Arapahoe-550','ARA477',7),(73,'Dayton-936','DAY256',47),(74,'Jay-263','JAY173',31),(75,'Huxley-682','HUX470',40),(76,'Vermont-695','VER203',31),(77,'Bobwhite-188','BOB317',29),(78,'Fallview-639','FAL512',57),(79,'Clemons-336','CLE798',42),(80,'Troy-762','TRO297',22),(81,'Morningstar-177','MOR360',52),(82,'Barnett-133','BAR720',11),(83,'Steensland-107','STE568',27),(84,'Autumn Leaf-205','AUT864',60),(85,'Raven-435','RAV671',11),(86,'Stoughton-553','STO596',2),(87,'Monument-334','MON890',23),(88,'Eagan-653','EAG529',1),(89,'John Wall-398','JOH713',6),(90,'6th-812','6TH554',48),(91,'3rd-391','3RD476',21),(92,'Raven-357','RAV903',3),(93,'7th-527','7TH570',54),(94,'Esch-142','ESC587',39),(95,'Prairie Rose-673','PRA348',16),(96,'South-137','SOU829',4),(97,'Farwell-264','FAR845',30),(98,'Hoepker-866','HOE502',58),(99,'Bayside-229','BAY731',46),(100,'Ludington-508','LUD449',1),(101,'Southridge-483','SOU214',25),(102,'Grayhawk-359','GRA275',56),(103,'Rockefeller-909','ROC468',54),(104,'Michigan-549','MIC290',30),(105,'School-188','SCH612',44),(106,'Loomis-461','LOO665',20),(107,'Lighthouse Bay-903','LIG857',3),(108,'Sloan-140','SLO548',59),(109,'Oak-141','OAK135',25),(110,'Orin-886','ORI242',17),(111,'Vahlen-869','VAH644',26),(112,'8th-669','8TH581',48),(113,'Rusk-490','RUS328',30),(114,'Grasskamp-381','GRA677',11),(115,'Stuart-953','STU410',14),(116,'International-897','INT564',60),(117,'Farragut-525','FAR426',16),(118,'Hagan-478','HAG977',36),(119,'Washington-572','WAS612',60),(120,'Carey-755','CAR997',7),(121,'Buell-401','BUE785',58),(122,'Holy Cross-926','HOL744',20),(123,'Westerfield-267','WES402',9),(124,'Nelson-654','NEL406',12),(125,'Autumn Leaf-209','AUT933',59),(126,'Westerfield-870','WES756',7),(127,'Gina-434','GIN934',37),(128,'Towne-380','TOW954',37),(129,'Basil-280','BAS691',43),(130,'Dennis-985','DEN329',49),(131,'Carpenter-673','CAR783',50),(132,'Farwell-861','FAR372',2),(133,'Prairie Rose-739','PRA504',6),(134,'Hansons-371','HAN267',53),(135,'North-144','NOR174',12),(136,'Forest Run-948','FOR815',40),(137,'Bashford-932','BAS670',10),(138,'Randy-754','RAN268',46),(139,'Northview-305','NOR945',43),(140,'Bellgrove-908','BEL368',36),(141,'Express-638','EXP456',50),(142,'Hoffman-368','HOF902',12),(143,'Northwestern-573','NOR452',42),(144,'Nevada-660','NEV954',18),(145,'Manufacturers-318','MAN343',49),(146,'Stang-759','STA809',3),(147,'Vidon-326','VID450',14),(148,'Bunting-221','BUN345',17),(149,'Red Cloud-290','RED107',21),(150,'Karstens-620','KAR307',59),(151,'Holmberg-337','HOL458',33),(152,'Porter-402','POR459',12),(153,'Barby-407','BAR291',27),(154,'Vermont-199','VER349',48),(155,'Summit-888','SUM775',14),(156,'Troy-416','TRO306',5),(157,'Harper-668','HAR541',48),(158,'West-146','WES150',14),(159,'Hauk-857','HAU888',25),(160,'Stephen-359','STE641',25),(161,'Huxley-246','HUX843',16),(162,'Westport-383','WES223',39),(163,'Caliangt-635','CAL594',27),(164,'Continental-906','CON625',31),(165,'Bunting-138','BUN792',59),(166,'Del Sol-243','DEL663',2),(167,'Heffernan-128','HEF814',3),(168,'Washington-752','WAS706',22),(169,'Golf View-494','GOL711',2),(170,'Veith-872','VEI638',33),(171,'Ridgeview-669','RID198',12),(172,'Tomscot-954','TOM772',53),(173,'Lighthouse Bay-163','LIG461',9),(174,'Oak-651','OAK813',43),(175,'Rusk-172','RUS629',6),(176,'Old Shore-998','OLD945',17),(177,'Maple-848','MAP663',57),(178,'Eliot-128','ELI316',32),(179,'Gerald-380','GER993',56),(180,'Paget-396','PAG380',29),(181,'Área 1','A1',61),(182,'Área 2','A2',61);
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
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_arquivos`
--

LOCK TABLES `gdoks_arquivos` WRITE;
/*!40000 ALTER TABLE `gdoks_arquivos` DISABLE KEYS */;
INSERT INTO `gdoks_arquivos` VALUES (1,'1/26/28589596','FelisSedInterdum.gif','2016-08-24 14:44:48',8,440,1,4),(2,'1/7/95572543','MetusSapienUt.gif','2017-01-05 22:26:27',2,880,1,7),(3,'1/53/90205285','CongueRisus.txt','2016-09-25 08:39:58',7,440,1,10),(5,'1/31/13205230','Diam.mp3','2017-05-10 16:06:02',9,440,1,9),(7,'1/40/59958048','DolorSitAmet.avi','2017-04-01 20:24:28',2,880,1,10),(8,'1/59/45945930','InFaucibusOrci.mpeg','2016-07-27 04:44:05',6,660,1,7),(9,'1/48/70868256','IdLuctusNec.jpeg','2017-04-29 00:15:15',2,0,1,6),(10,'1/34/53393272','Nam.txt','2017-03-25 14:10:30',1,0,1,3),(11,'1/49/74160883','AmetErosSuspendisse.avi','2016-11-07 07:31:26',10,880,1,8),(14,'1/36/53931251','MiInPorttitor.mov','2016-07-11 15:11:42',4,220,1,5),(15,'1/9/45344157','Donec.avi','2017-06-09 23:45:15',5,220,1,3),(16,'1/60/16725417','In.txt','2017-05-04 13:24:50',8,1100,1,8),(17,'1/55/78208981','DapibusNullaSuscipit.jpeg','2017-01-18 10:48:35',1,0,1,7),(18,'1/48/11839713','VolutpatEleifendDonec.png','2016-10-15 22:55:33',10,440,1,6),(19,'1/6/28397654','DonecQuisOrci.xls','2017-01-03 19:56:20',10,220,1,4),(20,'1/48/67966455','LiberoRutrumAc.gif','2017-05-16 07:59:49',3,660,1,5),(21,'1/41/75635713','Ante.mov','2017-01-01 16:12:27',5,880,1,5),(22,'1/59/84947480','Dolor.avi','2017-02-18 07:49:34',6,0,1,4),(23,'1/55/45344772','NecEuismod.avi','2017-06-23 10:20:29',2,440,1,8),(24,'1/40/71669159','ConsequatMetusSapien.xls','2017-06-02 09:18:52',8,0,1,7),(25,'1/23/36716060','NullaElitAc.tiff','2016-12-01 02:16:14',5,220,1,5),(26,'1/20/35431638','VulputateJusto.txt','2017-03-17 09:52:41',7,220,1,1),(27,'1/3/51106436','Diam.gif','2017-06-13 00:57:45',10,440,1,5),(28,'1/54/63885185','Integer.txt','2016-12-30 11:40:51',2,440,1,4),(29,'1/8/10313354','Nullam.ppt','2017-05-13 19:41:35',8,880,1,4),(30,'1/56/62154372','NamDuiProin.jpeg','2017-06-17 20:43:49',5,220,1,10),(31,'1/17/59573983','Ante.mp3','2016-12-16 10:22:56',2,440,1,1),(32,'1/58/43303254','FermentumJustoNec.jpeg','2017-03-26 21:35:53',6,220,1,1),(33,'1/50/37879601','LacusCurabiturAt.avi','2017-04-09 06:27:59',8,660,1,8),(34,'1/57/72325392','EgetCongueEget.mpeg','2016-10-27 21:24:17',9,660,1,6),(35,'1/38/57145027','EleifendPedeLibero.avi','2016-07-14 22:32:49',7,0,1,3),(36,'1/54/84489846','IaculisDiam.xls','2016-12-17 09:04:32',10,440,1,10),(37,'1/42/39795796','UltricesEnim.xls','2016-08-28 00:31:39',7,220,1,7),(38,'1/52/56371932','NislDuis.avi','2016-10-23 11:08:05',7,0,1,4),(39,'1/56/59116531','JustoLacinia.ppt','2017-03-28 00:48:55',3,440,1,6),(40,'1/27/14180506','Ac.ppt','2017-04-03 12:22:03',3,220,1,9),(41,'1/14/30097597','UtBlanditNon.mp3','2016-09-02 13:54:12',7,0,1,2),(42,'1/52/43547350','Nulla.gif','2016-11-19 15:11:30',4,220,1,4),(43,'1/14/60851165','NullaTellusIn.mov','2017-06-22 16:09:09',10,220,1,6),(44,'1/50/78457408','Pretium.doc','2016-10-31 11:26:03',7,440,1,6),(45,'1/3/41263994','MiPede.avi','2016-12-23 03:40:41',9,1100,1,2),(47,'1/38/71736168','Sapien.ppt','2017-05-13 00:23:10',8,1100,1,8),(48,'1/45/33666704','DolorVel.jpeg','2017-01-21 19:13:14',10,660,1,10),(49,'1/19/76677554','Habitasse.ppt','2016-07-06 17:34:00',3,220,1,10),(50,'1/3/15949098','Lacus.xls','2016-07-11 06:44:20',7,0,1,10),(51,'1/4/78727706','IntegerANibh.xls','2016-10-12 05:57:09',8,660,1,10),(52,'1/5/37834149','Consequat.jpeg','2017-05-04 04:56:58',10,220,1,5),(53,'1/48/92023048','TristiqueFusceCongue.ppt','2017-05-15 09:54:20',5,440,1,4),(55,'1/39/74001397','InFelisDonec.png','2017-01-06 17:33:42',3,0,1,9),(56,'1/24/51912110','Sollicitudin.pdf','2016-11-09 15:43:31',1,880,1,4),(57,'1/22/33150903','RhoncusAliquamLacus.avi','2016-08-02 15:36:12',10,440,1,3),(58,'1/35/70667608','Tellus.xls','2017-06-23 20:00:36',7,660,1,1),(59,'1/27/67434767','Elementum.mp3','2016-09-30 03:52:35',1,1100,1,5),(60,'1/14/29192363','In.ppt','2016-09-04 21:40:21',10,0,1,2),(61,'1/31/11122889','ALiberoNam.png','2016-08-22 10:04:31',2,880,1,6),(62,'1/54/25228761','EratNulla.doc','2016-10-01 08:05:33',3,220,1,7),(63,'1/26/88478396','MetusSapien.xls','2017-01-31 16:34:43',6,440,1,5),(64,'1/11/82364085','Lacus.tiff','2017-03-24 11:13:12',3,0,1,3),(66,'1/24/33165135','Ipsum.mp3','2017-05-16 17:49:30',3,0,1,3),(68,'1/28/11091047','MaecenasLeo.mpeg','2017-01-22 21:04:13',4,220,1,1),(69,'1/26/29193747','AtNunc.xls','2017-01-17 02:01:33',5,880,1,5),(70,'1/5/41226790','TurpisSedAnte.pdf','2016-10-19 16:59:27',5,220,1,10),(71,'1/47/62762333','VelAccumsan.tiff','2017-03-10 17:24:33',7,440,1,6),(72,'1/35/41381670','Aenean.doc','2016-11-10 13:42:06',10,440,1,5),(73,'1/47/43527329','Posuere.pdf','2017-04-22 10:02:32',2,220,1,4),(74,'1/27/39604081','InFelisDonec.xls','2017-06-08 22:23:00',10,660,1,1),(76,'1/39/89872620','QuamFringillaRhoncus.xls','2017-06-21 08:05:09',4,660,1,1),(77,'1/15/11007227','VitaeIpsumAliquam.avi','2016-10-30 12:39:49',9,880,1,5),(78,'1/33/86457741','Dolor.txt','2016-11-16 22:46:17',7,220,1,2),(79,'1/48/67778688','Pede.ppt','2016-09-01 04:12:38',9,660,1,8),(80,'1/4/33047477','NonPretiumQuis.jpeg','2017-03-17 23:56:56',8,220,1,10),(81,'1/11/15815937','JustoNec.jpeg','2016-08-26 21:58:50',7,220,1,5),(82,'1/38/22427337','Urna.avi','2016-11-14 12:18:57',8,0,1,2),(83,'1/34/25026604','AcDiam.jpeg','2017-04-05 11:08:23',8,440,1,5),(84,'1/22/29874864','MaecenasUt.mp3','2017-05-07 03:14:15',1,660,1,3),(85,'1/10/47073513','NecEuismodScelerisque.avi','2016-10-23 21:56:21',10,880,1,5),(87,'1/59/96266877','AliquetAt.ppt','2016-07-09 09:45:52',1,440,1,6),(88,'1/12/15008065','DolorQuis.mpeg','2016-11-30 07:31:03',7,220,1,5),(89,'1/17/12206787','EgestasMetus.avi','2016-12-10 23:05:51',1,660,1,1),(90,'1/2/30097555','Nulla.xls','2017-01-01 23:04:11',9,220,1,7),(91,'1/53/15133290','Nullam.ppt','2017-06-03 16:37:29',5,660,1,4),(92,'1/6/79166948','Primis.jpeg','2016-10-07 09:28:45',5,880,1,8),(93,'1/18/52533810','Sodales.xls','2017-05-12 21:42:44',10,1100,1,2),(94,'1/46/23680078','SuscipitLigula.xls','2017-05-19 10:48:42',10,0,1,9),(96,'1/38/75607899','ElitAcNulla.ppt','2017-03-06 09:34:09',10,440,1,1),(97,'1/45/45066474','Turpis.pdf','2016-10-23 21:27:19',7,660,1,3),(98,'1/21/86434339','LoremQuisqueUt.tiff','2016-08-30 22:39:01',9,440,1,1),(100,'1/36/68411417','Penatibus.pdf','2017-05-19 07:36:28',2,220,1,4),(101,'1/57/42144315','EtCommodoVulputate.xls','2016-11-10 01:58:17',3,440,1,8),(102,'1/55/16693177','Est.ppt','2017-04-19 23:51:46',9,220,1,4),(103,'1/9/97334997','Semper.xls','2016-11-09 01:49:09',2,220,1,10),(104,'1/7/75229252','Luctus.gif','2017-05-06 07:50:19',5,0,1,6),(105,'1/20/25815948','AtDiamNam.mp3','2017-04-15 09:56:12',9,660,1,7),(106,'1/45/40347707','Dapibus.mp3','2017-05-22 09:47:43',4,440,1,1),(107,'1/3/70283936','In.avi','2016-07-14 21:38:18',3,660,1,6),(109,'1/54/79386185','Nibh.xls','2016-08-14 11:47:28',7,0,1,3),(110,'1/60/41761763','UtNullaSed.mp3','2017-01-08 16:24:23',8,440,1,7),(111,'1/15/24274016','Ante.ppt','2017-03-04 21:14:14',9,220,1,7),(112,'1/24/16862242','PretiumNislUt.doc','2016-08-05 07:09:14',8,0,1,2),(113,'1/23/94702599','Iaculis.xls','2017-03-28 18:11:16',8,220,1,8),(114,'1/23/15652277','Interdum.ppt','2016-11-06 23:18:13',3,440,1,10),(116,'1/5/80736883','VariusInteger.avi','2017-05-15 12:32:03',4,220,1,8),(117,'1/58/95112465','LacusPurusAliquet.mov','2017-05-24 07:08:01',10,880,1,8),(118,'1/60/93813346','Habitasse.gif','2017-02-13 04:49:15',8,440,1,5),(119,'1/40/10342265','CondimentumCurabiturIn.ppt','2017-01-05 19:13:50',2,0,1,1),(120,'1/9/29415729','IntegerTinciduntAnte.avi','2016-09-29 10:00:21',6,660,1,10),(121,'1/10/80143260','UtSuscipitA.xls','2017-02-04 18:38:08',2,220,1,10),(122,'1/29/69905434','NullaSuspendissePotenti.ppt','2017-03-21 12:37:43',2,440,1,6),(123,'1/54/43853342','Porttitor.tiff','2017-05-11 14:04:29',4,880,1,5),(124,'1/48/91455382','NonMattisPulvinar.tiff','2017-03-24 16:32:55',8,440,1,7),(125,'1/59/31639876','JustoInHac.pdf','2017-02-23 16:52:04',2,220,1,8),(126,'1/53/30555347','Integer.xls','2016-08-14 21:24:35',7,440,1,9),(127,'1/18/60454387','Blandit.tiff','2017-01-19 14:09:44',2,660,1,5),(128,'1/19/27267958','Eget.mpeg','2017-05-12 16:59:43',7,440,1,3),(129,'1/7/11164804','ElitSodales.avi','2016-12-02 01:06:40',7,880,1,8),(130,'1/59/38249438','NibhQuisque.avi','2016-07-23 12:27:46',1,0,1,3),(131,'1/49/89591437','Viverra.pdf','2016-10-22 09:13:40',5,0,1,3),(132,'1/4/84784486','PlaceratAnte.ppt','2016-11-05 02:17:54',3,440,1,5),(133,'1/36/48107299','CongueDiam.tiff','2017-06-01 08:34:42',4,440,1,5),(134,'1/41/74017390','EuInterdum.mp3','2017-03-23 06:42:38',7,0,1,3),(135,'1/8/90473029','EratId.doc','2016-07-19 04:12:49',5,220,1,3),(136,'1/27/57412647','Est.avi','2017-02-06 13:12:08',1,0,1,1),(137,'1/34/75355994','Mauris.pdf','2016-11-19 01:42:06',1,220,1,6),(138,'1/34/93923579','Ultrices.xls','2016-12-29 04:21:54',3,440,1,7),(139,'1/16/16032138','UtEratId.txt','2016-09-25 04:13:31',5,440,1,5),(140,'1/4/96833974','Vulputate.jpeg','2017-02-25 16:58:01',9,660,1,5),(143,'1/5/37212254','Nam.xls','2017-02-21 09:59:21',1,1100,1,9),(145,'1/44/71599669','Dignissim.ppt','2016-12-23 00:10:15',8,220,1,6),(146,'1/15/39020779','Proin.doc','2016-08-16 15:00:38',6,440,1,9),(147,'1/33/43661533','Morbi.mp3','2016-11-29 03:21:40',10,880,1,3),(149,'1/44/53653324','SuspendisseOrnareConsequat.ppt','2016-07-15 13:34:22',1,220,1,10),(150,'1/4/83981718','NislNuncNisl.tiff','2016-08-14 16:17:37',2,0,1,4),(151,'1/25/60001644','Quisque.mp3','2017-02-18 05:13:08',2,220,1,9),(152,'1/11/48013999','Vel.mp3','2017-05-11 21:05:06',10,0,1,3),(153,'1/20/94753367','NullaTellus.jpeg','2016-08-12 11:15:51',1,220,1,7),(154,'1/42/40625847','ConsequatInConsequat.mpeg','2017-05-11 02:36:06',6,440,1,9),(156,'1/19/20384487','Odio.mpeg','2016-12-10 00:49:04',3,0,1,3),(157,'1/54/67372347','SedJusto.jpeg','2017-01-05 01:59:21',9,0,1,1),(158,'1/43/52269184','NuncNisl.tiff','2017-02-08 12:34:39',3,220,1,6),(159,'1/6/11591581','Quis.gif','2016-09-01 20:29:57',9,0,1,2),(160,'1/25/30844087','Odio.ppt','2017-06-04 03:56:52',5,440,1,10),(161,'1/9/21401266','In.mpeg','2016-07-26 15:43:33',3,880,1,2),(162,'1/21/44491047','Non.mov','2016-10-10 23:50:51',9,220,1,2),(163,'1/1/54296513','CurabiturIn.doc','2017-04-05 03:54:03',8,0,1,8),(164,'1/27/13436711','DiamNam.avi','2016-07-30 09:12:26',1,220,1,10),(165,'1/20/16275889','RisusPraesent.txt','2016-10-03 06:20:23',6,0,1,9),(166,'1/49/41028248','FuscePosuere.ppt','2016-12-15 14:55:48',10,660,1,8),(167,'1/10/36567106','OrciEgetOrci.mp3','2017-03-05 17:19:57',10,220,1,9),(173,'1/33/98656643','VolutpatQuamPede.mp3','2016-07-16 02:56:44',7,220,1,1),(174,'1/54/49566410','FeugiatNon.jpeg','2017-06-23 13:29:02',7,220,1,8),(175,'1/5/15310406','Nec.ppt','2016-12-06 16:52:53',1,220,1,9),(176,'1/43/83675431','MusVivamusVestibulum.doc','2017-06-08 02:48:35',4,220,1,9),(177,'1/38/73233994','EuMagna.avi','2016-07-13 00:35:42',4,660,1,9),(178,'1/13/68579408','MorbiA.mp3','2017-04-11 00:42:03',3,880,1,6),(179,'1/8/37654864','Vitae.tiff','2016-11-01 07:58:33',8,660,1,9),(180,'1/46/26038492','Ut.mpeg','2016-12-16 13:52:07',10,660,1,8),(181,'1/18/75908044','NonSodales.png','2017-06-20 21:10:27',6,0,1,3),(182,'1/38/98692192','NullamVarius.tiff','2017-02-22 09:54:55',3,0,1,4),(183,'1/21/82012929','PlaceratPraesent.xls','2017-04-14 15:55:17',4,0,1,7),(184,'1/36/28793790','MolestieSed.gif','2016-10-07 16:27:08',1,440,1,1),(186,'1/5/10828582','AnteVivamus.jpeg','2017-05-23 02:52:29',9,440,1,2),(187,'1/57/86491878','VestibulumQuam.pdf','2016-08-07 19:24:30',2,660,1,2),(189,'1/51/29859368','NullaQuisqueArcu.mpeg','2016-09-03 20:46:18',4,660,1,3),(190,'1/54/99868215','TurpisDonecPosuere.ppt','2016-07-22 08:15:47',3,440,1,8),(191,'1/51/51065714','Id.tiff','2016-09-09 16:39:53',4,660,1,5),(192,'1/24/69251865','NullaJusto.pdf','2016-08-09 03:33:11',1,660,1,6),(193,'1/33/76281276','AliquamAugueQuam.gif','2017-04-02 04:56:52',9,440,1,5),(194,'1/30/62429133','Ante.tiff','2016-09-30 10:44:05',7,0,1,10),(195,'1/25/92041654','SedInterdumVenenatis.xls','2016-11-13 21:21:05',9,220,1,3),(196,'1/32/97948310','PenatibusEt.tiff','2016-09-14 12:30:41',7,220,1,8),(197,'1/19/73438983','OrciPedeVenenatis.xls','2016-10-29 08:11:30',4,880,1,7),(198,'1/14/37010386','Luctus.mpeg','2017-04-23 20:31:49',5,220,1,2),(199,'1/27/38267979','FaucibusOrciLuctus.jpeg','2016-09-24 13:00:01',3,0,1,1),(200,'1/21/17947169','EratFermentumJusto.jpeg','2017-02-14 01:11:18',8,660,1,4),(201,'1/10/159525554cc8a3','1214327031apGYy4e.jpg','2017-06-27 09:53:40',1,16828,5,1),(202,'1/10/159525554ed406','1214625936yZynHVd.jpg','2017-06-27 09:53:40',1,143196,5,1),(203,'1/10/1595255551147a','1214751884LpWxall.jpg','2017-06-27 09:53:41',1,76772,5,1),(204,'1/60/1595255dc87da6','doc.pdf','2017-06-27 09:55:56',1,1352,3,4),(205,'1/61/159525a37d023e','1214327031apGYy4e.jpg','2017-06-27 10:14:31',1,16828,5,1);
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
  PRIMARY KEY (`id`),
  KEY `FK_cliente_x_empresas_idx` (`id_empresa`),
  CONSTRAINT `FK_cliente_x_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `gdoks_empresas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_clientes`
--

LOCK TABLES `gdoks_clientes` WRITE;
/*!40000 ALTER TABLE `gdoks_clientes` DISABLE KEYS */;
INSERT INTO `gdoks_clientes` VALUES (1,NULL,'86.062.203/0001-94','Runolfsdottir and Sons','Runolfsdottir and Sons','2016-07-25 04:37:38',1,'Gunilla Van Oort','gvan0@drupal.org','71 94134-2487'),(2,NULL,'40.818.145/0001-87','Bednar Group','Bednar Group','2017-04-01 21:55:15',1,'Joane Mapother','jmapother1@nsw.gov.au','71 9289-7497'),(3,NULL,'39.924.281/0001-49','Anderson-Borer','Anderson-Borer','2017-05-13 16:44:09',1,'Packston Rogan','progan2@example.com','71 97398-9348'),(4,NULL,'85.046.076/0001-46','Jones, Conroy and Willms','Jones, Conroy and Willms','2016-06-24 06:04:49',1,'Celka Pethick','cpethick3@mapquest.com','71 99077-2066'),(5,NULL,'26.716.203/0001-37','Nader-Von','Nader-Von','2016-09-25 05:28:29',1,'Timoteo Sweatland','tsweatland4@jiathis.com','71 94298-5879'),(6,NULL,'91.422.799/0001-46','Morissette, Oberbrunner and Skiles','Morissette, Oberbrunner and Skiles','2016-11-24 17:12:45',1,'Boigie Kubacki','bkubacki5@blog.com','71 9413-3092'),(7,NULL,'44.604.078/0001-94','Bruen, Lowe and Herman','Bruen, Lowe and Herman','2017-03-10 06:12:56',1,'Jayme Livesey','jlivesey6@reddit.com','71 95365-2118'),(8,NULL,'96.378.704/0001-85','Effertz and Sons','Effertz and Sons','2016-10-01 02:57:36',1,'Court Bright','cbright7@elpais.com','71 99718-2581'),(9,'487.518.294-54',NULL,'Lindgren Inc','Lindgren Inc','2016-08-08 09:33:36',1,'Christel Lawlee','clawlee8@google.ru','71 9232-7456'),(10,'976.574.225-06',NULL,'Goyette and Sons','Goyette and Sons','2017-02-12 12:17:51',1,'Reid Caulder','rcaulder9@weebly.com','71 99200-6797'),(11,'555.804.193-19',NULL,'Lowe-Kreiger','Lowe-Kreiger','2017-06-10 10:33:34',1,'Clareta Poytheras','cpoytherasa@irs.gov','71 97191-2583'),(12,NULL,'68.858.974/0001-26','Bailey, Wolf and Rowe','Bailey, Wolf and Rowe','2017-05-07 04:47:21',1,'Lonna Kennealy','lkennealyb@technorati.com','71 9185-3175'),(13,NULL,'07.285.382/0001-96','Hettinger, Marks and Roob','Hettinger, Marks and Roob','2017-03-28 15:43:54',1,'Falito Hunnisett','fhunnisettc@hatena.ne.jp','71 9118-9992'),(14,NULL,'84.097.044/0001-61','Christiansen, Stokes and O\'Reilly','Christiansen, Stokes and O\'Reilly','2017-04-16 05:22:58',1,'Carlina Daice','cdaiced@wikia.com','71 6083-2506'),(15,NULL,'17.523.422/0001-75','Veum LLC','Veum LLC','2017-05-30 13:47:54',1,'Niko Baldinotti','nbaldinottie@google.ru','71 99444-2842');
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
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8 COMMENT='documentos de abertura de operações';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_daos`
--

LOCK TABLES `gdoks_daos` WRITE;
/*!40000 ALTER TABLE `gdoks_daos` DISABLE KEYS */;
INSERT INTO `gdoks_daos` VALUES (1,'Bytecard29','567303.588368','curae.avi','video/x-msvideo',210,4),(2,'Flowdesk75','004143.872183','dui proin.avi','video/x-msvideo',3852,43),(3,'Y-find45','423133.503650','volutpat dui maecenas.mp3','audio/x-mpeg-3',521,31),(4,'Zontrax20','069388.551865','lorem quisque ut.avi','application/x-troff-msvideo',3365,46),(5,'Toughjoyfax92','467579.399083','at nulla suspendisse.pdf','application/pdf',4224,51),(6,'Zathin58','584386.969088','ut.ppt','application/mspowerpoint',2405,39),(7,'Subin13','565101.204026','in.ppt','application/vnd.ms-powerpoint',4471,14),(8,'Overhold73','139128.407991','eu orci mauris.avi','video/avi',4894,45),(9,'Stronghold50','721106.810305','turpis.xls','application/x-excel',4766,52),(10,'Biodex59','571670.955448','dignissim vestibulum.mp3','video/x-mpeg',3595,53),(11,'Stronghold12','143736.542556','at.ppt','application/x-mspowerpoint',4181,38),(12,'Andalax82','888799.775116','donec diam.xls','application/vnd.ms-excel',570,20),(13,'Greenlam80','703348.748764','mi in.xls','application/vnd.ms-excel',2360,1),(14,'Temp69','555855.799154','amet sem fusce.tiff','image/x-tiff',3681,33),(15,'Fintone68','402787.028749','cras non velit.xls','application/vnd.ms-excel',4997,38),(16,'Matsoft51','240774.421667','consequat.pdf','application/pdf',1738,58),(18,'Flowdesk80','304623.722850','ipsum integer.png','image/png',868,7),(19,'Overhold87','934701.652328','nulla.xls','application/excel',420,23),(20,'Wrapsafe49','375196.899284','tellus nisi eu.mov','video/quicktime',1325,8),(21,'Overhold96','927561.428302','leo.ppt','application/mspowerpoint',2465,57),(22,'Kanlam28','799534.040918','quis.xls','application/excel',4257,12),(23,'Veribet88','459307.291920','sapien urna pretium.pdf','application/pdf',4061,11),(24,'Stim17','973995.133946','donec odio justo.mov','video/quicktime',2625,33),(25,'Home Ing18','411218.013787','curae.xls','application/vnd.ms-excel',2852,57),(26,'Toughjoyfax12','611105.021669','et.pdf','application/pdf',3180,17),(27,'Fixflex80','904949.360935','nibh.mp3','audio/x-mpeg-3',61,22),(28,'Keylex60','662305.417138','sit amet eleifend.xls','application/excel',729,9),(29,'Sonsing26','474853.708552','ipsum primis.ppt','application/powerpoint',1203,34),(30,'Namfix23','682996.369539','nulla integer pede.ppt','application/mspowerpoint',2108,56),(31,'Greenlam72','993851.830936','nonummy.ppt','application/mspowerpoint',671,59),(32,'Otcom71','871239.902650','nisi nam.mp3','audio/mpeg3',3257,54),(33,'Hatity10','245523.015048','odio odio elementum.avi','application/x-troff-msvideo',1373,27),(34,'Zaam-Dox35','421990.919638','cubilia.avi','video/avi',4426,42),(35,'Bytecard86','937505.882578','viverra dapibus nulla.avi','video/msvideo',1669,15),(36,'Kanlam57','104672.276353','congue etiam.jpeg','image/pjpeg',1278,6),(37,'Treeflex37','459940.999172','nibh in lectus.avi','video/msvideo',3279,20),(38,'Sonsing65','105013.115467','purus sit.avi','application/x-troff-msvideo',29,54),(39,'Transcof51','981874.440927','leo odio porttitor.avi','application/x-troff-msvideo',1394,50),(40,'Namfix24','027674.526739','ligula.mov','video/quicktime',4821,59),(41,'Vagram67','978525.583055','potenti in.pdf','application/pdf',1271,58),(42,'Ventosanzap15','284960.261305','sollicitudin.avi','video/x-msvideo',3145,56),(43,'Stim80','845194.627266','ante.avi','video/msvideo',4288,20),(44,'Matsoft57','214230.350381','aliquam quis.jpeg','image/jpeg',108,12),(45,'Latlux44','999619.875171','tortor.mp3','audio/x-mpeg-3',4079,49),(46,'Holdlamis55','190769.816003','semper.xls','application/x-excel',3899,14),(47,'Transcof93','670157.378224','tincidunt nulla.txt','text/plain',2900,42),(48,'Zoolab72','036426.097377','ridiculus mus vivamus.pdf','application/pdf',2774,12),(49,'Wrapsafe91','934620.595167','massa volutpat.avi','video/msvideo',200,29),(50,'Trippledex71','768290.817357','eu.xls','application/excel',1663,42),(51,'Alpha57','370648.796046','porta.txt','text/plain',2819,36),(52,'Tres-Zap41','403675.555767','quis odio consequat.xls','application/x-msexcel',3918,5),(53,'Flowdesk57','827034.516819','pede libero.jpeg','image/pjpeg',3647,2),(54,'Tempsoft72','449604.687440','sit amet consectetuer.png','image/png',1586,53),(55,'Stringtough66','871327.164027','semper.ppt','application/powerpoint',3640,38),(56,'Biodex12','627535.701364','convallis morbi odio.tiff','image/tiff',367,1),(57,'Aerified28','991744.159871','praesent blandit.xls','application/x-msexcel',4963,7),(58,'Prodder61','010431.082082','non velit.mp3','video/x-mpeg',4340,27),(59,'Span88','945613.883025','lectus in.txt','text/plain',333,41),(60,'Job32','440718.322510','at ipsum.png','image/png',2257,10),(61,'Regrant64','055209.442235','platea dictumst aliquam.pdf','application/pdf',4538,58),(62,'Zamit93','062963.499368','et.pdf','application/pdf',529,14),(63,'Sonsing41','242125.745277','nulla nunc purus.avi','video/msvideo',5000,10),(64,'Job20','302556.463191','sed sagittis nam.mp3','video/x-mpeg',3775,12),(65,'Keylex63','582476.707154','ac.mpeg','video/mpeg',1619,52),(66,'Keylex47','303027.499397','orci luctus.mp3','audio/mpeg3',4693,33),(67,'Bitwolf86','967147.934286','lorem.jpeg','image/pjpeg',813,20),(68,'Zathin72','858478.975677','ultrices aliquet.ppt','application/powerpoint',1299,11),(69,'Mat Lam Tam54','552763.844452','ligula suspendisse.txt','text/plain',3313,48),(70,'Viva49','341556.451899','morbi a ipsum.avi','application/x-troff-msvideo',3194,45),(71,'Overhold97','290946.869469','vestibulum ante ipsum.txt','text/plain',2477,58),(72,'Andalax28','055169.133925','sapien.tiff','image/tiff',423,2),(73,'Cookley26','543434.829457','ante.doc','application/msword',1427,55),(74,'Cardguard68','163511.122465','mauris non ligula.jpeg','image/jpeg',3599,33),(75,'Y-find99','022089.226013','bibendum.tiff','image/tiff',3431,34),(76,'Kanlam12','679703.748694','erat quisque.doc','application/msword',735,54),(77,'Stringtough97','296301.075085','nunc rhoncus dui.mp3','audio/mpeg3',944,32),(78,'Treeflex55','283753.161613','justo aliquam.ppt','application/vnd.ms-powerpoint',3700,52),(79,'Ventosanzap96','745364.770187','pede justo lacinia.txt','text/plain',2308,59),(80,'Ventosanzap94','453026.827009','ipsum.doc','application/msword',2186,19),(81,'Ventosanzap43','001655.429575','id mauris vulputate.tiff','image/x-tiff',2696,60),(82,'Viva98','377203.197891','accumsan.mov','video/quicktime',4037,45),(83,'Latlux38','207796.959980','dapibus duis at.pdf','application/pdf',74,4),(84,'Y-Solowarm37','608095.315795','nec.jpeg','image/jpeg',3494,40),(85,'Keylex21','633647.167025','sit amet.jpeg','image/pjpeg',4448,40),(86,'Flowdesk78','972040.792050','at.mp3','audio/mpeg3',2151,58),(87,'Lotlux94','614049.467203','vitae.mp3','video/mpeg',4432,19),(88,'Zamit99','408668.135602','augue vel.doc','application/msword',726,13),(89,'Alphazap57','513859.728765','curabitur.doc','application/msword',2135,5),(90,'Span11','601629.976521','pellentesque ultrices.ppt','application/vnd.ms-powerpoint',3228,36),(91,'Flowdesk47','733258.110668','nulla.xls','application/x-excel',389,14),(92,'Sub-Ex65','523876.553236','lobortis est phasellus.gif','image/gif',3661,36),(93,'Viva26','655929.607723','lobortis.avi','video/avi',2807,54),(94,'Bigtax23','389916.724980','orci luctus.gif','image/gif',1350,36),(95,'Greenlam86','748275.954913','sapien.ppt','application/powerpoint',2081,10),(96,'Solarbreeze40','908792.804923','sem.ppt','application/powerpoint',2604,53),(97,'Rank74','954802.791123','sapien arcu sed.avi','video/x-msvideo',354,31),(98,'Cookley56','798718.717785','pharetra.avi','video/msvideo',616,36),(99,'Daltfresh37','983867.865245','sapien sapien non.pdf','application/pdf',2556,43),(100,'Tin87','625035.602877','lacus.txt','text/plain',4889,34),(101,'Bitwolf31','798232.943271','erat nulla tempus.avi','video/msvideo',4981,41),(102,'Bitwolf52','039837.477325','vivamus in felis.tiff','image/tiff',2834,41),(103,'Tempsoft69','744957.950959','convallis morbi odio.xls','application/excel',1590,36),(104,'Tresom90','362218.240068','integer pede justo.ppt','application/x-mspowerpoint',1091,49),(105,'It20','497614.402333','molestie hendrerit at.avi','video/msvideo',3747,51),(106,'Konklux46','759527.186476','vestibulum eget vulputate.xls','application/vnd.ms-excel',4842,10),(107,'Ventosanzap75','106007.776882','tristique.mp3','audio/mpeg3',3284,29),(108,'Y-find76','413399.273244','in quam.txt','text/plain',4938,50),(109,'Fintone87','062327.824376','varius nulla facilisi.mpeg','video/mpeg',4152,60),(110,'Namfix94','227073.311185','turpis donec posuere.png','image/png',3976,37),(111,'Lotlux98','994894.250817','fusce congue.avi','video/avi',1458,19),(112,'Span19','112164.721951','eros.tiff','image/tiff',1755,35),(113,'Sonsing68','543887.284067','ante vel.avi','video/msvideo',1584,45),(114,'Sonair83','996306.500695','accumsan tortor.mp3','audio/x-mpeg-3',4079,34),(115,'Daltfresh83','069855.231654','blandit mi.mp3','audio/x-mpeg-3',2772,49),(116,'Konklux35','493626.603540','cras.jpeg','image/pjpeg',3461,39),(117,'Lotlux10','816158.178581','mi nulla.ppt','application/x-mspowerpoint',2609,28),(118,'Greenlam50','957399.509487','maecenas leo odio.xls','application/x-excel',3845,49),(119,'Wrapsafe41','293605.616784','platea dictumst maecenas.avi','video/x-msvideo',169,46),(120,'Cardify83','268968.145646','penatibus et magnis.mpeg','video/mpeg',2563,32),(121,'Fix San70','544085.596767','et ultrices posuere.tiff','image/tiff',4434,40),(122,'Mat Lam Tam10','387320.605799','in faucibus orci.avi','video/avi',3479,52),(123,'Quo Lux75','858772.692379','tempor.mp3','audio/mpeg3',4392,40),(124,'It65','299964.093157','adipiscing molestie.tiff','image/tiff',2085,54),(125,'Konklux72','781520.563669','ac.xls','application/x-msexcel',4839,33),(126,'Fintone34','410927.752046','a ipsum.avi','video/msvideo',3866,42),(127,'Bigtax69','066299.482564','enim in.mp3','video/mpeg',2669,59),(128,'Pannier61','400411.560054','sapien arcu.avi','video/x-msvideo',589,55),(129,'Fix San49','361471.934938','tortor quis turpis.ppt','application/vnd.ms-powerpoint',3904,4),(130,'Fix San99','327301.799828','nisl duis bibendum.xls','application/excel',3795,60),(131,'Zamit75','423639.786572','enim leo.xls','application/excel',178,30),(132,'Bigtax61','029740.984235','vitae.ppt','application/powerpoint',3948,7),(133,'Temp25','726569.683645','etiam pretium.pdf','application/pdf',1975,45),(134,'Bytecard57','559713.815062','sed accumsan felis.mp3','video/x-mpeg',2840,56),(135,'Prodder43','896531.976748','sit.ppt','application/mspowerpoint',2797,58),(136,'Tin21','721501.434525','ultricies eu.xls','application/vnd.ms-excel',3160,5),(137,'Y-Solowarm60','438368.710683','pretium iaculis.pdf','application/pdf',1389,52),(138,'Zoolab17','151261.086385','vel augue vestibulum.tiff','image/tiff',1298,48),(139,'Tempsoft20','569030.668446','ipsum primis in.tiff','image/tiff',1173,50),(140,'Tin53','459112.058100','eu est.ppt','application/vnd.ms-powerpoint',416,22),(141,'Matsoft22','461910.930770','nisi volutpat eleifend.mp3','audio/x-mpeg-3',4362,56),(142,'Cardguard31','412917.531174','morbi a ipsum.mov','video/quicktime',2611,44),(143,'Span98','898802.380512','lectus pellentesque.xls','application/excel',2049,21),(144,'Ventosanzap43','315717.215710','lacinia eget tincidunt.ppt','application/mspowerpoint',3426,24),(145,'Temp28','213899.407284','semper.xls','application/vnd.ms-excel',3716,4),(146,'Kanlam21','060102.386406','in felis.avi','video/x-msvideo',4273,8),(147,'Temp95','267143.914569','mauris sit amet.xls','application/x-msexcel',2558,39),(148,'Kanlam53','330085.325122','ante.txt','text/plain',3799,32),(149,'Flowdesk28','351062.377721','ultrices.jpeg','image/jpeg',4125,48),(150,'Vagram93','517806.235702','pretium iaculis diam.ppt','application/x-mspowerpoint',1140,25),(151,'Andalax87','787645.453423','augue.mp3','video/x-mpeg',1110,7),(152,'Bitchip20','495943.136768','eu est.doc','application/msword',2306,16),(153,'Andalax38','611163.745791','morbi quis tortor.ppt','application/vnd.ms-powerpoint',3261,60),(154,'Andalax17','097616.338127','luctus cum sociis.xls','application/excel',1864,51),(155,'Pannier39','170921.541244','duis consequat.tiff','image/tiff',1641,27),(156,'Matsoft76','321034.361831','nulla sed.mp3','video/x-mpeg',2609,39),(157,'Ronstring70','559817.557361','lacus.tiff','image/x-tiff',4147,33),(158,'Bigtax59','129502.673674','varius integer.gif','image/gif',3057,1),(159,'Opela40','483211.350800','vestibulum velit id.jpeg','image/pjpeg',3108,52),(160,'Stim30','911107.423751','orci.tiff','image/x-tiff',103,12),(161,'Voyatouch63','461695.422401','sed.xls','application/excel',2422,14),(162,'Zamit86','543319.709277','hac.mp3','audio/x-mpeg-3',2998,35),(163,'Rank43','313926.536648','nulla.xls','application/x-excel',4791,48),(164,'Stronghold76','529490.878465','nulla suscipit.avi','video/avi',1180,19),(165,'Fix San31','510976.555555','imperdiet.jpeg','image/pjpeg',3028,50),(166,'Sonair74','818857.532318','phasellus id.gif','image/gif',4282,16),(167,'Matsoft54','335979.752136','velit nec.avi','application/x-troff-msvideo',1135,27),(168,'Tresom92','139634.967794','duis at velit.mpeg','video/mpeg',4023,15),(169,'Lotlux64','036026.834911','donec ut mauris.mov','video/quicktime',2688,37),(170,'Home Ing52','882099.198813','imperdiet.mp3','video/x-mpeg',914,27),(171,'Greenlam92','501065.762801','habitasse platea.avi','application/x-troff-msvideo',1422,49),(172,'Opela66','239843.636041','nunc nisl duis.tiff','image/tiff',4942,12),(173,'Latlux25','178742.226388','duis at velit.ppt','application/x-mspowerpoint',4926,19),(174,'Konklux82','879540.048053','mauris sit amet.jpeg','image/pjpeg',4914,13),(175,'Transcof52','300969.084847','sit amet consectetuer.mp3','audio/x-mpeg-3',458,22),(176,'Tempsoft14','401367.260588','pretium.xls','application/vnd.ms-excel',610,39),(177,'Sonsing67','802216.773567','sit amet consectetuer.jpeg','image/jpeg',3152,14),(178,'Bytecard61','006121.925697','quis lectus suspendisse.jpeg','image/jpeg',1876,34),(179,'Prodder28','862834.969395','justo lacinia eget.ppt','application/x-mspowerpoint',2209,6),(180,'Hatity56','117930.656598','mollis.mp3','video/mpeg',2936,21),(181,'Hatity32','020859.702243','primis in faucibus.xls','application/vnd.ms-excel',2571,52),(182,'Duobam62','843453.714033','dolor vel est.mp3','video/x-mpeg',3472,34),(183,'Rank85','732615.876021','ut tellus nulla.avi','application/x-troff-msvideo',2455,5),(184,'Domainer77','987615.142106','convallis tortor.tiff','image/tiff',3130,4),(185,'It19','766446.640358','id.ppt','application/powerpoint',4294,11),(186,'Biodex55','447791.864951','volutpat.ppt','application/x-mspowerpoint',4548,12),(187,'Konklab61','668684.399884','vestibulum sit.pdf','application/pdf',2347,53),(188,'Tempsoft58','085398.283808','donec.xls','application/x-excel',1164,45),(189,'Zontrax77','600781.360147','condimentum curabitur.mpeg','video/mpeg',1067,32),(190,'Y-find28','470088.565105','nulla tempus.mp3','video/x-mpeg',1738,22),(191,'Tampflex68','867256.117552','sem fusce consequat.xls','application/x-excel',3976,43),(192,'Voyatouch58','144646.924628','erat.pdf','application/pdf',3901,22),(193,'Ronstring22','055302.867540','justo.png','image/png',1247,48),(194,'Gembucket57','315653.860899','sem sed.mp3','video/x-mpeg',2680,52),(195,'Voltsillam51','774842.405552','ante.mp3','video/x-mpeg',2441,42),(196,'Domainer20','431563.281798','ut erat.gif','image/gif',4649,21),(197,'Y-find11','974756.563434','feugiat et eros.mp3','audio/mpeg3',2139,57),(198,'Stim87','644476.797216','at turpis donec.txt','text/plain',2096,21),(199,'Toughjoyfax12','099118.072668','justo eu.ppt','application/x-mspowerpoint',3288,32),(200,'Greenlam90','840743.811735','nulla.gif','image/gif',4231,58),(201,'Fintone50','925006.487042','tellus nulla.mp3','audio/x-mpeg-3',1630,56),(202,'Cardguard61','667082.791685','nam dui.mp3','video/mpeg',2422,5),(203,'Andalax85','959470.168548','eget.jpeg','image/pjpeg',4535,10),(204,'Tresom42','184476.849338','feugiat et eros.ppt','application/vnd.ms-powerpoint',2796,3),(205,'Transcof35','057647.165773','in imperdiet et.mp3','audio/x-mpeg-3',4161,45),(206,'Sonair58','893927.393456','luctus.mp3','audio/x-mpeg-3',4698,57),(207,'Y-find78','201175.609003','molestie lorem quisque.mov','video/quicktime',3516,47),(208,'Zathin89','793225.450396','nulla eget eros.jpeg','image/pjpeg',4012,32),(209,'Alpha66','482184.155297','porttitor.ppt','application/vnd.ms-powerpoint',4573,20),(210,'Mat Lam Tam84','279581.131118','tristique est.jpeg','image/pjpeg',1017,21),(211,'Biodex33','710671.993600','vel ipsum.pdf','application/pdf',1282,60),(212,'Tampflex85','484066.433201','eget.mp3','audio/mpeg3',4001,19),(213,'Tampflex77','606191.465294','sapien.avi','application/x-troff-msvideo',14,18),(214,'Home Ing64','976133.603696','commodo placerat praesent.mp3','audio/mpeg3',3823,11),(215,'Bytecard17','154103.671143','lectus pellentesque eget.doc','application/msword',1514,29),(216,'Span44','285565.354370','diam erat fermentum.mp3','audio/x-mpeg-3',4094,57),(217,'Mat Lam Tam12','732638.645144','duis.jpeg','image/jpeg',850,5),(218,'It78','153500.774221','magnis dis parturient.doc','application/msword',2758,32),(219,'Konklux56','168408.213639','id.jpeg','image/pjpeg',4359,11),(220,'Konklab85','156282.673233','et ultrices.gif','image/gif',3480,12),(221,'Zontrax15','413465.028135','faucibus cursus.mp3','audio/x-mpeg-3',617,24),(222,'Otcom99','235076.082370','platea.xls','application/x-msexcel',2074,27),(223,'Aerified34','385393.560153','pretium iaculis diam.mpeg','video/mpeg',3155,58),(224,'Viva63','063823.061322','justo.pdf','application/pdf',3221,17),(225,'Andalax13','146537.665231','pede.avi','video/avi',377,60),(226,'Subin24','663438.473220','in hac habitasse.doc','application/msword',115,30),(227,'Job92','057397.206548','duis consequat dui.xls','application/x-excel',2940,34),(228,'Flowdesk84','301048.675542','vitae ipsum aliquam.xls','application/x-msexcel',2791,42),(229,'Greenlam63','103988.675552','et ultrices posuere.mov','video/quicktime',4695,13),(230,'Daltfresh36','783101.510470','in quam fringilla.png','image/png',4030,10),(231,'Bitchip14','736686.712193','in.mpeg','video/mpeg',2381,8),(232,'Solarbreeze10','480899.967216','lectus suspendisse potenti.mp3','video/x-mpeg',2293,37),(233,'Bytecard57','169639.814851','ipsum.png','image/png',4966,29),(234,'Bytecard94','288700.905097','ultrices.tiff','image/x-tiff',680,25),(235,'Cookley64','060947.350851','mauris.avi','application/x-troff-msvideo',4426,9),(236,'Flexidy56','690025.051646','id massa.png','image/png',1611,45),(237,'Zoolab22','344026.691813','iaculis.tiff','image/tiff',694,24),(238,'Stringtough20','439731.689768','molestie hendrerit at.ppt','application/powerpoint',2954,2),(239,'Daltfresh64','496977.510520','luctus et.xls','application/excel',3663,8),(240,'Redhold67','534195.869180','nec.ppt','application/mspowerpoint',4998,45),(241,'Alphazap25','869657.291219','eu orci mauris.png','image/png',3548,31),(242,'Matsoft68','795099.894354','ultrices.mov','video/quicktime',4480,42),(243,'Lotstring31','922500.265327','auctor gravida sem.mp3','video/mpeg',2858,41),(244,'Stronghold22','001430.292669','vel est donec.avi','video/x-msvideo',2093,10),(245,'Prodder64','223197.684102','odio.avi','video/msvideo',3299,51),(246,'Stronghold64','652519.009417','hac habitasse platea.mp3','video/mpeg',3522,35),(247,'Fixflex70','262249.120642','ut rhoncus aliquet.avi','application/x-troff-msvideo',724,47),(248,'Sonsing78','866353.714831','vel augue.ppt','application/powerpoint',1009,45),(249,'Otcom53','230057.518421','enim blandit.xls','application/vnd.ms-excel',4282,25),(250,'Veribet43','757433.236790','felis fusce.ppt','application/vnd.ms-powerpoint',3877,6),(251,'Job18','381033.239118','mi.xls','application/x-excel',4382,1),(252,'Gembucket33','278617.281567','posuere.doc','application/msword',1931,20),(253,'Quo Lux57','505158.610453','sed lacus morbi.png','image/png',480,28),(254,'Latlux76','877516.537015','nam tristique.mp3','audio/x-mpeg-3',2254,1),(255,'Fix San56','839754.233309','nulla.tiff','image/x-tiff',1824,51),(256,'Pannier93','518703.797302','sapien iaculis.doc','application/msword',472,45),(257,'Hatity39','882423.763138','condimentum id luctus.avi','application/x-troff-msvideo',4574,52),(258,'Lotlux84','063300.922684','morbi vel lectus.txt','text/plain',775,53),(259,'Biodex85','725093.883061','nonummy integer.mov','video/quicktime',3939,23),(260,'Zamit58','622376.841052','tempor.mp3','audio/x-mpeg-3',3852,38),(261,'Y-find57','761860.221856','consequat morbi.mp3','audio/x-mpeg-3',4277,45),(262,'Vagram37','730693.819625','suspendisse.png','image/png',2064,30),(263,'Bigtax31','538684.855454','ipsum integer a.mp3','audio/mpeg3',1914,58),(264,'Zaam-Dox88','074636.894321','vitae ipsum aliquam.ppt','application/x-mspowerpoint',4391,39),(265,'Temp81','205416.812195','convallis.mp3','audio/mpeg3',4715,30),(266,'Zamit79','489758.677779','vulputate justo.tiff','image/x-tiff',1811,5),(267,'Redhold98','198712.955280','cras pellentesque volutpat.mp3','audio/x-mpeg-3',4988,39),(268,'Prodder89','030309.280007','at feugiat non.jpeg','image/jpeg',1138,17),(269,'Alphazap91','686135.465052','faucibus.pdf','application/pdf',2897,2),(270,'Tampflex16','669111.775262','venenatis lacinia aenean.avi','video/msvideo',1903,6),(271,'Otcom84','899686.060346','aliquam lacus.avi','video/x-msvideo',3554,8),(272,'Kanlam45','004054.494660','mattis odio donec.xls','application/x-excel',3965,49),(273,'Zaam-Dox20','272219.459581','porttitor.mpeg','video/mpeg',4359,13),(274,'Tin28','778544.764005','potenti nullam.avi','application/x-troff-msvideo',1043,47),(275,'Span35','540215.836412','dis parturient montes.ppt','application/x-mspowerpoint',3862,6),(276,'Cookley47','756585.020910','vestibulum proin eu.xls','application/excel',368,41),(277,'It99','784855.163876','augue vel.tiff','image/tiff',4487,34),(278,'Tin24','501916.985222','mus vivamus.ppt','application/mspowerpoint',3352,59),(279,'Pannier41','450553.748036','pellentesque quisque.mp3','audio/x-mpeg-3',2511,49),(280,'Konklab14','889232.447786','lacinia.xls','application/x-msexcel',1528,47),(281,'Temp90','684248.632729','felis sed interdum.doc','application/msword',398,36),(282,'Zoolab64','965753.960273','varius integer ac.mpeg','video/mpeg',272,24),(283,'Zaam-Dox76','236957.340999','duis faucibus accumsan.avi','video/avi',2180,38),(284,'Flexidy44','455928.246878','lorem.tiff','image/x-tiff',1981,42),(285,'Overhold89','099002.484093','nisi at.mp3','video/x-mpeg',3590,32),(286,'Namfix57','611631.367869','sollicitudin.doc','application/msword',1410,21),(287,'Alpha10','855630.001173','fringilla rhoncus.avi','application/x-troff-msvideo',2249,43),(288,'Flowdesk65','889842.186603','in eleifend quam.mp3','audio/x-mpeg-3',2669,32),(289,'Viva79','882544.635859','justo nec condimentum.xls','application/x-msexcel',1750,8),(290,'Lotstring13','431240.039475','posuere cubilia.ppt','application/powerpoint',2323,36),(291,'Y-Solowarm23','310591.593959','leo maecenas pulvinar.mp3','video/x-mpeg',3760,4),(292,'Fix San89','348250.383966','nam congue.xls','application/x-msexcel',4478,33),(293,'Sonair75','630253.760026','aenean fermentum.mpeg','video/mpeg',687,15),(294,'Viva43','183439.434027','eget eros.ppt','application/x-mspowerpoint',3450,39),(295,'Flowdesk58','575635.462435','molestie nibh in.png','image/png',2197,12),(296,'Fintone72','353076.960935','sit amet.mp3','video/x-mpeg',2586,47),(297,'Latlux63','779039.356042','aliquam.ppt','application/x-mspowerpoint',1435,3),(298,'Matsoft10','581598.065303','in felis.gif','image/gif',1118,33),(299,'Bamity84','847053.477075','dolor.avi','video/x-msvideo',4774,8),(300,'Regrant62','226528.554685','pulvinar lobortis est.xls','application/x-msexcel',2735,11);
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
) ENGINE=InnoDB AUTO_INCREMENT=602 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_documentos`
--

LOCK TABLES `gdoks_documentos` WRITE;
/*!40000 ALTER TABLE `gdoks_documentos` DISABLE KEYS */;
INSERT INTO `gdoks_documentos` VALUES (1,'Bitchip-820','BITC-89',300,251,NULL,NULL),(2,'Konklab-514','KONK-75',98,234,NULL,NULL),(3,'Job-428','JOB--38',336,8,NULL,NULL),(4,'Matsoft-298','MATS-36',256,67,NULL,NULL),(5,'Matsoft-578','MATS-85',268,185,NULL,NULL),(6,'Job-811','JOB--27',269,146,NULL,NULL),(7,'Toughjoyfax-605','TOUG-96',308,43,NULL,NULL),(8,'Tresom-381','TRES-23',1,187,NULL,NULL),(9,'Treeflex-304','TREE-66',268,158,NULL,NULL),(10,'Konklab-684','KONK-32',43,276,NULL,NULL),(11,'Veribet-275','VERI-63',31,259,NULL,NULL),(12,'Andalax-694','ANDA-47',28,191,NULL,NULL),(13,'Sonsing-601','SONS-77',80,118,NULL,NULL),(14,'Bamity-244','BAMI-30',240,196,NULL,NULL),(15,'Biodex-589','BIOD-81',31,122,NULL,NULL),(16,'Daltfresh-643','DALT-38',349,164,NULL,NULL),(17,'Sonsing-116','SONS-72',160,85,NULL,NULL),(18,'Fix San-540','FIX -32',17,201,NULL,NULL),(19,'Span-682','SPAN-49',335,178,NULL,NULL),(20,'Bitchip-363','BITC-76',43,60,NULL,NULL),(21,'Mat Lam Tam-989','MAT -29',287,25,NULL,NULL),(22,'Viva-385','VIVA-28',241,88,NULL,NULL),(23,'Cardguard-950','CARD-41',197,64,NULL,NULL),(24,'Latlux-546','LATL-99',11,240,NULL,NULL),(25,'Zathin-524','ZATH-96',143,2,NULL,NULL),(26,'Fix San-890','FIX -32',43,275,NULL,NULL),(27,'Konklux-499','KONK-43',91,55,NULL,NULL),(28,'Latlux-503','LATL-68',191,23,NULL,NULL),(29,'Veribet-135','VERI-76',16,5,NULL,NULL),(30,'Bamity-370','BAMI-74',144,181,NULL,NULL),(31,'Subin-845','SUBI-69',87,44,NULL,NULL),(32,'Rank-958','RANK-59',108,117,NULL,NULL),(33,'Hatity-337','HATI-40',300,223,NULL,NULL),(34,'Solarbreeze-569','SOLA-90',213,175,NULL,NULL),(35,'Asoka-734','ASOK-14',61,253,NULL,NULL),(36,'Home Ing-671','HOME-69',51,247,NULL,NULL),(37,'Vagram-593','VAGR-14',61,35,NULL,NULL),(38,'Fintone-193','FINT-76',134,256,NULL,NULL),(39,'Veribet-313','VERI-10',163,277,NULL,NULL),(40,'Tres-Zap-927','TRES-41',151,246,NULL,NULL),(41,'Toughjoyfax-798','TOUG-23',319,154,NULL,NULL),(42,'Opela-997','OPEL-93',12,17,NULL,NULL),(43,'Pannier-291','PANN-91',53,262,NULL,NULL),(44,'Otcom-952','OTCO-47',359,33,NULL,NULL),(45,'Fixflex-312','FIXF-33',217,79,NULL,NULL),(46,'Zathin-629','ZATH-62',154,125,NULL,NULL),(47,'Alpha-996','ALPH-82',313,249,NULL,NULL),(48,'Fixflex-695','FIXF-87',75,243,NULL,NULL),(49,'Gembucket-742','GEMB-84',335,65,NULL,NULL),(50,'Ronstring-453','RONS-88',212,49,NULL,NULL),(51,'Keylex-860','KEYL-32',199,169,NULL,NULL),(52,'Quo Lux-364','QUO -43',348,10,NULL,NULL),(53,'Mat Lam Tam-166','MAT -87',159,121,NULL,NULL),(54,'Bamity-849','BAMI-31',34,176,NULL,NULL),(55,'Domainer-102','DOMA-22',162,55,NULL,NULL),(56,'Quo Lux-770','QUO -34',53,52,NULL,NULL),(57,'Voltsillam-846','VOLT-99',134,142,NULL,NULL),(58,'Sub-Ex-757','SUB--73',139,183,NULL,NULL),(59,'Temp-244','TEMP-78',338,181,NULL,NULL),(60,'Wrapsafe-777','WRAP-99',54,256,NULL,NULL),(61,'Bytecard-723','BYTE-33',220,24,NULL,NULL),(62,'Flexidy-799','FLEX-94',232,124,NULL,NULL),(63,'Bitchip-814','BITC-78',201,152,NULL,NULL),(64,'Domainer-776','DOMA-92',321,39,NULL,NULL),(65,'Lotlux-580','LOTL-50',296,71,NULL,NULL),(66,'Sub-Ex-158','SUB--16',348,18,NULL,NULL),(67,'Flexidy-670','FLEX-63',214,2,NULL,NULL),(68,'Regrant-555','REGR-12',264,11,NULL,NULL),(69,'Lotlux-673','LOTL-28',349,172,NULL,NULL),(70,'Konklux-304','KONK-24',181,141,NULL,NULL),(71,'Ronstring-438','RONS-27',77,90,NULL,NULL),(72,'Vagram-380','VAGR-16',354,237,NULL,NULL),(73,'Voyatouch-818','VOYA-99',325,275,NULL,NULL),(74,'Overhold-616','OVER-74',49,122,NULL,NULL),(75,'Span-952','SPAN-10',297,103,NULL,NULL),(76,'Tin-629','TIN--99',108,18,NULL,NULL),(77,'Sonair-206','SONA-58',262,197,NULL,NULL),(78,'Bytecard-532','BYTE-71',90,20,NULL,NULL),(79,'Tin-894','TIN--98',178,273,NULL,NULL),(80,'Namfix-838','NAMF-64',87,144,NULL,NULL),(81,'Ventosanzap-856','VENT-34',83,141,NULL,NULL),(82,'Span-597','SPAN-77',37,132,NULL,NULL),(83,'Temp-984','TEMP-30',206,213,NULL,NULL),(84,'Lotlux-380','LOTL-23',103,115,NULL,NULL),(85,'Zoolab-810','ZOOL-93',64,186,NULL,NULL),(86,'Opela-587','OPEL-72',238,87,NULL,NULL),(87,'Sub-Ex-469','SUB--37',160,231,NULL,NULL),(88,'Flexidy-182','FLEX-13',140,137,NULL,NULL),(89,'Lotlux-481','LOTL-60',129,243,NULL,NULL),(90,'Matsoft-476','MATS-78',146,118,NULL,NULL),(91,'Flowdesk-757','FLOW-59',290,122,NULL,NULL),(92,'Y-Solowarm-780','Y-SO-98',157,249,NULL,NULL),(93,'Trippledex-674','TRIP-13',200,31,NULL,NULL),(94,'Mat Lam Tam-426','MAT -60',68,245,NULL,NULL),(95,'Aerified-853','AERI-57',78,34,NULL,NULL),(96,'Tempsoft-251','TEMP-39',83,8,NULL,NULL),(97,'Stim-413','STIM-83',81,25,NULL,NULL),(98,'Cookley-591','COOK-85',32,257,NULL,NULL),(99,'Vagram-471','VAGR-80',28,196,NULL,NULL),(100,'Rank-922','RANK-84',326,234,NULL,NULL),(101,'Latlux-613','LATL-93',280,282,NULL,NULL),(102,'Sonair-891','SONA-10',128,99,NULL,NULL),(103,'Tampflex-533','TAMP-29',282,239,NULL,NULL),(104,'Cookley-673','COOK-43',356,179,NULL,NULL),(105,'Toughjoyfax-759','TOUG-20',237,86,NULL,NULL),(106,'Redhold-761','REDH-42',214,209,NULL,NULL),(107,'Asoka-859','ASOK-81',270,64,NULL,NULL),(108,'Zoolab-978','ZOOL-33',269,110,NULL,NULL),(109,'Flexidy-260','FLEX-79',12,29,NULL,NULL),(110,'Duobam-605','DUOB-24',34,88,NULL,NULL),(111,'Lotstring-818','LOTS-27',335,220,NULL,NULL),(112,'Vagram-236','VAGR-48',174,40,NULL,NULL),(113,'Viva-717','VIVA-75',101,264,NULL,NULL),(114,'Y-Solowarm-315','Y-SO-45',124,216,NULL,NULL),(115,'Treeflex-903','TREE-56',134,168,NULL,NULL),(116,'Zontrax-409','ZONT-57',103,2,NULL,NULL),(117,'Holdlamis-788','HOLD-81',96,145,NULL,NULL),(118,'Ronstring-507','RONS-35',257,243,NULL,NULL),(119,'Sonair-894','SONA-59',358,3,NULL,NULL),(120,'Konklux-745','KONK-14',235,259,NULL,NULL),(121,'Flexidy-343','FLEX-66',278,280,NULL,NULL),(122,'Treeflex-724','TREE-82',344,73,NULL,NULL),(123,'Temp-947','TEMP-14',290,170,NULL,NULL),(124,'Job-778','JOB--34',199,50,NULL,NULL),(125,'Job-784','JOB--55',16,273,NULL,NULL),(126,'Duobam-648','DUOB-42',195,7,NULL,NULL),(127,'Tampflex-932','TAMP-36',296,276,NULL,NULL),(128,'Holdlamis-377','HOLD-14',40,6,NULL,NULL),(129,'Y-Solowarm-916','Y-SO-22',255,91,NULL,NULL),(130,'Pannier-623','PANN-76',93,129,NULL,NULL),(131,'Tin-156','TIN--10',201,168,NULL,NULL),(132,'Cookley-358','COOK-44',240,22,NULL,NULL),(133,'Asoka-860','ASOK-11',136,280,NULL,NULL),(134,'Redhold-965','REDH-76',197,219,NULL,NULL),(135,'Zontrax-139','ZONT-56',3,177,NULL,NULL),(136,'Sonsing-946','SONS-35',53,250,NULL,NULL),(137,'Sonair-445','SONA-26',247,151,NULL,NULL),(138,'Bitwolf-237','BITW-16',266,203,NULL,NULL),(139,'Greenlam-601','GREE-60',330,39,NULL,NULL),(140,'Sonair-454','SONA-54',257,61,NULL,NULL),(141,'Tin-711','TIN--53',273,15,NULL,NULL),(142,'Sub-Ex-758','SUB--74',172,263,NULL,NULL),(143,'Holdlamis-519','HOLD-85',176,103,NULL,NULL),(144,'Konklab-757','KONK-87',298,134,NULL,NULL),(145,'Matsoft-152','MATS-92',57,231,NULL,NULL),(146,'Bitchip-884','BITC-31',357,91,NULL,NULL),(147,'Bitchip-392','BITC-33',337,118,NULL,NULL),(148,'Tresom-422','TRES-13',260,219,NULL,NULL),(149,'Voyatouch-216','VOYA-32',204,236,NULL,NULL),(150,'Tres-Zap-353','TRES-11',203,112,NULL,NULL),(151,'Treeflex-170','TREE-71',56,109,NULL,NULL),(152,'Matsoft-269','MATS-33',136,15,NULL,NULL),(153,'Voyatouch-799','VOYA-16',18,203,NULL,NULL),(154,'Lotstring-251','LOTS-52',96,238,NULL,NULL),(155,'Fixflex-816','FIXF-33',286,143,NULL,NULL),(156,'Bamity-328','BAMI-49',52,240,NULL,NULL),(157,'Tempsoft-927','TEMP-49',14,60,NULL,NULL),(158,'Veribet-819','VERI-32',284,253,NULL,NULL),(159,'Bitchip-524','BITC-63',182,133,NULL,NULL),(160,'Job-179','JOB--47',229,279,NULL,NULL),(161,'Tresom-199','TRES-29',268,222,NULL,NULL),(162,'Tin-157','TIN--44',189,7,NULL,NULL),(163,'Konklux-129','KONK-71',171,45,NULL,NULL),(164,'Fintone-342','FINT-74',332,262,NULL,NULL),(165,'Transcof-597','TRAN-95',316,30,NULL,NULL),(166,'Kanlam-509','KANL-68',296,41,NULL,NULL),(167,'Pannier-299','PANN-55',90,101,NULL,NULL),(168,'Daltfresh-400','DALT-68',271,50,NULL,NULL),(169,'Ventosanzap-685','VENT-50',127,23,NULL,NULL),(170,'Sonair-137','SONA-29',279,112,NULL,NULL),(171,'Trippledex-668','TRIP-34',9,266,NULL,NULL),(172,'Fintone-526','FINT-81',64,221,NULL,NULL),(173,'Sonsing-196','SONS-80',197,123,NULL,NULL),(174,'Lotlux-953','LOTL-16',77,216,NULL,NULL),(175,'Zathin-388','ZATH-36',355,129,NULL,NULL),(176,'Andalax-184','ANDA-57',170,63,NULL,NULL),(177,'Tampflex-253','TAMP-72',311,100,NULL,NULL),(178,'Lotlux-884','LOTL-75',204,55,NULL,NULL),(179,'Treeflex-811','TREE-25',274,25,NULL,NULL),(180,'Fix San-878','FIX -86',84,39,NULL,NULL),(181,'Prodder-498','PROD-59',128,85,NULL,NULL),(182,'Subin-555','SUBI-80',48,5,NULL,NULL),(183,'Cardify-280','CARD-14',121,259,NULL,NULL),(184,'Fix San-872','FIX -85',117,213,NULL,NULL),(185,'Bamity-269','BAMI-20',224,274,NULL,NULL),(186,'Zoolab-947','ZOOL-51',174,247,NULL,NULL),(187,'Rank-366','RANK-37',293,218,NULL,NULL),(188,'Sub-Ex-597','SUB--84',52,180,NULL,NULL),(189,'Domainer-821','DOMA-91',144,262,NULL,NULL),(190,'Konklab-877','KONK-82',269,282,NULL,NULL),(191,'Zaam-Dox-908','ZAAM-90',19,132,NULL,NULL),(192,'Alphazap-740','ALPH-43',225,113,NULL,NULL),(193,'It-131','IT-1-96',285,210,NULL,NULL),(194,'Cardguard-540','CARD-71',157,133,NULL,NULL),(195,'Job-591','JOB--18',13,196,NULL,NULL),(196,'Toughjoyfax-280','TOUG-74',238,222,NULL,NULL),(197,'Tres-Zap-637','TRES-52',283,241,NULL,NULL),(198,'Hatity-815','HATI-50',139,249,NULL,NULL),(199,'Matsoft-856','MATS-13',112,85,NULL,NULL),(200,'Domainer-901','DOMA-48',257,31,NULL,NULL),(201,'Y-find-760','Y-FI-34',223,273,NULL,NULL),(202,'Voyatouch-362','VOYA-72',247,215,NULL,NULL),(203,'Flexidy-174','FLEX-28',344,65,NULL,NULL),(204,'Hatity-454','HATI-66',94,67,NULL,NULL),(205,'Hatity-504','HATI-59',94,157,NULL,NULL),(206,'Rank-678','RANK-44',248,185,NULL,NULL),(207,'Regrant-316','REGR-45',209,128,NULL,NULL),(208,'Y-find-548','Y-FI-50',122,220,NULL,NULL),(209,'Home Ing-634','HOME-36',45,236,NULL,NULL),(210,'Aerified-341','AERI-30',253,86,NULL,NULL),(211,'Solarbreeze-520','SOLA-40',78,63,NULL,NULL),(212,'Konklab-579','KONK-36',28,282,NULL,NULL),(213,'Zathin-370','ZATH-73',267,106,NULL,NULL),(214,'Pannier-342','PANN-51',152,90,NULL,NULL),(215,'Opela-753','OPEL-58',249,130,NULL,NULL),(216,'Matsoft-542','MATS-74',179,195,NULL,NULL),(217,'Fixflex-231','FIXF-96',168,38,NULL,NULL),(218,'Daltfresh-531','DALT-88',34,81,NULL,NULL),(219,'Ventosanzap-330','VENT-52',309,244,NULL,NULL),(220,'Konklab-764','KONK-87',294,57,NULL,NULL),(221,'Transcof-677','TRAN-93',121,59,NULL,NULL),(222,'Duobam-842','DUOB-11',207,272,NULL,NULL),(223,'Fintone-700','FINT-59',184,218,NULL,NULL),(224,'Keylex-754','KEYL-33',52,193,NULL,NULL),(225,'Bitchip-822','BITC-64',240,281,NULL,NULL),(226,'Asoka-940','ASOK-75',102,204,NULL,NULL),(227,'Toughjoyfax-503','TOUG-35',90,183,NULL,NULL),(228,'Viva-902','VIVA-20',223,258,NULL,NULL),(229,'Konklab-365','KONK-29',86,16,NULL,NULL),(230,'Sonair-455','SONA-56',200,243,NULL,NULL),(231,'Otcom-404','OTCO-62',104,65,NULL,NULL),(232,'Fintone-564','FINT-12',193,197,NULL,NULL),(233,'Sonair-735','SONA-37',135,71,NULL,NULL),(234,'Zontrax-488','ZONT-58',40,155,NULL,NULL),(235,'Regrant-490','REGR-84',189,152,NULL,NULL),(236,'Rank-250','RANK-67',249,249,NULL,NULL),(237,'Redhold-568','REDH-85',300,120,NULL,NULL),(238,'Temp-764','TEMP-44',237,24,NULL,NULL),(239,'Lotlux-472','LOTL-46',278,155,NULL,NULL),(240,'Y-Solowarm-555','Y-SO-98',267,37,NULL,NULL),(241,'Tresom-383','TRES-41',144,227,NULL,NULL),(242,'Kanlam-388','KANL-75',254,122,NULL,NULL),(243,'Daltfresh-779','DALT-36',89,131,NULL,NULL),(244,'Home Ing-984','HOME-58',293,89,NULL,NULL),(245,'Rank-882','RANK-34',239,215,NULL,NULL),(246,'Sub-Ex-826','SUB--50',245,166,NULL,NULL),(247,'Latlux-866','LATL-86',302,281,NULL,NULL),(248,'Zaam-Dox-654','ZAAM-34',132,173,NULL,NULL),(249,'Redhold-960','REDH-69',148,156,NULL,NULL),(250,'Domainer-852','DOMA-24',114,194,NULL,NULL),(251,'Tin-671','TIN--92',283,167,NULL,NULL),(252,'Span-808','SPAN-83',9,264,NULL,NULL),(253,'Voltsillam-762','VOLT-58',8,212,NULL,NULL),(254,'Subin-461','SUBI-94',22,125,NULL,NULL),(255,'Quo Lux-484','QUO -36',35,258,NULL,NULL),(256,'Matsoft-835','MATS-86',217,50,NULL,NULL),(257,'Transcof-992','TRAN-95',64,282,NULL,NULL),(258,'Stim-722','STIM-24',140,45,NULL,NULL),(259,'Biodex-420','BIOD-42',41,159,NULL,NULL),(260,'Stringtough-684','STRI-50',255,156,NULL,NULL),(261,'Rank-694','RANK-61',107,135,NULL,NULL),(262,'Zamit-254','ZAMI-13',76,111,NULL,NULL),(263,'Home Ing-829','HOME-43',22,130,NULL,NULL),(264,'Tempsoft-405','TEMP-31',28,137,NULL,NULL),(265,'Fix San-726','FIX -13',37,45,NULL,NULL),(266,'Overhold-219','OVER-17',127,172,NULL,NULL),(267,'Flowdesk-814','FLOW-80',180,5,NULL,NULL),(268,'Zamit-206','ZAMI-98',272,265,NULL,NULL),(269,'Overhold-135','OVER-56',272,272,NULL,NULL),(270,'Alpha-860','ALPH-47',236,84,NULL,NULL),(271,'Matsoft-347','MATS-28',351,46,NULL,NULL),(272,'Bamity-930','BAMI-49',202,141,NULL,NULL),(273,'Tin-527','TIN--70',320,110,NULL,NULL),(274,'Namfix-674','NAMF-11',240,141,NULL,NULL),(275,'Sonair-443','SONA-68',194,160,NULL,NULL),(276,'Tin-252','TIN--96',20,109,NULL,NULL),(277,'Fintone-537','FINT-91',223,62,NULL,NULL),(278,'Lotlux-836','LOTL-42',238,281,NULL,NULL),(279,'Zaam-Dox-213','ZAAM-50',80,196,NULL,NULL),(280,'Konklab-166','KONK-80',173,75,NULL,NULL),(281,'Rank-962','RANK-22',310,166,NULL,NULL),(282,'Cardguard-904','CARD-15',130,121,NULL,NULL),(283,'Greenlam-650','GREE-52',247,38,NULL,NULL),(284,'Andalax-382','ANDA-74',212,7,NULL,NULL),(285,'Tresom-511','TRES-15',282,122,NULL,NULL),(286,'Bitwolf-851','BITW-92',83,116,NULL,NULL),(287,'Treeflex-231','TREE-38',304,277,NULL,NULL),(288,'Regrant-539','REGR-16',331,212,NULL,NULL),(289,'Otcom-894','OTCO-60',352,53,NULL,NULL),(290,'Bytecard-749','BYTE-87',85,168,NULL,NULL),(291,'Fintone-115','FINT-82',91,32,NULL,NULL),(292,'Keylex-568','KEYL-82',195,269,NULL,NULL),(293,'Job-817','JOB--53',238,105,NULL,NULL),(294,'Asoka-840','ASOK-67',343,38,NULL,NULL),(295,'Job-382','JOB--58',192,222,NULL,NULL),(296,'Tempsoft-803','TEMP-11',151,155,NULL,NULL),(297,'Domainer-675','DOMA-77',265,90,NULL,NULL),(298,'Rank-879','RANK-30',288,123,NULL,NULL),(299,'Treeflex-636','TREE-41',71,170,NULL,NULL),(300,'Flexidy-362','FLEX-52',130,39,NULL,NULL),(301,'Alphazap-146','ALPH-71',210,239,NULL,NULL),(302,'Voyatouch-662','VOYA-88',290,60,NULL,NULL),(303,'Cookley-166','COOK-57',356,49,NULL,NULL),(304,'Bigtax-346','BIGT-66',200,147,NULL,NULL),(305,'Namfix-520','NAMF-14',197,35,NULL,NULL),(306,'Subin-765','SUBI-83',340,139,NULL,NULL),(307,'Alpha-567','ALPH-63',355,184,NULL,NULL),(308,'Namfix-633','NAMF-74',156,66,NULL,NULL),(309,'Duobam-984','DUOB-61',39,229,NULL,NULL),(310,'Subin-182','SUBI-79',303,187,NULL,NULL),(311,'Bytecard-737','BYTE-53',359,6,NULL,NULL),(312,'Biodex-887','BIOD-46',280,240,NULL,NULL),(313,'Span-738','SPAN-46',32,124,NULL,NULL),(314,'Tempsoft-746','TEMP-66',69,280,NULL,NULL),(315,'Zoolab-784','ZOOL-37',51,23,NULL,NULL),(316,'Solarbreeze-428','SOLA-45',210,56,NULL,NULL),(317,'Matsoft-595','MATS-60',165,103,NULL,NULL),(318,'Y-find-146','Y-FI-24',47,81,NULL,NULL),(319,'Kanlam-792','KANL-33',135,283,NULL,NULL),(320,'Matsoft-696','MATS-81',237,252,NULL,NULL),(321,'Matsoft-819','MATS-48',260,174,NULL,NULL),(322,'Toughjoyfax-345','TOUG-94',162,276,NULL,NULL),(323,'Tres-Zap-428','TRES-46',321,162,NULL,NULL),(324,'Daltfresh-373','DALT-61',211,222,NULL,NULL),(325,'Sub-Ex-362','SUB--29',31,40,NULL,NULL),(326,'Fixflex-199','FIXF-78',320,282,NULL,NULL),(327,'Fix San-533','FIX -34',3,133,NULL,NULL),(328,'Zamit-943','ZAMI-55',297,12,NULL,NULL),(329,'Tresom-295','TRES-95',6,272,NULL,NULL),(330,'Gembucket-547','GEMB-63',192,266,NULL,NULL),(331,'Prodder-107','PROD-39',168,182,NULL,NULL),(332,'Tin-908','TIN--88',249,278,NULL,NULL),(333,'Cardify-559','CARD-61',230,97,NULL,NULL),(334,'Greenlam-501','GREE-27',183,197,NULL,NULL),(335,'Andalax-144','ANDA-26',360,171,NULL,NULL),(336,'Gembucket-982','GEMB-70',262,145,NULL,NULL),(337,'Zoolab-670','ZOOL-50',351,229,NULL,NULL),(338,'Y-find-778','Y-FI-44',239,235,NULL,NULL),(339,'Greenlam-942','GREE-96',276,266,NULL,NULL),(340,'Tres-Zap-366','TRES-23',145,129,NULL,NULL),(341,'Y-Solowarm-271','Y-SO-22',145,261,NULL,NULL),(342,'Zoolab-957','ZOOL-91',273,141,NULL,NULL),(343,'Overhold-182','OVER-42',74,216,NULL,NULL),(344,'Konklab-690','KONK-40',135,199,NULL,NULL),(345,'Zontrax-951','ZONT-22',330,244,NULL,NULL),(346,'Sub-Ex-325','SUB--29',347,94,NULL,NULL),(347,'Zontrax-378','ZONT-59',110,22,NULL,NULL),(348,'It-159','IT-1-23',77,63,NULL,NULL),(349,'Flowdesk-323','FLOW-40',245,11,NULL,NULL),(350,'Overhold-723','OVER-37',45,62,NULL,NULL),(351,'Zaam-Dox-618','ZAAM-75',52,57,NULL,NULL),(352,'Overhold-461','OVER-32',67,135,NULL,NULL),(353,'Tempsoft-278','TEMP-66',15,103,NULL,NULL),(354,'Y-Solowarm-744','Y-SO-71',172,58,NULL,NULL),(355,'Andalax-679','ANDA-11',79,73,NULL,NULL),(356,'Fix San-899','FIX -99',92,266,NULL,NULL),(357,'Tresom-684','TRES-25',109,177,NULL,NULL),(358,'Pannier-382','PANN-81',38,13,NULL,NULL),(359,'Toughjoyfax-251','TOUG-87',10,33,NULL,NULL),(360,'Cardify-405','CARD-14',202,109,NULL,NULL),(361,'Tempsoft-104','TEMP-36',59,123,NULL,NULL),(362,'Transcof-262','TRAN-21',66,194,NULL,NULL),(363,'Zathin-759','ZATH-82',26,66,NULL,NULL),(364,'Voltsillam-928','VOLT-86',312,188,NULL,NULL),(365,'Toughjoyfax-217','TOUG-56',158,8,NULL,NULL),(366,'Trippledex-587','TRIP-26',349,59,NULL,NULL),(367,'Hatity-243','HATI-33',355,53,NULL,NULL),(368,'Fixflex-470','FIXF-68',247,254,NULL,NULL),(369,'Bitwolf-953','BITW-30',49,243,NULL,NULL),(370,'Prodder-350','PROD-83',91,116,NULL,NULL),(371,'Alphazap-878','ALPH-73',118,20,NULL,NULL),(372,'Opela-438','OPEL-29',268,120,NULL,NULL),(373,'Asoka-611','ASOK-53',253,95,NULL,NULL),(374,'Sub-Ex-218','SUB--71',153,208,NULL,NULL),(375,'Fix San-593','FIX -89',36,237,NULL,NULL),(376,'Stim-700','STIM-86',293,208,NULL,NULL),(377,'Sonsing-471','SONS-31',2,120,NULL,NULL),(378,'Domainer-207','DOMA-88',221,122,NULL,NULL),(379,'Tempsoft-515','TEMP-23',202,156,NULL,NULL),(380,'Stringtough-454','STRI-41',278,93,NULL,NULL),(381,'Mat Lam Tam-578','MAT -30',268,57,NULL,NULL),(382,'Overhold-443','OVER-83',167,166,NULL,NULL),(383,'Otcom-562','OTCO-97',62,213,NULL,NULL),(384,'Alpha-873','ALPH-54',68,234,NULL,NULL),(385,'Stronghold-414','STRO-13',341,100,NULL,NULL),(386,'Tin-335','TIN--48',134,144,NULL,NULL),(387,'Daltfresh-141','DALT-75',103,145,NULL,NULL),(388,'Zontrax-135','ZONT-40',340,276,NULL,NULL),(389,'Wrapsafe-184','WRAP-29',342,172,NULL,NULL),(390,'Sonsing-907','SONS-13',340,27,NULL,NULL),(391,'Veribet-710','VERI-19',252,157,NULL,NULL),(392,'Zontrax-576','ZONT-85',303,83,NULL,NULL),(393,'Namfix-524','NAMF-63',307,136,NULL,NULL),(394,'Cardguard-667','CARD-15',234,243,NULL,NULL),(395,'Cardguard-181','CARD-54',335,71,NULL,NULL),(396,'Ronstring-217','RONS-77',124,18,NULL,NULL),(397,'Kanlam-864','KANL-36',180,15,NULL,NULL),(398,'Stim-837','STIM-67',237,69,NULL,NULL),(399,'Fintone-168','FINT-41',9,27,NULL,NULL),(400,'Sonair-852','SONA-86',202,69,NULL,NULL),(401,'Otcom-762','OTCO-54',299,166,NULL,NULL),(402,'Viva-233','VIVA-62',127,245,NULL,NULL),(403,'Viva-272','VIVA-61',155,88,NULL,NULL),(404,'Redhold-783','REDH-92',178,246,NULL,NULL),(405,'Bytecard-657','BYTE-97',164,55,NULL,NULL),(406,'Y-find-403','Y-FI-45',216,112,NULL,NULL),(407,'Holdlamis-182','HOLD-69',154,280,NULL,NULL),(408,'Tin-277','TIN--22',38,126,NULL,NULL),(409,'Lotlux-474','LOTL-87',115,133,NULL,NULL),(410,'Trippledex-447','TRIP-28',178,51,NULL,NULL),(411,'Andalax-674','ANDA-85',263,9,NULL,NULL),(412,'Sonsing-634','SONS-70',97,173,NULL,NULL),(413,'Daltfresh-980','DALT-35',301,44,NULL,NULL),(414,'Y-find-885','Y-FI-35',42,126,NULL,NULL),(415,'Wrapsafe-687','WRAP-91',203,135,NULL,NULL),(416,'Biodex-941','BIOD-10',208,271,NULL,NULL),(417,'Voyatouch-218','VOYA-96',328,279,NULL,NULL),(418,'Bamity-389','BAMI-42',8,154,NULL,NULL),(419,'It-124','IT-1-87',51,67,NULL,NULL),(420,'Toughjoyfax-560','TOUG-71',184,44,NULL,NULL),(421,'Cookley-195','COOK-44',167,83,NULL,NULL),(422,'Lotlux-925','LOTL-49',294,22,NULL,NULL),(423,'Trippledex-844','TRIP-72',92,227,NULL,NULL),(424,'Asoka-883','ASOK-52',3,196,NULL,NULL),(425,'Bitchip-499','BITC-25',51,35,NULL,NULL),(426,'Regrant-115','REGR-62',206,67,NULL,NULL),(427,'Toughjoyfax-932','TOUG-27',70,31,NULL,NULL),(428,'Veribet-915','VERI-13',112,235,NULL,NULL),(429,'Veribet-237','VERI-40',111,111,NULL,NULL),(430,'Gembucket-373','GEMB-24',228,111,NULL,NULL),(431,'Subin-434','SUBI-76',287,188,NULL,NULL),(432,'Sub-Ex-343','SUB--42',100,4,NULL,NULL),(433,'Fintone-922','FINT-78',327,173,NULL,NULL),(434,'Kanlam-592','KANL-93',89,1,NULL,NULL),(435,'Wrapsafe-579','WRAP-20',92,117,NULL,NULL),(436,'Cardify-443','CARD-28',306,222,NULL,NULL),(437,'Lotstring-700','LOTS-32',359,66,NULL,NULL),(438,'Ventosanzap-932','VENT-26',165,92,NULL,NULL),(439,'Vagram-361','VAGR-88',65,43,NULL,NULL),(440,'Y-find-488','Y-FI-90',233,210,NULL,NULL),(441,'Stronghold-719','STRO-66',188,77,NULL,NULL),(442,'It-258','IT-2-30',141,56,NULL,NULL),(443,'Matsoft-385','MATS-80',259,42,NULL,NULL),(444,'Matsoft-264','MATS-64',21,104,NULL,NULL),(445,'Sub-Ex-447','SUB--49',135,156,NULL,NULL),(446,'Bitwolf-388','BITW-89',260,80,NULL,NULL),(447,'Namfix-341','NAMF-13',333,227,NULL,NULL),(448,'Zathin-858','ZATH-14',44,227,NULL,NULL),(449,'Tin-727','TIN--11',110,66,NULL,NULL),(450,'Tampflex-705','TAMP-17',308,128,NULL,NULL),(451,'Matsoft-478','MATS-85',51,17,NULL,NULL),(452,'Zamit-351','ZAMI-35',219,37,NULL,NULL),(453,'Ronstring-344','RONS-17',359,182,NULL,NULL),(454,'Zathin-112','ZATH-58',296,76,NULL,NULL),(455,'Y-find-996','Y-FI-46',26,167,NULL,NULL),(456,'Wrapsafe-202','WRAP-36',77,178,NULL,NULL),(457,'Fixflex-892','FIXF-60',289,284,NULL,NULL),(458,'Treeflex-145','TREE-67',246,46,NULL,NULL),(459,'Holdlamis-794','HOLD-11',251,264,NULL,NULL),(460,'Fix San-535','FIX -85',298,206,NULL,NULL),(461,'Mat Lam Tam-240','MAT -48',313,186,NULL,NULL),(462,'Lotlux-701','LOTL-29',81,88,NULL,NULL),(463,'Transcof-156','TRAN-92',287,240,NULL,NULL),(464,'Overhold-716','OVER-59',313,21,NULL,NULL),(465,'Solarbreeze-136','SOLA-23',117,34,NULL,NULL),(466,'Otcom-789','OTCO-50',83,87,NULL,NULL),(467,'Subin-271','SUBI-33',123,42,NULL,NULL),(468,'Treeflex-684','TREE-40',64,50,NULL,NULL),(469,'Matsoft-351','MATS-66',171,213,NULL,NULL),(470,'Opela-150','OPEL-38',349,258,NULL,NULL),(471,'Ronstring-981','RONS-15',249,256,NULL,NULL),(472,'Ronstring-302','RONS-50',114,258,NULL,NULL),(473,'Tempsoft-177','TEMP-58',315,255,NULL,NULL),(474,'Biodex-200','BIOD-54',298,235,NULL,NULL),(475,'Transcof-835','TRAN-84',94,151,NULL,NULL),(476,'Toughjoyfax-689','TOUG-93',57,226,NULL,NULL),(477,'Bitchip-224','BITC-56',69,168,NULL,NULL),(478,'Lotstring-319','LOTS-88',85,229,NULL,NULL),(479,'Solarbreeze-530','SOLA-40',193,160,NULL,NULL),(480,'Quo Lux-240','QUO -40',254,75,NULL,NULL),(481,'Tresom-234','TRES-23',31,107,NULL,NULL),(482,'Fintone-579','FINT-74',255,42,NULL,NULL),(483,'Tampflex-545','TAMP-76',296,228,NULL,NULL),(484,'Transcof-984','TRAN-89',62,141,NULL,NULL),(485,'Ventosanzap-480','VENT-15',307,278,NULL,NULL),(486,'Span-348','SPAN-39',195,158,NULL,NULL),(487,'Fixflex-280','FIXF-62',90,195,NULL,NULL),(488,'Tempsoft-353','TEMP-11',303,115,NULL,NULL),(489,'Tempsoft-434','TEMP-39',330,123,NULL,NULL),(490,'Voyatouch-241','VOYA-35',145,277,NULL,NULL),(491,'Daltfresh-679','DALT-77',27,197,NULL,NULL),(492,'Fix San-858','FIX -48',167,113,NULL,NULL),(493,'Otcom-755','OTCO-32',166,79,NULL,NULL),(494,'Rank-469','RANK-46',333,130,NULL,NULL),(495,'Flexidy-464','FLEX-32',71,68,NULL,NULL),(496,'Bamity-631','BAMI-56',198,115,NULL,NULL),(497,'Namfix-279','NAMF-25',5,201,NULL,NULL),(498,'Greenlam-766','GREE-28',16,26,NULL,NULL),(499,'Subin-214','SUBI-59',351,109,NULL,NULL),(500,'Y-find-417','Y-FI-11',276,225,NULL,NULL),(501,'Zoolab-690','ZOOL-39',156,169,NULL,NULL),(502,'It-696','IT-6-74',144,211,NULL,NULL),(503,'Job-588','JOB--22',126,168,NULL,NULL),(504,'Biodex-765','BIOD-29',254,33,NULL,NULL),(505,'Duobam-950','DUOB-70',44,137,NULL,NULL),(506,'Tresom-784','TRES-46',131,2,NULL,NULL),(507,'Flowdesk-128','FLOW-70',146,39,NULL,NULL),(508,'Stringtough-774','STRI-34',126,64,NULL,NULL),(509,'Zaam-Dox-913','ZAAM-95',285,136,NULL,NULL),(510,'Fintone-846','FINT-91',205,268,NULL,NULL),(511,'Alphazap-640','ALPH-60',191,269,NULL,NULL),(512,'Temp-375','TEMP-57',217,189,NULL,NULL),(513,'Cookley-796','COOK-19',25,67,NULL,NULL),(514,'Konklux-460','KONK-30',105,36,NULL,NULL),(515,'Domainer-786','DOMA-31',109,104,NULL,NULL),(516,'Pannier-852','PANN-42',335,201,NULL,NULL),(517,'Tempsoft-605','TEMP-76',91,155,NULL,NULL),(518,'Voyatouch-475','VOYA-48',201,221,NULL,NULL),(519,'Veribet-255','VERI-61',155,189,NULL,NULL),(520,'Solarbreeze-475','SOLA-45',309,240,NULL,NULL),(521,'Aerified-798','AERI-33',92,154,NULL,NULL),(522,'Kanlam-514','KANL-19',43,191,NULL,NULL),(523,'Toughjoyfax-398','TOUG-81',341,257,NULL,NULL),(524,'Greenlam-931','GREE-46',331,91,NULL,NULL),(525,'Kanlam-780','KANL-56',70,67,NULL,NULL),(526,'Matsoft-671','MATS-22',142,61,NULL,NULL),(527,'Overhold-207','OVER-82',300,99,NULL,NULL),(528,'Vagram-857','VAGR-10',329,40,NULL,NULL),(529,'Regrant-319','REGR-17',34,240,NULL,NULL),(530,'Zathin-144','ZATH-55',14,116,NULL,NULL),(531,'Flowdesk-648','FLOW-88',160,242,NULL,NULL),(532,'Fixflex-271','FIXF-37',145,141,NULL,NULL),(533,'Matsoft-786','MATS-25',174,16,NULL,NULL),(534,'Transcof-393','TRAN-45',86,218,NULL,NULL),(535,'Hatity-228','HATI-24',232,83,NULL,NULL),(536,'Alpha-916','ALPH-69',100,30,NULL,NULL),(537,'Namfix-210','NAMF-95',153,141,NULL,NULL),(538,'Transcof-905','TRAN-28',256,255,NULL,NULL),(539,'Konklab-751','KONK-68',92,85,NULL,NULL),(540,'Treeflex-633','TREE-43',171,167,NULL,NULL),(541,'Redhold-746','REDH-51',277,244,NULL,NULL),(542,'It-539','IT-5-32',25,145,NULL,NULL),(543,'Lotstring-315','LOTS-45',6,132,NULL,NULL),(544,'Greenlam-935','GREE-35',164,241,NULL,NULL),(545,'Cardify-593','CARD-98',212,109,NULL,NULL),(546,'Bitwolf-108','BITW-51',142,50,NULL,NULL),(547,'Bamity-699','BAMI-43',241,251,NULL,NULL),(548,'Opela-278','OPEL-38',120,120,NULL,NULL),(549,'Tres-Zap-410','TRES-88',248,106,NULL,NULL),(550,'Regrant-111','REGR-46',52,10,NULL,NULL),(551,'Bamity-628','BAMI-92',100,55,NULL,NULL),(552,'Kanlam-993','KANL-10',125,102,NULL,NULL),(553,'Trippledex-689','TRIP-83',177,147,NULL,NULL),(554,'Redhold-200','REDH-50',251,48,NULL,NULL),(555,'Temp-837','TEMP-47',283,215,NULL,NULL),(556,'Pannier-642','PANN-14',162,45,NULL,NULL),(557,'Flexidy-373','FLEX-64',98,72,NULL,NULL),(558,'Stronghold-195','STRO-55',185,82,NULL,NULL),(559,'Aerified-240','AERI-71',163,193,NULL,NULL),(560,'Flexidy-332','FLEX-90',131,249,NULL,NULL),(561,'Zaam-Dox-356','ZAAM-21',174,15,NULL,NULL),(562,'Stringtough-392','STRI-89',163,94,NULL,NULL),(563,'Job-301','JOB--14',215,128,NULL,NULL),(564,'Sub-Ex-720','SUB--34',319,99,NULL,NULL),(565,'Bigtax-726','BIGT-52',242,182,NULL,NULL),(566,'Flexidy-870','FLEX-80',291,106,NULL,NULL),(567,'Y-Solowarm-548','Y-SO-99',253,85,NULL,NULL),(568,'Bitchip-821','BITC-48',272,102,NULL,NULL),(569,'Biodex-976','BIOD-44',97,176,NULL,NULL),(570,'Zontrax-350','ZONT-87',204,138,NULL,NULL),(571,'It-639','IT-6-91',165,120,NULL,NULL),(572,'Pannier-295','PANN-74',6,258,NULL,NULL),(573,'Konklab-449','KONK-74',39,42,NULL,NULL),(574,'Bytecard-451','BYTE-62',7,1,NULL,NULL),(575,'Mat Lam Tam-558','MAT -43',153,224,NULL,NULL),(576,'Holdlamis-150','HOLD-83',64,79,NULL,NULL),(577,'Greenlam-219','GREE-43',280,87,NULL,NULL),(578,'Stim-887','STIM-53',286,15,NULL,NULL),(579,'Opela-952','OPEL-95',171,156,NULL,NULL),(580,'Wrapsafe-851','WRAP-17',255,236,NULL,NULL),(581,'Alpha-997','ALPH-36',294,180,NULL,NULL),(582,'Stim-523','STIM-55',271,236,NULL,NULL),(583,'Stronghold-535','STRO-15',311,179,NULL,NULL),(584,'Y-Solowarm-498','Y-SO-48',265,149,NULL,NULL),(585,'Toughjoyfax-486','TOUG-72',261,46,NULL,NULL),(586,'Ronstring-792','RONS-43',7,265,NULL,NULL),(587,'Tempsoft-223','TEMP-90',50,61,NULL,NULL),(588,'Lotstring-184','LOTS-19',297,38,NULL,NULL),(589,'Aerified-619','AERI-27',201,213,NULL,NULL),(590,'Aerified-504','AERI-65',97,263,NULL,NULL),(591,'Bitchip-945','BITC-40',273,21,NULL,NULL),(592,'Home Ing-476','HOME-26',262,184,NULL,NULL),(593,'Regrant-554','REGR-76',72,11,NULL,NULL),(594,'Kanlam-496','KANL-66',34,95,NULL,NULL),(595,'Flowdesk-636','FLOW-62',79,4,NULL,NULL),(596,'Zamit-751','ZAMI-14',187,138,NULL,NULL),(597,'Tempsoft-111','TEMP-10',168,223,NULL,NULL),(598,'Cardguard-529','CARD-82',352,38,NULL,NULL),(599,'Fintone-765','FINT-15',21,278,NULL,NULL),(600,'Ventosanzap-965','VENT-70',202,2,NULL,NULL),(601,'Documento 1','DOC1',361,47,NULL,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_empresas`
--

LOCK TABLES `gdoks_empresas` WRITE;
/*!40000 ALTER TABLE `gdoks_empresas` DISABLE KEYS */;
INSERT INTO `gdoks_empresas` VALUES (1,'Faraday');
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
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_especialistas`
--

LOCK TABLES `gdoks_especialistas` WRITE;
/*!40000 ALTER TABLE `gdoks_especialistas` DISABLE KEYS */;
INSERT INTO `gdoks_especialistas` VALUES (62,1,1),(52,1,2),(60,1,3),(67,1,4),(23,1,6),(2,1,9),(16,1,10),(14,1,11),(57,1,15),(66,2,4),(36,2,8),(26,2,14),(61,3,1),(32,3,12),(46,3,13),(56,3,15),(59,4,3),(63,4,4),(1,4,10),(40,4,13),(8,5,7),(12,5,10),(10,5,13),(5,6,10),(20,6,12),(7,7,5),(3,7,7),(30,7,12),(43,7,13),(53,7,15),(51,8,2),(65,8,4),(28,8,10),(58,9,3),(44,9,9),(33,9,10),(19,9,12),(55,9,15),(64,10,4),(9,10,5),(29,10,11),(35,10,13),(6,10,14),(54,10,15);
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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_grds`
--

LOCK TABLES `gdoks_grds` WRITE;
/*!40000 ALTER TABLE `gdoks_grds` DISABLE KEYS */;
INSERT INTO `gdoks_grds` VALUES (1,11,'FRY-84852.16065-FF',NULL,'2017-06-17 01:24:15',NULL),(2,35,'FRY-86284.18140-FE','phasellus in felis donec semper','2017-05-08 06:13:03',NULL),(3,49,'FRY-34097.90416-GF','ut tellus nulla','2016-12-17 22:14:16',NULL),(4,27,'FRY-41521.14417-FG',NULL,'2017-04-12 08:04:29',NULL),(5,27,'FRY-85719.72446-FF',NULL,'2017-03-24 08:07:32',NULL),(6,26,'FRY-20215.20214-GE','posuere cubilia curae mauris','2016-08-27 06:11:41',NULL),(7,45,'FRY-58342.43612-GG','in quam fringilla rhoncus mauris','2016-11-29 17:18:57',NULL),(8,49,'FRY-68140.81781-DA',NULL,'2016-10-14 14:22:07',NULL),(9,16,'FRY-99438.97005-GG','mauris','2017-02-03 12:25:35',NULL),(10,45,'FRY-41544.89923-GG','nulla facilisi cras non velit','2016-06-30 22:24:20','2017-01-23 10:40:01'),(11,24,'FRY-19183.01144-GG','tincidunt nulla','2017-01-16 17:13:50',NULL),(12,26,'FRY-44679.66966-EG',NULL,'2016-10-11 06:43:06','2016-08-19 20:22:11'),(13,27,'FRY-85576.38352-GG','platea dictumst','2016-08-06 04:35:18',NULL),(14,45,'FRY-25948.95166-FG',NULL,'2016-08-20 11:15:25',NULL),(15,16,'FRY-89667.82327-FF',NULL,'2016-12-31 19:33:57',NULL),(16,49,'FRY-67789.45453-GG',NULL,'2016-10-30 05:14:21',NULL),(17,49,'FRY-79405.12863-GG',NULL,'2017-04-25 01:17:07','2016-10-25 06:09:17'),(18,35,'FRY-80644.91673-GC',NULL,'2017-04-01 18:05:15',NULL),(19,26,'FRY-13498.21434-EG','proin risus','2017-02-25 20:45:53','2016-07-26 12:51:20'),(20,26,'FRY-51820.65430-GE',NULL,'2016-09-20 00:45:45',NULL),(21,35,'FRY-50660.30062-FG','quam fringilla rhoncus mauris enim','2016-12-22 04:15:54',NULL),(22,54,'FRY-33095.67280-GG','volutpat dui maecenas','2016-11-05 00:08:23',NULL),(23,16,'FRY-65831.36681-GF','sapien ut','2017-02-24 00:02:33',NULL),(24,45,'FRY-31224.14092-CG','morbi odio','2016-09-08 05:51:22',NULL),(25,16,'FRY-70376.71170-EG','pharetra magna vestibulum aliquet','2017-02-24 15:56:40','2016-07-30 09:24:43'),(26,11,'FRY-36215.02752-GG','pellentesque ultrices mattis odio donec','2017-02-17 06:26:54',NULL),(27,26,'FRY-57212.51824-GG','mus etiam vel augue vestibulum','2016-10-15 10:07:34',NULL),(28,24,'FRY-23839.73622-GG',NULL,'2017-04-20 04:32:01',NULL),(29,35,'FRY-73775.06801-FG','in purus','2017-04-21 19:24:25','2017-05-23 21:07:22'),(30,35,'FRY-65567.13607-GF','quisque','2016-09-03 13:11:13',NULL),(31,49,'FRY-39888.28793-GG','hac habitasse platea','2016-10-06 20:15:34',NULL),(32,49,'FRY-84913.19877-FG',NULL,'2016-12-12 03:08:56',NULL),(33,24,'FRY-40542.83170-GG','accumsan','2017-03-19 17:27:48',NULL),(34,54,'FRY-33938.09558-EF',NULL,'2016-12-05 00:02:25',NULL),(35,11,'FRY-83784.22584-GF','justo sollicitudin','2017-05-18 18:32:10',NULL),(36,49,'FRY-40465.07468-GA','eget semper rutrum nulla nunc','2016-12-31 13:37:09',NULL),(37,11,'FRY-19432.79248-FD',NULL,'2017-05-05 11:58:29','2016-10-06 04:22:40'),(38,35,'FRY-49305.32029-FG','dictumst aliquam augue','2017-03-05 08:48:05',NULL),(39,16,'FRY-46253.09098-GG','aliquam sit','2016-12-16 04:20:50',NULL),(40,26,'FRY-80354.47562-GG','turpis a pede','2016-07-18 14:04:54',NULL),(41,27,'FRY-18772.96699-EG','faucibus cursus urna ut tellus','2016-11-08 18:17:01',NULL),(42,45,'FRY-11467.66716-ED','ullamcorper','2016-11-13 08:32:50',NULL),(43,26,'FRY-63005.99982-GF',NULL,'2017-06-14 07:43:27',NULL),(44,54,'FRY-18538.64083-CG',NULL,'2016-09-04 18:19:20','2017-05-30 06:17:30'),(45,26,'FRY-73346.87904-FF','ut massa','2017-04-06 07:28:16',NULL),(46,16,'FRY-57551.95762-GE',NULL,'2016-12-03 01:51:41',NULL),(47,11,'FRY-91743.38003-GE',NULL,'2017-05-17 20:40:06',NULL),(48,54,'FRY-29440.39313-GF',NULL,'2017-02-01 20:20:30','2016-11-11 02:36:53'),(49,16,'FRY-66486.88102-GF',NULL,'2017-01-06 00:36:59',NULL),(50,49,'FRY-82320.86824-GG',NULL,'2016-07-15 18:55:55','2016-09-05 22:57:37'),(51,45,'FRY-49982.43286-GF','nunc donec quis','2017-06-09 15:38:25',NULL),(52,35,'FRY-79685.47070-GG','duis bibendum','2016-12-25 21:36:11',NULL),(53,45,'FRY-82914.86642-EG','sed interdum venenatis turpis','2017-02-21 08:24:35',NULL),(54,11,'FRY-38554.49252-FG','interdum','2017-06-12 09:06:16',NULL),(55,35,'FRY-12345.12345','teste','2017-06-26 14:55:59',NULL),(56,10,'NDR-1111-1111','teste','2017-06-27 09:52:47',NULL),(57,61,'NDV-0001-0001','Primeira GRD','2017-06-27 10:04:43',NULL),(58,61,'NDV-0002-0001','Segunda GRD','2017-06-27 10:13:40',NULL);
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
  UNIQUE KEY `UQ_id_grd_x_id_rev` (`id_revisao`,`id_grd`),
  KEY `FK_grd_revisoes_x_id_revisoes_idx` (`id_revisao`),
  KEY `FK_grd_grd_x_id_grd_idx` (`id_grd`),
  KEY `FK_grd_x_rev_id_codEMI_idx` (`id_codEMI`),
  KEY `FK_grd_x_rev_id_tipo_idx` (`id_tipo`),
  CONSTRAINT `FK_grd_grd_x_id_grd` FOREIGN KEY (`id_grd`) REFERENCES `gdoks_grds` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_grd_revisoes_x_id_revisoes` FOREIGN KEY (`id_revisao`) REFERENCES `gdoks_revisoes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_grd_x_rev_id_codEMI` FOREIGN KEY (`id_codEMI`) REFERENCES `gdoks_codigos_emi` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_grd_x_rev_id_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `gdoks_tipos_de_doc` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_grds_x_revisoes`
--

LOCK TABLES `gdoks_grds_x_revisoes` WRITE;
/*!40000 ALTER TABLE `gdoks_grds_x_revisoes` DISABLE KEYS */;
INSERT INTO `gdoks_grds_x_revisoes` VALUES (11,30,17,15,1,1,1),(28,32,35,1,2,9,3),(30,36,35,7,1,7,2),(41,3,37,16,2,10,4),(49,25,4,11,1,3,1),(64,35,20,10,1,9,3),(66,11,7,13,2,1,2),(75,8,29,14,1,6,3),(80,32,29,9,1,3,3),(86,26,26,8,2,2,1),(90,35,10,7,1,8,3),(91,47,20,15,2,6,1),(98,35,26,14,1,10,4),(102,21,17,1,1,6,3),(103,31,35,12,1,5,3),(109,29,17,14,1,2,4),(129,4,45,5,1,10,1),(130,44,39,8,1,6,2),(136,50,35,9,2,4,4),(138,14,31,7,2,2,4),(139,2,17,15,2,3,1),(149,43,27,8,1,3,4),(166,41,45,5,2,4,2),(172,54,20,12,1,2,2),(192,47,26,10,2,10,4),(199,34,39,1,1,5,4),(203,17,35,1,2,4,2),(206,39,4,8,1,1,3),(208,16,29,14,2,10,4),(217,7,31,11,1,1,3),(233,53,31,10,2,8,3),(235,26,20,8,2,4,3),(260,50,37,6,1,9,3),(266,8,37,15,1,5,3),(267,12,27,13,2,10,4),(291,10,31,15,1,9,3),(293,16,35,8,2,1,4),(300,36,29,11,2,1,2),(302,17,37,13,1,3,1),(339,15,4,8,1,5,3),(347,1,20,1,1,3,2),(362,52,17,10,2,4,4),(366,19,27,14,2,2,1),(372,24,31,4,2,8,1),(373,38,17,5,1,3,4),(387,49,4,6,1,7,3),(439,3,35,16,2,10,1),(487,16,37,4,2,10,2),(494,37,10,15,1,4,2),(505,54,26,10,1,6,1),(506,32,37,9,1,4,4),(529,8,35,1,2,8,4),(535,45,27,5,1,5,2),(543,23,4,8,2,5,3),(555,37,20,1,2,10,4),(573,33,7,13,1,6,3),(647,26,10,9,2,1,3),(661,1,10,15,2,8,1),(669,27,27,6,1,4,1),(674,3,29,7,1,6,1),(690,31,37,11,1,4,1),(751,31,29,7,1,1,4),(775,48,39,16,1,5,4),(783,1,26,16,2,8,4),(802,5,45,15,1,2,3),(851,36,37,6,1,8,1),(855,47,10,4,1,6,1),(895,51,31,12,2,9,1),(980,18,17,16,1,2,4),(1001,58,601,2,1,3,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_hhemdocs`
--

LOCK TABLES `gdoks_hhemdocs` WRITE;
/*!40000 ALTER TABLE `gdoks_hhemdocs` DISABLE KEYS */;
INSERT INTO `gdoks_hhemdocs` VALUES (1,601,2,10);
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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_log`
--

LOCK TABLES `gdoks_log` WRITE;
/*!40000 ALTER TABLE `gdoks_log` DISABLE KEYS */;
INSERT INTO `gdoks_log` VALUES (1,1,1,NULL,'2017-06-25 01:33:17'),(2,1,1,NULL,'2017-06-25 08:50:04'),(3,1,1,NULL,'2017-06-25 09:19:48'),(4,1,1,NULL,'2017-06-25 09:25:54'),(5,1,1,NULL,'2017-06-25 09:34:44'),(6,1,1,NULL,'2017-06-25 09:39:00'),(7,1,1,NULL,'2017-06-25 09:43:28'),(8,1,1,NULL,'2017-06-25 11:56:43'),(9,1,1,NULL,'2017-06-25 14:26:28'),(10,1,1,NULL,'2017-06-25 17:35:02'),(11,1,37,'2,[8|1]','2017-06-25 17:36:53'),(12,1,37,'15,[7|10|9|3|1]','2017-06-25 17:37:15'),(13,1,37,'3,[9|4|1]','2017-06-25 17:37:30'),(14,1,37,'1,[3|1]','2017-06-25 17:37:53'),(15,1,37,'4,[4|10|8|2|1]','2017-06-25 17:38:09'),(16,1,39,'292,82','2017-06-25 17:40:21'),(17,1,39,'292,83','2017-06-25 17:41:16'),(18,1,39,'292,84','2017-06-25 17:42:03'),(19,1,1,NULL,'2017-06-26 06:00:12'),(20,1,1,NULL,'2017-06-26 08:04:12'),(21,1,1,NULL,'2017-06-26 12:03:03'),(22,1,40,'55,FRY-12345.12345,20','2017-06-26 14:36:57'),(23,1,42,'55,FRY-12345.12345,20','2017-06-26 14:52:28'),(24,1,42,'55,FRY-12345.12345,35','2017-06-26 14:53:16'),(25,1,42,'55,FRY-12345.12345,35','2017-06-26 14:55:59'),(26,1,1,NULL,'2017-06-26 17:04:16'),(27,1,1,NULL,'2017-06-27 05:48:33'),(28,1,1,NULL,'2017-06-27 05:50:32'),(29,1,1,NULL,'2017-06-27 09:52:05'),(30,1,40,'56,NDR-1111-1111,10','2017-06-27 09:52:48'),(31,1,39,'208,85','2017-06-27 09:53:41'),(32,1,38,'10,[3|1]','2017-06-27 09:54:12'),(33,1,39,'68,86','2017-06-27 09:55:56'),(34,1,38,'2,[2|1]','2017-06-27 09:56:18'),(35,1,17,'0,Projeto 1,PRJ-1,5,1,2017-06-27T13:02:18.943Z,2017-08-31T03:00:00.000Z,1','2017-06-27 10:02:38'),(36,1,18,'0,Área 1,A1,61','2017-06-27 10:02:48'),(37,1,18,'0,Área 2,A2,61','2017-06-27 10:02:56'),(38,1,35,'0,A11,A11,181','2017-06-27 10:03:11'),(39,1,24,'0,Documento 1,DOC1,2017-06-21,61,47,361','2017-06-27 10:04:01'),(40,1,40,'57,NDV-0001-0001,61','2017-06-27 10:04:43'),(41,1,40,'58,NDV-0002-0001,61','2017-06-27 10:13:40'),(42,1,39,'601,87','2017-06-27 10:14:32'),(43,1,41,'58','2017-06-27 10:15:19'),(44,1,1,NULL,'2017-06-28 14:48:24'),(45,1,3,'Sérgio Moura,sergiomoura@faraday.com.br,sergio2,1','2017-06-28 15:05:19'),(46,1,3,'Sérgio Moura,sergiomoura@faraday.com.br,sergio,1','2017-06-28 15:05:25'),(47,1,1,NULL,'2017-06-28 20:22:35'),(48,1,1,NULL,'2017-06-28 21:40:25'),(49,1,1,NULL,'2017-06-28 23:40:29'),(50,1,1,NULL,'2017-06-28 23:40:49'),(51,1,1,NULL,'2017-06-28 23:55:18'),(52,1,1,NULL,'2017-06-28 23:56:01'),(53,1,1,NULL,'2017-06-29 00:38:31'),(54,1,1,NULL,'2017-06-29 00:39:37'),(55,1,1,NULL,'2017-06-29 00:41:02'),(56,1,1,NULL,'2017-06-29 02:11:07'),(57,1,1,NULL,'2017-06-29 02:11:39'),(58,1,1,NULL,'2017-06-29 02:12:30'),(59,1,1,NULL,'2017-06-29 02:41:08'),(60,1,1,NULL,'2017-06-29 02:43:25'),(61,1,1,NULL,'2017-06-29 02:45:17'),(62,1,1,NULL,'2017-06-29 02:46:12'),(63,1,1,NULL,'2017-06-29 06:40:15'),(64,1,1,NULL,'2017-06-29 06:45:15'),(65,1,1,NULL,'2017-06-29 09:08:57'),(66,1,1,NULL,'2017-06-29 09:14:38'),(67,1,1,NULL,'2017-06-29 09:29:05'),(68,1,1,NULL,'2017-06-29 10:23:37'),(69,1,1,NULL,'2017-06-29 10:29:29'),(70,1,1,NULL,'2017-06-29 10:29:36'),(71,1,1,NULL,'2017-06-29 10:31:29'),(72,1,1,NULL,'2017-06-29 10:45:45'),(73,1,1,NULL,'2017-06-29 11:57:15'),(74,1,1,NULL,'2017-06-29 11:57:28'),(75,1,1,NULL,'2017-06-29 12:08:40'),(76,1,1,NULL,'2017-06-29 12:08:51'),(77,1,1,NULL,'2017-06-29 13:10:19'),(78,1,1,NULL,'2017-06-29 13:33:21'),(79,1,1,NULL,'2017-06-29 13:33:26'),(80,1,1,NULL,'2017-06-29 13:45:38'),(81,1,1,NULL,'2017-06-29 14:19:41'),(82,1,1,NULL,'2017-06-29 15:21:13'),(83,1,1,NULL,'2017-06-29 15:36:55'),(84,1,1,NULL,'2017-06-29 15:40:03'),(85,1,1,NULL,'2017-06-29 15:44:09'),(86,1,1,NULL,'2017-06-29 15:44:15'),(87,1,1,NULL,'2017-06-29 15:44:32'),(88,1,1,NULL,'2017-06-29 15:53:29'),(89,1,1,NULL,'2017-06-29 15:53:35'),(90,1,1,NULL,'2017-06-29 15:59:37'),(91,1,1,NULL,'2017-06-29 16:15:38'),(92,1,1,NULL,'2017-06-29 16:15:42'),(93,1,1,NULL,'2017-06-29 16:15:47'),(94,1,1,NULL,'2017-06-29 16:16:14'),(95,1,1,NULL,'2017-06-29 16:19:04'),(96,1,1,NULL,'2017-06-29 16:28:33'),(97,1,1,NULL,'2017-06-29 16:28:50'),(98,1,1,NULL,'2017-06-29 16:29:24'),(99,1,1,NULL,'2017-06-29 16:45:47'),(100,1,1,NULL,'2017-06-29 19:09:40'),(101,1,1,NULL,'2017-06-29 19:40:32'),(102,1,1,NULL,'2017-06-29 19:41:45'),(103,1,1,NULL,'2017-06-29 19:41:49'),(104,1,1,NULL,'2017-06-29 19:50:47'),(105,1,1,NULL,'2017-06-29 19:57:30'),(106,1,1,NULL,'2017-06-29 19:58:07'),(107,1,1,NULL,'2017-06-30 03:45:48'),(108,1,1,NULL,'2017-06-30 04:07:10'),(109,1,1,NULL,'2017-06-30 04:08:57'),(110,1,1,NULL,'2017-06-30 04:09:26'),(111,1,1,NULL,'2017-06-30 04:14:15'),(112,1,1,NULL,'2017-06-30 04:14:20'),(113,1,1,NULL,'2017-06-30 04:29:18'),(114,1,1,NULL,'2017-06-30 04:33:37'),(115,1,1,NULL,'2017-06-30 09:29:28');
/*!40000 ALTER TABLE `gdoks_log` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_pdas`
--

LOCK TABLES `gdoks_pdas` WRITE;
/*!40000 ALTER TABLE `gdoks_pdas` DISABLE KEYS */;
INSERT INTO `gdoks_pdas` VALUES (1,46,50,1,'2017-01-26 08:23:49',10,'2017-01-21 08:23:49','dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel'),(2,67,20,1,'2017-06-24 23:38:36',8,'2017-03-25 13:52:37',NULL),(3,67,43,5,'2017-06-03 11:27:21',10,'2017-06-03 11:27:21','cras mi pede malesuada in imperdiet et commodo vulputate justo in'),(4,51,7,9,'2017-04-28 02:04:39',10,'2017-04-28 02:04:39',NULL),(5,100,20,1,'2016-07-23 12:53:44',8,'2016-07-19 12:53:44','aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis'),(6,52,10,1,'2016-10-29 11:07:43',7,'2016-10-27 11:07:43','fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse'),(7,52,35,5,'2017-03-29 04:59:39',10,'2017-03-28 04:59:39',NULL),(8,70,37,9,'2017-03-02 23:37:29',4,'2017-02-25 23:37:29',NULL),(9,48,17,3,'2017-06-24 23:38:36',10,'2016-09-21 23:18:08','dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent'),(10,54,29,3,'2017-06-24 23:38:37',3,'2017-03-13 07:12:33','semper rutrum nulla nunc purus phasellus in felis donec'),(11,100,20,9,'2017-06-24 23:38:36',8,'2017-02-17 01:55:53',NULL),(12,100,10,10,'2017-06-24 23:38:36',9,'2017-01-02 19:56:47',NULL),(13,100,37,9,'2017-06-24 23:38:37',9,'2016-08-14 20:14:34',NULL),(14,70,3,NULL,NULL,3,'2016-12-29 23:28:35','augue aliquam erat volutpat in congue etiam justo'),(15,100,10,10,'2016-12-10 06:01:18',7,'2016-12-05 06:01:18',NULL),(16,61,22,9,'2016-09-23 18:44:33',10,'2016-09-22 18:44:33','purus eu magna vulputate luctus cum'),(17,100,17,3,'2016-08-15 19:30:51',8,'2016-08-14 19:30:51',NULL),(18,63,27,3,'2017-06-24 23:38:37',2,'2017-01-01 20:41:18',NULL),(19,100,29,3,'2016-11-02 05:12:38',3,'2016-11-01 05:12:38',NULL),(20,100,20,9,'2017-05-19 16:33:15',8,'2017-05-16 16:33:15','rhoncus dui vel sem sed sagittis nam congue risus semper porta'),(21,99,35,1,'2017-06-23 08:47:58',2,'2017-06-21 08:47:58','semper sapien a libero nam dui proin leo odio porttitor'),(22,100,10,4,'2017-06-24 23:38:36',10,'2016-11-23 01:22:06','nulla nunc purus phasellus in felis donec semper sapien'),(23,100,7,9,'2017-06-24 23:38:36',10,'2017-05-02 02:27:40',NULL),(24,40,4,1,'2017-06-24 23:38:36',8,'2016-12-13 11:31:57','in porttitor pede justo eu'),(25,89,4,1,'2016-07-05 02:46:11',4,'2016-07-01 02:46:11','nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula'),(26,100,10,4,'2016-10-10 18:24:36',3,'2016-10-10 18:24:36',NULL),(27,61,14,NULL,NULL,9,'2017-02-24 18:17:11','lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta'),(28,100,10,3,'2017-06-24 23:38:36',10,'2017-04-10 16:48:14','id pretium iaculis diam erat fermentum'),(29,100,7,9,'2016-10-07 11:51:53',2,'2016-10-02 11:51:53','nulla nunc purus phasellus in felis donec semper sapien a libero'),(30,100,4,3,'2017-06-24 23:38:36',8,'2017-06-02 15:33:35','erat fermentum justo nec condimentum neque sapien placerat'),(31,55,44,NULL,NULL,9,'2016-12-05 06:08:17','amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum'),(32,100,10,3,'2017-05-12 12:50:04',7,'2017-05-12 12:50:04','fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl'),(33,100,35,5,'2017-06-24 23:38:37',2,'2017-06-11 05:07:56','sociis natoque penatibus et magnis dis parturient montes'),(34,66,2,NULL,NULL,3,'2016-11-04 13:47:42','nascetur ridiculus mus vivamus vestibulum sagittis sapien cum'),(35,48,48,NULL,NULL,7,'2016-09-28 22:50:10','at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices'),(36,100,10,2,'2016-12-29 19:14:20',3,'2016-12-27 19:14:20',NULL),(37,40,8,NULL,NULL,2,'2016-09-28 02:30:42','arcu adipiscing molestie hendrerit at vulputate vitae'),(38,97,50,NULL,NULL,8,'2017-03-23 13:21:39',NULL),(39,100,10,NULL,NULL,3,'2017-05-31 21:24:23','quam pharetra magna ac consequat metus sapien'),(40,42,21,NULL,NULL,4,'2016-08-28 13:05:29','justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia'),(41,69,11,1,'2017-05-13 00:52:12',10,'2017-05-09 00:52:12','lobortis ligula sit amet'),(42,53,15,NULL,NULL,7,'2016-09-27 16:40:15',NULL),(43,100,20,NULL,NULL,8,'2017-01-09 19:13:39','eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat'),(44,53,28,NULL,NULL,8,'2017-06-01 08:11:27',NULL),(45,62,23,NULL,NULL,10,'2017-05-18 09:48:22','volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque'),(46,56,39,2,'2017-06-24 23:38:37',10,'2017-02-23 05:56:07','sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus'),(47,63,31,3,'2017-06-24 23:38:37',10,'2016-09-09 03:53:47',NULL),(48,99,39,2,'2017-02-18 01:30:53',10,'2017-02-17 01:30:53','velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum'),(49,44,13,NULL,NULL,10,'2016-11-29 13:24:50','nisl nunc rhoncus dui vel sem sed'),(50,100,37,9,'2016-10-03 13:43:47',9,'2016-09-29 13:43:47',NULL),(51,50,1,NULL,NULL,10,'2017-01-12 05:32:34',NULL),(52,52,18,NULL,NULL,9,'2016-08-06 19:07:22','dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam'),(53,70,46,NULL,NULL,7,'2017-03-31 10:35:42','ipsum dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum'),(54,68,26,4,'2017-06-24 23:38:37',3,'2017-06-08 08:30:57',NULL),(55,60,30,NULL,NULL,2,'2017-06-15 03:21:09','posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed'),(56,100,31,3,'2017-06-21 13:58:17',10,'2017-06-18 13:58:17','ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices'),(57,67,45,3,'2017-06-24 23:38:37',2,'2016-12-17 22:01:01',NULL),(58,100,17,NULL,NULL,4,'2017-05-29 20:02:13',NULL),(59,62,41,NULL,NULL,1,'2016-07-18 02:44:09',NULL),(60,100,39,7,'2017-06-24 23:38:37',7,'2017-01-05 21:45:13',NULL),(61,55,33,1,'2016-12-29 02:33:31',1,'2016-12-25 02:33:31','purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in'),(62,100,35,5,'2016-08-01 11:38:11',2,'2016-07-31 11:38:11','commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor'),(63,100,37,NULL,NULL,9,'2016-06-25 11:55:41','nibh in lectus pellentesque at nulla suspendisse potenti cras in purus'),(64,100,45,3,'2017-06-10 23:02:04',4,'2017-06-10 23:02:04','cras in purus eu magna vulputate'),(65,100,11,NULL,NULL,2,'2016-11-25 17:21:31','cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices'),(66,100,27,3,'2017-06-11 02:19:52',4,'2017-06-09 02:19:52','erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac'),(67,59,40,NULL,NULL,4,'2016-11-19 09:22:41',NULL),(68,59,47,NULL,NULL,3,'2017-06-23 03:50:37',NULL),(69,70,24,NULL,NULL,6,'2017-01-15 23:28:12',NULL),(70,45,12,NULL,NULL,9,'2016-08-30 13:11:09','augue vel accumsan tellus nisi eu orci mauris lacinia sapien'),(71,100,31,NULL,NULL,10,'2016-08-30 05:34:31',NULL),(72,54,36,NULL,NULL,7,'2016-11-25 16:03:21',NULL),(73,100,39,7,'2016-09-08 01:06:31',3,'2016-09-06 01:06:31','aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan'),(74,100,7,NULL,NULL,4,'2017-01-23 20:49:48',NULL),(75,100,45,3,'2017-03-09 10:42:08',10,'2017-03-06 10:42:08','accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae'),(76,100,43,NULL,NULL,2,'2017-03-09 11:08:44','sem sed sagittis'),(77,100,22,NULL,NULL,10,'2017-01-13 05:00:01',NULL),(78,100,4,3,'2017-06-14 01:56:53',10,'2017-06-10 01:56:53',NULL),(79,100,35,NULL,NULL,10,'2017-04-06 09:00:09',NULL),(80,100,26,4,'2016-12-05 09:09:06',9,'2016-12-02 09:09:06','ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar'),(81,43,49,NULL,NULL,8,'2017-03-12 15:07:07','orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis'),(82,50,292,1,'2017-06-25 17:40:30',1,'2017-06-25 17:40:20','teste'),(83,95,292,1,'2017-06-25 17:41:34',1,'2017-06-25 17:41:16','asd'),(84,100,292,1,'2017-06-25 17:42:07',1,'2017-06-25 17:42:02','sdfsdfs'),(85,100,208,1,'2017-06-27 09:54:27',1,'2017-06-27 09:53:40','Atualização Total'),(86,100,68,1,'2017-06-27 09:56:38',1,'2017-06-27 09:55:56','Primeira Atualização'),(87,100,601,1,'2017-06-27 10:14:34',1,'2017-06-27 10:14:31','asd');
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
) ENGINE=InnoDB AUTO_INCREMENT=1270 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_pdas_x_arquivos`
--

LOCK TABLES `gdoks_pdas_x_arquivos` WRITE;
/*!40000 ALTER TABLE `gdoks_pdas_x_arquivos` DISABLE KEYS */;
INSERT INTO `gdoks_pdas_x_arquivos` VALUES (1215,1,35),(897,1,47),(938,1,102),(859,1,105),(1012,1,175),(1041,2,23),(1239,2,30),(1054,2,33),(891,2,38),(1102,2,193),(1256,3,21),(973,3,109),(1034,4,32),(892,4,42),(874,4,50),(1014,4,63),(885,4,161),(940,5,34),(1259,5,63),(937,5,132),(1156,5,136),(1258,5,137),(1130,6,18),(989,6,78),(968,7,97),(1135,7,119),(941,7,178),(1210,7,184),(964,8,3),(902,8,72),(1187,8,84),(1040,8,129),(1136,8,131),(928,8,143),(854,9,44),(896,9,150),(991,9,152),(879,10,26),(869,10,58),(1057,10,85),(1169,10,113),(899,10,197),(1009,11,105),(860,11,116),(1022,11,118),(1231,11,192),(1172,11,195),(1094,12,38),(1032,12,58),(1087,12,62),(1027,12,93),(903,12,109),(1181,12,140),(883,12,175),(1004,13,52),(1206,13,78),(977,13,100),(1249,13,197),(921,14,57),(997,14,60),(861,14,77),(1222,14,87),(1024,14,101),(1123,14,111),(913,14,121),(1052,14,124),(1120,15,61),(946,15,134),(1182,15,145),(1180,16,190),(1125,16,193),(864,17,77),(951,17,91),(1199,17,111),(1262,17,131),(1242,17,132),(1062,17,137),(1203,17,159),(993,18,18),(1132,18,84),(845,18,181),(867,18,186),(849,18,189),(976,19,9),(1006,19,191),(1179,19,200),(984,20,1),(942,20,21),(1230,20,22),(1208,20,24),(1245,20,69),(1070,20,70),(961,20,84),(866,20,87),(1086,20,88),(1137,20,100),(910,20,132),(1221,21,29),(988,21,79),(909,21,93),(1085,22,80),(895,22,87),(1227,22,102),(956,22,153),(1073,23,34),(889,23,127),(972,24,51),(1141,24,120),(1083,24,165),(981,24,177),(982,25,41),(1129,25,116),(1193,25,146),(1026,25,180),(1212,25,191),(1177,26,27),(1126,26,29),(1124,26,50),(919,26,83),(1240,26,129),(898,26,157),(1020,26,163),(852,26,166),(950,27,9),(1080,27,72),(952,27,110),(863,27,149),(1088,27,183),(980,28,82),(1173,28,102),(990,28,117),(1178,29,20),(1119,29,74),(1139,29,105),(1142,29,191),(1254,29,197),(1109,30,11),(1176,30,14),(856,30,69),(1229,30,79),(850,30,162),(1060,31,30),(1189,31,59),(1201,31,94),(1248,31,133),(1228,32,28),(1075,32,42),(875,32,87),(1064,32,89),(1154,32,120),(1238,32,131),(1117,32,134),(1037,32,135),(1143,32,192),(949,33,56),(917,33,78),(1223,33,120),(1023,33,149),(925,33,175),(1042,33,197),(1234,34,24),(1010,34,31),(890,34,41),(1063,34,44),(958,34,60),(1018,34,91),(1150,35,113),(1200,35,134),(877,35,196),(912,36,113),(1233,37,39),(1131,37,60),(1097,37,103),(1197,37,134),(878,37,189),(911,37,195),(1211,37,199),(1036,38,15),(1146,38,36),(884,38,57),(1065,38,91),(935,38,107),(960,38,114),(1243,38,164),(1050,39,61),(1149,39,71),(1198,40,5),(1209,40,48),(1241,40,79),(1190,40,89),(1112,40,90),(1134,40,139),(1252,40,162),(1011,40,183),(848,41,7),(1250,41,8),(1096,41,52),(959,41,61),(1013,41,78),(996,41,81),(1092,41,100),(965,41,129),(1188,41,133),(1015,41,163),(1263,41,181),(1021,42,3),(924,42,50),(1186,42,79),(876,42,126),(1029,43,49),(1079,43,55),(918,43,84),(1158,43,88),(1044,43,147),(1078,44,28),(1115,44,113),(931,45,10),(862,45,19),(1204,45,35),(986,45,78),(1100,45,100),(1095,45,146),(888,46,25),(936,46,82),(1019,46,128),(858,46,135),(1157,46,138),(978,47,24),(857,47,26),(1257,47,53),(1030,47,149),(1116,48,61),(1140,48,100),(1106,48,114),(1043,48,119),(908,48,132),(979,48,151),(1246,48,173),(1067,48,175),(1195,48,178),(1218,49,23),(987,49,34),(1145,49,39),(1167,49,93),(1090,49,127),(1162,49,146),(1166,49,198),(1251,49,199),(1038,50,17),(1253,50,49),(1165,50,91),(962,50,126),(1025,51,7),(1133,51,25),(1103,51,105),(923,51,174),(930,52,137),(944,53,2),(985,53,20),(1113,53,34),(1255,53,39),(1081,53,96),(1205,54,17),(1175,54,36),(920,54,106),(1077,54,158),(934,55,34),(998,55,49),(983,55,64),(904,55,140),(1247,55,167),(1184,56,43),(855,56,56),(894,56,78),(992,56,156),(995,56,194),(1051,57,122),(905,57,151),(932,57,193),(847,58,88),(1235,58,147),(1220,58,160),(1174,58,178),(1168,59,18),(1161,59,35),(1170,59,41),(957,59,44),(999,59,94),(927,60,43),(1033,60,66),(873,60,68),(1105,60,96),(1147,60,132),(1082,60,174),(1163,60,184),(926,61,38),(1091,61,50),(1005,61,56),(915,61,111),(1144,61,125),(1098,61,149),(882,61,198),(945,62,33),(1151,62,62),(851,62,85),(1152,62,93),(887,62,131),(1053,63,33),(966,63,38),(1202,63,57),(1074,63,158),(1000,63,181),(1237,64,121),(1016,64,158),(871,65,123),(969,65,139),(974,65,176),(1260,66,62),(929,66,85),(880,66,92),(1264,66,177),(1072,67,3),(1066,67,42),(1183,67,53),(1056,67,112),(870,67,123),(1148,67,179),(994,68,48),(1191,68,105),(1114,68,126),(1244,68,134),(872,68,192),(1058,69,2),(1071,69,76),(1049,69,105),(1236,69,107),(1047,69,130),(1045,69,191),(1185,70,133),(901,70,165),(1108,71,24),(1069,71,37),(954,71,97),(955,71,98),(1031,71,123),(1110,71,150),(1003,71,156),(922,71,184),(948,72,23),(1068,72,66),(1028,72,113),(886,72,178),(1171,73,37),(1099,73,40),(916,73,58),(865,73,60),(1159,73,96),(1153,73,100),(1207,73,154),(1164,74,51),(900,74,69),(893,74,74),(1084,74,104),(1232,74,126),(943,74,135),(1002,74,187),(1007,74,196),(1122,75,33),(1192,75,74),(1216,75,80),(1076,75,92),(1128,75,96),(1138,75,151),(1118,75,167),(1224,75,187),(933,75,196),(881,76,125),(1104,76,150),(1008,76,182),(853,76,183),(1048,77,186),(1261,78,19),(1035,78,57),(963,78,111),(1214,78,157),(907,79,32),(1160,79,43),(1061,79,48),(1196,79,116),(971,79,182),(846,80,21),(1046,80,31),(1225,80,34),(1111,80,93),(1017,80,100),(1055,80,161),(1217,81,85),(1089,81,105),(1219,81,117),(1101,82,16),(914,82,26),(906,82,32),(1121,82,41),(939,82,51),(1127,82,62),(975,82,90),(1093,82,98),(1059,82,110),(967,82,163),(947,83,20),(953,83,73),(970,83,199),(1226,84,31),(1107,84,45),(868,84,97),(1194,84,140),(1001,84,161),(1155,84,199),(1265,85,201),(1266,85,202),(1267,85,203),(1268,86,204),(1269,87,205);
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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_projetos`
--

LOCK TABLES `gdoks_projetos` WRITE;
/*!40000 ALTER TABLE `gdoks_projetos` DISABLE KEYS */;
INSERT INTO `gdoks_projetos` VALUES (1,'Programmable interactive service-desk','PRJ-6742-CcKZ',5,8,1,'2017-02-23','2017-05-07','\0'),(2,'Realigned multi-tasking methodology','PRJ-5469-grZb',10,10,1,'2016-11-20','2016-12-03',''),(3,'Inverse actuating orchestration','PRJ-5006-vNFt',14,1,1,'2017-04-17','2017-06-04','\0'),(4,'Re-engineered systematic secured line','PRJ-8711-AgLQ',4,4,1,'2017-05-25','2017-07-23','\0'),(5,'Devolved encompassing encryption','PRJ-5385-IjBm',4,2,1,'2017-05-04','2017-07-20',''),(6,'Horizontal high-level local area network','PRJ-7837-WtxZ',3,6,1,'2017-01-22','2017-03-28','\0'),(7,'Universal analyzing neural-net','PRJ-5484-IUsQ',14,10,1,'2016-11-28','2017-02-14',''),(8,'Distributed directional customer loyalty','PRJ-1974-qTBQ',4,1,1,'2017-05-11','2017-08-05',''),(9,'Sharable 24 hour framework','PRJ-2863-IEzS',11,9,1,'2016-11-28','2017-01-29',''),(10,'Front-line intangible productivity','PRJ-1300-Ougj',5,8,1,'2017-03-08','2017-05-10','\0'),(11,'Universal real-time access','PRJ-8475-pOCR',9,1,1,'2016-07-05','2016-08-11',''),(12,'Managed leading edge complexity','PRJ-8509-mvIh',2,7,1,'2016-09-08','2016-11-19',''),(13,'Adaptive cohesive policy','PRJ-0374-XJju',9,2,1,'2016-09-10','2016-11-08',''),(14,'Networked contextually-based instruction set','PRJ-0016-cxeo',2,7,1,'2016-08-29','2016-10-26','\0'),(15,'Monitored composite conglomeration','PRJ-1118-aPdC',7,5,1,'2017-03-23','2017-06-21','\0'),(16,'Function-based composite attitude','PRJ-3078-EBqz',15,9,1,'2017-03-11','2017-05-13','\0'),(17,'Robust homogeneous Graphic Interface','PRJ-0486-FUYj',6,3,1,'2016-07-29','2016-10-15','\0'),(18,'Up-sized multi-state secured line','PRJ-6919-FkvY',3,6,1,'2016-10-30','2016-12-18','\0'),(19,'Extended neutral array','PRJ-5029-npEf',12,10,1,'2016-12-17','2017-01-19',''),(20,'User-centric well-modulated solution','PRJ-1185-kjMR',1,8,1,'2016-06-23','2016-08-31','\0'),(21,'Configurable optimizing interface','PRJ-3426-WkiA',14,3,1,'2017-03-13','2017-04-24','\0'),(22,'Grass-roots 5th generation open architecture','PRJ-6187-poBD',5,3,1,'2017-04-03','2017-04-19',''),(23,'Operative zero defect collaboration','PRJ-0970-mQxO',10,3,1,'2016-08-14','2016-09-25',''),(24,'Exclusive scalable protocol','PRJ-6977-UzOF',11,8,1,'2016-11-05','2016-11-15','\0'),(25,'Reverse-engineered interactive internet soluti','PRJ-7138-SVPd',13,8,1,'2017-04-01','2017-06-10',''),(26,'Cross-group actuating moratorium','PRJ-5533-oVLF',1,7,1,'2017-05-24','2017-06-16','\0'),(27,'Progressive coherent parallelism','PRJ-1709-ynIp',7,6,1,'2017-03-30','2017-05-30','\0'),(28,'Digitized human-resource frame','PRJ-5912-dFkD',13,4,1,'2016-07-08','2016-09-05','\0'),(29,'Decentralized methodical matrix','PRJ-5205-bYsh',5,1,1,'2016-07-21','2016-09-27','\0'),(30,'Synergistic bi-directional attitude','PRJ-3165-AFDp',2,1,1,'2016-06-24','2016-08-11','\0'),(31,'Versatile asynchronous benchmark','PRJ-8755-vhle',14,1,1,'2017-03-15','2017-03-29',''),(32,'Face to face full-range contingency','PRJ-0210-yoQi',11,4,1,'2016-10-05','2016-12-03','\0'),(33,'Up-sized multi-state open system','PRJ-2864-CNXO',1,4,1,'2017-04-21','2017-06-09','\0'),(34,'Managed multimedia focus group','PRJ-4434-VNXA',13,8,1,'2017-05-16','2017-07-21',''),(35,'Right-sized high-level secured line','PRJ-2638-cbLP',2,5,1,'2016-12-12','2017-02-15',''),(36,'Open-architected tangible toolset','PRJ-0882-zdZg',3,1,1,'2017-03-20','2017-06-15','\0'),(37,'Cross-group global methodology','PRJ-2745-ugmk',4,10,1,'2017-02-19','2017-03-26','\0'),(38,'Switchable optimizing initiative','PRJ-9073-LTYP',12,10,1,'2017-02-10','2017-04-13','\0'),(39,'Monitored 24/7 knowledge user','PRJ-2544-FZRE',13,4,1,'2017-04-17','2017-07-09',''),(40,'Digitized bi-directional pricing structure','PRJ-9572-HBQX',1,3,1,'2016-08-18','2016-11-09',''),(41,'Team-oriented methodical implementation','PRJ-8059-Xkxu',4,6,1,'2017-01-05','2017-02-27',''),(42,'User-centric optimal attitude','PRJ-3524-CQwW',1,7,1,'2017-02-13','2017-03-16',''),(43,'Upgradable zero tolerance open system','PRJ-8921-XTEx',6,8,1,'2017-06-03','2017-06-21',''),(44,'Phased 6th generation utilisation','PRJ-6548-cINl',7,1,1,'2016-09-20','2016-12-15',''),(45,'Multi-layered analyzing system engine','PRJ-4038-FJXV',10,10,1,'2016-10-18','2016-12-17',''),(46,'Multi-tiered uniform solution','PRJ-2948-fizd',14,8,1,'2016-10-07','2016-11-07','\0'),(47,'Assimilated modular instruction set','PRJ-2508-Ihra',9,6,1,'2016-07-11','2016-08-28',''),(48,'Universal high-level product','PRJ-2847-UNkp',15,5,1,'2016-12-12','2017-03-03',''),(49,'Polarised regional approach','PRJ-1585-boae',2,5,1,'2016-10-14','2016-11-25','\0'),(50,'Enterprise-wide heuristic extranet','PRJ-8368-lXBe',10,4,1,'2016-10-06','2016-12-07','\0'),(51,'Intuitive local attitude','PRJ-7073-VEBt',10,9,1,'2017-05-11','2017-07-29',''),(52,'Compatible discrete customer loyalty','PRJ-3548-ORQr',14,5,1,'2016-08-10','2016-10-22',''),(53,'Organized zero administration alliance','PRJ-1256-PHKE',13,8,1,'2016-09-09','2016-11-01',''),(54,'Implemented optimal core','PRJ-2796-UaKn',4,7,1,'2016-10-09','2016-10-30',''),(55,'Focused multi-state pricing structure','PRJ-9560-xHIq',8,10,1,'2017-02-24','2017-05-23','\0'),(56,'Devolved secondary policy','PRJ-2829-nPQw',1,3,1,'2016-09-10','2016-10-24',''),(57,'User-friendly zero administration protocol','PRJ-1037-WmQs',9,2,1,'2017-06-19','2017-09-03','\0'),(58,'Innovative 24 hour toolset','PRJ-3207-JfDN',10,10,1,'2017-03-09','2017-04-26','\0'),(59,'Quality-focused even-keeled focus group','PRJ-0276-XnjF',14,5,1,'2017-06-13','2017-06-23','\0'),(60,'Advanced coherent encryption','PRJ-0730-IEQr',1,9,1,'2017-06-10','2017-08-13','\0'),(61,'Projeto 1','PRJ-1',5,1,1,'2017-06-27','2017-08-31','');
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
) ENGINE=InnoDB AUTO_INCREMENT=602 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_revisoes`
--

LOCK TABLES `gdoks_revisoes` WRITE;
/*!40000 ALTER TABLE `gdoks_revisoes` DISABLE KEYS */;
INSERT INTO `gdoks_revisoes` VALUES (1,1,1,'2017-06-06',0,50,NULL),(2,1,2,'2017-07-27',0,66,NULL),(3,1,3,'2017-06-13',0,70,NULL),(4,1,4,'2017-06-11',100,0,NULL),(5,1,5,'2017-06-20',0,0,NULL),(6,1,6,'2017-07-19',0,0,NULL),(7,1,7,'2017-07-02',100,0,NULL),(8,1,8,'2017-07-02',0,40,NULL),(9,1,9,'2017-06-01',0,0,NULL),(10,1,10,'2017-06-06',100,0,NULL),(11,1,11,'2017-06-14',69,31,NULL),(12,1,12,'2017-07-01',0,45,NULL),(13,1,13,'2017-07-01',0,44,NULL),(14,1,14,'2017-06-10',0,61,NULL),(15,1,15,'2017-07-10',0,53,NULL),(16,1,16,'2017-06-12',0,0,NULL),(17,1,17,'2017-07-07',100,0,NULL),(18,1,18,'2017-07-22',0,52,NULL),(19,1,19,'2017-06-30',0,0,NULL),(20,1,20,'2017-07-22',100,0,NULL),(21,1,21,'2017-06-30',0,42,NULL),(22,1,22,'2017-06-30',61,39,NULL),(23,1,23,'2017-07-06',0,62,NULL),(24,1,24,'2017-06-29',0,70,NULL),(25,1,25,'2017-06-01',0,0,NULL),(26,1,26,'2017-06-15',100,0,NULL),(27,1,27,'2017-06-10',100,0,NULL),(28,1,28,'2017-06-02',0,53,NULL),(29,1,29,'2017-07-22',100,0,NULL),(30,1,30,'2017-06-14',0,60,NULL),(31,1,31,'2017-07-18',100,0,NULL),(32,1,32,'2017-07-09',0,0,NULL),(33,1,33,'2017-06-25',55,0,NULL),(34,1,34,'2017-07-13',0,0,NULL),(35,1,35,'2017-06-25',100,0,NULL),(36,1,36,'2017-07-18',0,54,NULL),(37,1,37,'2017-07-01',100,0,NULL),(38,1,38,'2017-06-25',0,0,NULL),(39,1,39,'2017-06-13',100,0,NULL),(40,1,40,'2017-07-27',0,59,NULL),(41,1,41,'2017-06-16',0,62,NULL),(42,1,42,'2017-06-18',0,0,NULL),(43,1,43,'2017-06-03',67,33,NULL),(44,1,44,'2017-06-06',0,55,NULL),(45,1,45,'2017-07-17',100,0,NULL),(46,1,46,'2017-06-24',0,70,NULL),(47,1,47,'2017-07-23',0,59,NULL),(48,1,48,'2017-07-30',0,48,NULL),(49,1,49,'2017-07-27',0,43,NULL),(50,1,50,'2017-06-29',46,51,NULL),(51,1,51,'2017-06-06',0,0,NULL),(52,1,52,'2017-07-20',0,0,NULL),(53,1,53,'2017-07-27',0,0,NULL),(54,1,54,'2017-06-06',0,0,NULL),(55,1,55,'2017-06-18',0,0,NULL),(56,1,56,'2017-07-19',0,0,NULL),(57,1,57,'2017-06-02',0,0,NULL),(58,1,58,'2017-07-08',0,0,NULL),(59,1,59,'2017-07-06',0,0,NULL),(60,1,60,'2017-06-05',0,0,NULL),(61,1,61,'2017-07-14',0,0,NULL),(62,1,62,'2017-07-15',0,0,NULL),(63,1,63,'2017-06-27',0,0,NULL),(64,1,64,'2017-06-03',0,0,NULL),(65,1,65,'2017-07-07',0,0,NULL),(66,1,66,'2017-06-24',0,0,NULL),(67,1,67,'2017-06-02',0,0,NULL),(68,1,68,'2017-06-16',100,0,'2017-06-27 09:55:56'),(69,1,69,'2017-06-29',0,0,NULL),(70,1,70,'2017-06-16',0,0,NULL),(71,1,71,'2017-06-06',0,0,NULL),(72,1,72,'2017-06-17',0,0,NULL),(73,1,73,'2017-06-11',0,0,NULL),(74,1,74,'2017-07-02',0,0,NULL),(75,1,75,'2017-07-24',0,0,NULL),(76,1,76,'2017-06-21',0,0,NULL),(77,1,77,'2017-06-11',0,0,NULL),(78,1,78,'2017-07-23',0,0,NULL),(79,1,79,'2017-06-01',0,0,NULL),(80,1,80,'2017-07-04',0,0,NULL),(81,1,81,'2017-06-05',0,0,NULL),(82,1,82,'2017-07-29',0,0,NULL),(83,1,83,'2017-07-08',0,0,NULL),(84,1,84,'2017-07-08',0,0,NULL),(85,1,85,'2017-06-06',0,0,NULL),(86,1,86,'2017-07-27',0,0,NULL),(87,1,87,'2017-07-16',0,0,NULL),(88,1,88,'2017-07-15',0,0,NULL),(89,1,89,'2017-06-24',0,0,NULL),(90,1,90,'2017-06-03',0,0,NULL),(91,1,91,'2017-06-04',0,0,NULL),(92,1,92,'2017-07-27',0,0,NULL),(93,1,93,'2017-06-04',0,0,NULL),(94,1,94,'2017-07-24',0,0,NULL),(95,1,95,'2017-06-11',0,0,NULL),(96,1,96,'2017-06-16',0,0,NULL),(97,1,97,'2017-07-12',0,0,NULL),(98,1,98,'2017-07-07',0,0,NULL),(99,1,99,'2017-07-18',0,0,NULL),(100,1,100,'2017-07-29',0,0,NULL),(101,1,101,'2017-06-02',0,0,NULL),(102,1,102,'2017-06-10',0,0,NULL),(103,1,103,'2017-06-08',0,0,NULL),(104,1,104,'2017-06-14',0,0,NULL),(105,1,105,'2017-07-17',0,0,NULL),(106,1,106,'2017-06-13',0,0,NULL),(107,1,107,'2017-06-23',0,0,NULL),(108,1,108,'2017-07-08',0,0,NULL),(109,1,109,'2017-06-25',0,0,NULL),(110,1,110,'2017-06-24',0,0,NULL),(111,1,111,'2017-06-25',0,0,NULL),(112,1,112,'2017-06-19',0,0,NULL),(113,1,113,'2017-07-10',0,0,NULL),(114,1,114,'2017-06-05',0,0,NULL),(115,1,115,'2017-06-17',0,0,NULL),(116,1,116,'2017-07-11',0,0,NULL),(117,1,117,'2017-07-20',0,0,NULL),(118,1,118,'2017-07-10',0,0,NULL),(119,1,119,'2017-06-12',0,0,NULL),(120,1,120,'2017-06-01',0,0,NULL),(121,1,121,'2017-06-06',0,0,NULL),(122,1,122,'2017-07-02',0,0,NULL),(123,1,123,'2017-06-28',0,0,NULL),(124,1,124,'2017-06-19',0,0,NULL),(125,1,125,'2017-07-12',0,0,NULL),(126,1,126,'2017-07-12',0,0,NULL),(127,1,127,'2017-07-29',0,0,NULL),(128,1,128,'2017-06-01',0,0,NULL),(129,1,129,'2017-06-07',0,0,NULL),(130,1,130,'2017-06-26',0,0,NULL),(131,1,131,'2017-06-29',0,0,NULL),(132,1,132,'2017-07-01',0,0,NULL),(133,1,133,'2017-07-29',0,0,NULL),(134,1,134,'2017-07-14',0,0,NULL),(135,1,135,'2017-06-24',0,0,NULL),(136,1,136,'2017-07-18',0,0,NULL),(137,1,137,'2017-07-28',0,0,NULL),(138,1,138,'2017-06-14',0,0,NULL),(139,1,139,'2017-07-17',0,0,NULL),(140,1,140,'2017-06-10',0,0,NULL),(141,1,141,'2017-07-20',0,0,NULL),(142,1,142,'2017-06-06',0,0,NULL),(143,1,143,'2017-07-05',0,0,NULL),(144,1,144,'2017-07-12',0,0,NULL),(145,1,145,'2017-06-19',0,0,NULL),(146,1,146,'2017-06-09',0,0,NULL),(147,1,147,'2017-07-07',0,0,NULL),(148,1,148,'2017-07-01',0,0,NULL),(149,1,149,'2017-06-20',0,0,NULL),(150,1,150,'2017-06-19',0,0,NULL),(151,1,151,'2017-07-02',0,0,NULL),(152,1,152,'2017-07-10',0,0,NULL),(153,1,153,'2017-06-12',0,0,NULL),(154,1,154,'2017-07-23',0,0,NULL),(155,1,155,'2017-06-02',0,0,NULL),(156,1,156,'2017-07-07',0,0,NULL),(157,1,157,'2017-07-19',0,0,NULL),(158,1,158,'2017-07-06',0,0,NULL),(159,1,159,'2017-06-30',0,0,NULL),(160,1,160,'2017-07-17',0,0,NULL),(161,1,161,'2017-07-17',0,0,NULL),(162,1,162,'2017-07-07',0,0,NULL),(163,1,163,'2017-06-14',0,0,NULL),(164,1,164,'2017-07-27',0,0,NULL),(165,1,165,'2017-07-10',0,0,NULL),(166,1,166,'2017-06-26',0,0,NULL),(167,1,167,'2017-07-01',0,0,NULL),(168,1,168,'2017-07-10',0,0,NULL),(169,1,169,'2017-07-17',0,0,NULL),(170,1,170,'2017-07-25',0,0,NULL),(171,1,171,'2017-07-14',0,0,NULL),(172,1,172,'2017-06-06',0,0,NULL),(173,1,173,'2017-07-01',0,0,NULL),(174,1,174,'2017-06-22',0,0,NULL),(175,1,175,'2017-07-04',0,0,NULL),(176,1,176,'2017-06-04',0,0,NULL),(177,1,177,'2017-06-16',0,0,NULL),(178,1,178,'2017-06-16',0,0,NULL),(179,1,179,'2017-06-09',0,0,NULL),(180,1,180,'2017-06-16',0,0,NULL),(181,1,181,'2017-06-02',0,0,NULL),(182,1,182,'2017-07-01',0,0,NULL),(183,1,183,'2017-07-06',0,0,NULL),(184,1,184,'2017-07-01',0,0,NULL),(185,1,185,'2017-06-17',0,0,NULL),(186,1,186,'2017-07-30',0,0,NULL),(187,1,187,'2017-06-16',0,0,NULL),(188,1,188,'2017-07-25',0,0,NULL),(189,1,189,'2017-06-19',0,0,NULL),(190,1,190,'2017-07-02',0,0,NULL),(191,1,191,'2017-07-30',0,0,NULL),(192,1,192,'2017-07-11',0,0,NULL),(193,1,193,'2017-07-02',0,0,NULL),(194,1,194,'2017-06-03',0,0,NULL),(195,1,195,'2017-06-08',0,0,NULL),(196,1,196,'2017-06-05',0,0,NULL),(197,1,197,'2017-07-03',0,0,NULL),(198,1,198,'2017-06-09',0,0,NULL),(199,1,199,'2017-07-23',0,0,NULL),(200,1,200,'2017-06-06',0,0,NULL),(201,1,201,'2017-07-05',0,0,NULL),(202,1,202,'2017-06-19',0,0,NULL),(203,1,203,'2017-06-16',0,0,NULL),(204,1,204,'2017-06-02',0,0,NULL),(205,1,205,'2017-06-17',0,0,NULL),(206,1,206,'2017-07-23',0,0,NULL),(207,1,207,'2017-06-07',0,0,NULL),(208,1,208,'2017-06-26',100,0,'2017-06-27 09:53:41'),(209,1,209,'2017-06-24',0,0,NULL),(210,1,210,'2017-06-29',0,0,NULL),(211,1,211,'2017-07-21',0,0,NULL),(212,1,212,'2017-07-04',0,0,NULL),(213,1,213,'2017-07-20',0,0,NULL),(214,1,214,'2017-07-07',0,0,NULL),(215,1,215,'2017-07-25',0,0,NULL),(216,1,216,'2017-06-05',0,0,NULL),(217,1,217,'2017-07-03',0,0,NULL),(218,1,218,'2017-06-18',0,0,NULL),(219,1,219,'2017-07-20',0,0,NULL),(220,1,220,'2017-06-16',0,0,NULL),(221,1,221,'2017-07-01',0,0,NULL),(222,1,222,'2017-07-30',0,0,NULL),(223,1,223,'2017-06-16',0,0,NULL),(224,1,224,'2017-06-08',0,0,NULL),(225,1,225,'2017-07-26',0,0,NULL),(226,1,226,'2017-06-17',0,0,NULL),(227,1,227,'2017-06-02',0,0,NULL),(228,1,228,'2017-07-27',0,0,NULL),(229,1,229,'2017-06-06',0,0,NULL),(230,1,230,'2017-06-02',0,0,NULL),(231,1,231,'2017-07-02',0,0,NULL),(232,1,232,'2017-06-07',0,0,NULL),(233,1,233,'2017-07-25',0,0,NULL),(234,1,234,'2017-07-11',0,0,NULL),(235,1,235,'2017-06-13',0,0,NULL),(236,1,236,'2017-07-18',0,0,NULL),(237,1,237,'2017-06-08',0,0,NULL),(238,1,238,'2017-06-11',0,0,NULL),(239,1,239,'2017-07-03',0,0,NULL),(240,1,240,'2017-06-16',0,0,NULL),(241,1,241,'2017-06-13',0,0,NULL),(242,1,242,'2017-06-03',0,0,NULL),(243,1,243,'2017-06-23',0,0,NULL),(244,1,244,'2017-06-15',0,0,NULL),(245,1,245,'2017-07-26',0,0,NULL),(246,1,246,'2017-07-13',0,0,NULL),(247,1,247,'2017-07-24',0,0,NULL),(248,1,248,'2017-06-10',0,0,NULL),(249,1,249,'2017-06-28',0,0,NULL),(250,1,250,'2017-07-12',0,0,NULL),(251,1,251,'2017-07-18',0,0,NULL),(252,1,252,'2017-07-11',0,0,NULL),(253,1,253,'2017-06-17',0,0,NULL),(254,1,254,'2017-07-02',0,0,NULL),(255,1,255,'2017-06-03',0,0,NULL),(256,1,256,'2017-06-08',0,0,NULL),(257,1,257,'2017-07-30',0,0,NULL),(258,1,258,'2017-07-26',0,0,NULL),(259,1,259,'2017-07-01',0,0,NULL),(260,1,260,'2017-06-06',0,0,NULL),(261,1,261,'2017-07-12',0,0,NULL),(262,1,262,'2017-07-09',0,0,NULL),(263,1,263,'2017-07-02',0,0,NULL),(264,1,264,'2017-07-20',0,0,NULL),(265,1,265,'2017-06-27',0,0,NULL),(266,1,266,'2017-07-27',0,0,NULL),(267,1,267,'2017-07-30',0,0,NULL),(268,1,268,'2017-06-11',0,0,NULL),(269,1,269,'2017-06-02',0,0,NULL),(270,1,270,'2017-07-15',0,0,NULL),(271,1,271,'2017-07-04',0,0,NULL),(272,1,272,'2017-06-18',0,0,NULL),(273,1,273,'2017-07-14',0,0,NULL),(274,1,274,'2017-07-06',0,0,NULL),(275,1,275,'2017-06-10',0,0,NULL),(276,1,276,'2017-07-29',0,0,NULL),(277,1,277,'2017-07-13',0,0,NULL),(278,1,278,'2017-06-24',0,0,NULL),(279,1,279,'2017-06-04',0,0,NULL),(280,1,280,'2017-07-13',0,0,NULL),(281,1,281,'2017-07-22',0,0,NULL),(282,1,282,'2017-06-07',0,0,NULL),(283,1,283,'2017-06-20',0,0,NULL),(284,1,284,'2017-07-20',0,0,NULL),(285,1,285,'2017-06-08',0,0,NULL),(286,1,286,'2017-07-26',0,0,NULL),(287,1,287,'2017-07-04',0,0,NULL),(288,1,288,'2017-06-15',0,0,NULL),(289,1,289,'2017-07-25',0,0,NULL),(290,1,290,'2017-07-01',0,0,NULL),(291,1,291,'2017-06-09',0,0,NULL),(292,1,292,'2017-06-11',100,0,'2017-06-25 17:42:02'),(293,1,293,'2017-07-14',0,0,NULL),(294,1,294,'2017-07-11',0,0,NULL),(295,1,295,'2017-07-17',0,0,NULL),(296,1,296,'2017-07-12',0,0,NULL),(297,1,297,'2017-06-11',0,0,NULL),(298,1,298,'2017-07-06',0,0,NULL),(299,1,299,'2017-06-27',0,0,NULL),(300,1,300,'2017-06-23',0,0,NULL),(301,1,301,'2017-06-22',0,0,NULL),(302,1,302,'2017-06-08',0,0,NULL),(303,1,303,'2017-06-15',0,0,NULL),(304,1,304,'2017-07-28',0,0,NULL),(305,1,305,'2017-07-16',0,0,NULL),(306,1,306,'2017-06-11',0,0,NULL),(307,1,307,'2017-07-03',0,0,NULL),(308,1,308,'2017-06-29',0,0,NULL),(309,1,309,'2017-07-07',0,0,NULL),(310,1,310,'2017-06-16',0,0,NULL),(311,1,311,'2017-07-26',0,0,NULL),(312,1,312,'2017-07-04',0,0,NULL),(313,1,313,'2017-06-20',0,0,NULL),(314,1,314,'2017-06-24',0,0,NULL),(315,1,315,'2017-07-18',0,0,NULL),(316,1,316,'2017-06-19',0,0,NULL),(317,1,317,'2017-07-14',0,0,NULL),(318,1,318,'2017-06-05',0,0,NULL),(319,1,319,'2017-07-20',0,0,NULL),(320,1,320,'2017-06-05',0,0,NULL),(321,1,321,'2017-07-24',0,0,NULL),(322,1,322,'2017-07-06',0,0,NULL),(323,1,323,'2017-06-15',0,0,NULL),(324,1,324,'2017-07-18',0,0,NULL),(325,1,325,'2017-07-02',0,0,NULL),(326,1,326,'2017-07-09',0,0,NULL),(327,1,327,'2017-06-07',0,0,NULL),(328,1,328,'2017-06-17',0,0,NULL),(329,1,329,'2017-06-12',0,0,NULL),(330,1,330,'2017-07-18',0,0,NULL),(331,1,331,'2017-06-13',0,0,NULL),(332,1,332,'2017-07-11',0,0,NULL),(333,1,333,'2017-07-09',0,0,NULL),(334,1,334,'2017-07-18',0,0,NULL),(335,1,335,'2017-06-23',0,0,NULL),(336,1,336,'2017-07-27',0,0,NULL),(337,1,337,'2017-07-05',0,0,NULL),(338,1,338,'2017-06-07',0,0,NULL),(339,1,339,'2017-06-16',0,0,NULL),(340,1,340,'2017-07-16',0,0,NULL),(341,1,341,'2017-06-02',0,0,NULL),(342,1,342,'2017-07-09',0,0,NULL),(343,1,343,'2017-06-26',0,0,NULL),(344,1,344,'2017-07-19',0,0,NULL),(345,1,345,'2017-06-03',0,0,NULL),(346,1,346,'2017-06-03',0,0,NULL),(347,1,347,'2017-07-18',0,0,NULL),(348,1,348,'2017-06-24',0,0,NULL),(349,1,349,'2017-06-21',0,0,NULL),(350,1,350,'2017-06-26',0,0,NULL),(351,1,351,'2017-06-30',0,0,NULL),(352,1,352,'2017-07-07',0,0,NULL),(353,1,353,'2017-07-01',0,0,NULL),(354,1,354,'2017-07-04',0,0,NULL),(355,1,355,'2017-07-20',0,0,NULL),(356,1,356,'2017-07-16',0,0,NULL),(357,1,357,'2017-07-04',0,0,NULL),(358,1,358,'2017-06-06',0,0,NULL),(359,1,359,'2017-06-15',0,0,NULL),(360,1,360,'2017-06-05',0,0,NULL),(361,1,361,'2017-06-08',0,0,NULL),(362,1,362,'2017-06-20',0,0,NULL),(363,1,363,'2017-06-22',0,0,NULL),(364,1,364,'2017-07-22',0,0,NULL),(365,1,365,'2017-06-19',0,0,NULL),(366,1,366,'2017-07-15',0,0,NULL),(367,1,367,'2017-06-11',0,0,NULL),(368,1,368,'2017-06-26',0,0,NULL),(369,1,369,'2017-06-17',0,0,NULL),(370,1,370,'2017-07-06',0,0,NULL),(371,1,371,'2017-07-21',0,0,NULL),(372,1,372,'2017-07-05',0,0,NULL),(373,1,373,'2017-06-20',0,0,NULL),(374,1,374,'2017-07-07',0,0,NULL),(375,1,375,'2017-06-25',0,0,NULL),(376,1,376,'2017-07-28',0,0,NULL),(377,1,377,'2017-06-26',0,0,NULL),(378,1,378,'2017-07-16',0,0,NULL),(379,1,379,'2017-06-28',0,0,NULL),(380,1,380,'2017-06-14',0,0,NULL),(381,1,381,'2017-07-27',0,0,NULL),(382,1,382,'2017-06-15',0,0,NULL),(383,1,383,'2017-06-24',0,0,NULL),(384,1,384,'2017-07-04',0,0,NULL),(385,1,385,'2017-06-04',0,0,NULL),(386,1,386,'2017-06-22',0,0,NULL),(387,1,387,'2017-06-21',0,0,NULL),(388,1,388,'2017-07-09',0,0,NULL),(389,1,389,'2017-06-19',0,0,NULL),(390,1,390,'2017-06-06',0,0,NULL),(391,1,391,'2017-07-15',0,0,NULL),(392,1,392,'2017-07-09',0,0,NULL),(393,1,393,'2017-06-08',0,0,NULL),(394,1,394,'2017-07-12',0,0,NULL),(395,1,395,'2017-06-27',0,0,NULL),(396,1,396,'2017-07-12',0,0,NULL),(397,1,397,'2017-07-26',0,0,NULL),(398,1,398,'2017-06-26',0,0,NULL),(399,1,399,'2017-06-11',0,0,NULL),(400,1,400,'2017-06-13',0,0,NULL),(401,1,401,'2017-07-20',0,0,NULL),(402,1,402,'2017-06-20',0,0,NULL),(403,1,403,'2017-07-19',0,0,NULL),(404,1,404,'2017-07-24',0,0,NULL),(405,1,405,'2017-06-05',0,0,NULL),(406,1,406,'2017-07-14',0,0,NULL),(407,1,407,'2017-07-15',0,0,NULL),(408,1,408,'2017-06-08',0,0,NULL),(409,1,409,'2017-06-25',0,0,NULL),(410,1,410,'2017-06-13',0,0,NULL),(411,1,411,'2017-07-17',0,0,NULL),(412,1,412,'2017-06-13',0,0,NULL),(413,1,413,'2017-07-09',0,0,NULL),(414,1,414,'2017-06-25',0,0,NULL),(415,1,415,'2017-06-13',0,0,NULL),(416,1,416,'2017-06-18',0,0,NULL),(417,1,417,'2017-07-24',0,0,NULL),(418,1,418,'2017-06-24',0,0,NULL),(419,1,419,'2017-07-27',0,0,NULL),(420,1,420,'2017-07-11',0,0,NULL),(421,1,421,'2017-06-01',0,0,NULL),(422,1,422,'2017-06-18',0,0,NULL),(423,1,423,'2017-06-28',0,0,NULL),(424,1,424,'2017-07-05',0,0,NULL),(425,1,425,'2017-07-04',0,0,NULL),(426,1,426,'2017-06-28',0,0,NULL),(427,1,427,'2017-07-15',0,0,NULL),(428,1,428,'2017-06-09',0,0,NULL),(429,1,429,'2017-07-06',0,0,NULL),(430,1,430,'2017-07-22',0,0,NULL),(431,1,431,'2017-06-01',0,0,NULL),(432,1,432,'2017-06-29',0,0,NULL),(433,1,433,'2017-06-30',0,0,NULL),(434,1,434,'2017-07-23',0,0,NULL),(435,1,435,'2017-06-11',0,0,NULL),(436,1,436,'2017-07-22',0,0,NULL),(437,1,437,'2017-06-14',0,0,NULL),(438,1,438,'2017-06-19',0,0,NULL),(439,1,439,'2017-06-02',0,0,NULL),(440,1,440,'2017-07-29',0,0,NULL),(441,1,441,'2017-07-25',0,0,NULL),(442,1,442,'2017-07-11',0,0,NULL),(443,1,443,'2017-07-04',0,0,NULL),(444,1,444,'2017-07-02',0,0,NULL),(445,1,445,'2017-07-22',0,0,NULL),(446,1,446,'2017-07-11',0,0,NULL),(447,1,447,'2017-06-11',0,0,NULL),(448,1,448,'2017-06-13',0,0,NULL),(449,1,449,'2017-06-06',0,0,NULL),(450,1,450,'2017-06-10',0,0,NULL),(451,1,451,'2017-06-07',0,0,NULL),(452,1,452,'2017-06-23',0,0,NULL),(453,1,453,'2017-07-17',0,0,NULL),(454,1,454,'2017-07-02',0,0,NULL),(455,1,455,'2017-07-15',0,0,NULL),(456,1,456,'2017-07-19',0,0,NULL),(457,1,457,'2017-06-28',0,0,NULL),(458,1,458,'2017-06-08',0,0,NULL),(459,1,459,'2017-06-18',0,0,NULL),(460,1,460,'2017-07-21',0,0,NULL),(461,1,461,'2017-06-01',0,0,NULL),(462,1,462,'2017-07-17',0,0,NULL),(463,1,463,'2017-07-02',0,0,NULL),(464,1,464,'2017-06-16',0,0,NULL),(465,1,465,'2017-06-02',0,0,NULL),(466,1,466,'2017-06-09',0,0,NULL),(467,1,467,'2017-06-24',0,0,NULL),(468,1,468,'2017-06-02',0,0,NULL),(469,1,469,'2017-06-02',0,0,NULL),(470,1,470,'2017-06-22',0,0,NULL),(471,1,471,'2017-06-29',0,0,NULL),(472,1,472,'2017-06-30',0,0,NULL),(473,1,473,'2017-07-13',0,0,NULL),(474,1,474,'2017-06-30',0,0,NULL),(475,1,475,'2017-07-14',0,0,NULL),(476,1,476,'2017-07-30',0,0,NULL),(477,1,477,'2017-06-13',0,0,NULL),(478,1,478,'2017-07-16',0,0,NULL),(479,1,479,'2017-07-20',0,0,NULL),(480,1,480,'2017-06-27',0,0,NULL),(481,1,481,'2017-06-28',0,0,NULL),(482,1,482,'2017-06-28',0,0,NULL),(483,1,483,'2017-06-18',0,0,NULL),(484,1,484,'2017-06-12',0,0,NULL),(485,1,485,'2017-07-21',0,0,NULL),(486,1,486,'2017-06-23',0,0,NULL),(487,1,487,'2017-07-18',0,0,NULL),(488,1,488,'2017-06-17',0,0,NULL),(489,1,489,'2017-06-13',0,0,NULL),(490,1,490,'2017-06-26',0,0,NULL),(491,1,491,'2017-06-20',0,0,NULL),(492,1,492,'2017-07-24',0,0,NULL),(493,1,493,'2017-07-11',0,0,NULL),(494,1,494,'2017-06-29',0,0,NULL),(495,1,495,'2017-06-16',0,0,NULL),(496,1,496,'2017-06-23',0,0,NULL),(497,1,497,'2017-07-09',0,0,NULL),(498,1,498,'2017-06-01',0,0,NULL),(499,1,499,'2017-06-02',0,0,NULL),(500,1,500,'2017-06-19',0,0,NULL),(501,1,501,'2017-07-02',0,0,NULL),(502,1,502,'2017-07-06',0,0,NULL),(503,1,503,'2017-06-15',0,0,NULL),(504,1,504,'2017-07-19',0,0,NULL),(505,1,505,'2017-07-19',0,0,NULL),(506,1,506,'2017-06-05',0,0,NULL),(507,1,507,'2017-07-15',0,0,NULL),(508,1,508,'2017-07-21',0,0,NULL),(509,1,509,'2017-07-11',0,0,NULL),(510,1,510,'2017-07-27',0,0,NULL),(511,1,511,'2017-07-10',0,0,NULL),(512,1,512,'2017-06-22',0,0,NULL),(513,1,513,'2017-07-21',0,0,NULL),(514,1,514,'2017-06-29',0,0,NULL),(515,1,515,'2017-06-19',0,0,NULL),(516,1,516,'2017-06-22',0,0,NULL),(517,1,517,'2017-06-20',0,0,NULL),(518,1,518,'2017-07-30',0,0,NULL),(519,1,519,'2017-07-22',0,0,NULL),(520,1,520,'2017-06-20',0,0,NULL),(521,1,521,'2017-06-08',0,0,NULL),(522,1,522,'2017-06-17',0,0,NULL),(523,1,523,'2017-06-18',0,0,NULL),(524,1,524,'2017-06-06',0,0,NULL),(525,1,525,'2017-07-18',0,0,NULL),(526,1,526,'2017-06-13',0,0,NULL),(527,1,527,'2017-06-04',0,0,NULL),(528,1,528,'2017-06-20',0,0,NULL),(529,1,529,'2017-07-27',0,0,NULL),(530,1,530,'2017-07-12',0,0,NULL),(531,1,531,'2017-07-24',0,0,NULL),(532,1,532,'2017-06-29',0,0,NULL),(533,1,533,'2017-07-01',0,0,NULL),(534,1,534,'2017-07-08',0,0,NULL),(535,1,535,'2017-06-25',0,0,NULL),(536,1,536,'2017-07-04',0,0,NULL),(537,1,537,'2017-07-27',0,0,NULL),(538,1,538,'2017-06-06',0,0,NULL),(539,1,539,'2017-06-08',0,0,NULL),(540,1,540,'2017-06-27',0,0,NULL),(541,1,541,'2017-07-22',0,0,NULL),(542,1,542,'2017-07-26',0,0,NULL),(543,1,543,'2017-07-07',0,0,NULL),(544,1,544,'2017-06-15',0,0,NULL),(545,1,545,'2017-07-30',0,0,NULL),(546,1,546,'2017-07-01',0,0,NULL),(547,1,547,'2017-06-13',0,0,NULL),(548,1,548,'2017-06-15',0,0,NULL),(549,1,549,'2017-06-13',0,0,NULL),(550,1,550,'2017-06-19',0,0,NULL),(551,1,551,'2017-06-29',0,0,NULL),(552,1,552,'2017-07-02',0,0,NULL),(553,1,553,'2017-06-09',0,0,NULL),(554,1,554,'2017-06-04',0,0,NULL),(555,1,555,'2017-06-03',0,0,NULL),(556,1,556,'2017-06-29',0,0,NULL),(557,1,557,'2017-07-21',0,0,NULL),(558,1,558,'2017-06-21',0,0,NULL),(559,1,559,'2017-07-24',0,0,NULL),(560,1,560,'2017-06-14',0,0,NULL),(561,1,561,'2017-06-02',0,0,NULL),(562,1,562,'2017-07-30',0,0,NULL),(563,1,563,'2017-06-06',0,0,NULL),(564,1,564,'2017-06-06',0,0,NULL),(565,1,565,'2017-06-15',0,0,NULL),(566,1,566,'2017-07-20',0,0,NULL),(567,1,567,'2017-07-07',0,0,NULL),(568,1,568,'2017-07-11',0,0,NULL),(569,1,569,'2017-06-01',0,0,NULL),(570,1,570,'2017-06-19',0,0,NULL),(571,1,571,'2017-06-11',0,0,NULL),(572,1,572,'2017-07-06',0,0,NULL),(573,1,573,'2017-07-16',0,0,NULL),(574,1,574,'2017-07-03',0,0,NULL),(575,1,575,'2017-06-01',0,0,NULL),(576,1,576,'2017-07-26',0,0,NULL),(577,1,577,'2017-07-16',0,0,NULL),(578,1,578,'2017-06-17',0,0,NULL),(579,1,579,'2017-06-30',0,0,NULL),(580,1,580,'2017-07-21',0,0,NULL),(581,1,581,'2017-07-09',0,0,NULL),(582,1,582,'2017-07-12',0,0,NULL),(583,1,583,'2017-06-05',0,0,NULL),(584,1,584,'2017-06-27',0,0,NULL),(585,1,585,'2017-07-11',0,0,NULL),(586,1,586,'2017-06-23',0,0,NULL),(587,1,587,'2017-07-22',0,0,NULL),(588,1,588,'2017-06-10',0,0,NULL),(589,1,589,'2017-07-03',0,0,NULL),(590,1,590,'2017-06-18',0,0,NULL),(591,1,591,'2017-07-07',0,0,NULL),(592,1,592,'2017-07-04',0,0,NULL),(593,1,593,'2017-06-26',0,0,NULL),(594,1,594,'2017-06-28',0,0,NULL),(595,1,595,'2017-07-22',0,0,NULL),(596,1,596,'2017-06-11',0,0,NULL),(597,1,597,'2017-06-01',0,0,NULL),(598,1,598,'2017-06-23',0,0,NULL),(599,1,599,'2017-06-22',0,0,NULL),(600,1,600,'2017-06-25',0,0,NULL),(601,1,601,'2017-06-21',100,0,'2017-06-27 10:14:32');
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
) ENGINE=InnoDB AUTO_INCREMENT=362 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_subareas`
--

LOCK TABLES `gdoks_subareas` WRITE;
/*!40000 ALTER TABLE `gdoks_subareas` DISABLE KEYS */;
INSERT INTO `gdoks_subareas` VALUES (1,'Garrison-378','GAR425',174),(2,'Luster-728','LUS450',31),(3,'Reindahl-174','REI147',57),(4,'Clove-721','CLO174',14),(5,'Mendota-727','MEN306',165),(6,'Shasta-978','SHA982',158),(7,'Johnson-982','JOH378',154),(8,'Pennsylvania-676','PEN359',141),(9,'Hanson-229','HAN462',176),(10,'Crest Line-258','CRE310',121),(11,'Autumn Leaf-942','AUT584',15),(12,'Fremont-279','FRE805',122),(13,'Sauthoff-656','SAU757',10),(14,'Norway Maple-192','NOR237',77),(15,'Northridge-384','NOR286',109),(16,'Holmberg-136','HOL896',48),(17,'Bobwhite-309','BOB448',69),(18,'Mendota-457','MEN125',8),(19,'Monument-969','MON639',38),(20,'Reinke-464','REI523',174),(21,'Kropf-221','KRO909',105),(22,'Schmedeman-512','SCH885',180),(23,'Armistice-853','ARM438',105),(24,'Lakeland-401','LAK330',156),(25,'Mcguire-859','MCG670',167),(26,'Ridge Oak-809','RID785',4),(27,'Dakota-922','DAK225',45),(28,'Melvin-290','MEL299',69),(29,'Fordem-979','FOR852',174),(30,'Thierer-493','THI783',44),(31,'Park Meadow-681','PAR892',102),(32,'Hallows-575','HAL493',135),(33,'Gina-718','GIN986',78),(34,'Sloan-196','SLO148',139),(35,'Glacier Hill-936','GLA690',30),(36,'Thompson-571','THO982',47),(37,'Dakota-802','DAK490',131),(38,'Marcy-299','MAR565',2),(39,'Shopko-388','SHO727',57),(40,'Warrior-527','WAR664',15),(41,'Dapin-758','DAP653',85),(42,'Bay-283','BAY576',118),(43,'Ronald Regan-374','RON322',85),(44,'Jenna-502','JEN804',92),(45,'Reinke-689','REI601',128),(46,'Oakridge-172','OAK641',13),(47,'Linden-824','LIN952',6),(48,'Kropf-615','KRO402',117),(49,'Carioca-131','CAR531',124),(50,'Leroy-162','LER937',25),(51,'Bartelt-571','BAR243',55),(52,'Montana-238','MON633',11),(53,'Reindahl-241','REI503',18),(54,'Southridge-714','SOU260',162),(55,'Forest-490','FOR728',39),(56,'Arapahoe-991','ARA669',24),(57,'Graceland-426','GRA468',33),(58,'Shopko-344','SHO350',84),(59,'Memorial-577','MEM973',164),(60,'Warner-959','WAR918',29),(61,'Manley-639','MAN184',44),(62,'Birchwood-836','BIR899',50),(63,'Pleasure-883','PLE209',55),(64,'Village Green-833','VIL376',148),(65,'Lakeland-243','LAK596',77),(66,'Ruskin-174','RUS395',72),(67,'Artisan-980','ART177',128),(68,'Sage-992','SAG369',5),(69,'Macpherson-242','MAC151',74),(70,'Golf-581','GOL394',85),(71,'Charing Cross-620','CHA990',163),(72,'Colorado-835','COL583',137),(73,'Shopko-546','SHO517',61),(74,'Dayton-250','DAY813',128),(75,'Eagle Crest-224','EAG810',96),(76,'Nevada-384','NEV266',176),(77,'Farmco-429','FAR325',132),(78,'Sloan-171','SLO403',138),(79,'Drewry-817','DRE131',120),(80,'Mallory-682','MAL942',89),(81,'Algoma-762','ALG504',2),(82,'Crest Line-880','CRE378',45),(83,'Cody-203','COD744',150),(84,'Summerview-930','SUM511',44),(85,'Portage-509','POR931',146),(86,'Golf-692','GOL250',108),(87,'Ilene-361','ILE662',26),(88,'Hoepker-579','HOE436',174),(89,'Fallview-488','FAL523',43),(90,'Steensland-969','STE723',80),(91,'Iowa-241','IOW106',16),(92,'Lakewood Gardens-870','LAK905',1),(93,'Barby-496','BAR319',29),(94,'Commercial-200','COM977',105),(95,'Cottonwood-788','COT153',57),(96,'Muir-164','MUI932',80),(97,'Kedzie-122','KED797',162),(98,'Sycamore-939','SYC571',122),(99,'Monica-737','MON877',75),(100,'Stuart-436','STU863',35),(101,'Lawn-516','LAW935',47),(102,'Lotheville-469','LOT496',111),(103,'Hallows-373','HAL479',161),(104,'Sunnyside-314','SUN358',78),(105,'Green Ridge-985','GRE343',103),(106,'Aberg-456','ABE869',34),(107,'Center-159','CEN764',83),(108,'Sachtjen-680','SAC651',135),(109,'Oriole-591','ORI852',39),(110,'Manley-500','MAN466',33),(111,'Clarendon-973','CLA715',23),(112,'Pond-678','PON219',160),(113,'Oneill-590','ONE939',58),(114,'Jenifer-567','JEN432',177),(115,'Fieldstone-436','FIE891',172),(116,'Tennessee-611','TEN735',66),(117,'Novick-257','NOV657',11),(118,'Hoffman-147','HOF505',2),(119,'Northview-119','NOR426',139),(120,'Mifflin-241','MIF469',131),(121,'Brown-887','BRO635',48),(122,'Huxley-737','HUX574',53),(123,'Dakota-135','DAK468',64),(124,'Towne-368','TOW725',165),(125,'Esch-126','ESC495',83),(126,'Daystar-570','DAY910',121),(127,'Glacier Hill-933','GLA108',178),(128,'Stephen-507','STE499',127),(129,'Granby-612','GRA445',96),(130,'Loomis-254','LOO485',64),(131,'Hansons-750','HAN877',36),(132,'Basil-569','BAS110',104),(133,'Cardinal-384','CAR934',20),(134,'International-317','INT659',89),(135,'John Wall-270','JOH119',171),(136,'Forster-690','FOR707',130),(137,'Elgar-344','ELG662',127),(138,'Tomscot-875','TOM782',115),(139,'Charing Cross-966','CHA800',132),(140,'Sundown-106','SUN124',97),(141,'Iowa-673','IOW226',88),(142,'Sutteridge-699','SUT910',29),(143,'Hoard-951','HOA802',133),(144,'School-743','SCH705',119),(145,'Hoepker-272','HOE296',61),(146,'Beilfuss-383','BEI629',150),(147,'Del Sol-799','DEL579',10),(148,'Burning Wood-804','BUR712',169),(149,'Meadow Vale-963','MEA778',104),(150,'Marcy-159','MAR396',47),(151,'Canary-355','CAN279',62),(152,'Independence-575','IND281',61),(153,'Crownhardt-528','CRO255',36),(154,'Carberry-638','CAR395',39),(155,'Amoth-543','AMO745',153),(156,'Autumn Leaf-615','AUT585',165),(157,'Nelson-518','NEL606',70),(158,'Gina-804','GIN608',150),(159,'Clyde Gallagher-960','CLY170',59),(160,'Dottie-642','DOT234',17),(161,'Mitchell-560','MIT215',130),(162,'Graceland-463','GRA802',78),(163,'Waubesa-931','WAU832',38),(164,'Mandrake-623','MAN633',18),(165,'Iowa-272','IOW956',168),(166,'Stone Corner-735','STO495',2),(167,'Hooker-263','HOO961',120),(168,'Fremont-282','FRE289',134),(169,'Morning-939','MOR497',160),(170,'Straubel-486','STR504',56),(171,'Melody-325','MEL398',8),(172,'Ridgeview-448','RID997',14),(173,'Coolidge-280','COO516',105),(174,'Barby-970','BAR374',178),(175,'Trailsway-723','TRA642',48),(176,'Forest Dale-237','FOR897',38),(177,'Kingsford-550','KIN115',50),(178,'Sunnyside-572','SUN562',140),(179,'Tomscot-420','TOM739',103),(180,'Monterey-145','MON408',81),(181,'Schurz-799','SCH946',51),(182,'Crownhardt-596','CRO332',178),(183,'2nd-502','2ND858',12),(184,'Ronald Regan-412','RON543',115),(185,'Grover-504','GRO209',35),(186,'Main-944','MAI374',22),(187,'Cambridge-513','CAM724',17),(188,'Iowa-344','IOW748',83),(189,'Vidon-724','VID168',179),(190,'Haas-300','HAA225',125),(191,'Morning-568','MOR161',15),(192,'Dakota-735','DAK108',104),(193,'Mandrake-473','MAN718',106),(194,'Spohn-304','SPO516',117),(195,'Warner-396','WAR277',72),(196,'Longview-781','LON318',65),(197,'Lien-761','LIE984',8),(198,'Stoughton-267','STO760',172),(199,'Katie-765','KAT925',94),(200,'Pankratz-635','PAN327',87),(201,'Roxbury-699','ROX457',121),(202,'Sachtjen-445','SAC523',162),(203,'Village Green-710','VIL527',113),(204,'Evergreen-898','EVE625',133),(205,'Arapahoe-239','ARA688',174),(206,'Bowman-845','BOW607',100),(207,'Buhler-836','BUH199',104),(208,'Clarendon-890','CLA390',178),(209,'Pine View-921','PIN364',164),(210,'Beilfuss-817','BEI303',178),(211,'Grasskamp-717','GRA401',107),(212,'Fisk-883','FIS343',77),(213,'Graceland-302','GRA916',130),(214,'Division-617','DIV720',81),(215,'Tony-274','TON340',20),(216,'Burrows-314','BUR827',143),(217,'Knutson-832','KNU491',163),(218,'Petterle-229','PET167',163),(219,'Marquette-899','MAR549',22),(220,'Novick-780','NOV853',8),(221,'La Follette-218','LA 372',111),(222,'Esch-875','ESC285',138),(223,'Lerdahl-242','LER893',45),(224,'Ludington-823','LUD892',148),(225,'Kings-652','KIN847',142),(226,'Esker-459','ESK408',100),(227,'Stoughton-804','STO360',143),(228,'Arapahoe-612','ARA917',161),(229,'Dunning-158','DUN829',177),(230,'Washington-282','WAS942',103),(231,'Portage-788','POR939',88),(232,'Longview-231','LON376',148),(233,'Jackson-698','JAC810',149),(234,'Donald-258','DON954',72),(235,'Northwestern-883','NOR552',155),(236,'Stuart-695','STU755',109),(237,'Mcguire-801','MCG252',179),(238,'Mcguire-905','MCG773',152),(239,'Dottie-435','DOT768',88),(240,'Bonner-521','BON384',158),(241,'Gina-452','GIN114',179),(242,'Browning-927','BRO391',3),(243,'Village-495','VIL541',141),(244,'Butternut-834','BUT485',10),(245,'Russell-948','RUS720',147),(246,'Forest Run-688','FOR730',47),(247,'Mendota-650','MEN212',47),(248,'Russell-465','RUS227',59),(249,'Golf-640','GOL703',149),(250,'Prentice-356','PRE742',42),(251,'Scoville-537','SCO774',51),(252,'Burrows-359','BUR631',119),(253,'Lotheville-652','LOT679',48),(254,'Corry-186','COR831',76),(255,'Wayridge-987','WAY156',139),(256,'La Follette-574','LA 459',95),(257,'Chive-576','CHI454',46),(258,'Scott-734','SCO627',141),(259,'Brentwood-234','BRE722',47),(260,'Kennedy-828','KEN447',155),(261,'Lotheville-859','LOT227',158),(262,'Marquette-284','MAR196',155),(263,'Reindahl-433','REI976',156),(264,'Doe Crossing-674','DOE947',116),(265,'Carioca-885','CAR871',14),(266,'Sullivan-114','SUL105',133),(267,'Clove-550','CLO308',83),(268,'Kingsford-161','KIN499',118),(269,'Veith-138','VEI981',25),(270,'Dovetail-201','DOV322',64),(271,'John Wall-443','JOH219',61),(272,'Granby-889','GRA902',105),(273,'Heffernan-173','HEF348',169),(274,'Fremont-945','FRE990',143),(275,'Anderson-170','AND449',170),(276,'Hooker-598','HOO453',2),(277,'Paget-979','PAG502',86),(278,'Brickson Park-951','BRI975',109),(279,'Hovde-143','HOV725',15),(280,'Hollow Ridge-780','HOL944',178),(281,'Hagan-652','HAG830',37),(282,'Esker-550','ESK727',61),(283,'Roxbury-613','ROX628',157),(284,'Mandrake-922','MAN739',88),(285,'Bonner-707','BON795',35),(286,'Longview-247','LON592',180),(287,'Stuart-403','STU940',111),(288,'Boyd-533','BOY940',128),(289,'Golf Course-805','GOL273',48),(290,'Vera-958','VER187',151),(291,'Dennis-789','DEN100',8),(292,'Canary-217','CAN260',24),(293,'Kings-166','KIN546',72),(294,'Charing Cross-771','CHA760',179),(295,'Mosinee-885','MOS336',157),(296,'Del Mar-773','DEL880',97),(297,'Maple Wood-309','MAP810',147),(298,'Garrison-379','GAR359',150),(299,'Norway Maple-671','NOR282',130),(300,'Dwight-959','DWI295',29),(301,'Dawn-629','DAW299',131),(302,'Hovde-161','HOV358',33),(303,'Hallows-295','HAL791',26),(304,'Killdeer-374','KIL181',105),(305,'Blue Bill Park-126','BLU997',143),(306,'Helena-699','HEL857',2),(307,'5th-545','5TH546',11),(308,'Susan-143','SUS542',18),(309,'Forster-160','FOR101',151),(310,'Alpine-629','ALP260',40),(311,'Kim-764','KIM435',126),(312,'Shopko-374','SHO793',41),(313,'Grover-456','GRO198',171),(314,'Mosinee-765','MOS960',15),(315,'Homewood-660','HOM520',107),(316,'Bowman-716','BOW109',145),(317,'Pond-370','PON263',106),(318,'Grasskamp-349','GRA503',32),(319,'Warbler-154','WAR936',12),(320,'Kim-404','KIM707',163),(321,'Bluejay-147','BLU698',89),(322,'Melby-928','MEL607',102),(323,'Rutledge-851','RUT995',101),(324,'Fuller-432','FUL700',2),(325,'Hazelcrest-845','HAZ214',168),(326,'Spenser-912','SPE451',143),(327,'Larry-185','LAR629',132),(328,'Warrior-122','WAR815',23),(329,'Killdeer-260','KIL582',148),(330,'Carey-237','CAR831',71),(331,'Bashford-379','BAS685',160),(332,'Sycamore-961','SYC524',16),(333,'Canary-984','CAN474',139),(334,'Vidon-326','VID129',179),(335,'Bluestem-751','BLU139',43),(336,'Drewry-989','DRE695',116),(337,'Green Ridge-937','GRE491',119),(338,'Badeau-225','BAD491',110),(339,'Kim-148','KIM939',39),(340,'Lake View-509','LAK731',26),(341,'Riverside-536','RIV872',46),(342,'Cambridge-608','CAM209',55),(343,'Anniversary-223','ANN628',149),(344,'Luster-701','LUS177',125),(345,'Norway Maple-867','NOR395',127),(346,'Moland-179','MOL575',146),(347,'La Follette-122','LA 376',173),(348,'Fisk-305','FIS771',149),(349,'Tony-226','TON318',99),(350,'Old Shore-740','OLD222',119),(351,'Fair Oaks-782','FAI203',93),(352,'Carioca-979','CAR345',111),(353,'Delaware-754','DEL831',121),(354,'Kings-307','KIN169',8),(355,'Vahlen-852','VAH416',119),(356,'Reindahl-207','REI713',110),(357,'Monica-668','MON325',143),(358,'Garrison-762','GAR542',89),(359,'Maryland-968','MAR897',176),(360,'Ilene-252','ILE877',70),(361,'A11','A11',181);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios`
--

LOCK TABLES `gdoks_usuarios` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios` VALUES (1,'sergio','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Sérgio Moura','sergiomoura@faraday.com.br','59564465d049d2.44551749','2017-06-30 13:30:29',1,''),(2,'tony','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Anthony Valério','anthony@faraday.com.br',NULL,NULL,1,''),(3,'paulocesar','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Paulo César','paulocesar@faraday.com.br',NULL,NULL,1,''),(4,'teste1','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 1','teste1@faraday.com.br',NULL,NULL,1,''),(5,'teste2','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 2','teste2@faraday.com.br',NULL,NULL,1,''),(6,'teste3','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 3','teste3@faraday.com.br',NULL,NULL,1,''),(7,'teste4','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 4','teste4@faraday.com.br',NULL,NULL,1,''),(8,'teste5','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 5','teste5@faraday.com.br',NULL,NULL,1,''),(9,'teste6','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 6','teste6@faraday.com.br',NULL,NULL,1,''),(10,'teste7','*A00D6EEF76EC509DB66358D2E6685F8FF7A4C3DD','Teste 7','teste7@faraday.com.br',NULL,NULL,1,'');
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
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios_x_opcoes_de_tela`
--

LOCK TABLES `gdoks_usuarios_x_opcoes_de_tela` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios_x_opcoes_de_tela` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios_x_opcoes_de_tela` VALUES (169,1,2,3,1),(170,1,2,4,1),(171,1,4,5,1),(172,1,4,6,1),(173,1,4,7,1),(174,1,6,12,1),(175,1,6,13,1),(176,1,7,14,1),(177,1,7,15,1),(178,1,7,16,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_usuarios_x_telas`
--

LOCK TABLES `gdoks_usuarios_x_telas` WRITE;
/*!40000 ALTER TABLE `gdoks_usuarios_x_telas` DISABLE KEYS */;
INSERT INTO `gdoks_usuarios_x_telas` VALUES (120,1,1),(121,1,2),(122,1,3),(123,1,4),(124,1,5),(125,1,6),(126,1,7),(127,1,8),(128,1,9);
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gdoks_validadores`
--

LOCK TABLES `gdoks_validadores` WRITE;
/*!40000 ALTER TABLE `gdoks_validadores` DISABLE KEYS */;
INSERT INTO `gdoks_validadores` VALUES (1,6,13),(2,3,1),(3,4,11),(4,1,4),(5,6,7),(6,1,14),(7,4,15),(8,3,4),(9,9,3),(11,1,11),(12,2,15),(13,5,9),(14,3,15),(15,7,15),(16,4,15),(17,5,14),(18,3,7),(19,7,1),(21,3,3),(22,1,9),(23,9,4),(24,4,4),(25,9,12),(26,7,11),(27,10,6),(28,1,15),(29,10,15),(30,7,9),(31,3,10),(32,1,10),(33,2,2),(34,1,2);
/*!40000 ALTER TABLE `gdoks_validadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'gdoks_000'
--

--
-- Dumping routines for database 'gdoks_000'
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
CREATE FUNCTION `trueFromInt`(i int) RETURNS int(11)
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
CREATE FUNCTION `trueFromStr`(i text) RETURNS int(11)
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

-- Dump completed on 2017-06-30  9:43:19
