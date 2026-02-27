'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Doctors', [
      {
        name: 'Dr. IwanGeming',
        specialization: 'General',
        degree: 'MD',
        imageUrl: 'https://media.licdn.com/dms/image/v2/D5635AQGBEvIgeqAFlw/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1714658873613?e=1772733600&v=beta&t=J5QleULA4lWPyAkdxorkkkUgOkElUPHNQgqwxzaB4b0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Eko',
        specialization: 'Neurology',
        degree: 'Sp.N',
        imageUrl: 'https://purimedika.com/wp-content/uploads/2020/11/Dr-Lestari-Raharjo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});
  }
};
