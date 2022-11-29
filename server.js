'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const logger = require('./middleware/logger');

const notFound = require('./handlers/404');

const errorHandler = require('./handlers/500')

const app = express();

app.use(cors());

const {app}  =  require('../server.js');
const supertest = require('supertest');
const request = supertest(app);


const PORT = process.env.PORT || 3002;

app.use(logger);

app.get('/bad', (req, res, next) => {
    next('Error!');
});


app.get('/', (req, res, next) => {
    res.status(200).send('Hello World!');
    res.send('request received');
})

app.use('/*', notFound)

app.use(errorHandler);


function start() {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
}

module.exports = { start, app };