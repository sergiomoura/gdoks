<?php
	// Configurando a descrição do erro at runtime
	error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

	// Required files - - - - - - - - - - - - - - - - - - -
	require('../../includes/Slim/vendor/autoload.php');
	require('../../includes/db.php');
	require('../../includes/response.php');
	
	// constants - - - - - - - - - - - - - - - - - - - - - -
	define('TOKEN_DURARION', 3600); //in seconds: 6 horas

	// defining api - - - - - - - - - - - - - - - - - - - -
	$app = new \Slim\Slim();
	$db = new DB();

	// defining api routes  V1 = = = = = = = = = = = = = = = =
	$app->group('/v1',function() use($app,$db){

		// LOGIN ROUTE DEFINITION - - - - - - - - - - - - -
		$app->post('/login',function() use ($app,$db){
			$data = json_decode($app->request->getBody());
			$ok = $db->query('select count(*)=1 as ok from gdoks_usuarios where login=? and senha=PASSWORD(?)','ss',$data->login,$data->senha)[0]['ok'] == 1;
			if($ok){
				$token = uniqid('',true);
				$app->response->setStatus(200);
				$response = new response(0,'ok');
				$response->token = $token;
				$db->query('update gdoks_usuarios set token=?, validade_do_token=? where login=? and senha=PASSWORD(?)','ssss',$token,Date('Y-m-d H:i:s',time()+TOKEN_DURARION),$data->login,$data->senha);
			} else {
				$app->response->setStatus(401);
				$response = new response(1,'Login failed');
			}
			$response->flush();
		});

		// LOGIN REFRESH ROUTE DEFINITION - - - - - - - - -
		$app->get('/refresh',function() use ($app,$db){
			die("ok");
			$token = $app->request->headers->get('Authorization');
			$rs = $db->query('select id from gdoks_usuarios where token=? and validade_de_token>now()','s',$token);
			if(sizeof($rs) == 0){
				$app->response->setStatus(401);
				$response = new response(1,'Refresh failed!');
				$response->flush();
				return;
			} else {
				$new_token = uniqid('',true);
				$id = $rs[0]['id'];
				try {
					$db->query('update gdoks_usuarios set token=?, validade_de_token=? where id=?','ssi',$new_token,Date('Y-m-d H:i:s',time()+TOKEN_DURARION),$id);
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

		// CAIXAS ROUTE DEFINITION - - - - - - - - - - - - -
			$app->get('/caixas',function() use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$sql = '
					SELECT a.id,
					       a.nome,
					       a.sigla,
					       a.e_cartao,
					       vencimento,
					       fechamento,
					       saldo,
					       limite_inferior
					FROM geff_caixas a
						INNER JOIN geff_nucleos b ON a.id_nucleo=b.id
						INNER JOIN geff_usuarios c ON (c.id_nucleo=b.id
					                               AND c.token=?
					                               AND token_expiration>now())';
				$response = new response(0,'ok');
				$response->caixas = $db->query($sql,'s',$token);
				$response->flush();
			});

			$app->get('/caixas/:id',function($id) use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				$sql = 'select a.id,a.nome,a.sigla,a.e_cartao,vencimento,fechamento,saldo,limite_inferior from geff_caixas a inner join geff_nucleos b on a.id_nucleo=b.id inner join geff_usuarios c on (c.id_nucleo=b.id and c.token=? and token_expiration>now()) where a.id=?';
				$caixa = $db->query($sql,'si',$token,$id);
				if(sizeof($caixa) == 0){
					$app->response->setStatus(401);
					$response = new response(1,'Caixa inexistente ou não autorizado');
				} else {
					$app->response->setStatus(200);
					$response = new response(0,'ok');
					$response->caixa = $caixa[0];
				}
				$response->flush();
			});

			$app->post('/caixas',function() use ($app,$db){
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
					if($d->e_cartao==1){
						$sql = "insert into geff_caixas (nome,sigla,e_cartao,vencimento,fechamento,saldo,limite_inferior,id_nucleo) VALUES (?,?,?,?,?,?,?,?)";
						$db->query($sql,'ssiiiddi',$d->nome,$d->sigla,$d->e_cartao,$d->vencimento,$d->fechamento,0,$d->limite_inferior,$id_nucleo);
					} else {
						$sql = "insert into geff_caixas (nome,sigla,e_cartao,saldo,limite_inferior,id_nucleo) VALUES (?,?,?,?,?,?)";
						$db->query($sql,'ssiddi',$d->nome,$d->sigla,$d->e_cartao,0,$d->limite_inferior,$id_nucleo);
					}
					$response = new response(0,'ok');
					$response->id_caixa = $db->insert_id;
					$response->flush();
				}
			});

			$app->put('/caixas/:id',function($id) use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				// Verificando se o caixa a ser alterado é do mesmo núcleo do usuário
				$sql = "select count(*)=1 as ok from geff_caixas a inner join geff_nucleos b on a.id_nucleo=b.id inner join geff_usuarios c on (c.id_nucleo=b.id and c.token=? and token_expiration>now()) where a.id=?";
				$ok = $db->query($sql,'si',$token,$id)[0]['ok'];
				if($ok==0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					$d = json_decode($app->request->getBody());
					if($d->e_cartao==1){
						$sql = "update geff_caixas set nome=?,sigla=?,e_cartao=?,vencimento=?,fechamento=?,limite_inferior=? where id=?";
						$db->query($sql,'ssiiidi',$d->nome,$d->sigla,$d->e_cartao,$d->vencimento,$d->fechamento,$d->limite_inferior,$id);
					} else {
						$sql = "update geff_caixas set nome=?,sigla=?,e_cartao=?,vencimento=null,fechamento=null,limite_inferior=? where id=?";
						$db->query($sql,'ssidi',$d->nome,$d->sigla,$d->e_cartao,$d->limite_inferior,$id);
					}
					$response = new response(0,'ok');
					$response->flush();
				}
			});

			$app->delete('/caixas/:id',function($id) use ($app,$db){
				$token = $app->request->headers->get('Authorization');
				// Verificando se o caixa a ser alterado é do mesmo núcleo do usuário
				$sql = "select count(*)=1 as ok from geff_caixas a inner join geff_nucleos b on a.id_nucleo=b.id inner join geff_usuarios c on (c.id_nucleo=b.id and c.token=? and token_expiration>now()) where a.id=?";
				$ok = $db->query($sql,'si',$token,$id)[0]['ok'];
				if($ok==0){
					$app->response->setStatus(401);
					$response = new response(1,'Não autorizado.');
					$response->flush();
					return;
				} else {
					$sql = "delete from geff_caixas where id=?";
					try {
						$db->query($sql,'i',$id);	
						$response = new response(0,'ok');
						$response->flush();	
					} catch (Exception $e) {
						$app->response->setStatus(401);
						$response = new response(1,'Impossível remover caixa. Verifique se ele não possui movimentações associadas a ele ou se o seu saldo é ZERO.');
						$response->flush();	
					}
				}
			});
		// FIM DE CAIXAS ROUTE DEFINITION - -- - - - - - - -

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