'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var captureThumb = exports.captureThumb = function captureThumb(videoTag) {
  return new Promise(function (resolve, reject) {
    var canvas = document.createElement('canvas');
    canvas.width = videoTag.videoWidth;
    canvas.height = videoTag.videoHeight;
    canvas.getContext('2d').drawImage(videoTag, 0, // top
    0, // left
    videoTag.videoWidth, videoTag.videoHeight);
    canvas.toBlob(function (thumbnail) {
      resolve(thumbnail);
    });
  });
};

var getVideoInfo = function getVideoInfo(videoBlob) {
  return new Promise(function (resolve, reject) {
    var videoTag = document.createElement('video');
    videoTag.preload = 'metadata';
    videoTag.muted = true;
    videoTag.defaultMuted = true;
    videoTag.playsInline = true;
    videoTag.autoplay = true;

    var resolved = false;

    var handleTimeout = function handleTimeout() {
      resolved = true;
      resolve({
        duration: null,
        thumbnail: null
      });
      videoTag.remoteEventListener && videoTag.remoteEventListener('loadeddata', handleLoadedData);
      window.URL.revokeObjectURL(videoTag.src);
    };

    var timeout = setTimeout(handleTimeout, 1000);

    var handleLoadedData = function handleLoadedData() {
      var duration = videoTag.duration * 1000;

      captureThumb(videoTag).then(function (thumbnail) {
        videoTag.pause();
        if (!resolved) {
          clearTimeout(timeout);
          resolved = true;
          resolve({ duration: duration, thumbnail: thumbnail });
        }
        window.URL.revokeObjectURL(videoTag.src);
      }).catch(function (err) {
        if (!resolved) {
          alert('thumb error ' + err);
          clearTimeout(timeout);
          resolved = true;
          reject(err);
        }
      });
    };

    videoTag.addEventListener('loadeddata', handleLoadedData);
    videoTag.src = window.URL.createObjectURL(videoBlob);
  });
};

exports.default = getVideoInfo;