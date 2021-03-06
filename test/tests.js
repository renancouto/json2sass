/*jslint node:true*/
/*global describe,it,before*/
'use strict';

var fs        = require('fs');
var assert    = require('chai').assert;
var expect    = require('chai').expect;
var json2sass = require('../lib/json2sass');

describe('Shallow tests:', function () {
    var args, input, sass, expected;

    args   = ['./test/fixtures/shallow.json', 'output.sass'];
    input  = json2sass.readFile(args[0]);
    sass   = json2sass.getContent(input, 'sass');

    // read sass file
    before(function (done) {
        fs.readFile('./test/expected/shallow.sass', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
            }

            expected = data;
            done();
        });
    });

    it('third argument should be a object', function () {
        assert.deepEqual(input, {
            'button-color': 'green',
            'button-padding': '10px'
        });
    });

    it('sass output should be', function () {
        assert.equal(sass, expected);
    });
});

describe('Deep tests:', function () {
    var input, sass, expected;

    input = json2sass.readFile('./test/fixtures/deep.json');
    sass  = json2sass.getContent(input, 'sass');

    // read sass file
    before(function (done) {
        fs.readFile('./test/expected/deep.sass', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
            }

            expected = data;
            done();
        });
    });

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
                },
                margin: '5px'
            },
            field: {
                '//': 'Another comment',
                color: '#fff'
            },
            table: {
                '//': 'Table settings',
                padding: {
                    th: '10px',
                    td: '5px 10px'
                }
            },
            some: {
                '//': 'Some very deep object',
                very: {
                    deep: {
                        object: {
                            key: 'value'
                        }
                    }
                }
            }
        });
    });

    it('sass output should be', function () {
        assert.equal(sass, expected);
    });
});

describe('SCSS tests:', function () {
    var input, scss, expected;

    input = json2sass.readFile('./test/fixtures/shallow.json');
    scss  = json2sass.getContent(input, 'scss');

    // read scss file
    before(function (done) {
        fs.readFile('./test/expected/shallow.scss', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
            }

            expected = data;
            done();
        });
    });

    it('scss output should be', function () {
        assert.equal(scss, expected);
    });
});