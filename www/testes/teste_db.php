<?php

	$dsn = getenv('MYSQL_DSN');
	$user = getenv('MYSQL_USER');
	$password = getenv('MYSQL_PASSWORD');

	$db = new PDO($dsn,$user,$password);

	$statement = $db->prepare("select * from gdoks_usuarios");
	$statement->execute();
	$all = $statement->fetchAll();

	echo('<pre>');
	print_r($all);
	echo('</pre>');
	die();
	
	/*
	echo ('includindo ../../includes/db.php');
	include('../../includes/db.php');

	echo ('criando objeto chave ...');

	
	$dbkey = new stdClass();
	$dbkey->DB_HOST = "localhost";
	$dbkey->DB_USER = "root";
	$dbkey->DB_PASS = "vaiplaneta";
	$dbkey->DB_BASE = "gdoks_001";
	$dbkey->DB_PORT = 3306;
	$dbkey->ID_EMPRESA = 1;
	
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
	*/
?>