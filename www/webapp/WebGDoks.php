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
		<a ng-click="toggleSideMenu()" id="abreMenu"></a>
		<img src="img/logo_peq_clara.png" alt="GDoks" id="logo">
		<a ng-click="toggleOpcoesMenu()" id="lk_opcoes"></a>
	</div>
	<div id="container_horizontal">
		<nav id="menu" ng-controller="NavController">
			<a ng-click="itemClicked(0)" class="prj" ng-class="{ 'selected': 0 == root.itemSelecionadoDoMenu }" href="#/projetos#prj_documentos">Projetos</a>
			<a ng-click="itemClicked(1)" class="usu" ng-class="{ 'selected': 1 == root.itemSelecionadoDoMenu }" href="#/usuarios">Usuários</a>
			<a ng-click="itemClicked(2)" class="doc" ng-class="{ 'selected': 2 == root.itemSelecionadoDoMenu }" href="#/documentos">Documentos</a>
			<a ng-click="itemClicked(3)" class="dsc" ng-class="{ 'selected': 3 == root.itemSelecionadoDoMenu }" href="#/disciplinas">Disciplinas</a>
			<a ng-click="itemClicked(4)" class="cal" ng-class="{ 'selected': 4 == root.itemSelecionadoDoMenu }" href="#/afazer">A Fazer</a>
			<a ng-click="itemClicked(5)" class="cfg" ng-class="{ 'selected': 5 == root.itemSelecionadoDoMenu }" href="#/configuracoes">Configurações</a>
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
	
	<!-- Scripts do app -->
	<script src="app/services/constants.js"></script>
	<script src="app/WebGDoks.js"></script>
	<script src="app/services/Factory.js"></script>
	<script src="app/controllers/controllers.js"></script>
	<script src="app/directives/directives.js"></script>


</body>
</html>