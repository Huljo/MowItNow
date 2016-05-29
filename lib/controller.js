/**
 Module dependencies
 */

var fs = require('fs');
var _ = require('lodash');


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
    options = options || {};
    this.options = options;

    this.init();
    console.log(this.config);

    // api
    return {
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
    if (this.options.config) {
        this.config = this.options.config;
    }
    else {
        this.config = readConfigFile(this.options.configFile);
    }
};

/**
 * Initialize Controller.
 *
 * @api protected
 */
Controller.prototype.run = function() {
    // here we run
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
 * Return formatted configuration
 *
 * @param {String} configStr
 * @return {Controller}
 * @api protected
 */
function parseConfig(configStr) {
    try {
        this.config = fs.readFileSync(configPath, "utf-8");
    }
    catch (err) {
        throw new Error('The following file couldn\'t be opened : '+ configPath);
    }
    return this;
}