SET FOREIGN_KEY_CHECKS=0;
DELETE FROM gdoks_acoes 					WHERE id>0;
DELETE FROM gdoks_areas 					WHERE id>0;
DELETE FROM gdoks_arquivos 					WHERE id>0;
DELETE FROM gdoks_cargos 					WHERE id>0;
DELETE FROM gdoks_clientes 					WHERE id>0;
DELETE FROM gdoks_codigos_emi 	 			WHERE id>0;
DELETE FROM gdoks_daos 						WHERE id>0;
DELETE FROM gdoks_disciplinas 	 			WHERE id>0;
DELETE FROM gdoks_documentos 				WHERE id>0;
DELETE FROM gdoks_subdisciplinas 			WHERE id>0;
DELETE FROM gdoks_documentos_x_dependencias WHERE id>0;
DELETE FROM gdoks_empresas 					WHERE id>1;
DELETE FROM gdoks_especialistas 			WHERE id>0;
DELETE FROM gdoks_grds 						WHERE id>0;
DELETE FROM gdoks_grds_x_revisoes 			WHERE id>0;
DELETE FROM gdoks_hhemdocs 					WHERE id>0;
DELETE FROM gdoks_log 						WHERE id>0;
DELETE FROM gdoks_pdas 						WHERE id>0;
DELETE FROM gdoks_pdas_x_arquivos 			WHERE id>0;
DELETE FROM gdoks_projetos 					WHERE id>0;
DELETE FROM gdoks_revisoes 					WHERE id>0;
DELETE FROM gdoks_subareas 					WHERE id>0;
DELETE FROM gdoks_tamanhos_de_papel  		WHERE id>0;
DELETE FROM gdoks_tipos_de_doc		  		WHERE id>0;
DELETE FROM gdoks_usuarios 					WHERE id>1;
DELETE FROM gdoks_validadores 				WHERE id>0;
/* Resetando o auto incremento das tabelas zeradas */
ALTER TABLE gdoks_acoes AUTO_INCREMENT = 1;
ALTER TABLE gdoks_areas AUTO_INCREMENT = 1;
ALTER TABLE gdoks_arquivos AUTO_INCREMENT = 1;
ALTER TABLE gdoks_cargos AUTO_INCREMENT = 1;
ALTER TABLE gdoks_clientes AUTO_INCREMENT = 1;
ALTER TABLE gdoks_codigos_emi AUTO_INCREMENT = 1;
ALTER TABLE gdoks_daos AUTO_INCREMENT = 1;
ALTER TABLE gdoks_disciplinas AUTO_INCREMENT = 1;
ALTER TABLE gdoks_documentos AUTO_INCREMENT = 1;
ALTER TABLE gdoks_subdisciplinas AUTO_INCREMENT = 1;
ALTER TABLE gdoks_documentos_x_dependencias AUTO_INCREMENT = 1;
ALTER TABLE gdoks_empresas AUTO_INCREMENT = 2;
ALTER TABLE gdoks_especialistas AUTO_INCREMENT = 1;
ALTER TABLE gdoks_grds AUTO_INCREMENT = 1;
ALTER TABLE gdoks_grds_x_revisoes AUTO_INCREMENT = 1;
ALTER TABLE gdoks_hhemdocs AUTO_INCREMENT = 1;
ALTER TABLE gdoks_log AUTO_INCREMENT = 1;
ALTER TABLE gdoks_pdas AUTO_INCREMENT = 1;
ALTER TABLE gdoks_pdas_x_arquivos AUTO_INCREMENT = 1;
ALTER TABLE gdoks_projetos AUTO_INCREMENT = 1;
ALTER TABLE gdoks_revisoes AUTO_INCREMENT = 1;
ALTER TABLE gdoks_subareas AUTO_INCREMENT = 1;
ALTER TABLE gdoks_tamanhos_de_papel AUTO_INCREMENT = 1;
ALTER TABLE gdoks_tipos_de_doc AUTO_INCREMENT = 1;
ALTER TABLE gdoks_usuarios AUTO_INCREMENT = 2;
ALTER TABLE gdoks_validadores AUTO_INCREMENT = 1;
SET FOREIGN_KEY_CHECKS=1;
\. F:\Users\sergio\Workspace\GDoks\gdoks\dados\dumb_data\gdoks_gdoks_acoes.sql
\. F:\Users\sergio\Workspace\GDoks\gdoks\dados\dumb_data\gdoks_gdoks_cargos.sql
\. F:\Users\sergio\Workspace\GDoks\gdoks\dados\dumb_data\gdoks_gdoks_codigos_emi.sql
\. F:\Users\sergio\Workspace\GDoks\gdoks\dados\dumb_data\gdoks_gdoks_tamanhos_de_papel.sql
\. F:\Users\sergio\Workspace\GDoks\gdoks\dados\dumb_data\gdoks_gdoks_tipos_de_doc.sql