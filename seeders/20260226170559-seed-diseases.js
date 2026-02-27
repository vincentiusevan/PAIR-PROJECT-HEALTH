'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Diseases', [
      {
        name: 'Flu',
        description: 'Influenza virus infection',
        level: 'Mild',
        medicine: 'Paracetamol',
        specialization: 'General',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Migraine',
        description: 'Severe headache condition',
        level: 'Moderate',
        medicine: 'Ibuprofen',
        specialization: 'Neurology',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Diseases', null, {});
  }
};
