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
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="stylesheet" href="css/geral.css">
	<link rel="stylesheet" href="css/normalizer.css">
	<link rel="stylesheet" href="css/WebGDoks.css">
</head>
<body ng-controller="RootController">
	<div id="topo" ng-controller="TopoController">
		<a ng-click="root.toggleSideMenu()" id="abreMenu"></a>
		<img src="img/logo_peq_clara.png" alt="GDoks" id="logo">
		<a ng-click="toggleOpcoesMenu()" id="lk_opcoes"></a>
	</div>
	<div id="container_horizontal">
		<nav id="menu" ng-controller="NavController">
			<ul>
				<li>
					<a class="prj">Projetos</a>
					<ul>
						<li><a href="#/visaogeral">Visão Geral</a></li>
						<li><a href="#/addprojeto">Cadastrar Novo Projeto</a></li>
						<li>
							<a>Ir Para Projeto</a>
							<ul>
								<li><a href="#/projetos/1">Projeto 1</a></li>
								<li><a href="#/projetos/2">Projeto 2</a></li>
								<li><a href="#/projetos/3">Projeto 3</a></li>
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
					<a ng-click="itemClicked(4)" class="cal" ng-class="{ 'selected': 4 == root.itemSelecionadoDoMenu }" href="#/afazer">A Fazer</a>
				</li>
				<li>
					<a ng-click="itemClicked(5)" class="cli" ng-class="{ 'selected': 5 == root.itemSelecionadoDoMenu }" href="#/clientes">Clientes</a>
				</li>
				<li>
					<a ng-click="itemClicked(6)" class="cfg" ng-class="{ 'selected': 6 == root.itemSelecionadoDoMenu }" href="#/configuracoes">Configurações</a>
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
	<script src="js/angular/angular.min.js"></script>
	<script src="js/angular/angular-route.min.js"></script>
	<script src="js/angular/angular-cookies.min.js"></script>
	<script src="js/angular/angular-resource.min.js"></script>
	<script src="js/angular/ng-currency.min.js"></script>
	<script src="js/angular/angular-ui-mask.min.js"></script>
	
	<!-- Scripts do app -->
	<script src="app/services/constants.js"></script>
	<script src="app/WebGDoks.js"></script>
	<script src="app/services/Factory.js"></script>
	<script src="app/controllers/controllers.js"></script>
	<script src="app/directives/directives.js"></script>


</body>
</html>