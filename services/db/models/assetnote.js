'use strict';

module.exports = (sequelize, DataTypes) => {
  const AssetNote = sequelize.define('AssetNote', {
    note: DataTypes.STRING,
    userEmail: DataTypes.STRING
  }, {});

  AssetNote.associate = function (models) {
    AssetNote.belongsTo(models.Asset);
  };

  return AssetNote;
};