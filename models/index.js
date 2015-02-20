'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '../config/config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};
fs.readdirSync(__dirname).filter(function(file) {
	return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function(file) {
	var model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;
});
Object.keys(db).forEach(function(modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.Coloc.belongsToMany(db.User);
db.User.belongsToMany(db.Coloc);
db.Spend.belongsTo(db.User);
db.Spend.belongsTo(db.Coloc);

sequelize.drop({
	forced: true
}).then(function() {
	sequelize.sync({
		forced: 'true'
	}).then(function() {
		db.Coloc.create({
			name: 'Paris'
		});
		db.Coloc.create({
			name: 'Le Croisty'
		});
		db.Coloc.create({
			name: 'Poissy'
		}).then(function(coloc) {

			db.User.create({
				username: 'Antoine',
				passowrd: 'coucou',
			}).then(function(antoine) {
				coloc.addUser(antoine);
			});

			db.User.create({
				username: 'Sébastien',
				passowrd: 'coucou',
			}).then(function(seb) {
				coloc.addUser(seb);
			});
		});
	});
});
// if (env === 'development') {
//     sequelize.sync({forced : 'true'});
// }
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
