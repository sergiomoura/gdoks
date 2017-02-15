// Definindo Module WebGDoks
var WebGDoks = angular.module('WebGDoks', ['ngRoute','ngCookies','ng-currency','ngLocale','ui.mask']);

// Definindo Rotas
WebGDoks.config(
	function ($routeProvider){
		$routeProvider
		.when(
			'/visaogeral',
			{
				controller: 'VisaoGeralController',
				templateUrl: 'app/views/visaogeral.html'
			}
		).when(
			'/projetos',
			{
				controller: 'ProjetosController',
				templateUrl: 'app/views/projetos.html'
			}
		).when(
			'/projetos/:id',
			{
				controller: 'ProjetoController',
				templateUrl: 'app/views/projeto.html'
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
			'/clientes',
			{
				controller: 'ClientesController',
				templateUrl: 'app/views/clientes.html'
			}
		)
		.when(
			'/clientes/:id',
			{
				controller: 'ClienteController',
				templateUrl: 'app/views/cliente.html'
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
		.otherwise({redirectTo:'/visaogeral'});
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

// Definindo opções do DatePiscker
var datePickerOptions = {};
datePickerOptions.dayNamesMin = [ "D", "S", "T", "Q", "Q", "S", "S" ];
datePickerOptions.monthNames = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
datePickerOptions.dateFormat = "dd/mm/yy";
datePickerOptions.showAnim = "";