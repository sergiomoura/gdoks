(function(){
	angular.module('Projetos',['ngFileUpload','ngTagsInput'])
	.controller('ProjetosController',ProjetosController)
	.controller('ProjetoController',ProjetoController)
	.controller('DashProjetoController',DashProjetoController);

	function ProjetosController($scope,GDoksFactory,$location){

		// Definindo o valor mínimo para que a busca de projeto seja executada
		$scope.minBusca = 3;
		$scope.q = {'nome':''};

		// Definindo a variável de scopo 'projetos'
		$scope.projetos = null;
		$scope.historico = null;

		// Definindo variável local auxiliar ids_historico
		var ids_projetos = null;

		// Definindo critério padrão de ordem
		$scope.o = 'nome';

		// Definindo valor padrão para mostrar inativos ou não
		$scope.mostrarInativos = false;
		
		// Carregando projetos sem listar os inativos
		getProjetos($scope.mostrarInativos);
		

		// Carregando histórico de projetos carregados
		GDoksFactory.getHistProjetos()
		.success(function(response){
			ids_projetos = response.historico;
			parseHistorico();
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Falha ao tentar carregar histórico de projetos')
				.position('bottom left')
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(error);
		});

		// Definindo função que cria vetor de histórico de projetos
		function parseHistorico(){
			if($scope.projetos != null && ids_projetos != null){

				// Definindo o histórico como um vetor vazio
				$scope.historico = [];

				// Construindo vetor de histórico
				for (var i = 0; i < ids_projetos.length; i++) {
					$scope.historico.push($scope.projetos.find(function(a){return a.id == this},ids_projetos[i].id_projeto))
				}
			}
		}


		// Definindo função que carrega projetos
		function getProjetos(listarInativos){

			// Mostrar carregando
			$scope.root.carregando = true;

			GDoksFactory.getProjetosDetalhados(listarInativos)
			.success(function(response){
				// Escondendo carregando
				$scope.root.carregando = false;

				// Lendo response para o scope
				$scope.projetos = response.projetos;

				// Parsing histórico
				parseHistorico();
			})
			.error(function(error){

				// Esconde Carregando
				$scope.root.carregando = false;
				
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar os projetos do servidor.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			});

		}
			
		// Definindo função que será executada ao clicar no botão de listar projetos
		$scope.onListarProjetosClick = function(){

			// Trocando o valor de mostrarInativos
			$scope.mostrarInativos = !$scope.mostrarInativos;

			// Recarregando projetos
			getProjetos($scope.mostrarInativos);
		}	

		// função que leva para a tela de adicionar projeto
		$scope.goToAddProjeto = function(){
			$location.url('/projetos/0');
		}

		// Função que leva a tela de edição de projeto
		$scope.editProjeto = function(id,evt){
			evt.stopPropagation();
			$location.url('/projetos/'+id);
		}

		// Função que leva a dashboard do projeto
		$scope.gotoProjeto = function(id){
			$location.url('/projetos/'+id+'/dashboard');
		}

		// Função que altera a ordem de exibição dos projetos
		$scope.setOrderBy = function(ordem){
			if($scope.o == ordem){
				$scope.o = '-' + ordem;
			} else {
				$scope.o = ordem;
			}
		}


		// Função que baixa LDP
		$scope.baixarLDP = function(idProjeto,evt){
			evt.stopPropagation();
			GDoksFactory.baixarLDP(idProjeto);
		}
	};

	function ProjetoController($scope,$routeParams,$timeout,$cookies,Upload,GDoksFactory,$mdToast,$location){

		// Variáveis de controle sobre o conteúdo de clientes e usuários (se info já foi carregada da base);
		var clientesCarregados = false;
		var usuariosCarregados = false;
		var disciplinasCarregadas = false;
		var cargosCarregados = false;
		var documentosCarregados = false;

		// Carregando clientes da base local
		GDoksFactory.getClientes()
		.success(function(response){
			$scope.clientes = response.clientes;
			$scope.clientes.selecionado = undefined;
			clientesCarregados = true;
	 		carregaProjeto();
		})
		.error(function(error){
			// Retornando Toast para usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Falha ao carregar clientes.')
				.position('bottom left')
				.hideDelay(5000)
			);
		});

		// Carregando usuarios da base local
		GDoksFactory.loadUsuarios()
		.success(function(response){
				// Carregando usuários
				$scope.usuarios = response.usuarios;
				usuariosCarregados = true;
				carregaProjeto();
			}
		)
		.error(function(error){});


		// Carregando disciplinas do servidor
		$scope.disciplinas = [];
		GDoksFactory.getDisciplinas()
		.success(function(response){
			$scope.disciplinas = response.disciplinas;
			disciplinasCarregadas = true;
			carregaProjeto();
		})
		.error(function(error){});

		// Carregando cargos do servidor
		$scope.cargos = [];
		GDoksFactory.getCargos().success(function(response){
			$scope.cargos = response.cargos;
			cargosCarregados = true;
			carregaProjeto();
		});

		// Carregando configurações do GDoks
		$scope.geraCodigosAutomaticamente = false;
		GDoksFactory.getConfiguracoes().
		success(function(response){
			$scope.geraCodigosAutomaticamente = (response.config.GERAR_CODIGOS_DE_PROJETOS_AUTOMATICAMENTE.valor === true);
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

		// Função a ser executada depois de carregados clientes e usuários da base
		function carregaProjeto(){
			// Só executa quando clientes e usuários foram carregados.
			if(clientesCarregados && usuariosCarregados && disciplinasCarregadas && cargosCarregados){
				$scope.projeto = {};
				$scope.projeto.id = $routeParams.id;
								
				// Criando o projeto em questão
				if($scope.projeto.id == 0 || $scope.projeto.id == undefined) {

					// Verificando se o cliente está setado na URL
					var search = $location.search();
					var id_cliente;
					if(search.c == undefined){
						id_cliente = 0;
					} else {
						id_cliente = search.c;
						$scope.clientes.selecionado = $scope.clientes.find(function(c){return c.id == this},id_cliente);
					}
					 
					// Projeto novo
					$scope.projeto.id = 0
					$scope.projeto.nome = '';
					$scope.projeto.codigo = '';
					$scope.projeto.id_cliente = id_cliente;
					$scope.projeto.id_responsavel = 0;
					$scope.projeto.data_inicio_p = new Date();
					$scope.projeto.data_final_p = new Date();
					$scope.projeto.ativo = true;
					$scope.projeto.daos = [];
					$scope.projeto.areas = [];
					$scope.projeto.subareas = [];
					$scope.projeto.documentos = [];
					$scope.inicialmenteAtivo = true;

					// Se o cliente for conhecido, carregue as propostas feitas a ele.
					if(id_cliente != 0){
						carregaPropostas();
					}
				} else {
					GDoksFactory.getProjeto($scope.projeto.id)
					.success(function(response){
						$scope.projeto = response.projeto;
						$scope.projeto.id_responsavel = ($scope.projeto.id_responsavel==null)?0:$scope.projeto.id_responsavel;
						$scope.projeto.id_cliente = ($scope.projeto.id_cliente==null)?0:$scope.projeto.id_cliente;
						$scope.clientes.selecionado = $scope.clientes.filter(function(a){return a.id==this},$scope.projeto.id_cliente)[0];
						$scope.usuarios.selecionado = $scope.usuarios.filter(function(a){return a.id==this},$scope.projeto.id_responsavel)[0];
						$scope.projeto.ativo = ($scope.projeto.ativo == 1);
						$scope.inicialmenteAtivo = $scope.projeto.ativo;

						// parsing dates
						if($scope.projeto.data_inicio_p != null){
							$scope.projeto.data_inicio_p = new Date($scope.projeto.data_inicio_p);
							$scope.projeto.data_inicio_p.setTime($scope.projeto.data_inicio_p.getTime() + (3*60*60*1000)) // ajustando para horário local do Brasil
						}
						if($scope.projeto.data_final_p != null){
							$scope.projeto.data_final_p = new Date($scope.projeto.data_final_p);
							$scope.projeto.data_final_p.setTime($scope.projeto.data_final_p.getTime() + (3*60*60*1000)) // ajustando para horário local do Brasil
						}

						// parsing subareas
						var area;
						for (var i = $scope.projeto.subareas.length - 1; i >= 0; i--) {
							$scope.projeto.subareas[i].area = $scope.projeto.areas.find(function(a){return a.id==this},$scope.projeto.subareas[i].id_area);
							delete $scope.projeto.subareas[i].id_area;
						}

						// Carrega documentos
						$scope.carregaDocumentos();

						// Carrega propostas do cliente deste projeto
						carregaPropostas();
						
					})
					.error(function(error){
					})
				}
			}
		}

		// Função que carrega documentos de projeto
		$scope.carregaDocumentos = function (){
			if ($scope.projeto.id != 0) {
				GDoksFactory.getDocumentosDoProjeto($scope.projeto.id)
				.success(function(response){
					var docs = response.documentos;
					var achouSub,j,k;
					for (var i = docs.length - 1; i >= 0; i--) {
						// parsing data_limite
						docs[i].data_limite = new Date(docs[i].data_limite+'T00:00:00');

						// Corrigindo fuso
						docs[i].data_limite.setMinutes(docs[i].data_limite.getMinutes() + docs[i].data_limite.getTimezoneOffset());
						
						// parsing subarea
						docs[i].subarea = $scope.projeto.subareas.find(function(a){return a.id == this},docs[i].id_subarea);
						delete docs[i].id_subarea;

						// parsing subdisciplinas
						achouSub = false;
						j = 0;
						while(j<$scope.disciplinas.length && !achouSub){
							k = 0;
							while(k<$scope.disciplinas[j].subs.length && !achouSub){
								achouSub = ($scope.disciplinas[j].subs[k].id == docs[i].id_subdisciplina);
								if(achouSub){
									docs[i].subdisciplina = $scope.disciplinas[j].subs[k];
									docs[i].subdisciplina.disciplina = $scope.disciplinas[j];
									delete docs[i].id_subdisciplina;
								}
								k++;
							}
							j++;
						}

						// parsing dependências
						for (var j = docs[i].dependencias.length - 1; j >= 0; j--) {
							docs[i].dependencias[j] = docs.find(function(a){return a.id==this},docs[i].dependencias[j]);
						}

						// Parsing data_limite
						if(docs[i].data_limite != null){
							docs[i].data_limite = new Date(docs[i].data_limite);
							docs[i].data_limite.setTime(docs[i].data_limite.getTime() + (3*60*60*1000)); // ajustando para o horário local do brasil!
						}
						
						// Parsing HHs
						for (var j = docs[i].hhs.length - 1; j >= 0; j--) {
							docs[i].hhs[j].cargo = $scope.cargos.find(function(a){return a.id == this},docs[i].hhs[j].id_cargo);
							delete docs[i].hhs[j].id_cargo;
						}
					}
					$scope.projeto.documentos = docs;
				})
				.error(function(err){});
			}
		}

		// Função que carrega propostas de cliente
		function carregaPropostas(){
			GDoksFactory.getPropostasDeCliente($scope.clientes.selecionado.id)
			.success(function(response){
				$scope.propostas = response.propostas;
				parsePropostas();
				associarPropostaAoProjeto();
			})
			.error(function(error){
				// Retornando Toast para usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao carregar propostas do cliente selecionado.')
					.position('bottom left')
					.hideDelay(5000)
				);
			});

			function parsePropostas(){
				// removendo propostas que estejam já estejam associadas a outros projetos
				$scope.propostas = $scope.propostas.filter(function(a){
					return a.id_projeto_associado==null || a.id_projeto_associado==this
				},$scope.projeto.id);

				// Parsing datas
				var p;
				for (var i = 0; i < $scope.propostas.length; i++) {
					p = $scope.propostas[i];
					p.aprovacao = p.aprovacao==null ? null : new Date(p.aprovacao);
					p.emissao = p.emissao==null ? null : new Date(p.emissao);
					p.criacao = new Date(p.criacao);
				}
			}

			function associarPropostaAoProjeto(){
				if($scope.projeto.id_versao_de_proposta != null || ($scope.projeto.id_versao_de_proposta == null && $location.search().ivdp)){
					if($scope.projeto.id_versao_de_proposta == null){
						$scope.projeto.id_versao_de_proposta = $location.search().ivdp;
					}
					var achou = false;
					var i = 0;
					var j;
					while(i < $scope.propostas.length && !achou){
						j = 0;
						p = $scope.propostas[i];
						while(j < p.versoes.length && !achou){
							if(p.versoes[j].id == $scope.projeto.id_versao_de_proposta){
								$scope.propostas.selecionada = $scope.propostas[i];
								$scope.propostas.selecionada.versoes.selecionada = p.versoes[j];
								achou = true;
							}
							j++;
						}
						i++;
					}
				}
			}
		}

		// Leva até a página de criar nova proposta
		$scope.gotoNovaProposta = function(){
			$location.url('/propostas/0?id_cliente='+$scope.clientes.selecionado.id);
		}

		// Função que é executada quando a proposta do projeto é alterada
		$scope.onPropostaChange = function(){
			$scope.projeto.id_versao_de_proposta = null;
		}

		// Função que é executada quando a versao da proposta é alterada
		$scope.onVersaoChange = function(){
			$scope.projeto.id_versao_de_proposta = $scope.propostas.selecionada.versoes.selecionada.id;
		}

		// Função que é executada quando o cliente é alterado
		$scope.onClienteChange = function(){
			carregaPropostas();
		}


		// definindo função Cancel
		$scope.cancel = function(){
			window.location = '/webapp/WebGDoks.php#/projetos';
		}

		// Definindo função que salva o projeto
		$scope.salvarProjeto = function(){

			// Mostra carregando
			$scope.root.carregando = true;

			// copiando o objeto projeto
			var projeto = angular.copy($scope.projeto);
			projeto.id_cliente = $scope.clientes.selecionado.id;
			projeto.id_responsavel = $scope.usuarios.selecionado.id;
			projeto.id_versao_de_proposta = $scope.propostas.selecionada ? $scope.propostas.selecionada.versoes.selecionada.id : null;
			
			// removendo campos que não serão enviados
			delete projeto.daos;
			delete projeto.areas;
			delete projeto.documentos;
			delete projeto.subareas;

			if(projeto.id == 0){
				GDoksFactory.adicionarProjeto(projeto)
				.success(
					function(response){

						// Esconde Carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Dados do projeto inseridos com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);

						$scope.projeto.id = 1*response.newId;
						projeto.id = response.newId;

						// Adicionando projeto na base local
						indexedDB.open('gdoks').onsuccess = function(evt){
							// limpando dados para armazenamento na base local.
							delete projeto.id_responsavel;
							delete projeto.data_inicio_p;
							delete projeto.data_final_p;

							// armazenando
							var reqAdd = evt.target.result.transaction('projetos','readwrite').objectStore('projetos').add(projeto);
							reqAdd.onsuccess = function(evt){}
							reqAdd.onerror = function(evt){}
						}

						// Alterando url para que fique condizente com o do id do projeto recém criado
						$location.url('/projetos/'+$scope.projeto.id);
					}
				)
				.error(
					function(error){
						// Esconde Carregando
						$scope.root.carregando = false;

						// Exibindo mensagem de erro no console
						console.warn(error);

						// Retornando Toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível completar ação.')
							.position('bottom left')
							.hideDelay(5000)
						);
					}
				);
			} else {
				GDoksFactory.atualizarProjeto(projeto)
				.success(
					function(response){
						// Esconde Carregando
						$scope.root.carregando = false;

						// Retornando toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Dados do projeto alterados com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Atualizando projeto na base local
						indexedDB.open('gdoks').onsuccess = function(evt){
							// limpando dados para armazenamento.
							delete projeto.id_responsavel;
							delete projeto.data_inicio_p;
							delete projeto.data_final_p;

							// armazenando.
							evt.target.result.transaction('projetos','readwrite').objectStore('projetos').put(projeto);
						}
					}
				)
				.error(
					function(error){
						// Esconde Carregando
						$scope.root.carregando = false;

						// Exibindo mensagem de erro no console
						console.warn(error);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível completar a ação!')
							.position('bottom left')
							.hideDelay(5000)
						);
					}
				);
			}
		}
	};

	function DashProjetoController($scope,GDoksFactory,$location,$routeParams,$mdToast,$mdDialog){
		
		// Definindo variáveis de scope
		$scope.projeto = {};
		$scope.documentos = [];
		$scope.grds = [];

		// Declarando variáveis auxiliares
		var id_projeto = $routeParams.id;

		// Carregando projeto	
		GDoksFactory.getProjeto(id_projeto)
		.success(function(response){
			if(response.error == 0){
				// Parsing datas do projeto
				response.projeto.data_inicio_p = new Date(response.projeto.data_inicio_p+'T00:00:00');
				response.projeto.data_final_p = new Date(response.projeto.data_final_p+'T00:00:00');
				$scope.projeto = response.projeto;
			} else {
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar carregar dados do projeto: ' + response.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			}
		})
		.error(function(err){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent(err.msg)
				.position('bottom left')
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(err);
		})

		// Carregando estatísticas de projeto
		GDoksFactory.getEstatisticasDeProjeto(id_projeto);

		// Carregando documentos do projeto
		GDoksFactory.getDocumentosDoProjeto($routeParams.id)
		.success(function(response){
			if(response.error == 0){
				// parsing datas limites dos documentos
				response.documentos.data_limite = new Date(response.documentos.data_limite+'T00:00:00');
				$scope.documentos = response.documentos;
			} else {
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar carregar documentos do projeto: ' + response.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			}
		})
		.error(function(err){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent(err.msg)
				.position('bottom left')
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(err);
		});

		// Carregando GRDs do projeto
		GDoksFactory.getGrdsDoProjeto($routeParams.id)
		.success(function(response){
			if(response.error == 0){
				// Parsing datahora
				var grd;
				for (var i = response.grds.length - 1; i >= 0; i--) {
					grd = response.grds[i];
					grd.datahora_registro = new Date(grd.datahora_registro);
					grd.datahora_enviada = (grd.datahora_enviada==null?null:(new Date(grd.datahora_enviada)));
				}
				$scope.grds = response.grds;
			} else {
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar carregar GRDs do projeto: ' + response.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			}
		})
		.error(function(err){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent(err.msg)
				.position('bottom left')
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(err);
		});

		// Função que leva a página do documento
		$scope.goToDoc = function(id_doc){
			$location.url('/documentos/'+id_doc);
		}

		// Função que leva a página da GRD
		$scope.goToGrd = function(id_grd){
			$location.url('/grds/'+id_grd);
		}

		// Função executada ao clicar em Alterar Documento
		$scope.onAlterarDocumentoClick = function(id_doc,evt){
			evt.stopPropagation();
			$location.url('/documentos/'+id_doc+'/edit');
		}

		// Função executada ao clicar em Remover Documento
		$scope.onRemoverDocumentoClick = function(documento,evt){
			
			// Parando a propagação do click
			evt.stopPropagation();

			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Tem certeza que deseja remover o cadastro deste documento?')
				.textContent('A ação não poderá ser desfeita.')
				.ariaLabel('Deseja remover cadastro de documento?')
				.targetEvent(evt)
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
						var pos = $scope.documentos.findIndex(function(a){return a.id==this},documento.id);
						
						// Removendo o documento do vetor de documentos do projeto
						$scope.documentos.splice(pos,1);

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
		}

		// Função executada ao clicar no Duplicar Documento
		$scope.onDuplicarDocumentoClick = function(id_doc,evt){

			// Parando a propagação do click
			evt.stopPropagation();

			// Indo para edição do documento
			$location.url('/documentos/0/edit?clone='+id_doc);
		}

		// Função executada ao clicar no Adicionar Documento
		$scope.onAdicionarDocumentoClick = function(){
			// Indo para edição do documento
			$location.url('/documentos/0/edit?id_projeto='+$scope.projeto.id);
		}

		$scope.onCriarGrdClick = function(){
			// Indo para criação de uma GRD
			$location.url('/grds/0?id_cliente='+$scope.projeto.id_cliente+'&id_projeto='+$scope.projeto.id);
		}

	};

})();