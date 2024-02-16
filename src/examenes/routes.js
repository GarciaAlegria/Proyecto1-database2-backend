const { Router } = require('express')
const controller = require('./controller')

const router = Router()

router.get("/", controller.AllExamenes)
router.get("/Names", controller.AllExamenesNames)

module.exports = router