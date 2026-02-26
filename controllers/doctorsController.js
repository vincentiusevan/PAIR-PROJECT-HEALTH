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
      const { notif } = req.query;
      const { search } = req.query;
      let doctors = await Doctor.findAll();

      if (search) {
        doctors = await Doctor.findAll({
          where: {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
        });
      }
      res.render("doctors", { doctors, search, notif });
    } catch (error) {
      res.send(error);
    }
  }

  static async postSwitchStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const booking = await Booking.findByPk(id);

      await booking.changeStatus(status);

      res.redirect(`/doctors/${booking.DoctorId}/listPatientBookings`);
    } catch (err) {
      const booking = await Booking.findByPk(req.params.id);
      res.redirect(`/doctors/${booking.DoctorId}/listPatientBookings`);
    }
  }

  static async listPatientBookings(req, res) {
    try {
      const { id } = req.params;
      let bookings = await Booking.findAll({
        where: {
          DoctorId: id,
        },
        include: [Doctor, User, Disease],
      });
      res.render("listPatientBookings", { bookings });
    } catch (error) {
      res.send(error);
    }
  }

  static async getAddDoctors(req, res) {
    try {
      const { errors } = req.query;
      let doctors = await Doctor.findAll();
      res.render("addDoctors", { doctors, errors });
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
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => el.message);
        res.render("addDoctors", { errors });
      } else {
        res.send(error);
      }
    }
  }

  static async getDeleteDoctors(req, res) {
    try {
      const { id } = req.params;

      const doctors = await Doctor.deleteNoPatients(id);

      res.redirect(`/doctors?notif=Doctors ${doctors} removed`);
    } catch (error) {
      res.redirect(`/doctors?notif=${error.message}`);
    }
  }

  static async getEditDoctors(req, res) {
    try {
      const { errors } = req.query;
      const { id } = req.params;
      let doctors = await Doctor.findByPk(id);
      res.render("editDoctors", { doctors, errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditDoctors(req, res) {
    const { id } = req.params;
    let doctors = await Doctor.findByPk(id);
    try {
      const { imageUrl, name, specialization, degree } = req.body;
      await Doctor.update(
        { imageUrl, name, specialization, degree },
        { where: { id } },
      );
      res.redirect("/doctors");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => el.message);
        res.render("editDoctors", { errors, doctors });
      } else {
        res.send(error);
      }
    }
  }

  static async diseases(req, res) {
    try {
      const { search } = req.query;
      const { notif } = req.query;
      let diseases = await Disease.findAll();
      if (search) {
        diseases = await Disease.findAll({
          where: {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
        });
      }
      res.render("diseases", { diseases, search, notif });
    } catch (error) {
      res.send(error);
    }
  }

  static async getAddDiseases(req, res) {
    try {
      const { errors } = req.query;
      let diseases = await Disease.findAll();
      res.render("addDiseases", { diseases, errors });
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
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => el.message);
        res.render("addDiseases", { errors });
      } else {
        res.send(error);
      }
    }
  }

  static async getDeleteDiseases(req, res) {
    try {
      const { id } = req.params;
      let diseases = await Disease.findByPk(id);
      await Disease.destroy({
        where: {
          id,
        },
      });
      res.redirect(
        `/doctors/diseases/?notif= Diseases ${diseases.name} removed`,
      );
    } catch (error) {
      res.send(error);
    }
  }

  static async getEditDiseases(req, res) {
    try {
      const { id } = req.params;
      const { errors } = req.query;
      let diseases = await Disease.findByPk(id);
      res.render("editDiseases", { diseases, errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditDiseases(req, res) {
    const { id } = req.params;
    let diseases = await Disease.findByPk(id);
    try {
      const { name, description, specialization, level, medicine } = req.body;
      await Disease.update(
        { name, description, specialization, level, medicine },
        { where: { id } },
      );
      res.redirect("/doctors/diseases");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => el.message);
        res.render("editDiseases", { errors, diseases });
      } else {
        res.send(error);
      }
    }
  }

  static async symptoms(req, res) {
    try {
      const { search } = req.query;
      const { notif } = req.query;
      let symptoms = await Symptom.findAll();
      if (search) {
        symptoms = await Symptom.findAll({
          where: {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
        });
      }
      res.render("symptoms", { symptoms, search, notif });
    } catch (error) {
      res.send(error);
    }
  }

  static async getAddSymptoms(req, res) {
    try {
      const { errors } = req.query;
      let symptoms = await Symptom.findAll();
      res.render("addSymptoms", { symptoms, errors });
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  }

  static async postAddSymptoms(req, res) {
    try {
      const { name, description } = req.body;
      await Symptom.create({
        name,
        description,
      });
      res.redirect("/doctors/symptoms");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => el.message);
        res.render("addSymptoms", { errors });
      } else {
        console.log(error);

        res.send(error);
      }
    }
  }

  static async getDeleteSymptoms(req, res) {
    try {
      const { id } = req.params;
      let symptoms = await Symptom.findByPk(id);
      await Symptom.destroy({
        where: {
          id,
        },
      });
      res.redirect(
        `/doctors/symptoms/?notif= Symptoms ${symptoms.name} removed`,
      );
    } catch (error) {
      res.send(error);
    }
  }

  static async getEditSymptoms(req, res) {
    try {
      const { id } = req.params;
      const { errors } = req.query;
      let symptoms = await Symptom.findByPk(id);
      res.render("editSymptoms", { symptoms, errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditSymptoms(req, res) {
    const { id } = req.params;
    let symptoms = await Symptom.findByPk(id);
    try {
      const { name, description } = req.body;
      await Symptom.update({ name, description }, { where: { id } });
      res.redirect("/doctors/symptoms");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => el.message);
        res.render("editSymptoms", { errors, symptoms });
      } else {
        res.send(error);
      }
    }
  }
}

module.exports = DoctorsController;
