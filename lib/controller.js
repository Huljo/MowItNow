/**
 Module dependencies
 */

var fs = require('fs');
var P = require("bluebird");
var _ = require('lodash');
var util = require('util');

/**
 * Expose `Controller`.
 */

exports = module.exports = Controller;

/**
 * Expose internals.
 */

// exports.Runnable = require('./runnable');

/**
 * Set up Controller with `options`
 * which is responsible for multiple-unit mower's remote control
 *
 * Options:
 *
 *   - `configFile` config file path
 *
 * @param {Object} options
 * @api public
 */

function Controller(options) {
    this.options = options || {};

    this.init();
    // console.log(this.config);
    // console.log(this.config.mowers[0]);

    // api
    return {
        config:this.config,
        run:this.run
    };
}

/**
 * Initialize Controller.
 *
 * @api protected
 */
Controller.prototype.init = function() {
    // Set controller's configuration
    var configStr;
    if (this.options.config) {
        configStr = this.options.config;
    }
    else {
        configStr = readConfigFile(this.options.configFile);
    }
    this.config = parseConfig(configStr);
};

/**
 * Initialize Controller.
 *
 * @api protected
 */
Controller.prototype.run = function() {
    // return resolveRecursive(this.config);
    
};

/**
 * Read config file and return output
 *
 * @param {String} configPath
 * @return {String}
 * @api protected
 */
function readConfigFile(configPath) {
    try {
        return fs.readFileSync(configPath, "utf-8");
    }
    catch (err) {
        throw new Error('The following file couldn\'t be opened : '+ configPath);
    }
}

/**
 * Return controller's configuration as a formatted object
 *
 * @param {String} configStr
 * @return {Object}
 * @api protected
 */
function parseConfig(configStr) {
    var config = {};
    var lines = configStr.split('\r\n'); // split lines
    var lastCellLine = lines[0].split(' '); // first line
    var mowers_lines = lines.splice(1, lines.length-1); // delete first line
    config.lastCellsPos = {x:parseInt(lastCellLine[0]), y:parseInt(lastCellLine[1])}; // first line
    config.mowers = [];
    _.forEach(mowers_lines, function(line, i) {
        if(i%2){
            var pos = mowers_lines[i-1].split(' ');
            config.mowers.push({
                pos:{x:parseInt(pos[0]), y:parseInt(pos[1]), c:pos[2]},
                instructions:line.split('')
            })
        }
    });
    return config;
}
