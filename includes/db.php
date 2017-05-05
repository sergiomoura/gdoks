<?php 
	if($_SERVER['SERVER_NAME'] == 'localhost'){
		define("DB_HOST","localhost");
		define("DB_USER","root");
		define("DB_PASS","vaiplaneta");
		define("DB_BASE","gdoks");
		define("DB_PORT",3306);
	} else {
		define('DB_HOST', getenv('OPENSHIFT_MYSQL_DB_HOST'));
		define('DB_USER', getenv('OPENSHIFT_MYSQL_DB_USERNAME'));
		define('DB_PASS', getenv('OPENSHIFT_MYSQL_DB_PASSWORD'));
		define('DB_BASE', getenv('OPENSHIFT_APP_NAME'));
		define('DB_PORT', getenv('OPENSHIFT_MYSQL_DB_PORT'));
	}
	
	class DB extends mysqli{
		public function __construct(){
			$this->connect(DB_HOST,DB_USER,DB_PASS,DB_BASE,DB_PORT);
			$this->set_charset("utf8");
		}

		public function query($sql){
			// verificando número de parametros
			$n_args = func_num_args();
			if($n_args == 2 || $n_args == 0){
				throw new Exception("Number of arguments must be 1 or more then 2", 1);
				return;
			}

			$stmt = $this->prepare($sql);
			if($stmt === false){
				throw new Exception("Failed to create statement: ".$this->error, 2);
				return;
			}

			$n_params = $n_args - 2;
			if($n_params > 0){
				$types = func_get_arg(2);
				call_user_func_array(array($stmt, 'bind_param'), $this->refValues(array_slice(func_get_args(),1)));
			} else {
				$stmt = $this->prepare($sql);
			}

			/* execute query */
			if(!$stmt->execute()){throw new Exception("Failed to execute statement: ". $stmt->error, 3);}
			
			$metadata = $stmt->result_metadata();
			
			if($metadata === false) {
				// consulta não retornou nenhum resultado.
				$results = true;
			} else {
				// consulta retorna resultados;
				$fields = $metadata->fetch_fields();
				$args = array();
				foreach($fields AS $field) {
					$key = str_replace(' ', '_', $field->name); // space may be valid SQL, but not PHP
					$args[$key] = &$field->name; // this way the array key is also preserved
				}
				call_user_func_array(array($stmt, "bind_result"), $args);
				$results = array();
				while($stmt->fetch()) {
					$results[] = array_map(array($this,"copy_value"), $args);
				}	
			}
			

			/* closing everithing */
			$stmt->close();

			/* returning results */
			return $results;
		}

		private function refValues($arr){
			if (strnatcmp(phpversion(),'5.3') >= 0) {
				$refs = array();
				foreach($arr as $key => $value)
					$refs[$key] = &$arr[$key];
				return $refs;
			}
			return $arr;
		}

		private function copy_value($v) {
			return $v;
		}
	}

	$db = new DB();
?>

