'use strict'

//Dev config

module.exports = {
  mongo: {
    uri: 'mongodb://172.17.0.2:27017',
    options: {
      user: 'root',
      pass: 'password',
      database: 'daily_video'
    },
    seedDB: false
  }
};
