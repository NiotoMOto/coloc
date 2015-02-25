'use strict';
var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var justInscrit = req.query.inscription;
	if (justInscrit) {
		res.render('index', {
			justInscrit: true
		});
	} else {
		res.render('index');
	}
});

router.get('/login', function(req, res) {
	if (req.inscription) {
		res.render('connexion', {
			justInscrit: req.inscription
		});
	}
});


router.post('/inscription', function(req, res) {
	var user = models.User.build(req.body);
	user.save().then(function() {
		res.redirect('/?inscription=1#connexion');
	});

});



module.exports = router;
