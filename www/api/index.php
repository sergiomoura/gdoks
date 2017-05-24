<?php
	// Configurando a descrição do erro at runtime
	error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

	// Required files - - - - - - - - - - - - - - - - - - -
	require('../../includes/Slim/vendor/autoload.php');
	require('../../includes/constantes.php');
	require('../../includes/db.php');
	require('../../includes/definicoes_de_acoes.php');
	require('../../includes/response.php');
	
	// constants - - - - - - - - - - - - - - - - - - - - - -
	define('TOKEN_DURARION', 3600); //in seconds: 6 horas

	// definindo função que realiza log
	function registrarAcao($db,$idUsuario,$idAcao,$parametros = ''){
		if($parametros == ''){
			$sql = 'INSERT INTO gdoks_log (id_usuario,id_acao,data) values (?,?,now())';
			$result = $db->query($sql,'ii',$idUsuario,$idAcao);
		} else {
			$sql = 'INSERT INTO gdoks_log (id_usuario,id_acao,data,parametros) values (?,?,now(),?)';
			$result = $db->query($sql,'iis',$idUsuario,$idAcao,$parametros);
		}
	}

	// defining api - - - - - - - - - - - - - - - - - - - -
	$app = new \Slim\Slim();
	$db = new DB();

	// defining api routes  V1 = = = = = = = = = = = = = = = =
	$app->group('/v1',function() use($app,$db){

		// LOGIN ROUTE DEFINITION - - - - - - - - - - - - -
		$app->post('/login',function() use ($app,$db){
			// lendo dados da requisição
			$data = json_decode($app->request->getBody());

			// Verificando se é usuário é válido e carregando suas informações se for o caso.
			$sql = 'SELECT b.id,
						   b.nome,
						   b.login,
						   b.email,
					       count(*)=1 AS ok
					FROM gdoks_empresas a
					INNER JOIN gdoks_usuarios b ON a.id=b.id_empresa
					WHERE login=?
					  AND senha=PASSWORD(?)
					  AND ucase(a.nome)=ucase(?)
					  AND ativo';
			$result = $db->query($sql,'sss',$data->login,$data->senha,$data->empresa)[0];

			// perguntando se usuário é válido
			if($result['ok'] == 1){
				// SIM, usuário é válido
				// gerando novo token
				$token = uniqid('',true);

				// atualizando o token na base de dados
				$db->query('update gdoks_usuarios set token=?, validade_do_token=? where id=?','ssi',$token,Date('Y-m-d H:i:s',time()+TOKEN_DURARION),$result['id']);

				// Arrumando dados do usuário
				$user = new stdClass();
				$user->id = $result['id'];
				$user->nome = $result['nome'];
				$user->email = $result['email'];
				$user->token = $token;

				// definindo resposta http como 200
				$app->response->setStatus(200);
				$response = new response(0,'ok');

				// Adicionando as informações do usuário no response
				$response->user = $user;
				
				// registrando a ação no log
				registrarAcao($db,$user->id,ACAO_LOGOU);
			} else {
				// Não! usuário não é válido.
				// Preparando resposta negativa
				$app->response->setStatus(401);
				$response = new response(1,'Login falhou');
			}

			// Enviando resposta.
			$response->flush();
		});

		// LOGIN REFRESH ROUTE DEFINITION - - - - - - - - -
		$app->get('/refresh',function() use ($app,$db){
			$token = $app->request->headers->get('Authorization');
			$rs = $db->query('select id from gdoks_usuarios where token=? and validade_do_token>now()','s',$token);
			if(sizeof($rs) == 0){
				$app->response->setStatus(401);
				$response = new response(1,'Refresh failed!');
				$response->flush();
				return;
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
				}
			}
		});

		// DEFINIÇÃO DE MUDA LOGIN/SENHA
			$app->post('/mudaLoginSenha',function() use ($app,$db){
				// lendo dados da requisição
				$token = $app->request->headers->get('Authorization');
				$data = json_decode($app->request->getBody());
				
				// Verificando se o token existe e se ele ainda é válido.
				$rs = $db->query('select id from gdoks_usuarios where token=? and validade_do_token>now()','s',$token);
				if(sizeof($rs)==0){
					// Retonando não autorizado
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
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
		
		// ROTAS DE USUÁRIOS - - - - - - - - - - - - - - - -
			$app->get('/usuarios',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$sql = 'SELECT a.id,
						       a.login,
						       a.nome,
						       a.email,
						       a.ativo
						FROM gdoks_usuarios a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
							ORDER by a.nome';
				$response = new response(0,'ok');
				$response->usuarios = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->put('/usuarios/:id',function($id) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id = 1*$id;
				$usuario = json_decode($app->request->getBody());

				// verificando se o usário enviado é do mesmo cliente do usuário atual
				$sql = 'SELECT
							A.id,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks.gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks.gdoks_usuarios
								WHERE id=?) B on A.id_empresa=B.id_empresa;';
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];
				$id = $rs['id'];
				if($ok == 1){
					// Tudo ok! O usuário a ser alterado é do cliente
					
					// atualizando dados do usuário.
					if(!isset($usuario->senha1) || $usuario->senha1 == ''){

						// NÃO alterar senha do usuário
						$sql = 'UPDATE gdoks_usuarios SET nome=?,email=?,login=?,ativo=? WHERE id=?';
						try {
							$db->query($sql,'sssii',$usuario->nome,$usuario->email,$usuario->login,$usuario->ativo,$usuario->id);	
							$response = new response(0,'Usuário alterado com sucesso.');
							$response->flush();
						} catch (Exception $e) {
							$app->response->setStatus(401);
							$response = new response(1,'Já existe um usuário cadastrado com este login.');
							$response->flush();
							return;
						}
						// Registrando a ação
						registrarAcao($db,$id,ACAO_ALTEROU_DADOS_DE_USUARIO,$usuario->nome.','.$usuario->email.','.$usuario->login.','.($usuario->ativo==true?1:0));
					} else {
						// Alterar a senha do usuário
						$sql = 'UPDATE gdoks_usuarios SET nome=?, email=?, login=?, senha=PASSWORD(?), ativo=? WHERE id=?';
						try {
							$db->query($sql,'ssssii',$usuario->nome,$usuario->email,$usuario->login,$usuario->senha1,$usuario->ativo,$usuario->id);	
							$response = new response(0,'Usuário alterado com sucesso.');
							$response->flush();
						} catch (Exception $e) {
							$app->response->setStatus(401);
							$response = new response(1,'Já existe um usuário cadastrado com este login');
							$response->flush();
							return;
						}
						// Registrando a ação
						registrarAcao($db,$id,ACAO_ALTEROU_DADOS_DE_USUARIO,$usuario->nome.','.$usuario->email.','.$usuario->login.','.$usuario->ativo);
					}
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/usuarios',function() use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
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
				$sql = 'INSERT INTO gdoks_usuarios (nome,email,login,senha,id_empresa,ativo) VALUES (?,?,?,?,?,?)';
				try {
					$db->query($sql,'ssssii',$usuario->nome,$usuario->email,$usuario->login,$usuario->senha1,$id_empresa,$usuario->ativo);
					$response = new response(0,'Usuário criado com sucesso.');
					$response->newId = $db->insert_id;
					$response->flush();
				} catch (Exception $e) {
					$app->response->setStatus(401);
					$response = new response(1,'Já existe um usuário cadastrado com este login.');
					$response->flush();
					return;
				}
				// Registrando a ação
				registrarAcao($db,$id,ACAO_CRIOU_USUARIO,$usuario->nome.','.$usuario->email.','.$usuario->login.','.$usuario->ativo);
			});
		// FIM DE ROTAS DE USUÁRIOS
		
		// ROTAS DE DISCIPLINAS - - - - - - - - - - - - - - -
			$app->get('/disciplinas',function() use ($app,$db){
				// lendo o token
				$token = $app->request->headers->get('Authorization');

				// carregando as disciplinas
				$sql = 'SELECT a.id,
						       a.nome,
						       a.sigla,
						       a.ativa
						FROM gdoks_disciplinas a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks.gdoks_usuarios
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

			$app->put('/disciplinas/:id',function($id) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id = 1*$id;
				$disciplina = json_decode($app->request->getBody());

				// verificando se o usário enviado é do mesmo cliente do usuário atual
				$sql = 'SELECT A.id,
						       COUNT(*) AS ok
						FROM
						  ( SELECT id,
						           id_empresa
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  ( SELECT id_empresa
						   FROM gdoks.gdoks_disciplinas
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
						$app->response->setStatus(401);
						$response = new response(1,'Já existe uma disciplina cadastrado com esta sigla ou nome.');
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_DISCIPLINA,$disciplina->nome.','.$disciplina->sigla.','.($disciplina->ativa == true?1:0));
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/disciplinas',function() use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
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
					$app->response->setStatus(401);
					$response = new response(1,'Já existe uma disciplina cadastrado com este nome ou sigla. '.$e->getMessage());
					$response->flush();
					return;
				}
				// Registrando a ação
				registrarAcao($db,$id,ACAO_CRIOU_DISCIPLINA,$disciplina->nome.','.$disciplina->sigla.','.($disciplina->ativa==true?1:0));
			});

			$app->get('/disciplinas/:id',function($id) use ($app,$db){
				
				//levantando informações enviadas.
				$token = $app->request->headers->get('Authorization');
				$id_disciplina = 1*$id;

				// verificando se a disciplina solicitada é do mesmo cliente do usuário
				$sql = 'SELECT A.id,
						       COUNT(*) AS ok
						FROM
						  ( SELECT id,
						           id_empresa
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  ( SELECT id_empresa
						   FROM gdoks.gdoks_disciplinas
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
					$app->response->setStatus(401);
					$response = new response(1,'Não carrega dados de outra empresa.');	
				}


				// Enviando dados
				$response->flush();
			});

			$app->put('/disciplinas/:id_disciplina/subs/:id_sub',function($id_disciplina,$id_sub) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_disciplina = 1*$id_disciplina;
				$id_sub = 1*$id_sub;
				$subdisciplina = json_decode($app->request->getBody());

				// parando caso haja inconscistência entre o id_disciplina vindo no corpo da requisição e o da url
				if($id_sub != $subdisciplina->id) {
					$app->response->setStatus(401);
					$response = new response(1,'inconscistência nas informações fornecidas');
					$response.flush();
					die();
				}

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,'Verifique se já não existe uma subdisciplina cadastrado com esta sigla ou nome.');
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_SUBDISCIPLINA,$subdisciplina->nome.','.$subdisciplina->sigla.','.($subdisciplina->ativa == true?1:0));
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/disciplinas/:id_disciplina/subs/',function($id_disciplina) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_disciplina = 1*$id_disciplina;
				$subdisciplina = json_decode($app->request->getBody());

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,'Já existe uma subdisciplina cadastrado com esta sigla ou nome.');
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_CRIOU_SUBDISCIPLINA,$subdisciplina->nome.','.$subdisciplina->sigla.','.($subdisciplina->ativa == true?1:0));
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->delete('/disciplinas/:id_disciplina/subs/:id_sub',function($id_disciplina,$id_sub) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
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
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_REMOVEU_SUBDISCIPLINA,$subdisciplina->nome.','.$subdisciplina->sigla.','.($subdisciplina->ativa == true?1:0));
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->put('/disciplinas/:id_disciplina/especialistas/',function($id_disciplina) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_disciplina = 1*$id_disciplina;
				$ids_especialistas = json_decode($app->request->getBody());
				
				// verificando se o usário enviado é do mesmo cliente da disciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}

					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_ESPECIALISTAS,$id_disciplina.',['.implode('|', $ids_especialistas).']');
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/disciplinas/:id_disciplina/especialistas/',function($id_disciplina) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_disciplina = 1*$id_disciplina;
				$id_especialista = 1*$app->request->getBody();

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ASSOCIOU_ESPECIALISTA,$id_especialista.','.$id_disciplina);
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});
			
			$app->delete('/disciplinas/:id_disciplina/especialistas/:id_especialista',function($id_disciplina,$id_especialista) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_disciplina = 1*$id_disciplina;
				$id_especialista = 1*$id_especialista;

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage);
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_DESASSOCIOU_ESPECIALISTA,$id_especialista.','.$id_disciplina);
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->put('/disciplinas/:id_disciplina/validadores/',function($id_disciplina) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_disciplina = 1*$id_disciplina;
				$ids_validadores = json_decode($app->request->getBody());
				
				// verificando se o usário enviado é do mesmo cliente da disciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}

					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_VALIDADORES,$id_disciplina.',['.implode('|', $ids_validadores).']');
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});
			
			$app->post('/disciplinas/:id_disciplina/validadores/',function($id_disciplina) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_disciplina = 1*$id_disciplina;
				$data = json_decode($app->request->getBody());
				$id_validador = $data->idu;

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ASSOCIOU_VALIDADOR,$id_validador.','.$id_disciplina);
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});
			
			$app->delete('/disciplinas/:id_disciplina/validadores/:id_validador',function($id_disciplina,$id_validador) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_disciplina = 1*$id_disciplina;
				$id_validador = 1*$id_validador;

				// verificando se o usário enviado é do mesmo cliente da subdisciplina atual
				$sql = 'SELECT A.id as id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_DESASSOCIOU_VALIDADOR,$id_validador.','.$id_disciplina);
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});
		// FIM DE ROTAS DE DISCIPLINAS
		
		// ROTAS DE PROJETOS - - - - - - - - - - - - - - - - -
			$app->get('/projetos',function() use ($app,$db){
				// Lendo o token
				$token = $app->request->headers->get('Authorization');

				// Levantando os projetos que este usuário possui pemissão
				$sql = 'SELECT p.id,
						       p.nome,
						       p.codigo,
						       p.ativo
						FROM gdoks_usuarios u
						INNER JOIN gdoks_projetos p ON p.id_empresa=u.id_empresa
						WHERE u.token=?';

				$response = new response(0,'ok');
				$response->projetos = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->get('/projetos/:id',function($id) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_projeto = 1*$id;
				
				// Verificando se projeto é do mesmo cliente do usuário atual
				$sql = 'SELECT A.id,
						       COUNT(*) AS ok
						FROM
						  ( SELECT id,
						           id_empresa
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  ( SELECT id_empresa
						   FROM gdoks.gdoks_projetos
						   WHERE id=?) B ON A.id_empresa=B.id_empresa;';
			
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];
				
				if($ok == 1){

					// levantando informações do projeto
					$sql = "SELECT id,codigo,nome,id_cliente,id_responsavel,data_inicio_p,data_final_p,ativo FROM gdoks_projetos WHERE id=?";
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

					// Levantando documentos do projeto -> feita em outra requisição
					$projeto->documentos = Array();

					// Levantando dependências de cada documento
					$sql = 'SELECT id_dependencia from gdoks_documentos_x_dependencias where id_documento=?';
					foreach ($projeto->documentos as $doc) {
						$doc->dependencias = Array();
						$doc->dependencias = array_map(function($a){return $a['id_dependencia'];}, $db->query($sql,'i',$doc->id));
					}

					// Criando o objeto response 
					$response = new response(0,'Ok');
					$response->projeto = $projeto;
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}

				// enviando resposta
				$response->flush();
			});

			$app->put('/projetos/:id',function($id) use ($app,$db){
				
				// Lendo dados
				$token = $app->request->headers->get('Authorization');
				$projeto = json_decode($app->request->getBody());
				$projeto->data_final_p = $projeto->data_final_p==null?'null':substr($projeto->data_final_p,0,10);
				$projeto->data_inicio_p = $projeto->data_inicio_p==null?'null':substr($projeto->data_inicio_p,0,10);

				// verifricando consistência de dados
				if($projeto->id != $id){
					$response = new response(1,'Dados inconsistentes.');
					$response->flush();
					die();
				}

				// Verificando se o projeto é da mesma empresa do usuário
				$sql = 'SELECT
							A.id,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks.gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks.gdoks_projetos
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
						die();
                    }
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					die();
				}

				// retornando
				$response = new response(0,'Dados do projeto alterados com sucesso.');
				$response->flush();

				// Removendo alguns campos para o registro no log
				unset($projeto->subareas);

				// registrando alteração
				registrarAcao($db,$id_usuario,ACAO_ALTEROU_PROJETO,implode(',',(array)$projeto));
			});

			$app->post('/projetos',function() use ($app,$db){
				
				// Lendo dados
				$token = $app->request->headers->get('Authorization');
				$projeto = json_decode($app->request->getBody());

				// Determinando o id do usuário e o id da empresa a qual ele pertence
				$sql = 'SELECT id,
						       id_empresa
						FROM gdoks.gdoks_usuarios
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
						die();
                    }
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					die();
				}

				// retornando
				$response = new response(0,'Projeto cadastrado com sucesso.');
				$response->newId = $db->insert_id;
				$response->flush();

				// registrando alteração
				registrarAcao($db,$id_usuario,ACAO_ADICIONOU_PROJETO,implode(',',(array)$projeto));
			});

			$app->put('/projetos/:id_projeto/areas/:id_area',function($id_projeto,$id_area) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_projeto = 1*$id_projeto;
				$id_area = 1*$id_area;
				$area = json_decode($app->request->getBody());

				// parando caso haja inconscistência entre o id_projeto vindo no corpo da requisição e o da url
				if($id_area != $area->id) {
					$app->response->setStatus(401);
					$response = new response(1,'inconscistência nas informações fornecidas');
					$response.flush();
					die();
				}

				// verificando se o usário enviado é do mesmo cliente da area atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_AREA,implode(',', (array)$area));
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/projetos/:id_projeto/areas/',function($id_projeto) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_projeto = 1*$id_projeto;
				$area = json_decode($app->request->getBody());

				// verificando se o usário enviado é do mesmo cliente da area atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_CRIOU_AREA,implode(',', (array)$area));
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->get('/projetos/:id_projeto/areas',function($id_projeto) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_projeto = 1*$id_projeto;

				// verificando se o usário enviado é do mesmo cliente da area atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não lê dados de outra empresa.');	
				}
			});


			$app->delete('/projetos/:id_projeto/areas/:id_area',function($id_projeto,$id_area) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
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
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_REMOVEU_AREA,implode(',',$area));
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/projetos/:id_projeto/daos/',function($id_projeto) use ($app,$db){
				// lendo dados
				$token = $app->request->headers->get('Authorization');

				// Verificando se o projeto é da mesma empresa do usuário
				$sql = 'SELECT
							A.id,A.id_empresa,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks.gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks.gdoks_projetos
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
							$tipo = $_FILES['profiles']['type'][$i]['file'];
							$tamanho = $_FILES['profiles']['size'][$i]['file'];
							$nomeDao = $_POST['profiles'][$i]['nome'];

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

							// Salvando arquivo no FS
							$salvoNoFS = false;
							if($registradoNaBase) {
								try {
									// verificando se existe uma pasta da empresa. Se não houver, tenta criar.
									$caminho = UPLOAD_PATH.$id_empresa;
									$pastaDaEmpresaExiste = file_exists($caminho);
									if(!$pastaDaEmpresaExiste){
										$pastaDaEmpresaExiste = @mkdir($caminho);
									}

									if($pastaDaEmpresaExiste){
										// Verificando se existe uma pasta do projeto. Se não houver, tenta criar.
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
							}
						} else {
							// Registrando falha no upload no vetor de falhas.
							$erro = new stdClass();
							$erro->arquivo = $_FILES['profiles']['name'][$i]['file'];
							$erro->msg = 'Upload falhou. Erro: '.$_FILES['profiles']['error'][$i]['file'];
							$erro->codigo = -1;
							array_push($erros, $erro);
						}
					}

					// retornando;
					$response = new response(0,'Documentos processados.');
					$response->erros = $erros;
					$response->sucessos = $sucessos;
					$response->flush();
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					die();
				}
			});

			$app->delete('/projetos/:id_projeto/daos/:id_dao',function($id_projeto,$id_dao) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
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
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}

					$removeuDoFS = false;
					if($removeuDaBase){
						// removendo do FS
						$removeuDoFS = @unlink(UPLOAD_PATH.$id_empresa.'/'.$id_projeto.'/'.$dao->nome_unico);
					} else {
						$app->response->setStatus(401);
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
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->put('/projetos/:id_projeto/documentos/:id_documento',function($id_projeto,$id_documento) use ($app,$db){
				
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_projeto = 1*$id_projeto;
				$id_documento = 1*$id_documento;
				$documento = json_decode($app->request->getBody());
				$documento->data_limite = $documento->data_limite==null?'null':substr($documento->data_limite,0,10);

				// parando caso haja inconscistência entre o id_projeto vindo no corpo da requisição e o da url
				if($id_documento != $documento->id) {
					$app->response->setStatus(401);
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
						   FROM gdoks.gdoks_usuarios
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
					$sql = 'UPDATE gdoks_documentos SET nome=?,codigo=?,id_subarea=?,id_subdisciplina=?,data_limite=? WHERE id=?';
					try {
						$db->query($sql,'ssiisi',$documento->nome,$documento->codigo,$documento->id_subarea,$documento->id_subdisciplina,$documento->data_limite,$id_documento);
						$response = new response(0,'Documento alterado com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						$app->response->setStatus(401);
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

					// removendo dependencias e hhs do objeto para salvar no log
					unset($documento->dependencias);
					unset($documento->hhs);
					
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_DOCUMENTO,implode(',', (array)$documento));
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/projetos/:id_projeto/documentos/',function($id_projeto) use ($app,$db){

				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_projeto = 1*$id_projeto;
				$documento = json_decode($app->request->getBody());
				$documento->data_limite = $documento->data_limite==null?'null':substr($documento->data_limite,0,10);

				// verificando se o usário enviado é do mesmo cliente da projeto atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
					$sql = 'INSERT INTO gdoks_documentos (nome,codigo,id_subarea,id_subdisciplina,data_limite) VALUES (?,?,?,?,?)';
					try {
						// Salvando documento
						$db->query($sql,'ssiis',$documento->nome,$documento->codigo,$documento->id_subarea,$documento->id_subdisciplina,$documento->data_limite);

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

						$response = new response(0,'Documento adicionado com sucesso.');
						$response->newId = $newId;
						$response->flush();
					} catch (Exception $e) {
						$app->response->setStatus(401);
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
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->delete('/projetos/:id_projeto/documentos/:id_documento',function($id_projeto,$id_documento) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
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
						   FROM gdoks.gdoks_usuarios
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
				if($ok == 1){
					// Tudo ok! O Documento a ser removido é do mesmo cliente do usuário
					$sql = 'DELETE FROM gdoks_documentos WHERE id=?';
					try {
						$db->query($sql,'i',$id_documento);
						$response = new response(0,'Documento removido com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_REMOVEU_DOCUMENTO,implode(',',$documento));
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->get('/projetos/:id_projeto/documentos/',function($id_projeto) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_projeto = 1*$id_projeto;
				
				// Verificando se projeto é do mesmo cliente do usuário atual
				$sql = 'SELECT COUNT(*) AS ok
						FROM
						  ( SELECT id,
						           id_empresa
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  ( SELECT id_empresa
						   FROM gdoks.gdoks_projetos
						   WHERE id=?) B ON A.id_empresa=B.id_empresa;';
			
				$ok = $db->query($sql,'si',$token,$id_projeto)[0]['ok'];

				// Segiundo em frente
				if($ok){
					// Carregando documentos da base
					$sql = 'SELECT
								a.id,
								a.nome,
								a.codigo,
								a.data_limite,
								b.id as id_subdisciplina,
								d.id as id_subarea    
							FROM
								gdoks_documentos a
								INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
								INNER JOIN gdoks_disciplinas c on b.id_disciplina=c.id
								INNER JOIN gdoks_subareas d on a.id_subarea=d.id
								INNER JOIN gdoks_areas e on d.id_area=e.id
							WHERE
								e.id_projeto=?';
					$documentos = array_map(
						function($a){
							$a = (object)$a;
							$a->dependencias = Array();
							$a->hhs = Array();
							return $a;
						}, $db->query($sql,'i',$id_projeto));

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
					$app->response->setStatus(401);
					$response = new response(1,'Não lê dados de outra empresa.');
				}
			});
		// FIM DE ROTAS DE PROJETOS

		// ROTAS DE DOCUMENTOS
			$app->get('/documentos/paraValidar',function() use ($app,$db){
				// Lendo o token
				$token = $app->request->headers->get('Authorization');

				// Levantando o id do usuário caso ele esteja logado. caso contrário retorna 401
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token);

				if(sizeof($rs) == 0){
					$app->response->setStatus(401);
					$response = new response(1,'Refresh failed!');
					$response->flush();
					return;
				} else {
					$idu = $rs[0]['id'];
					$sql = 'SELECT a.id,
							       a.nome,
							       a.data_limite,
							       a.id_area,
							       b.nome AS nome_area,
							       b.codigo AS codigo_area,
							       b.id_projeto,
							       c.nome AS nome_projeto,
							       a.id_subdisciplina,
							       d.nome AS nome_subdisciplina,
							       d.id_disciplina,
							       e.nome AS nome_disciplina,
								   a.id_progresso_a_validar
							FROM gdoks_documentos a
							INNER JOIN gdoks_areas b ON a.id_area=b.id
							INNER JOIN gdoks_projetos c ON c.id=b.id_projeto
							INNER JOIN gdoks_subdisciplinas d ON d.id=a.id_subdisciplina
							INNER JOIN gdoks_disciplinas e ON d.id_disciplina=e.id
							INNER JOIN gdoks_validadores f ON f.id_disciplina=e.id
							WHERE f.id_usuario=? and a.id_progresso_a_validar is not null';
					$documentos = $db->query($sql,'i',$idu);

					// levantando arquivos deste documento
					$sql = 'SELECT id,
							       idu,
							       datahora_upload as data,
							       progresso_total
							FROM gdoks_arquivos
							WHERE id_documento=?
							ORDER BY datahora_upload';
					for ($i=0; $i < sizeof($documentos); $i++) { 
						$documentos[$i] = (object)$documentos[$i];
						$documentos[$i]->progressos = array_map( function($a){return (object)$a;}, $db->query($sql,'i',$documentos[$i]->id));
					}					
					$response = new response(0,'ok');
					$response->documentos = $documentos;
					$response->flush();
				}
			});

			$app->put('/documentos/:id/validarProgresso',function($id) use ($app,$db){
				// Lendo o token
				$token = $app->request->headers->get('Authorization');
				$id_documento = 1*$id;
				$progresso = 1*$app->request->getBody();
				
				// Levantando o id do usuário caso ele esteja logado. caso contrário retorna 401
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token);

				// Verificando se o token é válido
				if(sizeof($rs) == 0){
					// Token inválido...
					$app->response->setStatus(401);
					$response = new response(1,'Refresh failed!');
					$response->flush();
					return;
				} else {
					// Token é válido
					// Verificando se o usuário logado é um validador deste documento
					$idu = $rs[0]['id'];
					$sql = 'SELECT count(*)=1 AS ok
							FROM gdoks_documentos a
							INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
							INNER JOIN gdoks_validadores c ON c.id_disciplina=b.id_disciplina
							WHERE c.id_usuario=?
							  AND a.id=?';
					$ok = $db->query($sql,'ii',$idu,$id_documento)['0']['ok'];

					if($ok){
						// Levantando o id do documento a ter o progresso validado
						$sql = 'SELECT id_progresso_a_validar FROM gdoks_documentos WHERE id=?';
						$rs = $db->query($sql,'i',$id_documento);
						if(sizeof($rs)>0){
							// atualizando dados na tabela de arquivos
							$id_arquivo = $rs[0]['id_progresso_a_validar'];
							$sql = 'UPDATE gdoks_arquivos SET progresso_total=?,idu_validador=?,datahora_validacao=now() WHERE id=?';
							$db->query($sql,'iii',$progresso,$idu,$id_arquivo);

							// atualizando dados na tabela de documentos
							$sql = 'UPDATE gdoks_documentos SET id_progresso_a_validar=null WHERE id=?';
							$db->query($sql,'i',$id_documento);

							// registrando realização da ação.
							registrarAcao($db,$idu,ACAO_VALIDOU_PROGRESSO,$progresso.','.$id_documento);

							// retornando resultado
							$response = new response(0,'ok');
							$response->flush();
							return;
						} else {
							$app->response->setStatus(401);
							$response = new response(1,'Documento não está pendente de validação.');
							$response->flush();
							return;
						}
					} else {
						// usuário não é validador da disciplina deste documento
						$app->response->setStatus(401);
						$response = new response(1,'Usuário não é validador da disciplina deste documento');
						$response->flush();
						return;
					}
				}
			});

			$app->get('/documentos/paraAtualizar',function() use ($app,$db){
				// Lendo o token
				$token = $app->request->headers->get('Authorization');

				// Levantando o id do usuário caso ele esteja logado. caso contrário retorna 401
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token);

				if(sizeof($rs) == 0){
					$app->response->setStatus(401);
					$response = new response(1,'Refresh failed!');
					$response->flush();
					return;
				} else {
					$idu = $rs[0]['id'];
					$sql = 'SELECT a.id,
							       a.nome,
							       a.data_limite,
							       a.id_area,
							       b.nome AS nome_area,
							       b.codigo AS codigo_area,
							       b.id_projeto,
							       c.nome AS nome_projeto,
							       a.id_subdisciplina,
							       d.nome AS nome_subdisciplina,
							       d.id_disciplina,
							       e.nome AS nome_disciplina,
								   a.id_progresso_a_validar,
								   a.datahora_do_checkout,
								   a.idu_checkout
							FROM gdoks_documentos a
							INNER JOIN gdoks_areas b ON a.id_area=b.id
							INNER JOIN gdoks_projetos c ON c.id=b.id_projeto
							INNER JOIN gdoks_subdisciplinas d ON d.id=a.id_subdisciplina
							INNER JOIN gdoks_disciplinas e ON d.id_disciplina=e.id
							INNER JOIN gdoks_especialistas f ON f.id_disciplina=e.id
							WHERE f.id_usuario=?';
					$documentos = $db->query($sql,'i',$idu);

					// levantando arquivos deste documento
					$sql = 'SELECT id,
							       idu,
							       datahora_upload as data,
							       progresso_total
							FROM gdoks_arquivos
							WHERE id_documento=?
							ORDER BY datahora_upload';
					for ($i=0; $i < sizeof($documentos); $i++) { 
						$documentos[$i] = (object)$documentos[$i];
						$documentos[$i]->progressos = array_map( function($a){return (object)$a;}, $db->query($sql,'i',$documentos[$i]->id));
					}					
					$response = new response(0,'ok');
					$response->documentos = $documentos;
					$response->flush();
				}
			});

			$app->get('/documentos/:idDoc/lock',function($idDoc) use ($app,$db){
				// Lendo o token
				$token = $app->request->headers->get('Authorization');

				// Assegurando que $idDoc seja um inteiro
				$idDoc = 1*$idDoc;

				// Levantando o id do usuário caso ele esteja logado. caso contrário retorna 401
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token);

				if(sizeof($rs) == 0){
					// Respondendo para um token inválido
					$app->response->setStatus(401);
					$response = new response(1,'Refresh failed!');
					$response->flush();
					return;
				} else {
					// Escrevendo o id do usuário em idu
					$idu = $rs[0]['id'];

					// Verificando se o usuário é validador ou especialista da disciplina do documento mm uestão
					$sql = 'SELECT count(*)>0 AS ok
							FROM gdoks_documentos a
							INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
							INNER JOIN gdoks_especialistas c ON c.id_disciplina=b.id_disciplina
							INNER JOIN gdoks_validadores d ON d.id_disciplina=d.id_disciplina
							WHERE a.id=?
							  AND (c.id_usuario=?
							       OR d.id_usuario=?)';
					$ok = $db->query($sql,'iii',$idDoc,$idu,$idu)[0]['ok'];

					if($ok){
						// Documento pode ser alterado pelo usuário atual

						// verificando se o documento está desbloqueado
						$sql = 'SELECT idu_checkout, datahora_do_checkout from gdoks_documentos where id=?';
						$doc = $db->query($sql,'i',$idDoc)[0];
						if($doc['idu_checkout'] == null){
							// documento desbloqueado! Bloqueando!
							$sql = 'UPDATE gdoks_documentos SET idu_checkout=?,datahora_do_checkout=now() WHERE id=?';
							$db->query($sql,'ii',$idu,$idDoc);

							// Respondendo
							$response = new response(0,'ok');
							$response->lockInfo = json_decode('{"idu_checkout":'.$idu.',"datahora_do_checkout":"'.date('Y-m-d H:i:s').'"}');
							$response->flush();
							
							// Registrando Ação
							registrarAcao($db,$idu,ACAO_BLOQUEOU_DOCUMENTO,''.$idDoc);
						} else {
							// Documento bloqueado

							// Respondendo
							$response = new response(2,'Documento bloqueado');
							$response->lockInfo = (object)$doc;
							$response->flush();
						}

					} else {
						// Documento não pode ser alterado pelo usuário atual
						$app->response->setStatus(401);
						$response = new response(1,'Não autorizado a bloquear este documento.');
						$response->flush();
						return;
					}
				}
			});

			$app->get('/documentos/:idDoc/delock',function($idDoc) use ($app,$db){
				// Lendo o token
				$token = $app->request->headers->get('Authorization');

				// Assegurando que $idDoc seja um inteiro
				$idDoc = 1*$idDoc;

				// Levantando o id do usuário caso ele esteja logado. caso contrário retorna 401
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token);

				if(sizeof($rs) == 0){
					// Respondendo para um token inválido
					$app->response->setStatus(401);
					$response = new response(1,'Refresh failed!');
					$response->flush();
					return;
				} else {
					// Escrevendo o id do usuário em idu
					$idu = $rs[0]['id'];

					// Verificando se o documento está realmente bloqueado
					$sql = 'SELECT idu_checkout,datahora_do_checkout FROM gdoks_documentos a	WHERE a.id=?';
					$idu_checkout = $db->query($sql,'i',$idDoc)[0]['idu_checkout'];
					$datahora_checkout = $db->query($sql,'i',$idDoc)[0]['datahora_do_checkout'];

					if($idu_checkout == null){
						// Documento já está desbloqueado
						$response = new response(2,'Documento já está desbloqueado.');
						$response->flush();
						return;
					} else {
						// Documento está bloqueado.

						// Verificando se quem bloqueou o documento foi o usuário que agora quer desbloquear
						if($idu_checkout == $idu){
							// Sim. Desbloqueando
							$sql = 'UPDATE gdoks_documentos SET idu_checkout=null, datahora_do_checkout=null WHERE id=?';
							$db->query($sql,'i',$idDoc);

							// Respondendo sucesso
							$response = new response(0,'ok');
							$response->flush();
							return;

							//Registrando Ação
							registrarAcao($db,$idu,ACAO_DESBLOQUEOU_DOCUMENTO,''.$idDoc);
						} else {
							// Respondendo para tentativa de desbloqueio de outro usuário
							$response = new response(3,'Não pode desbloquear documento bloqueado por outro usuário!');
							$response->lockInfo = json_decode('{"idu_checkout":'.$idu_checkout.',"datahora_do_checkout":"'.$datahora_checkout.'"}');
							$response->flush();
							return;
						}
					}

					// Verificando se o usuário foi quem bloqueou o documento
					$sql = 'SELECT idu_checkout=? AS ok
							FROM gdoks_documentos a	WHERE a.id=?';
					$ok = $db->query($sql,'ii',$idu,$idDoc)[0]['ok'];

					if($ok){
						// Documento pode ser alterado pelo usuário atual

						// verificando se o documento está desbloqueado
						$sql = 'SELECT idu_checkout, datahora_do_checkout from gdoks_documentos where id=?';
						$doc = $db->query($sql,'i',$idDoc)[0];
						if($doc['idu_checkout'] == null){
							// documento desbloqueado! Bloqueando!
							$sql = 'UPDATE gdoks_documentos SET idu_checkout=?,datahora_do_checkout=now() WHERE id=?';
							$db->query($sql,'ii',$idu,$idDoc);

							// Respondendo
							$response = new response(0,'ok');
							$response->flush();
							
							// Registrando Ação
							registrarAcao($db,$idu,ACAO_BLOQUEOU_DOCUMENTO,''.$idDoc);
						} else {
							// Documento bloqueado

							// Respondendo
							$response = new response(1,'Documento bloqueado');
							$response->lockInfo = $doc;
							$response->flush();
						}

					} else {
						// Documento não pode ser alterado pelo usuário atual
						$app->response->setStatus(401);
						$response = new response(1,'Não autorizado a desbloquear este documento.');
						$response->flush();
						return;
					}
				}
			});

			$app->post('/documentos/:idDoc/arquivos/',function($id_doc) use ($app,$db){
				// lendo dados
				$token = $app->request->headers->get('Authorization');
				$id_doc = 1*$id_doc; 

				// Verificando se o documento é da mesma empresa do usuário
				$sql = 'SELECT
							A.id,A.id_empresa,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks.gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
									SELECT c.id_empresa
									FROM gdoks_documentos a
									INNER JOIN gdoks_areas b ON b.id=a.id_area
									INNER JOIN gdoks_projetos c ON c.id=b.id_projeto
									WHERE a.id = ?) B on A.id_empresa=B.id_empresa;';
				$rs = $db->query($sql,'si',$token,$id_doc)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id'];
				$id_empresa = $rs['id_empresa'];


				// Indo adiante
				if($ok == 1) {

					// verificando se há erro
					if($_FILES['file']['error'] == 0){
						// UPLOAD COM SUCESSO
						// Organizando informações a serem salvas na base
						$nomeUnico = uniqid(true);
						$caminho = UPLOAD_PATH.$id_empresa.'/';
						$nomeTemporario = $_FILES['file']['tmp_name'];
						$nomeCliente = $_FILES['file']['name'];
						$tipo = $_FILES['file']['type'];
						$tamanho = $_FILES['file']['size'];
						$progresso = 1*$_POST['progresso'];

						// Registrando informações na base
						$registradoNaBase = false;
						$sql = "INSERT INTO gdoks_arquivos (caminho,nome_cliente,id_documento,datahora_upload,progresso_total,idu,tamanho)
								VALUES (?,?,?,NOW(),?,?,?)";
						$idInserido = null;
						try {
							$db->query($sql,'ssiiii',
								$caminho.$nomeUnico,
								$nomeCliente,
								$id_doc,
								$progresso,
								$id_usuario,
								$tamanho);
							$id_inserido = $db->insert_id;
						} catch (Exception $e1) {
							// registrando falha na consulta no vetor de falhas.
							$app->response->setStatus(401);
							$response = new Response(1,$e1->getMessage());
							$response->flush();
							die();
						}

						// Salvando arquivo no FS
						try {
							// verificando se existe uma pasta da empresa. Se não houver, tenta criar.
							$caminho = UPLOAD_PATH.$id_empresa;
							$pastaDaEmpresaExiste = file_exists($caminho);
							if(!$pastaDaEmpresaExiste){
								$pastaDaEmpresaExiste = @mkdir($caminho);
							}

							if($pastaDaEmpresaExiste){
								// Salvando arquivo na pasta do cliente
								$salvoNoFS = @move_uploaded_file($nomeTemporario, $caminho.'/'.$nomeUnico);	
							} else {
								$salvoNoFS = false;
							}

							if($salvoNoFS){
								// Registrando na tabela de documentos que este arquivo é um progresso a ser validado
								$sql = 'UPDATE gdoks_documentos SET id_progresso_a_validar=? WHERE id=?';
								$db->query($sql,'ii',$id_inserido,$id_doc);

								// Criando elemento progresso
								$progressoAValidar = new stdClass();
								$progressoAValidar->id_doc = $id_doc;
								$progressoAValidar->id = $id_inserido;
								$progressoAValidar->idu = $id_usuario;
								$progressoAValidar->progresso_total = $progresso;
								$progressoAValidar->data = date('Y-m-dTH:i:s');
								
								// retornando;
								$response = new response(0,'Arquivo processado.');
								$response->progresso = $progressoAValidar;
								$response->flush();

								// Registrando a ação
								unset($progressoAValidar->data);
								unset($progressoAValidar->idu);
								registrarAcao($db,$id_usuario,ACAO_ATUALIZOU_DOCUMENTO,implode(',', (array)$progressoAValidar));
								die();
							} else {
								// registrando falha no processo de salvar no FS
								$erro = new stdClass();
								$erro->arquivo = $nomeCliente;
								$erro->msg = $e1->getMessage();
								array_push($erros, $erro);

								// removendo registro na base de dados
								$sql = "DELETE from gdoks_arquivos WHERE id=?";
								$db->query($sql,'i',$id_inserido);
							}
						} catch (Exception $e2) {
							// registrando falha na consulta no vetor de falhas.
							$app->response->setStatus(401);
							$response = new Response(1,$e2->getMessage());
							$response->flush();
							die();
						}
					} else {
						// Respondendo falha no upload.
						$app->response->setStatus(401);
						$response = new Response(1,'Upload falhou. Erro: '.$_FILES['file']['error']);
						$response->flush();
						die();
					}
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					$response->flush();
					die();
				}
			});
			
			$app->get('/documentos',function() use ($app,$db){
				// Lendo o token
				$token = $app->request->headers->get('Authorization');

				// Levantando o id do usuário caso ele esteja logado. caso contrário retorna 401
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token);

				if(sizeof($rs) == 0){
					// Respondendo para um token inválido
					$app->response->setStatus(401);
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
						$app->response->setStatus(401);
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

		// FIM DE ROTAS DE DOCUMENTOS */

		// ROTAS DE ARQUIVOS
			$app->get('/arquivos/:id',function($id) use ($app,$db){
				// Lendo o token
				$token = $_GET['token'];

				// Levantando o id do usuário caso ele esteja logado. caso contrário retorna 401
				$sql = 'SELECT id
						FROM gdoks_usuarios
						WHERE token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token);

				if(sizeof($rs) == 0){
					$app->response->setStatus(401);
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
			$app->get('/clientes',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$sql = 'SELECT a.id,
						       a.nome,
						       a.cnpj,
						       a.cpf
						FROM gdoks_clientes a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
							ORDER by a.nome';
				$response = new response(0,'ok');
				$response->clientes = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->get('/clientes/:id',function($id) use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$sql = 'SELECT a.id,
						       a.nome,
						       a.nome_fantasia,
						       a.cnpj,
						       a.cpf,
						       a.contato_nome,
						       a.contato_email,
						       a.contato_telefone
						FROM gdoks_clientes a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
						WHERE a.id=?
							ORDER by a.nome';
				$response = new response(0,'ok');
				$response->cliente = $db->query($sql,'si',$token,$id)[0];
				$response->flush();
			});

			$app->put('/clientes/:id',function($id) use ($app,$db){
				// Lendo dados
				$token = $app->request->headers->get('Authorization');
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
							FROM gdoks.gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks.gdoks_clientes
								WHERE id=?) B on A.id_empresa=B.id_empresa;';
				$rs = $db->query($sql,'si',$token,$id)[0];
				$ok = $rs['ok'];
				$id_usuario = $rs['id'];

				// Indo adiante
				if($ok == 1) {
					$sql = "UPDATE gdoks_clientes
							SET	
								nome=?,
         						nome_fantasia=?,
		                       	cpf=?,
								cnpj=?,
                                contato_nome=?,
                                contato_email=?,
                                contato_telefone=?
                            WHERE id=?";
                    try {
                    	$db->query($sql,'sssssssi',$cliente->nome,$cliente->nome_fantasia,$cliente->cpf,$cliente->cnpj,$cliente->contato_nome,$cliente->contato_email,$cliente->contato_telefone,$id);
                    } catch (Exception $e) {
                    	$response = new response(1,'Erro na consulta: '.$e->getMessage());
						$response->flush();
						die();
                    }
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					die();
				}

				// retornando
				$response = new response(0,'Dados da empresa alterados com sucesso.');
				$response->flush();

				// registrando alteração
				registrarAcao($db,$id_usuario,ACAO_ALTEROU_CLIENTE,$cliente->id.','.$cliente->nome.','.$cliente->nome_fantasia);
			});

			$app->post('/clientes',function() use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
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

				// Inserindo novo cliente.
				$sql = 'INSERT INTO gdoks_clientes (nome,nome_fantasia,cpf,cnpj,contato_nome,contato_email,contato_telefone,id_empresa,registrado_em) VALUES (?,?,?,?,?,?,?,?,NOW())';
				try {
					$db->query($sql,'sssssssi',$cliente->nome,$cliente->nome_fantasia,$cliente->cpf,$cliente->cnpj,$cliente->contato_nome,$cliente->contato_email,$cliente->contato_telefone,$id_empresa);
					$response = new response(0,'Cliente criado com sucesso.');
					$response->newId = $db->insert_id;
					$response->flush();
				} catch (Exception $e) {
					$app->response->setStatus(401);
					$response = new response(1,$e->getMessage());
					$response->flush();
					return;
				}
				// Registrando a ação
				registrarAcao($db,$id,ACAO_ADICIONOU_CLIENTE,$db->insert_id.','.$cliente->nome);
			});
		// FIM DE ROTAS DE CLIENTES
		
		// ROTAS DE AÇÕES
			$app->get('/acoes',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
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
			$app->get('/logs/:uid/:aid/:de/:ate',function($uid,$aid,$de,$ate) use ($app,$db){
				$token = $app->request->headers->get('Authorization');
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
			$app->get('/cargos',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$sql = 'SELECT a.id,
						       a.nome,
						       a.valor_hh
						FROM gdoks_cargos a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
							ORDER by a.nome';
				$response = new response(0,'ok');
				$response->cargos = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->get('/cargos/:id',function($id) use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$idCargo = 1*$id;
				$sql = 'SELECT a.id,
						       a.nome,
						       a.valor_hh
						FROM gdoks_cargos a
						INNER JOIN
						  (SELECT id_empresa
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?) b ON a.id_empresa=b.id_empresa
						WHERE a.id=?';
				$response = new response(0,'ok');
				$response->cargos = $db->query($sql,'si',$token,$idCargo);
				$response->flush();
			});

			$app->put('/cargos/:id',function($id) use ($app,$db){
				// Lendo dados
				$token = $app->request->headers->get('Authorization');
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
							FROM gdoks.gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks.gdoks_cargos
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
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
					die();
				}

				// retornando
				$response = new response(0,'Dados do cargo alterados com sucesso.');
				$response->flush();

				// registrando alteração
				registrarAcao($db,$id_usuario,ACAO_ALTEROU_CARGO,$cargo->id.','.$cargo->nome.','.$cargo->valor_hh);
			});
			
			$app->post('/cargos',function() use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
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
					$app->response->setStatus(401);
					$response = new response(1,$e->getMessage());
					$response->flush();
					return;
				}
				// Registrando a ação
				registrarAcao($db,$id,ACAO_ADICIONOU_CARGO,$db->insert_id.','.$cargo->nome,$cargo->valor_hh);
			});
			
			$app->delete('/cargos/:id',function($id) use ($app,$db){
				// Lendo dados
				$token = $app->request->headers->get('Authorization');
				$idCargo = 1*$id;

				// Verificando se o cargo é da mesma empresa do usuário
				$sql = 'SELECT
							A.id,COUNT(*) as ok
						FROM (
							SELECT
								id,id_empresa
							FROM gdoks.gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_empresa
							FROM gdoks.gdoks_cargos
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
					$app->response->setStatus(401);
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
			$app->put('/subareas/:id_subarea',function($id_subarea) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_subarea = 1*$id_subarea;
				$subarea = json_decode($app->request->getBody());

				// parando caso haja inconscistência entre o id_projeto vindo no corpo da requisição e o da url
				if($id_subarea != $subarea->id) {
					$app->response->setStatus(401);
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
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ALTEROU_SUBAREA,$subarea->id.','.$subarea->nome.','.$subarea->codigo.','.$subarea->area->id);
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->post('/subareas/',function() use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$subarea = json_decode($app->request->getBody());

				// verificando se o usário enviado é do mesmo cliente da area atual
				$sql = 'SELECT A.id AS id_usuario,
						       count(*) AS ok
						FROM
						  (SELECT id,
						          id_empresa
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,'Erro na execução do comando SQL: '.$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_CRIOU_SUBAREA,$subarea->id.','.$subarea->nome.','.$subarea->codigo.','.$subarea->area->id);
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});

			$app->delete('/subareas/:id_subarea',function($id_subarea) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
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
						   FROM gdoks.gdoks_usuarios
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
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_REMOVEU_SUBAREA,implode(',',$subarea));
				} else {
					$app->response->setStatus(401);
					$response = new response(1,'Não altera dados de outra empresa.');	
				}
			});
		// FIM DE ROTAS DE SUBÁREAS
	});


	// running the app
	$app->run();
?>