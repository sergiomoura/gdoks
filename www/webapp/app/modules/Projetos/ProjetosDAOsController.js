(function(){
	var modProjetos = angular.module('Projetos');

	var ProjetosDAOsController = function($scope,Upload,$cookies,GDoksFactory,$mdToast,$mdDialog){

		// Arquivos de documentos de abertura de operações
		$scope.daoFiles = [];

		// Nomes dos documentos
		$scope.daoNames = [];

		// Exibição de mensagem de erro em operação de DAO
		$scope.erroEmOperacaoDeDao = null;

		// Controla a exibição do prograsso do upload
		$scope.mostrarProgressoUploadDaos = false;

		// Vetor de erros no upload
		$scope.errosNoUploadDeDaos = [];

		// Remove o DAOFile na posição indicada
		$scope.removerDaoFile = function(pos){
			$scope.daoFiles.splice(pos,1);
			$scope.daoNames.splice(pos,1);
		}

		// Upload de DaoFiles
		$scope.uploadDaoFiles = function (files) {
			// Verificando se files está definido e se seu tamanho é maior que zero.
			if (files && files.length) {

				// mostrando barra de progresso de upload
				$scope.mostrarProgressoUploadDaos = true;
				
				// Criando pacote a enviar
				var packToSend = [];
				for (var i = files.length - 1; i >= 0; i--) {
					packToSend.push({file:files[i], nome:$scope.daoNames[i]});
				};

				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/projetos/'+$scope.projeto.id+'/daos/',
	                	data: {profiles: packToSend},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function(response){
	            		if(response.status == 200){
	            			// Upload Concluído com sucesso!
	            			var result = response.data;

	            			// Escondendo o carregando
	            			$scope.mostrarProgressoUploadDaos = false;

	            			// Tratando resposta
							if(result.error == 0){
								var tr; // variável da linha da tabela que exibe os campos dos arquivos que vão subir
								for (var i = result.sucessos.length - 1; i >= 0; i--) {
									$scope.projeto.daos.push(result.sucessos[i]);

									// removendo da daoFiles que obtiveram sucesso.
									for (var j = $scope.daoFiles.length - 1; j >= 0; j--) {
										if($scope.daoFiles[j].name == result.sucessos[i].nome_cliente){
											$scope.daoFiles.splice(j,1);
											$scope.daoNames.splice(j,1);
										}
									}

								};
								for (var i = result.erros.length - 1; i >= 0; i--) {
									// switch de erros de códigos conhecidos
									switch(result.erros[i].codigo){
										case 3:
											$scope.errosNoUploadDeDaos[result.erros[i].arquivo] = 'Um arquivo já foi cadastrado com este nome';
											break;

										default:
											$scope.errosNoUploadDeDaos[result.erros[i].arquivo] = result.erros[i].msg;
											break;
									}
								};
								
							} else {
								// Retornando Toast para o usuário
								$mdToast.show(
									$mdToast.simple()
									.textContent(result.msg)
									.position('bottom left')
									.hideDelay(5000)
								);

								// imprimindo mensagem no console
								console.warn(result.msg);
							}
	            		}
	            	},
	            	function(error){
	            		// Imprimindo erro no console
	            		console.warn(error);

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent(error.statusText + ' ' + error.status)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);

	            		// Esconde o carregando
	            		$scope.mostrarProgressoUploadDaos = false;
	            	},
	            	function (evt) {
						$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
					}
	            )
			}
		}

		// Abrir dialog para confirmar Remoção de DAO
		$scope.openConfirmRemoveDAO = function(ev,idDao) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Tem certeza que deseja remover este documento?')
				.textContent('A ação não poderá ser desfeita.')
				.ariaLabel('Deseja remover o documento')
				.targetEvent(ev)
				.ok('Sim')
				.cancel('Não');

			$mdDialog.show(confirm).then(
				function() {
					// Mostra carregando
					$scope.root.carregando = true;

					// Ajeitando dao a ser removida
					var dao = $scope.projeto.daos.find(function(a){return a.id == this},idDao);
					dao.id_projeto = $scope.projeto.id;
					GDoksFactory.removerDAO(dao)
					.success(function(response){
						// Esconde carregando
						$scope.root.carregando = false;

						// removendo dao do vetor local
						$scope.projeto.daos = $scope.projeto.daos.filter(function(a){return a.id!=this},idDao);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Documento removido com sucesso')
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
						console.warn(error.msg);
					});
				}
			);
		};
	}

	modProjetos.controller('ProjetosDAOsController',ProjetosDAOsController);
})();