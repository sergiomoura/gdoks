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
				<md-datepicker ng-model="busca.ate" md-hide-icons="calendar" md-open-on-focus></md-datepicker>
			</md-input-container>
			<md-input-container class="selectContainer">
				<label>Cliente</label>
				<md-select ng-model="busca.id_cliente">
					<md-option ng-value="null">Qualquer cliente</md-option>
					<md-option ng-value="c.id" ng-repeat="c in clientes">{{ c.nome }}</md-option>
				</md-select>
			</md-input-container>
			<md-button ng-click="onBuscarClick()" class="md-raised md-primary" aria-label="Buscar proposta">
				Buscar
			</md-button>
		</div>
		<md-button ng-click="onNovaPropostaClick()" class="md-raised md-accent novaPropBt" aria-label="Criar nova proposta">
			<md-icon class="material-icons step">add</md-icon>
			Nova Proposta
		</md-button>
	</div>
	
	<table>
		<thead>
			<tr>
				<td>Código/Título</td>
				<td>Cliente</td>
				<td>Valor</td>
				<td>Criação</td>
				<td>Emissão</td>
				<td>Aprovação</td>
				<td>Versão</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="p in propostas" ng-click="goToProposta(p.id)">
				<td>{{p.codigo}}<span>{{p.titulo}}</span> </td>
				<td>{{p.cliente.nome}}</td>
				<td>{{p.valor | currency }}</td>
				<td>{{p.criacao|date:'dd/MM/yyyy'}}</td>
				<td>{{p.emissao|date:'dd/MM/yyyy'}}</td>
				<td>{{p.aprovacao|date:'dd/MM/yyyy'}}</td>
				<td>{{p.serial}}</td>
			</tr>
		</tbody>
	</table>
</div>