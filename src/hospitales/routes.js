const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.AllHospitales);
router.get("/hospitalsByManager/:correo", controller.AllHospitalsByManager)
router.post("/addHospital/:name&:direc&:descrip&:zona&:correo", controller.InsertHospital);

router.get("/estados", controller.AllHospitalesEstados);

router.put("/updateEstado/:hospitalId&:newEstado", controller.UpdateHospitalEstado);
router.put("/updateHospitalInfo/:id&:name&:direction&:description&:zone", controller.UpdateHospitalInfo);

module.exports = router;