'use strict';

module.exports = function(sequelize, DataTypes) {
	var ColocsUsers = sequelize.define('ColocsUsers', {
		status: {type : DataTypes.BOOLEAN, defaultValue: true }
	});

	return ColocsUsers;
};
