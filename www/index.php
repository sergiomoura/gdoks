<?php
	if(substr($_SERVER['HTTP_HOST'],0,9) == 'localhost'){
		header("Location: /webapp/login.php");
	} else {
		header("Location: https://www.gdoks.com.br/webapp/login.php");
	}
 ?>