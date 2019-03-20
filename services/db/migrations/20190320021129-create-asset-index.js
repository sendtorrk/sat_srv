'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Assets', ['serial', 'model', 'TeamId'], {
      unique: true
    });
  },

  down: (queryInterface, Sequelize) => {
  }
};
