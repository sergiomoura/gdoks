<?php
	include('GDoks/GDoks.php');
	if(GDoks::server() == GDoks::SERVER_LOCAL){
		header("Location: /webapp/login.php");
	} else {
		header("Location: https://www.gdoks.com.br/webapp/login.php");
	}
 ?>