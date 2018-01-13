<?php
	// bloqueando acesso direto
	if(sizeof(get_included_files()) == 1) die();

	// Verificando a existência do cookie
	if(!array_key_exists('token', $_COOKIE)) die();

	// Guardando cookies nas variáveis token
	$token = $_COOKIE['token'];
	$cliente = json_decode($_COOKIE['cliente']);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<title><?php echo($cliente->nome_empresa); ?> - Área do Cliente</title>
	<link rel="stylesheet" href="../comum/areaDoCliente.css">
</head>
<body>
	
</body>
</html>