'use strict';

var models = require('../../models');
module.exports = function(router) {
	router.get('/users', function(req, res) {
		models.User.findAll({
			include: [{
				model: models.Coloc,
				as: 'colocs'
			}]
		}).then(function(data) {
			var response = {};
			response.elements = data;
			response.count = data.length;
			res.json(response);
		});
	});
	router.get('/users/:id', function(req, res) {
		var id = req.params.id;
		models.User.find({
			where: {
				id: id
			},
			include: [{
				model: models.Coloc,
				as: 'colocs'
			}]
		}).then(function(user) {
			user.getColoc();
			res.json(user);
		});
	});
	router.patch('/users', function(req, res) {
		var User = req.body;
		User = models.User.build(User);
		User.save().then(function(result) {
			res.json(result);
		});
	});
};
