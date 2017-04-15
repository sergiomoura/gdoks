// Definindo Module WebGDoks
var WebGDoks = angular.module('WebGDoks',
								['ngRoute',
								'ngCookies',
								'ng-currency',
								'ngLocale',
								'ui.mask',
								'ngFileUpload',
								'Clientes',
								'Configuracoes',
								'Disciplinas',
								'Documentos',
								'DocumentosParaValidacao',
								'Nav',
								'Opcoes',
								'Projetos',
								'Senha',
								'Topo',
								'Usuarios',
								'VisaoGeral']);

// Definindo Rotas
WebGDoks.config(
	function ($routeProvider){
		$routeProvider
		.when(
			'/senha',
			{
				controller: 'SenhaController',
				templateUrl: 'app/modules/Senha/senha.html'
			}
		)
		.when(
			'/visaogeral',
			{
				controller: 'VisaoGeralController',
				templateUrl: 'app/modules/VisaoGeral/visaogeral.html'
			}
		).when(
			'/projetos',
			{
				controller: 'ProjetosController',
				templateUrl: 'app/modules/Projetos/projetos.html'
			}
		).when(
			'/projetos/:id',
			{
				controller: 'ProjetoController',
				templateUrl: 'app/modules/Projetos/projeto.html'
			}
		)
		.when(
			'/usuarios',
			{
				controller: 'UsuariosController',
				templateUrl: 'app/modules/Usuarios/usuarios.html'
			}
		)
		.when(
			'/usuarios/:id',
			{
				controller: 'UsuarioController',
				templateUrl: 'app/modules/Usuarios/usuario.html'
			}
		)
		.when(
			'/documentos',
			{
				controller: 'DocumentosController',
				templateUrl: 'app/modules/Documentos/documentos.html'
			}
		)
		.when(
			'/dpvs',
			{
				controller: 'DocumentosParaValidacaoController',
				templateUrl: 'app/modules/DocumentosParaValidacao/DocumentosParaValidacao.html'
			}
		)
		.when(
			'/disciplinas',
			{
				controller: 'DisciplinasController',
				templateUrl: 'app/modules/Disciplinas/disciplinas.html'
			}
		)
		.when(
			'/disciplinas/:id',
			{
				controller: 'DisciplinaController',
				templateUrl: 'app/modules/Disciplinas/disciplina.html'
			}
		)
		.when(
			'/clientes',
			{
				controller: 'ClientesController',
				templateUrl: 'app/modules/Clientes/clientes.html'
			}
		)
		.when(
			'/clientes/:id',
			{
				controller: 'ClienteController',
				templateUrl: 'app/modules/Clientes/cliente.html'
			}
		)
		.when(
			'/configuracoes',
			{
				controller: 'ConfiguracoesController',
				templateUrl: 'app/modules/Configuracoes/configuracoes.html'
			}
		)
		.otherwise({redirectTo:'/visaogeral'});
	}
)

