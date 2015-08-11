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
            },
            dev: {
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
        copy: {
            /**
             * Copies original source from src/js to build/js/src/js for source map debugging.
             */
            js: {
                files: [
                    {
                        expand: true,
                        src: 'src/js/*',
                        dest: 'build/js/'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        cwd: 'src',
                        expand: true,
                        src: '**',
                        dest: 'build/'
                    }
                ]
            }
        },
        'closure-compiler': {
            dist: {
                closurePath: '/usr/local/opt/closure-compiler/libexec/',
                js: "src/js/app.js",
                jsOutputFile: "build/js/app.js",
                maxBuffer: 500,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    warning_level: 'VERBOSE',
                    source_map_format: "V3",
                    output_wrapper: "(function(){%output%}).call(window);\n//# sourceMappingURL=app.js.map",
                    create_source_map: "build/js/app.js.map"
                }
            }
        },
        jsdoc : {
            dist : {
                src: 'src/js/app.js',
                dest: 'build/doc/'
            }
        },
        clean: {
            build: {
                src: [
                    "build/*"
                ]
            }
        },
        watch: {
            dev: {
                files: [
                    'src/*.html',
                    'src/css/*.css',
                    'src/js/*.js',
                    'Gruntfile.js'
                ],
                tasks: [
                    'copy:dev'
                ]
            },
            dist: {
                files: [
                    'src/*'
                ],
                tasks: [
                    'default'
                ]
            },
            js: {
                files: [
                    'src/js/*.js'
                ],
                tasks: [
                    'copy:js',
                    'closure-compiler'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-jsdoc');

    /**
     * Alias tasks
     */

    grunt.registerTask('default', ['clean', 'htmlmin:dev', 'cssmin', 'copy:js', 'copy:dev', 'closure-compiler']);
    grunt.registerTask('dev', ['copy:dev']);
    grunt.registerTask('minimal', ['clean', 'htmlmin', 'cssmin', 'copy:js', 'closure-compiler']);

};
