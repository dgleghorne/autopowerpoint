'use strict'

var pptx = require("../node_modules/pptxgenjs/dist/pptxgen");


function generate(fileName, text, cb){
    pptx.setAuthor('AutoPowerpoint');
    pptx.setCompany('High Street Presbyterian, Antrim');

    // var fileName = "newPPT"
    // var text = "Lots of text...."

    var slide = pptx.addNewSlide();
    slide.addText(text,
        { x:0.0, y:0.0, w:'100%', h:'100%', align:'c', font_size:18, color:'0088CC', fill:'F1F1F1' })
    slide.bkgd  = 'fd7a16';
    slide.color = '696969'

    pptx.save('../public/presentations/' + fileName, cb)
}

var exports = {}
exports.generate = generate

module.exports = exports