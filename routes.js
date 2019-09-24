//Dependencies
const router = require('express').Router()

//Constrollers
const lines = require('./controllers/lines/lines')

router.all('/lines', lines)

module.exports = router