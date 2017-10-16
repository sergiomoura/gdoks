<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
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

		// determinando dumb string
		$lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam omnis aliquid, dolorem dolore nulla illum aliquam. Assumenda eveniet sint recusandae, quidem placeat libero dolore minima, sunt voluptas quae, fugit dicta?";
		
		// Levantando nomes dos arquivos
		$sql = 'SELECT id, caminho FROM gdoks_arquivos';
		$arquivos = array_map(function($a){return (object)$a;}, $db->query($sql));
		$uploads = '../../uploads/';
		
		foreach ($arquivos as $a) {

			// Descobrindo o id do projeto a partir do caminho
			$id_prj = substr($a->caminho,2,strpos(substr($a->caminho,2),'/'));

			// Criando pasta do projeto
			@mkdir($uploads.'1/'.$id_prj);

			// gerando string aleatória
			$string = '';
			for ($i=0; $i < rand(0,5); $i++) { 
				$string .= $lorem;
			}

			$size = file_put_contents($uploads.$a->caminho, $string);

			if($size === false){
				echo("Falhou\n");
			} else {
				echo(' Criou o arquivo ../../uploads/'.$a->caminho."\n");
				// atualizando base de dados com o tamanho do arquivo
				$sql = 'UPDATE gdoks_arquivos SET tamanho=? WHERE id=?';
				$db->query($sql,'ii',$size,$a->id);
			}
		}
	?></pre>
</body>
</html>