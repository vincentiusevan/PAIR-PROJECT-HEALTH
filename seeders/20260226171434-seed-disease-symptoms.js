'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const diseases = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Diseases";`
    );

    const symptoms = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Symptoms";`
    );

    const diseaseRows = diseases[0];
    const symptomRows = symptoms[0];

    const flu = diseaseRows.find(d => d.name === 'Flu');
    const migraine = diseaseRows.find(d => d.name === 'Migraine');

    const fever = symptomRows.find(s => s.name === 'Fever');
    const cough = symptomRows.find(s => s.name === 'Cough');
    const headache = symptomRows.find(s => s.name === 'Headache');

    await queryInterface.bulkInsert('DiseaseSymptoms', [
      {
        DiseaseId: flu.id,
        SymptomId: fever.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        DiseaseId: flu.id,
        SymptomId: cough.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        DiseaseId: migraine.id,
        SymptomId: headache.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DiseaseSymptoms', null, {});
  }
};
