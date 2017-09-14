const testFolder = '../public/songs/IPH/';
const fs = require('fs');
var arrayOfFileObjects = []

var files = fs.readdirSync(testFolder)
files.forEach(file => {

  var content = fs.readFileSync(testFolder + file)
  arrayOfFileObjects.push({
    filename: file,
    firstLine: content.toString().split('\n')[0]
  })

});
console.log(arrayOfFileObjects);
