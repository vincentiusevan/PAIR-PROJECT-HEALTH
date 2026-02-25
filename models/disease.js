'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Disease.hasMany(models.Booking, { foreignKey: "DiseaseId" });
    }
  }
  Disease.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    level: DataTypes.STRING,
    medicine: DataTypes.STRING,
    specialization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};