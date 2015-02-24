'use strict';

var models = require('../../models');
module.exports = function(router) {

  router.get('/colocsusers', function(req, res) {
    models.ColocsUsers.findAll({

    }).then(function(data) {
      var response = {};
      response.elements = data;
      response.count = data.length;
      res.json(response);
    });
  });

  router.post('/colocsusers', function(req, res) {
    var filter = req.body.filter;
    models.ColocsUsers.find({
      where: filter
    }).then(function(ColocsUsers) {
      res.json(ColocsUsers);
    });
  });

  router.patch('/colocsusers', function(req, res) {
    var requete = req.body;
    var spend = models.ColocsUsers.build(requete.spend);
    spend.save().then(function(t) {
      if (requete.user) {
        spend.setUser(requete.user.id);
      }
      if (requete.coloc) {
        spend.setColoc(requete.coloc.id);
      }
      res.json(t);
    });
  });

};
