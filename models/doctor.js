"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    //static method untuk mencegah menghapus dokter tetapi ada pasien bookingnya
    static async deleteNoPatients(id) {
      const doctor = await this.findByPk(id, {
        include: ["Bookings"],
      });

      if (!doctor) {
        throw new Error("Doctor not found");
      }

      if (doctor.Bookings.length > 0) {
        throw new Error("Doctor still has patients");
      }

      const name = doctor.name;

      await doctor.destroy();

      return name;
    }

    static associate(models) {
      Doctor.hasMany(models.Booking, { foreignKey: "DoctorId" });
    }
  }
  Doctor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name Doctors required",
          },
          notEmpty: {
            msg: "Name Doctors cannot be empty!",
          },
        },
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Specialization required",
          },
          notEmpty: {
            msg: "Specialization cannot be empty!",
          },
        },
      },
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Degree required",
          },
          notEmpty: {
            msg: "Degree cannot be empty!",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image Url required",
          },
          notEmpty: {
            msg: "Image Url cannot be empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Doctor",
    },
  );
  return Doctor;
};
