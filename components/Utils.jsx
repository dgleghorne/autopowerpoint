'use strict'

var pptx = require("../node_modules/pptxgenjs/dist/pptxgen");
var firstline = require('firstline')
var axios = require('axios')

function generate(fileName, text){
    pptx.setAuthor('AutoPowerpoint');
    pptx.setCompany('High Street Presbyterian, Antrim');

    // var fileName = "newPPT"
    // var text = "Lots of text...."

    createWelcomeSlide()
    addInterstitial()
    addSong()
    addInterstitial()
    addBibleReading()
    addInterstitial()
    addCoffee()

    // pptx.save('../public/presentations/' + fileName, cb)
    pptx.save('./public/presentations/' + fileName)
}

function saveCallback(filename) {
	 console.log('Good News Everyone!  File created: '+ filename);
}

function createWelcomeSlide() {
  var welcomeSlide = pptx.addNewSlide();
  welcomeSlide.addText("Welcome!",{ x:0.1, y:0.5, w:'64%', h:'15%', align:'L', font_size:60, font_face:'Century Gothic', color:'000000', fill:'FFFFFF' })
  welcomeSlide.addText("Sunday 6th August 2017",{ x:5.3, y:0.5, w:'40%', h:'17%', align:'C', font_size:32, font_face:'Century Gothic', color:'00cc00', fill:'FFFFFF', bold: true })
  welcomeSlide.addImage({path:'./public/images/churchPic.jpg' , x:0.5 , y:1.5 , w:'48%' , h:'32%'})
  welcomeSlide.addText("Title Of Service",{ x:0.5, y:3.3, w:'40%', h:'7%', align:'L', font_size:24, font_face:'Arial', color:'00cc00', fill:'FFFFFF', bold: true })
  welcomeSlide.addText("Speaker's Name",{ x:0.5, y:3.7, w:'40%', h:'7%', align:'L', font_size:24, font_face:'Arial', color:'00cc00', fill:'FFFFFF', bold: true })
  welcomeSlide.addImage({path:'./public/images/highstreetlogo.png' , x:0.5 , y:4.2 , w:'85%' , h:'25%'})

  welcomeSlide.bkgd  = 'ffffff';
  welcomeSlide.color = '000000'

  return welcomeSlide
}

function addInterstitial(){
  var slide = pptx.addNewSlide();
  slide.addImage({path:'./public/images/blueCrossBackground.jpg', x:0.0, y:0.0, w:'100%', h: '100%'})
}

function addSong(){
  var slide = pptx.addNewSlide();
}

function addBibleReading(){
  var slide = pptx.addNewSlide();
  slide.addImage({path:'./public/images/bibleReading.jpg', x:0.0, y:0.0, w:'100%', h: '90%'})
  //slide.addShape(pptx.shapes.RECTANGLE, { x:0.0, y:4.0, w:'100%', h:'30%', fill:{type:'solid', color:'E6E6E6', transparency:'50%'} });
  slide.addText("Genesis 50:15-20", { x:4.0, y:3.7, w:'60%', h:'10%', align:'R', font_size:32, font_face:'Century Gothic', color:'000000', bold: true})
  slide.addText("Reader: Reader Name", { x:4.0, y:4.2, w:'60%', h:'10%', align:'R', font_size:32, font_face:'Century Gothic', color:'000000', bold: true})
  slide.addText("Page: 1234", { x:4.0, y:4.7, w:'60%', h:'10%', align:'R', font_size:32, font_face:'Century Gothic', color:'000000', bold: true})
}

function addCoffee(){
  var slide = pptx.addNewSlide()
  slide.addImage({path:'./public/images/coffeepic.jpg', x:4.5, y:0.0, w:'50%', h: '100%'})
  slide.addText("Fancy a CUPPA", {x:0.1, y:0.0, w:'60%', h:'20%', align: 'L', font_size: 32, font_face:'Arial', color: '000000', bold: true})
  slide.addText("and a CHAT after", {x:0.1, y:0.5, w:'60%', h:'20%', align: 'L', font_size: 32, font_face:'Arial', color: '000000', bold: true})
  slide.addText("church??", {x:0.1, y:1.0, w:'60%', h:'20%', align: 'L', font_size: 32, font_face:'Arial', color: '000000', bold: true})
  slide.addText("Don't be rushing away!...", {x:0.1, y:1.5, w:'60%', h:'20%', align: 'L', font_size: 32, font_face:'Arial', color: '000000', bold: true})
  slide.addText("...Teas and coffees served in", {x:0.1, y:2.0, w:'65%', h:'20%', align: 'L', font_size: 32, font_face:'Arial', color: '000000', bold: true})
  slide.addText("the hall after the service...", {x:0.1, y:2.5, w:'60%', h:'20%', align: 'L', font_size: 32, font_face:'Arial', color: '000000', bold: true})
  slide.addText("...Everyone welcome!", {x:0.1, y:3.0, w:'60%', h:'20%', align: 'L', font_size: 32, font_face:'Arial', color: '000000', bold: true})
}

function getAllFileNamesFromDirectory(directory){
  axios.get('/getAllFileNamesFromDirectory', {
    params:{
      directory: directory
    }
  }).then(function(response){
    return response
  })
  .catch(function(error){
    console.log(error);
    return []
  })
}

function getAllFirstLinesFromDirectory(directory){
  var fileNameArray = getAllFileNamesFromDirectory()
  var firstLineArray = []
  fileNameArray.forEach(file => {
    firstLineArray = firstline(file)
  })
  return firstLineArray
}

var exports = {}
exports.generate = generate
exports.getAllFirstLinesFromDirectory = getAllFirstLinesFromDirectory
module.exports = exports
