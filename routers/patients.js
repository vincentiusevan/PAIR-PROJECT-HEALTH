const router = require("express").Router();
const PatientController = require("../controllers/patientController");

router.get('/book', PatientController.showBookForm)
router.post('/book', PatientController.createBooking)

module.exports = router;
