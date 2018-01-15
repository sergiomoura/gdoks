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
<html lang="pt-br" ng-app="AreaDoCliente">
	<head>
		<meta charset="UTF-8">
		<title><?php echo($cliente->nome_empresa); ?> - Área do Cliente</title>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
		<link rel="stylesheet" href="../comum/bin/styles.css">
	</head>
	<body ng-controller="AreaDoClienteController" ng-cloak>
		<md-toolbar layout="row" layout-align="start center" md-whiteframe="6dp" style="z-index: 100">
<!-- 			<md-button class="md-icon-button" aria-label="Settings" ng-click="toggleMenu()">
				<md-icon class="material-icons step" aria-label="menu">list</md-icon>
			</md-button> -->
			<span flex></span>
			
			<md-menu ng-controller="OpcoesController">
				<md-button ng-click="$mdMenu.open()" aria-label="Abre Menu de Oções" class="md-icon-button">
					<md-icon class="material-icons step" aria-label="menu">more_vert</md-icon>
				</md-button>
				<md-menu-content width="4">
					<md-menu-item>
						<md-button ng-click="onTrocarSenhaClick()">
							<md-icon class="material-icons step" aria-label="Trocar Senha">lock_outline</md-icon>
							Trocar Senha
						</md-button>
					</md-menu-item>
					<md-menu-item>
						<md-button ng-click="logout()">
							<md-icon class="material-icons step" aria-label="Sair">exit_to_app</md-icon>
							Sair
						</md-button>
					</md-menu-item>
				</md-menu-content>
			</md-menu>

		</md-toolbar>
		<div class="viewContainer">
			<ng-view>
			</ng-view>
		</div>
		<img class="marcadagua" src="../comum/logo.php?e=<?php echo($cliente->codigo_empresa); ?>">
	</body>
	<script src="../comum/bin/scripts.js"></script>
</html>