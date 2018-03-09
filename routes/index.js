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

  //console.log("songsArray REQ BODY", req.body.songsArray)

  let stringifiedSongArray = JSON.stringify(req.body.songsArray)
  //console.log("songsArray stringify", stringifiedSongArray)

  //console.log("songsArray JSON", JSON.parse(stringifiedSongArray))

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
  var songsArray = JSON.parse(stringifiedSongArray)
  var noOfSongs = req.body.noOfSongs

  Utils.generate(filename, date, morning, speaker, title, reading1, reader1, pageNo1, reading2, reader2, pageNo2, songsArray, noOfSongs)
  // res.send("All is well!")
  //res.render('download', {title: 'Download Powerpoint'})
  res.send(filename)
  res.end()
})


// router.get('/downloadpowerpoint/:filename', function(req, res) {
//   var filename = req.params.filename
//   var path = './public/presentations/' + filename
//   res.send(filename)
//   // res.setHeader('Content-Disposition', 'attachment; filename=' + ' ' + filename)
//   res.download(path)
//   // var options = {
//   //         root: __dirname + '/../public/presentations/',
//   //         dotfiles: 'deny',
//   //         headers: {
//   //             'x-timestamp': Date.now(),
//   //             'x-sent': true,
//   //             'Content-Disposition': 'attachment; filename="' + filename + '"'
//   //           }
//   //   }
//   //   var path = 'myPowerpoint7.pptx'
//   // res.sendFile(path, options, function(err) {
//   //       if (err) {
//   //              console.log(err);
//   //              res.render('error', {title: err.status});
//   //          }
//   // })
//
// })

router.get('/getAllFileNamesFromDirectory/:directory', function(req, res) {
  var param = req.params.directory
  var directory = "./public/songs/" + param + '/'
  var arrayOfFileObjects = []
  var files = fs.readdirSync(directory)

  files.forEach(file => {

    var content = fs.readFileSync(directory + file)
    arrayOfFileObjects.push({
      filename: file,
      title: content.toString().split('\n')[0],
      firstLine: content.toString().split('\n')[1],
      content: content.toString()
    })

  });
  console.log(arrayOfFileObjects);
  //return arrayOfFileObjects

  res.send(arrayOfFileObjects)
})


router.get('/getAllContentFromFile/', function(req, res) {
  var directory = './public/songs/IPH/'
  var file = req.body.filename
  var content = fs.readFileSync(directory + file)
})

router.get('/getAllSongTitlesFromDirectory/:directory', function(req, res) {
  var param = req.params.directory
  var directory = "./public/songs/" + param + '/'
  var arrayOfFileObjects = []
  var files = fs.readdirSync(directory)

  files.forEach(file => {

    //var content = fs.readFileSync(directory + file, 'utf8')
    var fileWithoutExtension = file.replace('.json', '')
    var fileContents = require("." + directory + fileWithoutExtension)
    arrayOfFileObjects.push({
      filename: file,
      title: fileContents.title
    })

  });
  console.log(arrayOfFileObjects);
  //return arrayOfFileObjects

  res.send(arrayOfFileObjects)
})


router.get('/getAllContentFromFile/:directory/:filename', function(req, res) {
  var filename = req.params.filename
  var directoryParam = req.params.directory
  var directory = "./public/songs/" + directoryParam
  var fileWithoutExtension = filename.replace('.json', '')
  var fileContents = require("." + directory + '/' + fileWithoutExtension)
  let songObject = {
    title: fileContents.title,
    chorus: fileContents.chorus,
    CCLI: fileContents.CCLI,
    verses: fileContents.verses
  }
  res.send(songObject)
})

router.get('/download/:filename', function(req, res) {
  var filename = req.params.filename
  var file = './public/presentations/' + filename + '.pptx';
  res.download(file); // Set disposition and send it.
});

//const testFolder = './textFiles/';

module.exports = router;
