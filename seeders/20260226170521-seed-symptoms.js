'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Symptoms', [
      {
        name: 'Fever',
        description: 'High body temperature',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cough',
        description: 'Persistent coughing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Headache',
        description: 'Pain in head area',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Symptoms', null, {});
  }
};
