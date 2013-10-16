/*jslint node:true, nomen:true*/
'use strict';

var fs = require('fs');
var _  = require('lodash');

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

function writeSass(input, ending) {
    var output = '',
        keys = [],
        key;

    ending = ending || '';

    function getValue(value) {
        var prop;

        for (prop in value) {
            if (value.hasOwnProperty(prop)) {
                if (_.isPlainObject(value[prop])) {
                    // loop again if the value is an object
                    keys.push(prop);
                    getValue(value[prop]);
                    keys.pop();

                } else {
                    // special comment
                    if (prop === '/*') {
                        output += prop + '*\n * ' + value[prop] + '\n */\n\n';

                    // simple comment
                    } else if (prop === '//') {
                        output += '\n' + prop + ' ' + value[prop] + '\n';

                    // regular key:value combination
                    } else {
                        key = keys.length ? keys.toString().replace(/,/g, '-') + '-' : '';
                        output += '$' + key + prop + ': ' + value[prop] + ending + '\n';
                    }
                }
            }
        }
    }

    getValue(input);

    return output;
}

function writeScss(value) {
    return writeSass(value, ';');
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

function toScss(input, output) {
    var json = readFile(input),
        scss = writeScss(json);

    writeFile(output, scss);
}

module.exports.readFile  = readFile;
module.exports.getOutput = getOutput;
module.exports.writeSass = writeSass;
module.exports.writeScss = writeScss;
module.exports.writeFile = writeFile;
module.exports.toSass    = toSass;
module.exports.toScss    = toScss;