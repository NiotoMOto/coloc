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
    var userToAdd = {};

    function getuser(user) {
      return models.User.find({
        where: {
          id: user.id
        },
        include: [{
          model: models.Coloc,
          as: 'colocs'
        }]
      });
    }

    models.Invitation.find({
      where: {
        id: invitation.id
      }
    }).then(function(c) {
      if (c) {
        c.updateAttributes(invitation);
        if (invitation.status === 'accepted') {
          getuser(invitation.to).then(function(to) {
            getuser(invitation.as).then(function(as) {
              var coloc;
              if (to.colocs[0]) {
                userToAdd = as;
                coloc = to.colocs[0].dataValues;
              } else {
                if (as.colocs[0]) {
                  userToAdd = to;
                  coloc = as.colocs[0].dataValues;
                } else {
                  res.error('no colocs');
                }
              }
              var colocUsr = {
                ColocId: coloc.id,
                UserId: userToAdd.id,
                status: 'active'
              };
              models.ColocsUsers.build(colocUsr).save().then(function(colocUsr) {
                colocUsr.setUser(userToAdd);
                colocUsr.setColoc(coloc);
                res.json(colocUsr.colocs);
              }, function(error) {
                console.log(error);
              });
            });
          });
        }
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
        invitation.status = status;
        invitation = models.Invitation.build(invitation);
        invitation.save().then(function(invitationResult) {
          invitationResult.setTo(userResult);
          invitationResult.setAs(user.id);

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
