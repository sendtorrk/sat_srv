'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'AssetNotes', // name of Source model
      'AssetId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Assets', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'AssetNotes', // name of Source model
      'AssetId' // key we want to remove
    );
  }
};
