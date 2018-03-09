var mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/autopowerpoint', function() {
  console.log('mongod connected')
})
module.exports = mongoose
