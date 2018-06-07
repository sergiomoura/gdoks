(function(){

	// Atribuindo o controller para o módulo 'ProjetosDocumentosController'
	angular.module('Projetos').controller('ProjetosDocumentosController',ProjetosDocumentosController);
	
	// Definindo o controller
	function ProjetosDocumentosController($scope,GDoksFactory,$mdExpansionPanel,$mdDialog,$mdToast,Upload,$cookies,$timeout){

		// Definindo criticas
		$scope.criticas = [];

		$scope.openDocumentoDialog = function(evt,id_doc,clonar){


			$mdDialog.show(
				{
					controller: dialogController,
					locals:{
						disciplinas: angular.copy($scope.disciplinas),
						areas: angular.copy($scope.projeto.areas),
						id_doc: id_doc,
						documentos: angular.copy($scope.projeto.documentos),
						cargos:$scope.cargos,
						parentScope:$scope,
						copy:clonar
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

		function dialogController($scope,disciplinas,id_doc,documentos,cargos,parentScope,copy,GDoksFactory){

			// Copiando as disciplinas para o scope
			$scope.disciplinas = disciplinas;
			delete disciplinas;
			
			// Copiando cargos para o scope
			$scope.cargos = cargos;
			delete cargos;

			// Associoando áreas e subáreas do parentScope no scope local
			(function(){

				// Copiando áreas e subáreas do parentScope
				var areas = angular.copy(parentScope.projeto.areas);
				var subareas = angular.copy(parentScope.projeto.subareas);

				// Criando propriedade subareas em cada área
				areas = areas.map(function(a){
					a.subareas = [];
					return a;
				})

				// Percorrendo subáreas e associando cada uma delas a sua área
				var sub;
				for (var i = 0; i < subareas.length; i++) {
					sub = subareas[i];
					areas.find(function(a){return a.id == this},sub.area.id).subareas.push(sub);
				}

				// Definindo o vetor de áreas com subareas no scope local
				$scope.areas = areas;
				
			})();

			// Mapeando vetor de dependências para somente ids
			for (let i = 0; i < documentos.length; i++) {
				documentos[i].dependencias = documentos[i].dependencias.map(function(a){return a.id});
			}
			
			if(id_doc == 0){

				// Criando documento vazio
				$scope.doc = {
					"id":0,
					"nome":null,
					"codigo":null,
					"codigo_cliente":null,
					"codigo_alternativo":null,
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
					"id_projeto":parentScope.projeto.id,
					"nome_projeto":parentScope.projeto.nome,
					"projeto_ativo":parentScope.projeto.ativo,
					"trabalho_estimado":"0",
					"id_cliente":null,
					"nome_cliente":null,
					"fantasia_cliente":null,
					"ehEspecialista":null,
					"ehValidador":null,
					"revisoes":[],
					"grds":[],
					"dependencias":[],
					"hhs":[]
				}

				// Executando função de documento carregado
				onDocumentoCarregado();

			} else {
				
				// Mostra carregando
				parentScope.carregando = true;

				GDoksFactory.getDocumento(id_doc)
				.success(function(response){
					
					// Esconde carregando
					parentScope.carregando = false;

					// Lendo resposta para o escopo
					$scope.doc = response.documento;

					// Se for para clonar documento, alterando o seu código e zerando id
					if(copy){
						$scope.doc.id = 0;
						$scope.doc.codigo = '[CÓPIA]-' + $scope.doc.codigo;
					}

					// Executando função documento carregado
					onDocumentoCarregado();

				})
				.error(function(error){

					// Esconde carregando
					parentScope.carregando = false;

					// Escondendo diálogo
					$mdDialog.hide();

					// Retornando Toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível carregar documento.')
						.position('bottom left')
						.hideDelay(5000)
					);
				});
				
			}

			/**
			 * Função a ser executada quando o documento é definido.
			 */
			function onDocumentoCarregado(){
				
				// Parsing datas das revisões
				for (let i = 0; i < $scope.doc.revisoes.length; i++) {
					$scope.doc.revisoes[i].data_limite = new Date($scope.doc.revisoes[i].data_limite);					
				}

				// inserindo um objeto hh ao final do vetor de hh's
				$scope.doc.hhs.push({id_cargo:null,hh:1});

				// Determinando o valor da disciplina selecionada
				$scope.disciplinas.selecionada = ( (id_doc==0 && !copy) ? null : $scope.disciplinas.find(
								function(a){
									return a.id == this
								},
								$scope.doc.id_disciplina
							));

				// Linkando doc.subdisciplina a um elemento de disciplinaSelecionada.subs
				if($scope.disciplinas.selecionada != null){
					$scope.disciplinas.selecionada.subs.selecionada = ( (id_doc==0 && !copy) ? null : $scope.disciplinas.selecionada.subs.find(
							function(a){
								return a.id==this;
							},$scope.doc.id_subdisciplina
						));
				}
				
				// Determinando o valor da area selecionada
				$scope.areas.selecionada = ( (id_doc==0 && !copy) ? null : $scope.areas.find(
					function(a){
						return a.id == this
					}, $scope.doc.id_area));
				
				// Determinando subárea selecionada
				if($scope.areas.selecionada != null){
					$scope.areas.selecionada.subareas.selecionada = ( (id_doc==0 && !copy) ? null : $scope.areas.selecionada.subareas.find(
						function(a){
							return a.id == this
						}, $scope.doc.id_subarea));
				}
					
				// Determinando quais documentos são dependencias possíveis
				$scope.dependenciasPossiveis = getDependenciasPossiveis();
			}

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

			// Função que retorna vetor com os descendentes de um documento
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

			// Função que cancela e esconde o dialog
			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.salvar = function(){
				// Mostrando carregando
				parentScope.root.carregando = true;

				// Fazendo cópia do objeto documento
				doc = angular.copy($scope.doc);
				
				// Removendo campos desnecessários
				doc.id_subdisciplina = $scope.disciplinas.selecionada.subs.selecionada.id;
				doc.id_subarea = $scope.areas.selecionada.subareas.selecionada.id;
				doc.hhs = doc.hhs.filter(function(a){
					return a.id_cargo != null;
				});
				
				// Apagando info de GRDs a quais doc pertence
				delete doc.grds;
				
				// Verificando se é inserção de documento ou atualização pelo id
				if(doc.id == 0){
					// Inserir novo documento
					GDoksFactory.adicionarDocumento(doc)
					.success(function(response){
						// Esconde carregando
						parentScope.root.carregando = false;

						// Mandando o parentScope recarregar documentos
						parentScope.carregaDocumentos();

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
						var pos = parentScope.projeto.documentos.findIndex(function(a){return a.id == this},doc.id);

						// Mandando o parent scope recarregar documentos
						parentScope.carregaDocumentos();

						// Fechando caixa de diálogo
						$mdDialog.hide();

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Cadastro do documento alterado com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);
						
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

		    	// Mostra carregando
		    	$scope.root.carregando = true;

		        file.upload = Upload.upload({
		        	url: API_ROOT+'/projetos/'+$scope.projeto.id+'/importarLDP/',
		            data: {file: file},
		            headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
		        });

		        file.upload.then(
		        	function (response) {
	            		// Esconde carregando
	    				$scope.root.carregando = false;

		            	$timeout(function () {
		            		$scope.criticas = response.data.criticas;
		            		$scope.carregaDocumentos();

	            			if($scope.criticas.length == 0){
	            				// Retornando Toast para o usuário
	            				$mdToast.show(
	            					$mdToast.simple()
	            					.textContent('Todas as linhas do arquivo foram importadas com sucesso para o projeto.')
	            					.position('bottom left')
	            					.hideDelay(5000)
	            				);
	            			}
		            	});
		        	},
		        	function (response) {
		        		// Esconde carregando
	    				$scope.root.carregando = false;

		            	if (response.status == 400){
		            		// Não fazer nada... requisições estranhas do browser
		            	} else {
		            		// Retornando Toast para o usuário
		            		$mdToast.show(
		            			$mdToast.simple()
		            			.textContent('Falha ao importar arquivo: ' + response.data)
		            			.position('bottom left')
		            			.hideDelay(5000)
		            		);
		            	}
		        	},
		        	function (evt) {
		            	file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		        	}
		        );
		    }
		}

	}
})()