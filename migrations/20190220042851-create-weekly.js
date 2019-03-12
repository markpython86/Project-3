'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Weeklies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      best: {
        type: Sequelize.STRING
      },
      worst: {
        type: Sequelize.STRING
      },
      next: {
        type: Sequelize.STRING
      },
      weekAt:{
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
        userId: {
          type: Sequelize.INTEGER
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Weeklies');
  }
};