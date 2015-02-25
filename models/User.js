'use strict';
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		mail : DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				User.belongsToMany(models.Coloc, {
					as: 'colocs',
					through: 'ColocsUsers'
				});
			}
		}
	});
	return User;
};
