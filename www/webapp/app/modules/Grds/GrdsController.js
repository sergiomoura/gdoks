(function(){
	// Criando o módulo
	var GrdsModule = angular.module('Grds',[]);

	// Criando função controller de Grds
	var GrdsController = function($scope){
		console.log('Módulo Grds carregado...');
	}

	// Criando função controller de Grds
	var GrdController = function($scope,$location,GDoksFactory,$routeParams,$mdToast,$mdDialog){

		// Lendo id da url
		var id = $routeParams.id;

		// Definindo o tab selecionado
		$scope.selectedTab = 0;

		// Carregando códigos emis
		$scope.codigosEmi = [];
		loadCodigosEmi();

		// Carregamdp tipos de documento
		$scope.tiposDeDocumento = [];
		loadTiposDeDocumento();
		
		// Definindo grd
		if(id == 0){
			$scope.grd = {};

			// Definindo variável que controla se os documentos da grd foram salvos
			$scope.grd.documentos_salvos = true;

		} else {
			// Mostra carregando
			$scope.root.carregado = true;

			// Carregando GRD do servidor
			GDoksFactory.getGrd(id)
			.success(function(response){

				// Esconde carregando
				$scope.root.carregando = false;

				// Settando GRD no scope
				$scope.grd = response.grd;

				// Definindo variável que controla se os documentos da grd foram salvos
				$scope.grd.documentos_salvos = true;

				// Parsing GRD - - - -
				// carregando o projeto da base local
				indexedDB.open('gdoks').onsuccess = function(evt){
					evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
						// Levantando os projetos do cliente
						$scope.projetos = evt.target.result.filter(function(a){return a.id_cliente==this},$scope.grd.id_cliente);

						// atribuindo projeto a grd
						$scope.grd.projeto = $scope.projetos.find(function(a){return a.id==this}, $scope.grd.id_projeto);
						
						// atribuindo o cliente
						$scope.grd.cliente = $scope.clientes.find(function(a){return a.id==this},$scope.grd.projeto.id_cliente);

						// carregando documentos de projeto
						getDocumentosDeProjeto($scope.grd.projeto.id);

						// datas de grd


						// apagando propriedade id_projeto
						delete $scope.grd.id_projeto;
						delete $scope.grd.id_cliente;
					}
				}

			})
			.error(function(error){
				// Esconde carregando
				$scope.root.carregando = false;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar carregar GRD: '+error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);

			});
		}

		// definindo projetos
		$scope.projetos = [];

		// definindo documentos
		$scope.documentos = [];
		
		// Carregando clientes
		$scope.clientes = [];
		indexedDB.open('gdoks').onsuccess = function(evt){
			evt.target.result.transaction('clientes').objectStore('clientes').getAll().onsuccess = function(evt){
				$scope.clientes = evt.target.result;
			}
		}

		// Define função a ser executada quando o cliente é alterado
		$scope.onClienteChange = function(){
			// Carrega os projetos daquele cliente
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
					$scope.projetos = evt.target.result.filter(function(a){return a.id_cliente==this},$scope.grd.cliente.id);
				}
			}
			// Anula o projeto do cliente selecionado
			$scope.grd.projeto = null;
		}

		// Define função a ser executada quando o projeto muda
		$scope.onProjetoChange = function(){
			getDocumentosDeProjeto($scope.grd.projeto.id);
		}

		// Função que leva para a busca de grds
		$scope.goToGrds = function(){
			$location.url('/grds');
		}

		// Função que salva grd
		$scope.salvar = function(){
			// Mostra carregando
			$scope.root.carregando = true;
			
			// Fazendo cópia de grd
			var grd = angular.copy($scope.grd);
			delete grd.cliente;

			if($scope.grd.id == undefined || $scope.grd.id==0){
				GDoksFactory.adicionarGrd(grd)
				.success(function(response){
					// Esconde carregando
					$scope.root.carregando = false;

					// Atribuindo id da grd recém criada
					$scope.grd.id = response.newId;

					// Alterando url para coerência
					$location.url('/grds/'+$scope.grd.id);

					// Atribuindo-se a data de registro
					$scope.grd.datahora_registro = new Date();

					// Mudando o tab para o próximo... TODO
					// TODO: Fazer mudar para tab de documentos depois de salvar GRD

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('GRD criada. Agora adicione documentos a ela!')
						.position('bottom left')
						.hideDelay(5000)
					);
					
				})
				.error(function(error){
					// Esconde carregando
					$scope.root.carregando = false;
				});
			} else {
				GDoksFactory.atualizarGrd(grd)
				.success(function(response){
					// Esconde carregando
					$scope.root.carregando = false;

				})
				.error(function(error){
					// Esconde carregando
					$scope.root.carregando = false;
				});
			}
		}

		// Função que carrega documentos de um projeto e põe no scope
		function getDocumentosDeProjeto(id_projeto){
			GDoksFactory.getDocumentosDoProjeto(id_projeto)
			.success(function(response){
				var documentos = response.documentos;
				for (var i = documentos.length - 1; i >= 0; i--) {
					documentos[i].added = false;
					documentos[i].chk_esq = (documentos[i].progresso==100);
					documentos[i].chk_dir = false;
					documentos[i].nVias = 1;
					documentos[i].nFolhas = 1;
					documentos[i].tipo = $scope.tipoDeDocumentoPadrao;
					documentos[i].codEMI = $scope.codigoEmiPadrao;
				}
				$scope.documentos = documentos;
			})
		}

		// Função que remove todos os documentos da grd
		$scope.selecionarTodosDir = function(){
			for (var i = $scope.documentos.length - 1; i >= 0; i--) {
				if($scope.documentos[i].added){
					$scope.documentos[i].chk_dir = true;
				}
			}
		}

		// Função que remove os documentos selecionados
		$scope.removeSelecionados = function(){
			for (var i = $scope.documentos.length - 1; i >= 0; i--) {
				if($scope.documentos[i].chk_dir){
					$scope.documentos[i].added = false;
					$scope.documentos[i].chk_dir = false;
				}
			}
		}

		// Função que adiciona todos os selecionados
		$scope.addSelecionados = function(){
			for (var i = $scope.documentos.length - 1; i >= 0; i--) {
				if($scope.documentos[i].chk_esq){
					$scope.addToGrd($scope.documentos[i]);
				}
			}	
		}

		// Função que adiciona todos os completados
		$scope.selecionarTodosEsq = function(){
			for (var i = $scope.documentos.length - 1; i >= 0; i--) {
				if($scope.documentos[i].progresso==100 && !$scope.documentos[i].added){
					$scope.documentos[i].chk_esq = true;
				}
			}	
		}

		// Vai para a página de um documento
		$scope.goToDoc = function(id_doc){
			$location.url('/documentos/'+id_doc);
		}

		// Baixa o pda mais atual do documento
		$scope.baixarPda = function(id_pda){
			GDoksFactory.baixarPDA(id_pda);
		}

		// Função que carrega códigos EMI
		function loadCodigosEmi(){
			GDoksFactory.getCodigosEmi()
			.success(function(response){
				// Setando codigos emi no scope
				$scope.codigosEmi = response.codigosEmi;

				// Definindo código EMI padrão
				$scope.codigoEmiPadrao = $scope.codigosEmi[1];
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar Códigos EMI.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			});
		}

		// Função que carrega Tipos de Documento
		function loadTiposDeDocumento(){
			GDoksFactory.getTiposDeDocumento()
			.success(function(response){
				// Setando codigos emi no scope
				$scope.tiposDeDocumento = response.tiposDeDocumento;

				// Definindo código EMI padrão
				$scope.tipoDeDocumentoPadrao = $scope.tiposDeDocumento[0];
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar tipos de documento.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			});
		}

		// Função que abre diálogo para alterar oções de documento de grd
		$scope.openOpcoesDeDocumentoDialog = function(evt,doc){
			$mdDialog.show(
				{
					controller: opcoesDeDocumentoDialogController,
					locals:{
						doc:angular.copy(doc),
						parentDoc:doc,
						parentScope:$scope,
					},
					templateUrl: './app/modules/Grds/grddoc.dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:true
				})
				.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				$scope.status = 'You cancelled the dialog.';
				});
		}

		// Função controller da caixa de diálogo de opções de um documento de grd
		function opcoesDeDocumentoDialogController($scope,doc,parentDoc,parentScope){
			
			$scope.doc = doc;
			
			$scope.codigosEmi = parentScope.codigosEmi;
			$scope.doc.codEMI = $scope.codigosEmi.find(function(a){return a.id==this},$scope.doc.codEMI.id);

			$scope.tiposDeDocumento = parentScope.tiposDeDocumento;
			$scope.doc.tipo = $scope.tiposDeDocumento.find(function(a){return a.id==this},$scope.doc.tipo.id);

			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.salvar = function(){
				parentDoc.codEMI = $scope.doc.codEMI;
				parentDoc.tipo = $scope.doc.tipo;
				parentDoc.nVias = $scope.doc.nVias;
				parentDoc.nFolhas = $scope.doc.nFolhas;
				$mdDialog.hide();

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Dados do documento ' + $scope.doc.nome + ' alterados')
					.position('bottom left')
					.hideDelay(5000)
				);
			}
		}

		// Função que adiciona o documento a grd
		$scope.addToGrd = function(doc){
			doc.added = true;
			doc.chk_esq = false;
			$scope.grd.documentos_salvos = false;
		}

		// Função que remove da GRD
		$scope.removeFromGrd = function(doc){
			doc.added = false;
			doc.chk_dir = false;
			$scope.grd.documentos_salvos = false;
		}

		// Função que salva os documentos na GRD
		$scope.salvarDocumentos = function(){


			// criando objeto grd a ser enviado
			var grd = {};
			grd.id = $scope.grd.id;

			// Aplicando filtro e mapeamento nos documentos para um vetor de dados a ser enviado. 
			grd.docs = ($scope.documentos.filter(function(a){return a.added})).map(function(a){
				var result = {};
				result.id_codEMI = a.codEMI.id;
				result.id_tipo = a.tipo.id;
				result.nFolhas = a.nFolhas;
				result.nVias = a.nVias;
				result.rev_id = a.rev_id;
				return result;
			})

			// Mostra carregando
			$scope.root.carregando = true;

			// Enviando
			GDoksFactory.postGrdDocs(grd)
			.success(function(response){
				// Esconde carregando
				$scope.root.carregando = false;

				// Registrando que grd foi salva
				$scope.grd.documentos_salvos = true;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Documentos anexados a GRD com sucesso!')
					.position('bottom left')
					.hideDelay(5000)
				);

			})
			.error(function(error){
				// Esconde carregando
				$scope.root.carregando = false;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Ocorreu um erro ao tentar anexar documentos.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);

			});
		}

	}

	// Atribuindo função controller ao módulo
	GrdsModule.controller('GrdsController',GrdsController);
	GrdsModule.controller('GrdController',GrdController);

})()