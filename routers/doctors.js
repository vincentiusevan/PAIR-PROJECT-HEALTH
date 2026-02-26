const router = require("express").Router();
const DoctorsController = require("../controllers/doctorsController");

// read doctors
router.get("/", DoctorsController.doctors);

// list patient Booking
router.get("/:id/listPatientBookings", DoctorsController.listPatientBookings);

// switch status
router.post("/booking/:id/switchStatus", DoctorsController.postSwitchStatus);

//add doctors
router.get("/addDoctors", DoctorsController.getAddDoctors);
router.post("/addDoctors", DoctorsController.postAddDoctors);

// delete doctors
router.get("/deleteDoctors/:id", DoctorsController.getDeleteDoctors);

//edit doctors
router.get("/:id/editDoctors", DoctorsController.getEditDoctors);
router.post("/:id/editDoctors", DoctorsController.postEditDoctors);

//read diseases
router.get("/diseases", DoctorsController.diseases);

//add diseases
router.get("/addDiseases", DoctorsController.getAddDiseases);
router.post("/addDiseases", DoctorsController.postAddDiseases);

//delete diseases
router.get("/deleteDiseases/:id", DoctorsController.getDeleteDiseases);

//edit doctors
router.get("/:id/editDiseases", DoctorsController.getEditDiseases);
router.post("/:id/editDiseases", DoctorsController.postEditDiseases);

//read diseases
router.get("/symptoms", DoctorsController.symptoms);

//add diseases
router.get("/addSymptoms", DoctorsController.getAddSymptoms);
router.post("/addSymptoms", DoctorsController.postAddSymptoms);

//delete diseases
router.get("/deleteSymptoms/:id", DoctorsController.getDeleteSymptoms);

//edit doctors
router.get("/:id/editSymptoms", DoctorsController.getEditSymptoms);
router.post("/:id/editSymptoms", DoctorsController.postEditSymptoms);

module.exports = router;
