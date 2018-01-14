(function(){
	// Definição de módulo
	var module = angular.module('Documentos',[]);

	// Atricuição de controllers a módulo
	module.controller('DocumentosController',DocumentosController);
	module.controller('DocumentoController',DocumentoController);
	
	// Definição da função DocumentosController
	function DocumentosController($scope){}

	// Definição da função GrdsController
	function DocumentoController($scope){}
})()