'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Monthlies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      remember: {
        type: Sequelize.STRING
      },
      start: {
        type: Sequelize.STRING
      },
      stop: {
        type: Sequelize.STRING
      },
      monthAt: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Monthlies');
  }
};