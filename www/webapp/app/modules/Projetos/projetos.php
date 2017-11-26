<?php 
	// verificando se o usuário está setado
	if(!isset($_COOKIE['user'])){
		// redirecionando para página inicial.
		header("Location: /webapp/login.php");
	}

	// lendo user do cookie
	$user = json_decode($_COOKIE['user']);

	// Carregando db
	include('db.php');

	// Carregando dbkey
	include('../../../../../client_data/'.$user->empresa.'/dbkey.php');

	// Criando conexaão com base de dados
	$db = new DB($dbkey);
	unset($dbkey);

	// Determinando a url deste script
	$url = $_SERVER['SCRIPT_NAME'];

	// Carregando o objeto tela
	include('GDoks/Tela.php');
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
	<table>
		<thead>
			<tr>
				<td ng-click="setOrderBy('codigo')">
					Código
					<md-icon ng-if="o=='-codigo'" class="material-icons step md-primary">keyboard_arrow_down</md-icon>
					<md-icon ng-if="o=='codigo'" class="material-icons step md-primary">keyboard_arrow_up</md-icon>
				</td>
				<td ng-click="setOrderBy('nome')">
					Nome
					<md-icon ng-if="o=='-nome'" class="material-icons step md-primary">keyboard_arrow_down</md-icon>
					<md-icon ng-if="o=='nome'" class="material-icons step md-primary">keyboard_arrow_up</md-icon>
				</td>
				<td ng-click="setOrderBy('nome_cliente')">
					Cliente
					<md-icon ng-if="o=='-nome_cliente'" class="material-icons step md-primary">keyboard_arrow_down</md-icon>
					<md-icon ng-if="o=='nome_cliente'" class="material-icons step md-primary">keyboard_arrow_up</md-icon>
				</td>
				<td ng-click="setOrderBy('progresso')">
					Progresso
					<md-icon ng-if="o=='-progresso'" class="material-icons step md-primary">keyboard_arrow_down</md-icon>
					<md-icon ng-if="o=='progresso'" class="material-icons step md-primary">keyboard_arrow_up</md-icon>
				</td>
				<td>
					Ações
				</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="p in projetos|filter:q|orderBy:o" ng-click="gotoProjeto(p.id)">
				<td>{{p.codigo}}</td>
				<td>{{p.nome}}</td>
				<td>{{p.nome_cliente}}</td>
				<td>{{p.progresso_total}} %</td>
				<td>
					<?php if($opcoes['AcessarPrj']): ?>
					<md-button
						class="md-raised md-fab md-mini md-primary"
						ng-click="editProjeto(p.id,$event)"
						aria-label="Abrir Projeto">
							<md-icon class="material-icons step">mode_edit</md-icon>
					</md-button>
					<?php endif; ?>
				</td>
			</tr>
		</tbody>
	</table>
</div>