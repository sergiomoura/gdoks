(function(){
	// Criando o módulo
	var GrdsModule = angular.module('Grds',[]);

	// Criando função controller de Grds
	var GrdsController = function($scope, $location,GDoksFactory){

		// Iniciando as variáveis
		$scope.clientes = [];
		$scope.projetosListados = [];
		var projetos = [];
		$scope.nPaginas = 0;
		$scope.q = {
			id_cliente:0,
			id_projeto:0,
			enviada:2,
			pagAtual:1
		}

		// Carregando dados
		loadClientes();
		loadProjetos();

		// FUNÇÕES DE COMUNICAÇÃO COM O SERVIDOR = = = = = = = = = = = = = = = = = = = = = = = =
		function buscar(q){
			$scope.root.carregando = true;
			GDoksFactory.buscarGRD(q).success(function(response){
				$scope.root.carregando = false;
				$scope.resultados = response.result;
				$scope.nPaginas = response.nPaginas;

				// Parsing datas
				var r;
				for (var i = $scope.resultados.length - 1; i >= 0; i--) {
					r = $scope.resultados[i];
					r.datahora_registro = new Date(r.datahora_registro);
					r.datahora_enviada = r.datahora_enviada==null?null:new Date(r.datahora_enviada);
				}
			})
		}

		function goToGrd(id){
			$location.url('/grds/'+id);
		}

		// FUNÇÕES DE RESPOSTA A INTERFACE = = = = = = = = = = = = = = = = = = = = = = = = = = =
		$scope.onClienteChange = function(){
			$scope.projetosListados = projetos.filter(
				function(a){
					return (this==0?true:a.id_cliente == this);
				},$scope.q.id_cliente
			);
		}

		$scope.onFormSubmit = function(){
			$scope.q.pagAtual = 1;
			buscar($scope.q);
		}

		$scope.onBuscarClick = function(){
			$scope.q.pagAtual = 1;
			buscar($scope.q);
		}

		$scope.onPreviousPageClick = function(){
			if($scope.q.pagAtual > 1){
				$scope.q.pagAtual--;
				buscar($scope.q);
			}
		}

		$scope.onNextPageClick = function(){
			if($scope.q.pagAtual < $scope.nPaginas){
				$scope.q.pagAtual++;
				buscar($scope.q);
			}
		}

		$scope.onFirstPageClick = function(){
			if($scope.q.pagAtual > 1){
				$scope.q.pagAtual=1;
				buscar($scope.q);
			}	
		}

		$scope.onLastPageClick = function(){
			if($scope.q.pagAtual < $scope.nPaginas){
				$scope.q.pagAtual=$scope.nPaginas;
				buscar($scope.q);
			}	
		}

		$scope.onResultadoClick = function(id){
			goToGrd(id);
		}

		// FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
		// função que carrega clientes da base local
		function loadClientes(){
			indexedDB.open('gdoks').onsuccess= function(evt){
				evt.target.result.transaction('clientes').objectStore('clientes').getAll().onsuccess = function(evt){
					$scope.clientes = evt.target.result;
				}
			}
		}

		// função que carrega projetos da base local
		function loadProjetos(){
			indexedDB.open('gdoks').onsuccess= function(evt){
				evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
					projetos = evt.target.result;
					$scope.projetosListados = projetos;
					$scope.onClienteChange();
					$scope.$apply();
				}
			}
		}



		// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
	}

	// Criando função controller de Grds
	var GrdController = function($scope,$location,GDoksFactory,$routeParams,$mdToast,$mdDialog){

		// Lendo id da url
		var id_grd = $routeParams.id;

		// Definindo o tab selecionado
		$scope.selectedTab = 0;

		// definindo flag que indica se os codigos emi e os tipos de documento foram carregados
		var codigosEmiCarregados = false;
		var tiposDeDocumentoCarregados = false;
		var grdCarregada = false;

		// Carregando grd
		$scope.grd = null;

		// Definindo códigos emis
		$scope.codigosEmi = [];
		loadCodigosEmi();

		// Definindo tipos de documento
		$scope.tiposDeDocumento = [];
		loadTiposDeDocumento();

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
			loadDocumentosDeProjeto($scope.grd.projeto.id);
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

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('GRD atualizada com sucesso!')
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
						.textContent('Falha ao alterar GRD')
						.position('bottom left')
						.hideDelay(5000)
					);

					// imprimindo mensagem no console
					console.warn(error);
				});
			}
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
			$scope.tiposDeDocumento = parentScope.tiposDeDocumento;
			$scope.doc.codEMI = $scope.codigosEmi.find(function(a){return 1*a.id==1*this}, doc.codEMI.id);
			$scope.doc.tipo = $scope.tiposDeDocumento.find(function(a){return a.id==this}, doc.tipo.id);

			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.salvar = function(){
				parentDoc.codEMI = $scope.doc.codEMI;
				parentDoc.tipo = $scope.doc.tipo;
				parentDoc.nVias = $scope.doc.nVias;
				parentDoc.nFolhas = $scope.doc.nFolhas;

				// salvando os documentos na base
				parentScope.salvarDocumentos();

				// Escondendo caixa de dialogo
				$mdDialog.hide();
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

		// Função executada quando se clica no burão para visualizar o GRD
		$scope.onVisualizarGrdClick = function(){
			GDoksFactory.viewGRD($scope.grd.id);
		}

		$scope.onBaixarGrdEmZipClick = function(){
			GDoksFactory.downloadGRD($scope.grd.id);
		}

		$scope.openDialogDeEnviarEmail = function(evt){
			$mdDialog.show(
				{
					controller: enviarEmailDialogController,
					locals:{
						parentScope:$scope,
					},
					templateUrl: './app/modules/Grds/enviarEmail.dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:false
				})
				.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				$scope.status = 'You cancelled the dialog.';
				});
		}

		function enviarEmailDialogController($scope,parentScope,GDoksFactory){
			// Amarrando a grd deste scope com o parentScope
			$scope.grd = parentScope.grd;

			// Definindo mensagem
			$scope.mail = {
				destinatarios:[
					{
						nome:$scope.grd.cliente.contato_nome,
						email:$scope.grd.cliente.contato_email
					}
				],
				assunto:'',
				msg:''
			}

			// Definindo função que adiciona um destinatário
			$scope.addDestinatario = function(){
				$scope.mail.destinatarios.push({nome:'','email':''});
			}

			$scope.removeDestinatario = function(index){
				$scope.mail.destinatarios.splice(index,1);	
			}

			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.enviar = function(){
				
				// mostra carregando
				parentScope.root.carregando == true;

				GDoksFactory.mailGRD($scope.grd.id,$scope.mail)
				.success(function(response){
					// Esconde carregando
					parentScope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('GRD enviada com successo!')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Escondendo dialogo
					$mdDialog.hide();
				})
				.error(function(error){
					// Esconde carregando
					parentScope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha no envio da GRD')
						.position('bottom left')
						.hideDelay(5000)
					);

					// imprimindo erro no console
					console.warn(error);
				});
			}
		}

		$scope.confirmFtpUploadController = function(evt){
			var confirm = $mdDialog.confirm()
				.title('Enviar GRD via FTP')
				.textContent('Deseja enviar a GRD e seus arquivos para o servidor FTP do cliente?')
				.ariaLabel('Enviar via FTP')
				.targetEvent(evt)
				.ok('Sim')
				.cancel('Não');
			$mdDialog.show(confirm)
			.then(
				function() {
					// Mostra carregando
					$scope.root.carregando = true;

					// Fazendo requisição de envio
					GDoksFactory.ftpGRD($scope.grd.id)
					.success(function(response){
						// Esconde carregando
						$scope.root.carregando = false;

						// Marcando a grd como enviada
						// 0000

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(response.msg)
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
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);	
					})
				}
			);
		}

		function uploadGrdViaFTP(){

		}

		// FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

			// Função que carrega códigos EMI
			function loadCodigosEmi(){
				GDoksFactory.getCodigosEmi()
				.success(function(response){
					// Setando codigos emi no scope
					$scope.codigosEmi = response.codigosEmi;

					// Definindo código EMI padrão
					$scope.codigoEmiPadrao = $scope.codigosEmi[1];

					// Marcando como carregado
					codigosEmiCarregados = true;

					// tentando carregar grd
					loadGrd(id_grd);
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

					// Marcando como carregado
					tiposDeDocumentoCarregados = true;

					// tentando carregar grd
					loadGrd(id_grd);

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

			// Função que carrega a GRD
			function loadGrd(id){
				if(id == 0){
					$scope.grd = {
						id: 0,
						documentos_salvos: true
					};
				} else {
					// verificando se tipos de documento e codigos emi estão carregados
					if(codigosEmiCarregados && tiposDeDocumentoCarregados){

						// Mostra carregando
						$scope.root.carregado = true;

						// Carregando GRD do servidor
						GDoksFactory.getGrd(id)
						.success(function(response){

							// Esconde carregando
							$scope.root.carregando = false;

							// Settando GRD no scope
							$scope.grd = response.grd;

							// Carregando CodigosEMI, Tipos de documento e documentos do projeto desta grd
							loadDocumentosDeProjeto($scope.grd.id_projeto);

							// Definindo variável que controla se os documentos da grd foram salvos
							$scope.grd.documentos_salvos = true;

							// parsing datas
							$scope.grd.enviada = ($scope.grd.datahora_enviada != null);
							$scope.grd.datahora_enviada = $scope.grd.enviada?new Date($scope.grd.datahora_enviada):null;
							$scope.grd.datahora_registro = new Date($scope.grd.datahora_registro);

							// carregando o projeto da base local
							indexedDB.open('gdoks').onsuccess = function(evt){
								evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
									// Levantando os projetos do cliente
									$scope.projetos = evt.target.result.filter(function(a){return a.id_cliente==this},$scope.grd.id_cliente);

									// atribuindo projeto a grd
									$scope.grd.projeto = $scope.projetos.find(function(a){return a.id==this}, $scope.grd.id_projeto);
									
									// atribuindo o cliente
									$scope.grd.cliente = $scope.clientes.find(function(a){return a.id==this},$scope.grd.projeto.id_cliente);

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
				}
			}

			// Função que carrega documentos de um projeto e põe no scope.
			// Só funciona direitp se cpdogos emi e tipos de documento já tiverem sido carregados
			function loadDocumentosDeProjeto(id_projeto){
				GDoksFactory.getDocumentosDoProjeto(id_projeto)
				.success(function(response){
					var documentos = response.documentos;

					// Parsing documentos
					for (var i = documentos.length - 1; i >= 0; i--) {
						documentos[i].chk_esq = false;
						documentos[i].chk_dir = false;
						//verificando se documento está adicionado a grd
						if($scope.grd.docs != undefined){
							var grdDoc = $scope.grd.docs.find(function(a){return a.id_revisao==this},documentos[i].rev_id);
							if(grdDoc == undefined){
								// Documento não foi adicionado a grd. Mantendo valores padrão
								documentos[i].added = false;
								documentos[i].nVias = 1;
								documentos[i].nFolhas = 1;
								documentos[i].tipo = $scope.tipoDeDocumentoPadrao;
								documentos[i].codEMI = $scope.codigoEmiPadrao;
							} else {
								// Documento já foi adicionado a grd. Carregando os valores dele
								documentos[i].added = true;
								documentos[i].nVias = grdDoc.nVias;
								documentos[i].nFolhas = grdDoc.nFolhas;
								documentos[i].tipo = $scope.tiposDeDocumento.find(function(a){return a.id == this},grdDoc.id_tipo);
								documentos[i].codEMI = $scope.codigosEmi.find(function(a){return a.id == this},grdDoc.id_codEMI);
							}
						}
					}
					$scope.documentos = documentos;
				})
			}
		// FIM DE FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
	}

	// Atribuindo função controller ao módulo
	GrdsModule.controller('GrdsController',GrdsController);
	GrdsModule.controller('GrdController',GrdController);

})()