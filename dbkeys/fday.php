<?php
	
	$dbkey = new stdClass();

	if($_SERVER['SERVER_NAME'] == 'localhost'){
		$dbkey->DB_HOST = "localhost";
		$dbkey->DB_USER = "root";
		$dbkey->DB_PASS = "vaiplaneta";
		$dbkey->DB_BASE = "gdoks";
		$dbkey->DB_PORT = 3306;
		$dbkey->ID_EMPRESA = 1;
	} else {
		$dbkey->DB_HOST = getenv('OPENSHIFT_MYSQL_DB_HOST');
		$dbkey->DB_USER = getenv('OPENSHIFT_MYSQL_DB_USERNAME');
		$dbkey->DB_PASS = getenv('OPENSHIFT_MYSQL_DB_PASSWORD');
		$dbkey->DB_BASE = getenv('OPENSHIFT_APP_NAME');
		$dbkey->DB_PORT = getenv('OPENSHIFT_MYSQL_DB_PORT');
		$dbkey->ID_EMPRESA = 1;
	}
	
?>