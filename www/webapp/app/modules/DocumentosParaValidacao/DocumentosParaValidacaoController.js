angular.module('DocumentosParaValidacao',[])
.controller('DocumentosParaValidacaoController',DocumentosParaValidacaoController)
.directive('gdoksDpv',function(){
	return {
		templateUrl:'app/modules/DocumentosParaValidacao/tmpl-dpv.html',
		restrict:'E',
		scope:{
			dpv:'=dpv'
		},
		controller:['$scope',function($scope){
			// definindo a variável que mostra o histótico ou não
			$scope.mostrandoHistorico = false;
		}]
	}
})
.filter('daysFromNow',function(){
	return function(futureDate){
		var diff = Math.ceil((futureDate - (new Date()))/86400000);
		if(diff == 1){
			return ('1 dia restante');
		} else if(diff > 1){
			return (diff + ' dias restantes');
		} else if(diff == 0) {
			return 'Hoje';
		} else if(diff == -1 ) {
			return ('1 dia atrás');
		} else {
			return ((-diff) + ' dias atrás');
		}
	}
})

function DocumentosParaValidacaoController($scope){

	// Definindo vetor de dpvs
	$scope.dpvs = [];

	// definindo variáveis de controle de carregamento de dependencias
	var carregouSubdisciplinas = false;
	var carregouUsuarios = false;

	// Levantando disciplinas da base local
	var subdisciplinas = [];
	indexedDB.open('gdoks').onsuccess = function(evt){
		evt.target.result.transaction('disciplinas').objectStore('disciplinas').getAll().onsuccess = function(evt){
			var disciplinas = evt.target.result;
			var disc;
			var sub;
			for (var i = disciplinas.length - 1; i >= 0; i--) {
				disc = disciplinas[i];
				for (var j = disc.subs.length - 1; j >= 0; j--) {
					sub = disc.subs[j];
					subdisciplinas.push({'id':sub.id,'nome':sub.nome,'id_disciplina':disc.id,'nome_disciplina':disc.nome});
				}
			}
			carregouSubdisciplinas = true;
			if(dependenciasEstaoOK()){
				mostraDpvs();
			}
		}
	}

	// Levantando usuarios da base local
	var subdisciplinas = [];
	indexedDB.open('gdoks').onsuccess = function(evt){
		evt.target.result.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
			var usuarios = evt.target.result;
			carregouUsuarios = true;
			if(dependenciasEstaoOK()){
				carregaDpvs();
			}
		}
	}

	// definindo funcoes auxiliares
	function dependenciasEstaoOK(){
		return carregouUsuarios && carregouSubdisciplinas;
	}

	function carregaDpvs(){
		
		// dumb data
		$scope.dpvs.push(
			{
				id:1,
				nome:'Doc 1',
				area:'Área x',
				cod_area:'aix',
				id_subdisciplina:2,
				data_limite:new Date('2017-04-14'),
				progresso:[
					{
						id_arquivo:1,
						prgValidado:0.1,
						data:new Date('2017-04-15'),
						idu:1
					},{
						id_arquivo:3,
						prgValidado:0.2,
						data:new Date('2017-04-16'),
						idu:1
					},{
						id_arquivo:6,
						prgValidado:0.3,
						data:new Date('2017-04-19'),
						idu:1
					},{
						id_arquivo:10,
						prgValidado:0.43,
						data:new Date('2017-04-20'),
						idu:1
					},{
						id_arquivo:15,
						prgValidado:0.53,
						data:new Date('2017-04-20'),
						idu:1
					},{
						id_arquivo:20,
						prgValidado:0.63,
						prgAValidar:0.10,
						data:new Date('2017-04-20'),
						idu:1
					}
				]
			}
		);
		$scope.dpvs.push(
			{
				id:2,
				nome:'Doc 2',
				area:'Área x',
				cod_area:'aix',
				id_subdisciplina:2,
				data_limite: new Date('2017-04-14'),
				progresso:[
					{
						id_arquivo:12,
						prgValidado:0.1,
						data:new Date('2017-04-01'),
						idu:1
					},{
						id_arquivo:15,
						prgValidado:0.2,
						data:new Date('2017-04-02'),
						idu:1
					},{
						id_arquivo:20,
						prgValidado:0.3,
						data:new Date('2017-04-05'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					}
				]
			}
		);

		$scope.dpvs.push(
			{
				id:2,
				nome:'Doc 3',
				area:'Área x',
				cod_area:'aix',
				id_subdisciplina:2,
				data_limite: new Date('2017-04-14'),
				progresso:[
					{
						id_arquivo:12,
						prgValidado:0.1,
						data:new Date('2017-04-01'),
						idu:1
					},{
						id_arquivo:15,
						prgValidado:0.2,
						data:new Date('2017-04-02'),
						idu:1
					},{
						id_arquivo:20,
						prgValidado:0.3,
						data:new Date('2017-04-05'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					}
				]
			}
		);

		$scope.dpvs.push(
			{
				id:2,
				nome:'Doc 4',
				area:'Área x',
				cod_area:'aix',
				id_subdisciplina:2,
				data_limite: new Date('2017-04-14'),
				progresso:[
					{
						id_arquivo:12,
						prgValidado:0.1,
						data:new Date('2017-04-01'),
						idu:1
					},{
						id_arquivo:15,
						prgValidado:0.2,
						data:new Date('2017-04-02'),
						idu:1
					},{
						id_arquivo:20,
						prgValidado:0.3,
						data:new Date('2017-04-05'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					},{
						id_arquivo:20,
						prgValidado:0.3,
						data:new Date('2017-04-05'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					}
				]
			}
		);

		$scope.dpvs.push(
			{
				id:2,
				nome:'Doc 5',
				area:'Área x',
				cod_area:'aix',
				id_subdisciplina:2,
				data_limite: new Date('2017-04-14'),
				progresso:[
					{
						id_arquivo:12,
						prgValidado:0.1,
						data:new Date('2017-04-01'),
						idu:1
					},{
						id_arquivo:15,
						prgValidado:0.2,
						data:new Date('2017-04-02'),
						idu:1
					},{
						id_arquivo:20,
						prgValidado:0.3,
						data:new Date('2017-04-05'),
						idu:1
					}
				]
			}
		);

		$scope.dpvs.push(
			{
				id:2,
				nome:'Doc 6',
				area:'Área x',
				cod_area:'aix',
				id_subdisciplina:2,
				data_limite: new Date('2017-04-14'),
				progresso:[
					{
						id_arquivo:12,
						prgValidado:0.1,
						data:new Date('2017-04-01'),
						idu:1
					},{
						id_arquivo:15,
						prgValidado:0.2,
						data:new Date('2017-04-02'),
						idu:1
					}
				]
			}
		);

		$scope.dpvs.push(
			{
				id:2,
				nome:'Doc 7',
				area:'Área x',
				cod_area:'aix',
				id_subdisciplina:2,
				data_limite: new Date('2017-04-14'),
				progresso:[
					{
						id_arquivo:12,
						prgValidado:0.1,
						data:new Date('2017-04-01'),
						idu:1
					},{
						id_arquivo:15,
						prgValidado:0.2,
						data:new Date('2017-04-02'),
						idu:1
					},{
						id_arquivo:20,
						prgValidado:0.3,
						data:new Date('2017-04-05'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					}
				]
			}
		);

		$scope.dpvs.push(
			{
				id:2,
				nome:'Doc 8',
				area:'Área x',
				cod_area:'aix',
				id_subdisciplina:2,
				data_limite: new Date('2017-04-14'),
				progresso:[
					{
						id_arquivo:12,
						prgValidado:0.1,
						data:new Date('2017-04-01'),
						idu:1
					},{
						id_arquivo:15,
						prgValidado:0.2,
						data:new Date('2017-04-02'),
						idu:1
					},{
						id_arquivo:20,
						prgValidado:0.3,
						data:new Date('2017-04-05'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					}
				]
			}
		);

		$scope.dpvs.push(
			{
				id:2,
				nome:'Doc 9',
				area:'Área x',
				cod_area:'aix',
				id_subdisciplina:2,
				data_limite: new Date('2017-04-14'),
				progresso:[
					{
						id_arquivo:12,
						prgValidado:0.1,
						data:new Date('2017-04-01'),
						idu:1
					},{
						id_arquivo:15,
						prgValidado:0.2,
						data:new Date('2017-04-02'),
						idu:1
					},{
						id_arquivo:20,
						prgValidado:0.3,
						data:new Date('2017-04-05'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgAValidar:0.01,
						data:new Date('2017-04-10'),
						idu:1
					}
				]
			}
		);

		// Parsing idu->usuários
		var usuarios = [];
		indexedDB.open('gdoks').onsuccess = function(evt){
			evt.target.result.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
				usuarios = evt.target.result;
				parseDpvs();
				delete usuarios;
			}
		}
		
		function parseDpvs(){
			var sub;
			for (var i = $scope.dpvs.length - 1; i >= 0; i--) {
				sub = subdisciplinas.find(function(a){return a.id==this},$scope.dpvs[i].id_subdisciplina);
				$scope.dpvs[i].nome_subdisciplina = sub.nome;
				$scope.dpvs[i].nome_disciplina = sub.nome_disciplina;
				$scope.dpvs[i].data = new Date($scope.dpvs[i].data);
				$scope.dpvs[i].dl = new Date($scope.dpvs[i].dl);
				$scope.dpvs[i].now = new Date();
				for (var j = $scope.dpvs[i].progresso.length - 1; j >= 0; j--) {
					$scope.dpvs[i].progresso[j].data = new Date($scope.dpvs[i].progresso[j].data);
					$scope.dpvs[i].progresso[j].usuario = usuarios.filter(function(u){return u.id == this},$scope.dpvs[i].progresso[j].idu)[0];
				}
			}
			$scope.$apply();
		}
	}

	$scope.update = function(){
		$scope.dpvs[1].progresso[$scope.dpvs[1].progresso.length - 1].prgAValidar = 0.1;
	}
};