//Dependencies
const router = require('express').Router()

//Constrollers
const lines = require('./controllers/lines/lines')
const routes = require('./controllers/lines/routes/routes')

const masterlines = require('./controllers/masterlines/masterlines')

const nearby = require('./controllers/stops/nearby')


router.get('/lines', lines)
router.get('/lines/:line', lines)
router.get('/lines/:line/routes', routes)
router.get('/lines/:line/routes/:route', routes)

router.get('/masterlines', masterlines)
router.get('/masterlines/:masterline', masterlines)

router.get('/stops/nearby', nearby)


module.exports = router