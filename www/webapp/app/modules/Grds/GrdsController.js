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
		};

		$scope.qEsq = {
			id_area:undefined,
			id_disciplina:undefined
		};

		// Carregando dados
		loadClientes();
		loadProjetos();
		loadConfig();

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
		$scope.onNovaClick = function(){
			$location.url('/grds/0');
		}

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

		// Função que carrega projetos da base local
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

		// Função que carrega configurações do GDoks
		function loadConfig(){
			GDoksFactory.getConfiguracoes()
			.success(function(response){
				$scope.somenteConcluidosPodemSerAdd = response.config.SOMENTE_DOC_CONCLUIDOS_SAO_EMITIDOS.valor;
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao carregar configurações. Assumindo comportamento padrão.')
					.position('bottom left')
					.hideDelay(5000)
				);

				$scope.somenteConcluidosPodemSerAdd = true;
			});
		}



		// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
	}

	// Criando função controller de Grds
	var GrdController = function($scope,$location,GDoksFactory,$routeParams,$mdToast,$mdDialog){

		// Lendo id da url
		var id_grd = $routeParams.id;

		// definindo flag que indica se os codigos emi e os tipos de documento foram carregados
		var codigosEmiCarregados = false;
		var tiposDeDocumentoCarregados = false;
		var grdCarregada = false;

		// Carregando grd
		$scope.grd = null;

		// Definindo e carregando disciplinas
		$scope.disciplinas = [];
		loadDisciplinas();

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
		GDoksFactory.getClientes()
		.success(function(response){
			$scope.clientes = response.clientes;

			// atribuindo cliente da grd  caso ela tenha sido carregada primeiro
			if($scope.grd != null){
				$scope.grd.cliente = $scope.clientes.find(function(a){return a.id==this},$scope.grd.id_cliente);
			}
		})
		.error(function(error){
			// Retornando Toast para usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Falha ao tentar carregar clientes')
				.position('bottom left')
				.hideDelay(5000)
			);
		});

		// Carregando configurações do GDoks
		var config = null;
		GDoksFactory.getConfiguracoes().
		success(function(response){
			config = response.config;
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Falha ao carregar configurações: ' + error.msg)
				.position('bottom left')
				.hideDelay(5000)
			);
		});

		// Define função a ser executada quando o cliente é alterado
		$scope.onClienteChange = function(){
			// Mostra carregando
			$scope.root.carregando = true;

			// Carrega os projetos daquele cliente
			GDoksFactory.getProjetos($scope.grd.cliente.id)
			.success(function(response){

				// Esconde carregando
				$scope.root.carregando = false;

				// Escreve os projetos requisitados no escopo
				$scope.projetos = response.projetos;
			})
			.error(function(error){

				// Esconde carregando
				$scope.root.carregando = false;

				// Retornando Toast para usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar carregar projetos deste cliente')
					.position('bottom left')
					.hideDelay(5000)
				);

			});
			
			// Anula o projeto do cliente selecionado
			$scope.grd.projeto = null;
			$scope.grd.alterada = true;
		}

		// Define função a ser executada quando o projeto muda
		$scope.onProjetoChange = function(){
			loadDocumentosDeProjeto($scope.grd.projeto.id);
			loadAreasDeProjeto($scope.grd.projeto.id);
			$scope.grd.alterada = true;
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

			grd.id_projeto = grd.projeto.id;
			
			// removendo dados desnecessários
			delete grd.cliente;
			delete grd.projeto;

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
						.textContent('GRD criada com sucesso!')
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
						.textContent('Falha ao alterar GRD: ' + error.msg)
						.position('bottom left')
						.hideDelay(5000)
					);

					// imprimindo mensagem no console
					console.warn(error);
				});
			}
		}
		
		// Função que adiciona todos os completados
		$scope.selecionarTodos = function(){
			for (var i = $scope.documentos.length - 1; i >= 0; i--) {
				if($scope.documentos[i].progresso==100){
					$scope.documentos[i].added = true;
					$scope.grd.alterada = true;
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

		// Baixa último pda de uma revisão
		$scope.baixarRevisaoAtualizada = function(id_revisao){
			GDoksFactory.baixarRevisaoAtualizada(id_revisao);
		}

		// Função que abre diálogo para alterar observações de uma grd
		$scope.openObservacaoDeGRD = function(evt,obs){
			if(obs==undefined){
				obs = {
					id:0,
					arquivos:[]
				}
			}
			
			$mdDialog.show(
				{
					controller: observacaoDeGrdDialogController,
					locals:{
						obs:angular.copy(obs),
						documentos:$scope.documentos.filter(function(a){return a.added}),
						parentObs:obs,
						parentScope:$scope,
					},
					templateUrl: './app/modules/Grds/observacoesDeGrd.dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:false
				}
			);
		}

		function observacaoDeGrdDialogController($scope, $route, $filter, $mdDialog,obs,documentos,parentScope,parentObs,Upload,$cookies){
			
			// Passando obs para o scope local
			$scope.obs = obs;
			delete obs;
			$scope.obs.alterada = false;

			// Passando documentos para o scope
			$scope.documentos = documentos;
			delete documentos;
			if($scope.obs.doc_id){
				$scope.obs.doc = $scope.documentos.find(function(d){return d.id==this},$scope.obs.doc_id);
			}

			// Passando grd para scope local
			$scope.grd = parentScope.grd;

			// Definindo hoje
			$scope.hoje = new Date();

			// Definindo vetor de novos arquivos
			$scope.novos_arquivos = [];

			// Definindo função que fecha o dialogo
			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			// Definindo função que remove anexo da observação
			$scope.desanexar = function(index){
				$scope.obs.arquivos.splice(index,1);
				$scope.obs.alterada = true;
			}

			// Definindo função que remove anexo da observação
			$scope.desanexarDosNovos = function(index){
				$scope.novos_arquivos.splice(index,1);
			}

			// Definindo função que salva observação
			$scope.salvar = function () {
				if ($scope.obs.id!=0) {
					atualizar();
				} else {
					inserir();
				}
			}

			// Definindo função que atualiza observação
			function atualizar(){
				// mostrando barra de progresso de upload
				parentScope.root.carregando = true;
				
				// Criando pacote a enviar
				var packToSend = [];
				for (var i = $scope.novos_arquivos.length - 1; i >= 0; i--) {
					packToSend.push({file:$scope.novos_arquivos[i]});
				};

				var data = {
					id:$scope.obs.id,
					id_grd:parentScope.grd.id,
					id_revisao:$scope.obs.doc.rev_id,
					data_recebida:$filter('date')($scope.obs.data_recebida,'yyyy-MM-dd'),
					obs:$scope.obs.obs,
					cc:$scope.obs.cc,
					arquivos:$scope.obs.arquivos.map(function(a){return a.id})
				};

				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/grds/'+$scope.grd.id+'/obs',
	                	method: 'POST',
	                	data: {profiles: packToSend, obs:data},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function(response){
	            		if(response.status == 200){
	            			
	            			// Escondendo o carregando
	            			parentScope.root.carregando = false;

	            			// Configurando a obs do scope pai
	            			parentObs.obs = $scope.obs.obs;
	            			parentObs.cc = $scope.obs.cc;
	            			parentObs.datahora_registrada =  new Date(response.data.datahora_registrada);
	            			parentObs.data_recebida = $scope.obs.data_recebida;
	            			parentObs.idu = $cookies.getObject('user').id;
	            			parentObs.arquivos = $scope.obs.arquivos;
	            			if($scope.obs.id == 0){
	            				parentObs.id = response.data.newId;
	            			}

	            			var escondeDialogo = true;
	            			// tratando arquivos de uploads
	            			for(i in response.data.uploads){
	            				if(response.data.uploads[i].err == 0){
	            					parentObs.arquivos.push({id:response.data.uploads[i].newId,nome_cliente:response.data.uploads[i].file});
	            					
	            					// removendo o arquivo adicionado do vetor de novos arquivos
	            					$scope.novos_arquivos.splice($scope.novos_arquivos.findIndex(function(a){return a.name==this},response.data.uploads[i].file),1);
	            				} else {
	            					// Marcando para sumir como diálogo
	            					escondeDialogo = false;

	            					// Retornando Toast para o usuário
	            					$mdToast.show(
	            						$mdToast.simple()
	            						.textContent('Upload do arquivo '+response.data.uploads[i].file+' falhou: ' + response.data.uploads[i].msg)
	            						.position('bottom left')
	            						.hideDelay(5000)
	            					);
	            				}
	            			}

	            			// Escondendo diálogo se for o caso
	            			if(escondeDialogo){
	            				$mdDialog.hide();
	            			}
	            		}
	            	},
	            	function(error){
	            		
	            		// Escondendo o carregando
	            		parentScope.root.carregando = false;

	            		// Imprimindo erro no console
	            		console.warn(error);

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent(error.statusText + ' ' + error.status)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);
	            	},
	            	function (evt) {
						$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
					}
	            );
			}

			// Definindo função que insere observação
			function inserir(){

				// mostrando barra de progresso de upload
				parentScope.root.carregando = true;
				
				// Criando pacote a enviar
				var packToSend = [];
				for (var i = $scope.novos_arquivos.length - 1; i >= 0; i--) {
					packToSend.push({file:$scope.novos_arquivos[i]});
				};

				var data = {
					id:0,
					id_grd:parentScope.grd.id,
					id_revisao:$scope.obs.doc.rev_id,
					data_recebida:$filter('date')($scope.obs.data_recebida,'yyyy-MM-dd'),
					obs:$scope.obs.obs,
					cc:$scope.obs.cc,
					arquivos:$scope.obs.arquivos.map(function(a){return a.id})
				};

				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/grds/'+$scope.grd.id+'/obs',
	                	method: 'POST',
	                	data: {profiles: packToSend, obs:data},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function(response){

	            		if(response.status == 200){
	            			
	            			// Escondendo o carregando
	            			parentScope.root.carregando = false;

	            			// Configurando a obs do scope pai

	            			parentObs.id = response.data.newId;
	            			parentObs.obs = $scope.obs.obs;
	            			parentObs.cc = $scope.obs.cc;
	            			parentObs.datahora_registrada =  new Date(response.data.datahora_registrada);
	            			parentObs.data_recebida = $scope.obs.data_recebida;
	            			parentObs.idu = $cookies.getObject('user').id;
	            			parentObs.arquivos = $scope.obs.arquivos;
	            			
	            			var escondeDialogo = true;
	            			// tratando arquivos de uploads
	            			for(i in response.data.uploads){
	            				if(response.data.uploads[i].err == 0){
	            					parentObs.arquivos.push({id:response.data.uploads[i].newId,nome_cliente:response.data.uploads[i].file});
	            					
	            					// removendo o arquivo adicionado do vetor de novos arquivos
	            					$scope.novos_arquivos.splice($scope.novos_arquivos.findIndex(function(a){return a.name==this},response.data.uploads[i].file),1);
	            				} else {
	            					// Marcando para sumir como diálogo
	            					escondeDialogo = false;

	            					// Retornando Toast para o usuário
	            					$mdToast.show(
	            						$mdToast.simple()
	            						.textContent('Upload do arquivo '+response.data.uploads[i].file+' falhou: ' + response.data.uploads[i].msg)
	            						.position('bottom left')
	            						.hideDelay(5000)
	            					);
	            				}
	            			}
							
	            			// Escondendo diálogo se for o caso
	            			$mdDialog.hide();

	            			// Retornando Toast para o usuário
        					$mdToast.show(
        						$mdToast.simple()
        						.textContent('Observação cadastrada com sucesso.')
        						.position('bottom left')
        						.hideDelay(5000)
        					);

        					// recarregando a view
        					$route.reload();
	            		}
	            		
	            	},
	            	function(error){
	            		
	            		// Escondendo o carregando
	            		parentScope.root.carregando = false;

	            		// Imprimindo erro no console
	            		console.warn(error);

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent(error.statusText + ' ' + error.status)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);
	            	},
	            	function (evt) {
						$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
					}
	            );
			}
		}

		// Função que abre diálogo para alterar oções de documento de grd
		$scope.openOpcoesDeDocumentoDialog = function(evt,doc){
			// Mostra diálogo somente se grd não foi enviada ainda.
			if($scope.grd.datahora_enviada==null){
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
				parentScope.grd.alterada = true;
				
				// Escondendo caixa de dialogo
				$mdDialog.hide();
			}
		}

		// Função que abre diálogo para alterar endereço físico do documento/revisão
		$scope.openEndFisicoDialog = function(evt,doc){
			$mdDialog.show(
				{
					controller: endFisicoDialogController,
					locals:{
						doc:angular.copy(doc),
						parentDoc:doc,
						parentScope:$scope
					},
					templateUrl: './app/modules/Grds/endfisico.dialog.tmpl.html',
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

		// Função controller do diálogo para alterar endereço físico
		function endFisicoDialogController($scope,parentScope,parentDoc,doc){
			$scope.doc = doc;

			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.salvar = function(){

				// Mostra carregando
				parentScope.root.carregando = true;

				// Fazendo requisição
				GDoksFactory.updateEndFisico(doc)
				.success(function(response){
					// Escondendo carregando
					parentScope.root.carregando = false;

					// Alterando o endereço físico no documento
					if(doc.end_fisico == null || doc.end_fisico.trim()==''){
						parentDoc.end_fisico = null;
					} else {
						parentDoc.end_fisico = doc.end_fisico;
					}					

					// Escondendo caixa de diálogo
					$mdDialog.hide();

				})
				.error(function(error){
					// Escondendo carregando
					parentScope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível alterar endereço físico.')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(error)

				});
			}
		}

		// Função executada quando se clica no burão para visualizar o GRD
		$scope.onVisualizarGrdClick = function(){
			GDoksFactory.viewGRD($scope.grd.id);
		}

		$scope.onBaixarGrdEmZipClick = function(){
			GDoksFactory.downloadGRD($scope.grd.id);
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
						$scope.grd.datahora_enviada = new Date(response.datahora_enviada);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('GRD foi enviada com sucesso para o servidor do cliente.')
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

						// Imprimindo erro no console
						console.warn(error);
					})
				}
			);
		}

		$scope.confirmPublicarController = function(evt){
			var confirm = $mdDialog.confirm()
				.title('Publicar GRD na área do cliente')
				.textContent('Tem certeza que deseja Publicar a GRD na área do cliente?')
				.ariaLabel('Publicar GRD na área do cliente')
				.targetEvent(evt)
				.ok('Sim')
				.cancel('Não');
			$mdDialog.show(confirm)
			.then(
				function() {
					// Mostra carregando
					$scope.root.carregando = true;

					// Fazendo requisição de envio
					GDoksFactory.publicarGRD($scope.grd.id)
					.success(function(response){
						// Esconde carregando
						$scope.root.carregando = false;

						// Marcando a grd como enviada
						$scope.grd.datahora_enviada = new Date(response.datahora_enviada);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('GRD foi publicada com sucesso.')
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

						// Imprimindo erro no console
						console.warn(error);
					})
				}
			);
		}

		$scope.openDialogDeEnviarLinkPorEmail = function(evt){
			$mdDialog.show(
				{
					controller: enviarLinkViaEmailDialogController,
					locals:{
						parentScope:$scope,
						config:config
					},
					templateUrl: './app/modules/Grds/enviarLinkViaEmail.dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:false
				});
		}

		function enviarLinkViaEmailDialogController($scope,parentScope,config,GDoksFactory,$cookies){

			// Amarrando a grd deste scope com o parentScope
			$scope.grd = parentScope.grd;

			// Carregando informaç~oes do usuário
			var user = $cookies.getObject('user');

			// Construindo assunto a partir das configurações
			var assunto = config.ASSUNTO_PADRAO_ENVIO_GRD.valor;
			assunto = assunto
						.replace('$grd_codigo',$scope.grd.codigo)
						.replace('$empresa_nome',user.nome_empresa)
						.replace('$projeto_nome',$scope.grd.projeto.nome)
						.replace('$usuario_nome',user.nome)
						.replace('$usuario_email',user.email);

			// Construindo menssagem a partir das configurações
			var msg = config.MSG_PADRAO_ENVIO_GRD.valor;
			msg = msg
					.replace('$grd_codigo',$scope.grd.codigo)
					.replace('$empresa_nome',user.nome_empresa)
					.replace('$projeto_nome',$scope.grd.projeto.nome)
					.replace('$usuario_nome',user.nome)
					.replace('$usuario_email',user.email);

			// Contruindo assinatura de mensagem a partir das configurações
			var ass = config.ASSINATURA_ENVIO_GRD.valor;
			ass = ass
					.replace('$grd_codigo',$scope.grd.codigo)
					.replace('$empresa_nome',user.nome_empresa)
					.replace('$projeto_nome',$scope.grd.projeto.nome)
					.replace('$usuario_nome',user.nome)
					.replace('$usuario_email',user.email);

			// Definindo expressão regular 
			var re = /\$grd_link\(.+\)/;
			var match = msg.match(re);
			if(match){
				// removendo o primeiro eó último caractere (parentesis)
				var texto = match[0].substr(9).slice(1,-1);
				msg = msg.replace(re,'[link]'+texto+'[/link]');
			}
			
			// Definindo mensagem
			$scope.mail = {
				destinatarios:[
					{
						nome:$scope.grd.cliente.contato_nome,
						email:$scope.grd.cliente.contato_email
					}
				],
				assunto:assunto,
				msg:msg+ass
			}

			// Definindo função que adiciona um destinatário
			$scope.addDestinatario = function(){
				$scope.mail.destinatarios.push({nome:'','email':''});
			}

			$scope.removeDestinatario = function(index){
				$scope.mail.destinatarios.splice(index,1);	
			}

			// Função que fecha caixa de diálogo.
			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.enviar = function(){
				
				// mostra carregando
				parentScope.root.carregando == true;

				GDoksFactory.mailLinkGRD($scope.grd.id,$scope.mail)
				.success(function(response){
					// Esconde carregando
					parentScope.root.carregando = false;

					// Verificando se tem algum erro no envio
					if(response.error == 0){
						// Atualizando a datahora de envio da grd
						parentScope.grd.datahora_enviada = new Date(response.datahora_enviada);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('GRD enviada com successo!')
							.position('bottom left')
							.hideDelay(5000)
						);
					} else {
						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Falha no envio. Tente novamente mais tarde.')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(response.msg);
					}

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

			// Verificando se a mensagem tem a pseudotag link
			$scope.msgTemLink = function(){
				var re = /\[link\].+\[\/link\]/;
				return $scope.mail.msg.match(re)!=null;
			}
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
						alterada:false,
						projeto_ativo:true
					};

					let id_cliente = $location.search().id_cliente;
					if(id_cliente != undefined && !isNaN(id_cliente)){
						$scope.grd.id_cliente = id_cliente;

						// Carregando os projetos deste cliente
						GDoksFactory.getProjetos(id_cliente)
						.success(function(response){
							$scope.projetos = response.projetos;

							// Determinando o projeto se ele também estiver definido na url
							let id_projeto = $location.search().id_projeto;
							if(id_projeto != undefined && !isNaN(id_projeto)){
								$scope.grd.projeto = $scope.projetos.find(function(p){return p.id==this},id_projeto);
							}
						})
						.error(function(error){
							
						});
					}

					
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
							$scope.grd.alterada = false;

							// Carregando CodigosEMI, Tipos de documento e documentos do projeto desta grd
							loadDocumentosDeProjeto($scope.grd.id_projeto);

							// parsing datas
							$scope.grd.datahora_enviada = ($scope.grd.datahora_enviada!=null) ? new Date($scope.grd.datahora_enviada) : null;
							$scope.grd.datahora_registro = new Date($scope.grd.datahora_registro);

							// Se a grd já foi enviada para o cliente, tenta carregar
							if($scope.grd.datahora_enviada!=null){
								loadObservacoes();
							}

							// Verificando se a grd é de um projeto ativo;
							if($scope.grd.projeto_ativo == 1) {
								// Projeto ativo. Carregando o projeto da base local
								indexedDB.open('gdoks').onsuccess = function(evt){
									evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
										// Levantando os projetos do cliente
										$scope.projetos = evt.target.result.filter(function(a){return a.id_cliente==this},$scope.grd.id_cliente);

										// atribuindo projeto a grd
										$scope.grd.projeto = $scope.projetos.find(function(a){return a.id==this}, $scope.grd.id_projeto);

										// apagando propriedade id_projeto
										delete $scope.grd.id_projeto;
										delete $scope.grd.id_cliente;
									}
								}
							} else {
								// Projeto da GRD é inativo. As informações do projeto já estão carregadas na GRD.
								// Push o projeto da GRD no $scope.projetos
								$scope.projetos.push($scope.grd.projeto);
							}

							// Mostrando alerta caso a GRD seja de um projeto inativo
							if($scope.grd.projeto_ativo == 0){
								$mdDialog.show(
								$mdDialog.alert()
									.clickOutsideToClose(false)
									.title('Essa GRD é de um projeto inativo!')
									.textContent('Algumas informações dela não poderão ser alteradas. Ela não poderá ser enviada para o cliente.')
									.ariaLabel('GRD de projeto inativo')
									.ok('OK')
								);
							}

							// atribuindo o cliente
							$scope.grd.cliente = $scope.clientes.find(function(a){return a.id==this},$scope.grd.projeto.id_cliente);

							// Carregando áreas do projeto
							loadAreasDeProjeto($scope.grd.projeto.id);
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
			// Só funciona direito se códigos emi e tipos de documento já tiverem sido carregados
			function loadDocumentosDeProjeto(id_projeto){
				GDoksFactory.getDocumentosDoProjeto(id_projeto)
				.success(function(response){
					
					// Declarando variáveis locais
					var documentos = response.documentos;
					var doc;
					
					// Parsing documentos
					for (var i = documentos.length - 1; i >= 0; i--) {

						// Lendo o documento da vez para a variável doc
						doc = documentos[i];

						//verificando se documento está adicionado a grd
						if($scope.grd.docs != undefined){

							// Buscando o documento na GRD
							var grdDoc = $scope.grd.docs.find(function(a){return a.id_documento==this},doc.id);

							if(grdDoc == undefined){
								// Documento não foi adicionado a grd. Mantendo valores padrão
								doc.added = false;
								doc.nVias = 1;
								doc.nFolhas = 1;
								doc.tipo = $scope.tipoDeDocumentoPadrao;
								doc.codEMI = $scope.codigoEmiPadrao;
							} else {
								// Documento já foi adicionado a grd. Carregando os valores dele
								doc.added = true;
								doc.rev_id = grdDoc.id_revisao;
								doc.rev_serial = grdDoc.serial_revisao;
								doc.nVias = grdDoc.nVias;
								doc.nFolhas = grdDoc.nFolhas;
								doc.tipo = $scope.tiposDeDocumento.find(function(a){return a.id == this},grdDoc.id_tipo);
								doc.codEMI = $scope.codigosEmi.find(function(a){return a.id == this},grdDoc.id_codEMI);
							}
						} else {
							// Nenhum documento não foi adicionado a grd. Mantendo valores padrão
							doc.added = false;
							doc.nVias = 1;
							doc.nFolhas = 1;
							doc.tipo = $scope.tipoDeDocumentoPadrao;
							doc.codEMI = $scope.codigoEmiPadrao;
						}
					}
					$scope.documentos = documentos;
				})
			}

			// Função que carrega disciplinas
			function loadDisciplinas(){
				GDoksFactory.getDisciplinas()
				.success(function(response){
					$scope.disciplinas = response.disciplinas;
				})
				.error(function(error){
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Erro ao carregar disciplinas')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(error);
				})
			}

			// Função que carrega áreas do projeto
			function loadAreasDeProjeto(id_projeto){
				GDoksFactory.getAreas(id_projeto)
				.success(function(response){
					$scope.areas = response.areas;
				})
				.error(function(response){
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha ao tentar carregar áreas do projeto')
						.position('bottom left')
						.hideDelay(5000)
					)

					// Imprimindo erro no console
					console.warn(error);
				});
			}

			function loadObservacoes(){
				GDoksFactory.loadObservacoesDeGRD($scope.grd.id)
				.success(function(response){
					$scope.grd.observacoes = response.observacoes;

					// Parsing datas e documentos
					var obs;
					for (var i = $scope.grd.observacoes.length - 1; i >= 0; i--) {
						obs = $scope.grd.observacoes[i];
						obs.data_recebida = new Date(obs.data_recebida+' 00:00:00');
						obs.datahora_registrada = new Date(obs.datahora_registrada);
						obs.doc = $scope.documentos.find(function(a){return a.id==this},obs.doc_id);
					}

					// Parsing nomes dos usuários
					indexedDB.open('gdoks').onsuccess = function(evt){
						var os = evt.target.result.transaction('usuarios').objectStore('usuarios');
						var obs;
						for (var i = $scope.grd.observacoes.length - 1; i >= 0; i--) {
							obs = $scope.grd.observacoes[i];
							os.get(obs.idu).onsuccess = function(evt){
								obs.nome_usuario = evt.target.result.nome;
							}
						}
					}
				})
				.error(function(error){
					
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível carregar obvservacoes da grd')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(error);
				});
			}
		// FIM DE FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
	}

	// Atribuindo função controller ao módulo
	GrdsModule.controller('GrdsController',GrdsController);
	GrdsModule.controller('GrdController',GrdController);

})()