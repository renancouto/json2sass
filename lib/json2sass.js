/*jslint node:true*/
'use strict';

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
    var prop, output = '';

    for (prop in input) {
        if (input.hasOwnProperty(prop)) {
            output += '$' + prop + ': ' + input[prop] + '\n';
        }
    }

    return output;
}

module.exports.args      = args;
module.exports.readFile  = readFile;
module.exports.getOutput = getOutput;
module.exports.writeSass = writeSass;