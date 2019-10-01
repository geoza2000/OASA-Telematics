//Dependencies
const router = require('express').Router()

//Constrollers
const lines = require('./controllers/lines/lines')
const masterlines = require('./controllers/lines/masterlines')

router.get('/lines', lines)
router.get('/lines/:code', lines)

router.get('/masterlines', masterlines)
router.get('/masterlines/:code', masterlines)

module.exports = router