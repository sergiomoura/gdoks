<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Shell Exec - Teste</title>
</head>
<body>
	<pre>
<?php 
	$output = shell_exec("ls");
	echo('Saída do shell_exec():'."\n" . $output."\n");
	print_r($_SERVER);
	echo('modificado');
 ?>
	 </pre>
</body>
</html>