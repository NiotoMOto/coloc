'use strict';

// var bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING
    },
    mail: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Coloc, {
          as: 'colocs',
          through: 'ColocsUsers'
        });
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return this.password === password;
      }
    }
  });
  return User;
};
