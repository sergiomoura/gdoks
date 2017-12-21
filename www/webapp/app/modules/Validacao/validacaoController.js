(function(){
	// Definindo módulo
	var module = angular.module('Validacao',[]);

	// Definindo a função controller
	var ValidacaoController = function($scope,GDoksFactory,$mdToast,$location){

		// Iniciando variáveis do escopo
		$scope.documentos = [];
		$scope.todosSelecionados = true;

		// Função que carrega documentos a validar do usuário atual
		(function(){
			GDoksFactory.getDocumentosParaValidar()
			.success(function(response){
				$scope.documentos = response.documentos.map(function(d){
					d.validar=true;
					return d;
				});
				$scope.todosSelecionados = true;
			})
			.error(function(response){
				if(response.error == 1){
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Token expirou. Faça o login novamente.')
						.position('bottom left')
						.hideDelay(5000)
					);
				} else {
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Um erro ocorreu. Não foi possível levantar documentos.')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(response);
				}
			});
		})();

		$scope.goToDoc = function(idDoc){
			$location.url('/documentos/'+idDoc);
		}

		$scope.baixarPDA = function(idPDA){
			GDoksFactory.baixarPDA(idPDA);
		}

		$scope.toggleSelecionados = function(){
			for (var i = $scope.documentos.length - 1; i >= 0; i--) {
				$scope.documentos[i].validar = !$scope.todosSelecionados;
			}
		}

		$scope.setTodosSelecionados = function(){
			setTimeout(function(){
				$scope.todosSelecionados = true;
				for (var i = $scope.documentos.length - 1; i >= 0; i--) {
					$scope.todosSelecionados = $scope.todosSelecionados && $scope.documentos[i].validar;
				}
				$scope.$apply();
			},10);
		}

		$scope.validar = function(){
			// Mostrar carregando
			$scope.root.carregando = true;

			// Filtrando documentos que serão validados
			var docsParaValidar = angular.copy($scope.documentos.filter(function(a){return a.validar}));

			// Removendo informações inúteis
			docsParaValidar = docsParaValidar.map(function(doc){
				delete doc.id_disciplina;
				delete doc.nome_disciplina;
				delete doc.sigla_disciplina;
				delete doc.id_subdisciplina;
				delete doc.nome_subdisciplina;
				delete doc.codigo;
				delete doc.nome;
				delete doc.id_especialista;
				delete doc.sigla_especialista;
				delete doc.validar;
				return doc;
			})

			// Requisitando validação
			GDoksFactory.validarProgressos(docsParaValidar)
			.success(function(response){
				// Escondendo o carregando
				$scope.root.carregando = false;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Progressos validados com sucesso!')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Removendo os validados
				$scope.documentos = $scope.documentos.filter(function(a){return !a.validar});
			})
			.error(function(err){
				// Escondendo o carregando
				$scope.root.carregando = false;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Ocorreu uma falha ao tentar realizar validação')
					.position('bottom left')
					.hideDelay(5000)
				);

				// imprimindo erro no console
				console.warn(err);
			})
		}
	}

	// Definindo controller do módulo
	module.controller('ValidacaoController',ValidacaoController);

})();


