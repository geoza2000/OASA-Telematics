//Dependencies
const router = require('express').Router()

//Constrollers
const lines = require('./controllers/lines/lines')
const masterlines = require('./controllers/lines/masterlines')

router.get('/lines', lines)
router.get('/masterlines', masterlines)

module.exports = router