var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/autopowerpoint', function() {
  console.log('mongod connected')
})
module.exports = mongoose
//process.env.MONGODB_URI ||
//mongodb://heroku_f7nb4dck:36j63stbl0pckihe3ottb4puku@ds153958.mlab.com:53958/heroku_f7nb4dck
//'mongodb://dgleghorne:Pass13603078@ds153958.mlab.com:53958/heroku_f7nb4dck'
