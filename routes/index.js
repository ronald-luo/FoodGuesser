var express = require('express');
var router = express.Router();
require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET api request. */
router.get('/api/:foodName', function(req, res, next) {
  var cseId = process.env.ID
  var apiKey = process.env.KEY
  const GoogleImages = require('google-images')
  const client = new GoogleImages(cseId, apiKey)
  client.search(req.params.foodName + ' food').then(images => {
      res.json({src: images[0].url})
  })
});

module.exports = router;
