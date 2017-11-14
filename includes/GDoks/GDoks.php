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
	}
 ?>