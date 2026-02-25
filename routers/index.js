const router = require("express").Router();
const doctorsRouter = require("./doctors");
const patientsRouter = require("./patients");

router.use("/doctors", doctorsRouter);
router.use("/patients", patientsRouter);

module.exports = router;
