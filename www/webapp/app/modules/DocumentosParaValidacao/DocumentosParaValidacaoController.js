angular.module('DocumentosParaValidacao',[])
.controller('DocumentosParaValidacaoController',DocumentosParaValidacaoController)
.directive('gdoksDpv',function(){
	return {
		templateUrl:'app/modules/DocumentosParaValidacao/tmpl-dpv.html',
		restrict:'E',
		scope:{
			dpv:'=dpv'
		}
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
				id_arquivo:10,
				tamanho_arquivo:40000,
				nome:'doc1',
				area:'Área x',
				cod_area:'aix',
				id_subdisciplina:2,
				dl:'2017-04-14',
				prgValidado:0.53,
				prgAValidar:0.10,
				idu:1,
				progresso:[
					{
						id_arquivo:1,
						prgValidado:0.1,
						prgValidado:0,
						data:'2017-04-01',
						idu:1
					},{
						id_arquivo:3,
						prgValidado:0.2,
						prgValidado:0,
						data:'2017-04-02',
						idu:1
					},{
						id_arquivo:6,
						prgValidado:0.3,
						prgValidado:0,
						data:'2017-04-05',
						idu:1
					},{
						id_arquivo:1,
						prgValidado:0.43,
						prgValidado:0.0,
						data:'2017-04-10',
						idu:1
					}
				]
			}
		);
		$scope.dpvs.push(
			{
				id:2,
				id_arquivo:15,
				tamanho_arquivo:5000,
				nome:'doc2',
				area:'Área Y',
				cod_area:'awsiY',
				id_subdisciplina:1,
				dl:'2017-04-3',
				prgValidado:0.53,
				prgAValidar:0.10,
				idu:1,
				progresso:[
					{
						id_arquivo:12,
						prgValidado:0.1,
						prgValidado:0,
						data:'2017-04-01',
						idu:1
					},{
						id_arquivo:15,
						prgValidado:0.2,
						prgValidado:0,
						data:'2017-04-02',
						idu:1
					},{
						id_arquivo:20,
						prgValidado:0.3,
						prgValidado:0,
						data:'2017-04-05',
						idu:1
					},{
						id_arquivo:25,
						prgValidado:0.43,
						prgValidado:0.0,
						data:'2017-04-10',
						idu:1
					}
				]
			}
		);
		
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
			}
		}

		$scope.$apply();
	}
};