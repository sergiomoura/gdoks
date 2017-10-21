<?php
	
	$dbkey = new stdClass();

	if($_SERVER['SERVER_NAME'] == 'localhost'){
		$dbkey->DB_HOST = "localhost";
		$dbkey->DB_USER = "root";
		$dbkey->DB_PASS = "vaiplaneta";
		$dbkey->DB_BASE = "gdoks_000";
		$dbkey->DB_PORT = 3306;
		$dbkey->ID_EMPRESA = 1;
	} else {
		$dbkey->DB_HOST = "35.199.101.27";
		$dbkey->DB_USER = "root";
		$dbkey->DB_PASS = "k128#_gdoks";
		$dbkey->DB_BASE = "gdoks_000";
		$dbkey->DB_PORT = 3306;
		$dbkey->ID_EMPRESA = 1;
	}
	
?>
