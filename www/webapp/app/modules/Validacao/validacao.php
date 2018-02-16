<?php 
	// Incluindo o blocker de tela.
	include('blocker_tela.php');
?>
<div id="validacao_container" class="container_80">
	<div layout="row" layout-align="end center" ng-if="documentos.length>0">
		<md-button ng-click="validar()" class="md-raised md-primary" aria-label="Validar documentos selecionados">Validar documentos selecionados</md-button>
	</div>
	<table ng-if="documentos.length>0">
		<thead>
			<tr>
				<td>
					<md-checkbox
						class="md-primary"
						ng-model="todosSelecionados"
						ng-click="toggleSelecionados()"
						aria-label="Selecionar Todos"></md-checkbox>
				</td>
				<td>Código</td>
				<td>Validado</td>
				<td>A Validar</td>
				<td>Especialista</td>
				<td></td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="doc in documentos" ng-class="{naoValidar:!doc.validar}">
				<td>
					<md-checkbox ng-click="setTodosSelecionados()" class="md-primary" ng-model="doc.validar" aria-label="Validar este documento"></md-checkbox>
				</td>
				<td>{{doc.codigo}}</td>
				<td>
					<input ng-disabled="true" type="number" ng-model="doc.progresso_validado">
				</td>
				<td>
					<input ng-disabled="!doc.validar" type="number" ng-model="doc.progresso_a_validar">
				</td>
				<td>{{doc.sigla_especialista}}</td>
				<td>
					<md-button
						class="md-icon-button"
						aria-label="Ir para documento">
						<md-icon
							class="material-icons step"
							aria-label="Ir para documento"
							ng-click="goToDoc(doc.id)">open_in_new</md-icon>
							<md-tooltip md-direction="bottom">Ir para página do documento</md-tooltip>
					</md-button>
					
					<md-button
						class="md-icon-button"
						aria-label="Download"
						ng-click="baixarPDA(doc.id_pda)">
						<md-icon
							class="material-icons step"
							aria-label="Download">file_download</md-icon>
							<md-tooltip md-direction="bottom">Baixar documento</md-tooltip>
					</md-button>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="aviso" ng-if="documentos.length == 0">
		Nenhum documento para você validar.
	</div>
</div>