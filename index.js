/*jslint node:true*/
'use strict';

var lib    = require('./lib/json2sass');
var input  = lib.readFile(process.argv[2]);
var output = lib.writeSass(input);

if (process.argv.length > 3) {
    lib.writeFile(process.argv[3], output);
}

module.exports = lib;