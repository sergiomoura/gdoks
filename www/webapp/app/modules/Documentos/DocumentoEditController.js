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
				"grds":[],
				"hhs":[]
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

				// Carregando Cargos
				GDoksFactory.getCargos()
				.success(function(response){
					$scope.cargos = response.cargos;
				})
				.error(function(error){
					// Retornando Toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha ao tentar carregar cargos.')
						.position('bottom left')
						.hideDelay(5000)
					);
				});

				// Carregando documentos de projeto
				GDoksFactory.getDocumentosDoProjeto($scope.doc.id_projeto)
				.success(function(response){

					// Salvando resposta do servidor
					documentos = response.documentos;

					// Determinando quais documentos são dependencias possíveis
					$scope.dependenciasPossiveis = getDependenciasPossiveis();

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

		// Funções de escopo
		$scope.removeHH = function(i){
			$scope.doc.hhs.splice(i,1);
		}

		$scope.addNewHH = function(){
			$scope.doc.hhs.push({id_cargo:undefined,hh:1});
		}

		// Funções auxiliares para determinação de dependências possíveis= = = = = = = = =

			// Determinando lista de possíveis dependentes
			function getDependenciasPossiveis(){
				
				// Determinando descendentes
				var descendentes = descendentesDeDoc($scope.doc.id);

				// Nós impossíveis
				var impossiveis = descendentes.concat([$scope.doc.id]);

				// Determinando os possíveis
				var possiveis = [];
				for (let i = 0; i < documentos.length; i++) {
					if(impossiveis.indexOf(documentos[i].id) == -1){
						possiveis.push(documentos[i]);
					}					
				}

				return possiveis;
			}

			// Função que retorna vetor com todos os ancestrais de um documento (dependências)
			function ancestraisDeDoc(doc_id){
				
				// Determinando ancestrais diretos
				var ancestrais = documentos.find(function(a){return a.id == this}, doc_id).dependencias;

				// Recursão
				if(ancestrais.length == 0){
					
					// Documento não possui ancestrais. Retornando vetor vazio. Fim da recursão
					return [];

				} else {
					// Determinando ancestrais de ancestrais
					var ada = ancestrais.map(ancestraisDeDoc);
					ada = [].concat.apply([],ada);

					return ancestrais.concat(ada);
				}
			}

			function descendentesDeDoc(doc_id){

				// Definindo vetor de descendentes
				var descendentes = [];

				// Determinando os descendentes diretos
				for (let i = 0; i < documentos.length; i++) {
					if(documentos[i].dependencias.indexOf(doc_id) != -1){
						descendentes.push(documentos[i].id);
					}
				}

				// Recursão
				if(descendentes.length == 0){
					return [];
				} else {
					var ddd = descendentes.map(descendentesDeDoc); // Descendentes de Descendentes
					ddd = [].concat.apply([], ddd);

					return descendentes.concat(ddd);
				}
			}
		// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
		
	}
})();