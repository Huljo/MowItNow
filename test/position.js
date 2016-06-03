'use strict';

var expect = require('expect.js');

var Position = require('../lib/position');

describe('Position', function() {
    it('should throw an error when X is not valid', function () {
        expect(function() {
            new Position({x:false,y:1}, 'N');
        }).to.throwException(/Coordinates are not valid/);
    });
    it('should throw an error when Y is not valid', function () {
        expect(function() {
            new Position({x:1,y:false}, 'N');
        }).to.throwException(/Coordinates are not valid/);
    });
    it('should throw an error when C is not valid', function () {
        expect(function() {
            new Position({x:1,y:1}, false);
        }).to.throwException(/Cardinal point is not valid/);
    });
});