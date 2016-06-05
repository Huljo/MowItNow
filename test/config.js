'use strict';

var expect = require('expect.js');
var Config = require('../lib/config');

describe('Config', function() {
    describe('readFile', function() {
        it('should throw an error when configPath is not valid', function () {
            expect(function() {
                new Config('./config/unknown');
            }).to.throwError();
        });
    });
    describe('parseConfig', function() {
        var config = new Config('./config/tests');
        it('should set config.topRightPos', function () {
            expect(config.topRightPos).to.only.have.keys('x', 'y');
        });
        it('should set config.mowers', function () {
            expect(config.mowers).to.not.be.empty();
        });
    });
});