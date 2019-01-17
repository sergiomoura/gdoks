// Definindo Module WebGDoks
var WebGDoks = angular.module('WebGDoks',
								[
								'ngRoute',
								'ngCookies',
								'ng-currency',
								'ngLocale',
								'ngAnimate',
								'ngMaterial',
								'ngMaterialSidemenu',
								'material.components.expansionPanels',
								'ngFileUpload',
								'ui.mask',
								'angular-click-outside',
								'ngFilesizeFilter',
								'Cargos',
								'Clientes',
								'Configuracoes',
								'Disciplinas',
								'Documentos',
								'Grds',
								'Log',
								'Nav',
								'Opcoes',
								'Historico',
								'Projetos',
								'Senha',
								'Sobre',
								'Topo',
								'Usuarios',
								'VisaoGeral',
								'Validacao',
								'UA',
								'Propostas',
								'angularTrix',
								]);

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
			'/propostas',
			{
				controller: 'PropostasController',
				templateUrl: 'app/modules/Propostas/propostas.php'
			}
		)
		.when(
			'/propostas/0',
			{
				controller: 'NovaPropostaController',
				templateUrl: 'app/modules/Propostas/nova_proposta.php'
			}
		)
		.when(
			'/propostas/:id',
			{
				controller: 'PropostaController',
				templateUrl: 'app/modules/Propostas/proposta.php'
			}
		)
		.when(
			'/visaogeral',
			{
				controller: 'VisaoGeralController',
				templateUrl: 'app/modules/VisaoGeral/visaogeral.php'
			}
		)
		.when(
			'/sobre',
			{
				controller: 'SobreController',
				templateUrl: 'app/modules/Sobre/sobre.php'
			}
		)
		.when(
			'/ua',
			{
				controller: 'UAController',
				templateUrl: 'app/modules/UA/ua.php'
			}
		)
		.when(
			'/projetos',
			{
				controller: 'ProjetosController',
				templateUrl: 'app/modules/Projetos/projetos.php'
			}
		)
		.when(
			'/projetos/:id',
			{
				controller: 'ProjetoController',
				templateUrl: 'app/modules/Projetos/projeto.php'
			}
		)
		.when(
			'/projetos/:id/dashboard',
			{
				controller: 'DashProjetoController',
				templateUrl: 'app/modules/Projetos/dash_projeto.html'
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
			'/cargos',
			{
				controller: 'CargosController',
				templateUrl: 'app/modules/Cargos/cargos.html'
			}
		)
		.when(
			'/grds/:id',
			{
				controller: 'GrdController',
				templateUrl: 'app/modules/Grds/grd.html'
			}
		)
		.when(
			'/grds',
			{
				controller: 'GrdsController',
				templateUrl: 'app/modules/Grds/grds.html'
			}
		)
		.when(
			'/documentos',
			{
				controller: 'DocumentosController',
				templateUrl: 'app/modules/Documentos/documentos.php'
			}
		)
		.when(
			'/documentos/:id',
			{
				controller: 'DocumentoController',
				templateUrl: 'app/modules/Documentos/documento.php'
			}
		)
		.when(
			'/documentos/:id/edit',
			{
				controller: 'DocumentoEditController',
				templateUrl: 'app/modules/Documentos/documento_edit.php'
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
			'/log',
			{
				controller: 'LogController',
				templateUrl: 'app/modules/Log/log.html'
			}
		)
		.when(
			'/configuracoes',
			{
				controller: 'ConfiguracoesController',
				templateUrl: 'app/modules/Configuracoes/configuracoes.php'
			}
		)
		.when(
			'/validacao',
			{
				controller: 'ValidacaoController',
				templateUrl: 'app/modules/Validacao/validacao.php'
			}
		)
		.otherwise({redirectTo:'/visaogeral'});
	}
)

