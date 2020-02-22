require('dotenv').config();

const fetch = require('node-fetch');

module.exports = (req, res, next) => {
  const searchName = req.body.name;
  fetch(`http://newsapi.org/v2/everything?q=${searchName}&language=en&sortBy=publishedAt&apiKey=${process.env.key}`)
    .then((result) => result.json())
    .then((result) => res.json(result));
};
