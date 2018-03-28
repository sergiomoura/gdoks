(function(){

	// Atribuindo o controller para o módulo 'ProjetosDocumentosController'
	angular.module('Projetos').controller('ProjetosDocumentosController',ProjetosDocumentosController);
	
	// Definindo o controller
	function ProjetosDocumentosController($scope,GDoksFactory,$mdExpansionPanel,$mdDialog,$mdToast,Upload,$cookies,$timeout){
		
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
					codigo_cliente:null,
					codigo_alternativo:null,
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

		$scope.openRemoverConfirm = function(ev,documento) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Tem certeza que deseja remover o cadastro deste documento?')
				.textContent('A ação não poderá ser desfeita.')
				.ariaLabel('Deseja remover cadastro de documento?')
				.targetEvent(ev)
				.ok('Sim')
				.cancel('Não');

			$mdDialog.show(confirm).then(
				function() {
					// Mostra carregando
					$scope.root.carregando = true;

					documento.id_projeto = $scope.projeto.id;
					GDoksFactory.removerDocumento(documento)
					.success(function(response){

						// Esconde carregando
						$scope.root.carregando = false;
						
						// Localizando o index do documento excluído do projeto
						var pos = $scope.projeto.documentos.findIndex(function(a){return a.id==this},documento.id);

						// Removendo o documento do vetor de documentos do projeto
						$scope.projeto.documentos.splice(pos,1);

						// Retornando Toast para usuário!
						$mdToast.show(
							$mdToast.simple()
							.textContent('Documento removido com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);
					})
					.error(function(error){
						
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para usuário!
						$mdToast.show(
							$mdToast.simple()
							.textContent('Falha ao tentar remover documento: ' + error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);
					});
				}
			);
		};

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
			}
		}

		$scope.baixarModeloParaImportacao = function(){
			GDoksFactory.baixarModeloParaImportacao($scope.projeto.id);
		}

		//$scope.UploadXlsx = function($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event){
		$scope.UploadXlsx = function(file, errFiles){
			
			$scope.f = file;
		    $scope.errFile = errFiles && errFiles[0];
		    if (file) {
		        file.upload = Upload.upload({
		        	url: API_ROOT+'/projetos/'+$scope.projeto.id+'/importarLDP/',
		            data: {file: file},
		            headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
		        });

		        file.upload.then(
		        	function (response) {
		            	$timeout(function () {
		                	file.result = response.data;
		                	console.dir(response.data);
		            	});
		        	},
		        	function (response) {
		            	if (response.status > 0)
		                	$scope.errorMsg = response.status + ': ' + response.data;
		        	},
		        	function (evt) {
		            	file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		        	}
		        );
		    }
		}

	}
})()