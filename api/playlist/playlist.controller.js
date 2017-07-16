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
  //ERROR: not in objectid format
  //ERROR: does not exist
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

//Gets a video the video details from and id.
function getVideo(id) {
  return new Promise(function(resolve, reject) {
    Videos.findById(id).lean().exec( function (err, videoDetails) {
      if (err) {return reject(err);}
      resolve (videoDetails);
    });
  });
}

// Creates a new playlist
exports.create = function (req, res) {
  //ERROR: IF videos NOT A DICT DOES 500 error
  if(req.body.videos && req.body.videos.length > 0){
    return res.status(403).send("Videos can't be added on creation.");
  }
  Playlist.create(req.body, function (err, playlist) {
    if (err) {return handleError(res, err);}
    return res.status(201).json(playlist);
  });
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
  var bodyVideos = req.body.videos;
  var RESTRICTED = ["date_created", "_id", "__v"];
  for(var i = 0; i < RESTRICTED.length; i++) {
    if(RESTRICTED[i] in req.body) {
      return res.status(403).send("Can't change " + RESTRICTED[i] + ".");
    }
  }
  if(req.body.videos.length < 1) {
      return res.status(403).send("Can't set videos empty.");
  }


  var playlistsVideos = [];
  Playlist.findById(req.params.id).lean().exec( function (err, videoDetails) {
    if (err) {return reject(err);}
    playlistsVideos = videoDetails.videos;

    for(var i = 0; i < bodyVideos.length; i++) {
      var key = Object.keys(bodyVideos[i])[0];
      if(bodyVideos[i][key] == "add"){
        playlistsVideos.push(key);
      } else if (bodyVideos[i][key] == "remove"){
        //TODO Fix this
        return res.status(501).send('Not implemented.');

        var index = playlistsVideos.indexOf(key);
        console.log(typeof(key) + " " + typeof(playlistsVideos[0]));
        console.log(key);
        console.log(playlistsVideos);
        console.log(index);
        if(index > -1){
          playlistsVideos.splice(index , 1);
        }
      } else { return res.status(400).send("Bad video modifer: " + bodyVideos[i][key]); }
    }

    req.body.videos = playlistsVideos;
    //TODO Allow changing of these details.
    req.body.title = videoDetails.title;
    req.body.desc = videoDetails.desc;

    Playlist.findOneAndUpdate({"_id": req.params.id}, req.body, {upsert:true}, function(err, playlist){
      if(err){return handleError(res, err);}
      return res.sendStatus(204);
    });
  });
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
