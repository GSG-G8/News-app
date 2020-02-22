require('dotenv').config();

const express = require('express');
const path = require('path');
const compression = require('compression');
const handleErr = require('./controllers/error');
const { routeHome, routesSearch } = require('./routes');

const app = express();

app.disable('x-powered-by');
app.use(compression());
app.set('port', process.env.PORT || 3020);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(routeHome);
app.use(routesSearch);

app.use(handleErr.clientErr);
app.use(handleErr.serverErr);

module.exports = app;
