'use strict';

module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    serial: DataTypes.STRING,
    model: DataTypes.STRING,
    ownerEmail: DataTypes.STRING
  }, {});

  Asset.associate = function (models) {
    Asset.belongsTo(models.Team);
  };

  return Asset;
};