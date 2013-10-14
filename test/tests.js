/*jslint node:true*/
/*global describe,it*/
'use strict';

var assert    = require('chai').assert;
var expect    = require('chai').expect;
var json2sass = require('../lib/json2sass');

describe('Shallow tests:', function () {
    var args, input, output, sass;

    args   = ['../test/shallow.json', 'output.sass'];
    input  = json2sass.readFile(args[0]);
    output = json2sass.getOutput(args[1]);
    sass   = json2sass.writeSass(input);

    it('third argument should be a object', function () {
        assert.deepEqual(input, {
            'button-color': 'green',
            'button-padding': '10px'
        });
    });

    it('fourth argument should exists', function () {
        return expect(output).to.exist;
    });

    it('sass output should be', function () {
        assert.equal(sass, '$button-color: green\n$button-padding: 10px\n');
    });
});

describe('Deep tests:', function () {
    var input, sass;

    input  = json2sass.readFile('../test/deep.json');
    sass   = json2sass.writeSass(input);

    it('third argument should be a deep object', function () {
        assert.deepEqual(input, {
            '/*': 'This is a special comment',
            button: {
                '//': 'This is a simple comment',
                color: 'green',
                padding: '10px',
                font: {
                    family: "'Helvetica Arial sans-serif'",
                    color: 'white'
                }
            }
        });
    });

    it('sass output should be', function () {
        assert.equal(sass, "/**\n * This is a special comment\n */\n\n// This is a simple comment\n$button-color: green\n$button-padding: 10px\n$button-font-family: 'Helvetica Arial sans-serif'\n$button-font-color: white\n");
    });
});