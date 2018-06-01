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

			// Carregando áreas
			loadArea();
		} else {
			// Carregando documento da base
			GDoksFactory.getDocumento(id)
			.success(function(response){
				$scope.doc = response.documento;

				// Carregando áreas
				loadArea();
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

		// Definindo função que carrega áreas e subareas
		function loadArea(){
			GDoksFactory.getAreas($scope.doc.id_projeto)
			.success(function(response){})
			.error(function(error){})
		}
		// Carregando disciplinas e subs

		// Carregando cargos

		// inserindo um objeto hh ao final do vetor de hh's
		//$scope.doc.hhs.push({cargo:null,hh:1});

		/*
		// Determinando o valor da disciplina selecionada
		$scope.disciplinaSelecionada = ( (doc.id==0 && !copy) ? null : $scope.disciplinas.find(
																				function(a){
																					return a.id == this
																				},
																				$scope.doc.subdisciplina.disciplina.id
																			 ));
		// Linkando doc.subdisciplina a um elemento de disciplinaSelecionada.subs
		$scope.doc.subdisciplina = ( (doc.id==0 && !copy) ? null : $scope.disciplinaSelecionada.subs.find(
																		function(a){
																			return a.id==this;
																		},$scope.doc.subdisciplina.id
																	));


		// Determinando o valor da area selecionada
		$scope.areaSelecionada = ( (doc.id==0 && !copy) ? null : $scope.areas.find(
												function(a){
													return a.id == this
												}, $scope.doc.subarea.area.id));
		

		// Construindo vertor de subareas de area selecionada
		$scope.subareasDeAreaSelecionada = [{}];
		$scope.setSubareasDeAreaSelecionada = function(){
			if($scope.areaSelecionada != null){
				$scope.subareasDeAreaSelecionada = $scope.subareas.filter(function(a){return a.area.id==this},$scope.areaSelecionada.id);
			} else {
				$scope.subareasDeAreaSelecionada = [];
			}
		}
		$scope.setSubareasDeAreaSelecionada();

		// Linkando doc.subarea com um elemento de subareasDeAreaSelecionada
		$scope.doc.subarea = ($scope.doc.subarea==null ? null : $scope.subareasDeAreaSelecionada.find(
												function(a){
													return a.id == this
												},$scope.doc.subarea.id
		));

		// Determinando quais documentos são dependencias possíveis
		$scope.dependenciasPossiveis = getDependenciasPossiveis($scope.doc);

		// Linkando atuais dependencias às dependencias possíveis
		for (var i = $scope.doc.dependencias.length - 1; i >= 0; i--) {
			$scope.doc.dependencias[i] = $scope.dependenciasPossiveis.find(function(a){return a.id==this},$scope.doc.dependencias[i].id);
		}

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

		// Linkando Cargos das HHs com os elementos do vetor de cargos
		for (var i = $scope.doc.hhs.length - 1; i >= 0; i--) {
			if($scope.doc.hhs[i].cargo!=null){
				$scope.doc.hhs[i].cargo = $scope.cargos.find(function(a){return a.id==this},$scope.doc.hhs[i].cargo.id);
			}
		}

		// Função que cancela e esconde o dialog
		$scope.cancelar = function(){
			$mdDialog.hide();
		}

		$scope.salvar = function(documento){
			// Mostrando carregando
			parentScope.root.carregando = true;

			// Fazendo cópia do objeto documento
			doc = angular.copy(documento);

			// Removendo campos desnecessários
			doc.id_subdisciplina = doc.subdisciplina.id;
			delete doc.subdisciplina;

			doc.id_subarea = doc.subarea.id;
			delete doc.subarea;

			doc.dependencias = doc.dependencias.map(function(a){return a.id});

			doc.hhs = doc.hhs.filter(function(a){
				return a.cargo != null;
			});

			doc.hhs = doc.hhs.map(function(a){
				a.id_cargo = a.cargo.id;
				delete a.cargo;
				return a;
			});

			// Limpando HHs de cargo nulo do documento
			documento.hhs = documento.hhs.filter(function(a){
				return a.cargo != null;
			});				

			// Verificando se é inserção de documento ou atualização pelo id
			if(doc.id == 0){
				// Inserir novo documento
				GDoksFactory.adicionarDocumento(doc)
				.success(function(response){
					// Esconde carregando
					parentScope.root.carregando = false;

					// Atribuindo id ao novo documento
					documento.id = response.newId;
					documento.rev_serial = 1;

					// Se for uma clonagem, anulando o ultimo pda
					if(copy) {documento.ultimo_pda=null;}

					// Parsing subdisciplina do documento
					var achouSub = false;
					var j = 0;
					while(j<$scope.disciplinas.length && !achouSub){
						k = 0;
						while(k<$scope.disciplinas[j].subs.length && !achouSub){
							achouSub = ($scope.disciplinas[j].subs[k].id == documento.subdisciplina.id);
							if(achouSub){
								documento.subdisciplina.disciplina = $scope.disciplinas[j];
							}
							k++;
						}
						j++;
					}

					// Adicionando novo documento ao vetor de documentos do projeto
					parentScope.projeto.documentos.push(documento)

					// Fechando caixa de diálogo
					$mdDialog.hide();

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Documento cadastrado com sucesso!')
						.position('bottom left')
						.hideDelay(5000)
					);

				})
				.error(function(err){

					// Mostrando erro no console
					console.warn(err);

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível completar a ação.')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Esconde carregando
					parentScope.root.carregando = false;
				});
			} else {
				// Atualizar documento existente
				GDoksFactory.alterarDocumento(doc)
				.success(function(response){
					// Esconde carregando
					parentScope.root.carregando = false;
					
					// Determinando a posição do objeto atual
					var pos = parentScope.projeto.documentos.findIndex(function(a){return a.id == this},documento.id);

					// Substituindo o objeto antigo pelo atualizado agora
					parentScope.projeto.documentos.splice(pos,1,documento);

					// Fechando caixa de diálogo
					$mdDialog.hide();

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Cadastro do documento alterado com sucesso!')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Esconde carregando
					parentScope.root.carregando = false;
					
				})
				.error(function(err){

					// Mostrando o erro no console
					console.warn(err);

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível completar a ação.')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Esconde carregando
					parentScope.root.carregando = false;
				});
			}				
		}

		$scope.addNewHH = function(){
			$scope.doc.hhs.push({cargo:null,hh:1});
		}

		$scope.removeHH = function(pos){
			$scope.doc.hhs.splice(pos,1);
		*/
	}
})();