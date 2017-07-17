'use strict'

//Dev config

module.exports = {
  mongo: {
    uri: 'mongodb://localhost:27017',
    options: {
      user: 'root',
      pass: 'password',
      database: 'daily_video'
    },
    seedDB: false
  },

  server: {
    ip: "0.0.0.0",
    port: 3000
  }
};
