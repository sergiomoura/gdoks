<div class="container_80" id="propostas_container">

	<div class="controles" layout="row" layout-align="space-between start">
		<div class="search" layout="row" layout-align="space-between center">
			<md-input-container>
				<label>Código</label>
				<input type="text" ng-model="busca.codigo">
			</md-input-container>
			<md-input-container>
				<label>De</label>
				<md-datepicker ng-model="busca.de" md-hide-icons="calendar" md-open-on-focus></md-datepicker>
			</md-input-container>
			<md-input-container>
				<label>Até</label>
				<md-datepicker ng-model="busca.de" md-hide-icons="calendar" md-open-on-focus></md-datepicker>
			</md-input-container>
			<md-input-container class="selectContainer">
				<label>Cliente</label>
				<md-select ng-model="busca.cliente">
					<md-option ng-value="opt" ng-repeat="opt in options">{{ opt }}</md-option>
				</md-select>
			</md-input-container>
			<md-button class="md-raised md-primary" aria-label="Buscar proposta">
				Buscar
			</md-button>
		</div>
		<md-button class="md-raised md-accent novaPropBt" aria-label="Criar nova proposta">
			<md-icon class="material-icons step">add</md-icon>
			Nova Proposta
		</md-button>
	</div>
	<table>
		<thead>
			<tr>
				<td>Código</td>
				<td>Cliente</td>
				<td>Criação</td>
				<td>Emissão</td>
				<td>Versão</td>
				<td></td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>a</td>
				<td>b</td>
				<td>c</td>
				<td>d</td>
				<td>e</td>
				<td> - - - -</td>
			</tr>
			<tr>
				<td>a</td>
				<td>b</td>
				<td>c</td>
				<td>d</td>
				<td>e</td>
				<td> - - - -</td>
			</tr>
			<tr>
				<td>a</td>
				<td>b</td>
				<td>c</td>
				<td>d</td>
				<td>e</td>
				<td> - - - -</td>
			</tr>
			<tr>
				<td>a</td>
				<td>b</td>
				<td>c</td>
				<td>d</td>
				<td>e</td>
				<td> - - - -</td>
			</tr>
			<tr>
				<td>a</td>
				<td>b</td>
				<td>c</td>
				<td>d</td>
				<td>e</td>
				<td> - - - -</td>
			</tr>
			<tr>
				<td>a</td>
				<td>b</td>
				<td>c</td>
				<td>d</td>
				<td>e</td>
				<td> - - - -</td>
			</tr>
			<tr>
				<td>a</td>
				<td>b</td>
				<td>c</td>
				<td>d</td>
				<td>e</td>
				<td> - - - -</td>
			</tr>
			<tr>
				<td>a</td>
				<td>b</td>
				<td>c</td>
				<td>d</td>
				<td>e</td>
				<td> - - - -</td>
			</tr>
			<tr>
				<td>a</td>
				<td>b</td>
				<td>c</td>
				<td>d</td>
				<td>e</td>
				<td> - - - -</td>
			</tr>
		</tbody>
	</table>
</div>