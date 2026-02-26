'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { User } = require('../models')

    await User.create({
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
