//Dependencies
const express = require('express')

//Routes
const routes = require('./routes')

//Const
const PUBLIC_PORT = 3000

//Init
const app = express()

app.use('/', routes)

app.listen(PUBLIC_PORT, () => console.log('OASA listening on port ' + PUBLIC_PORT))