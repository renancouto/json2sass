/*jslint node:true, nomen:true*/
'use strict';

var fs = require('fs');
var _  = require('lodash');

function setArgs() {
    var args = process.argv;
    args.shift();
    args.shift();

    return args;
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
    var output = '',
        key = '';

    function getValue(value) {
        var prop;

        for (prop in value) {
            if (value.hasOwnProperty(prop)) {
                if (_.isPlainObject(value[prop])) {
                    key += prop + '-';
                    getValue(value[prop]);
                } else {
                    if (prop === '//') {
                        output += prop + ' ' + value[prop] + '\n';
                    } else if (prop === '/*') {
                        output += prop + '*\n * ' + value[prop] + '\n */\n\n';
                    } else {
                        output += '$' + key + prop + ': ' + value[prop] + '\n';
                    }
                }
            }
        }
    }

    getValue(input);

    return output;
}

function writeFile(location, content) {
    fs.writeFile(location, content, function (err) {
        if (err) {
            throw err;
        }

        console.log('The file "' + location + '" was written successfully!');
    });
}

function toSass(input, output) {
    var json = readFile(input),
        sass = writeSass(json);

    writeFile(output, sass);
}

module.exports.setArgs   = setArgs;
module.exports.readFile  = readFile;
module.exports.getOutput = getOutput;
module.exports.writeSass = writeSass;
module.exports.writeFile = writeFile;
module.exports.toSass    = toSass;