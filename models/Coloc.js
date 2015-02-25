'use strict';

module.exports = function(sequelize, DataTypes) {
	var Coloc = sequelize.define('Coloc', {
		name: DataTypes.STRING,
		plafond : DataTypes.FLOAT
	}, {
		classMethods: {
			associate: function(models) {
				Coloc.belongsToMany(models.User, {
					as: 'users',
					through: 'ColocsUsers'
				});
			}
		}
	});

	return Coloc;
};
