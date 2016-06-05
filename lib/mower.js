'use strict';

var _ = require('lodash'),
    Promise = require('bluebird'),
    Move = require('./move'),
    Position = require('./position'),
    Grid = require('./grid');

// Expose `Mower`

module.exports = Mower;

/**
 * Set up Mower with `options`
 *
 * Parameters:
 *
 *   - `id` a valid number
 *   - `grid` a valid Grid object
 *   - `position` a valid Position object
 *   - `instructions` a valid Array that contains only the following instructions : 'A', 'G' and 'D'.
 *
 * @param {Number} id
 * @param {Object} grid
 * @param {Object} position
 * @param {Array} instructions
 * @api public
 */

function Mower(id, grid, position, instructions) {
    this.id = id;
    this.grid = grid;
    this.position = position;
    this.instructions = instructions;
    this.move = new Move(this, grid);

    this.isValid();
}

/**
 * Start mower's instructions
 *
 * @api public
 */

Mower.prototype.start = function() {
    var self = this;
    return new Promise(function(resolve) {
        self.runStep(0, resolve); // run first step
    });
};

/**
 * Types validator
 *
 * @api public
 */

Mower.prototype.isValid = function() {
    if(!_.isInteger(this.id)) {
        throw new Error('Id is not valid');
    }
    if(!isGrid(this.grid)) {
        throw new Error('Grid is not valid');
    }
    if(!isPosition(this.position)) {
        throw new Error('Position is not valid');
    }
    if(!isInstructions(this.instructions)) {
        throw new Error('Instructions are not valid');
    }
};

/**
 * Run one step then pass to next instruction or resolve promise when instructions are finished
 *
 * @param {Number} step
 * @param {Function} end
 * @api public
 */

Mower.prototype.runStep = function(step, end) {
    var self = this;
    this.move.runInstruction(this.instructions[step]).then(function() {
        var nexStep = step+1;
        if(nexStep >= 0 && nexStep <= self.instructions.length-1){
            self.runStep(nexStep, end);
        }
        else {
            end(self);
        }
    })
};

/**
 * Grid validator helper
 *
 * @param {Object} grid
 * @api protected
 */

function isGrid(grid) {
    return grid instanceof Grid;
}

/**
 * Position validator helper
 *
 * @param {Object} position
 * @api protected
 */

function isPosition(position) {
    return position instanceof Position;
}

/**
 * Instructions validator helper
 *
 * @param {Object} instructions
 * @api protected
 */

function isInstructions(instructions) {
    return _.isArray(instructions);
}