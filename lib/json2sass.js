/*jslint node:true, nomen:true*/
'use strict';

var _ = require('lodash');

function args() {
    process.argv.shift();
    process.argv.shift();

    return process.argv;
}

function readFile(file) {
    try {
        file = require(file);
    } catch (err) {
        return err;
    }

    return file;
}

function getOutput(output) {
    if (output) {
        return output;
    }

    throw 'No output passed! Aborting.';
}

function writeSass(input) {
    var output = '';

    (function (value) {
        var prop;

        for (prop in value) {
            if (value.hasOwnProperty(prop)) {
                output += '$' + prop + ': ' + value[prop] + '\n';
            }
        }
    }(input));

    return output;
}

module.exports.args      = args;
module.exports.readFile  = readFile;
module.exports.getOutput = getOutput;
module.exports.writeSass = writeSass;