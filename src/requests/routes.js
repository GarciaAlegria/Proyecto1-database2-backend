const { Router } = require('express')
const controller = require('./controller')

const router = Router()

router.get("/", controller.AllRequests)

module.exports = router