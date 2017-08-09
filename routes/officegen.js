'use strict'
var officegen = require('officegen');
var fs = require('fs')

var pptx = officegen ({
    'type': 'pptx', // or 'xlsx', etc
    'creator': 'AutoPowerpoint'
});

var slide = pptx.makeNewSlide ({
    userLayout: 'title'
})
slide.addText ( [
  { text: 'Hello ', options: { font_size: 56 } },
  { text: 'World!', options: { font_size: 56, font_face: 'Arial', color: 'ffff00', bold: true  } }
  ], { cx: '75%', cy: 66, y: 150 } );

var out = fs.createWriteStream ( '../public/presentations/out.pptx' );

pptx.generate ( out, {
  'finalize': function ( written ) {
    console.log ( 'Finish to create a PowerPoint file.\nTotal bytes created: ' + written + '\n' );
  },
  'error': function ( err ) {
    console.log ( err );
  }
});
