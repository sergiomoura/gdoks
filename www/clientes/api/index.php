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
	require('response.php');
	require('GDoks/Grd.php');
	require('GDoks/Crypter.php');

	// Definindo o timezone padrão
	date_default_timezone_set('America/Sao_Paulo');
	
	#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	# DEFIÇÕES DE FUNÇÕES AUXILIARES ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		// Definindo função getallheaders caso ela não exista (caso NGINX)
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

		// Função que dá um delay depois morre com codigo http 401
		function vaDeReto($msg = '', $codigo=1){
			sleep(3);
			http_response_code(403);
			$response = new response($codigo,$msg);
			$response->flush();
			exit(1);
		}
	#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	# FIM DE FUNÇÕES AUXILIARES :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	// Lendo informações no header
	$headers = getallheaders();
	if ( array_key_exists('Authorization', $headers) && $headers['Authorization'] != '' && !is_null($headers['Authorization']) ){
		// definindo informações e token a partir do header
		$empresa =  explode('-', $headers['Authorization'])[0];
		$token = explode('-', $headers['Authorization'])[1];
	} elseif (array_key_exists('token',$_COOKIE) && array_key_exists('cliente',$_COOKIE)){
		// definindo informações e token a partir do cookie
		$empresa =  (json_decode($_COOKIE['cliente']))->codigo_empresa;
		$token = $_COOKIE['token'];
	} else {
		vaDeReto('Sem autorização',101);
	}

	// Carregando específicos da empresa
	$FILE_DBKEY = CLIENT_DATA_PATH.$empresa.'/dbkey.php';
	$FILE_GRD = CLIENT_DATA_PATH.$empresa.'/grd.php';
	$FILE_LOGO = CLIENT_DATA_PATH.$empresa.'/logo.jpg';

	// Conectando a base de dados com o objeto $db
	require($FILE_DBKEY);
	$db = new DB($dbkey);

	// Verificando a autenticidade da autorização
	$sql = 'SELECT id FROM gdoks_clientes WHERE token=? AND validade_do_token>NOW()';
	$rs = $db->query($sql,'s',$token);
	if(sizeof($rs) == 0){
		vaDeReto('Token expirado ou inválido',100);
	}

	// Guardando o id do cliente
	$id_cliente = $rs[0]['id'];

	// Definindo a API
	$app = new Slim\Slim();

	// Funções da API
	$app->group('/v1',function() use($app,$db,$id_cliente,$token,$empresa){

			# REFRESH ROUTE DEFINITION :::::::::::::::::::::::::::::::::
				$app->get('/refresh',function() use ($app,$db,$id_cliente){

					// Definindo novo token
					$newToken = uniqid('',true);

					// Determinando a validade do token
					$validade = Date('Y-m-d H:i:s',time()+TOKEN_DURARION);

					try {

						// Tentando executar consulta
						$sql = 'UPDATE gdoks_clientes SET token=?,validade_do_token=? WHERE id=?';
						$db->query($sql,'ssi',$newToken,$validade,$id_cliente);

					} catch (Exception $e) {

						// Retornando mensagem de erro
						http_response_code(401);
						$response = new response(1,'Não foi possível atualizar o token: '.$e->getMessage());
						$response->flush();
						exit(1);

					}
					$response = new response(0,'ok');
					$response->newToken = $newToken;
					$response->flush();

				});
			# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

			# ROTAS PARA ALTERAÇÃO DE SENHA:::::::::::::::::::::::::::::
				$app->post('/mudarSenha',function() use ($app,$db,$id_cliente){
					$novaSenha = json_decode($app->request->getBody())->novaSenha;
					try {
						$sql = 'UPDATE gdoks_clientes SET senha=AES_ENCRYPT(?, UNHEX(SHA2(?,512))) WHERE id=?';
						$db->query($sql,'ssi',AES_KEY,$novaSenha,$id_cliente);
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						exit(1);
					}
					$response = new response(0,'ok');
					$response->flush();
				});
			# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

			# ROTAS DE GRD::::::::::::::::::::::::::::::::::::::::::::::
				# : : : : : : : : : : : : : : : : : : : : : : : : : : :
				$app->get('/grds/ultimas',function() use ($app,$db,$id_cliente){

					try {

						// Tentando executar consulta
						$sql = 'SELECT a.id,
								       a.codigo,
								       a.datahora_registro,
								       a.datahora_enviada,
								       b.nome AS nome_projeto,
								       count(*) AS nDocs
								FROM gdoks_grds a
								INNER JOIN gdoks_projetos b ON a.id_projeto=b.id
								INNER JOIN gdoks_grds_x_revisoes c ON c.id_grd=a.id
								WHERE b.id_cliente=?
								  AND datahora_enviada IS NOT NULL
								GROUP BY a.id,
								         a.codigo,
								         a.datahora_registro,
								         a.datahora_enviada,
								         b.nome
								ORDER BY datahora_enviada';
						$rs = $db->query($sql,'i',$id_cliente);

					} catch (Exception $e) {

						// Retornando mensagem de erro
						http_response_code(401);
						$response = new response(1,'Não foi possível carregar GRDs mais recentes: '.$e->getMessage());
						$response->flush();
						exit(1);

					}

					// Convertendo resultado da consulta em objeto
					$response = new response(0,'ok');
					$response->grds = array_map(function($a){return (object)$a;}, $rs);
					$response->flush();
				});
				# : : : : : : : : : : : : : : : : : : : : : : : : : : :
				$app->get('/grds/:id_grd/download',function($id_grd) use ($app,$db,$id_cliente,$empresa){
					// Verirficando se a grd é do cliente em questão
					$sql = 'SELECT a.codigo
							FROM gdoks_grds a
							INNER JOIN gdoks_projetos b ON a.id_projeto=b.id
							AND b.id_cliente=?
							AND a.id=?';
					$rs = $db->query($sql,'ii',$id_cliente,$id_grd);
					
					if(sizeof($rs) == 0){
						// Retornando erro para usuário
						http_response_code(403);
						$response = new response(1,'Acesso negado');
						$response->flush();
						exit(1);
					}

					$grd = Grd::CreateById($id_grd, $empresa);
					
					try {
						$grd->sendZip($grd->nome_remetente,true);
					} catch (Exception $e) {
						http_response_code(401);
						$response = new response(1,$e->getMessage());
						$response->flush();
						return;
					}
				});
			# FIM DE ROTAS GRD::::::::::::::::::::::::::::::::::::::::::
	});
	
	// Running the app
	$app->run();
 ?>