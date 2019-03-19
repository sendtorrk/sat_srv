'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },

      ownerEmail: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addIndex('Teams', ['name', 'ownerEmail'], {
        unique: true
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Teams');
  }
};