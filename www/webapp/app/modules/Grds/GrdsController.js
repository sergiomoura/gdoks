(function(){
	// Criando o módulo
	var GrdsModule = angular.module('Grds',[]);

	// Criando função controller de Grds
	var GrdsController = function($scope){
		console.log('Módulo Grds carregado...');
	}

	// Criando função controller de Grds
	var GrdController = function($scope){
		console.log("Uiiiia!!!");
	}

	// Atribuindo função controller ao módulo
	GrdsModule.controller('GrdsController',GrdsController);
	GrdsModule.controller('GrdController',GrdController);

})()