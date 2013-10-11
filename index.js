/*jslint node:true*/
'use strict';

var lib = require('./lib/json2sass');
var input = lib.args()[0];

console.log(lib.writeSass(lib.readFile(input)));

module.exports = lib;