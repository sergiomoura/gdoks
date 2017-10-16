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

		// CONSISTÊNCIA DE PDAS PUBLICADOS POR ESPECIALISTAS
			echo("Levantando os pdas publicados por usuários que não são especialistas da disciplina\n");
			ob_flush();
			$sql = 'SELECT id_pda
					FROM
					  ( SELECT a.id AS id_pda,
					           a.idu AS idu_pda,
					           d.id_disciplina
					   FROM gdoks_pdas a
					   INNER JOIN gdoks_revisoes b ON a.id_revisao=b.id
					   INNER JOIN gdoks_documentos c ON b.id_documento= c.id
					   INNER JOIN gdoks_subdisciplinas d ON c.id_subdisciplina=d.id
					   WHERE a.idu IS NOT NULL) X
					LEFT JOIN gdoks_especialistas Y ON (Y.id_usuario=X.idu_pda
					                                    AND Y.id_disciplina=X.id_disciplina)
					WHERE !isnull(id_usuario)=0';
			$pdas_inconscistentes = array_map(function($a){return $a['id_pda'];}, $db->query($sql));

			echo("Removendo os pdas inconsistentes\n");
			ob_flush();
			$sql = 'DELETE FROM gdoks_pdas WHERE id=?';
			foreach ($pdas_inconscistentes as $id_pda) {
				$db->query($sql,'i',$id_pda);
			}
			echo("Feito!\n");
			echo("---------------------------------------------------\n");
			ob_flush();
		// fim

		// CONSITENCIA DE PDAS VALIDADOS POR VALIDADORES
			echo("Levantando os pdas validados por usuários que não são especialistas da disciplina\n");
			ob_flush();
			$sql = 'SELECT id_pda
					FROM
					  (SELECT a.id AS id_pda,
					          a.idu_validador,
					          d.id_disciplina
					   FROM gdoks_pdas a
					   INNER JOIN gdoks_revisoes b ON a.id_revisao=b.id
					   INNER JOIN gdoks_documentos c ON b.id_documento= c.id
					   INNER JOIN gdoks_subdisciplinas d ON c.id_subdisciplina=d.id
					   WHERE a.idu_validador IS NOT NULL) X
					LEFT JOIN gdoks_validadores Y ON X.idu_validador=Y.id_usuario
					AND X.id_disciplina=Y.id_disciplina
					WHERE id_usuario IS NULL;';
			$pdas_inconscistentes = array_map(function($a){return $a['id_pda'];}, $db->query($sql));
			echo("Removendo os pdas inconsistentes\n");
			ob_flush();
			$sql = 'DELETE FROM gdoks_pdas WHERE id=?';
			foreach ($pdas_inconscistentes as $id_pda) {
				$db->query($sql,'i',$id_pda);
			}
			echo("Feito!\n");
			echo("---------------------------------------------------\n");
			ob_flush();
		// fim

		// CONSISTÊNCIA DE PDAS TEREM UM PROGRESSO TOTAL CRESCENTE
			echo("Garantindo que PDAs tenham progresso total crescente.\n");
			ob_flush();
			$sql = 'SELECT id,
			       progresso_total,
			       id_revisao
			FROM gdoks_pdas
			ORDER BY id_revisao,
			         id';
			$pdas= $db->query($sql);
			$progresso = 0;
			$id_rev_anterior = 0;
			for ($i=0; $i < sizeof($pdas); $i++) { 
				$pda = $pdas[$i];
				if($pda['id_revisao']==$id_rev_anterior){
					$progresso = min(100,$progresso + rand(40,70));
					$sql = 'UPDATE gdoks_pdas SET progresso_total=? WHERE id=?';
					$db->query($sql,'ii',$progresso,$pda['id']);
				} else {
					$progresso = rand(40,70);
					$sql = 'UPDATE gdoks_pdas SET progresso_total=? WHERE id=?';
					$db->query($sql,'ii',$progresso,$pda['id']);
				}
				$id_rev_anterior = $pda['id_revisao'];
			}
			echo("Feito!\n");
			echo("---------------------------------------------------\n");
			ob_flush();
		// fim

		// CONSISTENCIA DE PDA NÃO VALIDADO NÃO PODE SER SUCEDIDO POR PDA VALIDADO
			echo("Levantando pdas não validados sucedidos por pda validado...\n");
			ob_flush();
			$sql = 'SELECT id,
					       id_revisao,
					       idu_validador,
					       datahora_validacao
					FROM gdoks_pdas
					ORDER BY id_revisao,
					         id DESC';
			$pdas = $db->query($sql);
			echo("Levantados. Consertando...\n");
			ob_flush();
			$id_rev_anterior = 0;
			for ($i=0; $i < sizeof($pdas); $i++) { 
				$pda = $pdas[$i];
				if($pda['id_revisao']==$id_rev_anterior){

					// caso o pda atual não tenha sido validado e o anterior tmb não, apaga pda anterior
					if(is_null($validador_atual) && is_null($pda['idu_validador'])){
						$sql = 'DELETE FROM gdoks_pdas WHERE id=?';
						$db->query($sql,'i',$pda['id']);
					}

					// caso o pda atual tenha sido validado o anterior também deve estar. caso não esteja marque-o como validado
					if(is_numeric($validador_atual) && is_null($pda['idu_validador'])){
						$sql = 'UPDATE gdoks_pdas SET idu_validador=?,datahora_validacao=NOW() WHERE id=?';
						$db->query($sql,'ii',$validador_atual,$pda['id']);
					}
					$validador_atual = $pda['idu_validador'];
				} else {
					$validador_atual = $pda['idu_validador'];
				}
				$id_rev_anterior = $pda['id_revisao'];
			}
			echo("Feito!\n");
			echo("---------------------------------------------------\n");
			ob_flush();
		// fim
		
		// RENUMERANTO PDAs
			echo("Renumerando pdas.\n");
			ob_flush();

			// listando pdas
			$sql = 'SELECT id FROM gdoks_pdas order by id';
			$pdas = array_map(function($a){return $a['id'];}, $db->query($sql));
			$n = sizeof($pdas);

			// fazendo atualizações...
			$sql = 'UPDATE gdoks_pdas SET id=? WHERE id=?';
			for ($i=0; $i < $n; $i++) { 
				$db->query($sql,'ii',$i+1,$pdas[$i]);
			}

			// setando auto increment da tabela para $n+1
			$sql = 'ALTER TABLE gdoks_pdas AUTO_INCREMENT='.($n+1);
			$db->query($sql);

			echo("Feito!\n");
			echo("---------------------------------------------------\n");
			ob_flush();
		// fim

		// CONSISTÊNCIA DE progresso validado e progresso a validar na tabela de revisões
			echo("Garantindo que progresso validado e progresso a validar na tabela de revisões estejam de acordo com a tabela de pdas.\n");
			ob_flush();
			$sql = 'SELECT id,id_revisao,progresso_total,!isnull(idu_validador) AS validado
					FROM gdoks_pdas
					ORDER BY id_revisao,
					         id';
			$pdas= $db->query($sql);
			$progresso_anterior = 0;
			$anterior_validado = true;
			$id_rev_anterior = 0;
			for ($i=0; $i < sizeof($pdas); $i++) { 
				$pda = $pdas[$i];

				// atualizando cursor...
				$progresso_atual = $pda['progresso_total'];
				$atual_validado = ($pda['validado']==1);

				// sql a ser executado
				$sql = 'UPDATE gdoks_revisoes SET progresso_validado=?,progresso_a_validar=? WHERE id=?';

				// definindo o que fazer
				if($pda['id_revisao']==$id_rev_anterior){
					if($anterior_validado && !$atual_validado){
						$db->query($sql,'iii',$progresso_anterior,$progresso_atual-$progresso_anterior,$pda['id_revisao']);
					} elseif($anterior_validado && $atual_validado){
						$db->query($sql,'iii',$progresso_atual,0,$pda['id_revisao']);
					}
				} else {
					if($atual_validado){
						$db->query($sql,'iii',$progresso_atual,0,$pda['id_revisao']);
					} else {
						$db->query($sql,'iii',0,$progresso_atual,$pda['id_revisao']);
					}
				}

				// atualizando cursor...
				$progresso_anterior = $pda['progresso_total'];
				$anterior_validado = ($pda['validado']==1);
				$id_rev_anterior = $pda['id_revisao'];
			}
			echo("Feito!\n");
			echo("---------------------------------------------------\n");
			ob_flush();
		//

		die();
	?>
</pre>	
</body>
</html>
	