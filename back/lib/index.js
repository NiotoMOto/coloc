'use strict';

var express = require('express');
var path = require('path');
var loginRouter = express.Router();

loginRouter.get('/', function(req, res) {
	if (req.isAuthenticated()) {
		res.sendFile('app/index.html', {
			root: path.join(__dirname, '../')
		});
	} else {
		res.redirect('/#connexion');
	}
});

module.exports = loginRouter;
