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
  var filename = req.body.fileName
  var text = req.body.slideText

  Utils.generate(filename, text)
  // res.send("All is well!")
  //res.render('download', {title: 'Download Powerpoint'})
  res.send(filename)
  res.end()
})

// router.post('/downloadpowerpoint/', function(req, res){
//   var filename = req.body.fileName
//   res.download('./public/presentations/' + filename + '.pptx')
//   res.end()
// })

router.get('/downloadpowerpoint/', function(req, res) {
  var filename = req.body.fileName
  var path = './public/presentations/' + filename
  res.send(filename)
  // res.setHeader('Content-Disposition', 'attachment; filename=' + ' ' + filename)
  res.download(path)
  // var options = {
  //         root: __dirname + '/../public/presentations/',
  //         dotfiles: 'deny',
  //         headers: {
  //             'x-timestamp': Date.now(),
  //             'x-sent': true,
  //             'Content-Disposition': 'attachment; filename="' + filename + '"'
  //           }
  //   }
  //   var path = 'myPowerpoint7.pptx'
  // res.sendFile(path, options, function(err) {
  //       if (err) {
  //              console.log(err);
  //              res.render('error', {title: err.status});
  //          }
  // })

})

router.get('/getAllFileNamesFromDirectory/', function(req, res) {
  // var directory = req.body.directory
  var directory = "./public/songs/IPH/"
  var arrayOfFileObjects = []
  //fs.readdirSync(directory, (err, files) => {
  var files = fs.readdirSync(directory)

  files.forEach(file => {

    var content = fs.readFileSync(directory + file)
    arrayOfFileObjects.push({
      filename: file,
      firstLine: content.toString().split('\n')[0]
    })

  });
  console.log(arrayOfFileObjects);
  //return arrayOfFileObjects

  // var fileNameArray = []
  // fs.readdir(directory, (err, files) => {
  //   files.forEach(file => {
  //     console.log(file);
  //     fileNameArray.push(file)
  //   });
  //   return fileNameArray
  // })
  res.send(arrayOfFileObjects)
})

const testFolder = './textFiles/';
//const fs = require('fs');



// function(result) {
//     var options = {
//         root: __dirname + '/../public/presentations/',
//         dotfiles: 'deny',
//         headers: {
//             'x-timestamp': Date.now(),
//             'x-sent': true,
//             'Content-Disposition': 'attachment; filename="' + filename + '"'
//         }
//     };
//     // res.render('index', {title: 'created'})
//     // res.sendFile(filename, options, function(err) {
//     //     if (err) {
//     //         console.log(err);
//     //         res.render('error', {title: err.status});
//     //     }
//     // })
// }

// function streamCallback(data) {
//    var strFilename = filename;
//
// 	res.writeHead(200, { 'Content-disposition':'attachment;filename='+strFilename, 'Content-Length':data.length });
// 	res.end(new Buffer(data, 'binary'));
// }


// Utils.create(filename, text,
//   function(result){
//     res.send('POST request to the homepage')
//   }
// )

module.exports = router;
