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
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
		<link rel="shortcut icon" href="/favicon.ico" />

		<link rel="stylesheet" href="css/normalizer.css">
		<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
		<link rel="stylesheet" href="css/angular-material-sidemenu.css">
		<link rel="stylesheet" href="css/geral.css">
		<link rel="stylesheet" href="css/WebGDoks.css">
		<link rel="stylesheet" type="text/css" href="css/ng-tags-input.css">
	</head>
	<body ng-controller="RootController" layout="column" ng-cloak>
		<md-toolbar layout="row" layout-align="start center" md-whiteframe="6dp" style="z-index: 100">
			<md-button class="md-icon-button" aria-label="Settings" ng-click="toggleMenu()">
				<md-icon class="material-icons step" aria-label="menu">list</md-icon>
			</md-button>
			<img src="img/logo_peq_clara.png" alt="GDoks" id="logo">
			<span flex></span>
			<md-button class="md-icon-button" aria-label="Settings">
				<md-icon class="material-icons step" aria-label="description">more_vert</md-icon>
			</md-button>
		</md-toolbar>
		<div layout="row" style="height:100%">
			<md-sidenav layout="column" md-is-locked-open="root.mostrandoMenu" md-whiteframe="1dp" md-component-id="menu_principal">
				<md-sidemenu>
					<md-sidemenu-button href="#/dashboard"><md-icon class="material-icons step" aria-label="home">home</md-icon>Home</md-sidemenu-button>
					<md-sidemenu-group>
						<md-sidemenu-content md-icon="group_work" md-heading="Projetos" md-arrow="true">
							<md-sidemenu-button href="#/projetos/0">Novo Projeto</md-sidemenu-button>
							<md-sidemenu-button href="#/projetos">Ver Todos</md-sidemenu-button>
						</md-sidemenu-content>
					</md-sidemenu-group>
					<md-sidemenu-button href="#/usuarios"><md-icon class="material-icons step" aria-label="Usuários">face</md-icon>Usuários</md-sidemenu-button>
					<md-sidemenu-group>
						<md-sidemenu-content md-icon="insert_drive_file" md-heading="Documentos" md-arrow="true">
							<md-sidemenu-button href="#/documentos">... Para Atualizar</md-sidemenu-button>
							<md-sidemenu-button href="#/dpvs">... Para Validar</md-sidemenu-button>
						</md-sidemenu-content>
					</md-sidemenu-group>
					<md-sidemenu-button href="#/disciplinas"><md-icon class="material-icons step" aria-label="Disciplinas">account_balance</md-icon>Disciplinas</md-sidemenu-button>
					<md-sidemenu-button href="#/clientes"><md-icon class="material-icons step" aria-label="Clientes">record_voice_over</md-icon>Clientes</md-sidemenu-button>
					<md-sidemenu-button href="#/cargos"><md-icon class="material-icons step" aria-label="Cargos">work</md-icon>Cargos</md-sidemenu-button>
					<md-sidemenu-button href="#/log"><md-icon class="material-icons step" aria-label="Log">history</md-icon>Log</md-sidemenu-button>
					<md-sidemenu-button href="#/configuracoes"><md-icon class="material-icons step" aria-label="Configurações">build</md-icon>Configurações</md-sidemenu-button>
				</md-sidemenu>
			</md-sidenav>
			<md-content flex>
				<ng-view>
				</ng-view>
			</md-content>
		</div>
	</body>
	<!--
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
						<a ng-click="itemClicked(5)" class="log" ng-class="{ 'selected': 5 == root.itemSelecionadoDoMenu }" href="#/log">Log do Sistema</a>
					</li>
					<li>
						<a ng-click="itemClicked(6)" class="cad" ng-class="{ 'selected': 6 == root.itemSelecionadoDoMenu }">Cadastrar...<span ng-if="menuExpanded" class="seta_direita"></span></a><span></span>
						<ul>
							<li><a ng-class="{ 'selected': 6 == root.itemSelecionadoDoMenu }" ng-click="itemClicked(6)" href="#/disciplinas">Disciplinas</a></li>
							<li><a ng-class="{ 'selected': 6 == root.itemSelecionadoDoMenu }" ng-click="itemClicked(6)" href="#/usuarios">Usuários</a></li>
							<li><a ng-class="{ 'selected': 6 == root.itemSelecionadoDoMenu }" ng-click="itemClicked(6)" href="#/clientes">Clientes</a></li>
							<li><a ng-class="{ 'selected': 6 == root.itemSelecionadoDoMenu }" ng-click="itemClicked(6)" href="#/cargos">Cargos</a></li>
						</ul>
					</li>
					<li>
						<a ng-click="itemClicked(7)" class="cfg" ng-class="{ 'selected': 7 == root.itemSelecionadoDoMenu }" href="#/configuracoes">Configurações</a>
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
	</body>
	-->
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
	<script src="js/angular/angular-material-sidemenu.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.1.2/ng-tags-input.min.js"></script>
	<!-- Fim de Scripts externos -->
	<!-- Scripts do app -->

	<!-- Controllers -->
	<script src="app/modules/Cargos/CargosController.js"></script>
	<script src="app/modules/Clientes/ClientesController.js"></script>
	<script src="app/modules/Configuracoes/ConfiguracoesController.js"></script>
	<script src="app/modules/Documentos/DocumentosController.js"></script>
	<script src="app/modules/DocumentosParaValidacao/DocumentosParaValidacaoController.js"></script>
	<script src="app/modules/Disciplinas/DisciplinasController.js"></script>
	<script src="app/modules/Nav/NavController.js"></script>
	<script src="app/modules/Log/LogController.js"></script>
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
	<script src="app/directives/clickoutside.directives.js"></script>
	<!-- Fim de Scripts do app -->
</html>