var express = require('express');
var router = express.Router();
var Utils = require('../components/Utils.jsx')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AutoPowerpoint' });
});

router.post('/generatepowerpoint/', function(req, res, next)        {
    var filename = req.body.fileName
    var text = req.body.slideText

    Utils.generate(filename, text,
        function(result) {
            var options = {
                root: __dirname + '/../public/presentations/',
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true,
                    'Content-Disposition': 'attachment; filename="' + filename + '"'
                }
            };
            res.sendFile(filename, options, function(err) {
                if (err) {
                    console.log(err);
                    res.render('error', {title: err.status});
                }
            })
        }
    )

})


module.exports = router;
