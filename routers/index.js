const router = require("express").Router();
const doctorsRouter = require("./doctors");
const patientsRouter = require("./patients");
const loginRouter = require("./login")

router.use("/", loginRouter)
router.use("/doctors", doctorsRouter);
router.use("/patients", patientsRouter);


module.exports = router;
