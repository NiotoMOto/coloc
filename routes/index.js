'use strict';
var models = require('../models');
var express = require('express');
var passport = require('passport');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var siteconfig = require(path.join(__dirname, '../config/siteConfig.json'))[env];
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


router.get('/loggedin', function(req, res) {
	res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/app',
	failureRedirect: '/#connexion'
}));

router.post('/logout', function(req, res) {
	req.logOut();
	res.sendStatus(200);
});

router.get('/config', function(req, res) {
	res.json(siteconfig);
});

router.post('/inscription', function(req, res) {
	var user = models.User.build(req.body);
	user.save().then(function() {
		res.redirect('/?inscription=1#connexion');
	});
});

module.exports = router;
