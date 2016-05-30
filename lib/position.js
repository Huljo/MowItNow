"use strict";

/**
 Module dependencies
 */

var _ = require('lodash');



function Position(coordinate, cardinal) {
    
    this.x = coordinate.x;
    this.y = coordinate.y;
    this.c = cardinal;

    this.init();
}


Position.prototype.init = function()
{
    if(!_.isInteger(this.x) || !_.isInteger(this.y))
    {
        throw new Error('Coordinates are not valid.');
    }
    if(_.find(['N','E','S','W'], function(c) { return c === this.c }) === -1)
    {
        throw new Error('Cardinal point is not valid.');
    }
};