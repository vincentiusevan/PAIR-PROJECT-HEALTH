"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    //getter format date booking date
    get formatDate() {
      return new Date(this.bookingDate).toISOString().split("T")[0];
    }

    // Instance method
    changeStatus(newStatus) {
      if (this.status === "Done") {
        throw new Error("Status is done, cannot be changed");
      }

      this.status = newStatus;
      return this.save();
    }

    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: "UserId" });

      Booking.belongsTo(models.Doctor, { foreignKey: "DoctorId" });

      Booking.belongsTo(models.Disease, { foreignKey: "DiseaseId" });

      Booking.belongsToMany(models.Symptom, {
        through: models.BookingSymptom,
        foreignKey: "BookingId",
      });
    }
  }
  Booking.init(
    {
      bookingDate: DataTypes.DATE,
      status: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      DoctorId: DataTypes.INTEGER,
      DiseaseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    },
  );

  // agar setap booking baru statusny pending
  Booking.addHook("beforeCreate", (booking) => {
    booking.status = "Pending";
  });

  return Booking;
};
