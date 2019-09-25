//Dependencies
const express = require('express')

//Services
const cache = require('./services/cache')

//Routes
const routes = require('./routes')

//Const
const PUBLIC_PORT = 3000

//Init
const app = express()

cache.init()

app.use('/', routes)

app.listen(PUBLIC_PORT, () => console.log('OASA listening on port ' + PUBLIC_PORT))