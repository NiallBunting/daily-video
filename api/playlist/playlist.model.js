'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var playlistSchema = new Schema({
  title: {type:String, required: true},
  desc: {type:String, required: true},
  date_created: { type: Date, default: Date.now },
  videos: [ { type: mongoose.Schema.ObjectId, ref: 'Videos'} ]
});

module.exports = mongoose.model('Playlist', playlistSchema);
