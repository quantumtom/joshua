"use strict";

module.exports = function (grunt) {

    /**
     * Grunt Tasks and Configurations
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'src/index.html'
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['css/*.css'],
                    dest: 'build'
                }]
            }
        },
        closurecompiler: {
            dist: {
                src: "src/js/app.js",
                dest: "build/js/app.js",
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    source_map_format: "V3",
                    output_wrapper: "(function(){%output%})();\n//# sourceMap=sourcemap.json",
                    create_source_map: "build/sourcemap.json"
                }
            }
        },
        watch: {
            dev: {
                files: ['src/**/*.html', 'src/**/*.css', 'src/**/*.js'],
                tasks: ['default']
            }
        },
        clean: {
            build: {
                src: ["build"]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-closurecompiler');

    /**
     * Alias tasks
     */
    grunt.registerTask('default', ['clean', 'htmlmin', 'cssmin', 'closurecompiler']);

};
