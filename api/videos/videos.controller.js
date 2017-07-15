/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';


// Get list of things
exports.index = function (req, res) {
    return res.status(501).send('Not implemented.');
};

// Get a single thing
exports.show = function (req, res) {
    return res.status(501).send('Not implemented.');
};

// Creates a new thing in the DB.
exports.create = function (req, res) {
  return methodNotAllowed(res);
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
  return methodNotAllowed(res);
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
  return methodNotAllowed(res);
};

function handleError(res, err) {
  return res.status(500).send(err);
};

function methodNotAllowed(res) {
  res.set('Allow', 'GET');
  res.status(405);
  return res.send('Method not allowed.');
};
