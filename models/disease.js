"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Disease.hasMany(models.Booking, { foreignKey: "DiseaseId" });
      Disease.belongsToMany(models.Symptom, {
        through: 'DiseaseSymptoms'
      })
    }
  }
  Disease.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name Diseases required",
          },
          notEmpty: {
            msg: "Name Diseases cannot be empty!",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description Diseases required",
          },
          notEmpty: {
            msg: "Description Diseases cannot be empty!",
          },
        },
      },
      level: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Level Diseases required",
          },
          notEmpty: {
            msg: "Level Diseases cannot be empty!",
          },
        },
      },
      medicine: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Medicine Diseases required",
          },
          notEmpty: {
            msg: "Medicine Diseases cannot be empty!",
          },
        },
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Specialization Diseases required",
          },
          notEmpty: {
            msg: "Specialization Diseases cannot be empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Disease",
    },
  );
  return Disease;
};
