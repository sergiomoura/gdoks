<?php 
	$jsfiles = Array(
		'node_modules/angular/angular.min.js',
		'node_modules/angular-animate/angular-animate.min.js',
		'node_modules/angular-aria/angular-aria.min.js',
		'node_modules/angular-cookies/angular-cookies.min.js',
		'node_modules/angular-material/angular-material.min.js',
		'node_modules/angular-material-expansion-panel/dist/md-expansion-panel.min.js',
		'node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.js',
		'node_modules/angular-messages/angular-messages.min.js',
		'node_modules/angular-resource/angular-resource.min.js',
		'node_modules/angular-route/angular-route.min.js',
		'node_modules/angular-ui-mask/dist/mask.min.js',
		'node_modules/ng-currency/dist/ng-currency.js',
		'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
		'node_modules/ng-tags-input/build/ng-tags-input.min.js',
		'../app/modules/Cargos/CargosController.js',
		'../app/modules/Clientes/ClientesController.js',
		'../app/modules/Configuracoes/ConfiguracoesController.js',
		'../app/modules/Documentos/DocumentosController.js',
		'../app/modules/Documentos/DocumentoController.js',
		'../app/modules/Disciplinas/DisciplinasController.js',
		'../app/modules/Grds/GrdsController.js',
		'../app/modules/Nav/NavController.js',
		'../app/modules/Log/LogController.js',
		'../app/modules/Opcoes/OpcoesController.js',
		'../app/modules/Projetos/ProjetosController.js',
		'../app/modules/Projetos/ProjetosAreasController.js',
		'../app/modules/Projetos/ProjetosSubareasController.js',
		'../app/modules/Projetos/ProjetosDAOsController.js',
		'../app/modules/Projetos/ProjetosDocumentosController.js',
		'../app/modules/Senha/SenhaController.js',
		'../app/modules/Topo/TopoController.js',
		'../app/modules/Usuarios/UsuariosController.js',
		'../app/modules/VisaoGeral/VisaoGeralController.js',
		'../app/services/constants.js',
		'../app/WebGDoks.js',
		'../app/services/Factory.js',
		'../app/directives/directives.js',
		'../app/directives/clickoutside.directives.js'
	);

	// Concatenando scripts
	$jsString = '';
	foreach ($jsfiles as $js) {
		$jsString .= (file_get_contents($js)."\n");
	}

	// Ligando o ob_start
	ob_start("ob_gzhandler");

	// Minimizando e enviando
	include('vendor/autoload.php');
	echo(\JShrink\Minifier::minify($jsString));
	
	// Mandando conteúdo
	ob_flush();
 ?>