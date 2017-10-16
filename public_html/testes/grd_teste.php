<?php 
	set_include_path('../../includes/');
	include('GDoks/Grd.php');
	include('db.php');
	include('constantes.php');
	
	$grd = Grd::CreateById(60,'gdoks');
	$grd->sendZip("Sérgio Moura");
	
 ?>