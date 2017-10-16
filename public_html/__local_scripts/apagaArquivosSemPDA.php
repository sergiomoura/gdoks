<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Deleta arquivos na base sem pdas</title>
</head>
<body>
	<pre><?php

		// Aumentando o limite para o tempo de execução
		set_time_limit(120);

		// Iniciando o output buffer
		ob_start();
		ob_flush();

		// lendo empresa do get
		$empresa = $_GET['empresa'];

		// carregando dbkeys da empresa
		include('../../client_data/'.$empresa.'/dbkey.php');

		// Criando conexão com banco de dados
		include('../../includes/db.php');
		$db = new DB($dbkey);

		// Levantando os ids dos arquivos registrados na base que não pertencem a nenhum PDA
		$sql = 'SELECT id
				FROM
				  (SELECT a.id,
				          count(b.id) AS n
				   FROM gdoks_arquivos a
				   LEFT JOIN gdoks_pdas_x_arquivos b ON a.id=b.id_arquivo
				   GROUP BY a.id) X
				WHERE X.n=0';
		$idsDegenerados = array_map(function($a){return $a['id'];}, $db->query($sql));

		// removendo
		$bigOr = "id=".implode(' OR id=', $idsDegenerados);
		$sql = 'DELETE from gdoks_arquivos WHERE '.$bigOr;
		$db->query($sql);
		echo("Feito!");
	?></pre>
</body>
</html>