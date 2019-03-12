'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Dailies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      highlights: {
        type: Sequelize.STRING
      },
      positive: {
        type: Sequelize.STRING
      },
      negative: {
        type: Sequelize.STRING
      },
      wakeup: {
        type: Sequelize.STRING
      },
      sleep: {
        type: Sequelize.STRING
      },
      daysAlive: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Dailies');
  }
};