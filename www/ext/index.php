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
	// defining api - - - - - - - - - - - - - - - - - - - -
	$app = new \Slim\Slim();

	// definindo rota para download de grd
	$app->get('/grds/:data',function($data){
		
		// Lendo dados da requisição
		$data = explode('-', $data);

		// Verificando se está no formato correto
		if(sizeof($data)!=2){
			die('Erro: 01');
		}

		// Lendo dados da requisição
		$empresa = $data[0];
		$unique_link = $data[1];

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

		// Carregando id da grd em questão
		$sql = 'SELECT id FROM gdoks_grds WHERE unique_link=?';
		$rs = $db->query($sql,'s',$unique_link);
		if(sizeof($rs) == 0){
			die('Erro: 03');
		}

		// Salvando id da grd
		$id_grd = $rs[0]['id'];

		// Criando objeto GRD
		$grd = getGrd($id_grd,$db);

		// Mandando zip da grd
		mandaZipDaGrd($grd,$db);

	});

	// Running the app
	$app->run();
?>