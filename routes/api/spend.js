'use strict';

var models = require('../../models');
module.exports = function(router) {


  router.get('/spends', function(req, res) {
    models.Spend.findAll({
      include: [{
        model: models.User,
        as: 'user'
      }, {
        model: models.Coloc,
        as: 'coloc'
      }]
    }).then(function(data) {
      var response = {};
      response.elements = data;
      response.count = data.length;
      res.json(response);
    });
  });


  router.get('/spends/:id', function(req, res) {
    var id = req.params.id;
    var filter = req.body.filter;
    models.Spend.find({
      where: {
        id: id
      }
    }).then(function(ligue) {
      res.json(ligue);
    });
  });


  router.post('/spends', function(req, res) {
    var filter = req.body.filter;
    models.Spend.find({
      where: filter
    }).then(function(Spend) {
      res.json(Spend);
    });
  });

  router.patch('/spends', function(req, res) {
    var requete = req.body;
    var spend = models.Spend.build(requete.spend);
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


  router.delete('/spends/:id', function(req, res) {
    var id = req.params.id;
    models.Spend.destroy({
      where: {
        id: id
      }
    }).then(function(t) {
      res.json(t);
    });
  });
};
