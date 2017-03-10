var controllers = {};

controllers.RootController = function($scope,$interval,$cookies,GDoksFactory){

	// definindo o objeto root.
	$scope.root = {};

	// Definindo função que carrega usuários do servidor
	$scope.root.loadUsuarios = function(){
		GDoksFactory.loadUsuarios()
			.success(
				function(response){
					// Carregando usuários
					var usuarios = response.usuarios;

					// Conectando-se a base de dados
					var reqOpen = indexedDB.open("gdoks");
					
					reqOpen.onsuccess = function(evt){
						// Capturando a conexão com a base
						var db = evt.target.result;

						// Conectando-se a ObjectStore "usuarios"
						var os_usuarios = db.transaction('usuarios','readwrite').objectStore('usuarios');

						// limpando a tabela de usuários
						var reqClear = os_usuarios.clear();
						reqClear.onsuccess = function(evt){
							// Adicionando os usuários	
							var addRequest;
							for (var i = usuarios.length - 1; i >= 0; i--) {
								// Normalizando o valor da propriedade ativo para boolean
								usuarios[i].ativo = (usuarios[i].ativo==1);
								
								// adicionando usuários
								addRequest = os_usuarios.add(usuarios[i]);
								addRequest.onerror = function(evt){
									console.error("Impossível adicionar usuário a base.");
								}
							}
						}
					}
				}
			)
			.error(
				function(error){
				}
			);
	};

	// Definindo função que carrega clientes do servidor
	$scope.root.loadClientes = function(){
		GDoksFactory.getClientes()
			.success(
				function(response){
					// Carregando usuários
					var clientes = response.clientes;

					// Conectando-se a base de dados
					var reqOpen = indexedDB.open("gdoks");
					
					reqOpen.onsuccess = function(evt){
						// Capturando a conexão com a base
						var db = evt.target.result;

						// Conectando-se a ObjectStore "clientes"
						var os_clientes = db.transaction('clientes','readwrite').objectStore('clientes');

						// limpando a tabela de usuários
						var reqClear = os_clientes.clear();
						reqClear.onsuccess = function(evt){
							// Adicionando os usuários	
							var addRequest;
							for (var i = clientes.length - 1; i >= 0; i--) {
								// adicionando usuários
								addRequest = os_clientes.add(clientes[i]);
								addRequest.onerror = function(evt){
									console.error("Impossível adicionar cliente a base.");
								}
							}
						}
					}
				}
			)
			.error(
				function(error){
				}
			);
	};

	// Definindo função que carrega projetos do servidor
	$scope.root.loadProjetos = function(){
		GDoksFactory.getProjetos()
		.success(
			function(response){
				// Carregando projetos
				var projetos = response.projetos;

				// Conectando-se a base de dados
				var reqOpen = indexedDB.open("gdoks");
				
				reqOpen.onsuccess = function(evt){
					// Capturando a conexão com a base
					var db = evt.target.result;

					// Conectando-se a ObjectStore "projetos"
					var os_projetos = db.transaction('projetos','readwrite').objectStore('projetos');

					// limpando a tabela de projetos
					var reqClear = os_projetos.clear();
					reqClear.onsuccess = function(evt){
						// Adicionando os projetos	
						var addRequest;
						for (var i = projetos.length - 1; i >= 0; i--) {
							// Normalizando o valor da propriedade ativo para boolean
							projetos[i].ativo = (projetos[i].ativo==1);
							
							// adicionando projetos
							addRequest = os_projetos.add(projetos[i]);
							addRequest.onerror = function(evt){
								console.error("Impossível adicionar projeto a base.");
							}
						}
					}
				}
			}
		)
		.error(
			function(error){
			}
		);
	}

	// Definindo função que carrega disciplinas do servidor
	$scope.root.loadDisciplinas = function(){
		GDoksFactory.getDisciplinas()
		.success(
			function(response){
				// Carregando disciplinas
				var disciplinas = response.disciplinas;

				// Conectando-se a base de dados
				var reqOpen = indexedDB.open("gdoks");
				
				reqOpen.onsuccess = function(evt){
					// Capturando a conexão com a base
					var db = evt.target.result;

					// Conectando-se a ObjectStore "disciplinas"
					var os_disciplinas = db.transaction('disciplinas','readwrite').objectStore('disciplinas');

					// limpando a tabela de disciplinas
					var reqClear = os_disciplinas.clear();
					reqClear.onsuccess = function(evt){
						// Adicionando os disciplinas	
						var addRequest;
						for (var i = disciplinas.length - 1; i >= 0; i--) {
							// Normalizando o valor da propriedade ativo para boolean
							disciplinas[i].ativa = (disciplinas[i].ativa==1);

							// normalizando o valor da propriedade ativa para boolean nas subs
							for (var j = disciplinas[i].subs.length - 1; j >= 0; j--) {
								disciplinas[i].subs[j].ativa = (disciplinas[i].subs[j].ativa == 1);
							};
							
							// adicionando disciplinas
							addRequest = os_disciplinas.add(disciplinas[i]);
							addRequest.onerror = function(evt){
								console.error("Impossível adicionar disciplina a base.");
							}
						}
					}
				}
			}
		)
		.error(
			function(error){
			}
		);
	}

	// Criando base de dados.
	var reqOpen = indexedDB.open("gdoks");
	
	reqOpen.onerror = function(e){
		console.log("Falha na abertura da base.");
		console.dir(e);
	}

	reqOpen.onblocked = function(e){
		console.log("Acesso a base bloqueado.");
		console.dir(e);
	}

	reqOpen.onupgradeneeded = function(e){
		// Criando ObjectStores da base de dados
		var db = e.target.result;

		// Criando ObjectStore de usuários
		var os_usuarios = db.createObjectStore("usuarios",{keyPath: "id"});
		os_usuarios.createIndex("idx_nome","nome",{'unique':false});
		os_usuarios.transaction.addEventListener('complete',function(){
			$scope.root.loadUsuarios();
		})

		// Criando ObjectStore de disciplinas
		var os_disciplinas = db.createObjectStore("disciplinas",{keyPath: "id"});
		os_disciplinas.createIndex("idx_nome","nome",{'sigla':true});
		os_disciplinas.transaction.addEventListener('complete',function(){
			$scope.root.loadDisciplinas();
		})

		// Criando ObjectStore de projetos
		var os_projetos = db.createObjectStore("projetos",{keyPath: "id"});
		os_projetos.createIndex("idx_nome","nome",{'sigla':true});
		os_projetos.transaction.addEventListener('complete',function(){
			$scope.root.loadProjetos();
		})

		// Criando ObjectStore de clientes
		var os_clientes = db.createObjectStore("clientes",{keyPath: "id"});
		os_clientes.createIndex("idx_nome","nome",{'sigla':true});
		os_clientes.transaction.addEventListener('complete',function(){
			$scope.root.loadClientes();
		})
	}

	// Definindo funções que renovam o token
	var refreshToken = function(){
		GDoksFactory.refreshToken()
		.success(
			function(response){
				$scope.root.user.token = response.token;
				$cookies.putObject('user',$scope.root.user);
			}
		)
		.error(
			function(error){
				window.location="/";
			}
		);
	}

	// Acionando timer que renova o token de tempo em tempo
	$interval(refreshToken,TOKEN_REFRESH_IN);
	
	// Definindo valores padrão para a interface
	$scope.root.itemSelecionadoDoMenu = 0;

	// Defininfo valor inicial do item do submenu de projetos.
	$scope.root.itemSelecionadoDoPrjMenu = "prj_documentos";

	// definindo valor inicial para mostrandoMenu
	$scope.root.mostrandoMenu = false;

	// definindo o objeto que guarda as info do usuário logado.
	$scope.root.user = $cookies.getObject('user');
}

