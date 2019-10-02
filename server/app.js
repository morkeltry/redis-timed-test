const express = require('express');

const router = require('./routes/index');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(router);

module.exports = app;
