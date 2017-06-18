angular.module('Disciplinas',[])
.controller('DisciplinasController',DisciplinasController)
.controller('DisciplinaController',DisciplinaController)
.controller('SubdisciplinaController',SubdisciplinaController)
.controller('EspecialistasController',EspecialistasController)
.controller('ValidadoresController',ValidadoresController)

function DisciplinasController($scope,GDoksFactory,$location){
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
		$location.url('/disciplinas/0');
	}
};

function DisciplinaController($scope,$routeParams,GDoksFactory,$mdToast,$location){
	// Lendo id da url
	var id = $routeParams.id;

	$scope.usuarios = [];
	$scope.dicUsuarios = [];
	$scope.usuariosCarregados = false;

	function carregaUsuarios(){
		// Levantando usuários da base
		indexedDB.open("gdoks").onsuccess = function(evt){
			evt.target.result.transaction("usuarios").objectStore("usuarios").getAll().onsuccess = function(evt){
				$scope.$apply(function(){
					$scope.usuarios = evt.target.result;
					$scope.usuariosCarregados = true;
					// criando dicionário de usuários
					for (var i = $scope.usuarios.length - 1; i >= 0; i--) {
						$scope.dicUsuarios[$scope.usuarios[i].id] = $scope.usuarios[i];
					}
				});
				onUsuariosCarregados();
			}
		}
	}

	function onUsuariosCarregados(){
		carregaDisciplina(id);
	}

	function carregaDisciplina(id){
		if(id == 0) {
			// Criando uma disciplina vazia.
			$scope.disciplina = {
				id : 0,
				nome : '',
				sigla : '',
				ativa : true,
				subs : [],
				especialistas : [],
				validadores : []
			};
		} else {
			// Carregando dados da disciplina a partir da base no cliente
			indexedDB.open('gdoks').onsuccess = function(evt){
				var db = evt.target.result;
				var transaction = db.transaction(['disciplinas','usuarios']);
				transaction.objectStore('disciplinas').get(id*1).onsuccess = function(evt){
					$scope.$apply(function(){
						$scope.disciplina = evt.target.result;

						// parsing especialistas
						for (var i = $scope.disciplina.especialistas.length - 1; i >= 0; i--) {
							$scope.disciplina.especialistas[i] = $scope.dicUsuarios[$scope.disciplina.especialistas[i]];
						};
						
						// parsing validadores
						for (var i = $scope.disciplina.validadores.length - 1; i >= 0; i--) {
							$scope.disciplina.validadores[i] = $scope.dicUsuarios[$scope.disciplina.validadores[i]];
						};
					})
				}
			}
		}
	}

	carregaUsuarios();
		
	// Definindo função para salvar disciplina
	$scope.salvarDisciplina = function(){

		// Mostra carregando
		$scope.root.carregando = true;

		if($scope.disciplina.id == 0){
			GDoksFactory.adicionarDisciplina($scope.disciplina)
			.success(
				function(response){
					// Esconde carregando
					$scope.root.carregando = false;

					// Atribuindo novo id a disciplina
					$scope.disciplina.id = response.newId;

					// salvando na base de dados local
					indexedDB.open('gdoks').onsuccess = function(evt){
						evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').add($scope.disciplina);
					}

					// retornando toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Dados da disciplina inseridos com sucesso!')
						.position('bottom left')
						.hideDelay(5000)
					);

					// mudando url
					$location.url('/disciplinas/'+response.newId);

				}
			)
			.error(
				function(error){
					// Esconde carregando
					$scope.root.carregando = false;

					// Retornando toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível completar a ação')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Exibindo erro no console.
					console.warn(error)
					
				}
			);
		} else {
			GDoksFactory.atualizarDisciplina($scope.disciplina)
			.success(
				function(response){
					// Esconde carregando
					$scope.root.carregando = false;

					// Retornando toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Dados da disciplina atualizados com sucesso!')
						.position('bottom left')
						.hideDelay(5000)
					);

					// atualizando usuário na base local
					indexedDB.open('gdoks').onsuccess = function(evt){
						evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
					}
				}
			)
			.error(
				function(error){
					// Esconde carregando
					$scope.root.carregando = false;

					// Retornando toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível completar a ação')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Exibindo erro no console
					console.warn(error);
				}
			);
		}
	}

	// Definindo função que cancela as alterações
	$scope.cancel = function(){
		window.location = "WebGDoks.php#/disciplinas";
	}
}

function SubdisciplinaController($scope,$mdDialog){
	$scope.openSubDialog = function(evt,sub){
		$mdDialog.show(
				{
					controller: SubDialogController,
					locals:{
						sub:angular.copy(sub),
						parentSub:sub,
						parentScope:$scope
					},
					templateUrl: './app/modules/Disciplinas/sub-dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:true
				})
	}
}

