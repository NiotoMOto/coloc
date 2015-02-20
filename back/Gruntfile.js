'use strict';
module.exports = function(grunt) {
	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-tasks')(grunt);

	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};

	grunt.initConfig({
		includeSource: {
			options: {
				basePath: 'app',
				baseUrl: ''
			},
			myTarget: {
				files: {
					'app/index.html': 'app/index.html'
				}
			}
		},
		wiredep: {
			app: {
				src: ['app/index.html'],
				ignorePath: /\.\.\//
			}
		},
		less: {
			development: {
				options: {
					compress: false,
					yuicompress: false,
					optimization: 2
				},
				files: {
					'app/styles/main.css': ['app/styles/main.less',
						'bower_components/bootstrap/dist/css/bootstrap.css'
					]
				}
			},
		},
		connect: {
			options: {
				port: 9000,
				base: 'app/',
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					middleware: function(connect) {
						return [
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			}
		},
		watch: {
			options: {
				livereload: 35728
			},
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['app/scripts/**/*.js'],
				tasks: ['includeSource','wiredep'],
				options: {
					nospawn: false,
					livereload: true,
				}
			},
			styles: {
				files: ['app/styles/**/*.less'], // which files to watch
				tasks: ['less', 'wiredep'],
				options: {
					nospawn: false,
					livereload: true,
				}
			},
			html: {
				files: ['app/**/*.html'], // which files to watch
				tasks: ['includeSource'],
				options: {
					nospawn: false,
					livereload: true,
				}
			}
		}
	});

	grunt.registerTask('default', ['includeSource','wiredep', 'connect', 'watch']);
};
