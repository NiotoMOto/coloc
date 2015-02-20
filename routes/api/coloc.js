'use strict';

var models = require('../../models');
module.exports = function(router) {
    router.get('/colocs', function(req, res) {
        models.Coloc.findAll().then(function(colocs) {
            res.json(colocs);
        });
    });
    router.get('/colocs/:id', function(req, res) {
        var id = req.params.id;
        var filter = req.body.filter;
        console.log(filter);
        models.Coloc.find({
            where: {
                id: id
            }
        }).then(function(ligue) {
            res.json(ligue);
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
    router.post('/colocs', function(req, res) {
        var Coloc = req.body;
        Coloc = models.Coloc.build(Coloc);
        Coloc.save().then(function(t) {
            res.json(t);
        });
    });
};
