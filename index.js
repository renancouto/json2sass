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
    var content = lib.getContent(input, type);

    if (argv.output) {
        lib.writeFile(argv.input, argv.output, type);
    } else {
        console.log('No output file passed, writing result to the shell:\n\n', content);
    }
}

module.exports = lib;