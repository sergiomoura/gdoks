// Definindo Module WebGDoks
var WebGDoks = angular.module('WebGDoks', ['ngRoute','ngCookies','ng-currency','ngLocale']);

// Definindo Rotas
WebGDoks.config(
	function ($routeProvider){
		$routeProvider
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
			'/usuarios/:id',
			{
				controller: 'UsuarioController',
				templateUrl: 'app/views/usuario.html'
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
		)
		.when(
			'/disciplinas/:id',
			{
				controller: 'DisciplinaController',
				templateUrl: 'app/views/disciplina.html'
			}
		)
		.when(
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
		.when(
			'/senha',
			{
				controller: 'SenhaController',
				templateUrl: 'app/views/senha.html'
			}
		)
		.otherwise({redirectTo:'/projetos'});
	}
)

WebGDoks.run(function($rootScope, $location, $anchorScroll) {
	//when the route is changed scroll to the proper element.
	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
		var hash = $location.hash();

		// verificando se o item clicado é um item da página de projetos;
		if(hash && hash.indexOf('prj_') == 0){
			// É um item da página de projetos. Ajeitando posicionamento do scroll.
			setTimeout(function(){document.getElementById('container_horizontal').scrollTop -= 70;},25);
		}
	});
});