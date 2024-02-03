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
    
    const roleSheetData = [...xlsxSheets.filter((sheet) => (sheet.name === "Role"))[0].data.slice(1)];

    const roleData = [...roleSheetData.map((row) => {
      return {
        id: row[0],
        roleName: row[1],
        designationName: row[2],
        departmentId: row[3],
        avgCompensation: row[4],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    })];

    await queryInterface.bulkInsert('Role', roleData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Role', null, {});
  }
};
