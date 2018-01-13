<?php
	// Determinando se a pasta do cliente existe
	$pasta = '../../../client_data/'.$_GET['e'];

	if(file_exists($pasta)){
		
		// determinando o nome do arquivo da logo
		$logoFile = $pasta.'/logo.jpg';

		// send the right headers
		header("Content-Type: image/jpg");
		header("Content-Length: " . filesize($logoFile));
		readfile($logoFile);
		exit;
	}