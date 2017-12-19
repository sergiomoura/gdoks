<?php

	// verificando se o usuário está setado
	if(!isset($_COOKIE['user'])){
		// redirecionando para página inicial.
		header("Location: /webapp/login.php");
		die();
	}

	// lendo user do cookie
	$user = json_decode($_COOKIE['user']);

	// Incluindo constantes
	include_once('constantes.php');
	include_once('db.php');

	// Carregando dbkey
	include_once(CLIENT_DATA_PATH.$user->empresa.'/dbkey.php');

	// Criando conexaão com base de dados
	$db = new DB($dbkey);
	unset($dbkey);

	// Determinando a url deste script
	$url = $_SERVER['SCRIPT_NAME'];

	// Carregando o objeto tela
	include('GDoks/Tela.php');
	try {
		$tela = Tela::CreateByUrl($url,$user->id,$db);
	} catch (Exception $e) {
		die($e->getMessage());
	}

	// Carregando opções da tela
	$opcoes_de_tela = $tela->getOpcoes();
 ?>