controllers.TopoController = function($scope){
	$scope.toggleOpcoesMenu = function(){
		$scope.mostrandoOpcoes = !$scope.mostrandoOpcoes;
		if($scope.mostrandoOpcoes){
			document.getElementById("opcoes").style.top = "36px";
		} else {
			document.getElementById("opcoes").style.top = "-85px";
		}	
	}
}

controllers.OpcoesController = function($scope,$cookies){
	$scope.onTrocarSenhaClick  = function(){
		$scope.root.itemSelecionadoDoMenu = null;
	}
	$scope.logout = function(){
		$cookies.put('token',null);
		window.location = '/';
	}
}

controllers.SenhaController = function($scope,$rootScope,GDoksFactory){
	// Inicializando o objeto data;
	$scope.data = {};
	$scope.data.login = '';
	$scope.data.senha1 = '';
	$scope.data.senha2 = '';
	$scope.obteve_resposta = false;
	$scope.ok = false;
	$scope.msg = '';

	$scope.mudaLoginSenha = function(novoLogin,novaSenha){
		GDoksFactory.mudaLoginSenha(novoLogin,novaSenha)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = true;
					$scope.msg = 'Alterações realizadas com sucesso!';
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = false;
					$scope.msg = error.msg;
				}
			);
	}

	$scope.cancel = function(){
		window.location = "WebGDoks.php#/home"
		$scope.root.itemSelecionadoDoMenu = 0;
	}
}

controllers.NavController = function($scope){
	// Função que altera o item do menu selecionado
	$scope.itemClicked = function(index){
		$scope.root.itemSelecionadoDoMenu = index;
	}
};

controllers.HomeController = function($scope){}

