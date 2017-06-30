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

-- Dump completed on 2017-06-30  9:41:34
