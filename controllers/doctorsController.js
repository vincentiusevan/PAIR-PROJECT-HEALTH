const {
  User,
  Doctor,
  Symptom,
  Booking,
  Disease,
  BookingSymptom,
} = require("../models");
const { Op } = require("sequelize");

class DoctorsController {
  static async doctors(req, res) {
    try {
      let doctors = await Doctor.findAll();
      res.render("doctors", { doctors });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = DoctorsController;
