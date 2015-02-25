'use strict';
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Bet.findAll().then(function(bets) {
    res.render('index', {
      bets: bets
    });
  });
});

module.exports = router;