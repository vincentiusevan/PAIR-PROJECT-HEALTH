const router = require("express").Router();
const DoctorsController = require("../controllers/doctorsController");

router.get("/", DoctorsController.doctors);
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

module.exports = router;
