'use strict';

module.exports = function(sequelize, DataTypes) {
  var Coloc = sequelize.define('Coloc', {
    name: DataTypes.STRING
    }, {
    classMethods: {

    }
  });

  return Coloc;
};
