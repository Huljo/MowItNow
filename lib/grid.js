/**
 Module dependencies
 */

var _ = require('lodash');

/**
 * Expose `Grid`.
 */

module.exports = Grid;

/**
 * Set up Grid with `options`
 *
 * Options:
 *
 *   - `topRightPos` config file path
 *
 * @param {Object} options
 * @api public
 */

function Grid(topRightPos) {
    this.width = topRightPos.x;
    this.heigth = topRightPos.y;
    this.occupation = {};

    this.isValid();
}


/**
 * Types validator
 *
 * @api public
 */

Grid.prototype.isValid = function() {
    if(!isCoordinates(this.width,this.heigth)) {
        throw new Error('Coordinates are not valid.');
    }
};

/**
 * Save item's position inside the grid
 *
 * @api public
 */

Grid.prototype.updatePosition = function(id, position) {
    this.occupation[id] = position;
};


/**
 * Get cell occupation
 *
 * @param {Object} coordinates
 * @api public
 */

Grid.prototype.isPositionOccupied = function(position) {
    // TODO: Create method
    return false;
};

/**
 * Coordinates validator helper
 *
 * @api protected
 */

function isCoordinates(x,y)
{
    return (x === parseInt(x, 10) && x > -1) && (y === parseInt(y, 10) && y > -1);
}