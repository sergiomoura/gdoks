<?php
	// Definindo constante de token
	include('contantes.php');

	// Matando o processo caso o token não seja válido
	if(!array_key_exists('token', $_GET) || $_GET['token'] != TOKEN) die();
?>