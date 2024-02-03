'use strict';
const fs = require('fs');
const nodeXLSX = require('node-xlsx');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add commands to add seed data here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [], {});
     */
    const xlsxSheets = nodeXLSX.parse(fs.readFileSync(`${__dirname}/../../data/Assignment_Data.xlsx`), { default: '' });
    
    const deptSheetData = [...xlsxSheets.filter((sheet) => (sheet.name === "Department"))[0].data.slice(1)];

    const deptData = [...deptSheetData.map((row) => {
      return {
        id: row[0],
        departmentName: row[1],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    })];

    await queryInterface.bulkInsert('Department', deptData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Department', null, {});
  }
};
