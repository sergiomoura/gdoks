<?php
	// Incluindo bloqueador de acesso externo a página.
	require('../../includes/blocker.php');

	// Carregando informações do cookie
	$user = json_decode($_COOKIE['user']);

	// Carregando dbkey
	include('../../client_data/'.$user->empresa.'/dbkey.php');

	// Criando conexaão com base de dados
	$db = new DB($dbkey);
	unset($dbkey);

	// Levantando telas permitidas a este usuário
	$sql = 'SELECT id_tela FROM gdoks_usuarios_x_telas WHERE id_usuario=?';
	$idsDeTelas = array_map(function($a){return $a['id_tela'];}, $db->query($sql,'i',$user->id));
	
	// Criando vetor de telas
	require('../../includes/GDoks/Tela.php');
	$telas = array_map(function($id){return Tela::CreateById($id,$GLOBALS['user']->id,$GLOBALS['db']);}, $idsDeTelas);
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
		<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.4/angular-material.min.css">
		<link rel="stylesheet" href="css/md-expansion-panel.min.css">
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
					<md-sidemenu-button ng-click="toggleMenu()" href="#/dashboard"><md-icon class="material-icons step" aria-label="home">home</md-icon>Home</md-sidemenu-button>
					<?php 
					foreach ($telas as $tela) {
						echo('<md-sidemenu-button ng-click="toggleMenu()" href="'.$tela->getHref().'"><md-icon class="material-icons step" aria-label="'.$tela->getTitulo().'">'.$tela->getIcone().'</md-icon>'.$tela->getTitulo().'</md-sidemenu-button>'."\n");
					}
					?>
				</md-sidemenu>
			</md-sidenav>
			<md-content flex>
				<ng-view>
				</ng-view>
			</md-content>
		</div>
		<div id="selfdata" title="Última atualização: <?php echo(shell_exec("git log -n 1 --date=format:'%d/%m/%Y %H:%M:%S' --pretty=format:\"%cd [%h]\""))?>">
			<?php echo($user->empresa) ?> - <?php echo($user->nome) ?>
		</div>
		<div id="carregando" ng-show="root.carregando" class="carregando-show-hide" layout="row" layout-align="center center">
			<md-progress-circular md-mode="indeterminate" md-diameter="64"></md-progress-circular>
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
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-animate.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-aria.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-messages.min.js"></script>
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
	
	<script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.4/angular-material.min.js"></script>
  	<script src="js/angular/ng-currency.min.js"></script>
	<script src="js/angular/angular-ui-mask.min.js"></script>
	<script src="js/angular/ng-file-upload.min.js"></script>
	<script src="js/angular/angular-material-sidemenu.js"></script>
	<script src="js/angular/md-expansion-panel.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.1.2/ng-tags-input.min.js"></script>
	<!-- Fim de Scripts externos -->
	<!-- Scripts do app -->

	<!-- Controllers -->
	<script src="app/modules/Cargos/CargosController.js"></script>
	<script src="app/modules/Clientes/ClientesController.js"></script>
	<script src="app/modules/Configuracoes/ConfiguracoesController.js"></script>
	<script src="app/modules/Documentos/DocumentosController.js"></script>
	<script src="app/modules/Documentos/DocumentoController.js"></script>
	<script src="app/modules/Disciplinas/DisciplinasController.js"></script>
	<script src="app/modules/Grds/GrdsController.js"></script>
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