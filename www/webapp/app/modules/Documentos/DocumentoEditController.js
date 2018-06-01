(function(){
	// Carregando módulo de documentos
	var module = angular.module('Documentos');

	// Atribuindo o controller
	module.controller('DocumentoEditController', DocumentoEditController);

	// Defininfo controller
	function DocumentoEditController($scope,$routeParams,GDoksFactory,$mdToast,$cookies,$location){

		// Lendo o id da rota
		var id = $routeParams.id;

		// Definindo o documento incialmente como null
		$scope.doc = null;

		// Definindo global para guardar documentos do projeto
		var documentos = null;
		
		if(id == 0){
			// Criando documento vazio para salvamento
			$scope.doc = {
				"id":0,
				"nome":"",
				"codigo":"",
				"idu_checkout":null,
				"sigla_checkout":null,
				"datahora_do_checkout":null,
				"id_subdisciplina":null,
				"nome_subdisciplina":null,
				"id_disciplina":null,
				"nome_disciplina":null,
				"id_subarea":null,
				"nome_subarea":null,
				"cod_subarea":null,
				"id_area":null,
				"nome_area":null,
				"id_projeto":$routeParams.id_projeto,
				"nome_projeto":"",
				"projeto_ativo":1,
				"trabalho_estimado":0,
				"ehEspecialista":false,
				"ehValidador":true,
				"revisoes":[],
				"grds":[]
			}
		} else {
			// Carregando documento da base
			GDoksFactory.getDocumento(id)
			.success(function(response){
				$scope.doc = response.documento;

				// Carregando áreas
				GDoksFactory.getAreas($scope.doc.id_projeto)
				.success(function(response){
					$scope.areas = response.areas;
					$scope.areas.selecionada = $scope.areas.find(function(a){return a.id == this},$scope.doc.id_area);
					$scope.areas.selecionada.subareas.selecionada = $scope.areas.selecionada.subareas.find(function(a){return a.id == this},$scope.doc.id_subarea);
				})
				.error(function(error){
					// Retornando Toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha ao tentar carregar áreas do projeto')
						.position('bottom left')
						.hideDelay(5000)
					);
				});

				// Carregando disciplinas
				GDoksFactory.getDisciplinas()
				.success(function(response){
					$scope.disciplinas = response.disciplinas;
					$scope.disciplinas.selecionada = $scope.disciplinas.find(function(a){return a.id==this},$scope.doc.id_disciplina);
					$scope.disciplinas.selecionada.subs.selecionada = $scope.disciplinas.selecionada.subs.find(function(a){return a.id==this},$scope.doc.id_subdisciplina);
				})
				.error(function(error){
					// Retornando Toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha ao tentar carregar disciplinas.')
						.position('bottom left')
						.hideDelay(5000)
					);
				});

				// Carregando documentos de projeto
				GDoksFactory.getDocumentosDoProjeto($scope.doc.id_projeto)
				.success(function(response){
					// removendo o próprio documento 
					var index = response.documentos.findIndex(function(a){return a.id==this},$scope.doc.id);
					response.documentos.splice(index,1);
					documentos = response.documentos;
					
					// Determinando quais documentos são dependencias possíveis
					$scope.dependenciasPossiveis = getDependenciasPossiveis($scope.doc);

					// Linkando atuais dependencias às dependencias possíveis
					for (var i = $scope.doc.dependencias.length - 1; i >= 0; i--) {
						$scope.doc.dependencias[i] = $scope.dependenciasPossiveis.find(function(a){return a.id==this},$scope.doc.dependencias[i].id);
					}
				})
				.error(function(error){
					// Retornando Toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha ao carregar documentos de projeto')
						.position('bottom left')
						.hideDelay(5000)
					);
				});
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar carregar documento.')
					.position('bottom left')
					.hideDelay(5000)
				);
			});
		}

		// Funções auxiliares para determinação de dependências possíveis= = = = = = = = =

			// Determinando lista de possíveis dependentes
			function getDependenciasPossiveis(doc){
				var result = documentos.filter(
					function(d){
						// calculando condicao de nao ser ancestral
						//var naoEAncestral = ancestraisDeDoc(this).indexOf(d.id) == -1;

						// calculando condição de não ser descendente
						var naoEDescendente = descendentesDeDoc(this).indexOf(d.id) == -1;

						// calculando condicao de evitar documento próprio
						var docDiferente = d.id != this.id;

						return naoEDescendente && docDiferente;
					},doc);
				return result;
			}

			// Função que retorna vetor com todos os ancestrais de um documento (dependências)
			function ancestraisDeDoc(doc){
				if(doc.dependencias.length == 0){
					return [];
				} else {
					var dep = doc.dependencias.map(function(d){return d.id});
					for (var i = doc.dependencias.length - 1; i >= 0; i--) {
						dep = dep.concat(ancestraisDeDoc(doc.dependencias[i]));
					}
					return dep;
				}
			}

			function docEhAncestralDeFilho(pai,filho){
				return ancestraisDeDoc(filho).indexOf(pai.id) != -1
			}

			function descendentesDeDoc(doc){
				return documentos.filter(function(filho){
					return docEhAncestralDeFilho(this,filho)
				},doc).map(function(a){return a.id});
			}
		// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
		
	}
})();