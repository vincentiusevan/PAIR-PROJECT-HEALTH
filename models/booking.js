"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    //getter format date booking date
    get formatDate() {
      return new Date(this.bookingDate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }

    // Instance method
    changeStatus(newStatus) {
      if (this.status === "done") {
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
      bookingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Booking date is required'
          }
        }
      },
      status: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User is required'
          }
        }
      },
      DoctorId: DataTypes.INTEGER,

      DiseaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please select at least one symptom'
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Booking",
    },
  );

  // agar setap booking baru statusny pending
  Booking.addHook("beforeCreate", (booking) => {
    booking.status = "pending";
  });

  return Booking;
};
