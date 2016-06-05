#! /usr/bin/env node 

'use strict';

var App = require('../lib/app');

if(process.argv.indexOf('run') !== -1) {
    var args = process.argv.slice(process.argv.indexOf('run')+1);
    var defaultConfig = __dirname+'/../config/default';
    var app = new App({
        configFile : args[0] || defaultConfig
    });
    app.run();
}
if(process.argv.indexOf('help') !== -1) {
    console.log("Usage: > mowitnow run [configPath]");
}