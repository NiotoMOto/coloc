'use strict';

var models = require('../../models');
module.exports = function(router) {
  router.get('/users', function(req, res) {
    models.User.findAll().then(function(users) {
      res.json(users);
    });
  });
  router.get('/users/:id', function(req, res) {
    var id = req.params.id;
    models.User.find({
      where: {
        id: id
      }
    }).then(function(User) {
      res.json(User);
    });
  });
  router.post('/users', function(req, res) {
    var User = req.body;
    User = models.User.build(User);
    User.save().then(function(result) {
      res.json(result);
    });
  });
};
