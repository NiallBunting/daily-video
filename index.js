/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
//var mongoose = require('mongoose');
//var config = require('./config/environment');

// Connect to database
//mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
//if (config.seedDB) {
//  require('./config/seed');
//}

// Setup server
var app = express();
var server = require('http').createServer(app);
//var socketio = require('socket.io')(server, {
//  serveClient: (config.env === 'production') ? false : true,
//  path: '/socket.io-client'
//});
//require('./config/socketio')(socketio);
//require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(3000, '0.0.0.0', function () {
  console.log('Express server listening on %d, in %s mode', 3000, app.get('env'));

  // this is used to support naught for zero-downtime deployments
  // see: https://github.com/andrewrk/naught
  if (process.send) {
    // let naught know we're up and running
    process.send('online');

    // listen for shutdown events
    process.on('message', function (message) {
      if (message === 'shutdown') {
        // Do other cleanup

        // while not strictly needed, we could be using Connection: keep-alive which means we need to explicitly
        // shutdown the process.
        process.exit(0);
      }
    });
  }
});

// Expose app
exports = module.exports = app;
