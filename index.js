/*jslint node:true*/
'use strict';

// Dependencies
var lib  = require('./lib/json2sass');
var argv = require('optimist').argv;

if (argv.input) {
    // Options
    var input = lib.readFile(argv.input);
    var type  = argv.type || 'sass';

    // Methods
    var result = (type === 'sass') ? lib.writeSass(input) : lib.writeScss(input);

    if (argv.output) {
        lib.writeFile(argv.output, result);
    } else {
        console.log('No output file passed, writing result to the shell:\n\n', result);
    }
}

module.exports = lib;