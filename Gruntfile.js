'use strict';
module.exports = function(grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'public/stylesheets/css/app.css': ['public/stylesheets/less/main.less',
            'public/components/bootstrap/dist/css/bootstrap.css'
          ]
        }
      },
    },
    wiredep: {
      task: {
        src: ['views/**/*.dust'],
        options: {}
      }
    },
    express: {
      dev: {
        options: {
          script: 'app.js',
          node_env: 'development',
          port: 3000
        }
      },
      prod: {
        options: {
          script: 'app.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'app.js'
        }
      }
    },
    watch: {
      express: {
        files: ['routes/**/*.js', 'models/**/*.js', 'app.js', 'back/lib/**/*.js'],
        tasks: ['express:dev'],
        delay: 200,
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['public/**/*.less'], // which files to watch
        tasks: ['less', 'wiredep'],
        options: {
          nospawn: false
        }
      },
      html: {
        files: ['views/**/*.dust'], // which files to watch
        tasks: [],
        options: {
          nospawn: false
        }
      }
    }
  });
  grunt.registerTask('default', ['express:dev', 'watch']);
};
