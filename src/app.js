const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const compression = require('compression');
const handleErr = require('./controllers/error');
require('dotenv').config();

const app = express();

app.disable('x-powered-by');
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('port', process.env.PORT || 3020);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/home', (req, res) => {
  fetch(`http://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=${process.env.key}`)
    .then((result) => result.json())
    .then((result) => res.json(result));
});

app.post('/search', (req, res, next) => {
  const searchName = req.body.name;
  fetch(`http://newsapi.org/v2/everything?q=${searchName}&sortBy=publishedAt&apiKey=$S{process.env.key}`)
    .then((result) => result.json())
    .then((result) => res.json(result));
});

app.use(handleErr.clientErr);

app.use(handleErr.serverErr);
module.exports = app;
