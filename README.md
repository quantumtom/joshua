# joshua

## Intro

This project was ported from my GOES/NOAA realtime satellite weather image animating program. It includes Grunt tasks to compile the core JavaScript source using the Google Closure compiler. It also generates JSDoc3 documentation, as well as JavaScript sourcemap files to aid in debugging the compiled source code.

## Prerequisites

Copy of nodejs and npm installed and running. You'll need to be able to connect to an NPM registry where npm can download the dependencies listed in the package.json file.

## Quick Start

### Install dependencies from package.json

```
#! npm install
```

### Run default Grunt task

```
#! grunt
```

I've included a configuration file for Grunt that should assemble the source into a working web app in the build directory. Point your web server to this directory to run the files in "compiled" mode (you should be able to point it to the source directory as well, but ...).

