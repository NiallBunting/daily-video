'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var videoSchema = new Schema({
  song: {type:String, required: true},
  artist: {type:String, required: true},
  info: String,
  youtubeId: String,
  publishDate: Date,
  date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', videoSchema);
