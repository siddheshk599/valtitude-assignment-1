'use strict';
const nodeXLSX = require('node-xlsx');
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const xlsxSheets = nodeXLSX.parse(fs.readFileSync(`${__dirname}/../../data/Assignment_Data.xlsx`), { default: '' });
    
    const countSheetData = [...xlsxSheets.filter((sheet) => (sheet.name === "MonthlyCount"))[0].data.slice(1)];

    const countData = [...countSheetData.map((row) => {
      return {
        id: row[0],
        monthOfYear: row[1],
        roleId: row[2],
        existingCount: row[4],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    })];

    await queryInterface.bulkInsert('MonthlyCount', countData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('MonthlyCount', null, {});
  }
};
