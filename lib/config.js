"use strict";

var fs = require('fs');

// Expose `Config`

module.exports = Config;

/**
 * Set up Config with `configPath`
 * which is responsible for loading and parsing config file.
 *
 * @param {Object} configPath
 * @return {Object}
 * @api public
 */

function Config(configPath) {
    this.configPath = configPath; // Save config file path
    this.raw = readFile(this.configPath); // Save config string
    this.parsed = parseConfig(this.raw); // Config as an object

    return this.parsed; // return as an object
}


/**
 * Read config file and return output
 *
 * @param {String} configPath
 * @return {String}
 * @api protected
 */

function readFile(configPath) {
    try {
        return fs.readFileSync(configPath, "utf-8");
    }
    catch (err) {
        throw err;
    }
}

/**
 * Return configuration file's content as a formatted object
 *
 * @param {String} configStr
 * @return {Object}
 * @api protected
 */

function parseConfig(configStr) {
    var config = {};
    var lines = configStr.split(/\r?\n/); // Split lines
    var lastCellLine = lines[0].split(' '); // Save first line
    var mowersLines = lines.splice(1, lines.length-1); // Array of mowers
    config.topRightPos = {x:parseInt(lastCellLine[0]), y:parseInt(lastCellLine[1])}; // Define first line in config object
    config.mowers = [];
    for(var i=0; i<mowersLines.length; i++) {
        if(i%2){
            var position = mowersLines[i-1].split(' ');
            config.mowers.push({
                pos:{x:parseInt(position[0]), y:parseInt(position[1])},
                cardinal:position[2],
                instructions:mowersLines[i].split('')
            });
        }
    }
    return config;
}
