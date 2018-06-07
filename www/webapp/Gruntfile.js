module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			options: {
				separator: ';',
				sourceMap: true
			},
			js: {
				src: [
					'node_modules/angular/angular.min.js',
					'node_modules/angular-locale-pt-br/angular-locale_pt-br.js',
					'node_modules/angular-animate/angular-animate.min.js',
					'node_modules/angular-aria/angular-aria.min.js',
					'node_modules/angular-cookies/angular-cookies.min.js',
					'node_modules/angular-material/angular-material.min.js',
					'node_modules/angular-material-expansion-panel/dist/md-expansion-panel.min.js',
					'node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.js',
					'node_modules/angular-messages/angular-messages.min.js',
					'node_modules/angular-resource/angular-resource.min.js',
					'node_modules/angular-route/angular-route.min.js',
					'node_modules/angular-ui-mask/dist/mask.min.js',
					'node_modules/ng-currency/dist/ng-currency.js',
					'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
					'node_modules/ng-tags-input/build/ng-tags-input.min.js',
					'node_modules/chart.js/dist/Chart.bundle.js',
					'node_modules/angular-filesize-filter/angular-filesize-filter.js',
					'app/modules/Cargos/CargosController.js',
					'app/modules/Clientes/ClientesController.js',
					'app/modules/Configuracoes/ConfiguracoesController.js',
					'app/modules/Documentos/DocumentosController.js',
					'app/modules/Documentos/DocumentoController.js',
					'app/modules/Documentos/DocumentoEditController.js',
					'app/modules/Disciplinas/DisciplinasController.js',
					'app/modules/Grds/GrdsController.js',
					'app/modules/Nav/NavController.js',
					'app/modules/Log/LogController.js',
					'app/modules/Opcoes/OpcoesController.js',
					'app/modules/Projetos/ProjetosController.js',
					'app/modules/Projetos/ProjetosAreasController.js',
					'app/modules/Projetos/ProjetosSubareasController.js',
					'app/modules/Projetos/ProjetosDAOsController.js',
					'app/modules/Projetos/ProjetosDocumentosController.js',
					'app/modules/Projetos/ProjetosFinanceiroController.js',
					'app/modules/Senha/SenhaController.js',
					'app/modules/Sobre/SobreController.js',
					'app/modules/Topo/TopoController.js',
					'app/modules/Usuarios/UsuariosController.js',
					'app/modules/VisaoGeral/VisaoGeralController.js',
					'app/modules/Validacao/validacaoController.js',
					'app/services/constants.js',
					'app/WebGDoks.js',
					'app/services/Factory.js',
					'app/directives/directives.js',
					'app/directives/clickoutside.directives.js',
					'app/modules/Historico/HistoricoController.js',
					'node_modules/trix/dist/trix.js',
					'node_modules/angular-trix/dist/angular-trix.min.js',
					'app/modules/UA/UAController.js',
					'app/modules/Propostas/PropostasController.js',
				],
				dest: 'dist/scripts.js'
			},
			css: {
				src:['css/*.css'],
				dest: 'dist/styles.css'
			}
		},
		sass: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'scss',
						src: ['*.scss'],
						dest: 'css',
						ext: '.css'
					}
				]
			}
		},
		watch: {
			js:{
				files:['app/**/*.js'],
				tasks:['concat:js'],
				options: {
					livereload: true
				}
			},
			css:{
				files:['css/**/*.css'],
				tasks:['concat:css'],
			},
			sass:{
				files:['scss/*.scss'],
				tasks:['makeSassAndConcatCss'],
				options: {
					livereload: true
				}
			},
			html:{
				files:['./**/*.php','./**/*.html'],
				options: {
					livereload: true
				}
			}

		}
	});
	grunt.registerTask('makeSassAndConcatCss',['sass','concat:css']);
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default',['makeSassAndConcatCss','concat:js','watch']);
}

	