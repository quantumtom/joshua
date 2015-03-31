/**
 * Created by thomascornyn on 3/9/15.
 */
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
            simple: {
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS'
                },
                src: "src/js/goes.js",
                dest: "build/js/goes.js"
            },
            minify: {
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    output_wrapper: "(function(){%output%}).call(this);\n// #sourceMappingURL=src/js/goes.js.map",
                    source_map_format: "V3",
                    create_source_map: "src/js/goes.js.map"
                },
                src: "src/js/goes.js",
                dest: "build/js/goes.js"
            }
        },
        concat: {
            js: {
                src: ['src/js/*.js'],
                dest: ['build/js/<%= pkg.name %>.js']
            },
            css: {
                src: ['src/css/*.css'],
                dest: ['build/css/<%= pkg.name %>.css']
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['index.html', 'js/*.js', 'css/*.css'],
                        dest: 'build/'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['js/**'],
                        dest: 'build/'
                    }
                ]

            }
        },
        watch: {
            dev: {
                files: ['src/**/*.html', 'src/**/*.css', 'src/**/*.js'],
                tasks: ['ccjs']
            }
        },
        jshint: {
            files: ['src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-closurecompiler');
    grunt.loadNpmTasks('grunt-closure-tools');

    /**
     * Alias tasks
     */
    grunt.registerTask('default', ['clean', 'htmlmin', 'cssmin', 'closurecompiler']);
    grunt.registerTask('dev', ['clean', 'copy:js', 'htmlmin', 'cssmin']);
    grunt.registerTask('simple', ['clean', 'closurecompiler:simple', 'htmlmin', 'cssmin']);
    grunt.registerTask('ccjs', ['closurecompiler:minify']);

};
