'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Role', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      roleName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      designationName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      avgCompensation: {
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
    await queryInterface.dropTable('Role');
  }
};