// Configurando o Locale do DatePicker
WebGDoks.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
    	if(date){
    		var d = date.getDate();
			var m = date.getMonth()+1;
			var y = date.getFullYear();
			d = d<10?'0'+d:d;
			m =  m<10?'0'+m:m;
			return d+'/'+m+'/'+y;
       	} else {
       		return '';
       	}

    };

    // Brazilian localization.
    $mdDateLocaleProvider.months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
    $mdDateLocaleProvider.shortMonths = ['jan','fev','mar', 'abr','mai','jun','jul','ago','set','out','nov','dez'];
    $mdDateLocaleProvider.days = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
    $mdDateLocaleProvider.shortDays = ['D','S','T','Q','Q','S','S'];
    $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
      return 'Semana ' + weekNumber;
    };
    $mdDateLocaleProvider.msgCalendar = 'Calendário';
    $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendário';
});

// Configurando cores
WebGDoks.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange',{'default':'800'});
})

// Definindo próprio controller
WebGDoks.controller('RootController',RootController);
function RootController($scope,$interval,$cookies,GDoksFactory,$mdSidenav,$mdMenu){

	// definindo o objeto root.
	$scope.root = {};

	// atribuindo telas
	$scope.root.telasDoUsuario = $cookies.getObject('user').telas;

	// Carregando cookie de histórico se ele existir. Se não existir, cria com vetor vazio.
	$scope.root.historico = $cookies.getObject(COOKIE_KEY_HISTORICO);
	if($scope.root.historico == undefined){
		$cookies.putObject(COOKIE_KEY_HISTORICO,[]);
		$scope.root.historico = [];
	}

	// Flag para mostrar se está carregando ou não
	$scope.root.carregando = false;

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

	// Definindo função que carrega telas do servidor
	$scope.root.loadTelas = function(){
		GDoksFactory.getTelas()
		.success(function(response){
			// abrindo db local
			indexedDB.open('gdoks').onsuccess = function(evt){
				// Pondo telas na tabela
				var telas = response.telas;
				for (var i = telas.length - 1; i >= 0; i--) {
					evt.target.result.transaction('telas','readwrite').objectStore('telas').add(telas[i]);
				}				
			}

			// atribuindo telas no scope.root também
			$scope.root.telas = response.telas;		})
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

		// Criando ObjectStore de telas
		var os_telas = db.createObjectStore("telas",{keyPath: "id"});
		os_clientes.createIndex("idx_titulo","titulo");
		os_clientes.transaction.addEventListener('complete',function(){
			$scope.root.loadTelas();
		})
	}

	// Definindo funções que renovam o token
	var refreshToken = function(){
		GDoksFactory.refreshToken()
		.success(
			function(response){
				var user = $cookies.getObject('user');
				user.token = response.token;
				$cookies.putObject('user',user,{path:'/'});
			}
		)
		.error(
			function(error){
				console.warn('Token não foi renovado!');
				console.warn(error);
				$cookies.remove('user',{path:'/'});
				indexedDB.deleteDatabase('gdoks');
				window.location="/";
			}
		);
	}

	// Acionando timer que renova o token de tempo em tempo
	$interval(refreshToken,TOKEN_REFRESH_IN);
	
	$scope.toggleMenu = function(){
		$mdSidenav('menu_principal').toggle();
	}

	$scope.root.addDocumentoAoHistorico = function(documento){
		//Executando ações dentro de um timeout para que as movimentações não sejam exibidas no menu
		setTimeout(function(){			
			// separando somente dados de interesse para manter no histórico
			var doc = {'i':documento.id, 'c':documento.codigo};

			// Carregando histórico do cookie
			$scope.root.historico = $cookies.getObject(COOKIE_KEY_HISTORICO);

			// buscando se o doc em questão já está no vetor histórico
			var pos = $scope.root.historico.findIndex(function(a){return a.i == this},doc.i);
			if(pos > -1){
				// doc está no histórico na posição pos. Reposicionando ele a frente
				$scope.root.historico.unshift($scope.root.historico.splice(pos,1)[0]);
			} else {
				// doc não está no histórico. Adicionando ele a frente
				$scope.root.historico.unshift(doc);
			}
			
			// Removendo o último se o tamanho do histórico for maior que o máximo
			if($scope.root.historico.length > HISTORICO_MAX_SIZE){
				$scope.root.historico.pop();
			}
			
			// Atualizando o cookie para uso futuro
			$cookies.putObject(COOKIE_KEY_HISTORICO,$scope.root.historico);
		},500);
	}
}
