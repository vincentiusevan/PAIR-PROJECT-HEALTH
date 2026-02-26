'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'age', {
      type: Sequelize.INTEGER
    });

    await queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'age');
    await queryInterface.removeColumn('Users', 'gender');
  }
};
