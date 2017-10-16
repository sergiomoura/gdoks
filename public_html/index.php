<?php 
	if($_SERVER['SERVER_NAME'] == 'localhost'){
		header("Location: /webapp/login.php");
	} else {
		// header("Location: https://www.gdoks.com.br/webapp/login.php");
		header("Location: https://gdoks.websiteseguro.com/webapp/login.php");
	}
 ?>