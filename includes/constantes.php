<?php
	define('UPLOAD_PATH','../../uploads/');
	define('TMP_PATH',rtrim($_SERVER['DOCUMENT_ROOT'],'/').'/tmp/');
	define('CLIENT_DATA_PATH',rtrim($_SERVER['DOCUMENT_ROOT'],'/').'/client_data/');
	define('FPDF_FONT_PATH',rtrim($_SERVER['DOCUMENT_ROOT'],'/').'/includes/FPDF/fonts/');
	define('AES_KEY','J237HDF9H99QEW78FGGF8VIBLAS893BDOU978B9A');
	define('SENDGRID_KEY','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');
	define('SENDGRID_DEFAULT_FROM','postmaster@gdoks.com.br');
	define('SENDGRID_DEFAULT_FROM_NAME','GDoks');
	define('VALIDADE_DO_PEDIDO_RECONFPWS', 5);
	define('TOKEN_DURARION', 3600); //in seconds
	define('ID_OPCAO_VER_FORMA_DE_COBRANCA',20);
	define('ID_OPCAO_VER_VALOR_DE_PROJETO',22);
	define('ID_OPCAO_ALTERAR_FORMA_DE_COBRANCA',19);
	define('ID_OPCAO_ALTERAR_VALOR_DE_PROJETO',21);