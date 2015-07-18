'use strict';

module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        paths: {
            app: 'app',
            dist: 'dist'
        },

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['.tmp', '<%= paths.dist %>/*', '!<%= paths.dist %>/.git']
                }]
            }
        },

        concat: {
            js: {
                src: ['<%= paths.app %>/**/*.js'],
                dest: '<%= paths.dist %>/<%= pkg.name %>.js'
            },
            css: {
                src: ['<%= paths.app %>/**/*.css'],
                dest: '<%= paths.dist %>/<%= pkg.name %>.css'
            }
        },

        cssmin: {
            css: {
                src: '<%= concat.css.dest %>',
                dest: '<%= paths.dist %>/<%= pkg.name %>.min.css'
            }
        },

        uglify: {
            options: {
                banner: '/*! <=% pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    '<%= paths.dist %>/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concat',
        'uglify',
        'cssmin'
    ]);
};