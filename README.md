# joshua

[![Build Status](https://travis-ci.org/quantumtom/joshua.svg?branch=master)](https://travis-ci.org/quantumtom/joshua)

## Introduction

This project was ported from my GOES/NOAA realtime satellite weather image animating program. It includes Grunt tasks to compile the core JavaScript source using the Google Closure compiler. It also generates JSDoc3 documentation, as well as JavaScript sourcemap files to aid in debugging the compiled source code.

## Prerequisites

### NodeJS (w/ NPM)
Copy of NodeJS (w/ NPM) installed and running.

### Internet Access
You'll need to be able to connect to an NPM registry where npm can download the dependencies listed in the package.json file.

### Google Closure Library
Clone the Google Closure Library from its repo on Github.

```
#! cd src/js
#! git clone https://github.com/google/closure-library/
```

### Closure Compiler JAR
Download Google's [Closure Compiler](https://dl.google.com/closure-compiler/compiler-latest.zip) JAR (Java Application Runtime) and extract it to your development workspace. You can keep it anywhere you like, but I've found it's best to keep it close to the source and build target directories. Google recommends keeping it in the closure-library directory, but this project assumes you are going to keep it in the root directory.

## Quick Start

### Install dependencies from package.json

```
#! npm install
```

### Run default Grunt task

```
#! grunt
```

I've included a configuration file for Grunt that should assemble the source into a working web app in its own directory. Point your web server to this directory to run the files in "compiled" mode (you should be able to point it to the source directory as well, but no guarantees).
