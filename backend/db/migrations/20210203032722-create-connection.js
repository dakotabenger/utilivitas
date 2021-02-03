'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Connections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requestingUser: {
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      requestedUser: {
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      accepted: {
        type: Sequelize.BOOLEAN
      },
      warm_up_response: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Connections');
  }
};