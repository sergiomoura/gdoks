<?php
	// Definindo constante de token
	define('TOKEN','dk39fjtoiw94m54ikfdysbxc0387m348psa28458d');

	// Matando o processo caso o token não seja válido
	if(!array_key_exists('token', $_GET) || $_GET['token'] != TOKEN) die();
?>