'use strict'

var pptx = require("../node_modules/pptxgenjs/dist/pptxgen");
var axios = require('axios')

function generate(fileName, date, morning, speaker, title, reading1, reader1, pageNo1, reading2, reader2, pageNo2, songsArray, noOfSongs){
    pptx.setAuthor('AutoPowerpoint');
    pptx.setCompany('High Street Presbyterian, Antrim');

    // var fileName = "newPPT"
    // var text = "Lots of text...."

    createWelcomeSlide(date, morning, speaker, title)
    addInterstitial()
    addSong(songsArray[0])
    addInterstitial()
    addBibleReading(reading1, reader1, pageNo1)
    addInterstitial()
    addSong(songsArray[1])
    addInterstitial()
    addSong(songsArray[2])
    addInterstitial()
    addBibleReading(reading2, reader2, pageNo2)
    addInterstitial()
    if(noOfSongs == 4){
      addSong(songsArray[3])
      addInterstitial()
    }
    if(noOfSongs == 5){
      addSong(songsArray[4])
      addInterstitial()
    }
    addCoffee()

    // pptx.save('../public/presentations/' + fileName, cb)
    pptx.save('./public/presentations/' + fileName)
}

function saveCallback(filename) {
	 console.log('Good News Everyone!  File created: '+ filename);
}

function createWelcomeSlide(date, morning, speaker, title) {
  var welcomeSlide = pptx.addNewSlide();
  welcomeSlide.addText("Welcome!",{ x:0.1, y:0.5, w:'64%', h:'15%', align:'L', font_size:60, font_face:'Century Gothic', color:'000000', fill:'FFFFFF' })
  welcomeSlide.addText(date,{ x:5.3, y:0.5, w:'40%', h:'17%', align:'C', font_size:32, font_face:'Century Gothic', color:'00cc00', fill:'FFFFFF', bold: true })
  welcomeSlide.addImage({path:'./public/images/churchPic.jpg' , x:0.5 , y:1.5 , w:'48%' , h:'32%'})
  welcomeSlide.addText(title,{ x:0.5, y:3.3, w:'40%', h:'7%', align:'L', font_size:24, font_face:'Arial', color:'00cc00', fill:'FFFFFF', bold: true })
  welcomeSlide.addText(speaker,{ x:0.5, y:3.7, w:'40%', h:'7%', align:'L', font_size:24, font_face:'Arial', color:'00cc00', fill:'FFFFFF', bold: true })
  welcomeSlide.addImage({path:'./public/images/highstreetlogo.png' , x:0.5 , y:4.2 , w:'85%' , h:'25%'})

  welcomeSlide.bkgd  = 'ffffff';
  welcomeSlide.color = '000000'

  return welcomeSlide
}

function addInterstitial(){
  var slide = pptx.addNewSlide();
  slide.addImage({path:'./public/images/blueCrossBackground.jpg', x:0.0, y:0.0, w:'100%', h: '100%'})
}

function addSong(songObject){
  let songNameSplit = songObject.name.split('-')
  let songName =  songNameSplit[0] + songNameSplit[1]
  var songNameSlide = pptx.addNewSlide();
  songNameSlide.addImage({path:'./public/images/Navy-Blue-Plain-Backgrounds.jpg', x:0.0, y:0.0, w:'100%', h: '100%'})
  songNameSlide.addText(songName,{ x:0.5, y:0.7, w:'90%', h:'70%', align:'C', font_size:66, font_face:'Arial Rounded MT Bold', color:'ffffff'})
  divideSongContentIntoSlides(songObject.content)
}

function addBibleReading(reading, reader, pageNo){
  var slide = pptx.addNewSlide();
  slide.addImage({path:'./public/images/bibleReading.jpg', x:0.0, y:0.0, w:'100%', h: '90%'})
  //slide.addShape(pptx.shapes.RECTANGLE, { x:0.0, y:4.0, w:'100%', h:'30%', fill:{type:'solid', color:'E6E6E6', transparency:'50%'} });
  slide.addText(reading, { x:4.0, y:3.7, w:'60%', h:'10%', align:'R', font_size:32, font_face:'Century Gothic', color:'000000', bold: true})
  slide.addText("Reader: " + reader, { x:4.0, y:4.2, w:'60%', h:'10%', align:'R', font_size:32, font_face:'Century Gothic', color:'000000', bold: true})
  slide.addText("Page: " + pageNo, { x:4.0, y:4.7, w:'60%', h:'10%', align:'R', font_size:32, font_face:'Century Gothic', color:'000000', bold: true})
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

function cleanSegment(segment){
  var segmentRpl = segment.replace('\f', '').replace('\r', '')
  if(!(segmentRpl == '\nundefined') && !(segmentRpl.includes("CCLI")) && segmentRpl != undefined){
    return segmentRpl
  }else {
    return null
  }
}

function divideSongContentIntoSlides(content){
  var lines = content.replace('\f', '').replace('\r', '').replace(/ +(?= )/g,'').split('\n');
  console.log("LINES",lines)
  var rawSegments = []
  for (var i = 2; i < lines.length ; i=i+2) {
    rawSegments.push(lines[i] + '\n' + lines[i+1])
  }
  console.log("SEGMENTS", rawSegments)
  console.log("SEGMENTS LENGTH", rawSegments.length)
  let segments = []
  // rawSegments.forEach((segment)=>{
  //   segments.push(cleanSegment(segment))
  // })

  for(var i = 0; i<=rawSegments.length; i++){
    console.log("RAW SEGMENT: ", rawSegments[i])
    if(rawSegments[i] != undefined){
      let result = cleanSegment(rawSegments[i])
      if(result != null && result != undefined){
        segments.push(result)
      }
    }
  }

  //var nextSegment = segments[segments.length-2].toString()
  console.log("SEGMENT LENGTH: ", segments.length);
  for(var i = 0; i < segments.length; i++){
    // var segment = segments[i].replace('\f', '').replace('\r', '')
    // if(!(segment == '\nundefined') && !(segment.includes("CCLI"))){
      console.log("SEGMENT " + i + ": ", segments[i])
      var slide = pptx.addNewSlide();
      if(i == segments.length-1){
        console.log("ADD CCLI " + i + ": ", segments[i])
        slide.addImage({path:'./public/images/Navy-Blue-Plain-Backgrounds.jpg', x:0.0, y:0.0, w:'100%', h: '100%'})
        slide.addText(segments[i], { x:0.3, y:0.1, w:'95%', h:'98%', align:'C', font_size:66, font_face:'Arial Rounded MT Bold', color:'ffffff'}) //, fill: '000080'})
        slide.addText("CCLI 128675", { x:0.9, y:5.1, w:'64%', h:'5%', align:'L', font_size:14, font_face:'Times New Roman', color:'ffffff'}) //, fill: '000080'})
      } else{
        slide.addImage({path:'./public/images/Navy-Blue-Plain-Backgrounds.jpg', x:0.0, y:0.0, w:'100%', h: '100%'})
        slide.addText(segments[i], { x:0.3, y:0.1, w:'95%', h:'98%', align:'C', font_size:66, font_face:'Arial Rounded MT Bold', color:'ffffff'}) //, fill: '000080'})
      }
    // }
  }
}

var exports = {}
exports.generate = generate
module.exports = exports
