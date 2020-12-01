//Dependencies
const express = require('express')

//Services
const cache = require('./services/cache')

//Routes
const routes = require('./routes')

//Const
const PORT = process.env.PORT || 3000;

//Init
const app = express()

cache.init()

app.use('/', routes)
app.use('/v1', function(req, res) { res.redirect('/v1') })

app.listen(PORT, () => console.log('OASA listening on port ' + PORT))