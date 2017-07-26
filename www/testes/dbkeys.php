<?php 
	echo(getenv('OPENSHIFT_MYSQL_DB_HOST'));
	echo(getenv('OPENSHIFT_MYSQL_DB_USERNAME'));
	echo(getenv('OPENSHIFT_MYSQL_DB_PASSWORD'));
	echo(getenv('OPENSHIFT_APP_NAME'));
	echo(getenv('OPENSHIFT_MYSQL_DB_PORT'));
	echo('fim');
?>