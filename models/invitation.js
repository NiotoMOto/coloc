'use strict';

module.exports = function(sequelize, DataTypes) {
	var Invitation = sequelize.define('Invitation', {
		status: {
			type: DataTypes.STRING,
			values: ['sended', 'accepted', 'refused']
		}
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
		},
		hooks: {
			afterUpdate: function(invitation, options, fn) {
        console.log(invitation.status);
				if (invitation.status === 'accepted') {
					return fn(null, 'user ajouté');
				} else {
					return fn(null, 'nothing');
				}

			}
		}
	});

	return Invitation;
};
