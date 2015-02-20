'use strict';
module.exports = function(sequelize, DataTypes) {
    var Spend = sequelize.define('Spend', {
        amount: DataTypes.FLOAT,
        libelle: DataTypes.STRING,
    });
    return Spend;
};
