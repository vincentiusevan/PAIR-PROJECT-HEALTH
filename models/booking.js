'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: "UserId" });

  Booking.belongsTo(models.Doctor, { foreignKey: "DoctorId" });

  Booking.belongsTo(models.Disease, { foreignKey: "DiseaseId" });

  Booking.belongsToMany(models.Symptom, {
    through: models.BookingSymptom,
    foreignKey: "BookingId"
  });
    }
  }
  Booking.init({
    bookingDate: DataTypes.DATE,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    DiseaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};