function SubDialogController($scope,sub,parentSub,parentScope,$mdDialog,GDoksFactory,$mdToast){
	$scope.sub = sub;

	$scope.salvar = function(sub){
		// Mostrar Carregando
		parentScope.root.carregando = true;

		// Atribuindo o id da disciplina
		sub.id_disciplina = parentScope.disciplina.id;

		// Verificando se vai adicionar ou atualizar subdisciplina
		if(sub.id != 0){
			GDoksFactory.atualizarSubdisciplina(sub)
				.success(
					function(response){
						// Esconde Carregando
						parentScope.root.carregando = false;

						// Copiando informações da sub para a parentSub
						parentSub.nome = sub.nome;
						parentSub.sigla = sub.sigla;
						parentSub.ativa = sub.ativa;

						// atualizar na base local
						indexedDB.open('gdoks').onsuccess = function(evt){
							evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put(parentScope.disciplina);
						}

						// Retornando toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Dados da subdisciplina atualizados com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);
					}
				)
				.error(
					function(error){
						// Esconde Carregando
						parentScope.root.carregando = false;

						// Retornando toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível realizar a ação. ' + error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Exibindo erro no console
						console.warn(error);

					}
				);
		} else {
			GDoksFactory.adicionarSubdisciplina(sub)
				.success(
					function(response){
						// Escondendo o carregando
						parentScope.root.carregando = false;

						// Atribuindo id da sub recém inserida
						sub.id = response.newId;

						// Retornando toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Subdisciplina atualizada com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Adicionando a subdisciplina ao vetor de subs da disciplina
						parentScope.disciplina.subs.push(sub);

						// atualizar na base local
						indexedDB.open('gdoks').onsuccess = function(evt){
							var putRequest = evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put(parentScope.disciplina);
							putRequest.onsuccess = function(evt){
								console.log("atualizou disciplina na base local");
								console.dir(evt);
							}
							putRequest.onerror = function(evt){
								console.log("NÃO atualizou disciplina na base local");
								console.dir(evt);
							}
						}
					}
				)
				.error(
					function(error){
						// Escondendo o carregando
						parentScope.root.carregando = false;

						// Retornando toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível completar ação. ' + error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Exibindo erro no console
						console.warn(error);
					}
				);
		}

		// Escondendo
		$mdDialog.hide();
	};

	$scope.cancelar = function(){
		$mdDialog.hide();
	}
}

function EspecialistasController($scope,GDoksFactory,$mdToast){

	// Copiando vetor de especialistas para comportamento de interface
	$scope.$watch('disciplina',function(){
		if($scope.disciplina != undefined){
			$scope.especialistas = angular.copy($scope.disciplina.especialistas);
		}
	})

	// Função que filtra opções de especialista ao digitar
	$scope.filtrarTexto = function(search){
		// filtrando quanto ao texto
		return $scope.usuarios.filter(
			function(a){
				return a.nome.toLowerCase().indexOf(this.toLowerCase()) != -1;
			},search);
	}

	// Função que salva vetor de especialistas
	$scope.salvar = function(){
		// Mostrando o carregando
		$scope.root.carregando = true;

		// limpando vetor para enviar só os ids dos especialistas
		var ids = $scope.especialistas.map(function(a){return a.id});

		// Enviando informações para salvamento
		GDoksFactory.salvarEspecialistas($scope.disciplina.id,ids)
		.success(function(response){
			// Esconde o carregando
			$scope.root.carregando = false;

			// Salvando especialistas no scope.
			$scope.disciplina.especialistas = $scope.especialistas;

			// Salvando na base local
			indexedDB.open('gdoks').onsuccess = function(evt){
				// clonando disciplina a ser salva na base
				var d = angular.copy($scope.disciplina);
				d.especialistas = d.especialistas.map(function(a){return a.id});
				evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put(d)
			}

			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Especialistas salvos com sucesso.')
				.position('bottom left')
				.hideDelay(5000)
			);

		})
		.error(function(error){
			// Esconde o carregando
			$scope.root.carregando = false;

			// Escrevendo erro no console
			console.warn(error);

			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Não foi possível completar a ação. ' + error.msg)
				.position('bottom left')
				.hideDelay(5000)
			);
		})
	}
}

function ValidadoresController($scope,GDoksFactory,$mdToast){

	// Copiando vetor de validadores para comportamento de interface
	$scope.$watch('disciplina',function(){
		if($scope.disciplina != undefined){
			$scope.validadores = angular.copy($scope.disciplina.validadores);
		}
	})

	// Função que filtra opções de especialista ao digitar
	$scope.filtrarTexto = function(search){
		// filtrando quanto ao texto
		return $scope.usuarios.filter(
			function(a){
				return a.nome.toLowerCase().indexOf(this.toLowerCase()) != -1;
			},search);
	}

	// Função que salva vetor de validadores
	$scope.salvar = function(){
		// Mostrando o carregando
		$scope.root.carregando = true;

		// limpando vetor para enviar só os ids dos validadores
		var ids = $scope.validadores.map(function(a){return a.id});

		// Enviando informações para salvamento
		GDoksFactory.salvarValidadores($scope.disciplina.id,ids)
		.success(function(response){
			// Esconde o carregando
			$scope.root.carregando = false;

			// Salvando validadores no scope.
			$scope.disciplina.validadores = $scope.validadores;

			// Salvando na base local
			indexedDB.open('gdoks').onsuccess = function(evt){
				// clonando disciplina a ser salva na base
				var d = angular.copy($scope.disciplina);
				d.validadores = d.validadores.map(function(a){return a.id});
				evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put(d)
			}

			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Validadores salvos com sucesso.')
				.position('bottom left')
				.hideDelay(5000)
			);

		})
		.error(function(error){
			// Esconde o carregando
			$scope.root.carregando = false;

			// Escrevendo erro no console
			console.warn(error);

			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Não foi possível completar a ação. ' + error.msg)
				.position('bottom left')
				.hideDelay(5000)
			);
		})
	}
}


function OldDisciplinaController($scope,$routeParams,GDoksFactory){
	

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