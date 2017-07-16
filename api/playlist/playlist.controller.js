/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Playlist = require('./playlist.model');
var Videos = require('../video/video.model');

// Get list of things
exports.index = function (req, res) {
  Playlist.find().lean().exec(function (err, playlists) {
    if (err) {return handleError(res, err);}
    for (var i = 0, len = playlists.length; i < len; i++) {
      delete playlists[i].videos;
    }
    return res.status(200).json(playlists);
  }); 
};

// Return playlist with the video info. 
exports.show = function (req, res) {
  Playlist.findById(req.params.id).lean().exec(function (err, playlist) {
    if (err) {return handleError(res, err);}

    var videosDetails = [];
    var promises = [];
    for (var i = 0, len = playlist.videos.length; i < len; i++) {
      promises.push(getVideo(playlist.videos[i]).then(function (d) {
        videosDetails.push(d);
      }));
    }

    Promise.all(promises).then(function () {
      playlist.videos = videosDetails;
      return res.status(200).json(playlist);
    });
  });
};

function getVideo(id) {
  return new Promise(function(resolve, reject) {
    Videos.findById(id).lean().exec( function (err, videoDetails) {
      if (err) {return reject(err);}
      resolve (videoDetails);
    });
  });
}

// Creates a new thing in the DB.
exports.create = function (req, res) {
  Playlist.create(req.body, function (err, playlist) {
    if (err) {return handleError(res, err);}
    return res.status(201).json(playlist);
  });
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
  return res.send('hello'); 
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
  Playlist.findById(req.params.id, function (err, playlist) {
    playlist.remove(function (err) {
      if(err){return handleError(res, err);}
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
};
