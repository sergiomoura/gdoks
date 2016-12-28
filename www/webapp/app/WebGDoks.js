// Definindo Module WebGDoks
var WebGDoks = angular.module('WebGDoks', ['ngRoute','ngCookies','ng-currency','ngLocale']);

// Definindo Rotas
WebGDoks.config(
	function ($routeProvider){
		$routeProvider
		.when(
			'/home',
			{
				controller: 'HomeController',
				templateUrl: 'app/views/aFazer.php'
			}
		)
		.when(
			'/projetos',
			{
				controller: 'ProjetosController',
				templateUrl: 'app/views/projetos.html'
			}
		)
		.when(
			'/usuarios',
			{
				controller: 'UsuariosController',
				templateUrl: 'app/views/usuarios.html'
			}
		)
		.when(
			'/documentos',
			{
				controller: 'DocumentosController',
				templateUrl: 'app/views/documentos.html'
			}
		)
		.when(
			'/disciplinas',
			{
				controller: 'DisciplinasController',
				templateUrl: 'app/views/disciplinas.html'
			}
		).when(
			'/afazer',
			{
				controller: 'AFazerController',
				templateUrl: 'app/views/afazer.php'
			}
		)
		.when(
			'/configuracoes',
			{
				controller: 'ConfiguracoesController',
				templateUrl: 'app/views/configuracoes.html'
			}
		)
		.otherwise({redirectTo:'/home'});
	}
)