//This is the main file which handles routing of urls
var express = require('express');
var router = express.Router();

router.use('/doctors', require('./routes'));

router.get('/', function(req, res) {
  res.send('Welcome to Practo');
});

module.exports = router;
