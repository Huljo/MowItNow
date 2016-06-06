'use strict';

var os = require('os'),
    EOL = os.EOL,
    Config = require('./config'),
    Position = require('./position'),
    Grid = require('./grid'),
    Mower = require('./mower');

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
    this.logEnabled = this.options.debug || false;
    this.grid = new Grid(this.config.topRightPos);
    this.mowers = this.createMowers(this.config.mowers);
}

/**
 * Start mower's movement.
 *
 * @api protected
 */

App.prototype.run = function() {
    var self = this;
    this.mowers.forEach(function(mower) {
        mower.start().then(function(mower) {
            self.log('Mower '+mower.id+' stopped at position: x:' +
                mower.position.x+' y:'+mower.position.y+' cardinal: '+mower.position.c+EOL)
        });
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
    for(var i=0; i<mowersConf.length; i++) {
        var position = new Position(mowersConf[i].pos, mowersConf[i].cardinal);
        mowers.push(new Mower(i, this.grid, position, mowersConf[i].instructions));
    }
    return mowers;
};

/**
 * Stdout filtered by log option
 *
 * @param {String} message
 * @api protected
 */

App.prototype.log = function(message) {
    if(this.logEnabled) {
        process.stdout.write(message);
    }
};
