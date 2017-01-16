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
					FROM gdoks_clientes a
					INNER JOIN gdoks_usuarios b ON a.id=b.id_cliente
					WHERE login=?
					  AND senha=PASSWORD(?)
					  AND ucase(a.nome)=ucase(?)
					  AND ativo';
			$result = $db->query($sql,'sss',$data->login,$data->senha,$data->cliente)[0];

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
						  (SELECT id_cliente
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?) b ON a.id_cliente=b.id_cliente
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
								id,id_cliente
							FROM gdoks.gdoks_usuarios
							WHERE token=? AND validade_do_token>now()) A INNER JOIN 
								(
							SELECT
								id_cliente
							FROM gdoks.gdoks_usuarios
								WHERE id=?) B on A.id_cliente=B.id_cliente;';
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
					$response = new response(1,'Não altera dados de outro cliente.');	
				}
			});

			$app->post('/usuarios',function() use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$usuario = json_decode($app->request->getBody());

				// Capturando o id e o id_cliente do usuário atual
				$sql = 'SELECT
							id,id_cliente
						FROM 
							gdoks_usuarios
						WHERE
							token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token)[0];
				$id_cliente = $rs['id_cliente'];
				$id = $rs['id'];

				// Inserindo novo usuário.
				$sql = 'INSERT INTO gdoks_usuarios (nome,email,login,senha,id_cliente,ativo) VALUES (?,?,?,?,?,?)';
				try {
					$db->query($sql,'ssssii',$usuario->nome,$usuario->email,$usuario->login,$usuario->senha1,$id_cliente,$usuario->ativo);
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
		
		// ROTAS DE DISCIPLINAS
			$app->get('/disciplinas',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$sql = 'SELECT a.id,
						       a.nome,
						       a.sigla,
						       a.ativa
						FROM gdoks_disciplinas a
						INNER JOIN
						  (SELECT id_cliente
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?) b ON a.id_cliente=b.id_cliente
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
						           id_cliente
						   FROM gdoks.gdoks_usuarios
						   WHERE token=?
						     AND validade_do_token>now()) A
						INNER JOIN
						  ( SELECT id_cliente
						   FROM gdoks.gdoks_disciplinas
						   WHERE id=?) B ON A.id_cliente=B.id_cliente;';
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
					$response = new response(1,'Não altera dados de outro cliente.');	
				}
			});

			$app->post('/disciplinas',function() use ($app,$db){
				// Lendo e saneando as informações da requisição
				$token = $app->request->headers->get('Authorization');
				$disciplina = json_decode($app->request->getBody());

				// Capturando o id e o id_cliente do usuário atual
				$sql = 'SELECT
							id,id_cliente
						FROM 
							gdoks_usuarios
						WHERE
							token=? and validade_do_token>now()';
				$rs = $db->query($sql,'s',$token)[0];
				$id_cliente = $rs['id_cliente'];
				$id = $rs['id'];

				// Inserindo nova disciplina.
				$sql = 'INSERT INTO gdoks_disciplinas (nome,sigla,id_cliente,ativa) VALUES (?,?,?,?)';
				try {
					$db->query($sql,'ssii',$disciplina->nome,$disciplina->sigla,$id_cliente,$disciplina->ativa);
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
		// CLASSES ROUTE DEFINITION - - - - - - - - - - - - -
			$app->get('/classes',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$sql = 'SELECT a.id,
						       a.nome,
						       a.de_entrada,
						       concat(a.ancestrais,a.id) as fullName
						FROM geff_classificacoes a
						INNER JOIN geff_nucleos b ON a.id_nucleo=b.id
						INNER JOIN geff_usuarios c ON (c.id_nucleo=b.id
						                               AND c.token=?
						                               AND token_expiration>now())
						WHERE
							a.id!=b.id_entrada_conciliatoria and
							a.id!=b.id_saida_conciliatoria and
							a.id!=b.id_classe_mec_entrada and
							a.id!=b.id_classe_mec_saida
						';
				$response = new response(0,'ok');
				$response->classes = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->post('/classes',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$rs = $db->query('select id_nucleo from geff_usuarios where token=? and token_expiration>now()','s',$token);
				if(sizeof($rs)==0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					$id_nucleo = $rs[0]['id_nucleo'];
					$d = json_decode($app->request->getBody());
					$classe = $db->query("call class_insert(?,?,?,?)",'siii',$d->nome,$d->de_entrada,$id_nucleo,$d->pai->id);
					$response = new response(0,'ok');
					$response->classe = $classe[0];
					$response->flush();
				}
			});

			$app->put('/classes/:id',function($id) use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				// Verificando se o classe a ser alterado é do mesmo núcleo do usuário
				$sql = "select count(*)=1 as ok from geff_classificacoes a inner join geff_nucleos b on a.id_nucleo=b.id inner join geff_usuarios c on (c.id_nucleo=b.id and c.token=? and token_expiration>now()) where a.id=?";
				$ok = $db->query($sql,'si',$token,$id)[0]['ok'];
				if($ok==0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					$d = json_decode($app->request->getBody());
					$sql = "call class_update(?,?,?)";
					try {
						$db->query($sql,'isi',$d->id,$d->nome,$d->pai->id);
						$response = new response(0,'ok');
						$response->flush();
					} catch (Exception $e) {
						$response = new response(1,str_replace('Failed to execute statement: ', '', $e->getMessage()));
						$response->flush();
					}
				}
			});

			$app->delete('/classes/:id',function($id) use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				// Verificando se o classe a ser alterado é do mesmo núcleo do usuário
				$sql = "select count(*)=1 as ok from geff_classificacoes a inner join geff_nucleos b on a.id_nucleo=b.id inner join geff_usuarios c on (c.id_nucleo=b.id and c.token=? and token_expiration>now()) where a.id=?";
				$ok = $db->query($sql,'si',$token,$id)[0]['ok'];
				if($ok==0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					try {
						$db->query("call class_delete(?)",'i',$id);	
						$response = new response(0,'ok');
						$response->flush();	
					} catch (Exception $e) {
						$app->response->setStatus(401);
						$response = new response(1,str_replace('Failed to execute statement: ', '', $e->getMessage()));
						$response->flush();	
					}
				}
			});

			$app->get('/classes_conciliatorias',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$response = new response(0,'ok');
				// levantando classe de entrada conciliatória
				$sql = '
						SELECT a.id,
						       a.nome
						FROM geff_classificacoes a
						INNER JOIN geff_nucleos b ON a.id_nucleo=b.id
						INNER JOIN geff_usuarios c ON (c.id_nucleo=b.id
						                               AND c.token=?
						                               AND token_expiration>now())
						WHERE a.id=b.id_entrada_conciliatoria';
				$response->classeEntradaConciliatoria = $db->query($sql,'s',$token)[0];
				// levantando classe de saída conciliatória
				$sql = '
						SELECT a.id,
						       a.nome
						FROM geff_classificacoes a
						INNER JOIN geff_nucleos b ON a.id_nucleo=b.id
						INNER JOIN geff_usuarios c ON (c.id_nucleo=b.id
						                               AND c.token=?
						                               AND token_expiration>now())
						WHERE a.id=b.id_saida_conciliatoria';
				$response->classeSaidaConciliatoria = $db->query($sql,'s',$token)[0];
				// Enviando resposta
				$response->flush();
			});
		// FIM DE CLASSES ROUTE DEFINITION - - - - - - - - - -

		// MOVIMENTOS ROUTE DEFINITION - - - - - - - - - - - -
			$app->post('/movimentos',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$rs = $db->query('select id,id_nucleo from geff_usuarios where token=? and token_expiration>now()','s',$token);
				if(sizeof($rs)==0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					$id_nucleo = $rs[0]['id_nucleo'];
					$id_usuario = $rs[0]['id'];
					$movimentos = json_decode($app->request->getBody());
					$error = 0;
					$msg = 'ok';
					$series_de_parcelas = Array();
					foreach ($movimentos as $i => $m) {
						if(empty($m->nx)){
							// movimento de caixa que não é cartão.
							try {
								$m->id_usuario = $id_usuario;
								$m = insereMovimento($m);
								$m->erros = Array();
							} catch (Exception $e) {
								$m->erros = Array(str_replace('Failed to execute statement: ', '', $e->getMessage()));
							}
						} else {
							// movimento de cartão em $m->nx vezes
							// verificando se existe saldo para o movimento
							$rs = $db->query('select saldo - limite_inferior as max from geff_caixas where id=?','i',$m->id_caixa);
							if($m->valor > $rs[0]['max']){
								// não existe saldo para o movimento
								$m->erros = Array("Impossível inserir movimento. Saldo insuficiente.");
							} else {
								// existe saldo
								// salvando movimento de cartão
								$parcelas = salva_movimento_de_cartao($m,$id_usuario);
								array_push($series_de_parcelas,$parcelas);
							}
						}
					}
					// removendo do vetor de movimentos aqueles que são de cartão de crédito ($m->nx > 0)
					$movimentos = array_values(array_filter($movimentos,function($m){ return empty($m->nx);}));

					// juntando aos movimentos as séries de parcelas criadas pelos movimentos do tipo cartão de crédito
					foreach ($series_de_parcelas as $parcelas) {
						$movimentos = array_merge($movimentos,$parcelas);
					}
					
					// preparando resposta
					$response = new response($error,$msg);
					$response->movimentos = $movimentos;
					$response->flush();
				}
			});

			$app->get('/movimentos',function() use ($app,$db){
				$MAX_MOVIMENTOS = 100; // <-- Número máximo de movimentos retornados
				$token = $app->request->headers->get('Authorization');
				$rs = $db->query('select id_nucleo from geff_usuarios where token=? and token_expiration>now()','s',$token);
				if(sizeof($rs)==0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					$id_nucleo = $rs[0]['id_nucleo'];

					// Levantando data da última conciliação
					$rs = $db->query('select registrada_em from geff_conciliacoes where id_nucleo=? order by registrada_em desc limit 1','i',$id_nucleo);
					if(sizeof($rs) == 0){
						// Não há nenhuma conciliacao!
						$rs = $db->query('
						SELECT a.id,
						       DATE_FORMAT(a.data,"%Y-%m-%d") as data,
						       DATE_FORMAT(a.registrado_em,"%Y-%m-%dT%H:%i:%s") as registrado_em,
						       a.valor,
						       a.id_caixa,
						       c.nome AS nome_caixa,
						       c.sigla AS sigla_caixa,
						       a.id_classificacao AS id_classe,
						       d.nome AS nome_classe,
						       d.de_entrada AS de_entrada,
						       a.descricao as descricao
						FROM geff_movimentos a
						INNER JOIN geff_usuarios b ON a.id_usuario=b.id
						INNER JOIN geff_caixas c ON a.id_caixa=c.id
						INNER JOIN geff_classificacoes d ON a.id_classificacao=d.id
						WHERE b.id_nucleo=?
						ORDER BY data DESC,id DESC limit ?
						','ii',$id_nucleo,$MAX_MOVIMENTOS);
					} else {
						// Existe pelo menos uma conciliação para o núcleo
						$ultimaConciliacao = $rs[0]['registrada_em'];
						$rs = $db->query('
						SELECT a.id,
						       DATE_FORMAT(a.data,"%Y-%m-%d") as data,
						       DATE_FORMAT(a.registrado_em,"%Y-%m-%dT%H:%i:%s") as registrado_em,
						       a.valor,
						       a.id_caixa,
						       c.nome AS nome_caixa,
						       c.sigla AS sigla_caixa,
						       a.id_classificacao AS id_classe,
						       d.nome AS nome_classe,
						       d.de_entrada AS de_entrada,
						       a.descricao as descricao
						FROM geff_movimentos a
						INNER JOIN geff_usuarios b ON a.id_usuario=b.id
						INNER JOIN geff_caixas c ON a.id_caixa=c.id
						INNER JOIN geff_classificacoes d ON a.id_classificacao=d.id
						WHERE b.id_nucleo=?
						  AND DATA>=?
						ORDER BY data DESC,id DESC limit ?
						','isi',$id_nucleo,$ultimaConciliacao,$MAX_MOVIMENTOS);
					}
					
					
					// preparando resposta
					$response = new response(0,'Ok');
					$response->movimentos = $rs;
					$response->flush();
				}
			});

			$app->delete('/movimentos/:id',function($id) use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				// Verificando se o usuário está logado.
				$rs = $db->query('select id_nucleo from geff_usuarios where token=? and token_expiration>now()','s',$token);
				if(sizeof($rs) == 0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					$id_nucleo = $rs[0]['id_nucleo'];
					// verificando se o movimento a ser removido é do mesmo núcleo do usuário
					$rs = $db->query('select count(*) as n from geff_movimentos a inner join geff_usuarios b on a.id_usuario=b.id where id_nucleo=? and a.id=?','ii',$id_nucleo,$id);
					if($rs[0]['n'] == 1){
						// determinando se o movimento é par de movimento entre caixas (mec)
						$rs = $db->query('select id_mec,de_entrada from geff_movimentos a inner join geff_classificacoes b on a.id_classificacao=b.id where a.id=?','i',$id);
						$id_mec = 1*$rs[0]['id_mec'];
						$de_entrada = ($rs[0]['de_entrada']==1);
						if($id_mec == null){
							// É um movimento isolado. Tentando remover
							try {
								removeMovimento($id);
								$response = new response(0,'ok');
								$response->removidos = Array($id);
								$response->flush();
							} catch (Exception $e) {
								$response = new response(1,str_replace('Failed to execute statement: ', '', $e->getMessage()));
								$response->flush();
							}
							return;
						} else {
							// É um movimento entre contas
							// Se ele for o de saída, tentar remover ele primeiro. Se ele for o de entrada, tentar remover o irmão dele primeiro.
							if($de_entrada){
								try {
									if (removeMovimento($id)) {
										removeMovimento($id_mec);
									}
									$response = new response(0,'Ok');
									$response->removidos = Array($id,$id_mec);
									$response->flush();
								} catch (Exception $e) {
									$response = new response(1,str_replace('Failed to execute statement: ', '', $e->getMessage()));
									$response->flush();
								}
							} else {
								try {
									if (removeMovimento($id_mec)) {
										removeMovimento($id);
									}
									$response = new response(0,'Ok');
									$response->removidos = Array($id,$id_mec);
									$response->flush();
								} catch (Exception $e) {
									$response = new response(1,str_replace('Failed to execute statement: ', '', $e->getMessage()));
									$response->flush();
								}
							}
							return;
						}
					} else {
						// Ou o movimento já foi excluído ou o movimento não é do núcleo do usuário
						$response = new response(1,'Movimento inexistente');
						$response->flush();
						return;
					}
				}
			});
		// FIM DE MOVIMENTOS ROUTE DEFINITION - - - - - - - -
		
		// MOVIMENTOS/ENTRECAIXAS ROUTE DEFINITION
		$app->post('/movimentos/entrecaixas',function() use ($app,$db){
			// Validando o token e recuperando o id do núcleo
			$token = $app->request->headers->get('Authorization');
			$rs = $db->query('select id,id_nucleo from geff_usuarios where token=? and token_expiration>now()','s',$token);
			if(sizeof($rs)==0){
				$app->response->setStatus(401);
				$response = new response(1,'Não autorizado.');
				$response->flush();
				return;
			} else {
				$id_nucleo = $rs[0]['id_nucleo'];
				$id_usuario = $rs[0]['id'];
				$mec = json_decode($app->request->getBody());
				// Verificando se os caixas envolvidos na operação são do núcleo do usuário
				$rs = $db->query('
					SELECT ok_de,
					       ok_para
					FROM
					  (SELECT count(*) AS ok_de
					   FROM geff_caixas
					   WHERE id=?
					     AND id_nucleo=?) a,
					  (SELECT count(*) AS ok_para
					   FROM geff_caixas
					   WHERE id=?
					     AND id_nucleo=?) B','iiii',$mec->id_de,$id_nucleo,$mec->id_para,$id_nucleo);
				if($rs[0]['ok_de']==0 || $rs[0]['ok_para']==0){
					// Um dos caixas não é do núcleo do usuário
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
				} else {
					// Levantando classes de movimento entre caixas de entrada e de saída do núcleo
					$rs = $db->query('
						SELECT id_classe_mec_entrada,
						       b.nome AS nome_classe_mec_entrada,
						       id_classe_mec_saida,
						       c.nome AS nome_classe_mec_saida
						FROM geff_nucleos a
						INNER JOIN geff_classificacoes b ON a.id_classe_mec_entrada=b.id
						INNER JOIN geff_classificacoes c ON a.id_classe_mec_saida=c.id
						WHERE a.id=?
					','i',$id_nucleo);
					$id_classe_mec_entrada = $rs[0]['id_classe_mec_entrada'];
					$id_classe_mec_saida = $rs[0]['id_classe_mec_saida'];
					$nome_classe_mec_entrada = $rs[0]['nome_classe_mec_entrada'];
					$nome_classe_mec_saida = $rs[0]['nome_classe_mec_saida'];
					// Tudo certo. Vamos inserir!
					try {
						// Tentando inserir movimento de saída
						$m = new stdClass();
						$m->valor = $mec->valor;
						$m->descricao = $mec->descricao;
						$m->id_usuario = $id_usuario;
						$m->id_caixa = $mec->id_de;
						$m->data = $mec->data;
						$m->id_classe = $id_classe_mec_saida;
						$m = insereMovimento($m);
						$mec_saida = clone $m;
						$mec_saida->nome_classe = $nome_classe_mec_saida;
						$mec_saida->sigla_caixa =$mec->de;
						$inseriu_saida = true;
					} catch (Exception $e) {
						// Não inseriu. Retornando erro.
						$inseriu_saida = false;
						$response = new response(1,str_replace('Failed to execute statement: ', '', $e->getMessage()));
						$response->flush();
						return;
					}

					if($inseriu_saida){
						// inseriu movimento de saída. Inserindo o movimento de entrada
						$m->id_mec = $mec_saida->id;
						$m->id_classe = $id_classe_mec_entrada;
						$m->id_caixa = $mec->id_para;
						$m = insereMovimento($m);
						$mec_entrada = clone $m;
						$mec_entrada->nome_classe = $nome_classe_mec_entrada;
						$mec_entrada->sigla_caixa =$mec->para;
						$mec_saida->id_mec = $mec_entrada->id;
						$db->query('update geff_movimentos set id_mec=? where id=?','ii',$mec_entrada->id,$mec_saida->id);
						$response = new response(0,'Ok');
						$response->mec_entrada = $mec_entrada;
						$response->mec_saida = $mec_saida;
						$response->flush();
						return;
					}
				}
			}
		});

		// CONCILIACOES ROUTE DEFINITION - - - - - - - - - - - -
			$app->post('/conciliacoes',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$rs = $db->query('select id,id_nucleo from geff_usuarios where token=? and token_expiration>now()','s',$token);
				if(sizeof($rs)==0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					$id_nucleo = $rs[0]['id_nucleo'];
					$id_usuario = $rs[0]['id'];
					$movimentos = json_decode($app->request->getBody());

					// Salvando movimentos
					foreach ($movimentos as $i => $m) {
						$m->data = (new DateTime())->format('d/m/Y');
						if($m->caixa->e_cartao == 0){
							// movimento de caixa que não é cartão.
							try {
								$m->id_usuario = $id_usuario;
								$m->id_caixa = $m->caixa->id;
								$m = insereMovimento($m);
								$m->erro = 0;
							} catch (Exception $e) {
								$m->erro = 1;
								$m->msg = "Impossível inserir movimento: ".$e->getMessage();
							}
						} else {
							// movimento de cartão em $m->nx vezes 
							// verificando se existe saldo para o movimento
							$rs = $db->query('select saldo - limite_inferior as max from geff_caixas where id=?','i',$m->caixa->id);
							if($m->valor > $rs[0]['max']){
								// não existe saldo para o movimento
								$m->erro = 1;
								$m->msg = "Impossível inserir movimento. Saldo insuficiente.";
							} else {
								// existe saldo
								// Como é um movimento conciliatório, estabelecendo nx=1
								$m->nx = 1;
								$m->id_caixa = $m->caixa->id;
								// salvando movimento de cartão
								$parcelas = salva_movimento_de_cartao($m,$id_usuario);
								$movimentos[$i]->id = $parcelas[0]->id;
							}
						}
					}

					// Salvando conciliação
					$registrada_em = new DateTime();
					$registrada_em = $registrada_em->format('Y-m-d H:i:s');
					$db->query("insert into geff_conciliacoes (registrada_em,id_nucleo) VALUES (?,?)",'si',$registrada_em,$id_nucleo);
					$id_conciliacao = $db->insert_id;

					// Associando movimentos salvos a conciliação
					foreach ($movimentos as $m) {
						if(property_exists($m,'id')){
							$db->query('update geff_movimentos set id_conciliacao=? where id=?','ii',$id_conciliacao,$m->id);
						}
					}


					// Salvando saldos de todos os caixas.
					$db->query('insert into geff_conciliacoes_x_saldos (id_conciliacao,id_caixa,saldo) (select ? as id_conciliacao, id as id_caixa, saldo from geff_caixas where id_nucleo=?)','ii',$id_conciliacao,$id_nucleo);
					
					// Preparando resposta
					$response = new response(0,'Ok');
					$response->conciliacao = new stdClass();
					$response->conciliacao->id_conciliacao = $id_conciliacao;
					$response->conciliacao->registrada_em = str_replace(' ', 'T',$registrada_em);
					$response->flush();
				}
			});
			
			$app->get('/conciliacoes',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$rs = $db->query('select id,id_nucleo from geff_usuarios where token=? and token_expiration>now()','s',$token);
				if(sizeof($rs)==0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					$id_nucleo = $rs[0]['id_nucleo'];
					$rs = $db->query('select DATE_FORMAT(registrada_em,"%Y-%m-%dT%H:%i:%s") as ultimaConciliacao from geff_conciliacoes where id_nucleo=? order by registrada_em desc limit 1','i',$id_nucleo);
					$response = new response(0,'Ok');
					if(sizeof($rs) == 0){
						$response->ultimaConciliacao = null;
					} else {
						$response->ultimaConciliacao = $rs[0]['ultimaConciliacao'];
					}
					$response->flush();
				}
			});

			$app->delete('/conciliacoes',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$rs = $db->query('select id,id_nucleo from geff_usuarios where token=? and token_expiration>now()','s',$token);
				if(sizeof($rs)==0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					$id_nucleo = $rs[0]['id_nucleo'];
					// levantndo o id da ultima conciliação
					$rs = $db->query('select id from geff_conciliacoes where id_nucleo=? order by registrada_em desc limit 1','i',$id_nucleo);
					$id_ultimaConciliacao = $rs[0]['id'];
					// removendo última conciliação
					$db->query('delete from geff_conciliacoes where id=?;','i',$id_ultimaConciliacao);
					// Removendo movimentos conciliatórios desta conciliação.
					$db->query('delete from geff_movimentos where id_conciliacao=?;','i',$id_ultimaConciliacao);
					$response = new response(0,'Ok');
					$response->flush();
				}
			});
		// CONCILIACOES ROUTE DEFINITION - - - - - - - - - - - -
	});


	// running the app
	$app->run();
?>