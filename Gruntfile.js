'use strict';

module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        paths: {
            app: {
                base: 'app',
                resources: 'app/resources',
                src: 'app/src',
                views: 'app/view'
            },
            dist: {
                base: 'dist',
                css: 'dist/resources/css',
                js: 'dist/resources/js'
            }
        },

        pkg: grunt.file.readJSON('package.json'),

        bower_concat: {
            all: {
                dest: '<%= paths.dist.js %>/libs.js',
                cssDest: '<%= paths.dist.css %>/libs.css',
                mainFiles: {
                    'angular-new-router': 'dist/router.es5.js'
                },
                bowerOptions: {
                    relative: false
                }
            }
        },

        clean: ['<%= paths.dist.base %>/*', '!<%= paths.dist.base %>/.git'],

        concat: {
            dist: {
                src: [
                    '<%= paths.app.resources %>/js/model/item.js', '<%= paths.app.resources %>/js/model/ability.js',
                    '<%= paths.app.resources %>/js/repository/baseRepository.js', '<%= paths.app.resources %>/js/**/*.js'
                ],
                dest: '<%= paths.dist.js %>/<%= pkg.name %>.js'
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, dest: '<%= paths.dist.base %>/', src: ['<%= paths.app.src %>/**']},
                    {expand: true, flatten: true, dest: '<%= paths.dist.base %>/resources/images/', src: ['<%= paths.app.resources %>/images/*']}
                ]
            }
        },

        cssmin: {
            target: {
                files: {
                    '<%= paths.dist.css %>/<%= pkg.name %>.min.css': ['<%= paths.dist.css %>/<%= pkg.name %>.css'],
                    '<%= paths.dist.css %>/libs.min.css': ['<%= paths.dist.css %>/libs.css']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    compass: false,
                    loadPath: '<%= paths.app.base %>'
                },
                files: {
                    '<%= paths.dist.css %>/<%= pkg.name %>.css': ['<%= paths.app.resources %>/css/main.scss']
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    '<%= paths.dist.js %>/<%= pkg.name %>.min.js': ['<%= paths.dist.js %>/<%= pkg.name %>.js'],
                    '<%= paths.dist.js %>/libs.min.js': ['<%= paths.dist.js %>/libs.js']
                }
            }
        }
    });

    grunt.registerTask('build-dev', [
        'clean',
        'bower_concat',
        'concat',
        'sass',
        'copy'
    ]);

    grunt.registerTask('build', [
        'clean',
        'bower_concat',
        'concat',
        'copy',
        'sass',
        'uglify',
        'cssmin'
    ]);
};