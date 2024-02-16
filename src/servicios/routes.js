const { Router } = require('express')
const controller = require('./controller')

const router = Router()

router.get("/", controller.AllServicios)
router.get("/getServiciosByHospital/:id", controller.HospitalServices)

router.post("/addServicio/:examen&:precio&:hospital", controller.AddServicio)

module.exports = router