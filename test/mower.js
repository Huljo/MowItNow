'use strict';

var expect = require('expect.js');

var Position = require('../lib/position');
var Grid = require('../lib/grid');
var Mower = require('../lib/mower');

describe('Mower', function() {
    describe('start', function () {
        var grid = new Grid(new Position({x:5,y:5}, 'N'));
        it('should stop at positon 1 3 N', function (done) {
            var position = new Position({x:1,y:2}, 'N'),
                mower = new Mower(0, grid, position, ['G','A','G','A','G','A','G','A','A']);
            mower.start().then(function(mowerUpdated) {
                expect(mowerUpdated.position).to.eql({ x:1, y:3, c:'N' });
                done();
            });
        });
        it('should stop at positon 4 1 E', function (done) {
            var position = new Position({x:3,y:3}, 'E'),
                mower = new Mower(0, grid, position, ['A','D','A','A','D','A','D','D','A']);
            mower.start().then(function(mowerUpdated) {
                expect(mowerUpdated.position).to.eql({ x:4, y:1, c:'E' });
                done();
            });
        });
        it('should stop at positon 5 4 N', function (done) {
            var position = new Position({x:5,y:2}, 'S'),
                mower = new Mower(0, grid, position, ['A','G','A','G','A','A','D','A','G','A']);
            mower.start().then(function(mowerUpdated) {
                expect(mowerUpdated.position).to.eql({ x:5, y:4, c:'N' });
                done();
            });
        });

    });
    describe('runStep', function () {
        var grid = new Grid(new Position({x:10,y:10}, 'N'));
        it('should stop at positon 3 2 E', function (done) {
            var position = new Position({x:2,y:2}, 'E');
            var mower = new Mower(0, grid, position, ['A']);
            mower.runStep(0,function(mowerUpdated) {
                expect(mowerUpdated.position).to.eql({ x:3, y:2, c:'E' });
                done();
            });
        });
        it('should stop at positon 1 2 W', function (done) {
            var position = new Position({x:2,y:2}, 'W'),
                mower = new Mower(0, grid, position, ['A']);
            mower.runStep(0,function(mowerUpdated) {
                expect(mowerUpdated.position).to.eql({ x:1, y:2, c:'W' });
                done();
            });
        });
        it('should stop at positon 2 3 N', function (done) {
            var position = new Position({x:2,y:2}, 'N'),
                mower = new Mower(0, grid, position, ['A']);
            mower.runStep(0,function(mowerUpdated) {
                expect(mowerUpdated.position).to.eql({ x:2, y:3, c:'N' });
                done();
            });
        });
        it('should stop at positon 2 1 S', function (done) {
            var position = new Position({x:2,y:2}, 'S'),
                mower = new Mower(0, grid, position, ['A']);
            mower.runStep(0,function(mowerUpdated) {
                expect(mowerUpdated.position).to.eql({ x:2, y:1, c:'S' });
                done();
            });
        });

    });
    describe('isValid', function () {
        var grid = new Grid(new Position({x:8,y:8}, 'N')),
            position = new Position({x:3,y:3}, 'E');
        it('should throw an error when ID is not valid', function () {
            expect(function() {
                new Mower(false, grid, position, ['A']);
            }).to.throwException(/Id is not valid/);
        });
        it('should throw an error when GRID is not valid', function () {
            expect(function() {
                new Mower(0, false, position, ['A']);
            }).to.throwException(/Grid is not valid/);
        });
        it('should throw an error when POSITION is not valid', function () {
            expect(function() {
                new Mower(0, grid, false, ['A']);
            }).to.throwException(/Position is not valid/);
        });
        it('should throw an error when INSTRUCTIONS are not valid', function () {
            expect(function() {
                new Mower(0, grid, position, false);
            }).to.throwException(/Instructions are not valid/);
        });
    });
});