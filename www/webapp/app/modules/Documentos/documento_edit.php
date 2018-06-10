<div id="documentoEdit_container" class="container_80">
	<form name="formdoc" layout="column" novalidate>
		<h3>Dados do Documento</h3>
		<div layout="row" layout-align="space-between center">
			<md-input-container flex="20">
				<label>Cliente</label>
				<input type="text" ng-model="doc.nome_cliente" disabled>
			</md-input-container>
			<md-input-container flex="20">
				<label>Projeto</label>
				<input type="text" ng-model="doc.nome_projeto" disabled>
			</md-input-container>
			<md-input-container flex="20">
				<label>Código do Documento</label>
				<input md-maxlength="45" maxlength="45" type="text" ng-model="doc.codigo" required>
			</md-input-container>
			<md-input-container flex="20">
				<label>Código Alternativo</label>
				<input md-maxlength="45" maxlength="45" type="text" ng-model="doc.codigo_alternativo">
			</md-input-container>
		</div>
		<div layout="row" layout-align="space-between center">
			
			<md-input-container flex>
				<label>Título do Documento</label>
				<input md-maxlength="100" maxlength="100" type="text" ng-model="doc.nome" required>
			</md-input-container>
		</div>

		<div layout="row" layout-align="space-between center" >
			<md-input-container flex="20">
				<label>Disciplina</label>
				<md-select ng-model="disciplinas.selecionada" required>
				  <md-option ng-value="opt" ng-repeat="opt in disciplinas|orderBy:'nome'">{{ opt.nome }}</md-option>
				</md-select>
			</md-input-container>
			<md-input-container flex="20">
				<label>Subdisciplina</label>
				<md-select ng-model="disciplinas.selecionada.subs.selecionada" required>
				  <md-option ng-value="opt" ng-repeat="opt in disciplinas.selecionada.subs|orderBy:'nome'">{{ opt.nome }}</md-option>
				</md-select>
			</md-input-container>
			<md-input-container flex="20">
				<label>Área</label>
				<md-select ng-model="areas.selecionada" required>
				  <md-option ng-value="opt" ng-repeat="opt in areas">{{opt.codigo}} - {{opt.nome}}</md-option>
				</md-select>
			</md-input-container>
			<md-input-container flex="20">
				<label>Subárea</label>
				<md-select ng-model="areas.selecionada.subareas.selecionada" required>
					<md-option ng-value="opt" ng-repeat="opt in areas.selecionada.subareas">{{opt.codigo}}{{(opt.nome!=null && opt.nome!='') ? (' - '+opt.nome):''}}</md-option>
				</md-select>
			</md-input-container>
		</div>

		<div layout="row" layout-align="space-between center">
			<md-input-container flex="20" class="datepicker" >
				<label>Data Limite</label>
				<md-datepicker
						ng-model="doc.revisoes[0].data_limite"
						md-open-on-focus
						md-hide-icons="calendar"
						required></md-datepicker>
			</md-input-container>
			<md-input-container flex="20">
				<label>Dependências</label>
				<md-select
					ng-model="doc.dependencias"
					data-md-container-class="SelectDpsHeader"
					multiple>
					<md-option
							ng-value="dp.id"
							ng-repeat="dp in dependenciasPossiveis">{{dp.codigo}}</md-option>
				</md-select>
			</md-input-container>
			<div flex="20"></div>
			<div flex="20"></div>
		</div>
		<div class="trabalho">
			<h3>Trabalho Estimado (Homem x Hora)</h3>
			<div ng-repeat="trab in doc.hhs" layout="row" flex="50">
				<md-input-container flex="50">
					<label>Cargo</label>
					<md-select
						ng-model="trab.id_cargo"
						data-md-container-class="SelectDpsHeader">
						<md-option
								ng-value="cargo.id"
								ng-repeat="cargo in cargos">{{cargo.nome}}
						</md-option>
					</md-select>
				</md-input-container>
				<md-input-container flex="30">
					<label>Qtde. de Horas</label>
					<input type="number" min="0" max="1000" ng-model="trab.hh">
				</md-input-container>
				<md-button ng-if="!$last" ng-click="removeHH($index)" class="md-icon-button" aria-label="Excluir HHs"><md-icon class="material-icons step" aria-label="Excluir HHs">close</md-icon></md-button>
				<md-button ng-if="$last" ng-click="addNewHH()" class="md-icon-button" aria-label="Adicionar HH"><md-icon class="material-icons step" aria-label="Adicionar HHs">add_circle_outline</md-icon></md-button>
			</div>
		</div>
	</form>
	<md-dialog-actions layout="row" layout-align="space-between center">
		<md-button ng-click="cancelar(doc)" class="md-raised md-accent" aria-label="Cancelar">Cancelar</md-button>
		<md-button ng-disabled="!formdoc.$valid || !formdoc.$dirty" ng-click="salvar()" class="md-raised md-primary" aria-label="Salvar Documento">Salvar Documento</md-button>
	</md-dialog-actions>
</div>
