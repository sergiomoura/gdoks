<?php
	// Configurando a descrição do erro at runtime
	error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
	ini_set('display_errors', 1);

	// Determinando o timezone America/Sao_Paulo
	ini_set('date.timezone', 'America/Sao_Paulo');

	// Required files - - - - - - - - - - - - - - - - - - -
	require('vendor/autoload.php');
	require('constantes.php');
	require('db.php');
	require('definicoes_de_acoes.php');
	require('response.php');
	require('GDoks/GDoks.php');
	require('GDoks/Grd.php');
	require('GDoks/Crypter.php');

	// Definindo o timezone padrão
	date_default_timezone_set('America/Sao_Paulo');
		
	// definindo função getallheaders caso ela não exista (caso NGINX)
	if (!function_exists('getallheaders')){ 
		function getallheaders(){ 
			$headers = [];
			foreach ($_SERVER as $name => $value){
				if (substr($name, 0, 5) == 'HTTP_'){
					$headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
				}
			}
			return $headers;
		}
	}

	// lendo informações no header
	$headers = getallheaders();
	if ( array_key_exists('Authorization', $headers) && $headers['Authorization'] != '' && !is_null($headers['Authorization']) ){
		// definindo iddb e token a partir do header
		$empresa =  explode('-', $headers['Authorization'])[0];
		$token = explode('-', $headers['Authorization'])[1];
	} elseif (isset($_COOKIE['user'])) {
		// se informação não está no header, talvez esteja no cookie para requisições de download
		$user = json_decode($_COOKIE['user']);
		$empresa = $user->empresa;
		$token = $user->token;
	}

	// Definindo os nomes dos arquivos do cliente;
	$FILE_DBKEY = CLIENT_DATA_PATH.$empresa.'/dbkey.php';
	$FILE_GRD = CLIENT_DATA_PATH.$empresa.'/grd.php';
	$FILE_LOGO = CLIENT_DATA_PATH.$empresa.'/logo.jpg';
	$FILE_CONFIG = CLIENT_DATA_PATH.$empresa.'/config.json';
	
	// criando a conexão
	if(isset($empresa) && file_exists($FILE_DBKEY)){
		// incluindo arquivo que define $dbkey
		include($FILE_DBKEY);

		// Criando conexão
		$db = new DB($dbkey);

		// salvando o id_empresa
		$id_empresa = $dbkey->ID_EMPRESA;

	} else {
		// Arquivo não existe. Sem Autorização
		sleep(1);
		http_response_code(403);
		$response = new response(1,'Sem autorização');
		$response->flush();
		exit(1);
	}
	
	// definindo função que realiza log
	function registrarAcao($db,$idUsuario,$idAcao,$parametros = ''){

		// definindo tamanho máximo do parâmetro
		$param_maxlen = 256;
		if($parametros == ''){
			$sql = 'INSERT INTO gdoks_log (id_usuario,id_acao,data) values (?,?,now())';
			$result = $db->query($sql,'ii',$idUsuario,$idAcao);
		} else {
			$sql = 'INSERT INTO gdoks_log (id_usuario,id_acao,data,parametros) values (?,?,now(),?)';
			$result = $db->query($sql,'iis',$idUsuario,$idAcao,substr($parametros, 0,$param_maxlen));
		}
	}

	// Definindo função que registra acesso ao projeto no histórico
	function addInHistProj($id_projeto,$id_usuario,$db,$config){

		// Diminuindo um na ordem de todos os do histórico de projetos
		$sql = 'UPDATE gdoks_hist_prjs SET ordem=ordem-1 WHERE id_usuario=?';
		$db->query($sql,'i',$id_usuario);

		// Deletando todos os registro do histórico que tenham ordem menor que 1
		$sql = 'DELETE FROM gdoks_hist_prjs WHERE ordem<1 AND id_usuario=?';
		$db->query($sql,'i',$id_usuario);

		// Pondo o novo elemento no histórico com ordem MAX_HIST_PRJS
		$sql = 'REPLACE INTO gdoks_hist_prjs (id_projeto,id_usuario,ordem) VALUES (?,?,?)';
		$db->query($sql,'iii',$id_projeto,$id_usuario,$config->MAX_HIST_PRJS->valor);

	};

	// Carregando configurações da empresa
	$config = json_decode(file_get_contents($FILE_CONFIG));
	
	// defining api - - - - - - - - - - - - - - - - - - - -
	$app = new \Slim\Slim();

	// Definindo BaseRoute para dunciconar tanto no PHPBuiltInServer quanto no Apache
	$resourceUri = $app->request->getResourceUri();
	if(substr($resourceUri, 0, 3) == '/v1'){
		$baseRoute = '/v1';
	} else {
		$baseRoute = '/api/v1';
	}

	// defining api routes  V1 = = = = = = = = = = = = = = = =
	$app->group($baseRoute,function() use($app,$db,$id_empresa,$token,$empresa,$config){
		
		// LOGIN ROUTE DEFINITION - - - - - - - - - - - - -
			$app->post('/login/',function() use ($app,$db,$id_empresa,$empresa){
				
				// lendo dados da requisição
				$data = json_decode($app->request->getBody());
				
				// Verificando se é usuário é válido e carregando suas informações se for o caso.
				$sql = 'SELECT id,
							   nome,
							   login,
							   email,
						       count(*)=1 AS ok
						FROM
							gdoks_usuarios
						WHERE login=?
						  AND senha=PASSWORD(?)
						  AND id_empresa=?
						  AND ativo';
				$rs = $db->query($sql,'ssi',$data->login,$data->senha,$id_empresa)[0];
				
				// perguntando se usuário é válido
				if($rs['ok'] == 1){
					// SIM, usuário é válido
					// gerando novo token
					$token = uniqid('',true);
					
					// atualizando o token na base de dados
					$db->query('update gdoks_usuarios set token=?, validade_do_token=? where id=?','ssi',$token,Date('Y-m-d H:i:s',time()+TOKEN_DURARION),$rs['id']);
					
					// Arrumando dados do usuário
					$user = new stdClass();
					$user->id = $rs['id'];
					$user->nome = $rs['nome'];
					$user->email = $rs['email'];
					$user->token = $token;
					$user->empresa = $empresa;
					
					// definindo resposta http como 200
					$app->response->setStatus(200);
					$response = new response(0,'ok');

					// Adicionando as informações do usuário no response
					$response->user = $user;
					
					// Enviando resposta.	
					$response->flush();

					// registrando a ação no log
					registrarAcao($db,$user->id,ACAO_LOGOU);

					// Finalizando com sucesso
					exit(0);

				} else {
					// Não! usuário não é válido.
					// Preparando resposta negativa
					http_response_code(401);
					$response = new response(1,'Login falhou!!!');

					// Enviando resposta.	
					$response->flush();

					// Finalizando com falha
					exit(1);
				}
			});
		
		// LOGIN REFRESH ROUTE DEFINITION - - - - - - - - -
			$app->get('/refresh',function() use ($app,$db,$token){
				$rs = $db->query('select id from gdoks_usuarios where token=? and validade_do_token>now()','s',$token);
				if(sizeof($rs) == 0){
					http_response_code(401);
					$response = new response(1,'Não renovou token: '.$token);
					$response->flush();
					exit(1);
				} else {
					$new_token = uniqid('',true);
					$id = $rs[0]['id'];
					try {
						$db->query('update gdoks_usuarios set token=?, validade_do_token=? where id=?','ssi',$new_token,Date('Y-m-d H:i:s',time()+TOKEN_DURARION),$id);
						$app->response->setStatus(200);
						$response = new response(0,'ok');
						$response->token = $new_token;
						$response->flush();
					} catch (Exception $e) {
						$app->response->setStatus(500);
						$response = new response(1,'Falha na consulta sql:'.$e);
						$response->flush();
						exit(1);
					}
				}
			});

		// DEFINIÇÃO DE MUDA LOGIN/SENHA
			$app->post('/mudaLoginSenha',function() use ($app,$db,$token){
				// lendo dados da requisição
				$data = json_decode($app->request->getBody());
				
				// Verificando se o token existe e se ele ainda é válido.
				$rs = $db->query('select id from gdoks_usuarios where token=? and validade_do_token>now()','s',$token);
				if(sizeof($rs)==0){
					// Retonando não autorizado
					http_response_code(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					exit(1);
				} else {
					// Atualizando informações do usuário
					$id = $rs[0]['id'];
					if($data->novaSenha == ''){
						// Altera só o login sem alterar senha.
						$sql = "UPDATE gdoks_usuarios set login=? WHERE id=?";
						try {
							$db->query($sql,'si',$data->novoLogin,$id);
							$response = new response(0,'ok');
							$ok = true;
						} catch (Exception $e) {
							$app->response->setStatus(402);
							$response = new response(1,'Login já cadastrado para outro usuário.');
							$ok = false;
						}

						// registrando ação no log caso tenha obtido sucesso
						if($ok){registrarAcao($db,$id,ACAO_ALTEROU_DADOS_PESSOAIS);};
					} else {
						// Altera login e senha.
						$sql = "UPDATE gdoks_usuarios set login=?,senha=PASSWORD(?) WHERE id=?";
						try {
							$db->query($sql,'ssi',$data->novoLogin,$data->novaSenha,$id);
							$response = new response(0,'ok');
							$ok = true;
						} catch (Exception $e) {
							$app->response->setStatus(402);
							$response = new response(1,'Login já cadastrado para outro usuário.');
							$ok = false;
						}
						// registrando ação no log caso tenha obtido sucesso
						if($ok){registrarAcao($db,$id,ACAO_ALTEROU_DADOS_PESSOAIS);};
					}
					$response->flush();
				}
			});
		
		// ROTAS DE USUÁRIOS
			$app->get('/usuarios',function() use ($app,$db,$token){
				$sql = 'SELECT a.id,
						       a.login,
						       a.nome,
						       a.email,
						       a.ativo,
						       a.sigla
						FROM gdoks_usuarios a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
							ORDER by a.nome';
				$response = new response(0,'ok');
				$response->usuarios = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->get('/usuarios/:id_usuario/telas',function($id_usuario) use ($app,$db,$token){
				// Verificando se o usuário logado e o usuário em questão são da mesma empresa
				$sql = 'SELECT count(*) AS ok
						FROM gdoks_usuarios a
						INNER JOIN gdoks_usuarios b ON a.token=?
						AND b.id=?
						AND a.id_empresa=b.id_empresa';
				$ok = $db->query($sql,'si',$token,$id_usuario)[0]['ok']==1;

				if($ok){
					// levantando telas do usuário
					$sql = 'SELECT id_tela AS id
							FROM gdoks_usuarios_x_telas
							WHERE id_usuario=?';
					$telas = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_usuario));

					// levantando opções de tela do usuário
					$sql = 'SELECT id_opcao as id,valor FROM gdoks_usuarios_x_opcoes_de_tela WHERE id_usuario=? AND id_tela=?';
					foreach ($telas as $tela) {
						$tela->opcoes = $db->query($sql,'ii',$id_usuario,$tela->id);
					}
					
					// retornando as telas
					$response = new response(0,'ok');
					$response->telas = $telas;
					$response->flush();
				} else {
					http_response_code(401);
					$response = new response(1,'Não pode acessar os dados de outras empresas.');
					$response->flush();
					exit(1);
				}
			});

			$app->put('/usuarios/:id_usuario/telas',function($id_usuario) use ($app,$db,$token){
				// Lendo body
				$telas = json_decode($app->request->getBody());
				
				// Verificando se o usuário logado e o usuário em questão são da mesma empresa
				$sql = 'SELECT count(*) AS ok
						FROM gdoks_usuarios a
						INNER JOIN gdoks_usuarios b ON a.token=?
						AND b.id=?
						AND a.id_empresa=b.id_empresa';
				$ok = $db->query($sql,'si',$token,$id_usuario)[0]['ok']==1;

				if($ok){
					// Removendo telas antigas do usuário
					$sql = 'DELETE from gdoks_usuarios_x_telas WHERE id_usuario=?';
					$db->query($sql,'i',$id_usuario);
					
					// Inserindo novas telas para o usuário
					$sql_1 = 'INSERT INTO gdoks_usuarios_x_telas (id_tela,id_usuario) VALUES (?,?)';
					foreach ($telas as $tela) {
						$db->query($sql_1,'ii',$tela->id,$id_usuario);
						
						// Inserindo as opcoes de tela
						$sql_2 = 'INSERT INTO gdoks_usuarios_x_opcoes_de_tela (id_tela,id_usuario,id_opcao,valor) VALUES (?,?,?,?)';
						foreach ($tela->opcoes as $opcao) {
							$db->query($sql_2,'iiii',$tela->id,$id_usuario,$opcao->id,$opcao->valor);
						}
					}

					// retornando as telas
					$response = new response(0,'ok');
					$response->flush();
				} else {
					http_response_code(401);
					$response = new response(1,'Não pode acessar os dados de outras empresas.');
					$response->flush();
					return;
				}
			});

			$app->put('/usuarios/:id',function($id) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id = 1*$id;
				$usuario = json_decode($app->request->getBody());

				// verificando se o usário enviado é do mesmo cliente do usuário atual
				$sql = 'SELECT
							A.id,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks_usuarios
								WHERE id=?) B on A.id_empresa=B.id_empresa;';
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];
				$id = $rs['id'];
				if($ok == 1){
					// Tudo ok! O usuário a ser alterado é do cliente
					
					// atualizando dados do usuário.
					if(!isset($usuario->senha1) || $usuario->senha1 == ''){

						// NÃO alterar senha do usuário
						$sql = 'UPDATE gdoks_usuarios SET nome=?,email=?,login=?,ativo=?,sigla=? WHERE id=?';
						try {
							$db->query($sql,'sssisi',$usuario->nome,$usuario->email,$usuario->login,$usuario->ativo,$usuario->sigla,$usuario->id);	
							$response = new response(0,'Usuário alterado com sucesso.');
							$response->flush();
						} catch (Exception $e) {
							http_response_code(401);
							$response = new response(1,'Já existe um usuário cadastrado com este login, email ou sigla.');
							$response->flush();
							exit(1);
						}
						// Registrando a ação
						registrarAcao($db,$id,ACAO_ALTEROU_DADOS_DE_USUARIO,$usuario->nome.','.$usuario->email.','.$usuario->login.','.($usuario->ativo==true?1:0));
					} else {
						// Alterar a senha do usuário
						$sql = 'UPDATE gdoks_usuarios SET nome=?, email=?, login=?, senha=PASSWORD(?), ativo=?, sigla=? WHERE id=?';
						try {
							$db->query($sql,'ssssisi',$usuario->nome,$usuario->email,$usuario->login,$usuario->senha1,$usuario->ativo,$usuario->sigla,$usuario->id);	
							$response = new response(0,'Usuário alterado com sucesso.');
							$response->flush();
						} catch (Exception $e) {
							http_response_code(401);
							$response = new response(1,'Já existe um usuário cadastrado com este login ou sigla');
							$response->flush();
							exit(1);
						}
						// Registrando a ação
						registrarAcao($db,$id,ACAO_ALTEROU_DADOS_DE_USUARIO,$usuario->nome.','.$usuario->email.','.$usuario->login.','.$usuario->ativo);
					}
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					exit(1);
				}
			});

			$app->post('/usuarios',function() use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$usuario = json_decode($app->request->getBody());

				// Capturando o id e o id_empresa do usuário atual
				$sql = 'SELECT
							id,id_empresa
						FROM 
							gdoks_usuarios
						WHERE
							token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token)[0];
				$id_empresa = $rs['id_empresa'];
				$id = $rs['id'];

				// Inserindo novo usuário.
				$sql = 'INSERT INTO gdoks_usuarios (nome,email,login,senha,id_empresa,ativo,sigla) VALUES (?,?,?,PASSWORD(?),?,?,?)';
				try {
					$db->query($sql,'ssssiis',$usuario->nome,$usuario->email,$usuario->login,$usuario->senha1,$id_empresa,$usuario->ativo,$usuario->sigla);
					$response = new response(0,'Usuário criado com sucesso.');
					$response->newId = $db->insert_id;
					$response->flush();
				} catch (Exception $e) {
					http_response_code(401);
					$response = new response(1,'Já existe um usuário cadastrado com este login ou sigla.:'.$e->getMessage());
					$response->flush();
					exit(1);
				}
				// Registrando a ação
				registrarAcao($db,$id,ACAO_CRIOU_USUARIO,$usuario->nome.','.$usuario->email.','.$usuario->login.','.$usuario->ativo);
			});
		// FIM DE ROTAS DE USUÁRIOS
		
		// ROTAS DE DADOS PARA VISÃO GERAL
			$app->get('/visaogeral',function() use ($app,$db,$token){
				// Verificando se o token do usuário é válido
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=?
						  AND validade_do_token>NOW()';
				$rs = $db->query($sql,'s',$token);
				if(sizeof($rs) == 0){
					http_response_code(401);
					$response = new response(1,'Token inválido');
					$response->flush();
					exit(1);
				}

				// Objeto de resposta de sucesso
				$response = new response(0,'ok');

				// Levantando quantos documentos de projeto ativo nós tempos
				$sql = 'SELECT count(*) as n_docs
						FROM
						  (SELECT a.id,
						          max(e.id) AS id_revisao
						   FROM gdoks_documentos a
						   INNER JOIN gdoks_subareas b ON a.id_subarea=b.id
						   INNER JOIN gdoks_areas c ON b.id_area=c.id
						   INNER JOIN gdoks_projetos d ON c.id_projeto=d.id
						   LEFT JOIN gdoks_revisoes e ON e.id_documento=a.id
						   WHERE d.ativo
						   GROUP BY a.id) A
						INNER JOIN gdoks_revisoes B ON A.id_revisao=B.id;';
				try {
					$n_docs = ($db->query($sql))[0]['n_docs'];
				} catch (Exception $e) {
					http_response_code(401);
					$response = new response(1,$e->getMessage());
					$response->flush();
					exit(1);					
				}

				// Levantando progresso total dos documentos de projetos ativos
				$sql = 'SELECT sum(B.progresso_validado) as progresso_total
						FROM
						  (SELECT a.id,
						          max(e.id) AS id_revisao
						   FROM gdoks_documentos a
						   INNER JOIN gdoks_subareas b ON a.id_subarea=b.id
						   INNER JOIN gdoks_areas c ON b.id_area=c.id
						   INNER JOIN gdoks_projetos d ON c.id_projeto=d.id
						   LEFT JOIN gdoks_revisoes e ON e.id_documento=a.id
						   WHERE d.ativo
						   GROUP BY a.id) A
						INNER JOIN gdoks_revisoes B ON A.id_revisao=B.id;';

				try {
					$progresso_total = ($db->query($sql))[0]['progresso_total'];
				} catch (Exception $e) {
					http_response_code(401);
					$response = new response(1,$e->getMessage());
					$response->flush();
					exit(1);					
				}

				// Levantando a quantidade de documentos concluidos
				$sql = 'SELECT count(*) n_docs_concluidos
						FROM
						  (SELECT a.id,
						          max(e.id) AS id_revisao
						   FROM gdoks_documentos a
						   INNER JOIN gdoks_subareas b ON a.id_subarea=b.id
						   INNER JOIN gdoks_areas c ON b.id_area=c.id
						   INNER JOIN gdoks_projetos d ON c.id_projeto=d.id
						   LEFT JOIN gdoks_revisoes e ON e.id_documento=a.id
						   WHERE d.ativo AND a.idu_checkout IS NOT NULL
						   GROUP BY a.id) A
						INNER JOIN gdoks_revisoes B ON A.id_revisao=B.id
						WHERE B.progresso_validado=100;';

				try {
					$n_docs_concluidos = $db->query($sql)[0]['n_docs_concluidos'];
				} catch (Exception $e) {
					http_response_code(401);
					$response = new response(1,$e->getMessage());
					$response->flush();
					exit(1);					
				}

				// Levantando a quantidade de documentos em revisao
				$sql = 'SELECT count(*) n_docs_em_revisao
						FROM gdoks_documentos a
						INNER JOIN gdoks_subareas b ON a.id_subarea=b.id
						INNER JOIN gdoks_areas c ON b.id_area=c.id
						INNER JOIN gdoks_projetos d ON c.id_projeto=d.id
						LEFT JOIN gdoks_revisoes e ON e.id_documento=a.id
						WHERE d.ativo
						  AND a.idu_checkout IS NOT NULL
						  AND e.progresso_validado<100';
				try {
					$n_docs_em_revisao = $db->query($sql)[0]['n_docs_em_revisao'];
				} catch (Exception $e) {
					http_response_code(401);
					$response = new response(1,$e->getMessage());
					$response->flush();
					exit(1);					
				}

				// Determinando datas de intervalos de grds
				$n_intervalos = 8;

				// Determinando n_dias para a data inicial
				$n_dias = new DateInterval('P'. (date('N')*1 + (($n_intervalos - 1) * 7) -1) .'D');

				// Determinando a data inicial: hoje + (7 - d) - 42dias
				$data_inicial = (new DateTime(date('Y-m-d')))->sub($n_dias);

				// Declarando vetor de intervalos
				$intervalos = Array();

				// Construindo vetor de intervalos
				$sql = 'SELECT count(*) as n_grds from gdoks_grds WHERE datahora_enviada>=? AND  datahora_enviada<?';
				for ($i=0; $i < $n_intervalos; $i++) { 
					$intervalo = new stdClass();
					$intervalo->i = $data_inicial->format('Y-m-d');
					$intervalo->n = $db->query($sql,'ss',$intervalo->i,($data_inicial->add(new DateInterval('P7D')))->format('Y-m-d'))[0]['n_grds'];
					array_push($intervalos, $intervalo);
				}

				// Determinando o progresso_geral
				$response->progresso_geral = ($n_docs==0 ? 0 : $progresso_total/$n_docs);
				$response->n_docs_concluidos = $n_docs_concluidos;
				$response->n_docs_em_revisao = $n_docs_em_revisao;
				$response->n_docs_parados = $n_docs - $n_docs_concluidos - $n_docs_em_revisao;
				$response->n_docs = $n_docs;
				$response->n_grds = $intervalos;

				// Enviando resposta de sucesso para o cliente
				$response->flush();

			});
		// FIM DE ROTAS DE DADOS PARA VISÃO GERAL

		// ROTAS DE DISCIPLINAS
			$app->get('/disciplinas',function() use ($app,$db,$token){
				// lendo o token

				// carregando as disciplinas
				$sql = 'SELECT a.id,
						       a.nome,
						       a.sigla,
						       a.ativa
						FROM gdoks_disciplinas a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
							ORDER by a.nome';
				$disciplinas = array_map(function($a){return (object)$a;}, $db->query($sql,'s',$token));

				// carregando as subdisciplinas
				$sql = 'SELECT a.id_disciplina,
						       a.id,
						       a.nome,
						       a.sigla,
						       a.ativa
						FROM gdoks_subdisciplinas a
						INNER JOIN gdoks_disciplinas b ON a.id_disciplina=b.id
						INNER JOIN gdoks_usuarios c ON c.id_empresa=b.id_empresa
						WHERE c.token=?';
				$subdisciplinas = array_map(function($a){return (object)$a;}, $db->query($sql,'s',$token));

				foreach ($disciplinas as $d) {
					// filtrando somente subdisciplinas da disciplina em questão
					$id = $d->id;
					$subsDestaDisciplina = array_filter($subdisciplinas,function($e) USE ($id){
						return $e->id_disciplina == $id;
					});
					
					// mapeando o vetor para mostrar somente os ids das subdisciplinas	
					$d->subs = array_values(array_map(
						function($a){
							return (object)Array(
								'id'=>(1*$a->id),
								'nome'=>$a->nome,
								'sigla'=>$a->sigla,
								'ativa'=>$a->ativa
							);
						}, $subsDestaDisciplina));
				}

				// carregando especialistas das disciplinas
				$sql = 'SELECT a.id_disciplina,
						       a.id_usuario as id
						FROM gdoks_especialistas a
						INNER JOIN gdoks_disciplinas b ON a.id_disciplina=b.id
						INNER JOIN gdoks_usuarios c ON c.id_empresa=b.id_empresa
						WHERE c.token=?';
				$especialistas = array_map(function($a){return (object)$a;}, $db->query($sql,'s',$token));

				foreach ($disciplinas as $d) {
					// filtrando somente especialistas da disciplina em questão
					$id = $d->id;
					$especialistasDestaDisciplina = array_filter($especialistas,function($a) USE ($id){
						return $a->id_disciplina == $id;
					});
					
					// mapeando o vetor para mostrar somente os ids dos especialistas
					$d->especialistas = array_values(array_map(function($a){return 1*$a->id;}, $especialistasDestaDisciplina));
				}

				// Carregando validadores
				$sql = 'SELECT a.id_disciplina,
						       a.id_usuario as id
						FROM gdoks_validadores a
						INNER JOIN gdoks_disciplinas b ON a.id_disciplina=b.id
						INNER JOIN gdoks_usuarios c ON c.id_empresa=b.id_empresa
						WHERE c.token=?';
				$validadores = array_map(function($a){return (object)$a;}, $db->query($sql,'s',$token));

				foreach ($disciplinas as $d) {
					// filtrando somente validadores da disciplina em questão
					$id = $d->id;
					$validadoresDestaDisciplina = array_filter($validadores,function($a) USE ($id){
						return $a->id_disciplina == $id;
					});
					
					// mapeando o vetor para mostrar somente dados dos validadores
					$d->validadores = array_values(array_map(function($a){return 1*$a->id;}, $validadoresDestaDisciplina));
				}


				$response = new response(0,'ok');
				$response->disciplinas = $disciplinas;
				$response->flush();
			});

			$app->put('/disciplinas/:id',function($id) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id = 1*$id;
				$disciplina = json_decode($app->request->getBody());

				// verificando se o usário enviado é do mesmo cliente do usuário atual
				$sql = 'SELECT A.id,
						       COUNT(*) AS ok
						FROM
						  ( SELECT id,
						           id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  ( SELECT id_empresa
						   FROM gdoks_disciplinas
						   WHERE id=?) B ON A.id_empresa=B.id_empresa;';
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id'];
				if($ok == 1){
					// Tudo ok! A disciplina a ser alterada é do mesmo cliente do usuário
					$sql = 'UPDATE gdoks_disciplinas SET nome=?,sigla=?,ativa=? WHERE id=?';
					try {
						$db->query($sql,'ssii',$disciplina->nome,$disciplina->sigla,$disciplina->ativa,$id);
						$response = new response(0,'Disciplina alterada com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Já existe uma disciplina cadastrado com esta sigla ou nome.');
						$response->flush();
						exit(1);
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_DISCIPLINA,$disciplina->nome.','.$disciplina->sigla.','.($disciplina->ativa == true?1:0));
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/disciplinas',function() use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$disciplina = json_decode($app->request->getBody());

				// Capturando o id e o id_empresa do usuário atual
				$sql = 'SELECT
							id,id_empresa
						FROM 
							gdoks_usuarios
						WHERE
							token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token)[0];
				$id_empresa = $rs['id_empresa'];
				$id = $rs['id'];

				// Inserindo nova disciplina.
				$sql = 'INSERT INTO gdoks_disciplinas (nome,sigla,id_empresa,ativa) VALUES (?,?,?,?)';
				try {
					$db->query($sql,'ssii',$disciplina->nome,$disciplina->sigla,$id_empresa,$disciplina->ativa);
					$response = new response(0,'Disciplina criada com sucesso.');
					$response->newId = $db->insert_id;
					$response->flush();
				} catch (Exception $e) {
					http_response_code(401);
					$response = new response(1,'Já existe uma disciplina cadastrado com este nome ou sigla. '.$e->getMessage());
					$response->flush();
					exit(1);
				}
				// Registrando a ação
				registrarAcao($db,$id,ACAO_CRIOU_DISCIPLINA,$disciplina->nome.','.$disciplina->sigla.','.($disciplina->ativa==true?1:0));
			});

			$app->get('/disciplinas/:id',function($id) use ($app,$db,$token){
				
				//levantando informações enviadas.
				$id_disciplina = 1*$id;

				// verificando se a disciplina solicitada é do mesmo cliente do usuário
				$sql = 'SELECT A.id,
						       COUNT(*) AS ok
						FROM
						  ( SELECT id,
						           id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  ( SELECT id_empresa
						   FROM gdoks_disciplinas
						   WHERE id=?) B ON A.id_empresa=B.id_empresa;';
				
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];

				if($ok == 1){
					$disciplina = new stdClass();

					// Levantando dados da disciplina requisitada
					$sql = 'SELECT id,
							       nome,
							       sigla,
							       ativa
							FROM gdoks_disciplinas
							WHERE
								id = ?
							ORDER by nome';
					
					$disciplina = (object)$db->query($sql,'i',$id_disciplina)[0];

					// Levantando subdisciplinas desta disciplina
					$sql = 'SELECT id,
							       nome,
							       sigla,
							       ativa
							FROM gdoks_subdisciplinas
							WHERE
								id_disciplina = ?
							ORDER by nome';
					$disciplina->subs = $db->query($sql,'i',$id_disciplina);

					// Levantando especialistas na disciplina
					$sql = 'SELECT id_usuario
							FROM gdoks_especialistas
							WHERE id_disciplina=?';
					$disciplina->especialistas = Array();
					$rs = $db->query($sql,'i',$id_disciplina);
					foreach ($rs as $row) {
						array_push($disciplina->especialistas, $row['id_usuario']);
					}

					// Levantando usuários validadores desta disciplina
					$sql = 'SELECT id_usuario AS id,
							       tipo
							FROM gdoks_validadores
							WHERE id_disciplina=?';

					$disciplina->validadores = $db->query($sql,'i',$id_disciplina);


					// criando o objeto response;
					$response = new response(0,'Ok');

					// atribuindo a ele os atributos.
					$response->disciplina = $disciplina;
					
				} else {
					http_response_code(401);
					$response = new response(1,'Não carrega dados de outra empresa.');	
				}


				// Enviando dados
				$response->flush();
			});

			$app->put('/disciplinas/:id_disciplina/subs/:id_sub',function($id_disciplina,$id_sub) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_disciplina = 1*$id_disciplina;
				$id_sub = 1*$id_sub;
				$subdisciplina = json_decode($app->request->getBody());

				// parando caso haja inconscistência entre o id_disciplina vindo no corpo da requisição e o da url
				if($id_sub != $subdisciplina->id) {
					http_response_code(401);
					$response = new response(1,'inconscistência nas informações fornecidas');
					$response.flush();
					exit(1);
				}

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_disciplinas d
						   INNER JOIN gdoks_subdisciplinas s ON d.id=s.id_disciplina
						   AND s.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_sub)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A subdisciplina a ser alterada é do mesmo cliente do usuário
					$sql = 'UPDATE gdoks_subdisciplinas SET nome=?,sigla=?,ativa=? WHERE id=?';
					try {
						$db->query($sql,'ssii',$subdisciplina->nome,$subdisciplina->sigla,$subdisciplina->ativa,$id_sub);
						$response = new response(0,'Subdisciplina alterada com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Verifique se já não existe uma subdisciplina cadastrado com esta sigla ou nome.');
						$response->flush();
						exit(1);
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_SUBDISCIPLINA,$subdisciplina->nome.','.$subdisciplina->sigla.','.($subdisciplina->ativa == true?1:0));
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					exit(1);
				}
			});

			$app->post('/disciplinas/:id_disciplina/subs/',function($id_disciplina) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_disciplina = 1*$id_disciplina;
				$subdisciplina = json_decode($app->request->getBody());

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_disciplinas d WHERE d.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_disciplina)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A subdisciplina a ser adicionada é do mesmo cliente do usuário
					$sql = 'INSERT INTO gdoks_subdisciplinas (nome,sigla,ativa,id_disciplina) VALUES (?,?,?,?)';
					try {
						$db->query($sql,'ssii',$subdisciplina->nome,$subdisciplina->sigla,$subdisciplina->ativa,$id_disciplina);
						$response = new response(0,'Subdisciplina adicionada com sucesso.');
						$response->newId = $db->insert_id;
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Já existe uma subdisciplina cadastrado com esta sigla ou nome.');
						$response->flush();
						exit(1);
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_CRIOU_SUBDISCIPLINA,$subdisciplina->nome.','.$subdisciplina->sigla.','.($subdisciplina->ativa == true?1:0));
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->delete('/disciplinas/:id_disciplina/subs/:id_sub',function($id_disciplina,$id_sub) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_disciplina = 1*$id_disciplina;
				$id_sub = 1*$id_sub;
				
				// levantando subdisciplina na base de dados
				$sql = 'SELECT id,
						       nome,
						       sigla,
						       ativa,
						       id_disciplina
						FROM gdoks_subdisciplinas
						WHERE id=?';
				$subdisciplina = (object)$db->query($sql,'i',$id_sub)[0];

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_disciplinas d
						   INNER JOIN gdoks_subdisciplinas s ON d.id=s.id_disciplina
						   AND s.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_sub)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A subdisciplina a ser adicionada é do mesmo cliente do usuário
					$sql = 'DELETE FROM gdoks_subdisciplinas WHERE id=?';
					try {
						$db->query($sql,'i',$id_sub);
						$response = new response(0,'Subdisciplina removida com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						exit(1);
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_REMOVEU_SUBDISCIPLINA,$subdisciplina->nome.','.$subdisciplina->sigla.','.($subdisciplina->ativa == true?1:0));
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					exit(1);
				}
			});

			$app->put('/disciplinas/:id_disciplina/especialistas/',function($id_disciplina) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_disciplina = 1*$id_disciplina;
				$ids_especialistas = json_decode($app->request->getBody());
				
				// verificando se o usário enviado é do mesmo cliente da disciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_disciplinas
						   WHERE id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_disciplina)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					try {
						// Removendo especialistas antigos
						$sql = "DELETE FROM gdoks_especialistas WHERE id_disciplina=?";
						$db->query($sql,'i',$id_disciplina);

						// Inserindo novos especialistas
						$sql = "INSERT INTO gdoks_especialistas (id_disciplina,id_usuario) VALUES (?,?)";
						foreach ($ids_especialistas as $id_especialista) {
							$db->query($sql,'ii',$id_disciplina,$id_especialista);
						}

						$response = new response(0,'Especialistas adicionados com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						exit(1);
					}

					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_ESPECIALISTAS,$id_disciplina.',['.implode('|', $ids_especialistas).']');
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					exit(1);
				}
			});

			$app->post('/disciplinas/:id_disciplina/especialistas/',function($id_disciplina) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_disciplina = 1*$id_disciplina;
				$id_especialista = 1*$app->request->getBody();

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_disciplinas
						   WHERE id=?) B ON A.id_empresa=B.id_empresa
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE id=?) C ON C.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'sii',$token,$id_disciplina,$id_especialista)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A subdisciplina a ser adicionada é do mesmo cliente do usuário
					$sql = 'INSERT INTO gdoks_especialistas (id_usuario,id_disciplina) VALUES (?,?)';
					try {
						$db->query($sql,'ii',$id_especialista,$id_disciplina);
						$response = new response(0,'Especialista adicionado com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						exit(1);
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ASSOCIOU_ESPECIALISTA,$id_especialista.','.$id_disciplina);
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					exit(1);
				}
			});
			
			$app->delete('/disciplinas/:id_disciplina/especialistas/:id_especialista',function($id_disciplina,$id_especialista) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_disciplina = 1*$id_disciplina;
				$id_especialista = 1*$id_especialista;

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_disciplinas
						   WHERE id=?) B ON A.id_empresa=B.id_empresa
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE id=?) C ON C.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'sii',$token,$id_disciplina,$id_especialista)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A subdisciplina a ser adicionada é do mesmo cliente do usuário
					$sql = 'DELETE FROM gdoks_especialistas WHERE id_usuario=? AND id_disciplina=?';
					try {
						$db->query($sql,'ii',$id_especialista,$id_disciplina);
						$response = new response(0,'Especialista removido com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						exit(1);
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_DESASSOCIOU_ESPECIALISTA,$id_especialista.','.$id_disciplina);
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					exit(1);
				}
			});

			$app->put('/disciplinas/:id_disciplina/validadores/',function($id_disciplina) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_disciplina = 1*$id_disciplina;
				$ids_validadores = json_decode($app->request->getBody());
				
				// verificando se o usário enviado é do mesmo cliente da disciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_disciplinas
						   WHERE id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_disciplina)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					try {
						// Removendo validadores antigos
						$sql = "DELETE FROM gdoks_validadores WHERE id_disciplina=?";
						$db->query($sql,'i',$id_disciplina);

						// Inserindo novos validadores
						$sql = "INSERT INTO gdoks_validadores (id_disciplina,id_usuario) VALUES (?,?)";
						foreach ($ids_validadores as $id_validador) {
							$db->query($sql,'ii',$id_disciplina,$id_validador);
						}

						$response = new response(0,'Validadores adicionados com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						exit(1);
					}

					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_VALIDADORES,$id_disciplina.',['.implode('|', $ids_validadores).']');
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					exit(1);
				}
			});
			
			$app->post('/disciplinas/:id_disciplina/validadores/',function($id_disciplina) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_disciplina = 1*$id_disciplina;
				$data = json_decode($app->request->getBody());
				$id_validador = $data->idu;

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_disciplinas
						   WHERE id=?) B ON A.id_empresa=B.id_empresa
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE id=?) C ON C.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'sii',$token,$id_disciplina,$id_validador)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A subdisciplina a ser adicionada é do mesmo cliente do usuário
					$sql = 'INSERT INTO gdoks_validadores (id_usuario,id_disciplina) VALUES (?,?)';
					try {
						$db->query($sql,'ii',$id_validador,$id_disciplina);
						$response = new response(0,'Validador adicionado com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						exit(1);
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ASSOCIOU_VALIDADOR,$id_validador.','.$id_disciplina);
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					exit(1);
				}
			});
			
			$app->delete('/disciplinas/:id_disciplina/validadores/:id_validador',function($id_disciplina,$id_validador) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_disciplina = 1*$id_disciplina;
				$id_validador = 1*$id_validador;

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_disciplinas
						   WHERE id=?) B ON A.id_empresa=B.id_empresa
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE id=?) C ON C.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'sii',$token,$id_disciplina,$id_validador)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A subdisciplina a ser adicionada é do mesmo cliente do usuário
					$sql = 'DELETE FROM gdoks_validadores WHERE id_usuario=? AND id_disciplina=?';
					try {
						$db->query($sql,'ii',$id_validador,$id_disciplina);
						$response = new response(0,'Validador removido com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						exit(1);
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_DESASSOCIOU_VALIDADOR,$id_validador.','.$id_disciplina);
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					exit(1);
				}
			});
		// FIM DE ROTAS DE DISCIPLINAS
		
		// ROTAS DE PROJETOS 
			$app->get('/projetos',function() use ($app,$db,$token){
				// Lendo o token

				// Levantando os projetos que este usuário possui pemissão
				$sql = 'SELECT p.id,
						       p.nome,
						       p.codigo,
						       p.ativo,
						       p.id_cliente
						FROM gdoks_usuarios u
						INNER JOIN gdoks_projetos p ON p.id_empresa=u.id_empresa
						WHERE u.token=? and p.ativo';

				$response = new response(0,'ok');
				$response->projetos = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->get('/projetos/detalhados',function() use ($app,$db,$token){
				
				// Lendo se a requisição pede que os inativos sejam listados
				$listar_inativos = array_key_exists('i', $_GET) && $_GET['i'] == 1;
				
				// Definindo a condição que determina se inativos serão ou não listados
				$condicao_inativos = $listar_inativos? "TRUE" : "a.ativo";

				// Levantando os projetos que este usuário possui pemissão
				$sql = "SELECT
							A.*,
							ifnull(B.progresso_total,0) as progresso_total
						FROM
						  (SELECT a.id,
						          a.codigo,
						          a.nome,
						          count(d.id) AS n_docs,
						          e.id AS id_cliente,
						          e.nome_fantasia AS nome_cliente
						   FROM gdoks_projetos a
						   LEFT JOIN gdoks_areas b ON a.id=b.id_projeto
						   LEFT JOIN gdoks_subareas c ON b.id=c.id_area
						   LEFT JOIN gdoks_documentos d ON c.id=d.id_subarea
						   INNER JOIN gdoks_clientes e ON a.id_cliente=e.id
						   INNER JOIN gdoks_usuarios u ON a.id_empresa=u.id_empresa
						   WHERE
						   		u.token=?
						   		AND $condicao_inativos
						   GROUP BY a.id,
						            a.codigo,
						            a.nome) A
						LEFT JOIN
						  (SELECT id_projeto,
						          ROUND(sum_progressos/n_docs) AS progresso_total
						   FROM
						     (SELECT c.id_projeto,
						             count(a.id) AS n_docs,
						             sum(d.progresso_validado) AS sum_progressos
						      FROM gdoks_documentos a
						      INNER JOIN gdoks_subareas b ON b.id=a.id_subarea
						      INNER JOIN gdoks_areas c ON c.id=b.id_area
						      INNER JOIN gdoks_revisoes d ON a.id=d.id_documento
						      GROUP BY id_projeto) Y) B ON A.id=B.id_projeto";

				$response = new response(0,'ok');
				$response->projetos = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->get('/projetos/:id',function($id) use ($app,$db,$token,$config){
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id;
				
				// Verificando se projeto é do mesmo cliente do usuário atual
				$sql = 'SELECT A.id,
						       COUNT(*) AS ok
						FROM
						  ( SELECT id,
						           id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  ( SELECT id_empresa
						   FROM gdoks_projetos
						   WHERE id=?) B ON A.id_empresa=B.id_empresa;';
			
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id'];
				
				if($ok == 1){

					// levantando informações do projeto
					$sql = "SELECT
								a.id,
							    a.codigo,
							    a.nome,
							    a.id_cliente,
							    b.nome as nome_cliente,
							    a.id_responsavel,
							    c.nome as nome_responsavel,
							    a.data_inicio_p,
							    a.data_final_p,
							    a.ativo
							FROM
								gdoks_projetos a
								INNER JOIN gdoks_clientes b on a.id_cliente=b.id
							    INNER JOIN gdoks_usuarios c on a.id_responsavel=c.id
							WHERE a.id=?";
					$projeto = (object)$db->query($sql,'i',$id_projeto)[0];
					
					// Levantando áreas do projeto
					$sql = "SELECT id,codigo,nome FROM gdoks_areas WHERE id_projeto=?";
					$projeto->areas = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));
					
					// Levantando subáreas do projeto
					$sql = "SELECT a.id,a.codigo,a.nome,a.id_area FROM gdoks_subareas a INNER JOIN gdoks_areas b ON a.id_area=b.id WHERE b.id_projeto=?";
					$projeto->subareas = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));

					// levantando DAOs do projeto
					$sql = 'SELECT id,nome,nome_cliente,tipo,tamanho FROM gdoks_daos WHERE id_projeto=?';
					$projeto->daos = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));

					// Levantando documentos do projeto -> feita em outra requisição a /projetos/:id_projeto/documentos/
					$projeto->documentos = Array();

					// Criando o objeto response 
					$response = new response(0,'Ok');
					$response->projeto = $projeto;

					// registrando acesso ao projeto no histórico
					addInHistProj($id_projeto,$id_usuario,$db,$config);
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					exit(1)	;
				}

				// enviando resposta
				$response->flush();
			});

			$app->get('/projetos/:id/stats',function($id) use ($app,$db,$token,$config){
				echo('hahaha!');
			});

			$app->put('/projetos/:id',function($id) use ($app,$db,$token){
				
				// Lendo dados
				$projeto = json_decode($app->request->getBody());
				$projeto->data_final_p = $projeto->data_final_p==null?'null':substr($projeto->data_final_p,0,10);
				$projeto->data_inicio_p = $projeto->data_inicio_p==null?'null':substr($projeto->data_inicio_p,0,10);

				// verifricando consistência de dados
				if($projeto->id != $id){
					$response = new response(1,'Dados inconsistentes.');
					$response->flush();
					exit(1);
				}

				// Verificando se o projeto é da mesma empresa do usuário
				$sql = 'SELECT
							A.id,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks_projetos
								WHERE id=?) B on A.id_empresa=B.id_empresa;';
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id'];

				// Indo adiante
				if($ok == 1) {
					$sql = "UPDATE gdoks_projetos
							SET	
								nome=?,
         						codigo=?,
		                       	id_cliente=?,
								id_responsavel=?,
                                data_inicio_p=?,
                                data_final_p=?,
                                ativo=?
                            WHERE id=?";
                    try {
                    	$db->query($sql,'ssiissii',
                    		$projeto->nome,
                    		$projeto->codigo,
                    		$projeto->id_cliente,
                    		$projeto->id_responsavel,
                    		$projeto->data_inicio_p,
                    		$projeto->data_final_p,
                    		$projeto->ativo,
                    		$id);
                    } catch (Exception $e) {
                    	$response = new response(1,'Erro na consulta: '.$e->getMessage());
						$response->flush();
						exit(1);
                    }
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					exit(1);
				}

				// retornando
				$response = new response(0,'Dados do projeto alterados com sucesso.');
				$response->flush();

				// Removendo alguns campos para o registro no log
				unset($projeto->subareas);

				// registrando alteração
				registrarAcao($db,$id_usuario,ACAO_ALTEROU_PROJETO,implode(',',(array)$projeto));
			});

			$app->post('/projetos',function() use ($app,$db,$token,$empresa){
				
				// Lendo dados
				$projeto = json_decode($app->request->getBody());

				// Determinando o id do usuário e o id da empresa a qual ele pertence
				$sql = 'SELECT id,
						       id_empresa
						FROM gdoks_usuarios
						WHERE token=?
						  AND validade_do_token>now()';
				$query = $db->query($sql,'s',$token);
				$ok = (sizeof($query) == 1);

				// Indo adiante
				if($ok == 1) {
					$id_usuario = $query[0]['id'];
					$id_empresa = $query[0]['id_empresa'];
					$sql = "INSERT INTO gdoks_projetos (
								nome,
								codigo,
								id_cliente,
								id_responsavel,
								id_empresa,
								data_inicio_p,
								data_final_p,
								ativo
							) VALUES (?,?,?,?,?,?,?,?)";
                    try {
                    	$db->query($sql,'ssiiissi',
                    		$projeto->nome,
                    		$projeto->codigo,
                    		$projeto->id_cliente,
                    		$projeto->id_responsavel,
                    		$id_empresa,
                    		substr($projeto->data_inicio_p, 0, 10),
                    		substr($projeto->data_final_p, 0, 10),
                    		$projeto->ativo);
                    } catch (Exception $e) {
                    	$response = new response(1,'Erro na consulta: '.$e->getMessage());
						$response->flush();
						exit(1);
                    }
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					exit(1);
				}

				// Guardando o id do projeto criado
				$id_projeto = $db->insert_id;

				// Criando pasta de upload do projeto
				$caminho = CLIENT_DATA_PATH.$empresa.'/uploads/'.$id_projeto.'/';

				// criando pasta caso ela não exista
				if(@mkdir($caminho)){
					// Alterando permissão da pasta recém criada para 777
					chmod($caminho, 0777);
				}
				
				// retornando
				$response = new response(0,'Projeto cadastrado com sucesso.');
				$response->newId = $id_projeto;
				$response->flush();

				// registrando alteração
				registrarAcao($db,$id_usuario,ACAO_ADICIONOU_PROJETO,implode(',',(array)$projeto));
			});

			$app->put('/projetos/:id_projeto/areas/:id_area',function($id_projeto,$id_area) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;
				$id_area = 1*$id_area;
				$area = json_decode($app->request->getBody());

				// parando caso haja inconscistência entre o id_projeto vindo no corpo da requisição e o da url
				if($id_area != $area->id) {
					http_response_code(401);
					$response = new response(1,'inconscistência nas informações fornecidas');
					$response.flush();
					exit(1);
				}

				// verificando se o usário enviado é do mesmo cliente da area atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos p
						   INNER JOIN gdoks_areas a ON p.id=a.id_projeto
						   AND a.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_area)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A area a ser alterada é do mesmo cliente do usuário
					$sql = 'UPDATE gdoks_areas SET nome=?,codigo=? WHERE id=?';
					try {
						$db->query($sql,'ssi',$area->nome,$area->codigo,$id_area);
						$response = new response(0,'Área alterada com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						exit(1);
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_AREA,implode(',', (array)$area));
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					exit(1);
				}
			});

			$app->post('/projetos/:id_projeto/areas/',function($id_projeto) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;
				$area = json_decode($app->request->getBody());

				// verificando se o usário enviado é do mesmo cliente da area atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos d WHERE d.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_projeto)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A area a ser adicionada é do mesmo cliente do usuário
					$sql = 'INSERT INTO gdoks_areas (nome,codigo,id_projeto) VALUES (?,?,?)';
					try {
						$db->query($sql,'ssi',$area->nome,$area->codigo,$id_projeto);
						$response = new response(0,'Area adicionada com sucesso.');
						$response->newId = $db->insert_id;
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						exit(1);
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_CRIOU_AREA,implode(',', (array)$area));
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					exit(1);
				}
			});

			$app->get('/projetos/:id_projeto/areas',function($id_projeto) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;

				// verificando se o usário enviado é do mesmo cliente da area atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos d WHERE d.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_projeto)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A area a ser adicionada é do mesmo cliente do usuário
					$sql = 'SELECT id,nome,codigo FROM gdoks_areas WHERE id_projeto=? ';
					try {
						$response = new response(0,'ok');
						$response->areas = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}
				} else {
					http_response_code(401);
					$response = new response(1,'Não lê dados de outra empresa.');	
				}
			});

			$app->get('/projetos/:id_projeto/areas/:id_area/subareas',function($id_projeto,$id_area) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;
				$id_area = 1*$id_area;

				// verificando se o usário enviado é do mesmo cliente da area atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos d WHERE d.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_projeto)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Preparando select
					$sql = 'SELECT id,nome,codigo FROM gdoks_subareas WHERE id_area=? ';
					try {
						$response = new response(0,'ok');
						$response->subareas = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_area));
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}
				} else {
					http_response_code(401);
					$response = new response(1,'Não lê dados de outra empresa.');	
				}
			});

			$app->delete('/projetos/:id_projeto/areas/:id_area',function($id_projeto,$id_area) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;
				$id_area = 1*$id_area;
				
				// levantando area na base de dados
				$sql = 'SELECT id,
						       nome,
						       codigo,
						       id_projeto
						FROM gdoks_areas
						WHERE id=?';
				$area = $db->query($sql,'i',$id_area)[0];

				// verificando se o usário enviado é da mesma empresa da subdisciplina atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos p
						   INNER JOIN gdoks_areas a ON p.id=a.id_projeto
						   AND a.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_area)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A subdisciplina a ser adicionada é do mesmo cliente do usuário
					$sql = 'DELETE FROM gdoks_areas WHERE id=?';
					try {
						$db->query($sql,'i',$id_area);
						$response = new response(0,'Área removida com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_REMOVEU_AREA,implode(',',$area));
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/projetos/:id_projeto/daos/',function($id_projeto) use ($app,$db,$empresa,$token){
				// lendo dados
				$id_projeto = 1*$id_projeto;

				// Verificando se o projeto é da mesma empresa do usuário
				$sql = 'SELECT
							A.id,A.id_empresa,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks_projetos
								WHERE id=?) B on A.id_empresa=B.id_empresa;';
				$rs = $db->query($sql,'si',$token,$id_projeto)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id'];
				$id_empresa = $rs['id_empresa'];

				// Indo adiante
				if($ok == 1) {
					// Determinando a quantidade de arquivos
					$n = sizeof($_POST['profiles']);

					// criando vetor de erros
					$erros = Array();

					// criando o vetor de sucessos
					$sucessos = Array();

					// percorrendo informações armazenamento na base e no filesystem
					for ($i=0; $i < $n; $i++) { 
						// verificando se há erro
						if($_FILES['profiles']['error'][$i]['file'] == 0){
							// UPLOAD COM SUCESSO
							
							// Organizando informações a serem salvas na base
							$nomeUnico = uniqid(true);
							$nomeTemporario = $_FILES['profiles']['tmp_name'][$i]['file'];
							$nomeCliente = $_FILES['profiles']['name'][$i]['file'];
							$tipo = substr($_FILES['profiles']['type'][$i]['file'],0,45);
							$tamanho = $_FILES['profiles']['size'][$i]['file'];
							$nomeDao = $_POST['profiles'][$i]['nome'];

							// Salvando arquivo no FS
							$salvoNoFS = false;
							try {
								// verificando se existe uma pasta da empresa. Se não houver, tenta criar.
								$caminho = CLIENT_DATA_PATH.'/'.$empresa.'/uploads/';
								$pastaDaEmpresaExiste = file_exists($caminho);
								if(!$pastaDaEmpresaExiste){
									$pastaDaEmpresaExiste = @mkdir($caminho);
								}

								if($pastaDaEmpresaExiste){
									// Verificando se existe uma pasta do projeto.
									// Se não houver, tenta criar.
									$caminho = $caminho.'/'.$id_projeto;
									$pastaDoProjetoExiste = file_exists($caminho);
									if(!$pastaDoProjetoExiste){
										$pastaDoProjetoExiste = mkdir($caminho);
									}
								}

								if($pastaDoProjetoExiste){
									// Salvando arquivo na pasta do cliente
									$salvoNoFS = @move_uploaded_file($nomeTemporario, $caminho.'/'.$nomeUnico);	
								}

								if($salvoNoFS){
									// Criando elemento de vetor de sucesso
									$dao = new stdClass();
									$dao->nome = $nomeDao;
									$dao->nome_cliente = $nomeCliente;
									$dao->tipo = $tipo;
									$dao->tamanho = $tamanho;
									$dao->id = $db->insert_id;
									array_push($sucessos, $dao);

									// Registrando informações na base
									$registradoNaBase = false;
									$sql = "INSERT INTO gdoks_daos (nome,nome_unico,nome_cliente,tipo,tamanho,id_projeto)
											VALUES (?,?,?,?,?,?)";
									try {
										$db->query($sql,'ssssii',
											$nomeDao,
											$nomeUnico,
											$nomeCliente,
											$tipo,
											$tamanho,
											$id_projeto);
										$registradoNaBase = true;
									} catch (Exception $e1) {
										// registrando falha na consulta no vetor de falhas.
										$erro = new stdClass();
										$erro->arquivo = $nomeCliente;
										$erro->msg = $e1->getMessage();
										$erro->codigo = $e1->getCode();
										array_push($erros, $erro);
									}
									
									// Registrando a ação
									registrarAcao($db,$id_usuario,ACAO_CRIOU_DAO,implode(',', (array)$dao));
								} else {
									// registrando falha no processo de salvar no FS
									$erro = new stdClass();
									$erro->arquivo = $nomeCliente;
									$erro->msg = $e1->getMessage();
									array_push($erros, $erro);

									// removendo registro na base de dados
									$sql = "DELETE from gdoks_daos WHERE id=?";
									$db->query($sql,'i',$db->insert_id);
								}
							} catch (Exception $e2) {
								// registrando falha na consulta no vetor de falhas.
								$erro = new stdClass();
								$erro->arquivo = $nomeCliente;
								$erro->msg = $e2->getMessage();
								$erro->codigo = -2;
								array_push($erros, $erro);
							}

							
						} else {
							// Registrando falha no upload no vetor de falhas.
							$erro = new stdClass();
							$erro->arquivo = $_FILES['profiles']['name'][$i]['file'];
							$erro->codigo = -1;

							// entrando no switch para retornar msg de erro adequada
							switch ($_FILES['profiles']['error'][$i]['file']) {
								case UPLOAD_ERR_INI_SIZE:
									$msg = 'O arquivo enviado excede o limite definido ('.ini_get('upload_max_filesize') .')';
									break;

								case UPLOAD_ERR_FORM_SIZE:
									$msg = 'O arquivo excede o limite definido em MAX_FILE_SIZE no formulário HTML';
									break;

								case UPLOAD_ERR_PARTIAL:
									$msg = 'O upload do arquivo foi feito parcialmente';
									break;

								case UPLOAD_ERR_NO_FILE:
									$msg = 'Nenhum arquivo foi enviado';
									break;

								case UPLOAD_ERR_NO_TMP_DIR:
									$msg = 'Pasta temporária ausente';
									break;

								case UPLOAD_ERR_CANT_WRITE:
									$msg = 'Falha em escrever o arquivo em disco';
									break;
								
								case UPLOAD_ERR_EXTENSION:
									$msg = 'Uma extensão interrompeu o upload do arquivo';
									break;

								default:
									$msg = 'Desconhecido (Cod '.$_FILES['profiles']['error'][$i]['file'].')';
									break;
							}
							$erro->msg = 'Upload falhou. Erro: '.$msg;
							array_push($erros, $erro);
						}
					}

					// retornando;
					$response = new response(0,'Documentos processados.');
					$response->erros = $erros;
					$response->sucessos = $sucessos;
					$response->flush();
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					die();
				}
			});

			$app->delete('/projetos/:id_projeto/daos/:id_dao',function($id_projeto,$id_dao) use ($app,$db,$token,$empresa){
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;
				$id_dao = 1*$id_dao;
				
				// levantando dao na base de dados
				$sql = 'SELECT id,
						       nome,
						       nome_unico
						FROM gdoks_daos
						WHERE id=?';
				$dao = (object)($db->query($sql,'i',$id_dao)[0]);

				// verificando se o usário enviado é da mesma empresa da subdisciplina atual
				$sql = 'SELECT A.id AS id_usuario,
							   A.id_empresa AS id_empresa,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos p
						   INNER JOIN gdoks_daos a ON p.id=a.id_projeto
						   AND a.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_dao)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				$id_empresa = $rs['id_empresa'];

				if($ok == 1){
					// Tudo ok! A dao a ser removida é do mesmo cliente do usuário
					$sql = 'DELETE FROM gdoks_daos WHERE id=?';
					$removeuDaBase = false;
					try {
						$db->query($sql,'i',$id_dao);
						$removeuDaBase = true;
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}

					$removeuDoFS = false;
					if($removeuDaBase){
						// removendo do FS
						$removeuDoFS = @unlink(CLIENT_DATA_PATH.$empresa.'/uploads/'.$id_projeto.'/'.$dao->nome_unico);
					} else {
						http_response_code(401);
						$response = new response(1,'Falha ao tentar remover registro do documento na base de dados.');
						$response->flush();
						return;	
					}


					if($removeuDoFS){
						// Retornando resultado para o cliente
						$response = new response(0,'Ok');
						$response->flush();

						// Registrando a ação
						registrarAcao($db,$id_usuario,ACAO_REMOVEU_DAO,implode(',',(array)$dao));
					}
					
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->put('/projetos/:id_projeto/documentos/:id_documento',function($id_projeto,$id_documento) use ($app,$db,$token){
				
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;
				$id_documento = 1*$id_documento;
				$documento = json_decode($app->request->getBody());
				$documento->data_limite = $documento->data_limite==null?'null':substr($documento->data_limite,0,10);

				// parando caso haja inconscistência entre o id_projeto vindo no corpo da requisição e o da url
				if($id_documento != $documento->id) {
					http_response_code(401);
					$response = new response(1,'inconscistência nas informações fornecidas');
					$response.flush();
					die();
				}

				// verificando se o usário enviado é do mesmo cliente da documento atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos p
						   INNER JOIN gdoks_areas a on a.id_projeto=p.id
						   INNER JOIN gdoks_subareas s on s.id_area=a.id
						   INNER JOIN gdoks_documentos d ON s.id=d.id_subarea
						   AND d.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_documento)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];

				if($ok == 1){
					// Tudo ok! O documento a ser alterado é da mesma empresa do usuário
					$sql = 'UPDATE gdoks_documentos SET nome=?,codigo=?,codigo_cliente=?,codigo_alternativo=?,id_subarea=?,id_subdisciplina=? WHERE id=?';
					try {
						$db->query($sql,'ssssiii',$documento->nome,$documento->codigo,$documento->codigo_cliente,$documento->codigo_alternativo,$documento->id_subarea,$documento->id_subdisciplina,$id_documento);
						$response = new response(0,'Documento alterado com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}
					// Removendo dependências antigas
					$sql = 'DELETE FROM gdoks_documentos_x_dependencias WHERE id_documento=?';
					$db->query($sql,'i',$documento->id);

					// Inserindo novas dependencia
					$sql = 'INSERT INTO gdoks_documentos_x_dependencias (id_documento,id_dependencia) VALUES (?,?)';
					foreach ($documento->dependencias as $dp) {
						$db->query($sql,'ii',$documento->id,$dp);
					}

					// Removendo horas a serem gastas em documento
					$sql = 'DELETE FROM gdoks_hhemdocs WHERE id_doc=?';
					$db->query($sql,'i',$documento->id);

					// Inserindo novas horas a serem gastas em documento
					$sql = 'INSERT INTO gdoks_hhemdocs (id_doc,id_cargo,hh) VALUES (?,?,?)';
					foreach ($documento->hhs as $hh) {
						$db->query($sql,'iii',$documento->id,$hh->id_cargo,$hh->hh);
					}

					// Atualizando a data limite da última revisão
					$sql = "UPDATE gdoks_revisoes set data_limite=? WHERE id_documento=? and serial=?";
					$db->query($sql,'sii',$documento->data_limite,$documento->id,$documento->rev_serial);

					// removendo dependencias e hhs do objeto para salvar no log
					unset($documento->dependencias);
					unset($documento->hhs);
					unset($documento->revisoes);
					
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_DOCUMENTO,implode(',', (array)$documento));
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/projetos/:id_projeto/documentos/',function($id_projeto) use ($app,$db,$token){

				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;
				$documento = json_decode($app->request->getBody());
				$documento->data_limite = $documento->data_limite==null?'null':substr($documento->data_limite,0,10);

				// verificando se o usário enviado é do mesmo cliente da projeto atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos d WHERE d.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_projeto)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A documento a ser adicionada é do mesmo cliente do usuário
					$sql = 'INSERT INTO gdoks_documentos (nome,codigo,codigo_cliente,codigo_alternativo,id_subarea,id_subdisciplina) VALUES (?,?,?,?,?,?)';
					try {
						// Salvando documento
						$db->query($sql,'ssssii',$documento->nome,$documento->codigo,$documento->codigo_cliente,$documento->codigo_alternativo,$documento->id_subarea,$documento->id_subdisciplina);

						// Salvando o novo id do documento recém adicionado
						$newId = $db->insert_id;

						// salvando vínculos de dependencia
						$sql = 'INSERT INTO gdoks_documentos_x_dependencias (id_documento,id_dependencia) VALUES (?,?)';
						foreach ($documento->dependencias as $id_dependencia) {
							$db->query($sql,'ii',$newId,$id_dependencia);
						}

						// salvando horas de trabalho para este documento
						$sql = 'INSERT INTO gdoks_hhemdocs (id_doc,id_cargo,hh) VALUES (?,?,?)';
						foreach ($documento->hhs as $hh) {
							$db->query($sql,'iii',$newId,$hh->id_cargo,$hh->hh);
						}

						// Criando a primeira revisão do documento
						$sql = "insert into gdoks_revisoes (serial,id_documento,data_limite,progresso_validado,progresso_a_validar,ua) values (0,?,?,0,0,null)";
						$db->query($sql,'is',$newId,$documento->data_limite);

						// registrando no log
						registrarAcao($db,$id_usuario,ACAO_CRIOU_DOCUMENTO,$newId.','.$documento->nome.','.$documento->id_subdisciplina.','.$documento->id_subarea);

						$response = new response(0,'Documento adicionado com sucesso.');
						$response->newId = $newId;
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}

					// removendo dependencias do objeto para salvar no log
					unset($documento->dependencias);
					unset($documento->hhs);

					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_CRIOU_DOCUMENTO,implode(',', (array)$documento));
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->delete('/projetos/:id_projeto/documentos/:id_documento',function($id_projeto,$id_documento) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;
				$id_documento = 1*$id_documento;
				
				// levantando documento na base de dados
				$sql = 'SELECT id,
						       nome,
						       id_subarea,
						       id_subdisciplina
						FROM gdoks_documentos
						WHERE id=?';
				$documento = $db->query($sql,'i',$id_documento)[0];

				// verificando se o usário enviado é da mesma empresa do documento atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos p
						   INNER JOIN gdoks_areas a ON p.id=a.id_projeto
						   INNER JOIN gdoks_subareas s ON s.id_area=a.id
						   INNER JOIN gdoks_documentos d ON d.id_subarea = s.id
						   AND d.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_documento)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok != 1){
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					$response->flush();
					exit(1);
				}

				// Verificando se o documento possui algum PDA
				$sql = 'SELECT count(*) as nPdas FROM gdoks_revisoes a INNER JOIN gdoks_pdas b ON (a.id=b.id_revisao AND a.id_documento=?)';
				$nPdas = $db->query($sql,'i',$id_documento)[0]['nPdas'];
				if($nPdas > 0){
					http_response_code(401);
					$response = new response(1,'Impossível remover documento já alterado/atualizado.');
					$response->flush();
					exit(1);
				}

				// Tudo ok! O Documento a ser removido é do mesmo cliente do usuário
				$sql = 'DELETE FROM gdoks_documentos WHERE id=?';
				try {
					$db->query($sql,'i',$id_documento);
					$response = new response(0,'Documento removido com sucesso.');
					$response->flush();
				} catch (Exception $e) {
					http_response_code(401);
					$response = new response(1,$e->getMessage());
					$response->flush();
					return;
				}

				// Registrando a ação
				registrarAcao($db,$id_usuario,ACAO_REMOVEU_DOCUMENTO,implode(',',$documento));
			});

			$app->get('/projetos/:id_projeto/documentos/',function($id_projeto) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;
				
				// Verificando se projeto é do mesmo cliente do usuário atual
				$sql = 'SELECT COUNT(*) AS ok
						FROM
						  ( SELECT id,
						           id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  ( SELECT id_empresa
						   FROM gdoks_projetos
						   WHERE id=?) B ON A.id_empresa=B.id_empresa;';
			
				$ok = $db->query($sql,'si',$token,$id_projeto)[0]['ok'];

				// Segiundo em frente
				if($ok){
					// Carregando documentos da base
					$sql = 'SELECT M.id,
							       M.nome,
							       M.codigo,
							       M.codigo_cliente,
							       M.codigo_alternativo,
							       M.nome_subdisciplina,
							       M.id_subdisciplina,
							       M.cod_subarea,
							       M.id_subarea,
							       M.sigla_disciplina,
							       M.id_disciplina,
							       M.cod_area,
							       M.id_area,
							       rev_serial,
							       rev_id,
							       end_fisico,
							       progresso,
							       data_limite,
							       ultimo_pda
							FROM
							  (SELECT a.id,
							          a.nome,
							          a.codigo,
							          a.codigo_cliente,
							          a.codigo_alternativo,
							          b.id AS id_subdisciplina,
							          b.nome AS nome_subdisciplina,
							          d.codigo AS cod_subarea,
							          d.id AS id_subarea,
							          c.sigla AS sigla_disciplina,
							          c.id AS id_disciplina,
							          e.codigo AS cod_area,
							          e.id AS id_area
							   FROM gdoks_documentos a
							   INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
							   INNER JOIN gdoks_disciplinas c ON b.id_disciplina=c.id
							   INNER JOIN gdoks_subareas d ON a.id_subarea=d.id
							   INNER JOIN gdoks_areas e ON d.id_area=e.id
							   WHERE e.id_projeto=?) M
							LEFT JOIN
							  (SELECT X.id_documento,
							          X.rev_serial,
							          X.end_fisico,
							          Y.id as rev_id,
							          Y.progresso,
							          Y.data_limite,
							          Z.ultimo_pda
							   FROM
							     (SELECT id_documento,
							     		 end_fisico,
							             max(serial) AS rev_serial
							      FROM gdoks_revisoes
							      GROUP BY id_documento) X
							   INNER JOIN
							     (SELECT data_limite,id,id_documento,serial,progresso_validado AS progresso
							      FROM gdoks_revisoes) Y ON X.id_documento=Y.id_documento
							   AND X.rev_serial=Y.serial
							   LEFT JOIN
							     (SELECT id_revisao,
							             max(id) AS ultimo_pda
							      FROM gdoks_pdas
							      GROUP BY id_revisao) Z ON Y.id=Z.id_revisao) N ON M.id=N.id_documento';
					$documentos = array_map(
						function($a){
							$a = (object)$a;
							$a->dependencias = Array();
							$a->hhs = Array();
							$a->revisoes = Array();
							return $a;
						}, $db->query($sql,'i',$id_projeto));

					// Carregando revisões da base
					$sql = 'SELECT
						a.id,a.serial, a.id_documento
					FROM 
						gdoks_revisoes a
					    inner join gdoks_documentos b on a.id_documento=b.id
					    inner join gdoks_subareas c on b.id_subarea=c.id
					    inner join gdoks_areas d on c.id_area=d.id
					WHERE d.id_projeto=?
					ORDER BY id_documento';
					$revisoes = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));

					// Associonado revisões aos documentos
					foreach ($revisoes as $rev) {
						$pos = array_search($rev->id_documento, array_column($documentos, 'id'));
						$aux = new stdClass();
						$aux->id = $rev->id;
						$aux->serial = $rev->serial;
						array_push($documentos[$pos]->revisoes, $aux);
					}					

					// Carregando dependencias da base
					$sql = 'SELECT
								f.id_documento,f.id_dependencia
							FROM
								gdoks_documentos a
								INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
								INNER JOIN gdoks_disciplinas c on b.id_disciplina=c.id
								INNER JOIN gdoks_subareas d on a.id_subarea=d.id
								INNER JOIN gdoks_areas e on d.id_area=e.id
								INNER JOIN gdoks_documentos_x_dependencias f on f.id_documento=a.id
							WHERE
								e.id_projeto=?';
					$dependencias = $db->query($sql,'i',$id_projeto);
					
					// Parsing DEPENDÊNCIAS
					for ($i=0; $i < sizeof($dependencias); $i++) { 
						// determinando o documento da dependência[i]
						$achou = false;
						$j = 0;
						while ($j < sizeof($documentos) && !$achou) {
							$achou = ($documentos[$j]->id == $dependencias[$i]['id_documento']);
							if($achou){
								array_push($documentos[$j]->dependencias, $dependencias[$i]['id_dependencia']);
							}
							$j++;
						}
					}

					// Carregando HHs
					$sql = 'SELECT
								f.id_doc,f.id_cargo,f.hh
							FROM
								gdoks_documentos a
								INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
								INNER JOIN gdoks_disciplinas c on b.id_disciplina=c.id
								INNER JOIN gdoks_subareas d on a.id_subarea=d.id
								INNER JOIN gdoks_areas e on d.id_area=e.id
								INNER JOIN gdoks_hhemdocs f on f.id_doc=a.id
							WHERE
								e.id_projeto=?';
					$hhs = $db->query($sql,'i',$id_projeto);

					// Parsing HHs
					for ($i=0; $i < sizeof($hhs); $i++) { 
						// determinando o documento da hhs[i]
						$achou = false;
						$j = 0;
						while ($j < sizeof($documentos) && !$achou) {
							$achou = ($documentos[$j]->id == $hhs[$i]['id_doc']);
							if($achou){
								$hh = new stdClass();
								$hh->id_cargo = $hhs[$i]['id_cargo'];
								$hh->hh = $hhs[$i]['hh'];
								array_push($documentos[$j]->hhs, $hh);
							}
							$j++;
						}
					}

					// Ajeitando resposta para o cliente
					$response = new response(0,'ok');
					$response->documentos = $documentos;
					$response->flush();

				} else {
					http_response_code(401);
					$response = new response(1,'Não lê dados de outra empresa.');
				}
			});

			$app->get('/projetos/:id_projeto/grds/',function($id_projeto) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_projeto = 1*$id_projeto;
				
				// Verificando se projeto é do mesmo cliente do usuário atual
				$sql = 'SELECT COUNT(*) AS ok
						FROM
						  ( SELECT id,
						           id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  ( SELECT id_empresa
						   FROM gdoks_projetos
						   WHERE id=?) B ON A.id_empresa=B.id_empresa;';
			
				$ok = $db->query($sql,'si',$token,$id_projeto)[0]['ok'];

				// Segiundo em frente
				if($ok){
					$sql = 'SELECT
								a.id,
							    a.codigo,
							    a.datahora_registro,
							    a.datahora_enviada,
							    c.sigla as sigla_remetente,
							    c.email as email_remetente,
							    count(*) as nDocs
							    
							FROM
								gdoks_grds a
							    INNER JOIN gdoks_grds_x_revisoes b on a.id=b.id_grd
							    LEFT JOIN gdoks_usuarios c on c.id=a.idu_remetente
							WHERE a.id_projeto=?
							GROUP BY
								a.id,
							    a.codigo,
							    a.datahora_registro,
							    a.datahora_enviada,
							    c.sigla,
							    c.email;';
					$grds = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));

					// Ajeitando resposta para o cliente
					$response = new response(0,'ok');
					$response->grds = $grds;
					$response->flush();
				} else {
					http_response_code(401);
					$response = new response(1,'Não lê dados de outra empresa.');
				}
			});
		// FIM DE ROTAS DE PROJETOS

		// ROTAS DE DOCUMENTOS
						
			$app->get('/documentos',function() use ($app,$db,$token){
				// Lendo o token

				// Levantando o id do usuário caso ele esteja logado. caso contrário retorna 401
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token);

				if(sizeof($rs) == 0){
					// Respondendo para um token inválido
					http_response_code(401);
					$response = new response(1,'Refresh failed!');
					$response->flush();
					return;
				} else {
					// Escrevendo o id do usuário em idu
					$idu = $rs[0]['id'];

					// Preparando consulta
					$sql = 'SELECT
								docs.id,
						       docs.nome,
						       docs.id_projeto,
						       docs.nome_projeto,
						       docs.id_area,
						       docs.nome_area,
						       docs.id_subarea,
						       docs.nome_subarea,
						       docs.id_disciplina,
						       docs.nome_disciplina,
						       docs.id_subdisciplina,
						       docs.nome_subdisciplina,
						       docs.hh,
						       revs.id_revisao,
						       revs.serial_revisao,
						       revs.data_limite,
						       revs.progresso_validado,
						       revs.progresso_a_validar,
						       revs.ua
						FROM
						  (SELECT e.id,
						          e.nome,
						          h.id AS id_projeto,
						          h.nome AS nome_projeto,
						          g.id AS id_area,
						          g.nome AS nome_area,
						          f.id AS id_subarea,
						          f.nome AS nome_subarea,
						          c.id_disciplina,
						          c.nome_disciplina,
						          c.ehEspecialista,
						          c.ehValidador,
						          d.id AS id_subdisciplina,
						          d.nome AS nome_subdisciplina,
						          SUM(i.hh) AS hh
						   FROM gdoks_usuarios a
						   INNER JOIN gdoks_especialistas b ON a.id=b.id_usuario
						   INNER JOIN
						     (SELECT a.id AS id_disciplina, a.nome AS nome_disciplina, !isnull(b.id_usuario) AS ehEspecialista, !isnull(c.id_usuario) AS ehValidador
						      FROM gdoks_disciplinas a
						      LEFT JOIN gdoks_especialistas b ON (a.id=b.id_disciplina
						                                          AND b.id_usuario=?)
						      LEFT JOIN gdoks_validadores c ON (a.id=c.id_disciplina
						                                        AND c.id_usuario=?)
						      WHERE !(isnull(b.id_usuario)
						              AND isnull(c.id_usuario))) c ON b.id_disciplina=c.id_disciplina
						   INNER JOIN gdoks_subdisciplinas d ON d.id_disciplina=c.id_disciplina
						   INNER JOIN gdoks_documentos e ON e.id_subdisciplina=d.id
						   INNER JOIN gdoks_subareas f ON f.id=e.id_subarea
						   INNER JOIN gdoks_areas g ON g.id=f.id_area
						   INNER JOIN gdoks_projetos h ON h.id=g.id_projeto
						   LEFT JOIN gdoks_hhemdocs i ON i.id_doc=e.id
						   WHERE a.id=?
						   GROUP BY e.id,
						            e.nome,
						            h.id,
						            h.nome,
						            g.id,
						            g.nome,
						            c.id_disciplina,
						            c.nome_disciplina,
						            d.id,
						            d.nome) docs
						LEFT JOIN
						  (SELECT X.id_documento,
						          id_revisao,
						          serial AS serial_revisao,
						          data_limite,
						          progresso_validado,
						          progresso_a_validar,
						          ua
						   FROM
						     (SELECT max(id) AS id_revisao,
						             id_documento
						      FROM gdoks_revisoes
						      GROUP BY id_documento) X
						   INNER JOIN gdoks_revisoes Y ON X.id_revisao=Y.id) revs ON revs.id_documento=docs.id';
					try {
						$rs = $db->query($sql,'iii',$idu,$idu,$idu);	
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro ao tentar listar documentos: '.$e->getMessage());
						$response->flush();
						return;
					}
					
					$response = new response(0,'ok');
					$response->documentos = array_map(function($a){return (object)$a;}, $rs);
					$response->flush();
					return;

				}
			});

			$app->get('/documentos/paraValidar',function() use ($app,$db,$token){
				// Verificando se o token é válido
				$sql = 'SELECT id FROM gdoks_usuarios WHERE token=? AND validade_do_token>NOW()';
				$rs = $db->query($sql,'s',$token);
				if(sizeof($rs)==0){
					// Token expirou
					http_response_code(401);
					$response = new response(1,'Token expirou.');	
					$response->flush();
					die();
				}

				// Lendo o id do usuário para idu
				$idu = $rs[0]['id'];

				// Levantando dados dos documentos que aguardam validação do usuário logado
				$sql = 'SELECT b.id AS id_disciplina,
						       b.nome AS nome_disciplina,
						       b.sigla AS sigla_disciplina,
						       c.id AS id_subdisciplina,
						       c.nome AS nome_subdisciplina,
						       d.id,
						       d.codigo,
						       d.nome,
						       e.id AS id_revisao,
						       e.progresso_a_validar,
						       e.progresso_validado,
						       max(f.id) AS id_pda,
						       f.idu AS id_especialista,
						       g.sigla as sigla_especialista
						FROM gdoks_validadores a
						INNER JOIN gdoks_disciplinas b ON a.id_disciplina=b.id
						INNER JOIN gdoks_subdisciplinas c ON c.id_disciplina=b.id
						INNER JOIN gdoks_documentos d ON d.id_subdisciplina=c.id
						INNER JOIN gdoks_revisoes e ON e.id_documento=d.id
						INNER JOIN gdoks_pdas f ON f.id_revisao=e.id
						INNER JOIN gdoks_usuarios g ON f.idu=g.id
						WHERE a.id_usuario=?
						  AND e.progresso_a_validar>0
						GROUP BY b.id,
						         b.nome,
						         b.sigla,
						         c.id,
						         c.nome,
						         d.id,
						         d.codigo,
						         d.nome,
						         e.id,
						         e.progresso_a_validar,
						         e.progresso_validado,
						         f.idu';
				$documentos = array_map(function($d){return (object)$d;}, $db->query($sql,'i',$idu));

				// Retornando documentos
				$response = new response(0,'Ok');
				$response->documentos = $documentos;
				$response->flush();
			});
			
			$app->get('/documentos/:id',function($id) use ($app,$db,$token){
				// Lendo o token
				$id_doc = 1*$id;

				// Levantando o id do usuário caso ele esteja logado. caso contrário retorna 401
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token);

				if(sizeof($rs) == 0){
					// Respondendo para um token inválido
					http_response_code(401);
					$response = new response(1,'Refresh failed!');
					$response->flush();
					return;
				} else {
					// Escrevendo o id do usuário em idu
					$idu = $rs[0]['id'];

					// Levantando dados básicos do documento
					$sql = 'SELECT
								a.id,
							    a.nome,
							    a.codigo,
							    a.idu_checkout,
							    h.sigla as sigla_checkout,
							    a.datahora_do_checkout,
							    b.id as id_subdisciplina,
							    b.nome as nome_subdisciplina,
							    c.id as id_disciplina,
							    c.nome as nome_disciplina,
								d.id as id_subarea,
							    d.nome as nome_subarea,
							    d.codigo as cod_subarea,
							    e.id as id_area,
							    e.nome as nome_area,
							    g.id as id_projeto,
							    g.nome as nome_projeto,
							    g.ativo as projeto_ativo,
                                ifnull(sum(f.hh),0) as trabalho_estimado

							FROM
								gdoks_documentos a
							    INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
							    INNER JOIN gdoks_disciplinas c ON b.id_disciplina=c.id
							    INNER JOIN gdoks_subareas d ON a.id_subarea=d.id
							    INNER JOIN gdoks_areas e ON d.id_area=e.id
							    INNER JOIN gdoks_projetos g ON g.id=e.id_projeto
                                LEFT JOIN gdoks_hhemdocs f ON f.id_doc=a.id
                                LEFT JOIN gdoks_usuarios h ON h.id=a.idu_checkout
							WHERE
								a.id=?
							GROUP BY
								a.id,
							    a.nome,
							    a.codigo,
							    idu_checkout,
							    datahora_do_checkout,
							    b.id,
							    b.nome,
							    c.id,
							    c.nome,
								d.id,
							    d.nome,
							    e.id,
							    e.nome';
					try {
						$rs = $db->query($sql,'i',$id_doc);	
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro ao tentar carregar documento: '.$e->getMessage());
						$response->flush();
						return;
					}

					// capturando o documento
					$doc = array_map(function($a){return (object)$a;}, $rs)[0];

					// verificando se o usuário é validador ou especialista da disciplina do documento
					$sql = 'SELECT ehEspecialista,
							       ehValidador
							FROM
							  (SELECT count(*) AS ehEspecialista
							   FROM gdoks_especialistas
							   WHERE id_usuario=?
							     AND id_disciplina=?) a
							INNER JOIN
							  (SELECT count(*) AS ehValidador
							   FROM gdoks_validadores
							   WHERE id_usuario=?
							     AND id_disciplina=?) b ON TRUE';
					try {
						$rs = $db->query($sql,'iiii',$idu,$doc->id_disciplina,$idu,$doc->id_disciplina);
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro ao ao executar consulta: '.$e->getMessage());
						$response->flush();
						return;
					}

					// Se não consulta não retornar nenhuma linha usuário não é nem especialista nem validador
					if(sizeof($rs)==0){
						http_response_code(401);
						$response = new response(1,'Usuário não é validador ou especialista da disciplina do documento');
						$response->flush();
						return;	
					} else {
						$doc->ehEspecialista = ($rs[0]['ehEspecialista']==1);
						$doc->ehValidador = ($rs[0]['ehValidador']==1);
					}

					// Levantando revisões deste documento
					$sql = 'SELECT
								id,
								serial,
							    data_limite,
							    progresso_validado,
							    progresso_a_validar,
							    ua
							FROM gdoks_revisoes
							WHERE id_documento=?
							ORDER BY serial desc';
					try {
						$revisoes = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_doc));
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro ao tentar carregar revisões documento: '.$e->getMessage());
						$response->flush();
						return;	
					}
					

					// Levantando pacotes de arquivos (pdas)
					$sql = 'SELECT
								a.id,
							    a.idu_validador,
							    a.datahora_validacao,
							    a.id_revisao,
							    a.progresso_total
							FROM
								gdoks_pdas a
							    INNER JOIN gdoks_revisoes b on a.id_revisao=b.id
							WHERE b.id_documento=?
							ORDER BY a.id DESC';
					$pdas = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_doc));

					// Levantando arquivos do documento
					$sql = 'SELECT
								a.id,
							    a.caminho,
							    a.nome_cliente,
							    a.datahora_upload,
							    a.idu,
							    a.tamanho,
							    b.id_pda
							FROM
								gdoks_arquivos a
							    INNER JOIN gdoks_pdas_x_arquivos b on b.id_arquivo=a.id
							    INNER JOIN gdoks_pdas c on c.id=b.id_pda
							    INNER JOIN gdoks_revisoes d on c.id_revisao=d.id
							WHERE
								d.id_documento=?';
					$arquivos = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_doc));

					// Associando arquivos a PDAs
					foreach ($arquivos as $arquivo) {
						$id_pda = $arquivo->id_pda;
						$pda = array_values(array_filter($pdas,function($e) use($id_pda){
							return $e->id == $id_pda;
						}))[0];
						if(!isset($pda->arquivos)){
							$pda->arquivos = Array();
						}
						array_push($pda->arquivos, $arquivo);
					}

					// Associando PDAs a revisões
					foreach ($pdas as $pda) {
						$id_revisao = $pda->id_revisao;
						$revisao = array_values(array_filter($revisoes,function($e) use($id_revisao){
							return $e->id == $id_revisao;
						}))[0];
						if(!isset($revisao->pdas)){
							$revisao->pdas = Array();
						}
						array_push($revisao->pdas, $pda);
					}

					// Associando revisoes a documento
					$doc->revisoes = $revisoes;

					// Levantando as grds nas quais o documento estava presente e com que revisão ele estava presente
					$sql = 'SELECT c.id,
							       c.codigo,
							       a.id AS id_rev,
       								a.serial AS serial_rev
							FROM gdoks_revisoes a
							INNER JOIN gdoks_grds_x_revisoes b ON b.id_revisao = a.id
							INNER JOIN gdoks_grds c ON c.id = b.id_grd
							WHERE a.id_documento=?
							ORDER BY c.id DESC';
					$grds = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_doc));

					// Associando GRDs nas quais este documento consta
					$doc->grds = $grds;

					// Enviando resposta ao usuário
					$response = new response(0,'ok');
					$response->documento = $doc;
					$response->flush();
					return;

				}
			});
			
			$app->post('/documentos/:id_doc/checkout',function($id_doc) use ($app,$db,$token,$empresa) {
				
				// Levantando o id do usuário
				$sql = 'SELECT id from gdoks_usuarios where token=? and validade_do_token > now()';
				$rs = $db->query($sql,'s',$token);
				if(sizeof($rs) == 0){
					http_response_code(401);
					$response = new response(1,'Token inválido');
					$response->flush();
					exit(1);
				}
				$idu = 1*$rs[0]['id'];


				// Verificando se ele é especialista da disciplina do documento
				$sql = 'SELECT count(*) AS especialista
						FROM gdoks_documentos a
						INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
						INNER JOIN gdoks_disciplinas c ON b.id_disciplina=c.id
						INNER JOIN gdoks_especialistas d ON d.id_disciplina=c.id
						WHERE a.id=?
						  AND d.id_usuario=?';
				$ehEspecialista = (($db->query($sql,'ii',$id_doc,$idu))[0]['especialista'] == 1);
				if(!$ehEspecialista){
					http_response_code(401);
					$response = new response(1,'Usuário não é especialista da disciplina deste documento.');
					$response->flush();
					exit(1);
				}

				// Verificando se o documento está liberado
				$sql = 'SELECT a.idu_checkout,
						       a.datahora_do_checkout,
						       b.sigla
						FROM
							gdoks_documentos a
							LEFT JOIN gdoks_usuarios b on a.idu_checkout=b.id
						WHERE a.id=?';
				$rs = $db->query($sql,'i',$id_doc);
				$documento_liberado = is_null($rs[0]['idu_checkout']);
				if(!$documento_liberado){
					// Retornando o usuário que está com o documento e quando ele fez o checkout
					http_response_code(401);
					$response = new response(2,'Documento bloqueado para revisão por outro usuário');
					$response->idu = $rs[0]['idu_checkout'];
					$response->sigla = $rs[0]['sigla'];
					$response->datahora = $rs[0]['datahora_do_checkout'];
					$response->flush();
					exit(1);
				} else {
					// Bloqueando o documento para usuário revisar
					$sql = 'UPDATE gdoks_documentos SET idu_checkout=?,datahora_do_checkout=now() WHERE id=?';
					$db->query($sql,'ii',$idu,$id_doc);

					// Retornando sucesso
					$response = new response(0,'ok');
					$response->datahora = date('Y-m-d h:i:s');
					$response->flush();

					// Registrando checkout no log
					registrarAcao($db,$idu,ACAO_BLOQUEOU_DOCUMENTO,$id_doc);
				}
			});

			$app->post('/documentos/:id_doc/pdas',function($id_doc) use ($app,$db,$token,$empresa) {

				// Lendo dados
				$id_doc = 1*$id_doc;
				$itens = array_map(function($a){return (object)$a['dados'];}, $_POST['profiles']);
				$progresso_total = $_POST['update']['progressoTotal'];
				$obs = isset($_POST['update']['observacoes']) ? $_POST['update']['observacoes'] : '';
				
				// Levantando o idu do token, se ele ainda for válido
				$sql = 'SELECT id,id_empresa FROM gdoks_usuarios WHERE token=? AND validade_do_token>NOW()';
				$rs = $db->query($sql,'s',$token);
				if(sizeof($rs) == 0){
					// Token expirou
					http_response_code(401);
					$response = new response(1,'Token expirou.');	
					$response->flush();
					die();
				} else {
					$idu = 	$rs[0]['id'];
					$id_empresa = 	$rs[0]['id_empresa'];
				}
				
				// Verificando se o documento pode ser atualiado pelo usuário atual.
				$sql = "SELECT a.id,
						       a.codigo,
						       a.idu_checkout,
						       b.id as id_revisao,
						       count(c.id) AS nAtualizacoes
						FROM gdoks_documentos a
						INNER JOIN gdoks_revisoes b ON a.id=b.id_documento
						LEFT JOIN gdoks_pdas c ON b.id = c.id_revisao
						WHERE a.id=?
						GROUP BY a.id,
						         a.codigo,
						         b.id,
						         c.id
						ORDER BY b.id
						DESC LIMIT 0,1";
				$docinfo = (object)(($db->query($sql,'i',$id_doc))[0]);

				if($docinfo->idu_checkout!=$idu && $docinfo->nAtualizacoes != 0) {
					http_response_code(401);
					$response = new response(1,'Usuário não baixou arquivo para revisão.');
					$response->flush();
					exit(1);
				}
				
				// Determinando a revisão a ser atualizada (última), progresso validado e id do projeto
				$sql = 'SELECT
							a.id,
							a.progresso_validado,
							d.id_projeto
						FROM
							gdoks_revisoes a
							inner join gdoks_documentos b on a.id_documento=b.id
						    inner join gdoks_subareas c on c.id=b.id_subarea
						    inner join gdoks_areas d on c.id_area=d.id
						WHERE id_documento=?
						ORDER BY id DESC LIMIT 1';
				$rs = $db->query($sql,'i',$id_doc);
				$id_revisao = $rs[0]['id'];
				$progresso_validado = $rs[0]['progresso_validado'];
				$id_projeto = $rs[0]['id_projeto'];
				
				// Criando pda e determinando seu id
				$sql = "INSERT INTO gdoks_pdas (progresso_total,id_revisao,idu,datahora,obs) VALUES (?,?,?,NOW(),?)";
				$db->query($sql,'iiis',$progresso_total,$id_revisao,$idu,$obs);
				$id_pda = $db->insert_id;

				// Tratando itens
				foreach ($itens as $i => $item) {

					// caso novo - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
					if($item->tipo == 'novo' || $item->tipo == 'antigoParaAtualizar'){ // mesmos passos do $item->tipo == 'antigoParaAtualizar'
						// determinando o nome local
						$filename = uniqid(true);
						$caminho = CLIENT_DATA_PATH.$empresa.'/uploads/'.$id_projeto.'/';
						$caminho_completo = $caminho.$filename;

						// salvando no fs
						move_uploaded_file($_FILES['profiles']['tmp_name'][$i]['file'], $caminho_completo);

						// criando registro na gdoks_arquivos
						$sql = "INSERT INTO gdoks_arquivos (caminho,nome_cliente,datahora_upload,idu,tamanho,tamanho_do_papel,nPaginas) VALUES (?,?,NOW(),?,?,?,?)";
						$db->query($sql,'ssiiii',
								$caminho_completo,
								$item->nome,
								$idu,
								$_FILES['profiles']['size'][$i]['file'],
								$item->tamanhoDoPapel,
								$item->nPaginas
							);
						$id_arquivo = $db->insert_id;

						// criando registro na gdoks_pdas_x_arquivos
						$sql = 'INSERT INTO gdoks_pdas_x_arquivos (id_pda,id_arquivo) VALUES (?,?)';
						$db->query($sql,'ii',$id_pda,$id_arquivo);
					}

					// caso antigo para manter no pacote
					if($item->tipo == 'antigoNaoAtualizar' && $item->acao==1){
						// determinando o id do arquivo (o mais atual com este nome para este documento)
						$sql = "SELECT a.id FROM
									gdoks_arquivos a
								    inner join gdoks_pdas_x_arquivos b on a.id=b.id_arquivo
								    inner join gdoks_pdas c on c.id=b.id_pda
								    inner join gdoks_revisoes d on d.id=c.id_revisao
								WHERE a.nome_cliente=? and d.id_documento=?
								ORDER BY id_pda DESC
								LIMIT 1";
						$rs = $db->query($sql,'si',$item->nome,$id_doc);
						$id_arquivo = $rs[0]['id'];

						// criando registro na gdoks_pdas_x_arquivos
						$sql = 'INSERT INTO gdoks_pdas_x_arquivos (id_pda,id_arquivo) VALUES (?,?)';
						$db->query($sql,'ii',$id_pda,$id_arquivo);
					}

					// caso antigo para não manter no pacote
					if($item->tipo == 'antigoNaoAtualizar' && $item->acao==0){
						// Não fazer nada!
					}
				}

				// Atualizando dados na tabela de revisoes (progresso a validar e ua)
				$sql = 'UPDATE gdoks_revisoes SET progresso_a_validar= (? - progresso_validado), ua=NOW() WHERE id=?';
				$db->query($sql,'ii',$progresso_total,$id_revisao);

				// Setando como null idu_checkout e datahora_de_checkout
				$sql = 'UPDATE gdoks_documentos SET idu_checkout=null,datahora_do_checkout=null WHERE id=?';
				$db->query($sql,'i',$id_doc);

				// registrando no log a ação
				registrarAcao($db,$idu,ACAO_ATUALIZOU_REVISAO,$id_revisao.','.$id_pda);

				// retornando mensagem para o usuário
				$response = new response(0,'ok');
				$response->flush();

				// disparando ações pós atualização de documento
				GDoks::onDocumentUpdate($id_doc,$empresa);
			});

			$app->post('/documentos/:id_doc/validacaoDeProgresso',function($id_doc) use ($app,$db,$token){
				
				// Lendo dados
				$id_doc = 1*$id_doc;
				$progresso = 1*$app->request->getBody();

				// verificando se o token é válido e descobrindo id do usuário
				$sql = 'SELECT id FROM gdoks_usuarios WHERE token=? AND validade_do_token>NOW()';
				$rs = $db->query($sql,'s',$token);
				if(sizeof($rs) == 0){
					http_response_code(401);
					$response = new response(1,'Token expirou.');	
					die();
				} else {
					$idu = $rs[0]['id'];
				}

				// verificando se o usuário é validador da disciplina do documento
				$sql = 'SELECT count(*) ehValidador
						FROM gdoks_documentos a
						INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
						INNER JOIN gdoks_validadores c ON c.id_disciplina=b.id_disciplina
						WHERE a.id=?
						  AND c.id_usuario=?';
				$rs = $db->query($sql,'ii',$id_doc,$idu);
				if($rs[0]['ehValidador'] != 1){
					http_response_code(401);
					$response = new response(1,'Usuário não é um validador da disciplina deste documento.');	
					die();
				}

				// determinando o id da última revisão e o id do último pda
				$sql = 'SELECT a.id AS id_revisao,
						       b.id AS id_pda
						FROM gdoks_revisoes a
						LEFT JOIN gdoks_pdas b ON a.id=b.id_revisao
						AND a.id_documento=?
						ORDER BY b.id DESC LIMIT 1';
				$rs = $db->query($sql,'i',$id_doc);
				$id_revisao = $rs[0]['id_revisao'];
				$id_pda = $rs[0]['id_pda'];

				// validando progresso 1: TABELA DE REVISÕES
				$sql = 'UPDATE gdoks_revisoes SET progresso_validado = progresso_validado + ?,progresso_a_validar = 0 WHERE id=?';
				$db->query($sql,'ii',$progresso,$id_revisao);

				// levantando novo progresso total validado
				$sql = 'SELECT progresso_validado,id
						FROM gdoks_revisoes
						WHERE id=?';
				$rs = $db->query($sql,'i',$id_revisao);
				$progresso_validado = $rs[0]['progresso_validado'];
				$id_revisao = $rs[0]['id'];

				// validando progresso 2: TABELA DE PDAS
				$sql = 'UPDATE gdoks_pdas SET progresso_total=?,idu_validador=?,datahora_validacao=now() WHERE id=?';
				$db->query($sql,'iii',$progresso_validado,$idu,$id_pda);

				// registrando no log
				registrarAcao($db,$idu,ACAO_VALIDOU_PROGRESSO,$progresso_validado.','.$id_doc);

				// dando retorno para o cliente.
				$response = new response(0,'ok');
				$response->flush();
			});

			$app->post('/documentos/validarProgressos',function() use ($app,$db,$token){
				// Verificando se o token é válido
				$sql = 'SELECT id FROM gdoks_usuarios WHERE token=? AND validade_do_token>NOW()';
				$rs = $db->query($sql,'s',$token);
				if(sizeof($rs)==0){
					// Token expirou
					http_response_code(401);
					$response = new response(1,'Token expirou.');	
					$response->flush();
					die();
				}

				// Lendo id do usuário para a variável idu
				$idu = $rs[0]['id'];

				// Lendo dados
				$documentos = json_decode($app->request->getBody());
				
				// Atualizando documentos
				foreach ($documentos as $doc) {
					// Atualizando pda
					$sql = 'UPDATE gdoks_pdas
							SET progresso_total=?,
				                idu_validador=?,
				                datahora_validacao=NOW()
							WHERE id=?;';
					$db->query($sql,'iii',$doc->progresso_a_validar+$doc->progresso_validado,$idu,$doc->id_pda);

					// Atualizando revisão
					$sql = 'UPDATE gdoks_revisoes
							SET progresso_a_validar=0,
							    progresso_validado=?,
							    ua=now()
							WHERE id=?';
					$db->query($sql,'ii',$doc->progresso_a_validar+$doc->progresso_validado,$doc->id_revisao);

					// registrando a ação no log
					registrarAcao($db,$idu,ACAO_VALIDOU_PROGRESSO,$doc->progresso_validado.','.$doc->id);
				}

				// retornando para o usuário
				$response = new response(0,'ok');
			});

			$app->get('/documentos/search/q',function() use ($app,$db,$token){
				
				// Extraindo valores do get montando o objeto de busca q
				$q = new stdClass();
				$q->nome				= (array_key_exists('nome',				$_GET) && $_GET['nome'] 			!= 'undefined') ? $_GET['nome']:null;
				$q->ordem				= (array_key_exists('ordem',			$_GET) && $_GET['ordem'] 			!= 'undefined') ? $_GET['ordem']:null;
				$q->id_cliente			= (array_key_exists('id_cliente',		$_GET) && $_GET['id_cliente'] 		!= 'undefined') ? $_GET['id_cliente']:null;
				$q->id_projeto			= (array_key_exists('id_projeto',		$_GET) && $_GET['id_projeto'] 		!= 'undefined') ? $_GET['id_projeto']:null;
				$q->id_area				= (array_key_exists('id_area',			$_GET) && $_GET['id_area'] 			!= 'undefined') ? $_GET['id_area']:null;
				$q->id_subarea			= (array_key_exists('id_subarea',		$_GET) && $_GET['id_subarea'] 		!= 'undefined') ? $_GET['id_subarea']:null;
				$q->id_disciplina		= (array_key_exists('id_disciplina',	$_GET) && $_GET['id_disciplina'] 	!= 'undefined') ? $_GET['id_disciplina']:null;
				$q->id_subdisciplina	= (array_key_exists('id_subdisciplina',	$_GET) && $_GET['id_subdisciplina'] != 'undefined') ? $_GET['id_subdisciplina']:null;
				$q->validacao			= (array_key_exists('validacao',		$_GET) && $_GET['validacao'] 		!= 'undefined') ? $_GET['validacao']:null;
				$q->completude			= (array_key_exists('completude',		$_GET) && $_GET['completude'] 		!= 'undefined') ? $_GET['completude']:null;
				$q->pagAtual			= (array_key_exists('pagAtual',			$_GET) && $_GET['pagAtual'] 		!= 'undefined') ? $_GET['pagAtual']:null;

				// monstando as restricoes no obj restrict
				$restrict = new stdClass();

				// Montando restições sobre o documento - - - - - - - - - - -
				if($q->nome == ''){
					$restrict->nome = 'trueFromStr(?) OR trueFromStr(?) OR trueFromStr(?) OR trueFromStr(?)';
				} else {
					$restrict->nome = 'a.nome like ? OR a.codigo like ? OR codigo_alternativo like ? OR codigo_cliente like ?';
				}
				
				
				// Restrição de subarea,area,projeto,cliente
				if(!is_null($q->id_subarea)){
					$restrict->cliente  = 'trueFromInt(?)';
					$restrict->projeto  = 'trueFromInt(?)';
					$restrict->area 	= 'trueFromInt(?)';
					$restrict->subarea  = 'b.id=?';
				} else {
					if(!is_null($q->id_area)){
						$restrict->cliente = 'trueFromInt(?)';
						$restrict->projeto = 'trueFromInt(?)';
						$restrict->area    = 'c.id=?';
						$restrict->subarea = 'trueFromInt(?)';
					} else { 
						if(!is_null($q->id_projeto)){
							$restrict->cliente = 'trueFromInt(?)';
							$restrict->projeto = 'd.id=?';
							$restrict->area    = 'trueFromInt(?)';
							$restrict->subarea = 'trueFromInt(?)';
						} else {
							if(!is_null($q->id_cliente)){
								$restrict->cliente = 'e.id=?';
								$restrict->projeto = 'trueFromInt(?)';
								$restrict->area    = 'trueFromInt(?)';
								$restrict->subarea = 'trueFromInt(?)';
							} else {
								$restrict->cliente = 'trueFromInt(?)';
								$restrict->projeto = 'trueFromInt(?)';
								$restrict->area    = 'trueFromInt(?)';
								$restrict->subarea = 'trueFromInt(?)';
							}		
						}
					}
				}

				// restricao de subdisciplina e disciplina
				if(!is_null($q->id_subdisciplina)){
					$restrict->disciplina    = 'trueFromInt(?)';
					$restrict->subdisciplina = 'f.id=?';
				} else {
					if(!is_null($q->id_disciplina)){
						$restrict->disciplina    = 'g.id=?';
						$restrict->subdisciplina = 'trueFromInt(?)';
					} else {
						$restrict->disciplina    = 'trueFromInt(?)';
						$restrict->subdisciplina = 'trueFromInt(?)';
					}
				}

				// Montando restrições sobre a completude
				if($q->completude == '1'){
					$restrict->completude = 'progresso_validado<100';
				} elseif($q->completude == '2'){
					$restrict->completude = 'progresso_validado=100';
				} else {
					$restrict->completude = 'true';
				}

				// Montando restrições sobre a validacao
				if($q->validacao == '1'){
					$restrict->validacao = 'id_progresso_a_validar>0';
				} elseif($q->validacao == '2'){
					$restrict->validacao = 'id_progresso_a_validar=0';
				} else {
					$restrict->validacao = 'true';
				}

				// Definindo ordem
				if($q->ordem == 'nome'){
					$ordem = 'nome';
				} else {
					$ordem = 'data_limite';
				}

				// Montando colunas
				$colunas = 'a.id,
							a.codigo,
							a.codigo_cliente,
							a.codigo_alternativo,
							a.nome,
							a.idu_checkout,
							a.datahora_do_checkout,
							b.codigo AS subarea_codigo,
							b.id AS subarea_id,
							b.nome AS subarea_nome,
							c.id AS area_id,
							c.codigo AS area_codigo,
							c.nome AS area_nome,
							d.id AS projeto_id,
							d.nome AS projeto_nome,
							e.id AS cliente_id,
							e.nome_fantasia AS cliente_nome,
							f.id AS subdisciplina_id,
							f.nome AS subdisciplina_nome,
							g.id AS disciplina_id,
							g.nome AS disciplina_nome';

				$tabelas = ' gdoks_documentos a
						   INNER JOIN gdoks_subareas b ON a.id_subarea=b.id
						   INNER JOIN gdoks_areas c ON b.id_area=c.id
						   INNER JOIN gdoks_projetos d ON c.id_projeto=d.id
						   INNER JOIN gdoks_clientes e ON d.id_cliente=e.id
						   INNER JOIN gdoks_subdisciplinas f ON a.id_subdisciplina=f.id
						   INNER JOIN gdoks_disciplinas g ON f.id_disciplina=g.id';

				// Determinando o total de ocorrências
				$sql = "SELECT count(*) as n
						FROM
						  (SELECT $colunas
						   FROM $tabelas
						   WHERE
						   		$restrict->subarea
						   		AND $restrict->area
						   		AND $restrict->subdisciplina
						   		AND $restrict->disciplina
						   		AND $restrict->projeto
						   		AND $restrict->cliente
						   		AND ($restrict->nome)
						   ) X
						LEFT JOIN
						  (SELECT id_documento,max(id) AS id_revisao, serial, data_limite,
						                                                      progresso_validado,
						                                                      progresso_a_validar
						   FROM gdoks_revisoes
						   GROUP BY id_documento,data_limite,progresso_validado,progresso_a_validar,serial) Y ON X.id=Y.id_documento
						WHERE
							$restrict->completude AND
							$restrict->validacao";

				$n = $db->query(
						$sql,
						'iiiiiissss',
						$q->id_subarea,
						$q->id_area,
						$q->id_subdisciplina,
						$q->id_disciplina,
						$q->id_projeto,
						$q->id_cliente,
						'%'.$q->nome.'%',
						'%'.$q->nome.'%',
						'%'.$q->nome.'%',
						'%'.$q->nome.'%'
					)[0]['n'];
				
				// Determinando a paginação
				$npp = 10;
				$pos_inicial  = ($q->pagAtual-1)*$npp;

				// Montando sql
				$sql = "SELECT *
						FROM
						  (SELECT $colunas
						   FROM $tabelas
						   WHERE
						   		$restrict->subarea
						   		AND $restrict->area
						   		AND $restrict->subdisciplina
						   		AND $restrict->disciplina
						   		AND $restrict->projeto
						   		AND $restrict->cliente
						   		AND ($restrict->nome)
						   ) X
						LEFT JOIN
						  (SELECT id_revisao,
							       b.id_documento,
							       b.serial,
							       b.data_limite,
							       b.ua,
							       b.progresso_validado,
							       b.progresso_a_validar
							FROM
							  (SELECT id_documento,
							          max(id) AS id_revisao
							   FROM gdoks_revisoes
							   GROUP BY id_documento) a
							INNER JOIN gdoks_revisoes b ON a.id_revisao=b.id) Y ON X.id=Y.id_documento
						WHERE
							$restrict->completude AND
							$restrict->validacao
						ORDER BY $ordem
						LIMIT $pos_inicial,$npp
						";
				
				$rs = $db->query(
						$sql,
						'iiiiiissss',
						$q->id_subarea,
						$q->id_area,
						$q->id_subdisciplina,
						$q->id_disciplina,
						$q->id_projeto,
						$q->id_cliente,
						'%'.$q->nome.'%',
						'%'.$q->nome.'%',
						'%'.$q->nome.'%',
						'%'.$q->nome.'%'
					);
				$response = new response(0,'ok');
				$response->documentos = $rs;
				$response->total = $n;
				$response->npp = $npp;
				$response->flush();
			});
			
			$app->put('/documentos/:id_doc/revisoes/:id_rev/enderecoFisico',function($id_doc,$id_rev) use ($app,$db,$token){

				// Guardando o endereço
				$endereco = $app->request->getBody();

				// Validando consistência: se drevisão é do documento
				$sql = 'SELECT count(*) as n FROM gdoks_revisoes WHERE id=? and id_documento=?';	
				$ok = ($db->query($sql,'ii',$id_rev,$id_doc)[0]['n'] == 1);
				if($ok){
					try {
						if(trim($endereco) == ''){
							$sql = 'UPDATE gdoks_revisoes SET end_fisico=null WHERE id=?';
							$db->query($sql,'i',$id_rev);
						} else {
							$sql = 'UPDATE gdoks_revisoes SET end_fisico=? WHERE id=?';
							$db->query($sql,'si',$endereco,$id_rev);
						}
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					$response = new response(0,'ok');
					$response->flush();
					
				} else {
					http_response_code(401);
					$response = new response(1,'Inconsistência nos dados');
					$response->flush();
					return;
				}
			});

			$app->get('/documentos/:id_doc/avancarRevisao',function($id_doc) use ($app,$db,$token){
				// Lendo dados de id_doc
				$id_doc = 1*$id_doc;

				// Levantando o serial atual
				$sql = "SELECT data_limite, max(serial)+1 as novoSerial FROM gdoks_revisoes WHERE id_documento=?";
				$rs = $db->query($sql,'i',$id_doc);
				$novoSerial = $rs[0]['novoSerial'];
				$dataLimite = $rs[0]['data_limite'];

				// Criando nova revisão
				$sql = "INSERT INTO gdoks_revisoes (serial,id_documento,data_limite) VALUES (?,?,?)";
				$db->query($sql,'iis',$novoSerial,$id_doc,$dataLimite);

				// Retornando resposta ao cliente
				$response = new response(0,'Ok');
				$response->newId = $db->insert_id;
				$response->newId = 620;
				$response->newSerial = $novoSerial;
				$response->flush();
				return;
			});
		// FIM DE ROTAS DE DOCUMENTOS

		// ROTAS DE ARQUIVOS
			$app->get('/arquivos/:id',function($id) use ($app,$db,$token){
				// Lendo o token
				$token = $_GET['token'];

				// Levantando o id do usuário caso ele esteja logado. caso contrário retorna 401
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token);

				if(sizeof($rs) == 0){
					http_response_code(401);
					$response = new response(1,'Refresh failed!');
					$response->flush();
					return;
				} else {
					// Salvando o idu
					$idu = $rs[0]['id'];

					// levantando o caminnho do arquivo
					$sql = 'SELECT caminho,nome_cliente FROM gdoks_arquivos WHERE id=?';
					$fileInfo = $db->query($sql,'i',$id)[0];
					$caminho = 	$fileInfo['caminho'];
					$nome_cliente = $fileInfo['nome_cliente'];

					// Verificando se o arquivo existe
					if(file_exists($caminho)){
						// configurando o header
						header('Content-Description: File Transfer');
						header('Content-Type: application/octet-stream');
						header('Content-Disposition: attachment; filename="'.basename($nome_cliente).'"');
						header('Content-Transfer-Encoding: binary');
						header('Expires: 0');
						header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
						header('Pragma: public');
						header('Content-Length: ' . filesize($caminho));

						// enviando o arquivo
						readfile($caminho);
						registrarAcao($db,$idu,ACAO_BAIXOU_ARQUIVO,''.$id);
					} else {
						$app->response->setStatus(404);
						$response = new response(1,'Arquivo ('.$caminho.') não encontrado.');
						$response->flush();
						return;
					}
				}
			});
		// FIM DE ROTAS DE ARQUIVOS
		
		// ROTAS DE CLIENTES
			$app->get('/clientes',function() use ($app,$db,$token){
				$sql = 'SELECT a.id,
						       a.nome,
						       a.cnpj,
						       a.cpf,
						       a.contato_nome,
						       a.contato_email,
						       a.contato_telefone,
						       a.endereco,
                               (!isnull(ftp_host) and !isnull(ftp_usuario) and !isnull(ftp_senha)) as ftp_configurado
						FROM gdoks_clientes a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
							ORDER by a.nome';
				$response = new response(0,'ok');
				$response->clientes = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->get('/clientes/:id',function($id) use ($app,$db,$token){
				$sql = 'SELECT a.id,
						       a.nome,
						       a.nome_fantasia,
						       a.cnpj,
						       a.cpf,
						       a.contato_nome,
						       a.contato_email,
						       a.contato_telefone,
						       a.ftp_host,
						       a.ftp_usuario,
						       a.login,
						       a.endereco
						FROM gdoks_clientes a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
						WHERE a.id=?
							ORDER by a.nome';
				$response = new response(0,'ok');
				$response->cliente = $db->query($sql,'si',$token,$id)[0];
				$response->flush();
			});

			$app->put('/clientes/:id',function($id) use ($app,$db,$token){
				// Lendo dados
				$cliente = json_decode($app->request->getBody());

				// verifricando consistência de dados
				if($cliente->id != $id){
					$response = new response(1,'Dados inconsistentes.');
					$response->flush();
					die();
				}
				
				// Tornando consistente o cliente quanto a escolha
				if($cliente->tipo == '1'){
					$cliente->cpf = null;
				} elseif($cliente->tipo == '2') {
					$cliente->cnpj = null;
				}

				// Verificando se o cliente é da mesma empresa do usuário
				$sql = 'SELECT
							A.id,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks_clientes
								WHERE id=?) B on A.id_empresa=B.id_empresa;';
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id'];

				// Indo adiante
				if($ok == 1) {

					// Verificando se o cliente está com a senha do ftp setada
					if(empty($cliente->ftp_senha) || is_null($cliente->ftp_senha) || $cliente->ftp_senha==''){

						// Verificando se o cliente está com a senha de login setada
						if(empty($cliente->senha) || is_null($cliente->senha) || $cliente->senha==''){
							// Fazendo alteração sem alteração de senha FTP nem login
							$sql = "UPDATE gdoks_clientes
									SET	
										nome=?,
		         						nome_fantasia=?,
				                       	cpf=?,
										cnpj=?,
		                                contato_nome=?,
		                                contato_email=?,
		                                contato_telefone=?,
		                                endereco=?,
		                                ftp_host=?,
		                                ftp_usuario=?,
		                                login=?
		                            WHERE id=?";
		                    try {
		                    	$db->query($sql,'sssssssssssi',$cliente->nome,$cliente->nome_fantasia,$cliente->cpf,$cliente->cnpj,$cliente->contato_nome,$cliente->contato_email,$cliente->contato_telefone,$cliente->endereco,$cliente->ftp_host,$cliente->ftp_usuario,$cliente->login,$id);
		                    } catch (Exception $e) {
		                    	http_response_code(401);
		                    	$response = new response(1,'Erro na consulta: '.$e->getMessage());
								$response->flush();
								exit(1);
							}
						} else {
							// Fazendo alteração sem alteração de senha FTP mas alterando login
							$sql = "UPDATE gdoks_clientes
									SET	
										nome=?,
		         						nome_fantasia=?,
				                       	cpf=?,
										cnpj=?,
		                                contato_nome=?,
		                                contato_email=?,
		                                contato_telefone=?,
		                                endereco=?,
		                                ftp_host=?,
		                                ftp_usuario=?,
		                                senha=AES_ENCRYPT(?, UNHEX(SHA2(?,512))),
		                                login=?
		                            WHERE id=?";
		                    try {
		                    	$db->query($sql,'sssssssssssssi',$cliente->nome,$cliente->nome_fantasia,$cliente->cpf,$cliente->cnpj,$cliente->contato_nome,$cliente->contato_email,$cliente->contato_telefone,$cliente->endereco,$cliente->ftp_host,$cliente->ftp_usuario,$cliente->senha,AES_KEY,$cliente->login,$id);
		                    } catch (Exception $e) {
		                    	http_response_code(401);
		                    	$response = new response(1,'Erro na consulta: '.$e->getMessage());
								$response->flush();
								exit(1);
							}
						}

					} else {

						// Verificando se o cliente está com a senha de login setada
						if(empty($cliente->senha) || is_null($cliente->senha) || $cliente->senha==''){
							// Fazendo alteração da senha FTP inclusive, mas não altera senha de acesso
							$sql = "UPDATE gdoks_clientes
									SET	
										nome=?,
		         						nome_fantasia=?,
				                       	cpf=?,
										cnpj=?,
		                                contato_nome=?,
		                                contato_email=?,
		                                contato_telefone=?,
		                                endereco=?,
		                                ftp_host=?,
		                                ftp_usuario=?,
		                                ftp_senha=AES_ENCRYPT(?, UNHEX(SHA2(?,512))),
		                                login=?
		                            WHERE id=?";
		                    try {
		                    	$db->query($sql,'sssssssssssssi',$cliente->nome,$cliente->nome_fantasia,$cliente->cpf,$cliente->cnpj,$cliente->contato_nome,$cliente->contato_email,$cliente->contato_telefone,$cliente->endereco,$cliente->ftp_host,$cliente->ftp_usuario,$cliente->ftp_senha,AES_KEY,$cliente->login,$id);
		                    } catch (Exception $e) {
		                    	http_response_code(401);
		                    	$response = new response(1,'Erro na consulta: '.$e->getMessage());
								$response->flush();
								exit(1);
							}

						} else {
							$sql = "UPDATE gdoks_clientes
									SET	
										nome=?,
		         						nome_fantasia=?,
				                       	cpf=?,
										cnpj=?,
		                                contato_nome=?,
		                                contato_email=?,
		                                contato_telefone=?,
		                                endereco=?,
		                                ftp_host=?,
		                                ftp_usuario=?,
		                                ftp_senha=AES_ENCRYPT(?, UNHEX(SHA2(?,512))),
		                                senha=AES_ENCRYPT(?, UNHEX(SHA2(?,512))),
		                                login=?
		                            WHERE id=?";
		                    try {
		                    	$db->query($sql,'sssssssssssssssi',$cliente->nome,$cliente->nome_fantasia,$cliente->cpf,$cliente->cnpj,$cliente->contato_nome,$cliente->contato_email,$cliente->contato_telefone,$cliente->endereco,$cliente->ftp_host,$cliente->ftp_usuario,$cliente->ftp_senha,AES_KEY,$cliente->senha,AES_KEY,$cliente->login,$id);
		                    } catch (Exception $e) {
		                    	http_response_code(401);
		                    	$response = new response(1,'Erro na consulta: '.$e->getMessage());
								$response->flush();
								exit(1);
							}
						}
					}
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					$response->flush();
					exit(1);
				}

				// retornando
				$response = new response(0,'Dados do cliente alterados com sucesso.');
				$response->flush();

				// registrando alteração
				registrarAcao($db,$id_usuario,ACAO_ALTEROU_CLIENTE,$cliente->id.','.$cliente->nome.','.$cliente->nome_fantasia);
			});

			$app->post('/clientes',function() use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$cliente = json_decode($app->request->getBody());
				
				// Tornando consistente o cliente quanto a escolha
				if($cliente->tipo == '1'){
					$cliente->cpf = null;
				} elseif($cliente->tipo == '2') {
					$cliente->cnpj = null;
				}

				// Capturando o id e o id_empresa do usuário atual
				$sql = 'SELECT
							id,id_empresa
						FROM 
							gdoks_usuarios
						WHERE
							token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token)[0];
				$id_empresa = $rs['id_empresa'];
				$id = $rs['id'];

				// Verificando se a senha do FTP foi preenchida
				if(empty($cliente->ftp_senha) || is_null($cliente->ftp_senha) || $cliente->ftp_senha==''){

					// Inserindo novo cliente sem senha ftp.
					$sql = 'INSERT INTO gdoks_clientes (nome,nome_fantasia,cpf,cnpj,contato_nome,contato_email,contato_telefone,id_empresa,registrado_em,endereco,ftp_host,ftp_usuario) VALUES (?,?,?,?,?,?,?,?,NOW(),?,?,?)';
					try {
						$db->query($sql,'sssssssisss',$cliente->nome,$cliente->nome_fantasia,$cliente->cpf,$cliente->cnpj,$cliente->contato_nome,$cliente->contato_email,$cliente->contato_telefone,$id_empresa,$cliente->endereco,$cliente->ftp_host,$cliente->ftp_usuario);
						$response = new response(0,'Cliente adicionado com sucesso.');
						$response->newId = $db->insert_id;
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
				} else {
					// Inserindo novo cliente com senha ftp.
					$sql = 'INSERT INTO gdoks_clientes (nome,nome_fantasia,cpf,cnpj,contato_nome,contato_email,contato_telefone,id_empresa,registrado_em,endereco,ftp_host,ftp_usuario,ftp_senha) VALUES (?,?,?,?,?,?,?,?,NOW(),?,?,?,AES_ENCRYPT(?,UNHEX(SHA2(?,512))))';
					try {
						$db->query($sql,'sssssssisssss',$cliente->nome,$cliente->nome_fantasia,$cliente->cpf,$cliente->cnpj,$cliente->contato_nome,$cliente->contato_email,$cliente->contato_telefone,$id_empresa,$cliente->endereco,$cliente->ftp_host,$cliente->ftp_usuario,$cliente->ftp_senha,AES_KEY);
						$response = new response(0,'Cliente adicionado com sucesso.');
						$response->newId = $db->insert_id;
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
				}
				// Registrando a ação
				registrarAcao($db,$id,ACAO_ADICIONOU_CLIENTE,$db->insert_id.','.$cliente->nome);
			});
		// FIM DE ROTAS DE CLIENTES
		
		// ROTAS DE AÇÕES
			$app->get('/acoes',function() use ($app,$db,$token){
				$sql = 'SELECT id,
						       nome,
						       descricao
						FROM gdoks_acoes';
				$response = new response(0,'ok');
				$response->acoes = $db->query($sql);
				$response->flush();
			});
		// FIM DE ROTAS DE AÇÕES

		// ROTAS DE LOGS
			$app->get('/logs/:uid/:aid/:de/:ate',function($uid,$aid,$de,$ate) use ($app,$db,$token){
				$uid = 1*$uid;
				$aid = 1*$aid;
				$de  = (DateTime::createFromFormat('Y-m-d', $de ))->format('Y-m-d').' 00:00:00';
				$ate = (DateTime::createFromFormat('Y-m-d', $ate))->format('Y-m-d').' 23:59:59';
				$condicaoUid = ($uid == 0?"id_usuario>?":"id_usuario=?");
				$condicaoAid = ($aid == 0?"id_acao>?":"id_acao=?");
				
				$sql = "SELECT id_usuario,
						       id_acao,
						       parametros,
						       data
						FROM gdoks_log
						WHERE data>=? and data<=? and $condicaoUid and $condicaoAid
						ORDER BY data desc
						";
						
				$response = new response(0,'ok');
				$response->logs = $db->query($sql,'ssii',$de,$ate,$uid,$aid);
				$response->flush();
				
			});
		// FIM DE ROTAS DE LOGS

		// ROTAS DE CARGOS
			$app->get('/cargos',function() use ($app,$db,$token){
				$sql = 'SELECT a.id,
						       a.nome,
						       a.valor_hh
						FROM gdoks_cargos a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
							ORDER by a.nome';
				$response = new response(0,'ok');
				$response->cargos = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->get('/cargos/:id',function($id) use ($app,$db,$token){
				$idCargo = 1*$id;
				$sql = 'SELECT a.id,
						       a.nome,
						       a.valor_hh
						FROM gdoks_cargos a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
						WHERE a.id=?';
				$response = new response(0,'ok');
				$response->cargos = $db->query($sql,'si',$token,$idCargo);
				$response->flush();
			});

			$app->put('/cargos/:id',function($id) use ($app,$db,$token){
				// Lendo dados
				$cargo = json_decode($app->request->getBody());

				// verifricando consistência de dados
				if($cargo->id != $id){
					$response = new response(1,'Dados inconsistentes.');
					$response->flush();
					die();
				}
				
				// Verificando se o cargo é da mesma empresa do usuário
				$sql = 'SELECT
							A.id,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks_cargos
								WHERE id=?) B on A.id_empresa=B.id_empresa;';
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id'];

				// Indo adiante
				if($ok == 1) {
					$sql = "UPDATE gdoks_cargos
							SET	
								nome=?,
         						valor_hh=?
                            WHERE id=?";
                    try {
                    	$db->query($sql,'sdi',$cargo->nome,$cargo->valor_hh,$cargo->id);
                    } catch (Exception $e) {
                    	$response = new response(1,'Erro na consulta: '.$e->getMessage());
						$response->flush();
						die();
                    }
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					die();
				}

				// retornando
				$response = new response(0,'Dados do cargo alterados com sucesso.');
				$response->flush();

				// registrando alteração
				registrarAcao($db,$id_usuario,ACAO_ALTEROU_CARGO,$cargo->id.','.$cargo->nome.','.$cargo->valor_hh);
			});
			
			$app->post('/cargos',function() use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$cargo = json_decode($app->request->getBody());

				// Capturando o id e o id_empresa do usuário atual
				$sql = 'SELECT
							id,id_empresa
						FROM 
							gdoks_usuarios
						WHERE
							token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token)[0];
				$id_empresa = $rs['id_empresa'];
				$id = $rs['id'];

				// Inserindo novo cliente.
				$sql = 'INSERT INTO gdoks_cargos (nome,valor_hh,id_empresa) VALUES (?,?,?)';
				try {
					$db->query($sql,'sdi',$cargo->nome,$cargo->valor_hh,$id_empresa);
					$response = new response(0,'Cargo criado com sucesso.');
					$response->newId = $db->insert_id;
					$response->flush();
				} catch (Exception $e) {
					http_response_code(401);
					$response = new response(1,$e->getMessage());
					$response->flush();
					return;
				}
				// Registrando a ação
				registrarAcao($db,$id,ACAO_ADICIONOU_CARGO,$db->insert_id.','.$cargo->nome.','.$cargo->valor_hh);
			});
			
			$app->delete('/cargos/:id',function($id) use ($app,$db,$token){
				// Lendo dados
				$idCargo = 1*$id;

				// Verificando se o cargo é da mesma empresa do usuário
				$sql = 'SELECT
							A.id,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks_cargos
								WHERE id=?) B on A.id_empresa=B.id_empresa;';
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id'];

				// Indo adiante
				if($ok == 1) {
					$sql = "DELETE FROM gdoks_cargos WHERE id=?";
                    try {
                    	$db->query($sql,'i',$idCargo);
                    } catch (Exception $e) {
                    	$response = new response(1,'Erro na consulta: '.$e->getMessage());
						$response->flush();
						die();
                    }
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					die();
				}

				// retornando
				$response = new response(0,'Cargo removido com sucesso.');
				$response->flush();

				// registrando alteração
				registrarAcao($db,$id_usuario,ACAO_REMOVEU_CARGO,$idCargo);
			});
		// FIM DE ROTAS DE CARGOS

		// ROTAS DE SUBÁREAS
			$app->put('/subareas/:id_subarea',function($id_subarea) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_subarea = 1*$id_subarea;
				$subarea = json_decode($app->request->getBody());

				// parando caso haja inconscistência entre o id_projeto vindo no corpo da requisição e o da url
				if($id_subarea != $subarea->id) {
					http_response_code(401);
					$response = new response(1,'inconscistência nas informações fornecidas');
					$response.flush();
					die();
				}

				// verificando se o usário enviado é do mesmo cliente da subarea atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos p
						   INNER JOIN gdoks_areas a ON p.id=a.id_projeto
						   INNER JOIN gdoks_subareas s ON s.id_area=a.id
						   AND s.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_subarea)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A subarea a ser alterada é do mesmo cliente do usuário
					$sql = 'UPDATE gdoks_subareas SET nome=?,codigo=?,id_area=? WHERE id=?';
					try {
						$db->query($sql,'ssii',$subarea->nome,$subarea->codigo,$subarea->area->id,$id_subarea);
						$response = new response(0,'Área alterada com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_SUBAREA,$subarea->id.','.$subarea->nome.','.$subarea->codigo.','.$subarea->area->id);
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/subareas/',function() use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$subarea = json_decode($app->request->getBody());

				// verificando se o usário enviado é do mesmo cliente da area atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos d
						   	INNER JOIN gdoks_areas e on d.id=e.id_projeto
						   WHERE e.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$subarea->area->id)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A area a ser adicionada é do mesmo cliente do usuário
					$sql = 'INSERT INTO gdoks_subareas (nome,codigo,id_area) VALUES (?,?,?)';
					try {
						$db->query($sql,'ssi',$subarea->nome,$subarea->codigo,$subarea->area->id);
						$response = new response(0,'Subárea adicionada com sucesso.');
						$response->newId = $db->insert_id;
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_CRIOU_SUBAREA,$subarea->id.','.$subarea->nome.','.$subarea->codigo.','.$subarea->area->id);
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->delete('/subareas/:id_subarea',function($id_subarea) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$id_subarea = 1*$id_subarea;
				
				// levantando area na base de dados
				$sql = 'SELECT id,
						       nome,
						       codigo,
						       id_area
						FROM gdoks_subareas
						WHERE id=?';
				$subarea = $db->query($sql,'i',$id_subarea)[0];

				// verificando se o usário enviado é da mesma empresa da subárea atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_projetos p
						   INNER JOIN gdoks_areas a ON p.id=a.id_projeto
						   INNER JOIN gdoks_subareas s on s.id_area=a.id
						   AND s.id=?) B ON A.id_empresa=B.id_empresa';
				$rs = $db->query($sql,'si',$token,$id_subarea)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id_usuario'];
				if($ok == 1){
					// Tudo ok! A subdisciplina a ser adicionada é do mesmo cliente do usuário
					$sql = 'DELETE FROM gdoks_subareas WHERE id=?';
					try {
						$db->query($sql,'i',$id_subarea);
						$response = new response(0,'Sub-área removida com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_REMOVEU_SUBAREA,implode(',',$subarea));
				} else {
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});
		// FIM DE ROTAS DE SUBÁREAS

		// ROTAS DE TAMANHOS DE PAPEL
			$app->get('/tamanhosDePapel',function() use ($app,$db,$token){
				$sql = 'SELECT x.id,
						       x.nome,
						       x.altura as a,
						       x.largura as l
						FROM gdoks_tamanhos_de_papel x
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks_usuarios
						   WHERE token=?) b ON x.id_empresa=b.id_empresa
							ORDER by x.nome';
				$response = new response(0,'ok');
				$response->tamanhosDePapel = $db->query($sql,'s',$token);
				$response->flush();
			});
		// FIM DE ROTAS DE TAMANHOS DE PAPEL

		// ROTAS DE PDAS
			$app->get('/pdas/:id',function($id) use ($app,$db,$token,$empresa){
				// Lendo o token
				$id_pda = 1*$id;

				// verificando se o token é valido e lendo o idu do usuário
				$sql = 'SELECT
							id
						FROM gdoks_usuarios
						WHERE token=? AND validade_do_token>NOW()';
				$rs = $db->query($sql,'s',$token);

				// Se recset voltar vazio, manda erro para o cliente. O token dele deve ter expirado
				if(sizeof($rs) == 0){
					http_response_code(401);
					$response = new response(1,'Token expirado');
					$response->flush();
					die();
				} else {
					// Levantando todos os arquivos do pda
					$sql = 'SELECT caminho,nome_cliente
							FROM gdoks_pdas_x_arquivos a
							INNER JOIN gdoks_arquivos b ON a.id_arquivo=b.id
							WHERE a.id_pda=?';
					$rs = $db->query($sql,'s',$id_pda);
					$caminhos = $rs;
					
					// Definindo nome do arquivo zip
					$filename = TMP_PATH.'pda_'.$id_pda.'.zip';

					// Criando arquivo zip
					$zip = new ZipArchive();
					$abriu_ok = $zip->open($filename,ZipArchive::CREATE);
					if($abriu_ok !== true){
						echo('Erro ao criar arquivo zip: '.$abriu_ok);
						die();
					}
					

					// Adicionando arquivos ao zip
					$arquivosOk = true;
					$inexistentes = Array();
					foreach ($caminhos as $c) {
						if(!file_exists($c['caminho'])){
							array_push($inexistentes, $c['caminho']);
						}
					}
					$arquivosOk = (sizeof($inexistentes) == 0);

					if(!$arquivosOk){
						echo("Um ou mais arquivos inexistente.");
						die();
					} else {
						$arquivosOk = true;
						foreach ($caminhos as $c) {
							$arquivosOk = $arquivosOk && $zip->addFile($c['caminho'],trim($c['nome_cliente']));
						}
						if(!$arquivosOk){
							die("Um ou mais arquivos não adicionados ao zip.");
						}
					}

					// Fechando o arquivo zip
					$fechou_ok = $zip->close();
					if($fechou_ok !== true){
						echo('Erro ao fechar arquivo zip: '.$fechou_ok);
						die();
					}

					// enviando para o cliente
					header("Content-Type: application/zip");
					header('Content-Disposition: attachment; filename=pda_'.$id_pda.'.zip');
					header("Content-Length: " . filesize(realpath($filename))); 
					header("Content-Transfer-Encoding: binary");
					readfile($filename);
					unlink($filename);
					die();
				}
			});

			$app->get('/pdas/checkout/:id',function($id) use ($app,$db,$token){

				// Lendo o token
				$id_pda = 1*$id;

				// verificando se o token é valido e lendo o idu do usuário
				$sql = 'SELECT
							id
						FROM gdoks_usuarios
						WHERE token=? AND validade_do_token>NOW()';
				$rs = $db->query($sql,'s',$token);
				
				// Se recset voltar vazio, manda erro para o cliente. o token dele deve ter expirado
				if(sizeof($rs) == 0){
					http_response_code(401);
					$response = new response(1,'Token expirado');
					$response->flush();
					return;
				} else {
					// Guardando o idu
					$idu = $rs[0]['id'];

					// Levantando todos os documentos do pda
					$sql = 'SELECT caminho,nome_cliente
							FROM gdoks_pdas_x_arquivos a
							INNER JOIN gdoks_arquivos b ON a.id_arquivo=b.id
							WHERE a.id_pda=?';
					$rs = $db->query($sql,'s',$id_pda);
					$arquivos = $rs;
					
					// Definindo nome do arquivo zip
					$filename = TMP_PATH.'pda_'.$id_pda.'.zip';

					// Criando arquivo zip
					$zip = new ZipArchive();
					$abriu_ok = $zip->open($filename,ZipArchive::CREATE);
					if(!$abriu_ok) {
						die('Erro ao criar arquivo zip: '. $abriu_ok);
					}

					// Testando existência dos arquivos
					$inexistentes = Array();
					for ($i=0; $i < sizeof($arquivos); $i++) { 
						if(!file_exists($arquivos[$i]['caminho'])){
							array_push($inexistentes, $arquivos[$i]['caminho']);
						}
					}
					if(sizeof($inexistentes) > 0){
						die('Erro: Um ou mais arquivos não consta no servidor.');
					}
					
					// Adicionando arquivos ao zip
					foreach ($arquivos as $c) {
						$zip->addFile($c['caminho'],trim($c['nome_cliente']));
					}

					// Fechando o arquivo zip
					$zip->close();

					// setando o cookie de volta
					setcookie('downloadCookie',$_GET['downloadToken'],0,'/');
					
					// Enviando para o cliente
					header("Content-Type: application/zip");
					header('Content-Disposition: attachment; filename=pda_'.$id_pda.'.zip');
					header("Content-Length: " . filesize(realpath($filename))); 
					header("Content-Transfer-Encoding: binary");
					readfile($filename);
					unlink($filename);
						
					// Descobrindo qual o id_doc do pda
					$sql = 'SELECT id_documento
							FROM gdoks_pdas a
							INNER JOIN gdoks_revisoes b ON a.id_revisao=b.id
							WHERE a.id=?';
					$id_doc = $db->query($sql,'i',$id_pda)[0]['id_documento'];
					
					// Registrando o checkout
					$sql = 'UPDATE gdoks_documentos SET idu_checkout=?,datahora_do_checkout=NOW() WHERE id=?';
					$db->query($sql,'ii',$idu,$id_doc);

					// Registrando no log
					registrarAcao($db,$idu,ACAO_BLOQUEOU_DOCUMENTO,$id_doc);
				}
			});
		// FIM DE ROTAS DE PDAS

		// ROTAS DE REVISOES
			$app->get('/revisoes/:id',function($id) use ($app,$db,$token,$empresa){

				// Lendo o token
				$id_revisao = 1*$id;

				// verificando se o token é valido e lendo o idu do usuário
				$sql = 'SELECT
							id
						FROM gdoks_usuarios
						WHERE token=? AND validade_do_token>NOW()';
				$rs = $db->query($sql,'s',$token);

				// Se recset voltar vazio, manda erro para o cliente. O token dele deve ter expirado
				if(sizeof($rs) == 0){
					http_response_code(401);
					$response = new response(1,'Token expirado');
					$response->flush();
					exit(1);
				} else {
					// Levantando todos os arquivos do pda mais recente da revisão
					$sql = 'SELECT caminho,
							       nome_cliente
							FROM
							  ( SELECT id
							   FROM gdoks_pdas a
							   WHERE a.id_revisao=?
							   ORDER BY id DESC LIMIT 0,1) X
							INNER JOIN gdoks_pdas_x_arquivos Y ON X.id=Y.id_pda
							INNER JOIN gdoks_arquivos Z ON Y.id_arquivo=Z.id';
					$rs = $db->query($sql,'i',$id_revisao);
					$caminhos = $rs;
					
					// Definindo nome do arquivo zip
					$filename = TMP_PATH.'revisao_'.$id_revisao.'.zip';

					// Criando arquivo zip
					$zip = new ZipArchive();
					$abriu_ok = $zip->open($filename,ZipArchive::CREATE);
					if($abriu_ok !== true){
						echo('Erro ao criar arquivo zip: '.$abriu_ok);
						die();
					}
					

					// Adicionando arquivos ao zip
					$arquivosOk = true;
					$inexistentes = Array();
					foreach ($caminhos as $c) {
						if(!file_exists($c['caminho'])){
							array_push($inexistentes, $c['caminho']);
						}
					}
					$arquivosOk = (sizeof($inexistentes) == 0);

					if(!$arquivosOk){
						echo("Um ou mais arquivos inexistente.");
						die();
					} else {
						$arquivosOk = true;
						foreach ($caminhos as $c) {
							$arquivosOk = $arquivosOk && $zip->addFile($c['caminho'],trim($c['nome_cliente']));
						}
						if(!$arquivosOk){
							die("Um ou mais arquivos não adicionados ao zip.");
						}
					}

					// Fechando o arquivo zip
					$fechou_ok = $zip->close();
					if($fechou_ok !== true){
						echo('Erro ao fechar arquivo zip: '.$fechou_ok);
						die();
					}

					// enviando para o cliente
					header("Content-Type: application/zip");
					header('Content-Disposition: attachment; filename=revisao_'.$id_revisao.'.zip');
					header("Content-Length: " . filesize(realpath($filename))); 
					header("Content-Transfer-Encoding: binary");
					readfile($filename);
					unlink($filename);
					die();
				}
			});
		// FIM DE ROTAS DE PDAS

		// ROTAS DE GRDS
			$app->post('/grds',function() use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$grd = json_decode($app->request->getBody());

				// Capturando o id e o id_empresa do usuário atual
				$sql = 'SELECT
							id,id_empresa
						FROM 
							gdoks_usuarios
						WHERE
							token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token)[0];
				$id_empresa = $rs['id_empresa'];
				$id = $rs['id'];

				// Verificando se o projeto é da empresa atual e se ele está ativo
				$sql = 'SELECT count(*) as ok, ativo FROM gdoks_projetos WHERE id=? AND id_empresa=?';
				$rs = $db->query($sql,'ii',$grd->id_projeto,$id_empresa);
				
				// Bloqueando para não alterar dados de outra empresa
				if($rs[0]['ok'] == 0){
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					$response->flush();
					exit(1);
				}

				// Bloqueando por que o projeto está inativo
				if($rs[0]['ativo'] == 0 || is_null($rs[0]['ativo'])){
					http_response_code(401);
					$response = new response(1,'Não cria GRD de projeto inativo.');
					$response->flush();
					exit(1);
				}

				// atribuindo um string vazio para obs caso ela venha vazia
				$grd->obs = (isset($grd->obs)?$grd->obs:'');

				// Determinando o código da nova GRD
				$sql = 'SELECT count(*) as n FROM gdoks_grds a INNER JOIN gdoks_projetos b on a.id_projeto=b.id INNER JOIN gdoks_clientes c ON c.id=b.id_cliente INNER JOIN gdoks_empresas d on d.id=c.id_empresa WHERE d.id=? and YEAR(a.datahora_registro)=YEAR(NOW())';
				$n = $db->query($sql,'i',$id_empresa)[0]['n'] + 1;
				$newCodigo = 'GRD-'.date('Y').'-'.str_pad($n, 6, "0", STR_PAD_LEFT);

				
				// Inserindo nova grd.
				$sql = 'INSERT INTO gdoks_grds (id_projeto,codigo,obs,datahora_registro) VALUES (?,?,?,NOW())';
				try {
					$db->query($sql,'iss',$grd->id_projeto,$newCodigo,$grd->obs);
					$newId = $db->insert_id;
				} catch (Exception $e) {
					http_response_code(401);
					$response = new response(1,$e->getMessage());
					$response->flush();
					return;
				}

				// Inserindo revisões na GRD
				$sql = 'INSERT INTO gdoks_grds_x_revisoes (id_grd,id_revisao,id_codEMI,id_tipo,nFolhas,nVias) VALUES (?,?,?,?,?,?)';
				foreach ($grd->docs as $d) {
					$db->query($sql,'iiiiii',$newId,$d->rev_id,$d->id_codEMI,$d->id_tipo,$d->nFolhas,$d->nVias);
				}

				// Retornando resposta ao computador cliente
				$response = new response(0,'ok');
				$response->newId = $newId;
				$response->newCodigo = $newCodigo;
				$response->flush();

				// Registrando a ação
				registrarAcao($db,$id,ACAO_CRIOU_GRD,$newId.','.$newCodigo.','.$grd->id_projeto);
			});

			$app->put('/grds/:id',function($id) use ($app,$db,$token){
				// Lendo e saneando as informações da requisição
				$grd = json_decode($app->request->getBody());

				// verificando se os dados da requisição são consistentes
				if($grd->id != $id){
					http_response_code(401);
					$response = new response(1,'Dados da requisição são inconsistentes');
					$response->flush();
					return;
				}

				// Capturando o id e o id_empresa do usuário atual
				$sql = 'SELECT
							id,id_empresa
						FROM 
							gdoks_usuarios
						WHERE
							token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token)[0];
				$id_empresa = $rs['id_empresa'];
				$id = $rs['id'];

				// Verificando se o projeto é da empresa atual e se o projeto está ativo
				$sql = 'SELECT count(*) as ok,ativo FROM gdoks_projetos WHERE id=? AND id_empresa=?';
				$rs = $db->query($sql,'ii',$grd->id_projeto,$id_empresa);
				
				// Bloquando caso projeto não seja da empresa do usuário
				if($rs[0]['ok'] == 0){
					http_response_code(401);
					$response = new response(1,'Não altera dados de outra empresa.');
					$response->flush();
					exit(1);
				}

				// Bloquando caso projeto atual da GRD esteja inativo
				if($rs[0]['ativo'] == 0 || is_null($rs[0]['ativo'])){
					http_response_code(401);
					$response = new response(1,'Não altera GRD de projeto inativo.');
					$response->flush();
					exit(1);
				}

				// Bloqueando caso o novo projeto da GRD esteja inativo
				$sql = 'SELECT ativo FROM gdoks_projetos WHERE id=?';
				if(($db->query($sql,'i',$grd->id_projeto))[0]['ativo'] == 0){
					http_response_code(401);
					$response = new response(1,'Não altera GRD para um projeto inativo.');
					$response->flush();
					exit(1);
				}

				// atribuindo um string vazio para obs caso ela venha vazia
				$grd->obs = (isset($grd->obs)?$grd->obs:'');
				
				// Atualizando a grd.
				$sql = 'UPDATE gdoks_grds SET id_projeto=?,obs=?,datahora_registro=now() WHERE id=?';
				try {
					$db->query($sql,'isi',$grd->id_projeto,$grd->obs,$grd->id);
				} catch (Exception $e) {
					http_response_code(401);
					$response = new response(1,$e->getMessage());
					$response->flush();
					return;
				}

				// Removendo documentos(revisoes) da GRD
				$sql = 'DELETE FROM gdoks_grds_x_revisoes WHERE id_grd=?';
				$db->query($sql,'i',$grd->id);

				// Inserindo revisões na GRD
				$sql = 'INSERT INTO gdoks_grds_x_revisoes (id_grd,id_revisao,id_codEMI,id_tipo,nFolhas,nVias) VALUES (?,?,?,?,?,?)';
				foreach ($grd->docs as $d) {
					$db->query($sql,'iiiiii',$grd->id,$d->rev_id,$d->id_codEMI,$d->id_tipo,$d->nFolhas,$d->nVias);
				}


				// Enviando resposta para o cliente
				$response = new response(0,'GRD atualizada com sucesso.');
				$response->flush();

				// Registrando a ação
				registrarAcao($db,$id,ACAO_ATUALIZOU_GRD,$grd->id.','.$grd->codigo.','.$grd->id_projeto);
			});

			$app->get('/grds/:id',function($id_grd) use ($app,$db,$token){
				// Lendo dados
				$id_grd = 1*$id_grd;

				// Lendo dados do cookie! :(
				$user = json_decode($_COOKIE['user']);

				// Carregando a grd
				$grd = Grd::CreateById($id_grd,$user->empresa);

				// Vendo se é para mandar os dados ou o PDF
				if(isset($_GET['view']) && $_GET['view']=='pdf'){
					// Enviando GRD em PDF
					$grd->sendPdf($user->nome);
				} elseif (isset($_GET['view']) && $_GET['view']=='zip'){
					// Aumentando o max_execution_time para 2min... isso pode demorar
					ini_set('max_execution_time', 240);

					// Enviando GRD em ZIP
					$grd->sendZip($user->nome,true); // (true => SEM COMPRESSÃO)
				} else {
					// Levantando GRD requerida se ela for da mesma empresa do usuário com base em seu token
					$sql = 'SELECT c.id,
								   c.id_projeto,
							       c.codigo,
							       c.obs,
							       c.datahora_registro,
							       c.datahora_enviada,
							       b.id_cliente,
							       b.ativo as projeto_ativo
							FROM gdoks_usuarios a
							INNER JOIN gdoks_projetos b ON a.id_empresa=b.id_empresa
							INNER JOIN gdoks_grds c ON c.id_projeto=b.id
							WHERE token=?
							  AND validade_do_token>now()
							  AND c.id=?';
					$rs = $db->query($sql,'si',$token,$id_grd);

					if(sizeof($rs) > 0){
						// GRD existe e usuário está ok. Salvando grd em variável
						$grd = (object)$rs[0];

						// levantando as revisões que já estão anexadas a esta grd
						$sql = 'SELECT a.id_revisao,
									   a.id_codEMI,
									   a.id_tipo,
									   a.nFolhas,
									   a.nVias,
								       b.id_documento,
       								   b.serial as serial_revisao
								FROM
									gdoks_grds_x_revisoes a
								    INNER JOIN gdoks_revisoes b on b.id=a.id_revisao
								WHERE id_grd=?';
						
						// Atribuindo revisões a grd
						$grd->docs = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$grd->id));
						
						// Caso o projeto esteja inativo, levantando as informações deste projeto para enviar junto com a GRD
						$sql = 'SELECT id,codigo,nome,id_cliente,ativo FROM gdoks_projetos WHERE id=?';
						$grd->projeto = (object)$db->query($sql,'i',$grd->id_projeto)[0];

						// Enviando resposta para cliente
						$response = new response(0,'ok');
						$response->grd = $grd;
						$response->flush();
						return;
					} else {
						http_response_code(401);
						$response = new response(1,'GRD inexistente ou token expirado.');
						$response->flush();
						return;
					}	
				}
			});

			$app->get('/grds/search/q',function() use ($app,$db,$token){
				
				// Defiinindo tamanho da página
				$npp = 5;

				// Determinando a página
				$pag = isset($_GET['pagAtual'])?(1*$_GET['pagAtual']):1;

				// Determinando condição id_cliente
				if(isset($_GET['id_cliente']) && $_GET['id_cliente']!=0 ){
					$id_cliente = 1*$_GET['id_cliente'];
					$condicao_cliente = 'c.id=?';
				} else {
					$id_cliente = 0;
					$condicao_cliente = 'trueFromInt(?)';
				}

				// Determinando condição de id_projeto
				if(isset($_GET['id_projeto']) && $_GET['id_projeto']!=0){
					$id_projeto = 1*$_GET['id_projeto'];
					$condicao_projeto = 'b.id=?';
					$condicao_cliente = 'trueFromInt(?)';
				} else {
					$id_projeto = 0;
					$condicao_projeto = 'trueFromInt(?)';
				}

				// Determinando condição de codigo
				if(isset($_GET['codigo']) && $_GET['codigo']!=''){
					$codGrd = '%'.$_GET['codigo'].'%';
					$condicao_codGrd = 'a.codigo LIKE ?';
				} else {
					$codGrd = 0;
					$condicao_codGrd = 'trueFromStr(?)';
				}

				// Determinando a condicao sobre regDe
				if(isset($_GET['regDe']) && $_GET['regDe']!=''){
					$regDe = $_GET['regDe'];
					$condicao_regDe = 'a.datahora_registro >= ?';
				} else {
					$regDe = 0;
					$condicao_regDe = 'trueFromStr(?)';
				}

				// Determinando a condicao sobre regAte
				if(isset($_GET['regAte']) && $_GET['regAte']!=''){
					$regAte = $_GET['regAte'];
					$condicao_regAte = 'a.datahora_registro <= ?';
				} else {
					$regAte = 0;
					$condicao_regAte = 'trueFromStr(?)';
				}

				// Determinando a condicao sobre regDe
				if(isset($_GET['envDe']) && $_GET['envDe']!=''){
					$envDe = $_GET['envDe'];
					$condicao_envDe = 'a.datahora_enviada >= ?';
				} else {
					$envDe = 0;
					$condicao_envDe = 'trueFromStr(?)';
				}

				// Determinando a condicao sobre envAte
				if(isset($_GET['envAte']) && $_GET['envAte']!=''){
					$envAte = $_GET['envAte'];
					$condicao_envAte = 'a.datahora_enviada <= ?';
				} else {
					$envAte = 0;
					$condicao_envAte = 'trueFromStr(?)';
				}
				
				// Definindo colunas que serão selecionadas
				$colunas = 'a.id as grd_id,
							a.codigo as grd_cod,
							a.datahora_registro as grd_registradaEm,
							a.datahora_enviada as grd_enviadaEm,
							b.id as projeto_id,
							b.nome as projeto_nome,
							c.id as cliente_id,
							c.nome as cliente_nome';

				// Definindo tabelas a consultar
				$tabelas = 'gdoks_grds a
							INNER JOIN gdoks_projetos b on b.id=a.id_projeto
							INNER JOIN gdoks_clientes c on c.id=b.id_cliente';

				// Definindo condições
				$condicoes = $condicao_cliente.'
							  AND '.$condicao_projeto.'
							  AND '.$condicao_codGrd.'
							  AND '.$condicao_regDe.'
							  AND '.$condicao_regAte.'
							  AND '.$condicao_envDe.'
							  AND '.$condicao_envAte;
				
				// Preparando string SQL
				$sql = "SELECT X.*,
						       ifnull(Y.n_docs,0) AS n_docs
						FROM
						  (SELECT $colunas
						   FROM $tabelas
						   WHERE $condicoes) X
						LEFT JOIN
						  (SELECT id_grd,
						          count(*) AS n_docs
						   FROM gdoks_grds_x_revisoes
						   GROUP BY id_grd) Y ON X.grd_id=Y.id_grd
						ORDER BY grd_registradaEm DESC LIMIT ?,?";
				
				// Realizando a consulta
				$result = $db->query($sql,'iisssssii',$id_cliente,$id_projeto,$codGrd,$regDe,$regAte,$envDe,$envAte,(($pag-1)*$npp),$npp);
				
				// Determinando o total de GRDs que foram encontrados
				$sql = "SELECT count(*) as n
						FROM $tabelas
						WHERE $condicoes";
				$n = $db->query($sql,'iisssss',$id_cliente,$id_projeto,$codGrd,$regDe,$regAte,$envDe,$envAte)[0]['n'];

				// Calculando o número de páginas
				$nPaginas = ceil($n/$npp);

				// Preparando response
				$response = new response(0,'ok');
				$response->result = $result;
				$response->nPaginas = $nPaginas;
				$response->flush();
			});
			
			$app->post('/grds/:id_grd/link',function($id_grd) use ($app,$db,$token){
				
				// Lendo conteúdo da requisição
				$mail = json_decode($app->request->getBody());
				$id_grd = 1*$id_grd;
				$empresa = explode('-', getallheaders()['Authorization'])[0];

				// verificando se mail->msg possui link
				if(@preg_match('/\[link\].+\[\/link\]/', $mail->msg)!=1){
					http_response_code(401);
					$response = new response(1,'Texto da mensagem sem link para download.');
					$response->flush();
					return;
				}

				// verificando se a grd é da mesma empresa do usuário
				$sql = 'SELECT a.id,a.nome
						FROM gdoks_usuarios a
						INNER JOIN gdoks_projetos b ON a.id_empresa=b.id_empresa
						INNER JOIN gdoks_grds c ON c.id_projeto=b.id
						WHERE token=?
						  AND validade_do_token>now()
						  AND c.id=?';
				$rs = $db->query($sql,'si',$token,$id_grd);
				if(sizeof($rs) == 0){
					// Retornando erro
					http_response_code(401);
					$response = new response(1,'GRD inexistente ou token expirado.');
					$response->flush();
					return;
				} else {

					// Salvando o id do usuário
					$id_usuario = $rs[0]['id'];
					$nome_usuario = $rs[0]['nome'];

					// Lendo empresa do header Authorization
					$codigo_empresa = explode('-',getallheaders()['Authorization'])[0];

					// Criando objeto da grd
					$grd = Grd::CreateById($id_grd,$codigo_empresa);

					// Gerando unique_link
					$unique_link = md5(uniqid(rand(), true));

					// Settando o unique link da grd na base e idu_remetente
					$sql = 'UPDATE gdoks_grds SET unique_link=? WHERE id=?';
					$db->query($sql,'si',$unique_link,$grd->id);

					// Definindo o From
					$sgFrom = new SendGrid\Email(SENDGRID_DEFAULT_FROM_NAME,SENDGRID_DEFAULT_FROM);

					// Definindo Tos
					$sgTos = array_map(
								function($d){
									return new SendGrid\Email($d->nome,$d->email);
								},
								$mail->destinatarios
							);
					
					// Definindo mensagem
					// Parsing msg para por o link
					$key = Crypter::crypt($empresa.'-'.$unique_link.'-'.$nome_usuario);
					
					// Trocando caracteres '+'' vira '-', '/' vira '_' e '=' vira '|'
					$key = str_replace('+', '-', $key);
					$key = str_replace('/', '_', $key);
					$key = str_replace('=', '|', $key);

					$url = 'http://'.$_SERVER['HTTP_HOST'].'/ext/grds/'.$key;
					$mail->msg = str_replace('[link]', '<a href="'.$url.'">', $mail->msg);
					$mail->msg = str_replace('[/link]', '</a>', $mail->msg);
					$content = new SendGrid\Content("text/html", ($mail->msg==''?'-':$mail->msg));

					// Definindo o email
					$sgEmail = new SendGrid\Mail($sgFrom, $mail->assunto, $sgTos[0], $content);

					// Adicionando os outros destinatários
					for ($i=1; $i < sizeof($sgTos); $i++) { 
					 	$sgEmail->personalization[0]->addCC($sgTos[$i]);
					}

					// Enviando o email
					$sendgrid = new \SendGrid(SENDGRID_KEY);
					$response = $sendgrid->client->mail()->send()->post($sgEmail);

					if($response->statusCode() == 202){
						// Registrando a datahora do envio e idu_remetente
						$sql = 'UPDATE gdoks_grds SET datahora_enviada=NOW(),idu_remetente=? WHERE id=?';
						$db->query($sql,'ii',$id_usuario,$grd->id);

						// Retornando sucesso
						$response = new response(0,'ok');
						$response->datahora_enviada = date('Y-m-d H:i:s');
						$response->flush();

						// Registrando no log
						registrarAcao($db,$id_usuario,ACAO_ENVIOU_LINK_DE_GRD_VIA_EMAIL,$grd->id);
					} else {
						// Retornando erro
						http_response_code(401);
						$response = new response(1,'Falha no envio: '.$response->statusCode());
						$response->flush();
						die();
					}
				}
			});

			$app->post('/grds/:id_grd/ftp',function($id_grd) use ($app,$db,$token){
				// Lendo conteúdo da requisição
				$id_grd = 1*$id_grd;

				// verificando se a grd é da mesma empresa do usuário
				$sql = 'SELECT a.id,a.nome
						FROM gdoks_usuarios a
						INNER JOIN gdoks_projetos b ON a.id_empresa=b.id_empresa
						INNER JOIN gdoks_grds c ON c.id_projeto=b.id
						WHERE token=?
						  AND validade_do_token>now()
						  AND c.id=?';
				$rs = $db->query($sql,'si',$token,$id_grd);
				if(sizeof($rs) == 0){
					// Retornando erro
					http_response_code(401);
					$response = new response(1,'GRD inexistente ou token expirado.');
					$response->flush();
					return;
				} else {

					// Salvando o id do usuário
					$id_usuario = $rs[0]['id'];
					$nome_usuario = $rs[0]['nome'];

					// Lendo empresa a partir de Authorization
					$codigo_empresa = explode('-',getallheaders()['Authorization'])[0];

					// Criando objeto da grd
					$grd = Grd::CreateById($id_grd,$codigo_empresa);
					
					// levantando informações de ftp do cliente
					$sql = 'SELECT ftp_host as host,
							       ftp_usuario as login,
							       cast(aes_decrypt(ftp_senha,unhex(sha2(?,512))) AS char(50)) AS senha,
							       (!isnull(ftp_host)
							        AND !isnull(ftp_usuario)
							        AND !isnull(ftp_senha)) AS ftp_configurado
							FROM gdoks_clientes
							WHERE id=?';
					$ftp_keys = $db->query($sql,'si',AES_KEY,$grd->cliente_id)[0];

					// Verificando se ftp está configurado
					if($ftp_keys['ftp_configurado']==1){
						
						// Servidor configurado. Abrindo conexão;
						$ftp = new \FtpClient\FtpClient();

						// Conectando ao servidor
						try {
							$ftp->connect($ftp_keys['host']);
						} catch (Exception $e) {
							http_response_code(401);
							$response = new response(1,'Não foi possível conectar ao servidor');
							$response->flush();
							exit(1);
						}
						
						// Fazendo login
						try {
							$ftp->login($ftp_keys['login'], $ftp_keys['senha']);
						} catch (Exception $e) {
							http_response_code(401);
							$response = new response(1,'Falha no login do FTP');
							$response->flush();
							exit(1);
						}
						
						// Configurando FTP para PASV
						$ftp->pasv(true);
						
						// Criando o zip da Grd
						try {
							$caminhoDoZip = $grd->gerarZip($nome_usuario,true);
						} catch (Exception $e) {
							http_response_code(401);
							$response = new response(1,$e->getMessage());
							$response->flush();
							exit(1);
						}

						// Fazendo upload
						try {
							$ftp->put(basename($caminhoDoZip), $caminhoDoZip, FTP_BINARY);
						} catch (Exception $e) {
							http_response_code(401);
							$response = new response(1,'Não foi possível fazer upload no servidor do cliente');
							$response->flush();
							exit(1);
						}

						// Registrando a datahora do envio
						$sql = 'UPDATE gdoks_grds SET datahora_enviada=NOW(),idu_remetente=? WHERE id=?';
						$db->query($sql,'ii',$id_usuario,$grd->id);

						// Retornando sucesso
						$response = new response(0,'ok');
						$response->datahora_enviada = date('Y-m-d H:i:s');
						$response->flush();

						// Registrando no log
						registrarAcao($db,$id_usuario,ACAO_ENVIOU_GRD_VIA_FTP,$grd->id);
						
						// removendo arquivo zip criado
						unlink($caminhoDoZip);
					} else {
						http_response_code(401);
						$response = new response(1,'Servidor FTP não configurado para este cliente.');
						$response->flush();
						return;
					}
				}
			});


			$app->post('/grds/:id_grd/publicar',function($id_grd) use ($app,$db,$token){
				// Lendo conteúdo da requisição
				$id_grd = 1*$id_grd;

				// verificando se a grd é da mesma empresa do usuário
				$sql = 'SELECT a.id
						FROM gdoks_usuarios a
						INNER JOIN gdoks_projetos b ON a.id_empresa=b.id_empresa
						INNER JOIN gdoks_grds c ON c.id_projeto=b.id
						WHERE token=?
						  AND validade_do_token>now()
						  AND c.id=?';
				$rs = $db->query($sql,'si',$token,$id_grd);
				if(sizeof($rs) == 0){
					// Retornando erro
					http_response_code(401);
					$response = new response(1,'GRD inexistente ou token expirado.');
					$response->flush();
					exit(1);
				} else {

					// Salvando o id do usuário
					$id_usuario = $rs[0]['id'];

					// Lendo empresa a partir de Authorization
					$codigo_empresa = explode('-',getallheaders()['Authorization'])[0];

					// Marcando GRD como enviada pelo usuário
					try {
						$sql = 'UPDATE gdoks_grds SET datahora_enviada=NOW(),idu_remetente=? WHERE id=?';
						$db->query($sql,'ii',$id_usuario,$id_grd);
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage);
						$response->flush();
						exit(1);
					}
					$response = new response(0,'ok');
					$response->datahora_enviada = date('Y-m-d H:i:s');
					$response->flush();
				}
			});

			$app->get('/grds/:id_grd/obs',function($id_grd) use ($app,$db,$token){
				// Lendo dados nas variáveis
				$id_grd = 1*$id_grd;

				// Verificando se GRD é da mesma empresa do usuário
				$sql = 'SELECT
							count(*)=1 as ok
						FROM
							gdoks_grds a
						    inner join gdoks_projetos b on b.id=a.id_projeto
						    inner join gdoks_usuarios c on (c.id_empresa=b.id_empresa and c.token=? and c.validade_do_token>now())
						WHERE a.id=?;';
				$ok = $db->query($sql,'si',$token,$id_grd)[0]['ok']==1;

				// Indo adiante
				if($ok){
					// Levantando observações
					$sql = 'SELECT a.id,
								   b.id_documento as doc_id,
							       a.data_recebida,
							       a.datahora_registrada,
							       a.idu,
							       a.obs,
							       a.comentario_cliente as cc
							FROM gdoks_observacoes a
							INNER JOIN gdoks_revisoes b ON a.id_revisao=b.id
							WHERE a.id_grd=?';
					$observacoes = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_grd));

					// levantando arquivos de observações
					$sql = 'SELECT id,
							       nome_cliente
							FROM gdoks_observacoes_arquivos
							WHERE id_observacao=?';
					foreach ($observacoes as $obs) {
						$obs->arquivos = $db->query($sql,'i',$obs->id);
					}

					// Mandando resposta para o cliente
					$response = new response(0,'ok');
					$response->observacoes = $observacoes;
					$response->flush();
				} else {
					http_response_code(401);
					$response = new response(1,'Levantando dados de outra empresa ou token expirado.');
					$response->flush();
					return;
				}
			});

			$app->post('/grds/:id_grd/obs',function($id_grd) use ($app,$db,$token,$empresa){
				
				// Lendo dados nas variáveis
				$id_grd = 1*$id_grd;

				// Verificando se GRD é da mesma empresa do usuário
				$sql = 'SELECT
							c.id as idu,
							c.id_empresa,
							b.id as id_projeto,
							count(*)=1 as ok
						FROM
							gdoks_grds a
						    inner join gdoks_projetos b on b.id=a.id_projeto
						    inner join gdoks_usuarios c on (c.id_empresa=b.id_empresa and c.token=? and c.validade_do_token>now())
						WHERE a.id=?;';
				$rs = $db->query($sql,'si',$token,$id_grd);

				$ok = $rs[0]['ok'];
				$idu = $rs[0]['idu'];
				$id_projeto = $rs[0]['id_projeto'];
				$id_empresa = $rs[0]['id_empresa'];

				// retornando erro se usuário logado não for da empresa da grd
				if(!$ok){
					http_response_code(401);
					$response = new response(1,'Não pode inserir ou alterar observações de GRDs de outra empresa.');
					$response->flush();
					return;
				}

				$obs = (object)$_POST['obs'];
				if($obs->id!=0){
					// = = = = = = = = = = = = = = = = = = = = = = =
					// Atualizando observação
					// = = = = = = = = = = = = = = = = = = = = = = =
					$sql = 'UPDATE gdoks_observacoes SET obs=?,comentario_cliente=?,data_recebida=?,datahora_registrada=NOW(),idu=? WHERE id=?';
					$db->query($sql,'sssii',$obs->obs,$obs->cc,$obs->data_recebida,$idu,$obs->id);

					// levantando os anexos existentes que devem ser removidos
					if(isset($obs->arquivos)) {
						$condicao = 'id=' . implode(' OR id=', array_map(function($a){return 1*$a;},$obs->arquivos));
					} else {
						$condicao = 'FALSE';
					}
					$sql = "SELECT caminho,nome_cliente,id FROM gdoks_observacoes_arquivos WHERE id_observacao=? && !($condicao)";
					$paraRemover = array_map(function($a){return (object)$a;},$db->query($sql,'i',$obs->id));

					// removendo arquivos
					foreach ($paraRemover as $file) {
						if(file_exists($file->caminho)){
							unlink($file->caminho);
						}
					}
					
					// apagando da base
					$sql = "DELETE FROM gdoks_observacoes_arquivos WHERE id_observacao=? && !($condicao)";
					$db->query($sql,'i',$obs->id);

					// Definindo vetor de resultados de uploads
					$upload_results = Array();

					// Verificando se a pasta destino existe, se não existe, tenta criar
					$pasta_destino = CLIENT_DATA_PATH.$empresa.'/uploads/'.$id_projeto.'/';
					if(!file_exists($pasta_destino)){
						if(!@mkdir($pasta_destino)){
							http_response_code(401);
							$response = new response(1,'Pasta destino inexistente. Não foi possível criar uma pasta destino.');
							$response->flush();
							return;
						}
					}

					// Lendo dados de $_FILES
					if(isset($_FILES['profiles'])){
						$filenames = array_map(function($n){return $n['file'];}, $_FILES['profiles']['name']);
						$types = array_map(function($n){return $n['file'];}, $_FILES['profiles']['type']);
						$tmp_names = array_map(function($n){return $n['file'];}, $_FILES['profiles']['tmp_name']);
						$erros = array_map(function($n){return $n['file'];}, $_FILES['profiles']['error']);
						$sizes = array_map(function($n){return $n['file'];}, $_FILES['profiles']['size']);

						// montando vetor de upload results
						foreach ($filenames as $i => $file) {
							$result = new stdClass();
							$result->file = $file;
							$result->err = $erros[$i];
							switch ($erros[$i]) {
								case UPLOAD_ERR_OK:
									$result->msg = 'Ok';
									break;

								case UPLOAD_ERR_INI_SIZE:
									$result->msg = 'O arquivo enviado excede o limite definido ('.ini_get('upload_max_filesize') .')';
									break;

								case UPLOAD_ERR_FORM_SIZE:
									$result->msg = 'O arquivo excede o limite definido em MAX_FILE_SIZE no formulário HTML';
									break;

								case UPLOAD_ERR_PARTIAL:
									$result->msg = 'O upload do arquivo foi feito parcialmente';
									break;

								case UPLOAD_ERR_NO_FILE:
									$result->msg = 'Nenhum arquivo foi enviado';
									break;

								case UPLOAD_ERR_NO_TMP_DIR:
									$result->msg = 'Pasta temporária ausente';
									break;

								case UPLOAD_ERR_CANT_WRITE:
									$result->msg = 'Falha em escrever o arquivo em disco';
									break;
								
								case UPLOAD_ERR_EXTENSION:
									$result->msg = 'Uma extensão interrompeu o upload do arquivo';
									break;

								default:
									$result->msg = 'Desconhecido (Cod '.$_FILES['profiles']['error'][$i]['file'].')';
									break;
							}

							if($erros[$i] == 0){
								// gerando nome unico do arquivo
								$uniq_name = uniqid();
								$caminho = $pasta_destino.$uniq_name;

								// salvando o arquivo
								if(!@move_uploaded_file($tmp_names[$i], $caminho)){
									$result->error = -1;
									$result->msg = 'Impossível salvar arquivo no servidor. Verifique existência/permissão da pasta destino.';
									$result->newId = 0;
								} else {
									// inserindo na base
									$sql = 'INSERT INTO gdoks_observacoes_arquivos (caminho,nome_cliente,id_observacao) VALUES (?,?,?)';
									$db->query($sql,'ssi',$caminho,$file,$obs->id);
									$result->newId = $db->insert_id;
								}
							}

							// Adicionando resultado de upload ao vetor de resultados
							array_push($upload_results, $result);
						}
					}
					// Retornando ao cliente
					$response = new response(0,'ok');
					$response->uploads = $upload_results;
					$response->datahora_registrada = date('Y-m-d H:i:s');
					$response->flush();

					// registrando no log
					registrarAcao($db,$idu,ACAO_ALTEROU_RETORNO_DE_GRD,$id_grd.','.$obs->id);
				} else {
					// = = = = = = = = = = = = = = = = = = = = = = =
					// INSERINDO observação
					// = = = = = = = = = = = = = = = = = = = = = = =
					$sql = 'INSERT INTO gdoks_observacoes (id_grd,id_revisao,obs,comentario_cliente,data_recebida,datahora_registrada,idu) VALUES (?,?,?,?,?,now(),?)';
					$db->query($sql,'iisssi',$id_grd,$obs->id_revisao,$obs->obs,$obs->cc,$obs->data_recebida,$idu);
					$newId = $db->insert_id;

					// Definindo vetor de resultados de uploads
					$upload_results = Array();

					// Verificando se a pasta destino existe, se não existe, tenta criar
					$pasta_destino = CLIENT_DATA_PATH.$empresa.'/uploads/'.$id_projeto.'/';
					if(!file_exists($pasta_destino)){
						if(!@mkdir($pasta_destino)){
							http_response_code(401);
							$response = new response(1,'Pasta destino inexistente. Não foi possível criar uma pasta destino.');
							$response->flush();
							return;
						}
					}

					// Lendo dados de $_FILES
					if(isset($_FILES['profiles'])){
						$filenames = array_map(function($n){return $n['file'];}, $_FILES['profiles']['name']);
						$types = array_map(function($n){return $n['file'];}, $_FILES['profiles']['type']);
						$tmp_names = array_map(function($n){return $n['file'];}, $_FILES['profiles']['tmp_name']);
						$erros = array_map(function($n){return $n['file'];}, $_FILES['profiles']['error']);
						$sizes = array_map(function($n){return $n['file'];}, $_FILES['profiles']['size']);

						// montando vetor de upload results
						foreach ($filenames as $i => $file) {
							$result = new stdClass();
							$result->file = $file;
							$result->err = $erros[$i];
							switch ($erros[$i]) {
								case UPLOAD_ERR_OK:
									$result->msg = 'Ok';
									break;

								case UPLOAD_ERR_INI_SIZE:
									$result->msg = 'O arquivo enviado excede o limite definido ('.ini_get('upload_max_filesize') .')';
									break;

								case UPLOAD_ERR_FORM_SIZE:
									$result->msg = 'O arquivo excede o limite definido em MAX_FILE_SIZE no formulário HTML';
									break;

								case UPLOAD_ERR_PARTIAL:
									$result->msg = 'O upload do arquivo foi feito parcialmente';
									break;

								case UPLOAD_ERR_NO_FILE:
									$result->msg = 'Nenhum arquivo foi enviado';
									break;

								case UPLOAD_ERR_NO_TMP_DIR:
									$result->msg = 'Pasta temporária ausente';
									break;

								case UPLOAD_ERR_CANT_WRITE:
									$result->msg = 'Falha em escrever o arquivo em disco';
									break;
								
								case UPLOAD_ERR_EXTENSION:
									$result->msg = 'Uma extensão interrompeu o upload do arquivo';
									break;

								default:
									$result->msg = 'Desconhecido (Cod '.$_FILES['profiles']['error'][$i]['file'].')';
									break;
							}

							if($erros[$i] == 0){
								// gerando nome unico do arquivo
								$uniq_name = uniqid();

								// salvando o arquivo
								if(!@move_uploaded_file($tmp_names[$i], $pasta_destino.$uniq_name)){
									$result->error = -1;
									$result->msg = 'Impossível salvar arquivo no servidor. Verifique existência/permissão da pasta destino.';
									$result->newId = 0;
								} else {
									// inserindo na base
									$sql = 'INSERT INTO gdoks_observacoes_arquivos (caminho,nome_cliente,id_observacao) VALUES (?,?,?)';
									$db->query($sql,'ssi',$pasta_destino.$uniq_name,$file,$newId);
									$result->newId = $db->insert_id;
								}
							}

							// Adicionando resultado de upload ao vetor de resultados
							array_push($upload_results, $result);
						}
					}
					// Retornando ao cliente
					$response = new response(0,'ok');
					$response->uploads = $upload_results;
					$response->datahora_registrada = date('Y-m-d H:i:s');
					$response->newId = $newId;
					$response->flush();

					// registrando no log
					registrarAcao($db,$idu,ACAO_ADICIONOU_RETORNO_DE_GRD,$id_grd.','.$newId);
				}
			});
		// FIM DE ROTAS PARA GRDS

		// ROTAS DE CODIGOS EMI
			$app->get('/emis',function() use ($app,$db,$token){
				// retornando os codigos emis da empresa do usuário logado caso o token dele seja válido
				$sql = 'SELECT b.id,
						       b.simbolo,
						       b.nome
						FROM gdoks_usuarios a
						INNER JOIN gdoks_codigos_emi b ON a.id_empresa=b.id_empresa
						WHERE a.token=?';
				$rs = $db->query($sql,'s',$token);
				if(sizeof($rs) > 0){
					$response = new response(0,'ok');
					$response->codigosEmi = $rs;
					$response->flush();
				} else {
					http_response_code(401);
					$response = new response(1,"Nenhum código cadastrado ou token expirado");
					$response->flush();
				}
			});
		// FIM DE ROTAS DE CODIGOS EMI

		// ROTAS DE TIPOS DE DOCUMENTO
			$app->get('/tiposDeDocumento',function() use ($app,$db,$token){
				// retornando os tipos de documento da empresa do usuário logado caso o token dele seja válido
				$sql = 'SELECT b.id,
						       b.simbolo,
						       b.nome
						FROM gdoks_usuarios a
						INNER JOIN gdoks_tipos_de_doc b ON a.id_empresa=b.id_empresa
						WHERE a.token=?';
				$rs = $db->query($sql,'s',$token);
				if(sizeof($rs) > 0){
					$response = new response(0,'ok');
					$response->tiposDeDocumento = $rs;
					$response->flush();
				} else {
					http_response_code(401);
					$response = new response(1,"Nenhum tipo de documento cadastrado ou token expirado");
					$response->flush();
				}
			});
		// FIM DE ROTAS DE TIPOS DE DOCUMENTO

		// ROTAS DE TELAS
			$app->get('/telas',function() use ($app,$db,$token){
				// carregando telas
				$sql = 'SELECT id,
						       titulo,
						       descricao,
						       endereco
						FROM gdoks_telas';
				$telas = array_map(function($a){return (object)$a;}, $db->query($sql));

				// Carregando as opções das telas
				$sql = 'SELECT id,
						       descricao,
						       valor_padrao
						FROM gdoks_opcoes_de_telas
						WHERE id_tela=?';
				foreach ($telas as $tela) {
					$tela->opcoes = $db->query($sql,'i',$tela->id);
				}

				$response = new response(0,'ok');
				$response->telas = $telas;
				$response->flush();

			});
		// FIM DE ROTAS DE TELAS

		// ROTAS PARA HISTORICO
			$app->get('/historico/projetos',function() use ($app,$db,$token){

				// Preparando a resposta
				$response = new response(0,'ok');

				// Definindo a consulta
				$sql = 'SELECT a.id_projeto,
						       a.ordem
						FROM gdoks_hist_prjs a
						INNER JOIN gdoks_usuarios b ON a.id_usuario=b.id
						INNER JOIN gdoks_projetos c ON a.id_projeto=c.id
						WHERE b.token=? AND c.ativo
						ORDER BY a.ordem DESC';

				// Estabelecendo resultado da consulta como parte do response
				$response->historico = $db->query($sql,'s',$token);
				
				// Enviando o response para o cliente
				$response->flush();

			});
		// FIM DE ROTAS PARA HISTORICOS
	});

	// running the app
	$app->run();