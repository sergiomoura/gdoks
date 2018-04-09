(function(){
	// Carregando módulo de documentos
	var module = angular.module('Documentos');

	// Atribuindo o controller
	module.controller('DocumentoController', DocumentoController);

	// Defininfo controller
	function DocumentoController($scope,Upload,$mdExpansionPanel,$routeParams,GDoksFactory,$mdToast,$cookies,$mdDialog,$interval,$location){

		// Carregando informações do usuário logado a partir do cookie
		$scope.usuario = $cookies.getObject('user');

		// Pedindo para carregar usuários. Documento é carregado em seguida.
		carregaUsuarios();

		// Alguns dados do possível update a ser realizado
		$scope.update = {};

		// Pedindo para carregar tamanhos de papel
		$scope.tamanhosDePapel = [];
		$scope.tamanhoPadrao = null;
		carregaTamanhosDePapel();

		// Definindo vetor que mantém os usuários
		$scope.usuarios = [];

		// Determinando o odu do usuário logado
		$scope.idu = $cookies.getObject('user').id;

		// Definindo itens para o formUpload
		$scope.formUploadItems = [];

		$scope.mostraPdaInfo = function(id){
			if($scope.pdaExibido == id){
				$scope.pdaExibido = undefined;
			} else {
				$scope.pdaExibido = id;
			}
		}

		$scope.collapseHistPanel = function(index){
			$mdExpansionPanel('histPanel_'+index).collapse();
		}

		$scope.onFilesChange = function(){
			// limpando dados
			$scope.formUploadItems = [];

			// Levantando qual foi o último pacote de arquivos
			if($scope.documento.revisoes[0].pdas == undefined || $scope.documento.revisoes[0].pdas.length == 0){
				var ultimosArquivos = [];
			} else {
				var ultimosArquivos = $scope.documento.revisoes[0].pdas[0].arquivos;
			}

			// Declarando item
			var item;

			// Definindo agora
			$scope.agora = new Date();

			$scope.update.progressoTotal = $scope.documento.revisoes[0].progresso_validado;

			// Percorrendo vetor de arquivos escolhidos para saber se eles constam no último pacote
			for (var i = $scope.updateFiles.length - 1; i >= 0; i--) {
				if(ultimosArquivos.find(function(a){return a.nome_cliente==this},$scope.updateFiles[i].name) == undefined){
					// Arquivo NOVO
					item = {nome:$scope.updateFiles[i].name, nPaginas:1, tamanhoDoPapel:$scope.tamanhoPadrao.id, tipo:'novo',acao:1};
				} else {
					item = {nome:$scope.updateFiles[i].name, nPaginas:1, tamanhoDoPapel:$scope.tamanhoPadrao.id, tipo:'antigoParaAtualizar',acao:1}
				}
				$scope.formUploadItems.push(item);
			}

			// percorrendo o último pacote de arquivos procurando os arquivos que não constam no vetor de arquivos escolhidos
			for (var i = ultimosArquivos.length - 1; i >= 0; i--) {
				if($scope.updateFiles.find(function(a){return a.name == ultimosArquivos[i].nome_cliente}) == undefined){
					item = {nome:ultimosArquivos[i].nome_cliente, nPaginas:1, tamanhoDoPapel:$scope.tamanhoPadrao.id, tipo:'antigoNaoAtualizar',acao:1}
					$scope.formUploadItems.push(item);
				}				
			}
		}

		$scope.onDeleteClick = function(nome){
			var index = $scope.formUploadItems.findIndex(function(a){return a.nome == this},nome);
			$scope.formUploadItems.splice(index,1);
		}

		$scope.bloquearParaRevisao = function(){
			GDoksFactory.bloquearDocumentoParaRevisao($scope.documento.id)
			.success(function(response){
				$scope.documento.datahora_do_checkout = new Date(response.datahora);
				$scope.documento.idu_checkout = $scope.usuario.id;
				$scope.documento.sigla_checkout = $scope.usuario.sigla;

				$scope.documento.status = statusDeDocumento($scope.documento);
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar bloquear documento para revisão: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			})
			
		}

		$scope.desbloquear = function(){
			GDoksFactory.desbloquearDocumento($scope.documento.id)
			.success(function(response){
				$scope.documento.idu_checkout = null;
				$scope.documento.datahora_do_checkout = null;
				$scope.documento.status = statusDeDocumento($scope.documento);
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Erro: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			})
		}

		$scope.baixar = function(){
			GDoksFactory.baixarPDA($scope.documento.revisoes[0].pdas[0].id);
		}

		$scope.downloadPda = function(idPda){
			GDoksFactory.baixarPDA(idPda);
		}

		$scope.downloadArquivo = function(idArquivo){
			GDoksFactory.downloadArquivo(idArquivo);
		}

		$scope.enviarArquivos = function(){

			// Mostrando o carregando
			$scope.root.carregando = true;

			// Fazendo upload de arquivos se tiver algo para subir.
			if ($scope.updateFiles && $scope.updateFiles.length) {
				// Criando pacote a enviar
				var packToSend = [];
				var index;
				var item;
				for (var i = $scope.formUploadItems.length - 1; i >= 0; i--) {
					// Procurando o item no vetor updateFiles
					item = $scope.formUploadItems[i];
					index = $scope.updateFiles.findIndex(function(a){return a.name == this},item.nome);

					// adicionando ao pacote a enviar
					if(index > -1){
						packToSend.push({file:$scope.updateFiles[index], dados:item});
					} else {
						packToSend.push({dados:item});
					}
				};
				
				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/documentos/'+$scope.documento.id+'/pdas',
	                	data: {profiles: packToSend,update:$scope.update},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function (response){
	            		$scope.root.carregando = false;
	            		if(response.error == 1){

	            			// Retornando Toast para o usuário
	            			$mdToast.show(
	            				$mdToast.simple()
	            				.textContent('Ocorreu um erro ao enviar arquivos:' + response.msg)
	            				.position('bottom left')
	            				.hideDelay(5000)
	            			);
	            		} else {
	            			// limpando dados
	            			$scope.updateFiles = [];
	            			$scope.update = {};
							$scope.formUploadItems = [];
							
	            			// Recarregando documento da base
	            			carregaDocumento($scope.documento.id);

	            			// Mostrando uma mensagem de sucesso para o usuário
	            			// Retornando Toast para o usuário
	            			$mdToast.show(
	            				$mdToast.simple()
	            				.textContent('O documento foi atualizado com sucesso. Aguardando validação.')
	            				.position('bottom left')
	            				.hideDelay(5000)
	            			);
	            		}
	            	},
	            	function(error){

	            		// Escondendo o carregando
	            		$scope.root.carregando = false;

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent('Falha ao enviar arquivo; '+ error.data.msg)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);

	            		// Imprimindo o erro no console
	            		console.warn(error);
	            	}
	            );
	        } else {
	        	$scope.root.carregando = false;
	        	// Retornando Toast para o usuário
	        	$mdToast.show(
	        		$mdToast.simple()
	        		.textContent('Erro desconhecido. Entrar em contato com o suporte técnico.')
	        		.position('bottom left')
	        		.hideDelay(5000)
	        	);
	        }

		}

		$scope.openRemoverConfirm = function(ev) {
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

					GDoksFactory.removerDocumento($scope.documento)
					.success(function(response){

						// Esconde carregando
						$scope.root.carregando = false;
						
						// Indo para tela de busca de documentos
						$location.url("/documentos");

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

		$scope.openValidarProgressoDialog  = function(evt){
			$mdDialog.show(
				{
					controller: ValidarProgressoDialogController,
					locals:{
						doc: angular.copy($scope.documento),
						parentScope: $scope
					},
					templateUrl: './app/modules/Documentos/validarProgresso-dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:true
				}
			)
		}

		$scope.avancarRevisao = function(ev){

			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Tem certeza que deseja avançar a revisão deste documento?')
				.textContent('A ação não poderá ser desfeita.')
				.ariaLabel('Deseja avançar a revisão deste documento? Esta ação não poderá ser desfeita.')
				.targetEvent(ev)
				.ok('Sim')
				.cancel('Não');

			$mdDialog.show(confirm).then(
				function() {
					GDoksFactory.avancarRevisao($scope.documento)
					.success(function(response){
						if(response.error == 0){
							var rev = {
								data_limite:$scope.documento.revisoes[0].data_limite,
								id:response.newId,
								ua:null,
								serial:response.newSerial,
								progresso_a_validar: 0,
								progresso_validado:0
							};
							$scope.documento.revisoes.unshift(rev);

							// recalculando o status do documento
							$scope.documento.status = statusDeDocumento($scope.documento);

							$mdToast.show(
								// Retornando toast para usuário
								$mdToast.simple()
								.textContent('Revisão avançou com sucesso!')
								.position('bottom left')
								.hideDelay(5000)
							);
						} else {
							$mdToast.show(
								// Retornando toast para usuário
								$mdToast.simple()
								.textContent('Ocorreu um erro ao tentar avançar a revisão: ' + response.error )
								.position('bottom left')
								.hideDelay(5000)
							);
						}
					})
					.error(function(error){
						$mdToast.show(
							// Retornando toast para usuário
							$mdToast.simple()
							.textContent('Ocorreu um erro ao tentar avançar a revisão.')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(response);
					})
				}
			);
		}

		// FUNÇÕES AUXILIARES = = = = = = = = = = = = = = = = = = = =
		function ValidarProgressoDialogController($scope,$cookies,doc,parentScope){
			$scope.doc = doc;

			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.validar = function(){
				GDoksFactory.validarProgresso($scope.doc.id,$scope.doc.revisoes[0].progresso_a_validar)
				.success(function(response){
					// Atualizando documento localmente
					parentScope.documento.revisoes[0].pdas[0].progresso_total = $scope.doc.revisoes[0].progresso_a_validar + $scope.doc.revisoes[0].progresso_validado;
					parentScope.documento.revisoes[0].progresso_validado = $scope.doc.revisoes[0].progresso_a_validar + $scope.doc.revisoes[0].progresso_validado;
					parentScope.documento.revisoes[0].progresso_a_validar = 0;
					parentScope.documento.revisoes[0].pdas[0].validador = parentScope.usuarios.find(function(u){return u.id == this},$cookies.getObject('user').id);
					parentScope.documento.revisoes[0].pdas[0].idu_validador = parentScope.documento.revisoes[0].pdas[0].validador.id;
					parentScope.documento.revisoes[0].pdas[0].datahora_validacao = new Date();

					// Atualizando status do documento
					parentScope.documento.status = statusDeDocumento(parentScope.documento);

					// escondendo caixa de diálogo
					$mdDialog.hide();

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Progresso de documento validado')
						.position('bottom left')
						.hideDelay(5000)
					);
				})
				.error(function(error){})
			}
		}

		function carregaDocumento(id){
			// Mostra o carregando
			$scope.root.carregando = true;

			// Faz a requisição a factory
			GDoksFactory.getDocumento(id)
			.success(function(response){
				// Esconde carregando
				$scope.root.carregando = false;

				// Lendo resposta
				var doc = response.documento;

				// Salvando no histórico
				$scope.root.addDocumentoAoHistorico(doc);
				
				// Parsings...
				doc.datahora_do_checkout = (doc.datahora_do_checkout==null) ? null : new Date(doc.datahora_do_checkout);
				for (var i = doc.revisoes.length - 1; i >= 0; i--) {
					doc.revisoes[i].data_limite = new Date(doc.revisoes[i].data_limite+'T00:00:00');
					doc.revisoes[i].ua = new Date(doc.revisoes[i].ua);

					// parsing pdas
					if(doc.revisoes[i].pdas != null){
						for (var j = doc.revisoes[i].pdas.length - 1; j >= 0; j--) {

							// Parsing validador
							if(doc.revisoes[i].pdas[j].idu_validador==null){
								doc.revisoes[i].pdas[j].validador = null;
							} else {
								doc.revisoes[i].pdas[j].validador = $scope.usuarios.find(function(u){return u.id==this},doc.revisoes[i].pdas[j].idu_validador);
								doc.revisoes[i].pdas[j].datahora_validacao = new Date(doc.revisoes[i].pdas[j].datahora_validacao);
							}
						}
					}
				}

				// Definindo o status do documento;
				doc.status = statusDeDocumento(doc);

				// Carrega documento no scope
				$scope.documento = doc;
			})
			.error(function(error){
				$scope.root.carregando = false;
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar documento: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			});
		}

		function carregaTamanhosDePapel(){
			GDoksFactory.getTamanhosDePapel()
			.success(function(response){
				$scope.tamanhosDePapel = response.tamanhosDePapel;
				$scope.tamanhoPadrao = $scope.tamanhosDePapel.find(function(a){
						return a.nome == "A4";
					});

				// Montando dicionário
				$scope.dic_tamanhosDePapel = [];
				for (var i = $scope.tamanhosDePapel.length - 1; i >= 0; i--) {
					$scope.dic_tamanhosDePapel[$scope.tamanhosDePapel[i].id] = $scope.tamanhosDePapel[i].nome;
				}
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar tamanhos de papel: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Enviando erro para o console
				console.warn(error);
			})
		}

		function carregaUsuarios(){
			indexedDB.open("gdoks").onsuccess = function(evt){
				evt.target.result.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
					$scope.$apply(function(){
						$scope.usuarios = evt.target.result;
					});
					carregaDocumento($routeParams.id)
				}
			}
		}

		function statusDeDocumento(doc){
			// Possíveis status de documento:
			// - DOCSTATUS_INVALIDO = 0;
			// - DOCSTATUS_VIRGEM = 1;
			// - DOCSTATUS_CHECKOUT = 2;
			// - DOCSTATUS_AGUARDANDO_VALIDACAO = 3;
			// - DOCSTATUS_VALIDADO = 4;
			// - DOCSTATUS_CONCLUIDO = 5;

			// Definindo o valor padrão do estado
			var status = DOCSTATUS_INVALIDO;

			// Caso ele esteja com checkout
			if(doc.idu_checkout == null && (doc.revisoes[0].pdas == undefined || doc.revisoes[0].pdas.length ==0)){
				status = DOCSTATUS_VIRGEM;
				return status;
			}

			if(doc.idu_checkout == null && doc.revisoes[0].progresso_a_validar>0){
				status = DOCSTATUS_AGUARDANDO_VALIDACAO;
				return status;
			}

			if(doc.idu_checkout == null && doc.revisoes[0].progresso_a_validar == 0 && doc.revisoes[0].progresso_validado == 100){
				status = DOCSTATUS_CONCLUIDO;
				return status;
			}

			if(doc.idu_checkout == null && doc.revisoes[0].progresso_a_validar == 0 && doc.revisoes[0].progresso_validado < 100){
				status = DOCSTATUS_VALIDADO;
				return status;
			}

			if(doc.idu_checkout != null && doc.revisoes.length > 0 && doc.revisoes[0].progresso_a_validar == 0){
				status = DOCSTATUS_CHECKOUT;
				return status;
			}

			return status;
		}
	}


})();
