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
                    cwd: 'src/css',
                    src: ['wopr.css'],
                    dest: 'build/css'
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
            other: {
                files: [
                    {
                        cwd: 'src',
                        expand: true,
                        src: [
                            '.htaccess',
                            'img/**',
                            'cache.manifest',
                            'favicon.ico'
                        ],
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
                compile: true,
                compilerOpts: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    warning_level: 'VERBOSE',
                    summary_detail_level: 3,
                    manage_closure_dependencies: false,
                    source_map_format: 'V3',
                    output_wrapper: '(function(){%output%}).call(window);\n//# sourceMappingURL=wopr.js.map.json',
                    create_source_map: 'build/js/wopr.js.map.json'
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
                depswriter: 'src/js/closure-library/closure/bin/build/depswriter.py',
                root: [
                    'src/js',
                    'src/js/closure-library'
                ],
                execOpts: {
                    use_closure_library: false,
                    maxBuffer: 999999 * 1024
                }

            },
            dist: {
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
        'copy:other',
        'copy:closure',
        'closureBuilder',
        'closureDepsWriter',
        'cssmin',
        'htmlmin'
    ]);
    grunt.registerTask('dev', ['copy:dev']);
    grunt.registerTask('minimal', ['clean', 'htmlmin', 'cssmin', 'copy:js', 'closureBuilder']);

};
