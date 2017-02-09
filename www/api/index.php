<?php
	// Configurando a descrição do erro at runtime
	error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

	// Required files - - - - - - - - - - - - - - - - - - -
	require('../../includes/Slim/vendor/autoload.php');
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
				$token = $app->request->headers->get('Authorization');
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
				$response = new response(0,'ok');
				$response->disciplinas = $db->query($sql,'s',$token);
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
						$response = new response(1,'Já existe uma subdisciplina cadastrado com esta sigla ou nome.');
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
						$response = new response(1,$e->getMessage);
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
			
			$app->post('/disciplinas/:id_disciplina/validadores/',function($id_disciplina) use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$id_disciplina = 1*$id_disciplina;
				$data = json_decode($app->request->getBody());
				$id_validador = $data->idu;
				$tipo = $data->tipo;

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
					$sql = 'INSERT INTO gdoks_validadores (id_usuario,id_disciplina,tipo) VALUES (?,?,?)';
					try {
						$db->query($sql,'iii',$id_validador,$id_disciplina,$tipo);
						$response = new response(0,'Validador adicionado com sucesso.');
						$response->flush();
					} catch (Exception $e) {
						$app->response->setStatus(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
					// Registrando a ação
					registrarAcao($db,$id_usuario,ACAO_ASSOCIOU_VALIDADOR,$id_validador.','.$id_disciplina.','.$tipo);
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
				$sql = 'SELECT p.id AS id_projeto,
						       p.nome AS nome_projeto,
						       p.ativo,
						       pup.permissao
						FROM gdoks_usuarios u
						INNER JOIN gdoks_perm_usuarios_x_projetos pup ON pup.id_usuario=u.id
						INNER JOIN gdoks_projetos p ON pup.id_projeto=p.id
						WHERE token=?
						  AND pup.permissao>0';

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
					$sql = "SELECT nome, ativo FROM gdoks_projetos WHERE id=?";
					$projeto = (object)$db->query($sql,'i',$id_projeto)[0];
					
					// Levantando áreas do projeto
					$sql = "SELECT id,nome FROM gdoks_areas WHERE id_projeto=?";
					$projeto->areas = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));

					// Levantando usuários que possuem acesso ao projeto
					$sql = "SELECT u.id,
							       u.nome,
							       u.email,
							       u.ativo,
							       pup.permissao
							FROM gdoks.gdoks_perm_usuarios_x_projetos pup
							INNER JOIN gdoks_usuarios u ON pup.id_usuario=u.id
							WHERE pup.id_projeto=?
							  AND pup.permissao>0;";
					$projeto->usuarios = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));

					// Levantando documentos do projeto
					$sql = "SELECT id,nome FROM gdoks_documentos WHERE id_projeto=?";
					$projeto->documentos = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$id_projeto));

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
		// FIM DE ROTAS DE PROJETOS
		
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

		
	});


	// running the app
	$app->run();
?>