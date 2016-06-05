"use strict";

var Position = require('./position');

// Expose `Grid`

module.exports = Grid;

/**
 * Set up Grid with `topRightPos`
 *
 * Parameters:
 *
 *   - `topRightPos` coordinates of the cell at the top right of the grid. ({x:1,y:1})
 *
 * @param {Object} topRightPos
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
 * @param {Number} id
 * @param {Object} position
 * @api public
 */

Grid.prototype.setItemPosition = function(id, position) {
    this.occupation[id] = position;
};


/**
 * Get cell occupation as a boolean
 *
 * @param {Object} position
 * @api public
 */

Grid.prototype.getCellOccupation = function(position) {
    if(isPosition(position)){
        for(var id in this.occupation){
            if(this.occupation[id].x === position.x && this.occupation[id].y === position.y){
                return parseInt(id);
            }
        }
        return null;
    }
    else {
        throw new Error('Position is not valid.');
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
    return (x === parseInt(x, 10) && x > -1) && (y === parseInt(y, 10) && y > -1);
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