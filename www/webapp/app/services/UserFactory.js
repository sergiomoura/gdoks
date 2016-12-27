WebGeff.factory('UserFactory',
	function(){
		var factory = {};
		factory.getUsers = function($http){
			return [{'login':'sergio','pass':'teste'}];
		}
		return factory;
	}
)