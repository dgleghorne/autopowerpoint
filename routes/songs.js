var express = require('express');
var router = express.Router();
var Song = require('../models/song')

//create new song
router.post('/create/', function(req, res, next){
  var song = new Song({
    title: req.body.title,
    verses: req.body.verses,
    CCLI: req.body.CCLI,
    chorus: req.body.chorus,
    position: req.body.position,
    type: req.body.type
  })
  song.save(function(err, song){
    if(err){return next(err)}
    res.status(201).json(song)
  })
})

//return all songs
router.get('/find/', function(req, res){
  Song.find(function(err, songs){
    if(err){return next(err)}
    res.json(songs)
  })
})

//return all titles of songs
router.get('/find/titles/:type', function(req, res){
  Song.find({type: req.params.type},'title', function(err, songs){
    if(err){return next(err)}
    res.json(songs)
  })
})

//return all types of songs
router.get('/find/types', function(req, res){
  Song.find({},'types', function(err, songs){
    if(err){return next(err)}
    res.json(songs)
  })
})

//return song by title
router.get('/find/:title', function(req, res){
  Song.find({title: req.params.title },function(err, songs){
    if(err){return next(err)}
    res.json(songs)
  })
})

//Delete songs by title
router.delete('/remove/:title', function (req, res) {
  Song.remove({title: req.params.title}, function(err, songs){
    if(err){return next(err)}
    res.send('Songs with title: '+ req.params.title +' have been deleted');
  })
});

module.exports = router;
