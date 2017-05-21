angular.module('Log',[])
.controller('LogController',function($scope,$cookies,GDoksFactory){
	// Definindo logs
	$scope.logs = [];

	// Levantando usuários da base
	$scope.usuarios = [];
	$scope.dicUsuarios = [];
	indexedDB.open("gdoks").onsuccess = function(evt){
		evt.target.result.transaction("usuarios").objectStore("usuarios").getAll().onsuccess = function(evt){
			$scope.$apply(function(){
				$scope.usuarios = evt.target.result;
				$scope.q.uid = $cookies.getObject('user').id;
				$scope.usuariosCarregados = true;

				// criando dicionário de usuários
				for (var i = $scope.usuarios.length - 1; i >= 0; i--) {
					$scope.dicUsuarios[$scope.usuarios[i].id] = $scope.usuarios[i];
				}
			});
		}
	}
	// Levantando ações
	$scope.acoes = [];
	$scope.dicAcoes = [];
	GDoksFactory.getAcoes().success(function(response){
		$scope.acoes = response.acoes;
		$scope.acoesCarregadas = true;
		$scope.q.aid = 0;
		// criando dicionário de acoes
		for (var i = $scope.acoes.length - 1; i >= 0; i--) {
			$scope.dicAcoes[$scope.acoes[i].id] = $scope.acoes[i];
		}
	})

	// Definindo valores padrão para parâmetros de busca
	$scope.q = {
					de:(new Date()),
					ate:(new Date()),
					uid:$cookies.getObject('user').id,
					aid:0
				};
	// Flags de controle
	$scope.usuariosCarregados = false;
	$scope.acoesCarregadas = false;

	// Definindo função que faz a consulta ao log
	$scope.getLogs = function(){
		GDoksFactory.getLogs($scope.q).success(function(response){
			$scope.logs = response.logs;
			for (var i = $scope.logs.length - 1; i >= 0; i--) {
				$scope.logs[i].data = new Date($scope.logs[i].data);
			}
		});
	}

	// Chamando a função logo quando carrega a tela
	$scope.getLogs();

}).filter('logDescreveAcao',function(){
	return function(log,dicAcoes){
		var descricao = '';

		if(log.parametros == null){
			descricao = dicAcoes[log.id_acao].descricao;
		} else {
			var parametros = log.parametros.split(',');
			descricao = dicAcoes[log.id_acao].descricao;
			for (var i = parametros.length - 1; i >= 0; i--) {
				descricao = descricao.replace('$'+(i+1),parametros[i]);
			}
		}
		return descricao;
	}
}).filter('logUsername',function(){
	return function(log,dicUsuarios){
		// verificando se os usuários já foram carregados da base local e o dicionário foi criado
		if(dicUsuarios[log.id_usuario] == undefined){
			// Ainda não carregou dados da base, retornando string vazia
			return '';
		} else {
			// Carregou dados da base. Dois primeiros nomes do usuário.
			return(dicUsuarios[log.id_usuario].nome.split(' ').splice(0,2).join(' '));
		}
	}
})
