'use strict';
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/inscription', function(req, res) {
  console.log(req);
  res.render('index');
});


module.exports = router;
