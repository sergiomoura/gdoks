(function(){
	// Carregando módulo de documentos
	var module = angular.module('Documentos');

	// Atribuindo o controller
	module.controller('DocumentoController',DocumentoController);

	// Defininfo controller
	function DocumentoController($scope,$mdExpansionPanel,$routeParams,GDoksFactory,$mdToast,$cookies){

		// Pedindo para carregar documento
		carregaDocumento($routeParams.id);

		// Pedindo para carregar tamanhos de papel
		$scope.tamanhosDePapel = [];
		$scope.tamanhoPadrao = null;
		carregaTamanhosDePapel();

		// Determinando o odu do usuário logado
		$scope.idu = $cookies.getObject('user').id;

		// Definindo itens para o formUpload
		$scope.formUploadItems = [];

		$scope.collapseHistPanel = function(index){
			$mdExpansionPanel('histPanel_'+index).collapse();
		}

		$scope.onFilesChange = function(){
			// Levantando qual foi o último pacote de arquivos
			var ultimosArquivos = $scope.documento.revisoes[0].pdas[0].arquivos;
			// Declarando item
			var item;

			// Percorrendo vetor de arquivos escolhidos para saber se eles constam no último pacote
			for (var i = $scope.updateFiles.length - 1; i >= 0; i--) {
				if(ultimosArquivos.find(function(a){return a.nome_cliente==this},$scope.updateFiles[i].name) == undefined){
					// Arquivo NOVO
					item = {nome:$scope.updateFiles[i].name, nPaginas:1, tamanhoDoPapel:$scope.tamanhoPadrao.id, tipo:'novo',acao:1};
				} else {
					item = {nome:$scope.updateFiles[i].name, nPaginas:1, tamanhoDoPapel:$scope.tamanhoPadrao.id, tipo:'antigoParaAtualizar',acao:1}
				}
				$scope.formUploadItems.push(item);
			}

			// percorrendo o último pacote de arquivos procurando os arquivos que não constam no vetor de arquivos escolhidos
			for (var i = ultimosArquivos.length - 1; i >= 0; i--) {
				if($scope.updateFiles.find(function(a){return a.name == ultimosArquivos[i].nome_cliente}) == undefined){
					item = {nome:ultimosArquivos[i].nome_cliente, nPaginas:1, tamanhoDoPapel:$scope.tamanhoPadrao.id, tipo:'antigoNaoAtualizar',acao:1}
					$scope.formUploadItems.push(item);
				}				
			}
		}

		$scope.onDeleteClick = function(nome){
			var index = $scope.formUploadItems.findIndex(function(a){return a.nome == this},nome);
			$scope.formUploadItems.splice(index,1);
		}

		$scope.baixarParaRevisao = function(){
			GDoksFactory.baixarPDAParaRevisao($scope.documento.revisoes[0].pdas[0].id);
		}

		$scope.baixar = function(){
			GDoksFactory.baixarPDA($scope.documento.revisoes[0].pdas[0].id);
			$scope.documento.idu_checkout = $scope.idu;
			$scope.documento.datahora_checkout = new Date();
		}

		// FUNÇÕES AUXILIARES = = = = = = = = = = = = = = = = = = = =
		function carregaDocumento(id){
			// Mostra o carregando
			$scope.root.carregando = true;

			// Faz a requisição a factory
			GDoksFactory.getDocumento(id)
			.success(function(response){
				// Esconde carregando
				$scope.root.carregando = false;

				// Parsings...
				var doc = response.documento;
				
				for (var i = doc.revisoes.length - 1; i >= 0; i--) {
					doc.revisoes[i].data_limite = new Date(doc.revisoes[i].data_limite+'T00:00:00');
					doc.revisoes[i].ua = new Date(doc.revisoes[i].ua);
				}

				// Carrega documento no scope
				$scope.documento = doc;
			})
			.error(function(error){
				$scope.root.carregando = false;
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar documento: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			});
		}

		function carregaTamanhosDePapel(){
			GDoksFactory.getTamanhosDePapel()
			.success(function(response){
				$scope.tamanhosDePapel = response.tamanhosDePapel;

				$scope.tamanhoPadrao = $scope.tamanhosDePapel.find(function(a){
						return a.nome == "A4";
					});

				// Montando dicionário
				$scope.dic_tamanhosDePapel = [];
				for (var i = $scope.tamanhosDePapel.length - 1; i >= 0; i--) {
					$scope.dic_tamanhosDePapel[$scope.tamanhosDePapel[i].id] = $scope.tamanhosDePapel[i].nome;
				}
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar tamanhos de papel: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Enviando erro para o console
				console.warn(error);
			})
		}


	}
})();