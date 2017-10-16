<?php 
	include('../../includes/GDoks/Crypter.php');
	
	// String
	$x = 'tésçkjahsdkjhasdkhapsdkhasde';
	echo($x."<br>");
	$crypted = Crypter::oneWayCrypt($x);
	if(password_verify($x,$crypted)){
		echo("Bateu!<br>");
	} else {
		echo(2);
	}

	echo(Crypter::oneWayCrypt($x).'<br>');
	echo(Crypter::oneWayCrypt($x).'<br>');
	echo(Crypter::oneWayCrypt($x).'<br>');
	echo(Crypter::oneWayCrypt($x).'<br>');
	echo(Crypter::oneWayCrypt($x).'<br>');
?>