'use strict'

// var pptx1 = require("../node_modules/pptxgenjs/dist/pptxgen");
//
//
// function generate(fileName, text, cb){
//     pptx1.setAuthor('AutoPowerpoint');
//     pptx1.setCompany('High Street Presbyterian, Antrim');
//
//     // var fileName = "newPPT"
//     // var text = "Lots of text...."
//
//     var slide = pptx1.addNewSlide();
//     slide.addText(text,
//         { x:0.0, y:0.0, w:'100%', h:'100%', align:'c', font_size:18, color:'0088CC', fill:'F1F1F1' })
//     slide.bkgd  = 'fd7a16';
//     slide.color = '696969'
//
//     pptx1.save('../public/presentations/' + fileName, cb)
// }

var officegen = require('officegen');

var pptx = officegen({
  'type': 'pptx', // or 'xlsx', etc
  'creator': 'AutoPowerpoint'
})

function create(fileName, text){
  var slide = pptx.makeNewSlide ({
      userLayout: 'title'
  })
  slide.addText ( [
    { text: text, options: { font_size: 56 } },
    // { text: 'World!', options: { font_size: 56, font_face: 'Arial', color: 'ffff00', bold: true  } }
    ], { cx: '75%', cy: 66, y: 150 } );

    var out = fs.createWriteStream ( filename + '.pptx' );

    pptx.generate ( out, {
      'finalize': function ( written ) {
        console.log ( 'Finish to create a PowerPoint file.\nTotal bytes created: ' + written + '\n' );
      },
      'error': function ( err ) {
        console.log ( err );
      }
    });

}

var exports = {}
// exports.generate = generate
exports.create = create
module.exports = exports
