(function(){

	// Atribuindo o controller para o módulo 'ProjetosDocumentosController'
	angular.module('Projetos').controller('ProjetosDocumentosController',ProjetosDocumentosController);
	
	// Definindo o controller
	function ProjetosDocumentosController($scope,GDoksFactory,$mdExpansionPanel,$mdDialog){
		
		$scope.collapsePanel = function(index){
			$mdExpansionPanel('panel_'+index).collapse();
		}

		$scope.openDocumentoDialog = function(evt,idDoc){

			// Definindo o objeto documento que foi clicado
			if(idDoc == 0) {
				$scope.docSelecionado = {
					id:0,
					nome:null,
					codigo:null,
					dependencias:[],
					hhs: [],
					subdisciplina:null,
					subarea:null,
					data_limite:null
				};
			} else {
				$scope.docSelecionado = $scope.projeto.documentos.find(function(d){return d.id == this},idDoc);
			}

			// Atribuindo o id_projeto ao documento
			$scope.docSelecionado.id_projeto = $scope.projeto.id;

			$mdDialog.show(
				{
					controller: dialogController,
					locals:{
						disciplinas: angular.copy($scope.disciplinas),
						areas: angular.copy($scope.projeto.areas),
						subareas: angular.copy($scope.projeto.subareas),
						doc: angular.copy($scope.docSelecionado),
						documentos: angular.copy($scope.projeto.documentos),
						cargos:$scope.cargos,
						parentScope:$scope
					},
					templateUrl: './app/modules/Documentos/doc-dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:false
				}
			)
			.then(function(answer) {
				//console.log(answer + "<<");
				//$scope.status = 'You said the information was "' + answer + '".';
			}, function(answer) {
				//$scope.status = 'You cancelled the dialog.';
				console.log(answer + "<<<<");
			});
		}

		function dialogController($scope,disciplinas,areas,subareas,doc,documentos,cargos,parentScope){
			
			// Copiando doc para o scope
			$scope.doc = doc;
			delete doc;

			// Copiando as disciplinas para o scope
			$scope.disciplinas = disciplinas;
			delete disciplinas;

			// Copiando áreas para scope
			$scope.areas = areas;
			delete areas;

			// Copiando subareas para o scope
			$scope.subareas = subareas;
			delete subareas;

			// Copiando cargos para o scope
			$scope.cargos = cargos;
			delete cargos;

			// inserindo um objeto hh ao final do vetor de hh's
			$scope.doc.hhs.push({cargo:null,hh:1});

			// Determinando o valor da disciplina selecionada
			$scope.disciplinaSelecionada = (doc.id==0 ? null : $scope.disciplinas.find(
																					function(a){
																						return a.id == this
																					},
																					$scope.doc.subdisciplina.disciplina.id
																				 ));

			// Linkando doc.subdisciplina a um elemento de disciplinaSelecionada.subs
			$scope.doc.subdisciplina = (doc.id==0 ? null : $scope.disciplinaSelecionada.subs.find(
																			function(a){
																				return a.id==this;
																			},$scope.doc.subdisciplina.id
																		));
			// Determinando o valor da area selecionada
			$scope.areaSelecionada = (doc.id==0 ? null : $scope.areas.find(
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

				// Verificando se é inserção de documento ou atualização pelo id
				if(doc.id == 0){
					// Inserir novo documento
					GDoksFactory.adicionarDocumento(doc)
					.success(function(response){

						// Atribuindo id ao novo documento
						documento.id = response.newId;

						// Adicionando novo documento ao vetor de documentos do projeto
						parentScope.projeto.documentos.push(documento)

						// Fechando caixa de diálogo
						$mdDialog.hide();
						
					})
					.error(function(err){
						console.log(err);
					});

				} else {
					// Atualizar documento existente
					GDoksFactory.alterarDocumento(doc)
					.success(function(response){
						
						// Determinando a posição do objeto atual
						var pos = parentScope.projeto.documentos.findIndex(function(a){return a.id == this},documento.id);

						// Substituindo o objeto antigo pelo atualizado agora
						parentScope.projeto.documentos.splice(pos,1,documento);

						// Fechando caixa de diálogo
						$mdDialog.hide();
						
					})
					.error(function(err){
						console.log(err);
					});
				}				
			}

			$scope.addNewHH = function(){
				$scope.doc.hhs.push({cargo:null,hh:1});
			}

			$scope.removeHH = function(pos){
				$scope.doc.hhs.splice(pos,1);
			}

			$scope.salvarDocumento = function(){
				var doc = {
					id:$scope.documentoEditado.id,
					nome:$scope.documentoEditado.nome,
					id_subdisciplina:$scope.srcSubdisciplinas.selected.id,
					id_area:$scope.srcAreas.selected.id,
					id_projeto:$scope.projeto.id,
					dependencias:$scope.documentoEditado.dependencias.map(function(d){return d.id}),
					data_limite	:$scope.documentoEditado.data_limite
				};
				
				if(doc.id != 0){
					GDoksFactory.alterarDocumento(doc)
					.success(
						function(response){
							var docAlterado = $scope.projeto.documentos.filter(function(a){return a.id == this},doc.id)[0];
							docAlterado.nome				= $scope.documentoEditado.nome;
							docAlterado.id_area				= $scope.documentoEditado.id_area;
							docAlterado.nome_area			= $scope.documentoEditado.nome_area;
							docAlterado.id_subdisciplina	= $scope.documentoEditado.id_subdisciplina;
							docAlterado.nome_subdisciplina	= $scope.documentoEditado.nome_subdisciplina;
							docAlterado.id_disciplina		= $scope.documentoEditado.id_disciplina;
							docAlterado.nome_disciplina		= $scope.documentoEditado.nome_disciplina;
							docAlterado.dependencias		= angular.copy($scope.documentoEditado.dependencias);
							docAlterado.data_limite			= $scope.documentoEditado.data_limite;
							$scope.documentoEditado = null;
						}
					)
					.error(
						function(error){

						}
					);
				} else {
					GDoksFactory.adicionarDocumento(doc)
					.success(
						function(response){
							delete $scope.documentoEditado.id_projeto;
							$scope.documentoEditado.id = response.newId;
							$scope.documentoEditado = null;
						}
					)
					.error(
						function(error){

						}
					);
				}
			}

			$scope.removerDocumento = function(doc){
				if(confirm("Tem certeza que deseja remover o documento "+doc.nome+" do projeto "+$scope.projeto.nome+"?\nEssa ação não poderá ser desfieta.")){
				doc.id_projeto = $scope.projeto.id;
					GDoksFactory.removerDocumento(doc)
						.success(
							function(response){
								$scope.projeto.documentos = $scope.projeto.documentos.filter(function(a){ return a.id != this},doc.id);
								// removendo as relações dedependencia com o documento removido
								for (var i = $scope.projeto.documentos.length - 1; i >= 0; i--) {
									$scope.projeto.documentos[i].dependencias = $scope.projeto.documentos[i].dependencias.filter(function(a){return a.id != this},doc.id);
								}
							}
						)
						.error(
							function(error){

							}
						);
				}
			}
		}
	}
})()