#! /usr/bin/env node 

'use strict';

var path = require('path'),
    App = require('../lib/app');

if(process.argv.indexOf('run') !== -1) {
    var args = process.argv.slice(process.argv.indexOf('run')+1);
    var defaultConfig = path.normalize('config/default');
    var app = new App({
        configFile : args[0] || defaultConfig,
        logEnabled: true
    });
    app.run();
}
else if(process.argv.indexOf('help') !== -1) {
    console.log("Usage:\n> mowitnow run [configPath]");
}
else {
    console.log("Unknown command.\nType ’mowitnow help’ to know about all commands.");
}