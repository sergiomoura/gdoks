<?php
	echo ('includindo ../../includes/db.php');
	include('../../includes/db.php');

	echo ('criando objeto chave ...');

	/*
	$dbkey = new stdClass();
	$dbkey->DB_HOST = "localhost";
	$dbkey->DB_USER = "root";
	$dbkey->DB_PASS = "vaiplaneta";
	$dbkey->DB_BASE = "gdoks_001";
	$dbkey->DB_PORT = 3306;
	$dbkey->ID_EMPRESA = 1;
	*/
	
	$dbkey = new stdClass();
	$dbkey->DB_HOST = "35.199.101.27";
	$dbkey->DB_USER = "root";
	$dbkey->DB_PASS = "k128#_gdoks";
	$dbkey->DB_BASE = "gdoks_001";
	$dbkey->DB_PORT = 3306;
	$dbkey->ID_EMPRESA = 1;

	$db = new DB($dbkey);
	$sql = 'SELECT * FROM gdoks_usuarios where id>?';
	$rs = $db->query($sql,'i',1);
	echo('<pre>');
	print_r($rs);
	echo('</pre>');
	die();
?>