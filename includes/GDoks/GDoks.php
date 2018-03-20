<?php 
	class GDoks {
		const SERVER_LOCAL = 'local';
		const SERVER_GCLOUD = 'gcloud';

		public static function server(){
			if(substr($_SERVER['HTTP_HOST'],0,9) == 'localhost'){
				return self::SERVER_LOCAL;
			} else {
				return self::SERVER_GCLOUD;
			}
		}

		public static function getConf($empresa){
			// incluindo as constantes
			include_once('constantes.php');

			// Checa se o arquivo de configurações existe
			if(!file_exists(CLIENT_DATA_PATH.$empresa.'/config.json')){
				throw new Exception("Arquivo de configurações inexistente", 1);
				exit(1);
			}

			// carregando dados a serem retornados
			$config = json_decode(file_get_contents(CLIENT_DATA_PATH.$empresa.'/config.json'));

			// Verificando se os dados carregados foram puderam ser interpretados
			if(json_last_error() != JSON_ERROR_NONE){
				throw new Exception("Falha ao interpretar arquivo de configurações.", 1);
				exit(1);
			}

			// Retornando configurações
			return $config;
		}

		public static function connectDB($empresa){
			// incluindo arquivos necessários
			include(CLIENT_DATA_PATH.$empresa.'/dbkey.php');
			include_once('db.php');
			
			// Conectando a base de dados
			$db = new DB($dbkey);

			// retornando conexão
			return $db;
		}

		public static function onDocumentUpdate($idDoc,$empresa){
			// Levantando configurações
			$conf = self::getConf($empresa);

			// Testando se é para enviar email para validadores
			if($conf->NOTIFICA_VALIDADOR_POR_EMAIL->valor){

				// Conectando a base de dados
				$db = self::connectDB($empresa);

				// Levantando nome e email dos validadores da disciplina
				$sql = 'SELECT d.id,
						       d.nome,
						       d.email
						FROM gdoks_documentos a
						INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
						INNER JOIN gdoks_validadores c ON b.id_disciplina=c.id_disciplina
						INNER JOIN gdoks_usuarios d ON c.id_usuario=d.id
						WHERE a.id=?
						  AND d.ativo';
				$validadores = array_map(function($a){return (object)$a;}, $db->query($sql,'i',$idDoc));

				// Levantando dados do documento
				$sql = 'SELECT a.id,
							   a.codigo,
						       a.nome,
						       c.nome AS nome_disciplina
						FROM gdoks_documentos a
						INNER JOIN gdoks_subdisciplinas b ON a.id_subdisciplina=b.id
						INNER JOIN gdoks_disciplinas c ON b.id_disciplina=c.id
						WHERE a.id=?';
				$doc = (object)$db->query($sql,'i',$idDoc)[0];

				// Carregando o enviador de email
				include_once('vendor/autoload.php');
				include_once('constantes.php');

				// Definindo o From
				$sgFrom = new SendGrid\Email(SENDGRID_DEFAULT_FROM_NAME,SENDGRID_DEFAULT_FROM);

				// Definindo Tos
				$sgTos = array_map(
							function($d){
								return new SendGrid\Email($d->nome,$d->email);
							},
							$validadores
						);

				// Definindo conteúdo do email
				$texto  = 'O documento '.$doc->codigo.' foi atualizado e requer validção de um ';
				$texto .= 'validador da disciplina '.$doc->nome_disciplina.'. <br>';
				$texto .= 'Clique <a href="'.$_SERVER['SERVER_NAME'].'/webapp/login.php?screen=/validacao">aqui</a> para ';
				$texto .= 'ir a página de validação de documentos';
				$content = new SendGrid\Content("text/html", $texto);

				// Defininfo o assunto
				$assunto = 'Atualização do documento '.$doc->codigo;
				
				// Definindo o email
				$sgEmail = new SendGrid\Mail($sgFrom, $assunto, $sgTos[0], $content);

				// Adicionando os outros destinatários
				for ($i=1; $i < sizeof($sgTos); $i++) { 
				 	$sgEmail->personalization[0]->addCC($sgTos[$i]);
				}

				// Enviando o email
				$sendgrid = new \SendGrid(SENDGRID_KEY);
				$response = $sendgrid->client->mail()->send()->post($sgEmail);

				if($response->statusCode() == 202){
					echo("enviou");
				} else {
					
				}
			}
		}
	}