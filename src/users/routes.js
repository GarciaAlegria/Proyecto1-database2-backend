const { Router } = require('express')
const controller = require('./controller')

const router = Router()

router.get("/", controller.AllUsers)
router.get("/getDPI/:correo", controller.getDPI)

router.post("/addUser/:correo&:password", controller.AddUser)

router.put("/updateUserPassword/:correo&:old_password&:new_password", controller.UpdateUserPassword)
router.put("/addDPI/:dpi&:correo", controller.AddDPI)
router.put("/changeEstado/:id&:estado", controller.changeEstado)

router.post("/validateUsuario/:correo&:contra", controller.validarUsuario)
router.get("/validateToken", controller.ValidateToken)

module.exports = router