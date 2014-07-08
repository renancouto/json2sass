/*jslint node:true, nomen:true*/
'use strict';

// Dependencies
var fs   = require('fs');
var path = require('path');
var _    = require('lodash');

/**
 * read json file
 * @param  {string} file [json file]
 * @return {string}      [json content]
 */
function readFile(file) {
    try {
        file = require(path.relative(__dirname, file));
    } catch (err) {
        return err;
    }

    return file;
}

/**
 * get sass||scss content from json file
 * @param  {string} input [input file]
 * @param  {string} type  [file type: sass || scss]
 * @return {string}       [formated content]
 */
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

/**
 * write json content to file
 * @param {string} input  [input file]
 * @param {string} output [output file]
 * @param {string} type   [file type: sass || scss]
 */
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

/**
 * write json content to sass file
 * @param {string} input  [input file]
 * @param {string} output [output file]
 */
function toSass(input, output) {
    writeFile(input, output, 'sass');
}

/**
 * write json content to scss file
 * @param {string} input  [input file]
 * @param {string} output [output file]
 */
function toScss(input, output) {
    writeFile(input, output, 'scss');
}

// Public Methods
module.exports = {
    readFile   : readFile,
    getContent : getContent,
    writeFile  : writeFile,
    toSass     : toSass,
    toScss     : toScss
};