controllers.UsuariosController = function($scope,GDoksFactory){

	// Declarando vetor de usuários
	$scope.usuarios = [];

	// Carregando usuarios da base local
	var openReq = indexedDB.open("gdoks");
	openReq.onsuccess = function(){
		var db = openReq.result;
		db.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
			$scope.$apply(function(){$scope.usuarios = evt.target.result;});
		}
	}

	// função que leva para a tela de adicionar usuário
	$scope.goToAddUsuario = function(){
		window.location = '#/usuarios/0';
	}
};

controllers.UsuarioController = function($scope,$routeParams,GDoksFactory){
	// Capturando o id passado na url
	var id = $routeParams.id;

	// se id== 0, adicionar um novo usuário. se não carregar o usuario de id passado
	if(id == 0) {
		// Criando um usuário vazio.
		$scope.usuario = {};
		$scope.usuario.id = 0;
		$scope.usuario.nome = '';
		$scope.usuario.email = '';
		$scope.usuario.login = '';
		$scope.usuario.ativo = true;
		$scope.inicialmenteAtivo = true;
	} else {
		// Carregando usuário da base
		var openReq = indexedDB.open('gdoks');
		openReq.onsuccess = function(evt){
			var db = openReq.result;
			db.transaction('usuarios').objectStore('usuarios').get(id*1).onsuccess = function(evt){
				$scope.$apply(function(){
					$scope.usuario = evt.target.result;
					$scope.inicialmenteAtivo = ($scope.usuario.ativo == true);
				});
			}
		}
	}
	

	// Definindo função que cancela as alterações
	$scope.cancel = function(){
		window.location = "WebGDoks.php#/usuarios";
		$scope.root.itemSelecionadoDoMenu = 0;
	}

	$scope.salvarUsuario = function(){
		if($scope.usuario.id == 0){
			GDoksFactory.adicionarUsuario($scope.usuario)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;
					$scope.usuario.id = response.newId;
					delete($scope.usuario.senha1);
					delete($scope.usuario.senha2);

					// Salvando usuário na base
					var openReq = indexedDB.open('gdoks');
					openReq.onsuccess = function(evt){
						var db = evt.target.result;
						db.transaction('usuarios','readwrite').objectStore('usuarios').add($scope.usuario);
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		} else {
			GDoksFactory.atualizarUsuario($scope.usuario)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;

					// Atualizando usuário na base
					var openReq = indexedDB.open('gdoks');
					openReq.onsuccess = function(evt){
						var db = evt.target.result;
						db.transaction('usuarios','readwrite').objectStore('usuarios').put($scope.usuario);
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		}
	}
};

controllers.VisaoGeralController = function($scope){};

controllers.ProjetoController = function($scope,GDoksFactory,$routeParams){

	// Variáveis de controle sobre o conteúdo de clientes e usuários (se info já foi carregada da base);
	var clientesCarregados = false;
	var usuariosCarregados = false;

	// Carregando clientes da base local
	$scope.clientes = {};
	$scope.clientes.dados = [];
	indexedDB.open("gdoks").onsuccess = function(evt){
		evt.target.result.transaction("clientes").objectStore("clientes").getAll().onsuccess = function(evt){
			$scope.$apply(function(){
				$scope.clientes.dados = evt.target.result;
				$scope.clientes.dados.unshift({'id':0,'nome':'Selecione o cliente...'});
				$scope.clientes.selecionado = $scope.clientes.dados[0];
				clientesCarregados = true;
				mostraProjeto();
			});
		}
	}

	// Carregando clientes da base local
	$scope.usuarios = {};
	$scope.usuarios.dados = [];
	indexedDB.open("gdoks").onsuccess = function(evt){
		evt.target.result.transaction("usuarios").objectStore("usuarios").getAll().onsuccess = function(evt){
			$scope.$apply(function(){
				$scope.usuarios.dados = evt.target.result;
				$scope.usuarios.dados.unshift({'id':0,'nome':'Selecione um responsável...'})
				$scope.usuarios.selecionado = $scope.usuarios.dados[0];
				usuariosCarregados = true;
				mostraProjeto();
			});
		}
	}

	// Função a ser executada depois de carregados clientes e usuários da base
	var mostraProjeto = function(){
		// Só executa quando clientes e usuários foram carregados.
		if(clientesCarregados && usuariosCarregados){
			$scope.projeto = {};
			$scope.projeto.id = $routeParams.id;
			
			// Criando o projeto em questão
			if($scope.projeto.id == 0 || $scope.projeto.id == undefined) {
				// Projeto novo
				$scope.projeto.id = 0
				$scope.projeto.nome = '';
				$scope.projeto.codigo = '';
				$scope.projeto.id_cliente = 0;
				$scope.projeto.id_responsavel = 0;
				$scope.projeto.data_inicio_p = undefined;
				$scope.projeto.data_final_p = undefined;
				$scope.projeto.ativo = true;
				$scope.projeto.daos = [];
				$scope.projeto.areas = [];
				$scope.projeto.documentos = [];
				$scope.inicialmenteAtivo = true;
			} else {
				GDoksFactory.getProjeto($scope.projeto.id)
				.success(function(response){
					$scope.projeto = response.projeto;
					$scope.projeto.id_responsavel = ($scope.projeto.id_responsavel==null)?0:$scope.projeto.id_responsavel;
					$scope.projeto.id_cliente = ($scope.projeto.id_cliente==null)?0:$scope.projeto.id_cliente;
					$scope.clientes.selecionado = $scope.clientes.dados.filter(function(a){return a.id==this},$scope.projeto.id_cliente)[0];
					$scope.usuarios.selecionado = $scope.usuarios.dados.filter(function(a){return a.id==this},$scope.projeto.id_responsavel)[0];
					$scope.projeto.ativo = ($scope.projeto.ativo == 1);
					$scope.inicialmenteAtivo = $scope.projeto.ativo;
				})
				.error(function(error){
				})
			}
		}
	}

	// definindo função Cancel
	$scope.cancel = function(){
		window.location = '/webapp/WebGDoks.php#/projetos';
	}

	// Definindo função que salva o projeto
	$scope.salvarProjeto = function(){

		// copiando o objeto projeto
		var projeto = angular.copy($scope.projeto);
		projeto.id_cliente = $scope.clientes.selecionado.id;
		projeto.id_responsavel = $scope.usuarios.selecionado.id;
		
		// removendo campos que não serão enviados
		delete projeto.daos;
		delete projeto.areas;
		delete projeto.documentos;

		if(projeto.id == 0){
			GDoksFactory.adicionarProjeto(projeto)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;
					$scope.projeto.id = response.newId;
					projeto.id = response.newId;

					// Adicionando projeto na base local
					indexedDB.open('gdoks').onsuccess = function(evt){
						// limpando dados para armazenamento.
						delete projeto.id_cliente;
						delete projeto.id_responsavel;
						delete projeto.data_inicio_p;
						delete projeto.data_final_p;

						// armazenando
						var reqAdd = evt.target.result.transaction('projetos','readwrite').objectStore('projetos').add(projeto);
						reqAdd.onsuccess = function(evt){
							console.log('ok!');
							console.dir(evt);
						}
						reqAdd.onerror = function(evt){
							console.log('Deu Erro...');
							console.dir(evt);
						}
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		} else {
			GDoksFactory.atualizarProjeto(projeto)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;

					// Atualizando projeto na base local
					indexedDB.open('gdoks').onsuccess = function(evt){
						// limpando dados para armazenamento.
						delete projeto.id_cliente;
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
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		}
	}

	// Definindo função que remove área
	$scope.removerArea = function(id){
		if(confirm("Tem certeza que deseja excluir a área? A ação não poderá ser desfeita.")){
			var area = $scope.projeto.areas.find(function(a){return a.id == this},id);
			area.id_projeto = $scope.projeto.id;
			GDoksFactory.removerArea(area)
				.success(
					function(response){
						$scope.projeto.areas = $scope.projeto.areas.filter(function(a){return a.id!=this},id);
					}
				)
				.error(
					function(error){
						$scope.erroEmOperacaoDeSubdisciplina = error.msg;
					}
				);
		}
	}

	// definindo função que edita area
	$scope.editarArea = function(id){
		if(id != 0){
			$scope.projeto.areas = $scope.projeto.areas.filter(function(a){return a.id!=0});
			$scope.areaEditada = angular.copy($scope.projeto.areas.filter(function(a){return a.id == this},id)[0]);
			$scope.areaEditada.id_projeto = $scope.projeto.id;
			setTimeout(function(){document.getElementById("codigo_area_"+id).focus()},10);
		} else {
			$scope.areaEditada = {};
			$scope.areaEditada.id = 0;
			$scope.areaEditada.id_projeto = $scope.projeto.id;
			$scope.areaEditada.nome = "";
			$scope.areaEditada.codigo = "";
			$scope.projeto.areas.push($scope.areaEditada);
			setTimeout(function(){document.getElementById("codigo_area_0").focus()},10);
		}
	}

	// definindo função que cancela alterações em area
	$scope.cancelarAlteracoesEmArea = function(){
		if($scope.areaEditada.id == 0){
			$scope.projeto.areas = $scope.projeto.areas.filter(function(a){return a.id!=0});
		}
		$scope.areaEditada = null;
	}

	// definindo função que salva alterações em area
	$scope.salvarArea = function(){
		if($scope.areaEditada != null){
			if($scope.areaEditada.id != 0){
				GDoksFactory.atualizarArea($scope.areaEditada)
					.success(
						function(response){
							
							var area = $scope.projeto.areas.find(function(a){return a.id == this},$scope.areaEditada.id);
							area.nome = $scope.areaEditada.nome;
							area.codigo = $scope.areaEditada.codigo;
							
							$scope.areaEditada = null;
							$scope.erroEmOperacaoDeArea = null;
						}
					)
					.error(
						function(error){
							$scope.erroEmOperacaoDeArea = error.msg;
						}
					);
			} else {
				GDoksFactory.adicionarArea($scope.areaEditada)
					.success(
						function(response){
							$scope.areaEditada.id = response.newId;
							$scope.areaEditada = null;
						}
					)
					.error(
						function(error){
							$scope.erroEmOperacaoDeArea = error.msg;
						}
					);
			}
		}
	}
};

controllers.DocumentosController = function($scope){};

controllers.ClientesController = function($scope,GDoksFactory){
	// levantando clientes na base de dados local
	$scope.clientes = [];
	indexedDB.open('gdoks').onsuccess = function(evt){
		evt.target.result.transaction('clientes').objectStore('clientes').getAll().onsuccess = function(evt){
			$scope.$apply(function(){$scope.clientes = evt.target.result});
		}
	}
	// função que leva para a tela de adicionar disciplina
	$scope.goToAddCliente = function(){
		window.location = '#/clientes/0';
	}
};

controllers.ClienteController = function($scope,$routeParams,GDoksFactory){
	// Capturando o id passado na url
	var id = $routeParams.id;

	// se id== 0, adicionar um novo usuário. se não carregar o cliente de id passado
	if(id == 0) {
		// Criando um usuário vazio.
		$scope.cliente = {};
		$scope.cliente.id = 0;
		$scope.cliente.nome = '';
		$scope.cliente.nome_fantasia = '';
		$scope.cliente.tipo = '1';
		$scope.cliente.cnpj = '';
		$scope.cliente.cpf = null;
		$scope.cliente.contato_nome = '';
		$scope.cliente.contato_email = '';
		$scope.cliente.contato_telefone = '';
	} else {
		// Carregando informações do cliente a partir da base
		GDoksFactory.getCliente(id)
			.success(
				function(response){
					$scope.cliente = response.cliente;
					$scope.cliente.tipo = response.cliente.cpf == null?'1':'2';
				}
			)
			.error(
				function(error){

				}
			);
	}

	// Definindo função que cancela as alterações
	$scope.cancel = function(){
		window.location = "WebGDoks.php#/clientes";
	}

	$scope.salvarCliente = function(){
		if($scope.cliente.id == 0){
			GDoksFactory.adicionarCliente($scope.cliente)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;
					$scope.cliente.id = response.newId;

					// salvando cliente na base local
					var cliente = angular.copy($scope.cliente);
					delete(cliente.contato_telefone);
					delete(cliente.contato_email);
					delete(cliente.contato_nome);
					indexedDB.open('gdoks').onsuccess = function(evt){
						evt.target.result.transaction('clientes','readwrite').objectStore('clientes').add(cliente);
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		} else {
			GDoksFactory.atualizarCliente($scope.cliente)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;

					// atualiznado cliente na base local
					var cliente = angular.copy($scope.cliente);
					delete(cliente.contato_telefone);
					delete(cliente.contato_email);
					delete(cliente.contato_nome);
					indexedDB.open('gdoks').onsuccess = function(evt){
						evt.target.result.transaction('clientes','readwrite').objectStore('clientes').put(cliente);
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		}
	}

	$scope.onTipoChange = function(){
		if($scope.cliente.tipo == '1'){
			// Pessoa Jurídica. CPF deve ser nulo!
			$scope.cliente.cpf = null;
		} else {
			// Pessoa Física. CNPJ deve ser nulo!
			$scope.cliente.cnpj = null;
		}
	}
};

controllers.ProjetosController = function($scope,GDoksFactory){
	// levantando projetos na base de dados local
	$scope.projetos = [];
	indexedDB.open('gdoks').onsuccess = function(evt){
		evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
			$scope.$apply(function(){$scope.projetos = evt.target.result});
		}
	}

	// função que leva para a tela de adicionar disciplina
	$scope.goToAddProjeto = function(){
		window.location = '#/projetos/0';
	}
}

controllers.DisciplinasController = function($scope,GDoksFactory){
	
	// Definindo variável que carrega aa disciplinas
	$scope.disciplinas = [];

	// Carregando disciplinas da base
	var openReq = indexedDB.open("gdoks");
	openReq.onsuccess = function(){
		var db = openReq.result;
		db.transaction('disciplinas').objectStore('disciplinas').getAll().onsuccess = function(evt){
			$scope.$apply(function(){$scope.disciplinas = evt.target.result;});
		}
	}

	// função que leva para a tela de adicionar disciplina
	$scope.goToAddDisciplina = function(){
		window.location = '#/disciplinas/0';
	}
};

controllers.DisciplinaController = function($scope,$routeParams,GDoksFactory){
	// Capturando o id passado na url
	var id = $routeParams.id;
	$scope.subdisciplinaEditada = null;
	$scope.erroEmOperacaoDeSubdisciplina = null;
	$scope.especialistas = [];
	$scope.inserindoNovoEspecialista = false;
	$scope.possiveisEspecialistas = [];
	$scope.validadores = [];
	$scope.inserindoNovoValidador = false;
	$scope.possiveisValidadores = [];


	// se id== 0, adicionar uma nova disciplina. se não carregar o disciplinas de id passado
	if(id == 0) {
		// Criando uma disciplina vazia.
		$scope.disciplina = {};
		$scope.disciplina.id = 0;
		$scope.disciplina.nome = '';
		$scope.disciplina.ativa = true;
		$scope.inicialmenteAtiva = true;
		$scope.disciplina.subs = [];
		$scope.disciplina.especialistas = [];
		$scope.disciplina.validadores = [];
	} else {
		// Carregando dados da disciplina a partir da base no cliente
		var openReq = indexedDB.open('gdoks');
		openReq.onsuccess = function(evt){
			var db = evt.target.result;
			var transaction = db.transaction(['disciplinas','usuarios']);
			transaction.objectStore('disciplinas').get(id*1).onsuccess = function(evt){
				$scope.$apply(function(){
					$scope.disciplina = evt.target.result;
					$scope.inicialmenteAtiva = $scope.disciplina.ativa;

					// parsing especialistas
					for (var i = $scope.disciplina.especialistas.length - 1; i >= 0; i--) {
						transaction.objectStore('usuarios').get($scope.disciplina.especialistas[i]*1).onsuccess = function(evt){
							$scope.$apply(function(){$scope.especialistas.push(evt.target.result);});
						}
					};

					// parsing validadores
					transaction.objectStore('usuarios').getAll().onsuccess = function(evt){
						var usuarios = evt.target.result;
						var validador;
						for (var i = $scope.disciplina.validadores.length - 1; i >= 0; i--) {
							validador = usuarios.find(function(u){return u.id == this},$scope.disciplina.validadores[i].id);
							validador.tipo = $scope.disciplina.validadores[i].tipo;
							$scope.$apply(function(){$scope.validadores.push(validador);});
						};
					}
				})
			}
		}
	}

	$scope.salvarDisciplina = function(){
		if($scope.disciplina.id == 0){
			GDoksFactory.adicionarDisciplina($scope.disciplina)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;
					$scope.disciplina.id = response.newId;

					// salvando na base de dados local
					var openReq = indexedDB.open('gdoks').onsuccess;
					openReq.onsuccess = function(){
						var db = openReq.result;
						db.transaction('disciplinas').objectStore('disciplinas').add($scope.disciplina);
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		} else {
			GDoksFactory.atualizarDisciplina($scope.disciplina)
			.success(
				function(response){
					$scope.obteve_resposta = true;
					$scope.ok = (response.error==0);
					$scope.msg = response.msg;

					// atualizando usuário na base local
					var openReq = indexedDB.open('gdoks').onsuccess;
					openReq.onsuccess = function(){
						var db = openReq.result;
						var putReq = db.transaction('disciplinas').objectStore('disciplinas').put($scope.disciplina);
					}
				}
			)
			.error(
				function(error){
					$scope.obteve_resposta = true;
					$scope.ok = (error.error==0);
					$scope.msg = error.msg;
				}
			);
		}
	}

	// Definindo função que cancela as alterações
	$scope.cancel = function(){
		window.location = "WebGDoks.php#/disciplinas";
		$scope.root.itemSelecionadoDoMenu = 3;
	}

	// definindo função que remove subdisciplina
	$scope.removerSubdisciplina = function(id){
		if(confirm("Tem certeza que deseja excluir a subdisciplina? A ação não poderá ser desfeita.")){
			var sub = $scope.disciplina.subs.find(function(a){return a.id == this},id);
			sub.id_disciplina = $scope.disciplina.id;
			GDoksFactory.removerSubdisciplina(sub)
				.success(
					function(response){
						$scope.disciplina.subs = $scope.disciplina.subs.filter(function(a){return a.id!=this},id);

						// Atualizando na base local
						var openReq = indexedDB.open('gdoks');
						openReq.onsuccess = function(){
							var db = openReq.result;
							db.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
						}
					}
				)
				.error(
					function(error){
						$scope.erroEmOperacaoDeSubdisciplina = error.msg;
					}
				);
		}
	}

	// definindo função que edita subdisciplina
	$scope.editarSubdisciplina = function(id){
		if(id != 0){
			$scope.subdisciplinaEditada = angular.copy($scope.disciplina.subs.filter(function(a){return a.id == this},id)[0]);
			$scope.subdisciplinaEditada.id_disciplina = $scope.disciplina.id;
			setTimeout(function(){document.getElementById("nome_"+id).focus()},10);
		} else {
			$scope.subdisciplinaEditada = {};
			$scope.subdisciplinaEditada.id = 0;
			$scope.subdisciplinaEditada.id_disciplina = $scope.disciplina.id;
			$scope.subdisciplinaEditada.nome = "";
			$scope.subdisciplinaEditada.sigla = "";
			$scope.subdisciplinaEditada.ativa = true;
			$scope.disciplina.subs.push($scope.subdisciplinaEditada);
			setTimeout(function(){document.getElementById("nome_0").focus()},10);
		}
	}

	// definindo função que cancela alterações em subdisciplina
	$scope.cancelarAlteracoesEmSubdisciplina = function(){
		if($scope.subdisciplinaEditada.id == 0){
			$scope.disciplina.subs = $scope.disciplina.subs.filter(function(a){return a.id!=0});
		}
		$scope.subdisciplinaEditada = null;
	}

	// definindo função que salva alterações em subdisciplinas
	$scope.salvarSubdisciplina = function(){
		if($scope.subdisciplinaEditada != null){
			if($scope.subdisciplinaEditada.id != 0){
				GDoksFactory.atualizarSubdisciplina($scope.subdisciplinaEditada)
					.success(
						function(response){
							var sub = $scope.disciplina.subs.find(function(a){return a.id == this},$scope.subdisciplinaEditada.id);
							sub.nome = $scope.subdisciplinaEditada.nome;
							sub.sigla = $scope.subdisciplinaEditada.sigla;
							sub.ativa = $scope.subdisciplinaEditada.ativa;
							$scope.subdisciplinaEditada = null;
							$scope.erroEmOperacaoDeSubdisciplina = null;

							// atualizar na base local
							var openReq = indexedDB.open('gdoks');
							openReq.onsuccess = function(){
								var db = openReq.result;
								db.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina)
							}
						}
					)
					.error(
						function(error){
							$scope.erroEmOperacaoDeSubdisciplina = error.msg;
						}
					);
			} else {
				GDoksFactory.adicionarSubdisciplina($scope.subdisciplinaEditada)
					.success(
						function(response){
							$scope.subdisciplinaEditada.id = response.newId;
							$scope.subdisciplinaEditada = null;

							// atualizar na base local
							var openReq = indexedDB.open('gdoks');
							openReq.onsuccess = function(){
								var db = openReq.result;
								db.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
							}
						}
					)
					.error(
						function(error){
							$scope.erroEmOperacaoDeSubdisciplina = error.msg;
						}
					);
			}
		}
	}

	$scope.adicionarNovoEspecialista = function(){
		// Criando objeto data que irá conter dados para o select de possíveis especialistas
		$scope.data = {};

		// levantando usuários na base de dados local
		var openReq = indexedDB.open('gdoks');
		openReq.onsuccess = function(evt){
			var db = openReq.result;
			db.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
				$scope.$apply(function(){
					$scope.data.possiveisEspecialistas = evt.target.result;

					// removendo os usuários que já são especialistas da disciplina
					for (var i = $scope.disciplina.especialistas.length - 1; i >= 0; i--) {
						$scope.data.possiveisEspecialistas = $scope.data.possiveisEspecialistas.filter(function(a){return a.id != this},$scope.disciplina.especialistas[i]);
					};

					// Criando especialista vazio
					var especialistaVazio = {"nome":"Selecione um usuário...","id":0};

					// adicionando o especialista vazio ao grupo de possiveis especialistas
					$scope.data.possiveisEspecialistas.unshift(especialistaVazio);
					
					// Marcando o item defalr		
					$scope.data.selecionado = especialistaVazio;

					// marcando flag para exibir campo de insersão de novo especialista
					$scope.inserindoNovoEspecialista = true;
				})
			}
		}
	}

	// definindo função que remove especialista
	$scope.removerEspecialista = function(id_especialista){
		if(confirm("Tem certeza que deseja remover o especialista da disciplina?")){
			GDoksFactory.removerEspecialista($scope.disciplina.id,id_especialista)
				.success(
					function(response){
						$scope.disciplina.especialistas = $scope.disciplina.especialistas.filter(function(a){return a != this},id_especialista);

						// salvando especialista na base local
						indexedDB.open('gdoks').onsuccess = function(evt){
							$scope.$apply(function(){
								evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
							})
						}
						$scope.especialistas = $scope.especialistas.filter(function(a){return a.id != this},id_especialista);
					}
				)
				.error(
					function(error){
						
					}
				);
		}
	}

	// definindo função que cancela alterações em subdisciplina
	$scope.cancelarAlteracoesEmNovoEspecialista = function(){
		$scope.inserindoNovoEspecialista = false;
	}

	// definindo função que salva alterações em subdisciplinas
	$scope.salvarEspecialista = function(){
		GDoksFactory.adicionarEspecialista($scope.disciplina.id,$scope.data.selecionado.id)
			.success(
				function(response){
					$scope.disciplina.especialistas.push($scope.data.selecionado.id);
					
					// Capturando o especialista selecionado e adicionando a vetor de especialistas
					var openReq = indexedDB.open('gdoks');
					openReq.onsuccess = function(evt){
						var transaction = openReq.result.transaction(['usuarios','disciplinas'],'readwrite');
						transaction.objectStore('usuarios').get($scope.data.selecionado.id).onsuccess = function(evt){
							$scope.$apply(function(){
								$scope.especialistas.push(evt.target.result);
								$scope.inserindoNovoEspecialista = false;
							})
						}
						transaction.objectStore('disciplinas').put($scope.disciplina);
					}
				}
			)
			.error(
				function(error){
					
				}
			);
	}

	$scope.adicionarNovoValidador = function(){
		// Criando objeto data que irá conter dados para o select de possíveis validadores
		$scope.dataValidadores = {};

		// Levantando os possíveis validadores desta disciplina na base local
		var openReq = indexedDB.open('gdoks');
		openReq.onsuccess = function(evt){
			var db = evt.target.result;
			db.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
				$scope.$apply(function(){
					$scope.dataValidadores.possiveisValidadores = evt.target.result;

					// removendo os usuários que já são validadores da disciplina
					for (var i = $scope.disciplina.validadores.length - 1; i >= 0; i--) {
						$scope.dataValidadores.possiveisValidadores = $scope.dataValidadores.possiveisValidadores.filter(function(a){return a.id != this},$scope.disciplina.validadores[i].id);
					};

					// Criando validador vazio
					var validadorVazio = {"nome":"Selecione um usuário...","id":0,"tipo":1};

					// adicionando o validador vazio ao grupo de possiveis validadores
					$scope.dataValidadores.possiveisValidadores.unshift(validadorVazio);
					
					// Marcando o item defalr		
					$scope.dataValidadores.selecionado = validadorVazio;

					// marcando flag para exibir campo de insersão de novo validador
					$scope.inserindoNovoValidador = true;
				})		
			}
		}
		
		// Criando um objeto para lidar com os tipos de validadores
		$scope.tiposDeValidadores = {};
		$scope.tiposDeValidadores.tipos = [{"id":1,"nome":"Necessário"},{"id":2,"nome":"Suficiente"}];
		$scope.tiposDeValidadores.selecionado = {"id":1,"nome":"Necessário"};
	}

	// definindo função que remove validador
	$scope.removerValidador = function(id_validador){
		if(confirm("Tem certeza que deseja remover o validador da disciplina?")){
			GDoksFactory.removerValidador($scope.disciplina.id,id_validador)
				.success(
					function(response){
						$scope.disciplina.validadores = $scope.disciplina.validadores.filter(function(a){return a.id != this},id_validador);
						$scope.validadores = $scope.validadores.filter(function(a){return a.id != this},id_validador);

						// salvando remoção na base de dados
						indexedDB.open('gdoks').onsuccess = function(evt){
							evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
						}
					}
				)
				.error(
					function(error){
						
					}
				);
		}
	}

	// definindo função que cancela alterações em subdisciplina
	$scope.cancelarAlteracoesEmNovoValidador = function(){
		$scope.inserindoNovoValidador = false;
	}

	// definindo função que salva alterações em subdisciplinas
	$scope.salvarValidador = function(){
		GDoksFactory.adicionarValidador($scope.disciplina.id,$scope.dataValidadores.selecionado.id,$scope.tiposDeValidadores.selecionado.id)
			.success(
				function(response){
					// Alterando validador no scope
					$scope.disciplina.validadores.push({"id":$scope.dataValidadores.selecionado.id,"tipo":$scope.tiposDeValidadores.selecionado.id});

					// Alterando o validador na base
					indexedDB.open('gdoks').onsuccess = function(evt){
						// salvando disciplina alterada na base local
						var transaction = evt.target.result.transaction(['disciplinas','usuarios'],'readwrite');
						transaction.objectStore('disciplinas').put($scope.disciplina);

						// alterando o scope.validadores para consistencia da interface
						transaction.objectStore('usuarios').get($scope.dataValidadores.selecionado.id).onsuccess = function(evt){
							var validador = evt.target.result;
							validador.tipo = $scope.tiposDeValidadores.selecionado.id;
							$scope.$apply(function(){
								$scope.validadores.push(validador);
								$scope.inserindoNovoValidador = false;			
							})
						}
					}
				}
			)
			.error(
				function(error){
					
				}
			);
	}
};

controllers.AFazerController = function($scope){};

controllers.ConfiguracoesController = function($scope){};

WebGDoks.controller(controllers);