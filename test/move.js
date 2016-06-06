'use strict';

var expect = require('expect.js');

var Position = require('../lib/position');
var Grid = require('../lib/grid');
var Mower = require('../lib/mower');
var Move = require('../lib/move');

describe('Move', function() {
    describe('runInstruction', function() {
        var grid = new Grid(new Position({x:5,y:5}, 'N')),
            position = new Position({x:2,y:2}, 'E'),
            mower = new Mower(0, grid, position, ['D']),
            move = new Move(mower, grid);

        it('should run instruction ’A’ with cardinal ’E’ and change mower’s position to: x+1', function (done) {
            move.runInstruction('A').then(function(newPosition) {
                expect(newPosition.x).to.equal(position.x+1);
                done();
            });
        });
        it('should run instruction ’A’ with cardinal ’W’ and change mower’s position to: x-1', function (done) {
            var startPosition = new Position({x:2,y:2}, 'W');
            move.mower.position = startPosition;
            move.runInstruction('A').then(function(newPosition) {
                expect(newPosition.x).to.equal(startPosition.x-1);
                done();
            });
        });
        it('should run instruction ’A’ with cardinal ’N’ and change mower’s position to: y+1', function (done) {
            var startPosition = new Position({x:2,y:2}, 'N');
            move.mower.position = startPosition;
            move.runInstruction('A').then(function(newPosition) {
                expect(newPosition.y).to.equal(startPosition.y+1);
                done();
            });
        });
        it('should run instruction ’A’ with cardinal ’S’ and change mower’s position to: y-1', function (done) {
            var startPosition = new Position({x:2,y:2}, 'S');
            move.mower.position = startPosition;
            move.runInstruction('A').then(function(newPosition) {
                expect(newPosition.y).to.equal(startPosition.y-1);
                done();
            });
        });
        it('should run instruction ’G’ with cardinal ’N’ and change mower’s position to: c=’W’', function (done) {
            move.mower.position = new Position({x:2,y:2}, 'N');
            move.runInstruction('G').then(function(newPosition) {
                expect(newPosition.c).to.equal('W');
                done();
            });
        });
        it('should run instruction ’G’ with cardinal ’S’ and change mower’s position to: c=’E’', function (done) {
            move.mower.position = new Position({x:2,y:2}, 'S');
            move.runInstruction('G').then(function(newPosition) {
                expect(newPosition.c).to.equal('E');
                done();
            });
        });
        it('should run instruction ’D’ with cardinal ’N’ and change mower’s position to: c=’E’', function (done) {
            move.mower.position = new Position({x:2,y:2}, 'N');
            move.runInstruction('D').then(function(newPosition) {
                expect(newPosition.c).to.equal('E');
                done();
            });
        });
        it('should run instruction ’D’ with cardinal ’S’ and change mower’s position to: c=’W’', function (done) {
            move.mower.position = new Position({x:2,y:2}, 'S');
            move.runInstruction('D').then(function(newPosition) {
                expect(newPosition.c).to.equal('W');
                done();
            });
        });
        it('should throw an error when instruction is not valid', function (done) {
            move.mower.position = new Position({x:2,y:2}, 'S');
            move.runInstruction('U').catch(function(err) {
                expect(err).to.be.a(Error);
                done();
            });
        });
    });
    describe('updatePosition', function() {
        var grid = new Grid(new Position({x:7,y:7}, 'N')),
            position = new Position({x:2,y:2}, 'W'),
            mower = new Mower(0, grid, position, ['G']),
            move = new Move(mower, grid);

        it('should update a position to x+1', function () {
            var newPosition = new Position({x:position.x+1,y:position.y}, 'W');
            move.updatePosition(newPosition);
            expect(move.mower.position.x).to.equal(position.x+1);
        });
        it('should update a position to x-1', function () {
            var newPosition = new Position({x:position.x-1,y:position.y}, 'W');
            move.updatePosition(newPosition);
            expect(move.mower.position.x).to.equal(position.x-1);
        });
        it('should update a position to y+1', function () {
            var newPosition = new Position({x:position.x,y:position.y+1}, 'W');
            move.updatePosition(newPosition);
            expect(move.mower.position.y).to.equal(position.y+1);
        });
        it('should update a position to y-1', function () {
            var newPosition = new Position({x:position.x,y:position.y-1}, 'W');
            move.updatePosition(newPosition);
            expect(move.mower.position.y).to.equal(position.y-1);
        });
    });
    describe('isNextPositionAllowed', function() {
        var grid = new Grid(new Position({x:7,y:7}, 'N')),
            position = new Position({x:2,y:2}, 'E'),
            mower = new Mower(0, grid, position, ['G']),
            move = new Move(mower, grid);

        it('should return false for testing position x:20 and y:-20', function () {
            var newPosition = new Position({x:20,y:-20}, 'E');
            expect(move.isNextPositionAllowed(newPosition)).to.equal(false);
        });
        it('should return false for testing position x:-20 and y:20', function () {
            var newPosition = new Position({x:-20,y:20}, 'E');
            expect(move.isNextPositionAllowed(newPosition)).to.equal(false);
        });
        it('should return false for testing position x:5 and y:-20', function () {
            var newPosition = new Position({x:5,y:-20}, 'E');
            expect(move.isNextPositionAllowed(newPosition)).to.equal(false);
        });
        it('should return false for testing position x:-20 and y:5', function () {
            var newPosition = new Position({x:-20,y:5}, 'E');
            expect(move.isNextPositionAllowed(newPosition)).to.equal(false);
        });
    });
    describe('goForward', function() {
        var grid = new Grid(new Position({x:6,y:6}, 'N')),
            position = new Position({x:2,y:2}, 'E'),
            mower = new Mower(0, grid, position, ['A']),
            move = new Move(mower, grid);

        it('should move mower to 1 cell forward with cardinal ’E’ and change mower’s position to: x+1', function () {
            move.goForward();
            expect(move.mower.position.x).to.equal(position.x+1);
        });
        it('should move mower to 1 cell forward with cardinal ’W’ and change mower’s position to: x-1', function () {
            move.mower.position = new Position({x:2,y:2}, 'W');
            move.goForward();
            expect(move.mower.position.x).to.equal(position.x-1);
        });
        it('should move mower to 1 cell forward with cardinal ’N’ and change mower’s position to: y+1', function () {
            move.mower.position = new Position({x:2,y:2}, 'N');
            move.goForward();
            expect(move.mower.position.y).to.equal(position.y+1);
        });
        it('should move mower to 1 cell forward with cardinal ’S’ and change mower’s position to: y-1', function () {
            move.mower.position = new Position({x:2,y:2}, 'S');
            move.goForward();
            expect(move.mower.position.y).to.equal(position.y-1);
        });
    });
    describe('turn', function() {
        var grid = new Grid(new Position({x:10,y:10}, 'N')),
            position = new Position({x:2,y:2}, 'E'),
            mower = new Mower(0, grid, position, ['G']),
            move = new Move(mower, grid);

        it('should move mower to the left with cardinal ’E’ and change mower’s position to: c=’N’', function () {
            move.turn('G');
            expect(move.mower.position.c).to.equal('N');
        });
        it('should move mower to the left with cardinal ’N’ and change mower’s position to: c=’W’', function () {
            move.mower.position = new Position({x:2,y:2}, 'N');
            move.turn('G');
            expect(move.mower.position.c).to.equal('W');
        });
        it('should move mower to the right with cardinal ’E’ and change mower’s position to: c=’S’', function () {
            move.mower.position = new Position({x:2,y:2}, 'E');
            move.turn('D');
            expect(move.mower.position.c).to.equal('S');
        });
        it('should move mower to the right with cardinal ’W’ and change mower’s position to: c=’N’', function () {
            move.mower.position = new Position({x:2,y:2}, 'W');
            move.turn('D');
            expect(move.mower.position.c).to.equal('N');
        });
        it('should throw an error when instruction is not valid', function () {
            move.mower.position.c = 'N';
            expect(function() {
                move.turn('U');
            }).to.throwError();
        });
    });
});