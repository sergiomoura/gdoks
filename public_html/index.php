<?php
	include('GDoks/GDoks.php');
	if(GDoks::server() == GDoks::SERVER_LOCAL){
		header("Location: /webapp/login.php");
	} else {
		header("Location: http://gdoks.provisorio.ws/webapp/login.php");
	}
 ?>