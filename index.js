/*jslint node:true*/
'use strict';

var lib    = require('./lib/json2sass');
var args   = lib.setArgs();
var input  = lib.readFile(args[0]);
var output = lib.writeSass(input);

lib.writeFile(args[1], output);