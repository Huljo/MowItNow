"use strict";

var _ = require('lodash');
var Promise = require("bluebird");

// Expose `Move`

module.exports = Move;

var cardinalPoints = ['N','E','S','W'];

/**
 * Set up Move with `mower` and `grid`
 * which is responsible for moving mowers
 *
 * @param {Object} mower
 * @param {String} grid
 * @api public
 */

function Move(mower, grid){
    this.mower = mower;
    this.grid = grid;
}

/**
 * Call the movement method from an instruction
 *
 * @param {String} instruction
 * @api public
 */

Move.prototype.runInstruction = function(instruction) {
    var self = this;
    return new Promise(function(resolve, reject) {
        switch(instruction) {
            case 'A':
                self.goForward();
                break;
            case 'G':
            case 'D':
                self.turn(instruction);
                break;
            default:
                reject( new Error('Invalid instruction: '+instruction) );
        }
        resolve(self.mower.position);
    });
};

/**
 * Update mower's position if not occupied
 *
 * @param {Object} newPosition
 * @api public
 */

Move.prototype.updatePosition = function(newPosition) {
    var nextCellOccupation = this.grid.getCellOccupation(newPosition);
    if(nextCellOccupation === null || nextCellOccupation === this.mower.id) {
        this.mower.position = newPosition;
        this.grid.setItemPosition(this.mower.id, newPosition); // save new position in grid object
    }
};

/**
 * Move a mower forward.
 * The direction is the actual cardinal.
 *
 * @api public
 */

Move.prototype.goForward = function() {
    var mower = this.mower,
        grid = this.grid,
        newPosition = _.clone(mower.position);
    switch(mower.position.c) {
        case 'N':
            newPosition.y = mower.position.y+1 > grid.heigth ? mower.position.y : mower.position.y+1;
            break;
        case 'E':
            newPosition.x = mower.position.x+1 > grid.width ? mower.position.x : mower.position.x+1;
            break;
        case 'S':
            newPosition.y = mower.position.y-1 < 0 ? mower.position.y : mower.position.y-1;
            break;
        case 'W':
            newPosition.x = mower.position.x-1 < 0 ? mower.position.x : mower.position.x-1;
            break;
        default:
            throw new Error('Invalid cardinal: '+mower.position.c);
    }
    this.updatePosition(newPosition);
};


/**
 * Move a mower to the left or the right.
 *
 * @param {String} instruction
 * @api public
 */
Move.prototype.turn = function(instruction) {
    var mower = this.mower,
        newPosition = _.clone(mower.position),
        cardinalIndex = _.findIndex(cardinalPoints, function(c) { return c === mower.position.c }),
        newCardinalIndex = cardinalIndex;
    switch(instruction) {
        case 'D':
            newCardinalIndex = cardinalIndex+1 > cardinalPoints.length-1 ? 0 : cardinalIndex+1;
            break;
        case 'G':
            newCardinalIndex = cardinalIndex-1 < 0 ? cardinalPoints.length-1 : cardinalIndex-1;
            break;
        default:
            throw new Error('Invalid cardinal: '+mower.position.c);
    }
    newPosition.c = cardinalPoints[newCardinalIndex];
    this.updatePosition(newPosition);
};
