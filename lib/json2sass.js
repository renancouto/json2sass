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

function getContent(input, type) {
    type = type || 'sass';

    if (type !== 'sass' && type !== 'scss') {
        throw 'Unknow type "' + type + '" used. Aborting.';
    }

    var output = '',
        keys   = [],
        key    = '',
        ending = (type === 'scss') ? ';' : '';

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

function writeFile(input, output, type) {
    var json    = readFile(input),
        content = getContent(json, type);

    fs.writeFile(output, content, function (err) {
        if (err) {
            throw err;
        }

        console.log('The file "' + output + '" was written successfully!');
    });
}

module.exports.readFile   = readFile;
module.exports.getContent = getContent;
module.exports.writeFile  = writeFile;