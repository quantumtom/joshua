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
                    'src/build/index.html': 'src/index.html'
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
                    dest: 'src/build'
                }]
            }
        },
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        src: 'src/js/*',
                        dest: 'src/build/js/'
                    }

                ]
            }
        },
        'closure-compiler': {
            dist: {
                closurePath: '/usr/local/opt/closure-compiler/libexec/',
                js: "src/js/app.js",
                jsOutputFile: "src/build/js/app.js",
                maxBuffer: 500,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    warning_level: 'VERBOSE',
                    source_map_format: "V3",
                    output_wrapper: "(function(){%output%}).call(window);\n//# sourceMappingURL=app.js.map",
                    create_source_map: "src/build/js/app.js.map"
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
                tasks: ['minimal']
            }
        },
        jsdoc : {
            dist : {
                src: 'src/js/app.js',
                dest: 'src/build/doc/'
            }
        },
        clean: {
            build: {
                src: [
                    "src/build/css/*",
                    "src/build/js/*",
                    "src/build/*.html"]
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
    grunt.registerTask('default', ['clean', 'jsdoc', 'htmlmin', 'cssmin', 'copy:js', 'closure-compiler']);
    grunt.registerTask('minimal', ['clean', 'htmlmin', 'cssmin', 'copy:js', 'closure-compiler']);

};
