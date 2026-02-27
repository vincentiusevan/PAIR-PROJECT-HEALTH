"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Symptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Symptom.belongsToMany(models.Booking, {
        through: models.BookingSymptom,
        foreignKey: "SymptomId",
      });
      Symptom.belongsToMany(models.Disease, {
        through: 'DiseaseSymptoms'
      })  
    }
  }
  Symptom.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name Symptoms required",
          },
          notEmpty: {
            msg: "Name Symptoms cannot be empty!",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description Symptoms required",
          },
          notEmpty: {
            msg: "Description Symptoms cannot be empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Symptom",
    },
  );
  return Symptom;
};
