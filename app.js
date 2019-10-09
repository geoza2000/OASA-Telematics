//Dependencies
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Services
const cache = require('./services/cache')

//Routes
const routes = require('./routes')

//Const
const PORT = process.env.PORT || 3000;

//Init
const app = express()

cache.init()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes)

app.listen(PORT, () => console.log('OASA listening on port ' + PORT))