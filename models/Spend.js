'use strict';
module.exports = function(sequelize, DataTypes) {
    var Spend = sequelize.define('Spend', {
        prix: DataTypes.FLOAT,
        libelle: DataTypes.STRING,
    },{
      classMethods : {
        associate : function(models){
          models.Spend.belongsTo(models.User, {
            as: 'user'
          });
          models.Spend.belongsTo(models.Coloc, {
            as: 'coloc'
          });
        }
      }
    });
    return Spend;
};
