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
            js: {
                files: [
                    {
                        expand: true,
                        src: 'src/js/*',
                        dest: 'build/js/'
                    }
                ]
            },
            favicon: {
                files: [
                    {
                        src: 'src/favicon.ico',
                        dest: 'build/favicon.ico'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        src: 'src',
                        dest: 'build'
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
        watch: {
            dev: {
                files: [
                    'src/*.html',
                    'src/css/*',
                    'src/js/*',
                    'Gruntfile.js'
                ],
                tasks: [
                    'copy:dev'
                ]
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
                    "build/css/*",
                    "build/js/*",
                    "build/*.html"]
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
    grunt.registerTask('default', ['clean', 'jsdoc', 'htmlmin:dist', 'cssmin', 'copy:js', 'closure-compiler']);
    grunt.registerTask('dev', ['copy:dev']);
    grunt.registerTask('minimal', ['clean', 'htmlmin', 'cssmin', 'copy:js', 'closure-compiler']);

};
