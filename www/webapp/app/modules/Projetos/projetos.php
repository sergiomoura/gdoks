<?php 
	// Incluindo o blocker de tela.
	include('blocker_tela.php');
?>
<div id="projetos_container" class="container_80">
	<div layout="row" layout-align="space-between center">
		<md-button ng-click="goToAddProjeto()" class="md-raised md-primary" ng-disabled="!<?=$opcoes_de_tela['CadastrarNovoPrj']?>" aria-label="Cadastrar Novo Projeto">Cadastrar Novo Projeto</md-button>
		<md-button ng-click="onListarProjetosClick()" class="md-primary" aria-label="Mostrar Projetos Inativos">{{mostrarInativos?"Esconder Projetos Inativos":"Mostrar Projetos Inativos"}}</md-button>
		<span flex></span>
		<md-input-container>
			<label>Buscar Projeto</label>
			<md-icon class="material-icons step" aria-label="Buscar Projeto">search</md-icon>
			<input type="text" ng-model="q.nome" placeholder="Digite">
		</md-input-container>
	</div>

	<table class="historico" ng-if="q.nome.length == 0 && historico.length > 0">
		<thead>
			<tr>
				<td>
					Código
				</td>
				<td>
					Nome
				</td>
				<td>
					Cliente
				</td>
				<td>
					Progresso
				</td>
				<td>
					Ações
				</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="p in historico|orderBy:oh" ng-click="gotoProjeto(p.id)">
				<td>{{p.codigo}}</td>
				<td>{{p.nome}}</td>
				<td>{{p.nome_cliente}}</td>
				<td>{{p.progresso_total}} %</td>
				<td>
					<?php if($opcoes_de_tela['AcessarPrj']): ?>
					<md-button
						class="md-raised md-fab md-mini md-primary"
						ng-click="editProjeto(p.id,$event)"
						aria-label="Abrir Projeto">
							<md-icon class="material-icons step">mode_edit</md-icon>
							<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
								Alterar Projeto
							</md-tooltip>
					</md-button>
					<md-button
						class="md-raised md-fab md-mini md-primary"
						ng-click="baixarLDP(p.id,$event)"
						aria-label="Baixar LDP">
							<md-icon class="material-icons step">playlist_add_check</md-icon>
							<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
								Baixar LDP
							</md-tooltip>
					</md-button>
					<?php endif; ?>

				</td>
			</tr>
		</tbody>
	</table>

	<table class="projetos" ng-if="projetos.length > 0">
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
					<?php if($opcoes_de_tela['AcessarPrj']): ?>
					<md-button
						class="md-raised md-fab md-mini md-primary"
						ng-click="editProjeto(p.id,$event)"
						aria-label="Abrir Projeto">
							<md-icon class="material-icons step">mode_edit</md-icon>
							<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
								Alterar Projeto
							</md-tooltip>
					</md-button>
					<md-button
						class="md-raised md-fab md-mini md-primary"
						ng-click="baixarLDP(p.id,$event)"
						aria-label="Baixar LDP">
							<md-icon class="material-icons step">playlist_add_check</md-icon>
							<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
								Baixar LDP
							</md-tooltip>
					</md-button>
					<?php endif; ?>
				</td>
			</tr>
		</tbody>
	</table>

	<div class="aviso" ng-if="projetos.length == 0">Nenhum projeto cadastrado</div>
	

</div>