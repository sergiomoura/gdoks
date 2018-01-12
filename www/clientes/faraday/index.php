<?php define('CODE','fday'); ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="../comum/geral.css">
</head>
<body>
	<form action="" method="post">
		<img src="../logo.php?e=<?php echo(CODE)?>" alt="Faraday">
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
	</form>
</body>
<script>
	document.getElementById('login').focus();
</script>
</html>