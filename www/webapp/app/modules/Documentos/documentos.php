<?php 
	// Incluindo o blocker de tela.
	include('blocker_tela.php');
?>
<md-content id="lista_de_documentos_container" class="container_80" layout-padding layout-wrap>
    
	<div layout="column">

		<div layout="row" layout-align="space-between start">
			<md-input-container flex="66">
				<label>Busca</label>
				<input focus autocomplete="off" type="text" ng-model="busca.nome" placeholder="Digite o nome ou codigo do documento...">
			</md-input-container>
			<md-input-container flex="30">
				<label>Ordenar Por</label>
				<md-select ng-model="busca.ordem">
				  <md-option ng-value="'nome'">Nome</md-option>
				  <md-option ng-value="'data_limite'">Data Limite</md-option>
				</md-select>
			</md-input-container>
		</div>

		<div layout="row" layout-align="space-between center">
			
			<md-input-container flex="30">
				<label>Emitido?</label>
				<md-select ng-model="busca.emitido">
					<md-option ng-value="2">Tanto faz</md-option>
				 	<md-option ng-value="1">Sim - somente documentos emitidos</md-option>
				 	<md-option ng-value="0">Não - somente documentos não emitidos</md-option>
				</md-select>
			</md-input-container>
			
			<md-input-container flex="30">
				<label>Completude</label>
				<md-select ng-model="busca.completude">
				  <md-option ng-value="1">Somente os por concluir</md-option>
				  <md-option ng-value="2">Somente os concluídos</md-option>
				  <md-option ng-value="3">Todos - Concluídos ou não</md-option>
				</md-select>
			</md-input-container>

			<md-input-container flex="30">
				<label>Validação</label>
				<md-select ng-model="busca.validacao">
				  <md-option ng-value="1">... com progresso a validar</md-option>
				  <md-option ng-value="2">... validados</md-option>
				  <md-option ng-value="3">... qualquer situação</md-option>
				</md-select>
			</md-input-container>
			
		</div>
		<div layout="column">
			<div layout="row" layout-align="space-between center">
				<md-input-container flex="45">
					<label>Cliente</label>
					<md-select ng-model="busca.id_cliente" ng-change="onClienteChange()">
					  <md-option ng-value="undefined">Todos os Clientes</md-option>
					  <md-option ng-value="c.id" ng-repeat="c in clientes|orderBy:'nome'">{{ c.nome }}</md-option>
					</md-select>
				</md-input-container>
				<md-input-container flex="45">
					<label>Projeto</label>
					<md-select ng-model="busca.id_projeto" ng-change="onProjetoChange()">
					  <md-option ng-value="undefined">Todos os Projetos</md-option>
					  <md-option ng-value="p.id" ng-repeat="p in projetos|orderBy:'nome'">{{ p.nome }}</md-option>
					</md-select>
				</md-input-container>
			</div>

			<div layout="row" layout-align="space-between center">
				<md-input-container flex="45">
					<label>Área</label>
					<md-select ng-model="busca.id_area" ng-change="onAreaChange()">
					  <md-option ng-value="undefined">Todas as Áreas</md-option>
					  <md-option ng-value="a.id" ng-repeat="a in areas">{{ a.nome }}</md-option>
					</md-select>
				</md-input-container>
				<md-input-container flex="45">
					<label>Sub-área</label>
					<md-select ng-model="busca.id_subarea">
					  <md-option ng-value="undefined">Todas as Sub-áreas</md-option>
					  <md-option ng-value="s.id" ng-repeat="s in subareas">{{ s.nome }}</md-option>
					</md-select>
				</md-input-container>	
			</div>

			<div layout="row"  layout-align="space-between center">
				<md-input-container flex="45">
					<label>Disciplina</label>
					<md-select ng-model="busca.id_disciplina" ng-change="onDisciplinaChange()">
					  <md-option ng-value="undefined">Todas as Disciplinas</md-option>
					  <md-option ng-value="d.id" ng-repeat="d in disciplinas">{{ d.nome }}</md-option>
					</md-select>
				</md-input-container>
				<md-input-container flex="45">
					<label>Subdisciplinas</label>
					<md-select ng-model="busca.id_subdisciplina">
					  <md-option ng-value="undefined">Todas as Subdisciplinas</md-option>
					  <md-option ng-value="sub.id" ng-repeat="sub in subdisciplinas">{{ sub.nome }}</md-option>
					</md-select>
				</md-input-container>	
			</div>
		</div>

		<div layout="row" layout-align="start center">
			<div layout-align="start center" flex>
				<md-button class="md-fab md-primary md-mini" ng-click="onBaixarLdpClick()" ng-disabled="!busca.id_projeto">
					<md-icon class="material-icons step" aria-label="Baixar lista de documentos">file_download</md-icon>
					<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
						Baixar Lista de Documentos de Projeto (.xlsx)
					</md-tooltip>
				</md-button>
				<md-button class="md-fab md-primary md-mini" ng-click="onEmitirLdpClick()" ng-disabled="!busca.id_projeto">
					<md-icon class="material-icons step" aria-label="Emitir lista de documentos">print</md-icon>
					<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
						Emitir Lista de Documentos de Projeto(.pdf)
					</md-tooltip>
				</md-button>
			</div>
			<md-button ng-click="onBuscarDocumentoClick()" style="text-transform:none; padding: 0 30px 0 20px; left:5px; position: relative;top: 7px" class="md-raised md-primary" aria-label="Buscar Documento"><md-icon class="material-icons step" aria-label="Buscar Documento">search</md-icon>Buscar Documentos</md-button>
		</div>
		
	</div>
	
	<md-content class="resultado_de_busca">
		<div class="paginacao" layout="row" flex="none" ng-if="totPaginas>1">
			<md-button
				class="md-icon md-mini"
				ng-disabled="busca.pagAtual==1"
				ng-click="onFirstPageClick()">
				<md-icon class="material-icons step" aria-label="">skip_previous</md-icon>
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				class="material-icons step"
				aria-label=""
				ng-disabled="busca.pagAtual==1"
				ng-click="onPreviousPageClick()">
					<md-icon>fast_rewind</md-icon>
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				ng-disabled="true"><md-icon class="material-icons step" aria-label="">more_horiz</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="busca.pagAtual==1"
				ng-click="onPreviousPageClick()">{{busca.pagAtual==1?'':busca.pagAtual-1}}
			</md-button>

			<md-button
				class="md-icon md-mini selected"
				ng-disabled="true">{{busca.pagAtual}}
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="busca.pagAtual==totPaginas"
				ng-click="onNextPageClick()">{{busca.pagAtual==totPaginas?'':busca.pagAtual+1}}
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				ng-disabled="true">
					<md-icon class="material-icons step" aria-label="">more_horiz</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="busca.pagAtual==nPaginas"
				ng-click="onNextPageClick()">
					<md-icon class="material-icons step" aria-label="">fast_forward</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="busca.pagAtual==nPaginas"
				ng-click="onLastPageClick()">
					<md-icon class="material-icons step" aria-label="">skip_next</md-icon>
			</md-button>
		</div>
		
		<table class="documentos" ng-if="documentos.length>0">
			<thead>
				<tr>
					<td>Documento</td>
					<td>Revisão</td>
					<td>Disciplina</td>
					<td>Área</td>
					<td>Data Limite</td>
					<td>Progresso</td>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="doc in documentos track by doc.id" ng-click="onOpenClick(doc.id)">
					<td>
						{{doc.codigo}}
						<span>{{doc.nome}}</span>
					</td>
					<td>Rev {{doc.serial}}</td>
					<td>
						{{doc.disciplina_nome}}
						<md-tooltip md-visible="false" md-delay="400" md-direction="bottom" md-autohide="true">
							{{doc.subdisciplina_nome}}
						</md-tooltip>
					</td>
					<td>
						{{doc.area_codigo}}
						<span>{{doc.subarea_codigo}}</span>
					</td>
					<td>
						{{doc.data_limite|date:"dd/MM/yyyy"}}
					</td>
					<td>
						<progresso progress="[doc.progresso_validado,doc.progresso_a_validar]" colors="['#2196F3','#6DD900']" fcolors="['#FFF','#FFF']" width="100" height="20"></progresso>
					</td>
				</tr>
			</tbody>
		</table>

		<div class="aviso" ng-if="documentos.length==0">Nenhum documento retornado.</div>

		<div class="paginacao" layout="row" flex="none" ng-if="totPaginas>1">
			<md-button
				class="md-icon md-mini"
				ng-disabled="busca.pagAtual==1"
				ng-click="onFirstPageClick()">
				<md-icon class="material-icons step" aria-label="">skip_previous</md-icon>
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				class="material-icons step"
				aria-label=""
				ng-disabled="busca.pagAtual==1"
				ng-click="onPreviousPageClick()">
					<md-icon>fast_rewind</md-icon>
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				ng-disabled="true"><md-icon class="material-icons step" aria-label="">more_horiz</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="busca.pagAtual==1"
				ng-click="onPreviousPageClick()">{{busca.pagAtual==1?'':busca.pagAtual-1}}
			</md-button>

			<md-button
				class="md-icon md-mini selected"
				ng-disabled="true">{{busca.pagAtual}}
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="busca.pagAtual==totPaginas"
				ng-click="onNextPageClick()">{{busca.pagAtual==totPaginas?'':busca.pagAtual+1}}
			</md-button>
			
			<md-button
				class="md-icon md-mini"
				ng-disabled="true">
					<md-icon class="material-icons step" aria-label="">more_horiz</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="busca.pagAtual==nPaginas"
				ng-click="onNextPageClick()">
					<md-icon class="material-icons step" aria-label="">fast_forward</md-icon>
			</md-button>

			<md-button
				class="md-icon md-mini"
				ng-disabled="busca.pagAtual==nPaginas"
				ng-click="onLastPageClick()">
					<md-icon class="material-icons step" aria-label="">skip_next</md-icon>
			</md-button>
		</div>
	</md-content>
</md-content>