// Definindo próprio controller
WebGDoks.controller('RootController',RootController);
function RootController($scope,$interval,$cookies,GDoksFactory){

	// definindo o objeto root.
	$scope.root = {};

	// Definindo função que carrega usuários do servidor
	$scope.root.loadUsuarios = function(){
		GDoksFactory.loadUsuarios()
			.success(
				function(response){
					// Carregando usuários
					var usuarios = response.usuarios;

					// Conectando-se a base de dados
					var reqOpen = indexedDB.open("gdoks");
					
					reqOpen.onsuccess = function(evt){
						// Capturando a conexão com a base
						var db = evt.target.result;

						// Conectando-se a ObjectStore "usuarios"
						var os_usuarios = db.transaction('usuarios','readwrite').objectStore('usuarios');

						// limpando a tabela de usuários
						var reqClear = os_usuarios.clear();
						reqClear.onsuccess = function(evt){
							// Adicionando os usuários	
							var addRequest;
							for (var i = usuarios.length - 1; i >= 0; i--) {
								// Normalizando o valor da propriedade ativo para boolean
								usuarios[i].ativo = (usuarios[i].ativo==1);
								
								// adicionando usuários
								addRequest = os_usuarios.add(usuarios[i]);
								addRequest.onerror = function(evt){
									console.error("Impossível adicionar usuário a base.");
								}
							}
						}
					}
				}
			)
			.error(
				function(error){
				}
			);
	};

	// Definindo função que carrega clientes do servidor
	$scope.root.loadClientes = function(){
		GDoksFactory.getClientes()
			.success(
				function(response){
					// Carregando usuários
					var clientes = response.clientes;

					// Conectando-se a base de dados
					var reqOpen = indexedDB.open("gdoks");
					
					reqOpen.onsuccess = function(evt){
						// Capturando a conexão com a base
						var db = evt.target.result;

						// Conectando-se a ObjectStore "clientes"
						var os_clientes = db.transaction('clientes','readwrite').objectStore('clientes');

						// limpando a tabela de usuários
						var reqClear = os_clientes.clear();
						reqClear.onsuccess = function(evt){
							// Adicionando os usuários	
							var addRequest;
							for (var i = clientes.length - 1; i >= 0; i--) {
								// adicionando usuários
								addRequest = os_clientes.add(clientes[i]);
								addRequest.onerror = function(evt){
									console.error("Impossível adicionar cliente a base.");
								}
							}
						}
					}
				}
			)
			.error(
				function(error){
				}
			);
	};

	// Definindo função que carrega projetos do servidor
	$scope.root.loadProjetos = function(){
		GDoksFactory.getProjetos()
		.success(
			function(response){
				// Carregando projetos
				var projetos = response.projetos;

				// Conectando-se a base de dados
				var reqOpen = indexedDB.open("gdoks");
				
				reqOpen.onsuccess = function(evt){
					// Capturando a conexão com a base
					var db = evt.target.result;

					// Conectando-se a ObjectStore "projetos"
					var os_projetos = db.transaction('projetos','readwrite').objectStore('projetos');

					// limpando a tabela de projetos
					var reqClear = os_projetos.clear();
					reqClear.onsuccess = function(evt){
						// Adicionando os projetos	
						var addRequest;
						for (var i = projetos.length - 1; i >= 0; i--) {
							// Normalizando o valor da propriedade ativo para boolean
							projetos[i].ativo = (projetos[i].ativo==1);
							
							// adicionando projetos
							addRequest = os_projetos.add(projetos[i]);
							addRequest.onerror = function(evt){
								console.error("Impossível adicionar projeto a base.");
							}
						}
					}
				}
			}
		)
		.error(
			function(error){
			}
		);
	}

	// Definindo função que carrega disciplinas do servidor
	$scope.root.loadDisciplinas = function(){
		GDoksFactory.getDisciplinas()
		.success(
			function(response){
				// Carregando disciplinas
				var disciplinas = response.disciplinas;

				// Conectando-se a base de dados
				var reqOpen = indexedDB.open("gdoks");
				
				reqOpen.onsuccess = function(evt){
					// Capturando a conexão com a base
					var db = evt.target.result;

					// Conectando-se a ObjectStore "disciplinas"
					var os_disciplinas = db.transaction('disciplinas','readwrite').objectStore('disciplinas');

					// limpando a tabela de disciplinas
					var reqClear = os_disciplinas.clear();
					reqClear.onsuccess = function(evt){
						// Adicionando os disciplinas	
						var addRequest;
						for (var i = disciplinas.length - 1; i >= 0; i--) {
							// Normalizando o valor da propriedade ativo para boolean
							disciplinas[i].ativa = (disciplinas[i].ativa==1);

							// normalizando o valor da propriedade ativa para boolean nas subs
							for (var j = disciplinas[i].subs.length - 1; j >= 0; j--) {
								disciplinas[i].subs[j].ativa = (disciplinas[i].subs[j].ativa == 1);
							};
							
							// adicionando disciplinas
							addRequest = os_disciplinas.add(disciplinas[i]);
							addRequest.onerror = function(evt){
								console.error("Impossível adicionar disciplina a base.");
							}
						}
					}
				}
			}
		)
		.error(
			function(error){
			}
		);
	}

	// Criando base de dados.
	var reqOpen = indexedDB.open("gdoks");
	
	reqOpen.onerror = function(e){
		console.log("Falha na abertura da base.");
		console.dir(e);
	}

	reqOpen.onblocked = function(e){
		console.log("Acesso a base bloqueado.");
		console.dir(e);
	}

	reqOpen.onupgradeneeded = function(e){
		// Criando ObjectStores da base de dados
		var db = e.target.result;

		// Criando ObjectStore de usuários
		var os_usuarios = db.createObjectStore("usuarios",{keyPath: "id"});
		os_usuarios.createIndex("idx_nome","nome",{'unique':false});
		os_usuarios.transaction.addEventListener('complete',function(){
			$scope.root.loadUsuarios();
		})

		// Criando ObjectStore de disciplinas
		var os_disciplinas = db.createObjectStore("disciplinas",{keyPath: "id"});
		os_disciplinas.createIndex("idx_nome","nome",{'sigla':true});
		os_disciplinas.transaction.addEventListener('complete',function(){
			$scope.root.loadDisciplinas();
		})

		// Criando ObjectStore de projetos
		var os_projetos = db.createObjectStore("projetos",{keyPath: "id"});
		os_projetos.createIndex("idx_nome","nome",{'sigla':true});
		os_projetos.transaction.addEventListener('complete',function(){
			$scope.root.loadProjetos();
		})

		// Criando ObjectStore de clientes
		var os_clientes = db.createObjectStore("clientes",{keyPath: "id"});
		os_clientes.createIndex("idx_nome","nome",{'sigla':true});
		os_clientes.transaction.addEventListener('complete',function(){
			$scope.root.loadClientes();
		})
	}

	// Definindo funções que renovam o token
	var refreshToken = function(){
		GDoksFactory.refreshToken()
		.success(
			function(response){
				$scope.root.user.token = response.token;
				$cookies.putObject('user',$scope.root.user);
			}
		)
		.error(
			function(error){
				window.location="/";
			}
		);
	}

	// Acionando timer que renova o token de tempo em tempo
	$interval(refreshToken,TOKEN_REFRESH_IN);
	
	// Definindo valores padrão para a interface
	$scope.root.itemSelecionadoDoMenu = 0;

	// Defininfo valor inicial do item do submenu de projetos.
	$scope.root.itemSelecionadoDoPrjMenu = "prj_documentos";

	// definindo valor inicial para mostrandoMenu
	$scope.root.mostrandoMenu = false;

	// definindo o objeto que guarda as info do usuário logado.
	$scope.root.user = $cookies.getObject('user');
}


// Definindo opções do DatePiscker
var datePickerOptions = {};
datePickerOptions.dayNamesMin = [ "D", "S", "T", "Q", "Q", "S", "S" ];
datePickerOptions.monthNames = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
datePickerOptions.dateFormat = "yy-mm-dd";
datePickerOptions.showAnim = "";