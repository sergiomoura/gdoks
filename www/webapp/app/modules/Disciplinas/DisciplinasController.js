angular.module('Disciplinas',[])
.controller('DisciplinasController',DisciplinasController)
.controller('DisciplinaController',DisciplinaController);

function DisciplinasController($scope,GDoksFactory){
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

function DisciplinaController($scope,$routeParams,GDoksFactory){
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
					indexedDB.open('gdoks').onsuccess = function(evt){
						evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').add($scope.disciplina);
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
					indexedDB.open('gdoks').onsuccess = function(evt){
						evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
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