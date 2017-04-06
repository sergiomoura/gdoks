angular.module('Projetos').controller('ProjetosDAOsController',['$scope','Upload','$cookies','GDoksFactory',ProjetosDAOsController]);
function ProjetosDAOsController($scope,Upload,$cookies,GDoksFactory){
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
                	headers: {'Authorization':$cookies.getObject('user').token}
            	}
            ).then(
            	function (response){
            		console.dir(response);
            		if(response.status == 200){
            			// Upload Concluído com sucesso!
            			var result = response.data;
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
									switch(result.erros[i].codigo){
										case 3:
											$scope.errosNoUploadDeDaos[i] = "Já existe um documento com este nome para este projeto.";
											break;
										
										default:
											$scope.errosNoUploadDeDaos[i] = result.erros[i].codigo;
											break;
									}
								};
                    			
                    		} else {
                    			$scope.daosUploadErrorMsg = result.msg;
                    		}
                    		$scope.mostrarProgressoUploadDaos = false;
            			
            		}
            	}
            )
		}
    }

    //Definindo função que remove dao
	$scope.removerDAO = function(id){
		if(confirm("Tem certeza que deseja remover o documento do projeto? A ação não poderá ser desfeita.")){
			var dao = $scope.projeto.daos.find(function(a){return a.id == this},id);
			dao.id_projeto = $scope.projeto.id;
			GDoksFactory.removerDAO(dao)
				.success(
					function(response){
						$scope.projeto.daos = $scope.projeto.daos.filter(function(a){return a.id!=this},id);
					}
				)
				.error(
					function(error){
						$scope.erroEmOperacaoDeDao = error.msg;
					}
				);
		}
	}
}