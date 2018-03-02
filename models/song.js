var db = require('../db')
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var lineString = new Schema({content: String})
var linesObject = new Schema({lines: [lineString]})
var Song = db.model('Song', {
  title: {type: String, required: true},
  verses: {type: Array, required: true},
  CCLI: {type: String, required: true},
  type: {type: String, required: true},
  chorus: {type: String, required: false},
  position: {type: String, required: false}
})
module.exports = Song
