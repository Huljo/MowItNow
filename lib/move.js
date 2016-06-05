"use strict";

var _ = require('lodash'),
    Promise = require("bluebird");

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
    this.mower.position = newPosition;
    this.grid.setItemPosition(this.mower.id, newPosition); // save new position in grid object
};

/**
 * Return false if the given position is occupied or not allowed
 *
 * @param {Object} position
 * @return {Boolean}
 * @api public
 */

Move.prototype.isNextPositionAllowed = function(position) {
    var nextCellOccupation = this.grid.getCellOccupation(position);
    return (nextCellOccupation === null || nextCellOccupation === this.mower.id) &&
        (position.x >= 0 && position.x <= this.grid.width && position.y >= 0 && position.y <= this.grid.heigth);
};


/**
 * Move a mower forward.
 * The direction is the actual cardinal.
 *
 * @api public
 */

Move.prototype.goForward = function() {
    var actualPosition = _.clone(this.mower.position),
        nextPosition = getNextPosition(actualPosition);
    if(this.isNextPositionAllowed(nextPosition)) {
        this.updatePosition(nextPosition);
    }
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
        cardinalIndex = _.findIndex(cardinalPoints, function(c) { return c === mower.position.c; }),
        newCardinalIndex = cardinalIndex;
    switch(instruction) {
        case 'D':
            newCardinalIndex = cardinalIndex+1 > cardinalPoints.length-1 ? 0 : cardinalIndex+1;
            break;
        case 'G':
            newCardinalIndex = cardinalIndex-1 < 0 ? cardinalPoints.length-1 : cardinalIndex-1;
            break;
        default:
            throw new Error('Invalid instruction: '+mower.position.c);
    }
    newPosition.c = cardinalPoints[newCardinalIndex];
    this.updatePosition(newPosition);
};


/**
 * Move a mower forward.
 * The direction is the actual cardinal.
 *
 * @api protected
 */

function getNextPosition(position) {
    var valueToAdd = position.c==='N'||position.c==='E' ? 1 : -1;
    var propToChange = position.c==='W'||position.c==='E'?'x':'y';
    position[propToChange] = position[propToChange]+valueToAdd;
    return position;
}