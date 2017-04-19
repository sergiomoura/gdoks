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
		<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="stylesheet" href="css/normalizer.css">
		<link rel="stylesheet" href="css/geral.css">
		<link rel="stylesheet" href="css/WebGDoks.css">
		<link rel="stylesheet" type="text/css" href="css/ng-tags-input.css">
		<link rel="stylesheet" href="js/jquery-ui-1.12.1/jquery-ui.css">
		<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
	</head>
	<body ng-controller="RootController">
		<div id="topo" ng-controller="TopoController">
			<img src="img/logo_peq_clara.png" alt="GDoks" id="logo">
			<a ng-click="toggleOpcoesMenu()" id="lk_opcoes"></a>
		</div>
		
		<div id="container_horizontal">
			<nav id="menu" ng-controller="NavController" ng-class="{nav_expanded:menuExpanded}" ng-mouseenter="expandMenu()" ng-mouseleave="contractMenu()">
				<ul>
					<li>
						<a ng-class="{ 'selected': 0 == root.itemSelecionadoDoMenu }" href="#/projetos" class="prj">Projetos<span ng-if="menuExpanded" class="seta_direita"></span></a>
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
						<a ng-click="itemClicked(2)" class="doc" ng-class="{ 'selected': 2 == root.itemSelecionadoDoMenu }" href="#/documentos">Documentos<span ng-if="menuExpanded" class="seta_direita"></span></a><span></span>
						<ul>
							<li><a ng-class="{ 'selected': 2 == root.itemSelecionadoDoMenu }" ng-click="itemClicked(2)" href="#/documentos">para Atualizar</a></li>
							<li><a ng-class="{ 'selected': 2 == root.itemSelecionadoDoMenu }" ng-click="itemClicked(2)" href="#/dpvs">para Validar</a></li>
						</ul>
					</li>
					<li>
						<a ng-click="itemClicked(3)" class="dsc" ng-class="{ 'selected': 3 == root.itemSelecionadoDoMenu }" href="#/disciplinas">Disciplinas</a>
					</li>
					<li>
						<a ng-click="itemClicked(4)" class="cli" ng-class="{ 'selected': 4 == root.itemSelecionadoDoMenu }" href="#/clientes">Clientes</a>
					</li>
					<li>
						<a ng-click="itemClicked(5)" class="cfg" ng-class="{ 'selected': 5 == root.itemSelecionadoDoMenu }" href="#/configuracoes">Configurações</a>
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
		
		<!-- carregamento do angular 1.4.4 local --
		<script src="js/angular/angular.min.js"></script>
		<script src="js/angular/angular-route.min.js"></script>
		<script src="js/angular/angular-cookies.min.js"></script>
		<script src="js/angular/angular-resource.min.js"></script>
		<!-- carregamento do angular 1.4.4 via CDN -->
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-cookies.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-resource.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-animate.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-aria.min.js"></script>
  		<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-messages.min.js"></script>
		<!-- fim carregamento do angular via CDN -->
		<!-- fim de carregamento do angular local -->
		<!-- carregamento do angular 1.6.3 via CDN --
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-route.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-cookies.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-resource.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-animate.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-aria.min.js"></script>
  		<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular-messages.min.js"></script>
		<!-- fim carregamento do angular via CDN -->
		<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>
		<script src="js/angular/ng-currency.min.js"></script>
		<script src="js/angular/angular-ui-mask.min.js"></script>
		<script src="js/angular/ng-file-upload.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.1.2/ng-tags-input.min.js"></script>
		<!-- Fim de Scripts externos -->
		<!-- Scripts do app -->

		<!-- Controllers -->
		<script src="app/modules/Clientes/ClientesController.js"></script>
		<script src="app/modules/Configuracoes/ConfiguracoesController.js"></script>
		<script src="app/modules/Documentos/DocumentosController.js"></script>
		<script src="app/modules/DocumentosParaValidacao/DocumentosParaValidacaoController.js"></script>
		<script src="app/modules/Disciplinas/DisciplinasController.js"></script>
		<script src="app/modules/Nav/NavController.js"></script>
		<script src="app/modules/Opcoes/OpcoesController.js"></script>
		<script src="app/modules/Projetos/ProjetosController.js"></script>
		<script src="app/modules/Projetos/ProjetosAreasController.js"></script>
		<script src="app/modules/Projetos/ProjetosDAOsController.js"></script>
		<script src="app/modules/Projetos/ProjetosDocumentosController.js"></script>
		<script src="app/modules/Senha/SenhaController.js"></script>
		<script src="app/modules/Topo/TopoController.js"></script>
		<script src="app/modules/Usuarios/UsuariosController.js"></script>
		<script src="app/modules/VisaoGeral/VisaoGeralController.js"></script>
		<!--/Controllers -->
		<script src="app/services/constants.js"></script>
		<script src="app/WebGDoks.js"></script>
		<script src="app/services/Factory.js"></script>
		<script src="app/directives/directives.js"></script>
		<!-- Fim de Scripts do app -->
	</body>
</html>