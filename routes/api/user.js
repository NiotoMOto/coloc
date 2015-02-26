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
      res.json(user);
    });
  });

  router.patch('/users', function(req, res) {
    var user = req.body;
    models.User.find({
      where: {
        id: user.id
      }
    }).then(function(c) {
      if (c) {
        c.updateAttributes(user);
        res.json(c);
      } else {
        user = models.User.build(user);
        user.save().then(function(t) {
          res.json(t);
        });
      }
    });
  });
};
