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
router.get('/find/types/', function(req, res){
  Song.find({},'type', function(err, songs){
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

//Delete songs by id
router.delete('/remove/id/:id', function (req, res) {
    Song.remove({_id: req.params.id}, function(err, songs){
        if(err){return next(err)}
        res.send('Song with id: '+ req.params.id +' has been deleted');
    })
});

//Update song by title
router.post('/update/:title', function(req, res, next){
  var update = {
    title: req.body.title,
    verses: req.body.verses,
    CCLI: req.body.CCLI,
    chorus: req.body.chorus,
    position: req.body.position,
    type: req.body.type
  }
  var conditions = {title: req.params.title}
  var options = {multi: false, upsert: true}
  Song.findOneAndUpdate(conditions, update, options, function(err, song){
    if(err){return next(err)}
    res.status(200).json(update)
  })
})

module.exports = router;
