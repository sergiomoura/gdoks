(function(){
	
	// Definindo o módulo
	var module = angular.module('Propostas',[]);

	// Atribuindo controllers
	module.controller('PropostasController', PropostasController);
	module.controller('PropostaController',PropostaController);
	module.controller('NovaPropostaController',NovaPropostaController);

	// Definindo o controller
	function PropostasController($scope,GDoksFactory,$mdToast,$location){

		// Definindo variáveis do scope
		$scope.clientes = null;
		$scope.propostas = null;
		$scope.busca = {
			codigo:'',
			de:null,
			ate:null,
			id_cliente:null
		}
		// Carregando clientes da base de dados
		GDoksFactory.getClientes()
		.success(function(response){
			$scope.clientes = response.clientes;
			parsePropostas();
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent(error.msg)
				.position('bottom left',error.msg)
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(error);
		});

		// Carregando propostas
		GDoksFactory.getUltimasPropostas()
		.success(function(response){
			$scope.propostas = response.propostas;
			parsePropostas();
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Falha ao tentar corregar propostas')
				.position('bottom left')
				.hideDelay(5000)
			);
		});

		// Função que leva até a página da proposta
		$scope.goToProposta = function(id_proposta){
			$location.url('propostas/'+id_proposta);
		}

		// Função executada ao clicar no botão Nova Proposta
		$scope.onNovaPropostaClick = function(){
			$location.url('propostas/0');
		}

		// Função executada ao clicar no botão buscar
		$scope.onBuscarClick = function(){
			buscar();
		}

		// Função de busca
		function buscar(){
			GDoksFactory.buscarProposta($scope.busca)
			.success(function(response){
				$scope.propostas = response.propostas;
				parsePropostas();
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao buscar propostas: '+error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			});
		}

		// Definindo função que repassa as propostas atribuindo-lhes o cliente
		function parsePropostas(){
			if($scope.propostas!=null && $scope.clientes!=null){
				for (var i = $scope.propostas.length - 1; i >= 0; i--) {
					$scope.propostas[i].cliente = $scope.clientes.find(function(a){return a.id == this},$scope.propostas[i].id_cliente);
					$scope.propostas[i].emissao = ($scope.propostas[i].emissao == null? null : new Date($scope.propostas[i].emissao));
					$scope.propostas[i].criacao = ($scope.propostas[i].criacao == null? null : new Date($scope.propostas[i].criacao));
					$scope.propostas[i].aprovacao = ($scope.propostas[i].aprovacao == null? null : new Date($scope.propostas[i].aprovacao));
				}
			}
		}
	}

	function PropostaController($scope,GDoksFactory,Upload,$cookies,$routeParams,$location,$mdToast,$mdDialog){

		// Lendo id da proposta do routParam
		var id_proposta = $routeParams.id;

		// Definindo valores iniciais para proposta e clientes
		$scope.proposta = null;
		$scope.clientes = null;

		// Carregando clientes da base de dados
		GDoksFactory.getClientes()
		.success(function(response){
			$scope.clientes = response.clientes;
			parseProposta();
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent(error.msg)
				.position('bottom left',error.msg)
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(error);
		});

		// Verificando se é uma nova proposta ou se é uma proposta existente
		if(id_proposta == 0){

			// Capturando um possível id de cliente passado na URL
			var id_cliente = $location.search().id_cliente ? $location.search().id_cliente : 0;

			// Criando proposta vazia.
			$scope.proposta = {
				id:0,
				id_cliente:id_cliente,
				codigo:'',
				versoes:[]
			}

			// Carregando configurações para gerar ou não código automaticamente
			$scope.geraCodigosAutomaticamente = false;
			GDoksFactory.getConfiguracoes().
			success(function(response){
				$scope.geraCodigosAutomaticamente = (response.config.GERAR_CODIGOS_DE_PROPOSTAS_AUTOMATICAMENTE.valor === true);
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

		} else {
			// Carregando proposta da base de dados
			GDoksFactory.getProposta(id_proposta)
			.success(function(response){
				$scope.proposta = response.proposta;
				parseProposta();
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar a proposta: '+error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			});
		}

		$scope.openDialogEnviarProposta = function(evt,versao){
			$mdDialog.show(
				{
					controller: enviarPropostaDialogController,
					locals:{
						parentScope:$scope,
						versao:versao
					},
					templateUrl: './app/modules/Propostas/enviarEmail.dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:false
				});
		}

		$scope.uploadVersaoDeProposta = function(){
			// Verificando se files está definido e se seu tamanho é maior que zero.
			if ($scope.proposta.arquivo) {

				// salvando o id do cliente direto na proposta
				$scope.proposta.id_cliente = $scope.proposta.cliente.id;

				// mostrando barra de progresso de upload
				$scope.mostrarProgressoUpload = true;
				
				// Criando pacote a enviar
				var packToSend = [
					{
						file: $scope.proposta.arquivo,
						codigo: $scope.proposta.codigo,
						id_cliente: $scope.proposta.cliente.id,
						id_proposta: $scope.proposta.id,
						valor_proposta: $scope.proposta.valor
					}
				];

				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/propostas/'+$scope.proposta.id+'/versoes',
	                	data: {profiles: packToSend},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function(response){
	            		if(response.status == 200){

	            			// Escondendo o carregando
	            			$scope.mostrarProgressoUpload = false;

	            			// Criando objeto "versao"
	            			$scope.proposta.versoes.push({
	            				aprovacao: null,
	            				criacao:new Date(response.data.criacao),
	            				emissao:null,
	            				id: response.data.id_versao,
								serial: response.data.serial,
								valor: $scope.proposta.valor
							});
							
							// Exibindo mensagem de sucesso para o usuário
							$mdToast.show(
								$mdToast.simple()
								.textContent('Versão de proposta salva!')
								.position('bottom left')
								.hideDelay(5000)
							);

							// Zerando arquivo de proposta
							$scope.proposta.arquivo = null;
	            		}
	            	},
	            	function(error){
	            		// Imprimindo erro no console
	            		console.warn(error);

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent(error.data.msg)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);

	            		// Esconde o carregando
	            		$scope.mostrarProgressoUpload = false;
	            	},
	            	function (evt) {
						$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
					}
	            )
			}
		}

		$scope.onDeleteVersaoClick = function(evt,serial){
			var confirm = $mdDialog.confirm()
			.title('Tem certeza que deseja remover esta versão da proposta?')
			.textContent('Esta ação não poderá ser desfeita.')
			.ariaLabel('Remover versão')
			.targetEvent(evt)
			.ok('Sim')
			.cancel('Não');
			
			$mdDialog.show(confirm)
			.then(function() {
				deleteVersao(serial);
			});
		}

		function deleteVersao(serial){
			GDoksFactory.deleteVersao($scope.proposta.id,serial)
			.success(function(response){
				var v = $scope.proposta.versoes;
				v.splice(v.findIndex(function(a){return a.serial==this},serial),1);
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível remover versão: '+error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			})
		}

		$scope.deleteProposta = function(){
			GDoksFactory.deleteProposta($scope.proposta.id)
			.success(function(response){
				$location.url('/propostas');
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível remover proposta: '+error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			})
		}

		$scope.downloadVersaoDeProposta = function(serial){
			GDoksFactory.downloadVersaoDeProposta($scope.proposta.id,serial);
		}

		$scope.onAprovarVersaoClick = function(evt,serial){
			var algumaVersaoAprovada = false;
			for (var i = $scope.proposta.versoes.length - 1; i >= 0; i--) {
				algumaVersaoAprovada = algumaVersaoAprovada || ($scope.proposta.versoes[i].aprovacao!=null);
			}

			if(algumaVersaoAprovada){
				var confirm = $mdDialog.confirm()
				.title('Marcar esta versão da proposta como aprovada?')
				.textContent('Isso fará com que as outras versões sejam reprovadas já que somente uma versão pode ser aprovada.')
				.ariaLabel('Marcar como aprovada')
				.targetEvent(evt)
				.ok('Sim')
				.cancel('Não');
				
				$mdDialog.show(confirm)
				.then(function() {
					aprovarVersao(serial);
				});
			} else {
				aprovarVersao(serial);
			}
		}

		function aprovarVersao(serial){
			GDoksFactory.aprovarVersao($scope.proposta.id,serial)
			.success(function(response){
				for (var i = $scope.proposta.versoes.length - 1; i >= 0; i--) {
					$scope.proposta.versoes[i].aprovacao = null;
				}
				$scope.proposta.versoes.find(function(a){return a.serial == this},serial).aprovacao = new Date(response.aprovacao);
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível aprovar a versão da proposta: '+error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			})
		}

		$scope.onReprovarVersaoClick = function(evt,serial){
			var confirm = $mdDialog.confirm()
				.title('Marcar esta versão da proposta como reprovada?')
				.textContent('Essa versão está marcada como APROVADA pelo cliente. Tem certeza que deseja mudar isso?.')
				.ariaLabel('Marcar como reprovada')
				.targetEvent(evt)
				.ok('Sim, marque versão como reprovada')
				.cancel('Não');
				
				$mdDialog.show(confirm)
				.then(function() {
					reprovarVersao(serial);
				});
		}

		function reprovarVersao(serial){
			GDoksFactory.reprovarVersao($scope.proposta.id,serial)
			.success(function(response){
				$scope.proposta.versoes.find(function(a){return a.serial == this},serial).aprovacao = null;
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível reprovar a versão da proposta: '+error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			})
		}

		$scope.onFazerProjetoClick = function(evt,id_versao_de_proposta){
			$location.url('/projetos/0?c=' + $scope.proposta.id_cliente + '&ivdp=' + id_versao_de_proposta);
		}

		function parseProposta(){
			if($scope.proposta != null && $scope.clientes!= null){
				// Atribuindo cliente
				if($scope.proposta.id_cliente != 0){
					$scope.proposta.cliente = $scope.clientes.find(function(c){return c.id==this},$scope.proposta.id_cliente);
				} else {
					$scope.proposta.cliente = null;
				}

				// Parsing datas de versões
				var v;
				for (var i = $scope.proposta.versoes.length - 1; i >= 0; i--) {
					v = $scope.proposta.versoes[i];
					v.criacao = new Date(v.criacao);
					v.emissao = (v.emissao == null ? null : new Date(v.emissao));
					v.aprovacao = (v.aprovacao == null? null : new Date(v.aprovacao));
				}
			}
		}

		function enviarPropostaDialogController($scope,parentScope,versao,GDoksFactory,$cookies,$mdToast)
		{
			// Definindo variável que manterá as configurações
			var config = null;

			// Carregando configurações do servidor
			GDoksFactory.getConfiguracoes()
			.success(function(response){
				config = response.config;
				$scope.mail = setUpMail();
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

			// Amarrando a grd deste scope com o parentScope
			$scope.versao = versao;

			// Carregando informaç~oes do usuário
			var user = $cookies.getObject('user');

			function setUpMail(){

				// Construindo assunto a partir das configurações
				var assunto = config.ASSUNTO_PADRAO_ENVIO_PROPOSTA.valor;
				assunto = assunto
							.replace('$proposta_codigo',parentScope.proposta.codigo)
							.replace('$proposta_versao',versao.serial)
							.replace('$empresa_nome',user.nome_empresa)
							.replace('$usuario_nome',user.nome)
							.replace('$usuario_email',user.email);

				// Construindo menssagem a partir das configurações
				var msg = config.MSG_PADRAO_ENVIO_PROPOSTA.valor;
				msg = msg
						.replace('$proposta_codigo',parentScope.proposta.codigo)
						.replace('$proposta_versao',versao.serial)
						.replace('$empresa_nome',user.nome_empresa)
						.replace('$usuario_nome',user.nome)
						.replace('$usuario_email',user.email);

				// Contruindo assinatura de mensagem a partir das configurações
				var ass = config.ASSINATURA_ENVIO_GRD.valor;
				ass = ass
						.replace('$proposta_codigo',parentScope.proposta.codigo)
						.replace('$proposta_versao',versao.serial)
						.replace('$empresa_nome',user.nome_empresa)
						.replace('$usuario_nome',user.nome)
						.replace('$usuario_email',user.email);

				// Definindo MAIL
				return {
					destinatarios:[
						{
							nome:parentScope.proposta.cliente.contato_nome,
							email:parentScope.proposta.cliente.contato_email
						}
					],
					assunto:assunto,
					msg:msg+ass
				}
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

				GDoksFactory.mailProposta(parentScope.proposta.id,versao.serial,$scope.mail)
				.success(function(response){
					// Esconde carregando
					parentScope.root.carregando = false;

					// Verificando se tem algum erro no envio
					if(response.error == 0){
						// Atualizando a datahora de envio da grd
						versao.emissao = new Date(response.emissao);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Proposta enviada com successo!')
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
						.textContent('Falha no envio da proposta')
						.position('bottom left')
						.hideDelay(5000)
					);

					// imprimindo erro no console
					console.warn(error);
				});
			}
		}

		$scope.onSalvarClick = function(){
			
			GDoksFactory.alterarProposta($scope.proposta)
			.success(function(){
				// Retornando Toast para usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Proposta alterada com sucesso')
					.position('bottom left')
					.hideDelay(5000)
				);
			})
			.error(function(error){
				$mdToast.show(
					$mdToast.simple()
					.textContent(error)
					.position('bottom left')
					.hideDelay(5000)
				);
			});
		}
	}

	function NovaPropostaController($scope,GDoksFactory,Upload,$cookies,$routeParams,$location,$mdToast){
		
		// Definindo proposta vazia
		$scope.proposta = {
			id:0,
			codigo:'',
			cliente:null,
			titulo:'',
			valor:undefined
		}

		// Carregando clientes
		GDoksFactory.getClientes()
		.success(function(response){
			$scope.clientes = response.clientes;
		})
		.error(function(error){
			// Retornando Toast para usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Falha ao carregar clientes')
				.position('bottom left')
				.hideDelay(5000)
			);			
		});

		// Carregando configurações para gerar ou não código automaticamente
		$scope.geraCodigosAutomaticamente = false;
		GDoksFactory.getConfiguracoes().
		success(function(response){
			$scope.geraCodigosAutomaticamente = (response.config.GERAR_CODIGOS_DE_PROPOSTAS_AUTOMATICAMENTE.valor === true);
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

		$scope.createVersaoDeProposta = function(){

			// Verificando se files está definido e se seu tamanho é maior que zero.
			if ($scope.proposta.arquivo) {

				// salvando o id do cliente direto na proposta
				$scope.proposta.id_cliente = $scope.proposta.cliente.id;

				// mostrando barra de progresso de upload
				$scope.mostrarProgressoUpload = true;
				
				// Criando pacote a enviar
				var packToSend = [
					{
						file: $scope.proposta.arquivo,
						codigo: $scope.proposta.codigo,
						id_cliente: $scope.proposta.cliente.id,
						id_proposta: $scope.proposta.id,
						titulo_proposta: $scope.proposta.titulo,
						valor_proposta:$scope.proposta.valor
					}
				];

				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/propostas',
	                	data: {profiles: packToSend},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function(response){
	            		if(response.status == 200){

	            			// Escondendo o carregando
	            			$scope.mostrarProgressoUpload = false;

	            			// Alinhando a url da página
	            			$location.url('/propostas/' + response.data.id_proposta);

	            		}
	            	},
	            	function(error){
	            		// Imprimindo erro no console
	            		console.warn(error);

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent(error.data.msg)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);

	            		// Esconde o carregando
	            		$scope.mostrarProgressoUpload = false;
	            	},
	            	function (evt) {
						$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
					}
	            )
			}
		}

		$scope.onCancelarClick = function(){
			$location.url('propostas');
		}
	}

})();