'use strict';

var models = require('../../models');
module.exports = function(router) {


	router.get('/invitations', function(req, res) {
		models.Invitation.findAll({
			include: [{
				model: models.User,
				as: 'to'
			}, {
				model: models.User,
				as: 'as'
			}]
		}).then(function(data) {
			var response = {};
			response.elements = data;
			response.count = data.length;
			res.json(response);
		});
	});


	router.get('/invitations/:id', function(req, res) {
		var id = req.params.id;
		models.Invitation.find({
			where: {
				id: id
			}
		}).then(function(ligue) {
			res.json(ligue);
		});
	});

	router.post('/invitations', function(req, res) {
		var filter = req.body.filter;
		models.Invitation.findAll({
			where: filter,
			include: [{
				model: models.User,
				as: 'to'
			}, {
				model: models.User,
				as: 'as'
			}]
		}).then(function(invitations) {
			var response = {};
			response.elements = invitations;
			res.json(response);
		});
	});

  router.put('/invitations', function(req, res) {
    var invitation = req.body;
    models.Invitation.find({
      where: {
        id: invitation.id
      }
    }).then(function(c) {
      if (c) {
        c.updateAttributes(invitation);
        res.json(c);
      } else {
        invitation = models.Invitation.build(invitation);
        invitation.save().then(function(t) {
          res.json(t);
        });
      }
    });
	});

	router.patch('/invitations', function(req, res) {
		var user = req.body.user;
		var search = req.body.search;
		var status = req.body.status;
		models.User.find({
			where: models.Sequelize.or({
				username: search
			}, {
				mail: search
			})
		}).then(function(userResult) {
			if (userResult) {
				var invitation = {};
				invitation.to = userResult;
				invitation.as = user;
				invitation.status = status;
				invitation = models.Invitation.build(invitation);
				invitation.save().then(function(invitationResult) {
					invitationResult.setTo(userResult);
					invitationResult.setAs(user.id);
					res.json(invitationResult);
				});
			}
		});
	});

	router.delete('/invitations/:id', function(req, res) {
		var id = req.params.id;
		models.Invitation.destroy({
			where: {
				id: id
			}
		}).then(function(t) {
			res.json(t);
		});
	});
};
