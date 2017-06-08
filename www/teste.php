
<?php 
	$filename = '../uploads/pda_7.zip';
	header("Content-Type: application/zip");
	header('Content-Disposition: attachment; filename=pda_7.zip');
	header("Content-Length: " . filesize(realpath($filename))); 
	header("Content-Transfer-Encoding: binary");
	readfile($filename);
 ?>