angular.module('Projetos').controller('ProjetosFinanceiroController',ProjetosFinanceiroController);
function ProjetosFinanceiroController($scope,GDoksFactory,$mdToast,$routeParams){
	
	// Lendo id do projeto da rota
	var id_projeto = $routeParams.id;

	// Definindo objeto dados financeiros
	$scope.dadosFinanceiros = undefined;

	// Definindo opções de forma de cobrança
	$scope.opcoesDeFormaDeCobranca = [
		{
			id:1,
			nome:'Por projeto'
		},
		{
			id:2,
			nome:'Por documento'
		}
	]

	// Carregando dados financeiros do projeto
	if(id_projeto != 0){
		GDoksFactory.getDadosFinanceirosDoProjeto(id_projeto)
		.success(function(response){
			$scope.dadosFinanceiros = {};
			if(response.dadosFinanceiros.forma_de_cobranca != undefined){
				var idFormaDeCobranca = response.dadosFinanceiros.forma_de_cobranca;
				$scope.dadosFinanceiros.forma_de_cobranca = $scope.opcoesDeFormaDeCobranca.find(function(a){
					return a.id == this;
				},idFormaDeCobranca);
			}
			if(response.dadosFinanceiros.valor != undefined){
				$scope.dadosFinanceiros.valor = 1*response.dadosFinanceiros.valor;
			}
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Não foi possível carregar informações financeiras do projeto: ' + error.msg)
				.position('bottom left')
				.hideDelay(5000)
			);

			// Imprimindo no console o erro retornado
			console.warn(error);
		});
	} else {
		$scope.dadosFinanceiros = {
			forma_de_cobranca:$scope.opcoesDeFormaDeCobranca[1],
			valor:undefined
		};
	}

	// Definindo função que salva dados financeiros
	$scope.salvar = function(){
		GDoksFactory.salvaDadosFinanceirosDoProjeto(id_projeto,$scope.dadosFinanceiros)
		.success(function(response){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Dados financeiros alterados com sucesso')
				.position('bottom left')
				.hideDelay(5000)
			);
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Não foi possível salvar informações financeiras do projeto: ' + error.msg)
				.position('bottom left')
				.hideDelay(5000)
			);

			// Imprimindo no console o erro retornado
			console.warn(error);
		})
	}
}