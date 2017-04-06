<?php
	// Incluindo bloqueador de acesso externo a página.
	require('../../includes/blocker.php');
?>
<!DOCTYPE html>
	<html lang="pt-br" ng-app="WebGDoks">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>GDoks</title>
		<!-- <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet"> -->
		<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="stylesheet" href="css/normalizer.css">
		<link rel="stylesheet" href="css/geral.css">
		<link rel="stylesheet" href="css/WebGDoks.css">
		<link rel="stylesheet" href="js/jquery-ui-1.12.1/jquery-ui.css">
	</head>
	<body ng-controller="RootController">
		<div id="topo" ng-controller="TopoController">
			<img src="img/logo_peq_clara.png" alt="GDoks" id="logo">
			<a ng-click="toggleOpcoesMenu()" id="lk_opcoes"></a>
		</div>
		
		<div id="container_horizontal">
			<nav id="menu" ng-controller="NavController">
				<ul>
					<li>
						<a ng-class="{ 'selected': 0 == root.itemSelecionadoDoMenu }" href="#/projetos" class="prj">Projetos<span class="seta_direita"></span></a>
						<ul>
							<li><a ng-click="itemClicked(0)" href="#/visaogeral">Visão Geral</a></li>
							<li><a ng-click="itemClicked(0)" href="#/projetos">Ver Todos Projetos</a></li>
							<li><a ng-click="itemClicked(0)" href="#/projetos/0">Cadastrar Novo Projeto</a></li>
							<li>
								<a ng-click="itemClicked(0)">Ir Para Projeto<span class="seta_direita"></span></a>
								<ul>
									<li><a ng-click="itemClicked(0)" href="#/projetos/1">Projeto 1</a></li>
									<li><a ng-click="itemClicked(0)" href="#/projetos/2">Projeto 2</a></li>
									<li><a ng-click="itemClicked(0)" href="#/projetos/3">Projeto 3</a></li>
								</ul>
							</li>
						</ul>
					</li>
					<li>
						<a ng-click="itemClicked(1)" class="usu" ng-class="{ 'selected': 1 == root.itemSelecionadoDoMenu }" href="#/usuarios">Usuários</a>
					</li>
					<li>
						<a ng-click="itemClicked(2)" class="doc" ng-class="{ 'selected': 2 == root.itemSelecionadoDoMenu }" href="#/documentos">Documentos</a>
					</li>
					<li>
						<a ng-click="itemClicked(3)" class="dsc" ng-class="{ 'selected': 3 == root.itemSelecionadoDoMenu }" href="#/disciplinas">Disciplinas</a>
					</li>
					<li>
						<a ng-click="itemClicked(5)" class="cli" ng-class="{ 'selected': 4 == root.itemSelecionadoDoMenu }" href="#/clientes">Clientes</a>
					</li>
					<li>
						<a ng-click="itemClicked(6)" class="cfg" ng-class="{ 'selected': 5 == root.itemSelecionadoDoMenu }" href="#/configuracoes">Configurações</a>
					</li>
				</ul>
			</nav>
			<div id="view_container">
				<div id="view" ng-view></div>
			</div>
		</div>
		<div id="opcoes" ng-controller="OpcoesController">
			<a class="trocar_senha" ng-click="onTrocarSenhaClick()" href="#/senha">Trocar Senha</a>
			<a class="sair" ng-click="logout()">Sair</a>
		</div>
		<div id="ua">
			<?php
				echo('Última Atualização: '.date('d/m/Y H:i:s - e',filemtime(realpath('../'))));
			?>
		</div>
		<!-- Scripts externos -->
		<script src="js/jquery-3.1.1.min.js" type="text/javascript"></script>
		<script src="js/jquery-ui-1.12.1/jquery-ui.min.js"></script>
		<script src="js/angular/angular.min.js"></script>
		<script src="js/angular/angular-route.min.js"></script>
		<script src="js/angular/angular-cookies.min.js"></script>
		<script src="js/angular/angular-resource.min.js"></script>
		<script src="js/angular/ng-currency.min.js"></script>
		<script src="js/angular/angular-ui-mask.min.js"></script>
		<script src="js/angular/ng-file-upload.min.js"></script>
		<!-- Fim de Scripts externos -->
		<!-- Scripts do app -->

		<!-- Controllers -->
		<script src="app/controllers/ClientesController.js"></script>
		<script src="app/controllers/ConfiguracoesController.js"></script>
		<script src="app/controllers/DocumentosController.js"></script>
		<script src="app/controllers/DisciplinasController.js"></script>
		<script src="app/controllers/NavController.js"></script>
		<script src="app/controllers/OpcoesController.js"></script>
		<script src="app/controllers/ProjetosController.js"></script>
		<script src="app/controllers/SenhaController.js"></script>
		<script src="app/controllers/TopoController.js"></script>
		<script src="app/controllers/UsuariosController.js"></script>
		<script src="app/controllers/VisaoGeralController.js"></script>
		<!--/Controllers -->
		<script src="app/services/constants.js"></script>
		<script src="app/WebGDoks.js"></script>
		<script src="app/services/Factory.js"></script>
		<script src="app/directives/directives.js"></script>
		<!-- Fim de Scripts do app -->
	</body>
</html>