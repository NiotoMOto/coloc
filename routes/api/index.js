'use strict';
var fs = require('fs');
module.exports = function(router) {
        fs.readdirSync(__dirname).forEach(function(file) {
            if (file == "index.js") return;
            var name = file.substr(0, file.indexOf('.'));
            require('./' + name)(router);
        });
    }
    
    
    // 'use strict';
    // var models = require('../../models');
    // var express = require('express');
    // var router = express.Router();
    // router.get('/ligues', function(req, res) {
    //     models.Ligue.findAll().then(function(ligues) {
    //         res.json(ligues);
    //     });
    // });
    // router.get('/ligue/:id', function(req, res) {
    //     var id = req.params.id;
    //     models.Ligue.find({
    //         where: {
    //             id: id
    //         }
    //     }).then(function(ligue) {
    //         res.json(ligue);
    //     });
    // });
    // module.exports = router;