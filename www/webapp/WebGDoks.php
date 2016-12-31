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
<body>
	<div id="topo" ng-controller="TopoController">
		<a ng-click="toggleSideMenu()" id="abreMenu"></a>
		<img src="img/logo_peq_clara.png" alt="GDoks" id="logo">

	</div>

	<nav id="menu" ng-controller="NavController">
		<a ng-click="itemClicked(0)" class="home" ng-class="{ 'selected': 0 == selectedIndex }" href="#/home">Home</a>
		<a ng-click="itemClicked(1)" class="prj" ng-class="{ 'selected': 1 == selectedIndex }" href="#/projetos">Projetos</a>
		<a ng-click="itemClicked(2)" class="usu" ng-class="{ 'selected': 2 == selectedIndex }" href="#/usuarios">Usuários</a>
		<a ng-click="itemClicked(3)" class="doc" ng-class="{ 'selected': 3 == selectedIndex }" href="#/documentos">Documentos</a>
		<a ng-click="itemClicked(4)" class="dsc" ng-class="{ 'selected': 4 == selectedIndex }" href="#/disciplinas">Disciplinas</a>
		<a ng-click="itemClicked(5)" class="cal" ng-class="{ 'selected': 5 == selectedIndex }" href="#/afazer">A Fazer</a>
		<a ng-click="itemClicked(6)" class="cfg" ng-class="{ 'selected': 6 == selectedIndex }" href="#/configuracoes">Configurações</a>
	</nav>
	<div id="view" ng-view></div>

	<div id="ua">
		<?php
			echo('Última Atualização: '.date('d/m/Y H:i:s - e',filemtime(realpath('../'))));
		?>
	</div>
	<!-- Scripts externos -->
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