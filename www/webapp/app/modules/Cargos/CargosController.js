(function(){
	
	var modCargos = angular.module('Cargos',[]);

	var CargosController = function($scope,$mdDialog,GDoksFactory,$mdToast){

		$scope.cargos = [];

		GDoksFactory.getCargos().success(function(response){
			for (var i = response.cargos.length - 1; i >= 0; i--) {
				response.cargos[i].valor_hh *= 1;
			}
			$scope.cargos = response.cargos;	
		});
		
		$scope.openDialog = function(ev,idCargo){
			// Declarando o objeto cargo clicado
			var cargoClicado;

			// Definindo o objeto cargo clicado
			if(idCargo == 0) {
				cargoClicado = {id:0,nome:null,valor_hh:null};
			} else {
				cargoClicado = $scope.cargos.find(function(c){return c.id == this},idCargo);
			}

			$mdDialog.show(
				{
					controller: function($scope,cargo,parentCargo,parentCargos,parentScope){
						$scope.cargo = cargo;

						$scope.salvar = function(cargo){
							
							// mostrar carregando
							parentScope.root.carregando = true;

							if(cargo.id == 0){
								GDoksFactory.inserirCargo(cargo)
								.success(function(response){
									// Esconde carregando
									parentScope.root.carregando = false;

									cargo.id = response.newId;
									parentCargos.push(cargo);
									$mdToast.show(
										$mdToast.simple()
										.textContent('Novo cargo inserido com sucesso!')
										.position('bottom left')
										.hideDelay(5000)
									);

									// Escondendo o diálogo.
									$mdDialog.hide();
								})
								.error(function(err){
									// Esconde carregando
									parentScope.root.carregando = false;

									// imprimindo erro no console
									console.warn(err);

									// Retornando toast para o cliente
									$mdToast.show(
										$mdToast.simple()
										.textContent('Um erro ocorreu. Não foi possível completar ação!')
										.position('bottom left')
										.hideDelay(5000)
									);
								});
							} else {
								GDoksFactory.atualizarCargo(cargo)
								.success(function(response){
									// Esconde carregando
									parentScope.root.carregando = false;

									parentCargo.valor_hh = cargo.valor_hh;
									parentCargo.nome = cargo.nome;
									$mdToast.show(
										$mdToast.simple()
										.textContent('Cargo alterado com sucesso!')
										.position('bottom left')
										.hideDelay(5000)
									);

									// Escondendo o diálogo.
									$mdDialog.hide();
								})
								.error(function(err){
									// Esconde carregando
									parentScope.root.carregando = false;

									// Imprimindo erro no console
									console.warn(err);

									// Retornando toast para o usuário
									$mdToast.show(
										$mdToast.simple()
										.textContent('Um erro ocorreu. Não foi possível completar ação!')
										.position('bottom left')
										.hideDelay(5000)
									);
								});
							}
						};

						$scope.cancelar = function(cargo){
							$mdDialog.hide(cargo);
						}
					},
					locals:{
						cargo:angular.copy(cargoClicado),
						parentCargo:cargoClicado,
						parentCargos:$scope.cargos,
						parentScope:$scope
					},
					templateUrl: './app/modules/Cargos/cargo-dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true
				})
				.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				$scope.status = 'You cancelled the dialog.';
				});
		}

		$scope.openConfirm = function(ev,idCargo) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Tem certeza que deseja remover este cargo?')
				.textContent('A ação não poderá ser desfeita.')
				.ariaLabel('Deseja remover o cargo')
				.targetEvent(ev)
				.ok('Sim')
				.cancel('Não');

			$mdDialog.show(confirm).then(
				function() {
					GDoksFactory.removerCargo(idCargo)
					.success(function(response){
						$scope.cargos = $scope.cargos.filter(function(c){return c.id!= this},idCargo);
						$mdToast.show(
							$mdToast.simple()
							.textContent('Cargo removido!')
							.position('bottom left')
							.hideDelay(5000)
						);
					})
				}
			);
		};
	}

	modCargos.controller('CargosController',CargosController);
})();