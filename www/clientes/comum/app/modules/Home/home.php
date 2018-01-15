<div id="homeContainer">
	<div layout="row" layout-align="space-between start">
		<h3>Últimas Remessas de Documento</h3>
		<!-- <md-button class="md-raised md-primary" aria-label="ver todas grds" ng-click="refreshToken()">Ver todas anteriores</md-button> -->
	</div>
	<table class="grds">
		<thead>
			<tr>
				<td>Código</td>
				<td>Projeto</td>
				<td>Último Envio</td>
				<td>Data de Registro</td>
				<td>Nº Documentos</td>
				<td></td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="grd in grds">
				<td>{{grd.codigo}}</td>
				<td>{{grd.nome_projeto}}</td>
				<td>{{grd.datahora_enviada|date:'dd/MM/yyyy hh:mm:ss'}}</td>
				<td>{{grd.datahora_registro|date:'dd/MM/yyyy hh:mm:ss'}}</td>
				<td>{{grd.nDocs}}</td>
				<td>
					<md-button
						class="md-icon-button"
						aria-label="Baixar GRD"
						ng-click="downloadGrd(grd.id)">
							<md-icon class="material-icons step">file_download</md-icon>
					</md-button>
				</td>

			</tr>
		</tbody>
	</table>
</div>