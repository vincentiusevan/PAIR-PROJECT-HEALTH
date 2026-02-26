const router = require("express").Router();
const PatientController = require("../controllers/patientController");
const { isPatient } = require("../middleware/auth");

router.use(isPatient)

router.get('/', PatientController.dashboard)


router.get('/book', PatientController.showBookForm)
router.post('/book', PatientController.createBooking)

router.get('/bookings', PatientController.myBookings)


module.exports = router;
