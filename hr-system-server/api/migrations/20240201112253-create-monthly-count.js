'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MonthlyCount', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      monthOfYear: {
        type: Sequelize.DATE,
        allowNull: false
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      existingCount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date().toISOString()
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date().toISOString()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MonthlyCount');
  }
};