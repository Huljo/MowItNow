'use strict';

var expect = require('expect.js');
var Config = require('../lib/config');

describe('Config', function() {
    var config = new Config('config/tests');
    it('should set config.topRightPos', function () {
        expect(config.topRightPos).to.only.have.keys('x', 'y');
    });
    it('should set config.mowers', function () {
        expect(config.mowers).to.not.be.empty();
    });
});