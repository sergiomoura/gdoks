<?php 
	// Definindo empresa: futuramente, carregado do GET
	$empresa = 'Faraday';

	// datafolder <== futuramente from get
	$datafolder = "../../dados/packs/".$empresa.'/';

	// include no db.php
	include('../../includes/db.php');

	// Criando empresa
	$sql = 'INSERT INTO empresas (nome) VALUES (?)';
	$db->query($sql,'?',$empresa);
	$id_empresa = $db->insert_id;

	// carregando arquivos de disciplinas
	$disciplinas = json_decode(file_get_contents($datafolder.'disciplinas.json'));

	// inserindo disciplinas
	foreach ($disciplinas as $d) {
		$sql = 'INSERT INTO gdoks_disciplinas (sigla,nome) VALUES (?,?)';
		$db->query($sql,'',);
	}

	
	print_r($disciplinas);
	echo('</pre>');
	die();
?>