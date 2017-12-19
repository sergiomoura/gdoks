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

			// carregando dados a serem retornados
			return json_decode(file_get_contents(CLIENT_DATA_PATH.$empresa.'/config.json'));
		}
	}
 ?>