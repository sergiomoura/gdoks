<?php
	// Incluindo bloqueador de acesso externo a página.
	require('blocker.php');

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
	require('GDoks/Tela.php');
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
		<link rel="stylesheet" href="css/geral.css">
		<link rel="stylesheet" href="css/WebGDoks.css">
		<link rel="stylesheet" href="node_modules/ng-tags-input/build/ng-tags-input.min.css">
		<link rel="stylesheet" href="node_modules/angular-material/angular-material.min.css">
		<link rel="stylesheet" href="node_modules/angular-material-expansion-panel/dist/md-expansion-panel.min.css">
		<link rel="stylesheet" href="node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.css">
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
		<div id="selfdata"">
			<?php echo($user->nome.' - '.$user->empresa .' - UA: '. shell_exec("git log -n 1 --date=format:'%d/%m/%Y %H:%M:%S' --pretty=format:\"%cd [%h]\"")); ?>
		</div>
		<div id="carregando" ng-show="root.carregando" class="carregando-show-hide" layout="row" layout-align="center center">
			<md-progress-circular md-mode="indeterminate" md-diameter="64"></md-progress-circular>
		</div>
	</body>
	<script src="scripts.js"></script>
	<!--
	<script src="js/node_modules/angular/angular.min.js"></script>
	<script src="js/node_modules/angular-animate/angular-animate.min.js"></script>
	<script src="js/node_modules/angular-aria/angular-aria.min.js"></script>
	<script src="js/node_modules/angular-cookies/angular-cookies.min.js"></script>
	<script src="js/node_modules/angular-material/angular-material.min.js"></script>
	<script src="js/node_modules/angular-material-expansion-panel/dist/md-expansion-panel.min.js"></script>
	<script src="js/node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.js"></script>
	<script src="js/node_modules/angular-messages/angular-messages.min.js"></script>
	<script src="js/node_modules/angular-resource/angular-resource.min.js"></script>
	<script src="js/node_modules/angular-route/angular-route.min.js"></script>
	<script src="js/node_modules/angular-ui-mask/dist/mask.min.js"></script>
	<script src="js/node_modules/ng-currency/dist/ng-currency.js"></script>
	<script src="js/node_modules/ng-file-upload/dist/ng-file-upload.min.js"></script>
	<script src="js/node_modules/ng-tags-input/build/ng-tags-input.min.js"></script>
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
	<script src="app/services/constants.js"></script>
	<script src="app/WebGDoks.js"></script>
	<script src="app/services/Factory.js"></script>
	<script src="app/directives/directives.js"></script>
	<script src="app/directives/clickoutside.directives.js"></script>
-->
</html>