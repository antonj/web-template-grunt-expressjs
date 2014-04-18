var path = require('path');

module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      options: {
        script: 'app.js',
        output: 'Server is running'
      },

      dev: {
        options: {
          output: ".+" // Matching this output indicates that server is running
        }
      }
    },

    jshint: {
      options: {
        globalstrict : true,
        trailing: true
      },
      src: ['public_src/js/**/*.js', '!public_src/js/libs/**/*.js']
    },


    uglify: {
      build: {
        files: {
          'public/js/main.min.js': ['public/js/main.js']
        }
      }
    },

    compass: {
      dist: {
        options: {
          config: '.compassrc.rb'
        }
      }
    },

    cssmin: {
      build: {
        src: 'public/css/screen.css',
        dest: 'public/css/screen.min.css'
      }
    },

    browserify: {
      js: {
        src: 'public_src/js/main.js',
        dest: 'public/js/main.js'
      },
      test: {
        src: 'tests/tests.js',
        dest: 'tests/tests.bundle.js'
      }
    },

    qunit: {
      all: ['tests/**/*.html']
    },

    watch: {
      js: {
        files: ['public_src/js/**/*.js'],
        tasks: ['js_dev'],
        options: {
          livereload: true,
          spawn: true
        }
      },
      test: {
        files: ['tests/tests.js'],
        tasks: ['browserify:test', 'qunit'],
        options: {
          livereload: true
        }
      },

      lint: {
        files: ['public_src/js/**/*.js'],
        tasks: ['jshint']
      },

      css: {
        files: ['public_src/scss/**/*.scss'],
        tasks: ['css_dev'],
        options: {
          livereload: true,
          spawn: true
        }
      },

      express: {
        // Restart any time client or server js files change
        files:  ['app.js'],
        tasks:  ['express:dev'],
        options: {
          //Without this option specified express won't be reloaded
          spawn: false
        }
      }
    },

    shell: {
      bower: {
        command: path.resolve(__dirname + '/node_modules/.bin/bower install'),
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    }
  });
  
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', ['shell:bower', 'css_dev', 'js_dev', 'express:dev', 'watch']);
  grunt.registerTask('all',  ['shell:bower', 'compass', 'cssmin', 'browserify', 'uglify', 'qunit']);
  grunt.registerTask('css_prod',  ['compass', 'cssmin']);
  grunt.registerTask('js_prod',  ['browserify', 'uglify']);
  grunt.registerTask('css_dev',  ['compass']);
  grunt.registerTask('js_dev',  ['browserify']);
};
