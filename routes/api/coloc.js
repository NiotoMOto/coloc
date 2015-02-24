'use strict';

var models = require('../../models');
module.exports = function(router) {
	router.get('/colocs', function(req, res) {
		models.Coloc.findAll({
      include: [{
				model: models.User,
				as: 'users'
			}]
		}).then(function(data) {
			var response = {};
			response.elements = data;
			response.count = data.length;
			res.json(response);
		});
	});
	router.get('/colocs/:id', function(req, res) {
		var id = req.params.id;
		models.Coloc.find({
			where: {
				id: id
			},
      include: [{
				model: models.User,
				as: 'users'
			}]
		}).then(function(coloc) {
      console.log(coloc);
			res.json(coloc);
		});
	});
	router.post('/colocs/search', function(req, res) {
		var filter = req.body.filter;
		models.Coloc.find({
			where: filter
		}).then(function(Coloc) {
			res.json(Coloc);
		});
	});
	router.patch('/colocs', function(req, res) {
		var Coloc = req.body;
		Coloc = models.Coloc.build(Coloc);
		Coloc.save().then(function(t) {
			res.json(t);
		});
	});
};
