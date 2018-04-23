(function(){
	// Criando o módulo "Documentos"
	var module = angular.module('Documentos',['ngFileUpload']);

	// Atribuindo Controller Documentos Controller
	module.controller('DocumentosController',DocumentosController);
	
	// Atribuindo filtros do módulo
	module.filter('daysFromNow',daysFromNow);
	
	// Definindo função controller
	function DocumentosController($scope,GDoksFactory,$mdToast,$location,$cookies){
		
		// Definindo 'agora'
		$scope.agora = new Date();

		// Definindo o valor inicial para o vetor de areas
		$scope.areas = [];

		// Definindo o valor inicial para o vetor de subareas
		$scope.subareas = [];

		// Carregando clientes
		$scope.clientes = [];
		carregaClientes();

		// Carregando projetos
		var projetos = [];
		$scope.projetos = [];
		carregaProjetos();

		// Carregando documentos
		$scope.documentos = [];

		// Carregando disciplinas
		$scope.disciplinas = [];
		carregaDisciplinas();

		// Função que carrega clientes
		function carregaClientes(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction("clientes").objectStore("clientes").getAll().onsuccess = function(evt){
					$scope.$apply(function(){
						$scope.clientes = evt.target.result;
					})
				}
			}
		}

		// Função que carrega projetos
		function carregaProjetos(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction("projetos").objectStore("projetos").getAll().onsuccess = function(evt){
					$scope.$apply(function(){
						projetos = evt.target.result;
						$scope.projetos = projetos;
					})
				}
			}
		}

		// função que carrega áreas de um projeto
		function carregaAreas(id_projeto){
			GDoksFactory.getAreas(id_projeto)
			.success(function(response){
				$scope.areas = response.areas;
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar áreas do projeto selecionado: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// escrevendo erro no console
				console.warn(error);
			})
		}

		// função que carrega subáreas de uma area
		function carregaSubareas(id_projeto,id_area){
			GDoksFactory.getSubareas(id_projeto,id_area)
			.success(function(response){
				$scope.subareas = response.subareas;
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar sub-áreas da área selecionada: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// escrevendo erro no console
				console.warn(error);
			})
		}

		// Função que carrega as disciplinas e subdisciplinas (base do cliente)
		function carregaDisciplinas(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction("disciplinas").objectStore("disciplinas").getAll().onsuccess = function(evt){
					$scope.disciplinas = evt.target.result;
				}
			}
		}

		// HANDLERS : : : : : : : : : : : : : : : : : : : : : : : : : : : : :
		$scope.onClienteChange = function(){
			if($scope.busca.id_cliente == undefined){
				$scope.projetos = projetos;
			} else {
				$scope.projetos = projetos.filter(function(a){return a.id_cliente==this},$scope.busca.id_cliente);	
			}
			$scope.busca.id_projeto=undefined;
			$scope.busca.id_area=undefined;
			$scope.busca.id_subarea=undefined;
		}

		$scope.onProjetoChange = function(){
			carregaAreas($scope.busca.id_projeto);
			$scope.busca.id_area=undefined;
			$scope.busca.id_subarea=undefined;
		}

		$scope.onAreaChange = function(){
			carregaSubareas($scope.busca.id_projeto,$scope.busca.id_area);
			$scope.busca.id_subarea=undefined;
		}

		$scope.onDisciplinaChange = function(){
			if($scope.busca.id_disciplina!=undefined){
				$scope.subdisciplinas = $scope.disciplinas.find(function(a){
																return a.id==this;
															},$scope.busca.id_disciplina).subs;
			}
			$scope.busca.id_subdisciplina = undefined;
		}

		$scope.onBaixarLdpClick = function(){
			GDoksFactory.baixarLDP($scope.busca.id_projeto,$scope.busca);
		}

		$scope.onEmitirLdpClick = function(){
			GDoksFactory.emitirLDP($scope.busca.id_projeto,$scope.busca);	
		}

		$scope.onOpenClick = function(id){
			$location.path('/documentos/'+id);
		}

		$scope.onFirstPageClick = function(){
			if($scope.busca.pagAtual > 1){
				$scope.busca.pagAtual=1;
				$scope.buscarDocumentos();
			}
		}

		$scope.onPreviousPageClick = function(){
			if($scope.busca.pagAtual > 1){
				$scope.busca.pagAtual--;
				$scope.buscarDocumentos();
			}
		}

		$scope.onNextPageClick = function(){
			if($scope.busca.pagAtual < $scope.totPaginas){
				$scope.busca.pagAtual++;
				$scope.buscarDocumentos();
			}
		}

		$scope.onLastPageClick = function(){
			if($scope.busca.pagAtual < $scope.totPaginas){
				$scope.busca.pagAtual=$scope.totPaginas;
				$scope.buscarDocumentos();
			}
		}

		$scope.onBuscarDocumentoClick = function(){
			$scope.busca.pagAtual = 1;
			$scope.buscarDocumentos();
		}

		// Função de busca
		$scope.buscarDocumentos = function(){
			
			// Salvando busca num cookie
			$cookies.putObject('busca',$scope.busca,{'expires':new Date((new Date()).getTime() + DURACAO_DA_BUSCA)});

			// Mostra carregando
			$scope.root.carregando = true;

			// Mandando fazer busca
			GDoksFactory.buscarDocumentos($scope.busca)
			.success(function(response){
				// Esconde Carregando
				$scope.root.carregando = false;

				// Carregando os documentos
				$scope.documentos = response.documentos;

				// Parsing
				for (var i = $scope.documentos.length - 1; i >= 0; i--) {
					$scope.documentos[i].data_limite = ($scope.documentos[i].data_limite?new Date($scope.documentos[i].data_limite+'T00:00'):null);
					$scope.documentos[i].ua = ($scope.documentos[i].ua?new Date($scope.documentos[i].ua):null);
				}

				// determinando o total de páginas
				$scope.totPaginas = Math.ceil(response.total/response.npp);
			})
			.error(function(error){
				// Esconde Carregando
				$scope.root.carregando = false;
			});
		}

		// Verificando se o cookie da busca está definido
		if($cookies.getObject('busca') == undefined){
			// sem cookie de busca. definindo valores padrão na mão
			$scope.busca = {
				nome:'',
				ordem:'nome',
				id_cliente:undefined,
				id_projeto:undefined,
				id_area:undefined,
				id_subarea:undefined,
				id_disciplina:undefined,
				id_subdisciplina:undefined,
				completude: 3,
				validacao: 3,
				pagAtual:1,
				emitido:2
			};
		} else {
			// Busca no cookie. Carregando
			$scope.busca = $cookies.getObject('busca');
			$scope.busca.validacao = 3; // <==== remover linha depois de reinserir opção de buscar documento pela validacao
			$scope.buscarDocumentos();
		}
	}

	// Definindo função filter
	function daysFromNow(){
		return function(futureDate){
			if(futureDate == null){
				return '';
			} else {
				var diff = Math.ceil((futureDate - (new Date()))/86400000);
				if(diff == 1){
					return ('1 dia restante');
				} else if(diff > 1){
					return (diff + ' dias restantes');
				} else if(diff == 0) {
					return 'Hoje';
				} else if(diff == -1 ) {
					return ('1 dia atrás');
				} else {
					return ((-diff) + ' dias atrás');
				}
			}
		}
	}

})();