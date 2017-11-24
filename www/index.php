<?php
	die('Oh! Yes!');
	include('GDoks/GDoks.php');
	if(GDoks::server() == GDoks::SERVER_LOCAL){
		header("Location: /webapp/login.php");
	} else {
		header("Location: http://www.gdoks.com.br/webapp/login.php");
	}
 ?>