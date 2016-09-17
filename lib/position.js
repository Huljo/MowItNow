"use strict";

var _ = require('lodash');

// Expose `Position`

module.exports = Position;

var cardinalPoints = ['N','E','S','W'];

/**
 * Set up Position with `coordinate` and `cardinal`

 * @param {Object} coordinate
 * @param {String} cardinal
 * @api public
 */

function Position(coordinate, cardinal) {
    this.x = coordinate.x;
    this.y = coordinate.y;
    this.c = cardinal;

    this.isValid();
}

/**
 * Types validator
 *
 * @api public
 */

Position.prototype.isValid = function() {
    if(!isCoordinates(this.x,this.y)) {
        throw new Error('Coordinates are not valid');
    }
    if(!isCardinal(this.c)) {
        throw new Error('Cardinal point is not valid');
    }
};

/**
 * Coordinates validator helper
 *
 * @param {Number} x
 * @param {Number} y
 * @api protected
 */

function isCoordinates(x,y) {
    return x === parseInt(x, 10) && y === parseInt(y, 10);
}

/**
 * Cardinal validator helper
 *
 * @param {String} cardinal
 * @api protected
 */

function isCardinal(cardinal) {
    return _.isString(cardinal) && !_.isUndefined( _.find(cardinalPoints, function(c) { return c === cardinal; }) );
}
