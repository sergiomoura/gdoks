<?php 
	// Configurando a descrição do erro at runtime
	error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

	// Required files - - - - - - - - - - - - - - - - - - -
	require('vendor/autoload.php');
	require('constantes.php');
	require('db.php');
	require('definicoes_de_acoes.php');
	require('response.php');
	require('GDoks/Grd.php');
	require('GDoks/Crypter.php');
	

	// defining api - - - - - - - - - - - - - - - - - - - -
	$app = new \Slim\Slim();

	// definindo rota para download de grd
	$app->get('/ext/grds/:data',function($data){

		
		// Destrocando caracteres '-' volta a ser '-', '_' volta a ser '/' e '|' volta a ser '='
		$data = str_replace('-','+', $data);
		$data = str_replace('_','/', $data);
		$data = str_replace('|','=', $data);

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
		$FILE_DBKEY = CLIENT_DATA_PATH.$empresa.'/dbkey.php';
		$FILE_GRD = CLIENT_DATA_PATH.$empresa.'/grd.php';
		$FILE_LOGO = CLIENT_DATA_PATH.$empresa.'/logo.jpg';

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

		// Aumentando o max_execution_time para 2min... isso pode demorar
		ini_set('max_execution_time', 120);

		// Mandando zip da grd
		try {
			$grd->sendZip($nome_usuario,true); // true => SEM COMPRESSÃO;
		} catch (Exception $e) {
			http_response_code(401);
			echo('{"error":1,"msg":"'.$e->getMessage().'"}');
			exit(1);
		}
	});

	$app->post('/ext/esqueci',function() use($app) {

		// Interpretando conteudo da requisição
		$data = json_decode($app->request->getBody());

		// Verificando se interpretou a requisição com sucesso
		if(json_last_error() != JSON_ERROR_NONE) {
			http_response_code(401);
			echo('{"error":1,"msg":"Requisição mal feita."}');
			exit(1);
		}

		// Carregando o dbkey da empresa
		try {
			include(CLIENT_DATA_PATH.$data->empresa.'/dbkey.php');
		} catch (Exception $e) {
			http_response_code(401);
			echo('{"error":1, "msg":"Empresa inexistente."}');
			exit(1);
		}

		// Conectando-se a base de dados
		$db = new DB($dbkey);
		
		// Verificando um usuário que esteja cadastrado com o email fornecido
		$sql = 'SELECT id,nome FROM gdoks_usuarios WHERE email=?';
		$rs = $db->query($sql,'s',$data->email);
		if(sizeof($rs) == 0){
			http_response_code(401);
			die('{"error":1, "msg":"Email não cadastrado."}');
		}

		// Criando o arquivo com o token na pasta tmp
		$uniqid = md5(uniqid('',true));
		$file = TMP_PATH.$data->empresa.'/'.$data->email.'_'.$uniqid;
		touch($file);
		file_put_contents($file, $rs[0]['id']);

		// Definindo o from
		$sgFrom = new SendGrid\Email(SENDGRID_DEFAULT_FROM_NAME,SENDGRID_DEFAULT_FROM);

		// Definindo o top
		$sgTo = new SendGrid\Email($rs[0]['nome'],$data->email);

		// Definindo url de reconfiguração de senha
		$url = 'http://'.$_SERVER['SERVER_NAME'].'/esqueci/reconfpws.php?email='.$data->email.'&uid='.$uniqid.'&e='.$data->empresa;

		// Definindo o texto
		$texto  = 'Clique no link abaixo para ir até a página onde você poderá ';
		$texto .= 'configurar uma nova senha.<br><br>';
		$texto .= '<a href="'.$url.'">';
		$texto .= $url.'</a>';
		$content = new SendGrid\Content("text/html", $texto);

		// Definindo o assunto
		$subject = "Reconfigurar a sua senha";

		// Criando email
		$sgEmail = new SendGrid\Mail($sgFrom, $subject, $sgTo, $content);

		// Enviando o email
		$sendgrid = new \SendGrid(SENDGRID_KEY);
		$sendResult = $sendgrid->client->mail()->send()->post($sgEmail);

		if($sendResult->statusCode() == 202){
			http_response_code(200);
			die('{"error":0, "msg":"Link enviado por email"}');
		} else {
			http_response_code(500);
			die('{"error":1, "msg":"Falha no envio do email. Por favor, entre em contato com o suporte."}');
		}
	});

	$app->post('/ext/reconfpws',function() use($app) {

		// Interpretando conteudo da requisição
		$data = json_decode($app->request->getBody());

		// Verificando se interpretou a requisição com sucesso
		if(json_last_error() != JSON_ERROR_NONE) {
			http_response_code(401);
			die('{"error":1,"msg":"Requisição mal feita."}');
		}

		// Carregando o dbkey da empresa
		try {
			include(CLIENT_DATA_PATH.$data->empresa.'/dbkey.php');
		} catch (Exception $e) {
			http_response_code(401);
			die('{"error":1, "msg":"Empresa inexistente."}');
		}

		// Definindo o nome do arquivo temporário
		$file = TMP_PATH.$data->empresa.'/'.$data->email.'_'.$data->uid;
	
		// Verificando existência do arquivo
		if(!file_exists($file)){die();}

		// Determinando a idade do arquivo em minutos
		$idade = (time() - filemtime($file))/60;
		if($idade > VALIDADE_DO_PEDIDO_RECONFPWS){
			http_response_code(401);
			die("{'error':1, 'msg':'Seu pedido para reconfigurar seu login/senha tem mais de ". VALIDADE_DO_PEDIDO_RECONFPWS." minutos. Tente novamente.'}");
		};

		// Conectando-se a base de dados
		$db = new DB($dbkey);

		// Lendo o id do usuário que está guardado dentro do arquivo temp
		$id = file_get_contents($file);
		
		// Verificando um usuário que esteja cadastrado com o email fornecido
		$sql = 'UPDATE gdoks_usuarios SET senha=PASSWORD(?),login=? WHERE id=?';
		try {
			$db->query($sql,'ssi',$data->pass1,$data->login,$id);
		} catch (Exception $e){
			http_response_code(500);
			die('{"error":1, "msg":"Ocorreu um erro ao tentar atualizar os dados. Entre em contato com o suporte."}');
		}

		// Apagando o arquivo temporário
		unlink($file);

	});
	// Running the app
	$app->run();
?>