const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: 'false' }));
app.use(express.json());
app.set('port', process.env.PORT || 3020);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.post('/search', (req, res, next) => {
  const searchName = req.body.name;
  fetch(`http://newsapi.org/v2/everything?q=${searchName}&sortBy=publishedAt&apiKey=${process.env.key}`).then(result => result.json()).then(result => res.json(result));
});

app.listen(app.get('port'), () => {
console.log('http://localhost:3020');
});