(function(){

	// carregando o módulo projetos
	var mod = angular.module('Projetos');

	// Atribuindo controller ao módulo
	mod.controller('ProjetosSubareasController',ProjetosSubareasController);
	
	// Definindo controller
	function ProjetosSubareasController($scope,GDoksFactory,$mdDialog,$mdToast){
			$scope.openDialog = function(ev,idSubarea){
				
				// Declarando o objeto area clicado
				var subareaClicada;

				// Definindo o objeto area clicado
				if(idSubarea == 0) {
					subareaClicada = {id:0,nome:null,codigo:null,area:null};
				} else {
					subareaClicada = $scope.projeto.subareas.find(function(a){return a.id == this},idSubarea);
				}
				subareaClicada.id_projeto = $scope.projeto.id;
				
				$mdDialog.show(
					{
						controller: function($scope,subarea,parentSubarea,parentSubareas,areas){
							$scope.areas = areas;
							$scope.subarea = subarea;
							$scope.subarea.area = ($scope.subarea.area==null?null:$scope.areas.find(function(a){return a.id==this},$scope.subarea.area.id));

							$scope.salvar = function(subarea){
								if(subarea.id == 0){
									GDoksFactory.adicionarSubarea(subarea)
									.success(function(response){
										// Atribuindo novo id para a subárea recém criada
										subarea.id = response.newId;

										// Adicionando a subárea ao vetor de subáreas. Caso vetor não exista, cria-se
										parentSubareas = (parentSubareas == undefined ? [] : parentSubareas);
										parentSubareas.push(subarea);

										// Retornando Toast para usuário
										$mdToast.show(
											$mdToast.simple()
											.textContent('Nova Sub-área inserida com sucesso!')
											.position('bottom left')
											.hideDelay(5000)
										);
									})
									.error(function(err){
										console.warn(err);
										$mdToast.show(
											$mdToast.simple()
											.textContent('Um erro ocorreu. Não foi possível completar ação!')
											.position('bottom left')
											.hideDelay(5000)
										);
									});
								} else {
									GDoksFactory.atualizarSubarea(subarea)
									.success(function(response){
										parentSubarea.nome = subarea.nome;
										parentSubarea.codigo = subarea.codigo;
										parentSubarea.area = subarea.area;

										$mdToast.show(
											$mdToast.simple()
											.textContent('Sub-área alterada com sucesso!')
											.position('bottom left')
											.hideDelay(5000)
										);
									})
									.error(function(err){
										console.warn(err);
										$mdToast.show(
											$mdToast.simple()
											.textContent('Um erro ocorreu. Não foi possível completar ação!')
											.position('bottom left')
											.hideDelay(5000)
										);
									});
								}

								// Escondendo o dialog.
								$mdDialog.hide(subarea);
							};
							
							$scope.cancelar = function(subarea){
								$mdDialog.hide(subarea);
							}
							
						},
						locals:{
							subarea:angular.copy(subareaClicada),
							parentSubarea:subareaClicada,
							parentSubareas:$scope.projeto.subareas,
							areas:$scope.projeto.areas
						},
						templateUrl: './app/modules/Projetos/subarea-dialog.tmpl.html',
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

			
			$scope.openConfirm = function(ev,idSubarea) {
				// Appending dialog to document.body to cover sidenav in docs app
				var confirm = $mdDialog.confirm()
					.title('Tem certeza que deseja remover esta sub-área?')
					.textContent('A ação não poderá ser desfeita.')
					.ariaLabel('Deseja remover a sub-área?')
					.targetEvent(ev)
					.ok('Sim')
					.cancel('Não');

				$mdDialog.show(confirm).then(
					function() {
						var subarea = $scope.projeto.subareas.find(function(a){return a.id==this},idSubarea);
						GDoksFactory.removerSubarea(subarea)
						.success(function(response){
							$scope.projeto.subareas = $scope.projeto.subareas.filter(function(a){return a.id!= this},idSubarea);
							$mdToast.show(
								$mdToast.simple()
								.textContent('Sub-área removida!')
								.position('bottom left')
								.hideDelay(5000)
							);
						})
						.error(function(err){
							console.log(err);
							$mdToast.show(
								$mdToast.simple()
								.textContent('Falha ao tentar remover a sub-área.')
								.position('bottom left')
								.hideDelay(5000)
							);
						});
					}
				);
			};
			
	}

})();
