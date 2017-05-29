(function(){
	// Carregando módulo de documentos
	var module = angular.module('Documentos');

	// Atribuindo o controller
	module.controller('DocumentoController',DocumentoController);

	// Defininfo controller
	function DocumentoController($scope,$mdExpansionPanel,$routeParams,GDoksFactory,$mdToast){

		// Pedindo para carregar documento
		carregaDocumento($routeParams.id);

		// Pedindo para que se carregue o documento
		/*
		$scope.documento = {
			nome:"Documento A",
			id: 48,
			id_area:22,
			nome_area: 'RUEU',
			id_subarea:221,
			nome_subarea: '2139',
			id_disciplina: 5,
			nome_disciplina: "Elétrica",
			id_subdisciplina: 556,
			nome_subdisciplina: "ELE32",
			trabalho_estimado: 3,


			revisoes: [
				{
					serial: 0,
					data_limite: new Date('2017-05-29T00:00:00'),
					ua:new Date('2017-05-26T05:45:32'),
					progresso_validado:60,
					progresso_a_validar:10,
					pdas:[
						{
							ua:new Date('2017-05-26T05:45:32'),
							progresso_validado:60,
							progresso_a_validar:10	
						},
						{
							ua:new Date('2017-05-26T05:45:32'),
							progresso_validado:50,
							progresso_a_validar:0	
						},
						{
							ua:new Date('2017-05-26T05:45:32'),
							progresso_validado:30,
							progresso_a_validar:0	
						},
						{
							ua:new Date('2017-05-26T05:45:32'),
							progresso_validado:10,
							progresso_a_validar:0	
						}
					]
				},
				{
					serial: 1,
					data_limite: new Date('2017-05-29T00:00:00'),
					ua:new Date('2017-05-26T05:45:32'),
					progresso_validado:100,
					progresso_a_validar:0,
					pdas:[]
				},
				{
					serial: 2,
					data_limite: new Date('2017-05-25T00:00:00'),
					ua:new Date('2017-05-24T16:40:00'),
					progresso_validado:100,
					progresso_a_validar:0,
					pdas:[]
				}
			],
			grds:[1,2,3,'adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd','adhjsdlkalkdjajsd']
		}
		*/

		$scope.collapseHistPanel = function(index){
			$mdExpansionPanel('histPanel_'+index).collapse();
		}

		// funções auxiliares
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
	}
})();