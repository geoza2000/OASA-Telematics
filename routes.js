//Dependencies
const router = require('express').Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Constrollers
const lines = require('./controllers/lines/lines')
const lineRoutes = require('./controllers/lines/routes/routes')

const masterlines = require('./controllers/masterlines/masterlines')

const stop = require('./controllers/stops/stop')
const stopRoutes = require('./controllers/stops/routes/routes')
const arrivals = require('./controllers/stops/arrivals/arrivals')
const nearby = require('./controllers/stops/nearby/nearby')

const translations = require('./controllers/translations/translations')

router.all('/', function(req, res) {
    res.redirect('/api-docs');
})
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/lines', lines)
router.get('/lines/:line', lines)
router.get('/lines/:line/routes', lineRoutes)
router.get('/lines/:line/routes/:route', lineRoutes)

router.get('/masterlines', masterlines)
router.get('/masterlines/:masterline', masterlines)

router.get('/stops/:stop', stop)
router.get('/stops/:stop/routes', stopRoutes)
router.get('/stops/:stop/routes/:route', stopRoutes)
router.get('/stops/:stop/arrivals', arrivals)
router.get('/stops/nearby', nearby)

router.get('/translations', translations)


module.exports = router