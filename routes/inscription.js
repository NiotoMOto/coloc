'use strict';
var express = require('express');
var router  = express.Router();

router.post('/inscription', function(req, res) {
  res.render('index');
});


module.exports = router;
