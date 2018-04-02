<?php
	// incluindo constantes do sistema
	include('constantes.php');
	
	// Incluindo bloqueador de acesso externo a página.
	require('blocker.php');

	// Carregando informações do cookie
	$user = json_decode($_COOKIE['user']);

	// Carregando dbkey
	include(CLIENT_DATA_PATH.$user->empresa.'/dbkey.php');

	// Criando conexaão com base de dados
	$db = new DB($dbkey);
	unset($dbkey);

	// Levantando telas permitidas a este usuário
	$sql = 'SELECT a.id_tela
			FROM gdoks_usuarios_x_telas a
			INNER JOIN gdoks_telas b ON a.id_tela=b.id
			WHERE a.id_usuario=?
			ORDER BY b.ordem ASC';
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
		<link rel="stylesheet" href="dist/styles.css">
		<link rel="stylesheet" href="node_modules/ng-tags-input/build/ng-tags-input.min.css">
		<link rel="stylesheet" href="node_modules/angular-material/angular-material.min.css">
		<link rel="stylesheet" href="node_modules/angular-material-expansion-panel/dist/md-expansion-panel.min.css">
		<link rel="stylesheet" href="node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.css">
		<link rel="stylesheet" href="node_modules/trix/dist/trix.css">
	</head>
	<body ng-controller="RootController" layout="column" ng-cloak>
		<md-toolbar layout="row" layout-align="start center" md-whiteframe="6dp" style="z-index: 100">
			<md-button class="md-icon-button" aria-label="Settings" ng-click="toggleMenu()">
				<md-icon class="material-icons step" aria-label="menu">list</md-icon>
			</md-button>
			<img src="img/logo_peq_clara.png" alt="GDoks" id="logo">
			<span flex></span>
			<md-menu>
				<md-button ng-disabled="root.historico.length==0" ng-click="$mdMenu.open()" aria-label="Abre Histórico" class="md-icon-button">
					<md-icon class="material-icons step" aria-label="menu">history</md-icon>
					<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
						Histórico de Documentos
					</md-tooltip>
				</md-button>
				<md-menu-content ng-controller="HistoricoController">
					<md-menu-item ng-repeat="doc in root.historico">
						<md-button ng-click="goToDoc(doc.i)">
							<md-icon class="material-icons step" aria-label="Ir para documento {{doc.nome}}">insert_drive_file</md-icon>
							{{doc.c}}
						</md-button>
					</md-menu-item>
				</md-menu-content>
			</md-menu>
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
						<md-button ng-click="onHelpClick()">
							<md-icon class="material-icons step" aria-label="Ajuda">help_outline</md-icon>
							Ajuda
						</md-button>
					</md-menu-item>
					<md-menu-item>
						<md-button ng-click="onSobreClick()">
							<md-icon class="material-icons step" aria-label="Sobre o GDoks">announcement_outline</md-icon>
							Sobre o GDoks
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
			<?php echo($user->nome.' - '.$user->empresa .' - UA: '. shell_exec("git log -n 1 --date=iso8601 --pretty=format:\"%cd [%h]\"")); ?>
		</div>
		<div id="carregando" ng-show="root.carregando" class="carregando-show-hide" layout="row" layout-align="center center">
			<md-progress-circular md-mode="indeterminate" md-diameter="64"></md-progress-circular>
		</div>
	</body>
	<script src="dist/scripts.js"></script>
</html>