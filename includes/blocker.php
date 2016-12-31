<?php 
	// Incluindo script de conexão com DB.
	require('../../includes/db.php');

	// verificando se o token está setado no Cookie
	if(!isset($_COOKIE['token'])){
		// redirecionando para página inicial.
		header("Location: /webapp/login.php");
		die();
	}

	// verificando se o token existe e é válido. Carregando id do usuário caso positivo.
	$sql = 'SELECT id FROM gdoks_usuarios WHERE token=? and validade_do_token>now()';
	$resultado = $db->query($sql,'s',$_COOKIE['token']);
	if(sizeof($resultado) == 0){
		// redirecionando para página inicial.
		header("Location: /webapp/login.php");
		die();
	}

	// definindo o IDU como sendo o id do usuário
	$IDU = $resultado[0]['id'];

?>