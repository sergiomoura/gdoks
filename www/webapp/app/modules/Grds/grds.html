<div class="container_80" id="grds_container" layout="row">
	<form name="form" ng-submit="onFormSubmit()">
		<div class="controles" md-whiteframe="2dp" flex="none" layout="column">
			<md-input-container>
				<label>Código da GRD</label>
				<input type="text" ng-model="q.codigo">
			</md-input-container>
			<div layout="row">
				<md-input-container flex="50">
					<label>Cliente</label>
					<md-select ng-model="q.id_cliente" ng-change="onClienteChange()">
						<md-option ng-value="0">Todos os Clientes</md-option>
						<md-option ng-value="opt.id" ng-repeat="opt in clientes|orderBy:'nome'">{{opt.nome}}</md-option>
					</md-select>
				</md-input-container>
				<md-input-container  flex="50">
					<label>Projeto</label>
					<md-select ng-model="q.id_projeto" ng-disabled="projetosListados.length==0">
						<md-option ng-if="projetosListados.length==0" ng-value="0">Cliente sem projetos</md-option>
						<md-option ng-if="projetosListados.length>0" ng-value="0">Todos os Projetos</md-option>
						<md-option ng-if="projetosListados.length>0" ng-value="opt.id" ng-repeat="opt in projetosListados">{{opt.nome}}</md-option>
					</md-select>
				</md-input-container>
			</div>
			<div layout="row" layout-align="space-between start">
				<md-input-container>
					<label>Registrada de</label>
					<md-datepicker ng-model="q.regDe" md-hide-icons="calendar"></md-datepicker>
				</md-input-container>
				<md-input-container>
					<label>Registrada Até</label>
					<md-datepicker ng-model="q.regAte" md-hide-icons="calendar"></md-datepicker>
				</md-input-container>
			</div>
			<md-input-container>
				<label>GRD consta como enviada?</label>
				<md-select ng-model="q.enviada">
					<md-option ng-value="1">Sim</md-option>
					<md-option ng-value="0">Não</md-option>
					<md-option ng-value="2">Não Sei</md-option>
				</md-select>
			</md-input-container>
			<div layout="row" layout-align="space-between start">
				<md-input-container>
					<label>Enviada de</label>
					<md-datepicker ng-model="q.envDe" md-hide-icons="calendar" ng-disabled="q.enviada!=1"></md-datepicker>
				</md-input-container>
				<md-input-container>
					<label>Enviada Até</label>
					<md-datepicker ng-model="q.envAte" md-hide-icons="calendar" ng-disabled="q.enviada!=1"></md-datepicker>
				</md-input-container>
			</div>
			<div layout="row" layout-align="space-between start">
				<md-button flex="45" ng-click="onNovaClick()" class="md-raised md-accent" aria-label="Nova"><md-icon class="material-icons step" aria-label="Buscar">note_add</md-icon>Nova GRD</md-button>
				<md-button flex="45" ng-click="onBuscarClick()" class="md-raised md-primary" aria-label="Buscar"><md-icon class="material-icons step" aria-label="Buscar">search</md-icon>Buscar</md-button>
			</div>
		</div>
		<button type="submit" style="display: none"></button>
	</form>
	<div class="resultados_container" layout="column" ng-show="resultados != undefined">
		<div ng-if="nPaginas>1" class="paginacao" layout="row" flex="none">
				
			<md-button
				class="md-icon md-mini"
				ng-disabled="q.pagAtual==1"
				ng-click="onFirstPageClick()">
				<md-icon class="material-icons step" aria-label="">skip_previous</md-icon>
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				class="material-icons step"
				aria-label=""
				ng-disabled="q.pagAtual==1"
				ng-click="onPreviousPageClick()">
					<md-icon>fast_rewind</md-icon>
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				ng-disabled="true"><md-icon class="material-icons step" aria-label="">more_horiz</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="q.pagAtual==1"
				ng-click="onPreviousPageClick()">{{q.pagAtual==1?'':q.pagAtual-1}}
			</md-button>

			<md-button
				class="md-icon md-mini selected"
				ng-disabled="true">{{q.pagAtual}}
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="q.pagAtual==nPaginas"
				ng-click="onNextPageClick()">{{q.pagAtual==nPaginas?'':q.pagAtual+1}}
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				ng-disabled="true">
					<md-icon class="material-icons step" aria-label="">more_horiz</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="q.pagAtual==nPaginas"
				ng-click="onNextPageClick()">
					<md-icon class="material-icons step" aria-label="">fast_forward</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="q.pagAtual==nPaginas"
				ng-click="onLastPageClick()">
					<md-icon class="material-icons step" aria-label="">skip_next</md-icon>
			</md-button>
		</div>
		
		<div
			ng-if="resultados.length>0"
			class="resultado"
			layout="column"
			ng-repeat="grd in resultados"
			 md-whiteframe="2dp"
			ng-click="onResultadoClick(grd.grd_id)">
				<div layout="row" layout-align="space-between start">
					<div class="resultado_item">
						<label>Código da GRD</label>
						<span>{{grd.grd_cod}}</span>
					</div>
					<div class="resultado_item">
						<label>Cliente</label>
						<span>{{grd.cliente_nome}}</span>
					</div>
					<div class="resultado_item">
						<label>Projeto</label>
						<span>{{grd.projeto_nome}}</span>
					</div>
				</div>
				<div layout="row"  layout-align="space-between start">
					<div class="resultado_item">
						<label>Quantidade de Documentos</label>
						<span>{{grd.n_docs}}</span>
					</div>
					<div class="resultado_item">
						<label>Registrada em</label>
						<span>{{grd.grd_registradaEm|date:"dd/MM/yyyy à's' HH:mm:ss"}}</span>
					</div>
					<div class="resultado_item">
						<label>Enviada em</label>
						<span ng-if="grd.grd_enviadaEm!=null">{{grd.grd_enviadaEm|date:"dd/MM/yyyy à's' HH:mm:ss"}}</span>
						<span ng-if="grd.grd_enviadaEm==null">(NÃO ENVIADA)</span>
					</div>
				</div>
		</div>
		
		<div class="instrucoes" ng-if="resultados.length == 0">
		Sua busca não retornou nenhum resultado.
		</div>

		<div ng-if="nPaginas>1" class="paginacao" layout="row" flex="none">
				
			<md-button
				class="md-icon md-mini"
				ng-disabled="q.pagAtual==1"
				ng-click="onFirstPageClick()">
				<md-icon class="material-icons step" aria-label="">skip_previous</md-icon>
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				class="material-icons step"
				aria-label=""
				ng-disabled="q.pagAtual==1"
				ng-click="onPreviousPageClick()">
					<md-icon>fast_rewind</md-icon>
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				ng-disabled="true"><md-icon class="material-icons step" aria-label="">more_horiz</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="q.pagAtual==1"
				ng-click="onPreviousPageClick()">{{q.pagAtual==1?'':q.pagAtual-1}}
			</md-button>

			<md-button
				class="md-icon md-mini selected"
				ng-disabled="true">{{q.pagAtual}}
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="q.pagAtual==nPaginas"
				ng-click="onNextPageClick()">{{q.pagAtual==nPaginas?'':q.pagAtual+1}}
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				ng-disabled="true">
					<md-icon class="material-icons step" aria-label="">more_horiz</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="q.pagAtual==nPaginas"
				ng-click="onNextPageClick()">
					<md-icon class="material-icons step" aria-label="">fast_forward</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="q.pagAtual==nPaginas"
				ng-click="onLastPageClick()">
					<md-icon class="material-icons step" aria-label="">skip_next</md-icon>
			</md-button>
		</div>
	</div>
	<div class="resultados_container" ng-show="resultados == undefined">
		<div class="instrucoes">
		Preencha os campos a esquerda de acordo com o que você sabe sobre as GRDs procuradas.
		Depois clique em "Buscar".<br>
		Para obter mais resultados seja menos específico na sua busca.
		</div>
	</div>
</div>