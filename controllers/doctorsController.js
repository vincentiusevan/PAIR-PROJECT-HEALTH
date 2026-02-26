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

  static async getAddDoctors(req, res) {
    try {
      let doctors = await Doctor.findAll();
      res.render("addDoctors", { doctors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postAddDoctors(req, res) {
    try {
      const { name, specialization, degree, imageUrl } = req.body;
      await Doctor.create({ name, specialization, degree, imageUrl });
      res.redirect("/doctors");
    } catch (error) {
      res.send(error);
    }
  }

  static async getDeleteDoctors(req, res) {
    try {
      const { id } = req.params;
      await Doctor.destroy({
        where: {
          id,
        },
      });
      res.redirect("/doctors");
    } catch (error) {
      res.send(error);
    }
  }

  static async getEditDoctors(req, res) {
    try {
      const { id } = req.params;
      let doctors = await Doctor.findByPk(id);
      res.render("editDoctors", { doctors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditDoctors(req, res) {
    try {
      const { id } = req.params;
      const { imageUrl, name, specialization, degree } = req.body;
      await Doctor.update(
        { imageUrl, name, specialization, degree },
        { where: { id } },
      );
      res.redirect("/doctors");
    } catch (error) {
      res.send(error);
    }
  }

  static async diseases(req, res) {
    try {
      let diseases = await Disease.findAll();
      res.render("diseases", { diseases });
    } catch (error) {
      res.send(error);
    }
  }

  static async getAddDiseases(req, res) {
    try {
      let diseases = await Disease.findAll();
      res.render("addDiseases", { diseases });
    } catch (error) {
      res.send(error);
    }
  }

  static async postAddDiseases(req, res) {
    try {
      const { name, description, specialization, level, medicine } = req.body;
      await Disease.create({
        name,
        description,
        specialization,
        level,
        medicine,
      });
      res.redirect("/doctors/diseases");
    } catch (error) {
      res.send(error);
    }
  }

  static async getDeleteDiseases(req, res) {
    try {
      const { id } = req.params;
      await Disease.destroy({
        where: {
          id,
        },
      });
      res.redirect("/doctors/diseases");
    } catch (error) {
      res.send(error);
    }
  }

  static async getEditDiseases(req, res) {
    try {
      const { id } = req.params;
      let diseases = await Disease.findByPk(id);
      res.render("editDiseases", { diseases });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditDiseases(req, res) {
    try {
      const { id } = req.params;
      const { name, description, specialization, level, medicine } = req.body;
      await Disease.update(
        { name, description, specialization, level, medicine },
        { where: { id } },
      );
      res.redirect("/doctors/diseases");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = DoctorsController;
