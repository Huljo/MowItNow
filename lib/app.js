'use strict';

var Config = require('./config');
var Position = require('./position');
var Grid = require('./grid');
var Mower = require('./mower');

// Expose `App`.

module.exports = App;


/**
 * Set up App with `options`
 * which is responsible for multiple-unit mower's remote control
 *
 * Options:
 *
 *   - `configFile` config file path
 *
 * @param {Object} options
 * @api public
 */

function App(options) {
    this.options = options || {};

    this.config = new Config(this.options.configFile);
    this.grid = new Grid(this.config.topRightPos);
    this.mowers = this.createMowers(this.config.mowers);
}

/**
 * Start mower's movement.
 *
 * @api protected
 */

App.prototype.run = function() {
    this.mowers.forEach(function(mower) {
        mower.start().then(function(mower)
        {
            console.log('Mower '+mower.id+' stopped at position: ', mower.position);
        })
    });
};

/**
 * Create mowers
 *
 * @param {Array} mowersConf
 * @api protected
 */

App.prototype.createMowers = function(mowersConf) {
    var mowers = [];
    for(var i=0; i<mowersConf.length; i++)
    {
        var position = new Position(mowersConf[i].pos, mowersConf[i].cardinal);
        mowers.push(new Mower(i, this.grid, position, mowersConf[i].instructions));
    }
    return mowers;
};
