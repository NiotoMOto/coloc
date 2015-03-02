'use strict';

module.exports = function(sequelize, DataTypes) {
	var Invitation = sequelize.define('Invitation', {
	}, {
		classMethods: {
			associate: function(models) {
        Invitation.belongsTo(models.User, {
					as: 'as'
				});
        Invitation.belongsTo(models.User, {
					as: 'to'
				});
			}
		}
	});

	return Invitation;
};
