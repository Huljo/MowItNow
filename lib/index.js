'use strict';

// Hook into commonJS module systems
if (typeof module !== 'undefined' && "exports" in module) {
    module.exports = require('./controller');
}