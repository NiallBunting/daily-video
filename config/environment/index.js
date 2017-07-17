'use strict';

var dev = require('./development.js');

var config = {};

if(process.env.DAILY_VIDEO_DATABASE_URI){
  dev.mongo.uri = process.env.DAILY_VIDEO_DATABASE_URI;
}
config.mongo = dev.mongo;

if(process.env.DAILY_VIDEO_PORT){
  dev.server.port = parseInt(process.env.DAILY_VIDEO_PORT);
}

config.server = dev.server;

module.exports = config;
