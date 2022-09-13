var express = require('express');
var fs = require('fs');
var router = express.Router();

// GET - /Tracker
router.get('/Tracker', function(req, res, next) {
  fs.readFile(__dirname + '/Tracker.html', function(error, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

// GET - /Observer
router.get('/Observer', function(req, res, next) {
  fs.readFile(__dirname + '/Observer.html', function(error, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

module.exports = router;
