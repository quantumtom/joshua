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
            minify: {
                files: {
                    // Destination: Sources...
                    "build/js/<%= pkg.name %>.js": ["src/js/*"]
                },

                options: {
                    // Any options supported by Closure Compiler, for example:
                    "compilation_level": "ADVANCED_OPTIMIZATIONS",

                    // Plus a simultaneous processes limit
                    "max_processes": 5
                }
            },
            dev: {
                files: {
                    // Destination: Sources...
                    "build/js/<%= pkg.name %>.js": ["src/js/*"]
                },

                options: {
                    version : 3,
                    file: "out.js",
                    sourceRoot : "",
                    sources: ["foo.js", "bar.js"],
                    names: ["src", "maps", "are", "fun"],
                    mappings: "AAgBC,SAAQ,CAAEA"
                }
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
                tasks: ['dev']
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

    /**
     * Alias tasks
     */
    grunt.registerTask('default', ['clean', 'closurecompiler:minify', 'htmlmin', 'cssmin']);
    grunt.registerTask('dev', ['copy:main']);

};
