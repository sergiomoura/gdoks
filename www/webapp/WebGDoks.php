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
			<md-menu ng-controller="OpcoesController">
				<md-button ng-click="$mdOpenMenu()" aria-label="Abre Menu de Oções" class="md-icon-button">
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
							<md-icon class="material-icons step" aria-label="Sair do GDoks">exit_to_app</md-icon>
							Sair
						</md-button>
					</md-menu-item>
				</md-menu-content>
			</md-menu>
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
	<script src="app/modules/Projetos/ProjetosSubareasController.js"></script>
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