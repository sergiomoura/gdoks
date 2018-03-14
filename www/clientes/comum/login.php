<?php
	// Bloqueando o acesso direto
	if (sizeof(get_included_files()) == 1) {
		die();
	}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="../comum/geral.css">
	<title><?php echo(NOME_EMPRESA) ?> - Área do Cliente</title>
</head>
<body>
	<form action="" method="post">
		<img src="../comum/logo.php?e=<?php echo(CODIGO_EMPRESA)?>" alt="<?php echo(NOME_EMPRESA) ?>">
		<h3>Área do Cliente</h3>
		<div class="item">
			<label for="login">Login</label>
			<input type="text" name="login" id="login">
		</div>
		<div class="item">
			<label for="login">Senha</label>
			<input type="password" name="senha" id="senha">
		</div>
		<button type="submit">Entrar</button>
		<?php if($err == 1): ?>
			<div class="erro">Login ou senha inválidos</div>
		<?php endif; ?>
	</form>
</body>
<script>
	document.getElementById('login').focus();
</script>
</html>