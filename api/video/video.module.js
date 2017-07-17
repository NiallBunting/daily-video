'use strict';

var Videos = require('../video/video.model');

module.exports = function (videoId) {
  return new Promise(function(resolve, reject) {
    Videos.findById(videoId).lean().exec( function (err, videoDetails) {
      if (err) {return reject(err);}
      if (videoDetails == null){return reject("No video");}

      if(videoDetails.publishDate) {      
        var currentDate = new Date().getTime();
        var publishDate = new Date(videoDetails.publishDate);

        videoDetails.hidden = "false";
        if(currentDate < publishDate) {
          videoDetails = {"_id": videoDetails._id, "hidden":"true"};
        }
        
        resolve (videoDetails);
      } else {
        videoDetails.hidden = "false";
        resolve (videoDetails);
      }
    });
  });
};
