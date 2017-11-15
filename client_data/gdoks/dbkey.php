<?php
	
	$dbkey = new stdClass();

	if(substr($_SERVER['HTTP_HOST'],0,9) == 'localhost'){
		$dbkey->DB_HOST = null;
		$dbkey->DB_USER = "root";
		$dbkey->DB_PASS = "vaiplaneta";
		$dbkey->DB_BASE = "gdoks_000";
		$dbkey->DB_PORT = null;
		$dbkey->DB_SOCKET = '/localsql_socket/mysqld.sock';
		$dbkey->ID_EMPRESA = 1;
	} else {
		$dbkey->DB_HOST = 'gdoks000.mysql.dbaas.com.br';
		$dbkey->DB_USER = 'gdoks000';
		$dbkey->DB_PASS = 'k128#_gdoks';
		$dbkey->DB_BASE = 'gdoks000';
		$dbkey->DB_PORT = null;
		$dbkey->DB_SOCKET = null;
		$dbkey->ID_EMPRESA = 1;
	}
	
?>
