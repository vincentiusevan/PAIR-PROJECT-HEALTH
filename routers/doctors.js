const router = require("express").Router();
const DoctorsController = require("../controllers/doctorsController");

router.get("/", DoctorsController.doctors);

module.exports = router;
