'use strict';

var models = require('../../models');
var _ = require('lodash');
var async = require('async');

module.exports = function(router) {

  router.post('/computed/spends/total', function(req, res) {
    var user = req.body.user;
    var coloc = req.body.coloc;
    async.parallel({
        solde: function(callback) {
          models.Spend.findAll({
            where: {
              userId: user.id
            }
          }).then(function(spends) {
            var total = 0;
            var response = {};
            _.each(spends, function(spend) {
              total += spend.prix;
            });
            response.total = total;
            response.count = spends.length;
            callback(null, response);
          });
        },
        total: function(callback) {
          models.Spend.findAll({
            where: {
              ColocId: coloc.id
            }
          }).then(function(spends) {
            var total = 0;
            var response = {};
            _.each(spends, function(spend) {
              total += spend.prix;
            });
            response.total = total;
            response.count = spends.length;
            callback(null, response);
          });
        },
        userCount: function(callback) {
          models.ColocsUsers.count({
            where: [{
              ColocId: coloc.id
            }]
          }).then(function(count) {
            callback(null, count);
          });
        },
      },
      function(err, results) {
        res.json(results);
      }
    );
  });

};
