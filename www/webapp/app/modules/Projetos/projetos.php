<?php 
	// verificando se o usuário está setado
	if(!isset($_COOKIE['user'])){
		// redirecionando para página inicial.
		header("Location: /webapp/login.php");
	}

	// lendo user do cookie
	$user = json_decode($_COOKIE['user']);

	// Carregando db
	include('../../../../../includes/db.php');

	// Carregando dbkey
	include('../../../../../client_data/'.$user->empresa.'/dbkey.php');

	// Criando conexaão com base de dados
	$db = new DB($dbkey);
	unset($dbkey);

	// Determinando a url deste script
	$url = $_SERVER['SCRIPT_NAME'];

	// Carregando o objeto tela
	include('../../../../../includes/GDoks/Tela.php');
	try {
		$tela = Tela::CreateByUrl($url,$user->id,$db);
	} catch (Exception $e) {
		die($e->getMessage());
	}

	// Carregando opções da tela
	$opcoes = $tela->getOpcoes();
?>
<div id="projetos_container" class="container_80">
	<div layout="row" layout-align="space-between center">
		<md-button ng-click="goToAddProjeto()" class="md-raised md-primary" ng-disabled="!<?=$opcoes['CadastrarNovoPrj']?>" aria-label="Cadastrar Novo Projeto">Cadastrar Novo Projeto</md-button>
		<md-input-container>
			<label>Buscar Projeto</label>
			<md-icon class="material-icons step" aria-label="Buscar Projeto">search</md-icon>
			<input ng-minlength="4" type="text" ng-model="q.nome" placeholder="Digite">
		</md-input-container>
	</div>
	
	<div class="lista">
		<span ng-if="projetos.length == 0">Não existe nenhum projeto cadastrado.</span>
		<a ng-repeat="p in projetos|filter:q|orderBy:'nome'" <?=$opcoes['AcessarPrj']?'href="#/projetos/{{p.id}}"':''?>" class="bloco_conteudo projeto" md-whiteframe="1dp" >
			<h2>{{p.nome}}</h2>
			<h3>{{p.codigo}}</h3>
		</a>
	</div>
</div>