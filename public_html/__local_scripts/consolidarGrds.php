<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<pre>
<?php
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

		// CONSISTÊNCIA revisões que fazem parte da grd devem ser de documentos do mesmo projeto da grd
			echo("Levantando os itens de grd que representam revisões de documentos de projetos diferentes ao projeto da grd\n");
			ob_flush();
			$sql = 'SELECT id_item_grd
					FROM
					  (SELECT a.id AS id_item_grd,
					          a.id_grd,
					          a.id_revisao,
					          b.id_projeto AS id_projeto_da_grd
					   FROM gdoks_grds_x_revisoes a
					   INNER JOIN gdoks_grds b ON a.id_grd=b.id) X
					LEFT JOIN
					  (SELECT a.id AS id_revisao,
					          d.id_projeto AS id_projeto_da_revisao
					   FROM gdoks_revisoes a
					   INNER JOIN gdoks_documentos b ON a.id_documento=b.id
					   INNER JOIN gdoks_subareas c ON c.id=b.id_subarea
					   INNER JOIN gdoks_areas d ON d.id=c.id_area) Y ON Y.id_revisao=X.id_revisao
					WHERE id_projeto_da_grd!=id_projeto_da_revisao
					ORDER BY id_grd';
			$itensDeGrdsInconscistentes = array_map(function($a){return $a['id_item_grd'];}, $db->query($sql));

			echo("Removendo os itens inconsistentes\n");
			ob_flush();
			$sql = 'DELETE FROM gdoks_grds_x_revisoes WHERE id=?';
			foreach ($itensDeGrdsInconscistentes as $id_item) {
				$db->query($sql,'i',$id_item);
			}
			echo("Feito!\n");
			echo("---------------------------------------------------\n");
			ob_flush();
		// fim
	?>
</pre>	
</body>
</html>
	