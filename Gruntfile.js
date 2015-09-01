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
                        cwd: 'src/js',
                        expand: true,
                        src: 'wopr.js',
                        dest: 'build/js/src/js'
                    }
                ]
            },
            all: {
                files: [
                    {
                        cwd: 'src',
                        expand: true,
                        src: '**',
                        dest: 'build/'
                    }
                ]
            },
            closure: {
                files: [
                    {
                        cwd: 'src/js',
                        expand: true,
                        src: 'closure-library/**',
                        dest: 'build/js/src/js'
                    }
                ]
            }
        },
        closureBuilder: {
            options: {
                closureLibraryPath: 'src/js/closure-library',
                inputs: [
                    'src/js/wopr.js'
                ],
                pythonBinary: '/usr/bin/python',
                compilerFile: 'compiler.jar',
                output_mode: 'script',
                compile: false,
                compilerOpts: {
                    compilation_level: 'WHITESPACE_ONLY',
                    warning_leve: 'VERBOSE',
                    summary_detail_level: 3,
                    externs: [
                        'src/js/closure-library/closure/goog/base.js'
                    ],
                    source_map_format: 'V3',
                    output_wrapper: '(function(){%output%}).call(window);\n//# sourceMappingURL=wopr.js.map',
                    create_source_map: 'build/js/wopr.js.map'
                },
                execOpts: {
                    use_closure_library: false,
                    maxBuffer: 999999 * 1024
                }
            },
            dist: {
                src: [
                    'src/js'
                ],
                dest: 'build/js/wopr.js'
            }
        },
        closureDepsWriter: {
            options: {
                closureLibraryPath: 'src/js/closure-library',

                // [OPTIONAL] Define the full path to the executable directly.
                //    If set it trumps 'closureLibraryPath' which will not be required.
                depswriter: 'src/js/closure-library/closure/bin/build/depswriter.py', // filepath to depswriter

                // [OPTIONAL] Root directory to scan. Can be string or array
                root: [
                    'src/js',
                    'src/js/closure-library'
                ],
                execOpts: {
                    use_closure_library: false,
                    maxBuffer: 999999 * 1024
                }

            },
            // any name that describes your operation
            dist: {

                // [OPTIONAL] Set file targets. Can be a string, array or
                //    grunt file syntax (<config:...> or *)
                src: 'path/to/awesome.js',

                // [OPTIONAL] If not set, will output to stdout
                dest: 'build/deps.js'

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
                    'closureBuilder'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-closure-tools');

    /**
     * Alias tasks
     */

    grunt.registerTask('default', [
        'clean',
        'htmlmin:dev',
        'cssmin',
        'copy:all',
        'closureBuilder',
        'closureDepsWriter'
    ]);
    grunt.registerTask('dev', ['copy:dev']);
    grunt.registerTask('minimal', ['clean', 'htmlmin', 'cssmin', 'copy:js', 'closureBuilder']);

};
