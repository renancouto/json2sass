/*jslint node:true*/
'use strict';

var lib    = require('./lib/json2sass');
var args   = lib.setArgs();
var input  = lib.readFile(args[0]);
var output = lib.writeSass(input);

if (args.length > 1) {
    lib.writeFile(args[1], output);
}

module.exports = lib;