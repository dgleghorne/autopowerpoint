var express = require('express');
var router = express.Router();
var Utils = require('../components/Utils.jsx')
const fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'AutoPowerpoint'
  });
});

router.post('/generatepowerpoint/', function(req, res) {

  let stringifiedSongArray = JSON.stringify(req.body.songsArray)

  var filename = req.body.fileName
  var date = req.body.date
  var morning = req.body.morning
  var speaker = req.body.speaker
  var title = req.body.title
  var reading1 = req.body.reading1
  var reader1 = req.body.reader1
  var pageNo1 = req.body.pageNo1
  var reading2 = req.body.reading2
  var reader2 = req.body.reader2
  var pageNo2 = req.body.pageNo2
  var backgroundColour = req.body.backgroundColour
  var textColour = req.body.textColour
  var songsArray = JSON.parse(stringifiedSongArray)
  var noOfSongs = req.body.noOfSongs
  var welcomeSlide = req.body.welcomeSlide
  var interstitial = req.body.interstitial

  Utils.generate(filename, date, morning, speaker, title, reading1, reader1, pageNo1, reading2, reader2, pageNo2, backgroundColour, textColour, songsArray, noOfSongs, welcomeSlide, interstitial)
  res.send(filename)
  res.end()
})

router.get('/download/:filename', function(req, res) {
  var filename = req.params.filename
  var file = './public/presentations/' + filename + '.pptx';
  res.download(file); // Set disposition and send it.
});

//const testFolder = './textFiles/';

module.exports = router;
