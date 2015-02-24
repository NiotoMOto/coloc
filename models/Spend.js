'use strict';
module.exports = function(sequelize, DataTypes) {
    var Spend = sequelize.define('Spend', {
        prix: DataTypes.FLOAT,
        libelle: DataTypes.STRING,
    });
    return Spend;
};
