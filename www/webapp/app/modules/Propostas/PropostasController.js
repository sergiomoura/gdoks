(function(){

	// Definindo o módulo
	var module = angular.module('Propostas',[]);

	// Atribuindo controllers
	module.controller('PropostasController', PropostasController);
	module.controller('PropostaController',PropostaController);

	// Definindo o controller
	function PropostasController($scope,GDoksFactory,$mdToast,$location){

		// Definindo variáveis do scope
		$scope.clientes = null;
		$scope.propostas = null;
		$scope.busca = {
			codigo:'',
			de:null,
			ate:null,
			cliente:null
		}
		// Carregando clientes da base de dados
		GDoksFactory.getClientes()
		.success(function(response){
			$scope.clientes = response.clientes;
			parsePropostas();
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent(error.msg)
				.position('bottom left',error.msg)
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(error);
		});

		// Carregando propostas
		GDoksFactory.getUltimasPropostas()
		.success(function(response){
			$scope.propostas = response.ultimasPropostas;
			parsePropostas();
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Falha ao tentar corregar propostas')
				.position('bottom left')
				.hideDelay(5000)
			);
		});

		// Função que leva até a página da proposta
		$scope.goToProposta = function(id_proposta){
			$location.url('propostas/'+id_proposta);
		}


		// Definindo função que repassa as propostas atribuindo-lhes o cliente
		function parsePropostas(){
			if($scope.propostas!=null && $scope.clientes!=null){
				for (var i = $scope.propostas.length - 1; i >= 0; i--) {
					$scope.propostas[i].cliente = $scope.clientes.find(function(a){return a.id == this},$scope.propostas[i].id_cliente);
					$scope.propostas[i].emissao = ($scope.propostas[i].emissao == null? null : new Date($scope.propostas[i].emissao));
					$scope.propostas[i].criacao = ($scope.propostas[i].criacao == null? null : new Date($scope.propostas[i].criacao));
					$scope.propostas[i].aprovacao = ($scope.propostas[i].aprovacao == null? null : new Date($scope.propostas[i].aprovacao));
				}
			}
		}
		
	}

	function PropostaController($scope,GDoksFactory,$routeParams,$mdToast){

		// Lendo id da proposta do routParam
		var id_proposta = $routeParams.id;

		// Definindo valores iniciais para proposta e clientes
		$scope.proposta = null;
		$scope.clientes = null;

		// Carregando clientes da base de dados
		GDoksFactory.getClientes()
		.success(function(response){
			$scope.clientes = response.clientes;
			parseProposta();
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent(error.msg)
				.position('bottom left',error.msg)
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(error);
		});

		// Verificando se é uma nova proposta ou se é uma proposta existente
		if(id_proposta == 0){
			$scope.proposta = {
				id:0,
				id_cliente:0,
				codigo:'',
				versoes:[]
			}
		} else {
			// Carregando proposta da base de dados
			GDoksFactory.getProposta(id_proposta)
			.success(function(response){
				$scope.proposta = response.proposta;
				parseProposta();
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar a proposta: '+error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			});
		}

		function parseProposta(){
			if($scope.proposta != null && $scope.clientes!= null){
				// Atribuindo cliente
				if($scope.proposta.id_cliente != 0){
					$scope.proposta.cliente = $scope.clientes.find(function(c){return c.id==this},$scope.proposta.id_cliente);
				} else {
					$scope.proposta.cliente = null;
				}

				// Parsing datas de versões
				var v;
				for (var i = $scope.proposta.versoes.length - 1; i >= 0; i--) {
					v = $scope.proposta.versoes[i];
					v.criacao = new Date(v.criacao);
					v.emissao = new Date(v.emissao);
					v.aprovacao = (v.aprovacao == null? null : new Date(v.aprovacao));
				}
			}
		}
	}

})();