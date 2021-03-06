/* jshint undef: true, unused: true */

(function () {

    'use strict';

    module.exports = function (grunt) {

        /**
         * Grunt Tasks and Configurations
         */
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            htmlmin: {
                dev: {
                    options: {
                        removeComments: false,
                        collapseWhitespace: false
                    },
                    files: {
                        'dist/index.html': 'src/index.html'
                    }
                },
                dist: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: {
                        'dist/index.html': 'src/index.html'
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
                        dest: 'dist/css'
                    }]
                }
            },
            copy: {
                all: {
                    files: [
                        {
                            cwd: 'src',
                            expand: true,
                            src: '**',
                            dest: 'dist'
                        }
                    ]
                },
                closure: {
                    files: [
                        {
                            cwd: 'src/js',
                            expand: true,
                            src: 'closure-library/**',
                            dest: 'dist/js/src/js'
                        }
                    ]
                },
                /**
                 * Copies original source from src/js to build/js/src/js for source map debugging.
                 */
                js: {
                    files: [
                        {
                            cwd: 'src/js',
                            expand: true,
                            src: [
                                'wopr/*.js'
                            ],
                            dest: 'dist/js/src/js'
                        }
                    ]
                },
                externs: {
                    files: [
                        {
                            cwd: 'src/js/externs',
                            expand: true,
                            src: [
                                '**/*.js'
                            ],
                            dest: 'dist/js/externs'
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
                            dest: 'dist/'
                        }
                    ]
                }
            },
            closureBuilder: {
                options: {
                    closureLibraryPath: 'src/js/closure-library',
                    inputs: [
                        'src/js/wopr/main.js'
                    ],
                    pythonBinary: '/usr/bin/python',
                    compilerFile: 'compiler-latest/compiler.jar',
                    output_mode: 'compiled',
                    compile: true,
                    compilerOpts: {
                        compilation_level: 'ADVANCED_OPTIMIZATIONS',
                        formatting: 'pretty_print',
                        warning_level: 'VERBOSE',
                        summary_detail_level: 3,
                        source_map_format: 'V3',
                        output_wrapper: '(function(){%output%}).call(window);\n//# sourceMappingURL=wopr.js.map.json',
                        create_source_map: 'dist/js/wopr.js.map.json'
                    },
                    execOpts: {
                        use_closure_library: false,
                        maxBuffer: 999999 * 1024
                    }
                },
                dev: {
                    src: [
                        'src/js'
                    ],
                    dest: 'dist/js/wopr.js',
                    options: {
                        output_mode: 'script',
                        compile: false,
                        compilerOpts: {
                            formatting: 'pretty_print',
                            warning_level: 'VERBOSE',
                            summary_detail_level: 3,
                            source_map_format: 'V3',
                            output_wrapper: '(function(){%output%}).call(window);\n//# sourceMappingURL=wopr.js.map.json',
                            create_source_map: 'dist/js/wopr.js.map.json'
                        }
                    }
                },
                dist: {
                    src: [
                        'src/js'
                    ],
                    dest: 'dist/js/wopr.js'
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
                    dest: 'dist/deps.js'
                }
            },
            jshint: {
                options: {
                    reporter: require('jshint-stylish')
                },
                test: [
                    'src/js/wopr/**/*.js'
                ]
            },
            gjslint: {
                options: {
                    flags: [
                        '--flagfile .gjslintrc'
                    ],
                    reporter: {
                        name: 'console' //report to console
                    },
                    force: false,
                    pythonPath: '/usr/bin/python'
                },
                test: {
                    src: '<%= jshint.test %>'
                }
            },
            clean: {
                dist: {
                    src: [
                        'dist/**'
                    ]
                }
            },
            watch: {
                dev: {
                    files: [
                        'src/*.html',
                        'src/css/*.css',
                        'src/js/wopr/*.js',
                        'Gruntfile.js'
                    ],
                    tasks: [
                        'dev'
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
            },
            tdd: {
                browser: {
                    files: {
                        sources: ['src/js/**/*.js'], // Where your application files are located
                        libs: [], // Libs loaded in order
                        tests: ['tests/**/*-test.js'] // Where your tests are located
                    },
                    options: {
                        runner: 'mocha', // jasmine, mocha or buster
                        expect: true, // Use the expect.js library for assertions
                        sinon: true // For spies, stubs and fake XHR
                    }
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-closure-tools');
        grunt.loadNpmTasks('grunt-tdd');
        grunt.loadNpmTasks('grunt-gjslint');

        /**
         * Alias tasks
         */

        grunt.registerTask('default', [
            'clean',
            'copy:other',
            'copy:closure',
            'copy:js',
            'closureBuilder:dist',
            'closureDepsWriter',
            'cssmin',
            'htmlmin'
        ]);

        grunt.registerTask('dev', [
            'copy:js',
            'closureBuilder:dev',
            'closureDepsWriter',
            'cssmin:dev',
            'htmlmin:dev'
        ]);

        grunt.registerTask('js', [
            'copy:js',
            'closureBuilder:dist'
        ]);

        grunt.registerTask('test', [
            'jshint'
        ]);

    };

}());
