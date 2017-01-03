<?php 
	
	// verificando se o usuário está setado
	if(!isset($_COOKIE['user'])){
		// redirecionando para página inicial.
		header("Location: /webapp/login.php");
	}

	// lendo o objeto user que está no cookie
	$EU = json_decode($_COOKIE['user']);
	if(json_last_error() !== JSON_ERROR_NONE){
		// redirecionando para página inicial.
		header("Location: /webapp/login.php");
	}

	// verificando se o token está setado no usuário
	if(!isset($EU->token)){
		// redirecionando para página inicial.
		header("Location: /webapp/login.php");
	}

	// Incluindo script de conexão com DB.
	require('../../includes/db.php');

	// verificando se o token existe e é válido.
	$sql = 'SELECT id FROM gdoks_usuarios WHERE token=? and validade_do_token>now()';
	$resultado = $db->query($sql,'s',$EU->token);
	if(sizeof($resultado) == 0){
		// redirecionando para página inicial.
		header("Location: /webapp/login.php");
	}

?>