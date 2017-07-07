<?php 
	// Configurando a descrição do erro at runtime
	error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

	// Required files - - - - - - - - - - - - - - - - - - -
	require('../../includes/Slim/vendor/autoload.php');
	require('../../includes/vendor/autoload.php');
	require('../../includes/constantes.php');
	require('../../includes/db.php');
	require('../../includes/definicoes_de_acoes.php');
	require('../../includes/response.php');
	require('../../includes/GDoks/Grd.php');
	require('../../includes/GDoks/Crypter.php');

	// defining api - - - - - - - - - - - - - - - - - - - -
	$app = new \Slim\Slim();

	// definindo rota para download de grd
	$app->get('/grds/:data',function($data){
		
		// Destrocando caracteres '-' volta a ser '-', '_' volta a ser '/' e '.' volta a ser '='
		$data = str_replace('-','+', $data);
		$data = str_replace('_','/', $data);
		$data = str_replace('.','=', $data);

		// Decrypting data
		$data = Crypter::decrypt($data);
		
		// Verificando se a descriptografia ocorreu
		if($data === false){
			die('Erro: 01');
		}
		
		// Lendo dados da requisição
		$data = explode('-', $data);

		// Lendo dados da requisição
		$empresa = $data[0];
		$unique_link = $data[1];
		$nome_usuario = $data[2];

		// Definindo os nomes dos arquivos do cliente;
		$FILE_DBKEY = '../../client_data/'.$empresa.'/dbkey.php';
		$FILE_GRD = '../../client_data/'.$empresa.'/grd.php';
		$FILE_LOGO = '../../client_data/'.$empresa.'/logo.jpg';

		// verificando se os arquivos existem
		if(!(file_exists($FILE_DBKEY) && file_exists($FILE_GRD) && file_exists($FILE_LOGO))){
			die('Erro: 02');
		}

		// Incluindo dbkey do cliente e criando acesso a base
		include($FILE_DBKEY);
		$db = new DB($dbkey);
		unset($dbkey);

		// criando GRD a pargir do uniquelink
		$grd = Grd::CreateByUniqueLink($unique_link,$empresa);

		// Mandando zip da grd
		$grd->sendZip($nome_usuario);
		
	});

	// Running the app
	$app->run();
?>