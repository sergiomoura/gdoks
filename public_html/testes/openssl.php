<?php 
	$method = 'AES128';
	$pass = 'laksdasda';
	$string = @openssl_encrypt('teste', $method, $pass);
	echo($string);
	echo('<br>');
	echo(openssl_decrypt($string, $method, $pass));
 ?>