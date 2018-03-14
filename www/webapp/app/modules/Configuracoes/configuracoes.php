<?php
	// Incluindo o blocker de tela.
	include('blocker_tela.php');

	// Carregando configurações da empresa
	$conf = GDoks::getConf($user->empresa);

	echo('<pre>');
	print_r($conf);
	echo('</pre>');
	die();

?>
