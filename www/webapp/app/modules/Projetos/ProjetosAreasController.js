angular.module('Projetos').controller('ProjetosAreasController',ProjetosAreasController);
function ProjetosAreasController($scope,GDoksFactory,$mdDialog,$mdToast){
	
	$scope.openAreaDialog = function(ev,idArea){
		// Declarando o objeto area clicado
		var areaClicada;

		// Definindo o objeto area clicado
		if(idArea == 0) {
			areaClicada = {id:0,nome:null,codigo:null};
		} else {
			areaClicada = $scope.projeto.areas.find(function(a){return a.id == this},idArea);
		}
		areaClicada.id_projeto = $scope.projeto.id;

		$mdDialog.show(
			{
				controller: function($scope,area,parentArea,parentAreas){
					
					$scope.area = area;
					$scope.salvar = function(area){
						if(area.id == 0){
							GDoksFactory.adicionarArea(area)
							.success(function(response){
								area.id = response.newId;
								parentAreas.push(area);
								$mdToast.show(
									$mdToast.simple()
									.textContent('Nova área inserida com sucesso!')
									.position('bottom left')
									.hideDelay(5000)
								);
							})
							.error(function(err){
								console.dir(err);
								$mdToast.show(
									$mdToast.simple()
									.textContent('Um erro ocorreu. Não foi possível completar ação!')
									.position('bottom left')
									.hideDelay(5000)
								);
							});
						} else {
							GDoksFactory.atualizarArea(area)
							.success(function(response){
								parentArea.nome = area.nome;
								parentArea.codigo = area.codigo;
								$mdToast.show(
									$mdToast.simple()
									.textContent('Área alterada com sucesso!')
									.position('bottom left')
									.hideDelay(5000)
								);
							})
							.error(function(err){
								console.dir(err);
								$mdToast.show(
									$mdToast.simple()
									.textContent('Um erro ocorreu. Não foi possível completar ação!')
									.position('bottom left')
									.hideDelay(5000)
								);
							});
						}

						// Escondendo o dialog.
						$mdDialog.hide(area);
					};
					
					$scope.cancelar = function(area){
						$mdDialog.hide(area);
					}
					
				},
				locals:{
					area:angular.copy(areaClicada),
					parentArea:areaClicada,
					parentAreas:$scope.projeto.areas
				},
				templateUrl: './app/modules/Projetos/area-dialog.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
			}, function() {
			$scope.status = 'You cancelled the dialog.';
			}
		);
	}

	$scope.openConfirm = function(ev,idArea) {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.confirm()
			.title('Tem certeza que deseja remover esta área?')
			.textContent('A ação não poderá ser desfeita.')
			.ariaLabel('Deseja remover a área?')
			.targetEvent(ev)
			.ok('Sim')
			.cancel('Não');

		$mdDialog.show(confirm).then(
			function() {
				var area = $scope.projeto.areas.find(function(a){return a.id==this},idArea);
				area.id_projeto = $scope.projeto.id;
				GDoksFactory.removerArea(area)
				.success(function(response){
					$scope.projeto.areas = $scope.projeto.areas.filter(function(a){return a.id!= this},idArea);
					$mdToast.show(
						$mdToast.simple()
						.textContent('Área removida!')
						.position('bottom left')
						.hideDelay(5000)
					);
				})
				.error(function(err){
					console.log(err);
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha ao tentar remover a área.')
						.position('bottom left')
						.hideDelay(5000)
					);
				});
			}
		);
	};
}