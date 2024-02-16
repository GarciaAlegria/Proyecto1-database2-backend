const express = require('express')
const hospitalesRoutes = require('./src/hospitales/routes')
const usersRoutes = require('./src/users/routes')
const examenesRoutes = require('./src/examenes/routes')
const reviewsRoutes = require('./src/reviews/routes')
const requestsRoutes = require('./src/requests/routes')
const serviciosRoutes = require('./src/servicios/routes')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors({
    origin: '*'
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get("/", (req, res) => {
    res.send("hello world")
})

app.use('/api/v1/hospitales', hospitalesRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/examenes', examenesRoutes)
app.use('/api/v1/reviews', reviewsRoutes)
app.use('/api/v1/requests', requestsRoutes)
app.use('/api/v1/servicios', serviciosRoutes)

app.listen(port, () => console.log(`app listening on port ${port}`));

module.exports = app; // Exporta la instancia de la aplicación
