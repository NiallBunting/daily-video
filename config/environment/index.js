'use strict';

var dev = require('./development.js');

var config = {};
config.mongo = dev.mongo;

module.exports = config;
