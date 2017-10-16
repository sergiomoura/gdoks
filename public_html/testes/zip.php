<?php 
	$zip = new ZipArchive();
	if($zip->open("archive.zip",ZipArchive::CREATE)){
		$zip->addEmptyDir("teste");
		$zip->addFile("classe.php","teste/classe.php");
		$zip->close();
	}
	
?>