/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT/PATCH     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';
var Videos = require('./video.model');

// Get list of things
exports.index = function (req, res) {
  Videos.find(function (err, videos) {
    if (err) {return handleError(res, err);}
    return res.status(200).json(videos);
  }); 
};

// Get a single thing
exports.show = function (req, res) {
  Videos.findById(req.params.id, function (err, video) {
    if (err) {return handleError(res, err);}
    return res.status(200).json(video);
  });
};

// Creates a new thing in the DB.
exports.create = function (req, res) {
  Videos.create(req.body, function (err, video) {
    if (err) {return handleError(res, err);}
    return res.status(201).json(video);
  });
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
    return res.status(501).send('Not implemented.');
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
  Videos.findById(req.params.id, function (err, video) {
    video.remove(function (err) {
      if(err){return handleError(res, err);}
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
};
