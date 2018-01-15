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
					'app/AreaDoCliente.js',
					'app/modules/Home/HomeController.js',
					'app/modules/Grds/GrdsController.js',
					'app/modules/Documentos/DocumentosController.js',
					'app/services/Factory.js',
					'app/services/Constants.js',
					'app/modules/Opcoes/OpcoesController.js',
					'app/modules/Senha/SenhaController.js',
				],
				dest: 'bin/scripts.js'
			},
			css: {
				src:[
					'css/*.css',
					'node_modules/ng-tags-input/build/ng-tags-input.min.css',
					'node_modules/angular-material/angular-material.min.css',
					'node_modules/angular-material-expansion-panel/dist/md-expansion-panel.min.css',
					'node_modules/angular-material-sidemenu/dest/angular-material-sidemenu.css',
				],
				dest: 'bin/styles.css'
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